import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { scrollToSection } from '../../utils/helpers';
import api from '../../lib/axios';

interface MenuItem {
  id: string;
  title: string;
  link: string;
  order: number;
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [brand, setBrand] = useState({ name: 'AY Digital Institute', logo: '' });

  const defaultMenuItems = ['Home', 'Courses', 'About', 'Why Us', 'Reviews', 'Contact'];
  const portalUrl = 'http://localhost:5174';

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const [navRes, themeRes] = await Promise.all([
          api.get('/website-content/items?section=navbar'),
          api.get('/website-content/items?section=theme')
        ]);
        
        if (navRes.data && navRes.data.length > 0) {
          setMenuItems(navRes.data.sort((a: MenuItem, b: MenuItem) => a.order - b.order));
        } else {
          // Fallback to default if no items found
          setMenuItems(defaultMenuItems.map((item, index) => ({
            id: `default-${index}`,
            title: item,
            link: item === 'Home' ? 'home' : item.toLowerCase().replace(' ', '-'),
            order: index
          })));
        }

        if (themeRes.data && themeRes.data.length > 0) {
          const nameItem = themeRes.data.find((item: any) => item.key === 'brand_name');
          const logoItem = themeRes.data.find((item: any) => item.key === 'brand_logo');
          
          setBrand({
            name: nameItem ? (nameItem.subtitle || nameItem.title) : 'AY Digital Institute',
            logo: logoItem ? (logoItem.subtitle || logoItem.title) : ''
          });
        }
      } catch (error) {
        console.error('Failed to fetch menu items', error);
        // Fallback to default
        setMenuItems(defaultMenuItems.map((item, index) => ({
          id: `default-${index}`,
          title: item,
          link: item === 'Home' ? 'home' : item.toLowerCase().replace(' ', '-'),
          order: index
        })));
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuClick = (item: MenuItem) => {
    // If link starts with /, it's a route, otherwise it's a section ID
    if (item.link && item.link.startsWith('/')) {
        // Handle route navigation if needed, or just use href
        window.location.href = item.link;
    } else {
        const sectionId = item.link || (item.title === 'Home' ? 'home' : item.title.toLowerCase().replace(' ', '-'));
        scrollToSection(sectionId);
    }
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" onClick={() => scrollToSection('home')}>
              {brand.logo ? (
                <div className="flex items-center gap-2">
                   <img src={brand.logo} alt={brand.name} className="h-10 w-auto object-contain" />
                   <h1 className="text-xl md:text-2xl font-bold text-primary-600 transition-transform duration-300 hover:scale-105 cursor-pointer">
                    {brand.name}
                  </h1>
                </div>
              ) : (
                <h1 className="text-2xl font-bold text-primary-600 transition-transform duration-300 hover:scale-105 cursor-pointer">
                  {brand.name}
                </h1>
              )}
            </Link>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8">
            {!loading && menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item)}
                className={`font-medium transition-colors duration-200 ${
                  isScrolled ? 'text-gray-700 hover:text-primary-600' : 'text-gray-800 hover:text-primary-600'
                }`}
              >
                {item.title}
              </button>
            ))}
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <a href={`${portalUrl}/login`} className="font-medium text-gray-700 hover:text-primary-600 transition-colors">
              Sign In
            </a>
            <a href={`${portalUrl}/register`} className="btn-primary text-sm py-2 px-6">
              Register
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-primary-600 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 bg-white absolute left-0 right-0 shadow-lg px-4">
            <nav className="flex flex-col space-y-4">
              {!loading && menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item)}
                  className="text-left text-gray-700 hover:text-primary-600 font-medium py-2"
                >
                  {item.title}
                </button>
              ))}
              <div className="flex flex-col space-y-2 pt-4">
                <a
                  href={`${portalUrl}/login`}
                  className="btn-secondary text-sm w-full flex items-center justify-center gap-2"
                >
                  Sign In
                </a>
                <a
                  href={`${portalUrl}/register`}
                  className="btn-primary text-sm w-full flex items-center justify-center gap-2"
                >
                  Register
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};


export default Header;

