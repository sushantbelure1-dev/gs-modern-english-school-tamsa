import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { getClasses } from '../services/api';
import ClassCard from '../components/ClassCard';
import { BookOpen, Sparkles, Heart, ArrowRight } from 'lucide-react';

export default function ClassesPage() {
  const { language, t } = useLanguage();
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    getClasses()
      .then(res => {
        if (res.data?.success) setClasses(res.data.data);
      })
      .catch(() => {});
  }, []);

  const badgeColors = ['playgroup', 'nursery', 'lkg', 'ukg'];

  return (
    <div style={{ padding: '3rem 0 5rem' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-badge">{t('navClasses')}</div>
          <h1 className="section-title">{t('classesHeading')}</h1>
          <p className="section-subtitle">{t('classesSubheading')}</p>
        </div>

        {/* Class Cards Grid */}
        <div className="classes-grid" style={{ marginBottom: '4rem' }}>
          {classes.map((cls, idx) => (
            <ClassCard
              key={cls.slug || idx}
              name={cls.name}
              slug={cls.slug}
              descEn={cls.description_en}
              descMr={cls.description_mr}
              image={cls.image_url}
              badgeClass={badgeColors[idx % 4]}
              onLearnMore={(item) => setSelectedClass(item)}
            />
          ))}
        </div>

        {/* Detailed Curriculum Methodology Section */}
        <div style={{ background: '#ffffff', borderRadius: '20px', padding: '3rem', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2.5rem' }}>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
              {language === 'mr' ? 'खेळातून शिकण्याची आधुनिक पद्धत' : 'Modern Learning Through Play & Activity'}
            </h2>
            <p style={{ color: '#64748b' }}>
              {language === 'mr'
                ? 'प्रत्येक वर्गातील अध्यापन पद्धती लहान मुलांच्या नैसर्गिक कुतूहलाला आणि आनंददायी अध्ययनाला केंद्रस्थानी ठेवून आखलेली आहे.'
                : 'Our curriculum combines sensory exploration, phonetics, cognitive puzzles, and cultural immersion.'}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '14px', borderLeft: '4px solid #ea580c' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>Playgroup</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6 }}>
                {language === 'mr' ? 'रंग, आकार, गाणी, बडबडगीते व हस्तकला यांद्वारे बौद्धिक व शारीरिक विकास.' : 'Rhymes, sensory toys, color recognition, and socialization.'}
              </p>
            </div>

            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '14px', borderLeft: '4px solid #059669' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>Nursery</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6 }}>
                {language === 'mr' ? 'अक्षरे, अंक, रेखाटन व सुसंस्कृत वातावरणात भाषिक कौशल्य.' : 'Early numbers, tracing, verbal vocabulary, and creative art.'}
              </p>
            </div>

            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '14px', borderLeft: '4px solid #1d4ed8' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>LKG</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6 }}>
                {language === 'mr' ? 'वाचन, उच्चार (Phonics), मूलभूत गणित व विज्ञानाची पहिली ओळख.' : 'Phonetics, two-letter words, basic addition concepts, and environmental awareness.'}
              </p>
            </div>

            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '14px', borderLeft: '4px solid #d97706' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>UKG</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6 }}>
                {language === 'mr' ? 'पहिलीत प्रवेशासाठी परिपूर्ण पूर्वतयारी, सुस्पष्ट संभाषण व स्वावलंबन.' : 'Complete readiness for Grade 1: reading sentences, math confidence, and active communication.'}
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/admission" className="btn-primary">
              <Heart size={18} fill="#ffffff" />
              <span>{t('heroBtnAdmission')}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Learn More Modal */}
      {selectedClass && (
        <div className="lightbox-backdrop" onClick={() => setSelectedClass(null)}>
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
            style={{ background: '#ffffff', padding: '2rem', borderRadius: '18px', maxWidth: '540px', width: '90%' }}
          >
            <img
              src={selectedClass.image}
              alt={selectedClass.name}
              style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '12px', marginBottom: '1rem' }}
            />
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              {selectedClass.name}
            </h3>
            <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {language === 'mr' ? selectedClass.descMr : selectedClass.descEn}
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                onClick={() => setSelectedClass(null)}
                className="btn-secondary"
                style={{ padding: '0.5rem 1.25rem' }}
              >
                Close
              </button>
              <Link
                to="/admission"
                className="btn-primary"
                style={{ padding: '0.5rem 1.25rem' }}
                onClick={() => setSelectedClass(null)}
              >
                {t('heroBtnAdmission')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
