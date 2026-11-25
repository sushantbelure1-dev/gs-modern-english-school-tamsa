import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, User, Phone, Mail, Clock, ShieldCheck, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ContactPage() {
  const { language, t } = useLanguage();

  return (
    <div style={{ padding: '3rem 0 5rem' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-badge">{t('navContact')}</div>
          <h1 className="section-title">{t('contactHeading')}</h1>
          <p className="section-subtitle">{t('contactSubheading')}</p>
        </div>

        <div className="contact-grid">
          {/* Contact Details Card */}
          <div className="contact-info-card">
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>
              {t('schoolName')}
            </h2>

            {/* Address */}
            <div className="contact-info-item">
              <div className="contact-icon-circle">
                <MapPin size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>{t('contactAddressTitle')}</h3>
                <p style={{ color: '#475569', fontSize: '0.95rem', marginTop: '0.2rem', lineHeight: 1.6 }}>
                  {t('contactAddressDetails')}
                </p>
              </div>
            </div>

            {/* Principal */}
            <div className="contact-info-item">
              <div className="contact-icon-circle" style={{ background: '#ecfdf5', color: '#059669' }}>
                <User size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>{t('contactPrincipalTitle')}</h3>
                <p style={{ color: '#475569', fontSize: '0.95rem', marginTop: '0.2rem' }}>
                  <strong>{t('contactPrincipalVal')}</strong> (Principal)
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="contact-info-item">
              <div className="contact-icon-circle" style={{ background: '#fff7ed', color: '#ea580c' }}>
                <Phone size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>{t('contactPhoneTitle')}</h3>
                <p style={{ color: '#1d4ed8', fontSize: '1rem', fontWeight: 700, marginTop: '0.2rem' }}>
                  <a href="tel:+918385853001">{t('contactPhonePlaceholder')}</a>
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="contact-info-item">
              <div className="contact-icon-circle" style={{ background: '#fef3c7', color: '#d97706' }}>
                <Mail size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>{t('contactEmailTitle')}</h3>
                <p style={{ color: '#1d4ed8', fontSize: '0.95rem', fontWeight: 600, marginTop: '0.2rem' }}>
                  <a href="mailto:ushabelure999@gmail.com">{t('contactEmailPlaceholder')}</a>
                </p>
              </div>
            </div>

            {/* Office Hours */}
            <div className="contact-info-item" style={{ marginBottom: 0 }}>
              <div className="contact-icon-circle" style={{ background: '#f1f5f9', color: '#475569' }}>
                <Clock size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>{t('contactHoursTitle')}</h3>
                <p style={{ color: '#475569', fontSize: '0.95rem', marginTop: '0.2rem' }}>
                  {t('contactHoursVal')}
                </p>
              </div>
            </div>

            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #f1f5f9' }}>
              <Link to="/admission" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                <Heart size={18} fill="#ffffff" />
                <span>{t('heroBtnAdmission')}</span>
              </Link>
            </div>
          </div>

          {/* Map Location & Directions */}
          <div className="contact-info-card">
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
              {t('contactMapTitle')}
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              {t('contactMapNote')}
            </p>

            {/* Embedded Google Maps / Configurable Locator Box */}
            <div className="map-placeholder-box">
              <MapPin size={38} style={{ color: '#ea580c', marginBottom: '0.75rem' }} />
              <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0f172a' }}>
                G S Modern English School
              </div>
              <div style={{ fontSize: '0.875rem', color: '#64748b', maxWidth: '360px', marginTop: '0.35rem' }}>
                Near Digambar Swami Primary School, Mahatma Basaveshwar Nagar, Tamsa, Maharashtra 431713
              </div>
              <a
                href="https://maps.google.com/?q=Tamsa+Hadgaon+Nanded"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ marginTop: '1.25rem', padding: '0.5rem 1rem', fontSize: '0.85rem' }}
              >
                <span>Open in Google Maps</span>
              </a>
            </div>

            <div style={{ marginTop: '1.75rem', background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', borderLeft: '4px solid #10b981' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#065f46', marginBottom: '0.3rem' }}>
                {language === 'mr' ? 'भेट देण्यापूर्वी सूचना' : 'Visitor Information'}
              </h4>
              <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.6 }}>
                {language === 'mr'
                  ? 'पालकांना विनंती आहे की प्रवेश चौकशीसाठी प्रत्यक्ष येताना मुलाचा जन्मदाखला व आधार कार्डची प्रत सोबत आणावी.'
                  : 'Parents visiting for admission enquiries are advised to carry copies of child birth certificate and ID proof during campus hours.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
