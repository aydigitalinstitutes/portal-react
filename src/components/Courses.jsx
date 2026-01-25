import React from 'react';
import {
  FaLaptop,
  FaFileExcel,
  FaCode,
  FaPalette,
  FaCalculator,
  FaShieldAlt,
  FaGraduationCap,
  FaCertificate,
  FaNetworkWired,
  FaDesktop,
  FaTerminal,
  FaCog,
  FaWifi,
  FaBullhorn,
  FaUniversity,
} from 'react-icons/fa';

const Courses = () => {
  const courses = [
    // Basic & Foundational Computer Courses
    {
      id: 1,
      title: 'ACC – Awareness in Computer Concepts',
      category: 'Basic & Foundational',
      icon: <FaDesktop className="text-4xl text-primary-600" />,
      topics: [
        'Introductory level computer awareness',
        'Basic concepts before CCC',
        'Foundation for computer literacy',
      ],
      duration: 'Short',
      level: 'Very Basic',
    },
    {
      id: 2,
      title: 'BCC – Basic Computer Course',
      category: 'Basic & Foundational',
      icon: <FaLaptop className="text-4xl text-primary-600" />,
      topics: [
        'Windows, files, internet, email',
        'MS Office basics',
        'Typing practice & basic troubleshooting',
      ],
      duration: '~3 months',
      level: 'Beginner',
    },
    {
      id: 3,
      title: 'CCC – Course on Computer Concepts',
      category: 'Basic & Foundational',
      icon: <FaCertificate className="text-4xl text-primary-600" />,
      topics: [
        'Computer fundamentals',
        'MS Office applications',
        'Internet & email basics',
        'Government recognized certificate',
      ],
      duration: '~3 months',
      level: 'Basic',
    },
    {
      id: 4,
      title: 'CCC Plus – Course on Computer Concepts Plus',
      category: 'Basic & Foundational',
      icon: <FaGraduationCap className="text-4xl text-primary-600" />,
      topics: [
        'Extended CCC content',
        'Advanced computer concepts',
        'More comprehensive coverage',
      ],
      duration: 'Slightly longer',
      level: 'Intermediate',
    },
    {
      id: 5,
      title: 'ECC – Expert Computer Course',
      category: 'Basic & Foundational',
      icon: <FaGraduationCap className="text-4xl text-primary-600" />,
      topics: [
        'More advanced than CCC/CCC Plus',
        'Deeper computer skills',
        'Expert-level concepts',
      ],
      duration: 'Slightly longer',
      level: 'Intermediate',
    },
    // Level-Up Courses
    {
      id: 6,
      title: "DOEACC 'O' Level (NIELIT O Level)",
      category: 'NIELIT Professional',
      icon: <FaCode className="text-4xl text-primary-600" />,
      topics: [
        'Foundation course in computer applications',
        'Programming fundamentals',
        'Database management',
        'Web design & development',
        'Government recognized certification',
      ],
      duration: '~1 year',
      level: 'Foundation (Diploma Equivalent)',
    },
    {
      id: 16,
      title: "DOEACC 'A' Level (NIELIT A Level)",
      category: 'NIELIT Professional',
      icon: <FaGraduationCap className="text-4xl text-primary-600" />,
      topics: [
        'Advanced Diploma in Computer Applications',
        'Next step after O Level',
        'Advanced programming & software development',
        'Higher professional certification',
        'Widely recognized by employers',
      ],
      duration: '~1 year',
      level: 'Advanced Diploma',
    },
    {
      id: 17,
      title: "DOEACC 'B' Level (NIELIT B Level)",
      category: 'NIELIT Professional',
      icon: <FaUniversity className="text-4xl text-primary-600" />,
      topics: [
        'Higher professional certification',
        'Advanced software & IT topics',
        'Deep technical knowledge',
        'Professional IT expertise',
        'Industry-recognized certification',
      ],
      duration: '~1.5-2 years',
      level: 'Professional',
    },
    {
      id: 18,
      title: "DOEACC 'C' Level (NIELIT C Level)",
      category: 'NIELIT Professional',
      icon: <FaUniversity className="text-4xl text-primary-600" />,
      topics: [
        'Highest level professional certification',
        'Expert-level IT knowledge',
        'Advanced software engineering',
        'Research & development focus',
        'Top-tier industry recognition',
      ],
      duration: '~2 years',
      level: 'Expert',
    },
    {
      id: 7,
      title: 'DCA – Diploma in Computer Applications',
      category: 'Level-Up Courses',
      icon: <FaFileExcel className="text-4xl text-primary-600" />,
      topics: [
        'MS Office suite (Word, Excel, PowerPoint)',
        'Internet tools & applications',
        'Basic software skills',
        'Perfect for office jobs',
      ],
      duration: '6–12 months',
      level: 'Diploma',
    },
    {
      id: 8,
      title: 'ADCA – Advanced Diploma in Computer Applications',
      category: 'Level-Up Courses',
      icon: <FaGraduationCap className="text-4xl text-primary-600" />,
      topics: [
        'Advanced MS Office skills',
        'Additional software applications',
        'Deeper understanding of computer systems',
        'More comprehensive than DCA',
      ],
      duration: '6–12 months',
      level: 'Advanced Diploma',
    },
    // Other Useful Certification Courses
    {
      id: 9,
      title: 'Hardware & Networking',
      category: 'Other Certifications',
      icon: <FaNetworkWired className="text-4xl text-primary-600" />,
      topics: [
        'PC assembly & troubleshooting',
        'Network setup & configuration',
        'Hardware maintenance',
        'Basic networking concepts',
      ],
      duration: '3–6 months',
      level: 'Intermediate',
    },
    {
      id: 10,
      title: 'Office Automation & Data Entry',
      category: 'Other Certifications',
      icon: <FaFileExcel className="text-4xl text-primary-600" />,
      topics: [
        'Focused Excel training',
        'Word & PowerPoint mastery',
        'Data entry techniques',
        'Office productivity skills',
      ],
      duration: '2–3 months',
      level: 'Beginner to Intermediate',
    },
    {
      id: 11,
      title: 'Web Design / Web Development Basics',
      category: 'Other Certifications',
      icon: <FaCode className="text-4xl text-primary-600" />,
      topics: [
        'HTML & CSS fundamentals',
        'Website building from scratch',
        'Basic JavaScript',
        'Portfolio development',
      ],
      duration: '3–6 months',
      level: 'Beginner to Intermediate',
    },
    {
      id: 12,
      title: 'Tally / Accounting Software',
      category: 'Other Certifications',
      icon: <FaCalculator className="text-4xl text-primary-600" />,
      topics: [
        'Billing & inventory management',
        'GST basics & filing',
        'Practical business entries',
        'Accounting fundamentals',
      ],
      duration: '2–4 months',
      level: 'Intermediate',
    },
    {
      id: 13,
      title: 'Web Development (HTML, CSS, JavaScript, React)',
      category: 'Other Certifications',
      icon: <FaCode className="text-4xl text-primary-600" />,
      topics: [
        'Website building from scratch',
        'React projects & frameworks',
        'Portfolio + hosting',
        'Full-stack development basics',
      ],
      duration: '6–12 months',
      level: 'Advanced',
    },
    {
      id: 14,
      title: 'Graphic Design',
      category: 'Other Certifications',
      icon: <FaPalette className="text-4xl text-primary-600" />,
      topics: [
        'Design principles & theory',
        'Photoshop & Illustrator basics',
        'Social media posts & flyers',
        'Brand identity design',
      ],
      duration: '3–6 months',
      level: 'Intermediate',
    },
    {
      id: 15,
      title: 'Cybersecurity Basics',
      category: 'Other Certifications',
      icon: <FaShieldAlt className="text-4xl text-primary-600" />,
      topics: [
        'Online safety & privacy',
        'Password management',
        'Phishing awareness',
        'Basic networking security',
      ],
      duration: '2–3 months',
      level: 'Beginner to Intermediate',
    },
    // NIELIT Short-Term & Skill Boost Courses
    {
      id: 19,
      title: 'Python Programming',
      category: 'NIELIT Short-Term',
      icon: <FaTerminal className="text-4xl text-primary-600" />,
      topics: [
        'Python fundamentals & syntax',
        'Data structures & algorithms',
        'Object-oriented programming',
        'Practical projects & applications',
      ],
      duration: '4–12 weeks',
      level: 'Intermediate',
    },
    {
      id: 20,
      title: 'Artificial Intelligence Basics',
      category: 'NIELIT Short-Term',
      icon: <FaCog className="text-4xl text-primary-600" />,
      topics: [
        'AI fundamentals & concepts',
        'Machine learning basics',
        'Neural networks introduction',
        'Practical AI applications',
      ],
      duration: '6–12 weeks',
      level: 'Intermediate to Advanced',
    },
    {
      id: 21,
      title: 'IoT (Internet of Things)',
      category: 'NIELIT Short-Term',
      icon: <FaWifi className="text-4xl text-primary-600" />,
      topics: [
        'IoT concepts & architecture',
        'Sensor integration',
        'Device connectivity',
        'Smart device development',
      ],
      duration: '6–12 weeks',
      level: 'Intermediate',
    },
    {
      id: 22,
      title: 'Digital Marketing',
      category: 'NIELIT Short-Term',
      icon: <FaBullhorn className="text-4xl text-primary-600" />,
      topics: [
        'SEO & SEM fundamentals',
        'Social media marketing',
        'Content marketing strategies',
        'Analytics & campaign management',
      ],
      duration: '4–8 weeks',
      level: 'Beginner to Intermediate',
    },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="courses" className="bg-white py-20">
      <div className="section-container">
        <h2 className="section-title">Our Courses</h2>
        <p className="section-subtitle">
          Choose from basic to advanced courses — NIELIT certified courses (ACC, BCC, CCC, O/A/B/C Level), 
          professional diplomas (DCA, ADCA), and modern skill courses (Python, AI, IoT, Digital Marketing). 
          Perfect for beginners, job seekers, and professionals. All NIELIT certifications are government-recognized and nationally valid.
        </p>

        {/* Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-primary-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col"
            >
              <div className="flex justify-center mb-4">{course.icon}</div>
              <div className="mb-2">
                <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-2 py-1 rounded">
                  {course.category}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {course.title}
              </h3>
              <div className="flex gap-4 mb-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <FaGraduationCap className="text-primary-500" />
                  {course.level}
                </span>
                <span className="flex items-center gap-1">
                  <FaCertificate className="text-primary-500" />
                  {course.duration}
                </span>
              </div>
              <ul className="space-y-2 flex-grow">
                {course.topics.map((topic, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-600">
                    <span className="text-primary-600 mt-1">•</span>
                    <span className="text-sm">{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center bg-primary-50 rounded-xl p-8 border-2 border-primary-200">
          <p className="text-lg text-gray-700 mb-4">
            <strong>Not sure which course to choose?</strong>
          </p>
          <button
            onClick={() => scrollToSection('contact')}
            className="btn-primary"
          >
            Get Free Counseling
          </button>
        </div>
      </div>
    </section>
  );
};

export default Courses;
