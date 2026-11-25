import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getStaff } from '../services/api';
import { Award, User, ShieldCheck, Heart } from 'lucide-react';

export default function StaffPage() {
  const { language, t } = useLanguage();
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    getStaff()
      .then(res => {
        if (res.data?.success) setStaff(res.data.data);
      })
      .catch(() => {});
  }, []);

  // Principal is first
  const principal = staff.find(s => s.role_en === 'Principal') || {
    name_en: 'Usha Belure',
    name_mr: 'उषा बेलुरे',
    role_en: 'Principal',
    role_mr: 'मुख्याध्यापिका',
    photo_url: '/school-photos/principal-usha-belure.jpg'
  };

  const otherStaff = staff.filter(s => s.role_en !== 'Principal');

  return (
    <div style={{ padding: '3rem 0 5rem' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-badge">{t('navPrincipalStaff')}</div>
          <h1 className="section-title">{t('staffHeading')}</h1>
          <p className="section-subtitle">{t('staffSubheading')}</p>
        </div>

        {/* Principal Feature Card */}
        <div className="principal-spotlight" style={{ margin: '0 0 4rem' }}>
          <div className="principal-grid">
            <div className="principal-avatar-wrap">
              <img
                src={principal.photo_url || '/school-photos/principal-usha-belure.jpg'}
                alt={principal.name_en}
                className="principal-img"
                style={{ objectPosition: 'top center' }}
              />
            </div>
            <div>
              <div className="section-badge" style={{ background: '#fef3c7', color: '#b45309', borderColor: '#fde68a' }}>
                {language === 'mr' ? 'मुख्याध्यापिका' : 'Principal'}
              </div>
              <h2 className="principal-name" style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>
                {language === 'mr' ? principal.name_mr : principal.name_en}
              </h2>
              <div className="principal-role" style={{ marginBottom: '1.25rem' }}>
                {language === 'mr' ? principal.role_mr : principal.role_en} • G S Modern English School Tamsa
              </div>
              <blockquote className="principal-quote">
                "{t('principalQuote')}"
              </blockquote>
            </div>
          </div>
        </div>

        {/* Staff Members Grid */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', textAlign: 'center', marginBottom: '2.5rem' }}>
            {language === 'mr' ? 'आमचे सन्माननीय शिक्षक व कर्मचारी वर्ग' : 'Our Caring Teachers & Staff'}
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            {otherStaff.map((member, idx) => (
              <div
                key={member.id || idx}
                style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-sm)',
                  border: '1px solid var(--border-color)',
                  textAlign: 'center',
                  transition: 'transform 0.25s'
                }}
              >
                <div style={{ height: '250px', background: '#f8fafc', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {member.photo_url ? (
                    <img
                      src={member.photo_url}
                      alt={member.name_en}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
                    />
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#cbd5e1', gap: '0.5rem' }}>
                      <User size={64} strokeWidth={1.5} />
                    </div>
                  )}
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.35rem' }}>
                    {language === 'mr' ? member.name_mr : member.name_en}
                  </h4>
                  <div
                    style={{
                      display: 'inline-block',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: member.role_en === 'Peon' ? '#b45309' : (member.role_en === 'Driver' ? '#047857' : '#1d4ed8'),
                      background: member.role_en === 'Peon' ? '#fef3c7' : (member.role_en === 'Driver' ? '#d1fae5' : '#eff6ff'),
                      padding: '0.25rem 0.75rem',
                      borderRadius: '999px'
                    }}
                  >
                    {language === 'mr' ? member.role_mr : member.role_en}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
