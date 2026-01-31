
import { strict as assert } from 'assert';

const API_URL = 'https://api-eight-rust-59.vercel.app/api/v1';
const ADMIN_EMAIL = 'admin@aydigital.com';
const ADMIN_PASSWORD = 'admin123';

async function verifyDeployment() {
  console.log('🔍 Starting Deployment Verification...');
  console.log(`📍 API URL: ${API_URL}`);

  // 1. Check Public Endpoint (if any, or just check if API responds)
  // We don't have a guaranteed public endpoint in the seed other than auth, 
  // but let's try a health check or just see if the server is up.
  // Actually, main.ts excluded 'health' from prefix, so it should be at root/health or api/v1/health depending on how it's mounted.
  // main.ts: app.setGlobalPrefix('api/v1', { exclude: [{ path: 'health', method: RequestMethod.GET }] });
  // This means /health is NOT prefixed. Let's try https://api-eight-rust-59.vercel.app/health
  
  try {
    console.log('\n1. 🏥 Checking Health Endpoint...');
    const healthRes = await fetch('https://api-eight-rust-59.vercel.app/health');
    console.log(`   Status: ${healthRes.status}`);
    if (healthRes.ok) {
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
    const loginRes = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
      }),
    });

    console.log(`   Login Status: ${loginRes.status}`);
    
    if (!loginRes.ok) {
        const text = await loginRes.text();
        console.error('   ❌ Login failed:', text);
        return;
    }

    const loginData = await loginRes.json();
    console.log('   ✅ Login successful!');
    console.log(`   User: ${loginData.user.email} (${loginData.user.role})`);

    // 3. Check Cookies
    console.log('\n3. 🍪 Verifying Cookies...');
    const cookies = loginRes.headers.get('set-cookie');
    if (cookies) {
        console.log('   Cookies received:', cookies);
        
        // Verify SameSite=None and Secure
        if (cookies.includes('SameSite=None') && cookies.includes('Secure')) {
             console.log('   ✅ Cookies have correct SameSite=None and Secure attributes.');
        } else {
             console.log('   ❌ Cookies MISSING SameSite=None or Secure attributes! Cross-site auth will fail.');
        }
    } else {
        console.log('   ❌ No cookies received in login response!');
    }

    // 4. Test Protected Endpoint (/auth/me)
    console.log('\n4. 🛡️ Testing Protected Endpoint (/auth/me)...');
    // We need to extract the cookies to send them back.
    // In a real browser, this happens automatically. Here we simulate it.
    
    // Simple cookie parser for the test
    const accessTokenCookie = cookies?.split(',').find(c => c.trim().startsWith('accessToken='));
    const refreshTokenCookie = cookies?.split(',').find(c => c.trim().startsWith('refreshToken='));
    
    const cookieHeader = [accessTokenCookie, refreshTokenCookie].filter(Boolean).join('; ');
    
    const meRes = await fetch(`${API_URL}/auth/me`, {
        headers: {
            'Cookie': cookieHeader
        }
    });

    console.log(`   /auth/me Status: ${meRes.status}`);
    if (meRes.ok) {
        const meData = await meRes.json();
        console.log('   ✅ Protected route access successful!');
        console.log(`   Authenticated as: ${meData.user.email}`);
    } else {
        console.log('   ❌ Protected route access failed.');
        console.log('   Response:', await meRes.text());
    }

  } catch (e) {
      console.error('   ❌ Authentication test failed with error:', e);
  }
}

verifyDeployment();
