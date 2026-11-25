import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Globe, Menu, X, Sparkles, Phone, MapPin, ShieldCheck, Heart } from 'lucide-react';

export default function Navbar() {
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: t('navHome') },
    { path: '/about', label: t('navAbout') },
    { path: '/classes', label: t('navClasses') },
    { path: '/staff', label: t('navPrincipalStaff') },
    { path: '/activities', label: t('navActivities') },
    { path: '/events', label: t('navEvents') },
    { path: '/photo-gallery', label: t('navPhotoGallery') },
    { path: '/video-gallery', label: t('navVideoGallery') },
    { path: '/admission', label: t('navAdmission') },
    { path: '/contact', label: t('navContact') }
  ];

  return (
    <header>
      {/* Top Bar with Language Switcher & Campus Info */}
      <div className="top-bar">
        <div className="container top-bar-content">
          <div className="top-bar-left">
            <span className="top-bar-item">
              <MapPin size={14} />
              {t('addressShort')}
            </span>
            <span className="top-bar-item" style={{ color: '#fef08a' }}>
              <Sparkles size={14} />
              {t('admissionsOpenBadge')}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Bilingual English / Marathi Button */}
            <button
              onClick={toggleLanguage}
              className="lang-switch-btn"
              title={language === 'en' ? 'मराठी मध्ये वाचा' : 'Switch to English'}
            >
              <Globe size={15} />
              <span>{language === 'en' ? 'मराठी (Marathi)' : 'English'}</span>
            </button>

            <Link
              to="/admin/login"
              style={{
                color: '#e2e8f0',
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                opacity: 0.85
              }}
            >
              <ShieldCheck size={14} />
              {t('adminPortal')}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="main-nav">
        <div className="container nav-container">
          <Link to="/" className="brand-link" onClick={() => setMobileMenuOpen(false)}>
            <img src="/logo-badge.svg" alt="G S Modern Logo" className="brand-logo" />
            <div>
              <div className="brand-title">G S Modern School</div>
              <div className="brand-location">Tamsa • Pre-Primary</div>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <ul className={`nav-menu ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            {navLinks.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/admission"
                className="nav-cta-btn"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Heart size={16} fill="#ffffff" />
                <span>{t('applyNow')}</span>
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>
    </header>
  );
}
