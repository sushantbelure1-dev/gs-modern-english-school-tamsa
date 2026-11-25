import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle2, ShieldCheck, Heart, MapPin, Sparkles, BookOpen, UserCheck, Smile } from 'lucide-react';

export default function About() {
  const { language, t } = useLanguage();

  const facilities = [
    { title: t('aboutFacilitySmart'), descEn: 'Visual and interactive learning for fast cognitive understanding.', descMr: 'दृकश्राव्य आणि डिजिटल साहित्याद्वारे रंजक अध्ययन.' },
    { title: t('aboutFacilityPlay'), descEn: 'Spacious ground for running, ring games, yoga, and athletic play.', descMr: 'शारीरिक विकासासाठी मोकळे मैदान, खेळणी व धावण्याची जागा.' },
    { title: t('aboutFacilityLibrary'), descEn: 'Illustrated picture books, moral storybooks, and phonetics guides.', descMr: 'रंगीबेरंगी चित्रे, गोष्टींची पुस्तके व बाल वाचनालय.' },
    { title: t('aboutFacilityCCTV'), descEn: '24/7 CCTV vigilance ensuring total safety and parent peace of mind.', descMr: 'सुरक्षेसाठी २४ तास CCTV कॅमेरे आणि सुरक्षित इमारत.' },
    { title: t('aboutFacilityWater'), descEn: 'Pure and safe drinking water station for all students.', descMr: 'स्वच्छ, शुद्ध आणि सुरक्षित पिण्याच्या पाण्याची सोय.' },
    { title: t('aboutFacilityHealth'), descEn: 'Periodic pediatric health and wellness checks for early monitoring.', descMr: 'विद्यार्थ्यांची नियमित प्राथमिक आरोग्य तपासणी.' },
    { title: t('aboutFacilityTransport'), descEn: 'Dedicated school van / transport facility for designated neighborhoods.', descMr: 'निवडक परिसरासाठी सुरक्षित शालेय वाहतूक व्यवस्था.' },
    { title: t('aboutFacilityValues'), descEn: 'Inculcating respect, honesty, sharing, and cultural roots.', descMr: 'भारतीय संस्कृती, राष्ट्रप्रेम आणि नैतिक मूल्यांची जोपासना.' }
  ];

  return (
    <div style={{ padding: '3rem 0 5rem' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-badge">{t('navAbout')}</div>
          <h1 className="section-title">{t('aboutHeading')}</h1>
          <p className="section-subtitle">{t('aboutSubheading')}</p>
        </div>

        {/* Story & Philosophy Grid */}
        <div className="about-grid" style={{ marginBottom: '4rem' }}>
          <div>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem' }}>
              {language === 'mr' ? 'संस्कार, शिक्षण आणि सर्वांगीण विकास' : 'Care, Culture & Foundational Excellence'}
            </h2>
            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
              {t('aboutP1')}
            </p>
            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              {t('aboutP2')}
            </p>

            <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', borderLeft: '4px solid #1d4ed8', marginBottom: '1.5rem' }}>
              <div style={{ fontWeight: 700, color: '#1e3a8a', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <MapPin size={18} style={{ color: '#ea580c' }} />
                <span>Near Digambar Swami Primary School, Mahatma Basaveshwar Nagar, Tamsa</span>
              </div>
              <div style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.35rem' }}>
                Taluka Hadgaon, District Nanded, Maharashtra.
              </div>
            </div>

            <Link to="/admission" className="btn-primary">
              <Heart size={18} fill="#ffffff" />
              <span>{t('heroBtnAdmission')}</span>
            </Link>
          </div>

          <div className="about-img-collage">
            <img
              src="/school-photos/campus-garden-overview.jpg"
              alt="School Campus"
              className="about-main-img"
            />
            <div className="about-floating-badge" style={{ bottom: '-15px', right: '0px' }}>
              <Sparkles size={28} style={{ color: '#f59e0b' }} />
              <div>
                <div style={{ fontWeight: 800, color: '#0f172a' }}>Playgroup to UKG</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Child-Centric Learning</div>
              </div>
            </div>
          </div>
        </div>

        {/* Facilities Section */}
        <div style={{ background: '#ffffff', borderRadius: '22px', padding: '3.5rem 2.5rem', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-color)', marginBottom: '4rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div className="section-badge" style={{ background: '#ecfdf5', color: '#059669', borderColor: '#a7f3d0' }}>
              {language === 'mr' ? 'शाळेची वैशिष्ट्ये' : 'Campus Facilities'}
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>
              {language === 'mr' ? 'पालकांसाठी विश्वास आणि पाल्यांसाठी सुरक्षितता' : 'Safe, Inspiring and Enriching Environment'}
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {facilities.map((fac, idx) => (
              <div key={idx} style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#1d4ed8', fontWeight: 800, fontSize: '1.05rem', marginBottom: '0.5rem' }}>
                  <CheckCircle2 size={20} style={{ color: '#059669', flexShrink: 0 }} />
                  <span>{fac.title}</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6 }}>
                  {language === 'mr' ? fac.descMr : fac.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Child Safety and Privacy Statement */}
        <div style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #fff7ed 100%)', borderRadius: '18px', padding: '2rem 2.5rem', border: '1px solid #fed7aa' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', color: '#c2410c' }}>
            <ShieldCheck size={26} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
              {language === 'mr' ? 'बाल सुरक्षा आणि गोपनीयता धोरण' : 'Child Safety & Privacy Commitment'}
            </h3>
          </div>
          <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.7 }}>
            {language === 'mr'
              ? 'जि एस मॉडर्न स्कूल तामसा येथे बालकांची वैयक्तिक सुरक्षा, सन्मान आणि गोपनीयता यांना सर्वोच्च प्राधान्य दिले जाते. शालेय कार्यक्रमांचे फोटो आणि व्हिडिओ हे केवळ शैक्षणिक व पालकांच्या संमतीनुसारच प्रदर्शित केले जातात. पालकांची माहिती कोणत्याही त्रयस्थ संस्थेला दिली जात नाही.'
              : 'At G S Modern English School Tamsa, our students safety and privacy are of utmost paramount importance. All children photos and activity videos are published with parent/guardian consent. Personal information submitted through enquiry forms is securely guarded.'}
          </p>
        </div>
      </div>
    </div>
  );
}
