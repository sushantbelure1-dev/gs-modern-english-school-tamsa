import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, User, ShieldCheck, Heart, Sparkles, Phone, Mail } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div>
            <div className="footer-brand">
              <img src="/logo-badge.svg" alt="G S Modern Logo" style={{ width: '45px', height: '45px' }} />
              <div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>G S Modern School</div>
                <div style={{ fontSize: '0.8rem', color: '#f59e0b', fontWeight: 700 }}>Tamsa • Pre-Primary</div>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#94a3b8', marginBottom: '1.25rem' }}>
              {t('footerAboutText')}
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#1e293b', padding: '0.4rem 0.85rem', borderRadius: '999px', fontSize: '0.8rem', color: '#38bdf8' }}>
              <Sparkles size={14} />
              {t('tagline')}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-title">{t('footerQuickLinks')}</h4>
            <ul className="footer-links">
              <li><Link to="/">{t('navHome')}</Link></li>
              <li><Link to="/about">{t('navAbout')}</Link></li>
              <li><Link to="/staff">{t('navPrincipalStaff')}</Link></li>
              <li><Link to="/activities">{t('navActivities')}</Link></li>
              <li><Link to="/events">{t('navEvents')}</Link></li>
              <li><Link to="/photo-gallery">{t('navPhotoGallery')}</Link></li>
              <li><Link to="/video-gallery">{t('navVideoGallery')}</Link></li>
            </ul>
          </div>

          {/* Classes */}
          <div>
            <h4 className="footer-title">{t('footerClasses')}</h4>
            <ul className="footer-links">
              <li><Link to="/classes">Playgroup (प्लेग्रुप)</Link></li>
              <li><Link to="/classes">Nursery (नर्सरी)</Link></li>
              <li><Link to="/classes">LKG (एलकेजी)</Link></li>
              <li><Link to="/classes">UKG (युकेजी)</Link></li>
              <li style={{ marginTop: '1rem' }}>
                <Link to="/admission" style={{ color: '#fb923c', fontWeight: 700 }}>
                  👉 {t('navAdmission')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Campus Location & Info */}
          <div>
            <h4 className="footer-title">{t('footerContactInfo')}</h4>
            <p style={{ fontSize: '0.9rem', display: 'flex', gap: '0.5rem', color: '#cbd5e1', marginBottom: '0.75rem' }}>
              <MapPin size={18} style={{ color: '#f97316', flexShrink: 0, marginTop: '2px' }} />
              <span>Near Digambar Swami Primary School, Mahatma Basaveshwar Nagar, Tamsa, Tal. Hadgaon, Dist. Nanded, Maharashtra.</span>
            </p>
            <p style={{ fontSize: '0.9rem', display: 'flex', gap: '0.5rem', color: '#cbd5e1', marginBottom: '0.75rem' }}>
              <User size={18} style={{ color: '#3b82f6', flexShrink: 0, marginTop: '2px' }} />
              <span>Principal: <strong>Usha Belure</strong></span>
            </p>
            <p style={{ fontSize: '0.9rem', display: 'flex', gap: '0.5rem', color: '#cbd5e1', marginBottom: '0.6rem' }}>
              <Phone size={17} style={{ color: '#10b981', flexShrink: 0, marginTop: '2px' }} />
              <a href="tel:+918385853001" style={{ color: '#e2e8f0' }}>+91 8385853001</a>
            </p>
            <p style={{ fontSize: '0.9rem', display: 'flex', gap: '0.5rem', color: '#cbd5e1', marginBottom: '0.75rem' }}>
              <Mail size={17} style={{ color: '#f59e0b', flexShrink: 0, marginTop: '2px' }} />
              <a href="mailto:ushabelure999@gmail.com" style={{ color: '#e2e8f0' }}>ushabelure999@gmail.com</a>
            </p>
            <div style={{ marginTop: '1.25rem' }}>
              <Link to="/admin/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', fontSize: '0.8rem' }}>
                <ShieldCheck size={14} />
                <span>{t('adminPortal')}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div>{t('footerCopyright')}</div>
          <div style={{ color: '#64748b' }}>
            <span style={{ marginRight: '1rem' }}>{t('footerPrivacyNotice')}</span>
            <span>{t('developedWithLove')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
