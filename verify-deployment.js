
const https = require('https');

const API_URL = 'https://api-eight-rust-59.vercel.app/api/v1';
const ADMIN_EMAIL = 'admin@aydigital.com';
const ADMIN_PASSWORD = 'admin123';

// Helper to make requests
function request(url, options = {}, body = null) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const reqOptions = {
        hostname: parsedUrl.hostname,
        path: parsedUrl.pathname + parsedUrl.search,
        method: options.method || 'GET',
        headers: options.headers || {},
    };

    const req = https.request(reqOptions, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
            resolve({
                status: res.statusCode,
                headers: res.headers,
                body: data
            });
        });
    });

    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

async function verifyDeployment() {
  console.log('🔍 Starting Deployment Verification...');
  console.log(`📍 API URL: ${API_URL}`);

  // 1. Check Health
  try {
    console.log('\n1. 🏥 Checking Health Endpoint...');
    const healthRes = await request('https://api-eight-rust-59.vercel.app/health');
    console.log(`   Status: ${healthRes.status}`);
    if (healthRes.status === 200) {
        console.log('   ✅ Health check passed!');
    } else {
        console.log('   ⚠️ Health check returned non-200. Is the health module enabled?');
    }
  } catch (e) {
      console.log('   ❌ Health check failed to connect:', e.message);
  }

  // 2. Login
  console.log('\n2. 🔐 Testing Authentication (Login)...');
  try {
    const loginRes = await request(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }, JSON.stringify({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
      }));

    console.log(`   Login Status: ${loginRes.status}`);
    
    if (loginRes.status !== 201 && loginRes.status !== 200) {
        console.error('   ❌ Login failed:', loginRes.body);
        return;
    }

    const loginData = JSON.parse(loginRes.body);
    console.log('   ✅ Login successful!');
    console.log(`   User: ${loginData.user.email} (${loginData.user.role})`);

    // 3. Check Cookies
    console.log('\n3. 🍪 Verifying Cookies...');
    // set-cookie can be an array or string in Node.js http response
    const cookies = loginRes.headers['set-cookie'];
    if (cookies) {
        console.log('   Cookies received:', cookies);
        
        const cookieString = Array.isArray(cookies) ? cookies.join('; ') : cookies;
        
        // Verify SameSite=None and Secure
        if (cookieString.includes('SameSite=None') && cookieString.includes('Secure')) {
             console.log('   ✅ Cookies have correct SameSite=None and Secure attributes.');
        } else {
             console.log('   ❌ Cookies MISSING SameSite=None or Secure attributes! Cross-site auth will fail.');
        }

        // 4. Test Protected Endpoint (/auth/me)
        console.log('\n4. 🛡️ Testing Protected Endpoint (/auth/me)...');
        
        // Extract tokens
        const accessToken = cookies.find(c => c.startsWith('accessToken='))?.split(';')[0];
        const refreshToken = cookies.find(c => c.startsWith('refreshToken='))?.split(';')[0];
        
        const cookieHeader = [accessToken, refreshToken].filter(Boolean).join('; ');

        const meRes = await request(`${API_URL}/auth/me`, {
            headers: {
                'Cookie': cookieHeader
            }
        });

        console.log(`   /auth/me Status: ${meRes.status}`);
        if (meRes.status === 200) {
            const meData = JSON.parse(meRes.body);
            console.log('   ✅ Protected route access successful!');
            console.log(`   Authenticated as: ${meData.user.email}`);
        } else {
            console.log('   ❌ Protected route access failed.');
            console.log('   Response:', meRes.body);
        }

    } else {
        console.log('   ❌ No cookies received in login response!');
    }

  } catch (e) {
      console.error('   ❌ Authentication test failed with error:', e);
  }
}

verifyDeployment();
