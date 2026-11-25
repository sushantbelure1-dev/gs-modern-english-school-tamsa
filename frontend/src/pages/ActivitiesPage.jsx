import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, Heart, Sun, Trees, Palette, Dumbbell, BookOpen } from 'lucide-react';

export default function ActivitiesPage() {
  const { language, t } = useLanguage();

  const activities = [
    {
      titleEn: '21 June International Yoga Day',
      titleMr: '२१ जून आंतरराष्ट्रीय योग दिन',
      descEn: 'Daily morning prayer and celebration of International Yoga Day where tiny tots practice healthy asanas, breathing techniques, and posture building.',
      descMr: 'दररोजची प्रार्थना आणि २१ जून रोजी जागतिक योग दिनानिमित्त योगासनांचे प्रात्यक्षिक, ध्यान व शारीरिक लवचिकता वाढविणारे व्यायाम.',
      image: '/school-photos/international-yoga-day.jpg',
      tag: 'YOGA & WELLNESS',
      tagColor: '#059669'
    },
    {
      titleEn: 'Harit Utsav & Green Day',
      titleMr: 'हरित दिन (Green Day) व पर्यावरण जाणीव',
      descEn: 'Hands-on tree planting, identifying flowers and leaves, nature exploration frames, and instilling love for mother earth.',
      descMr: 'वृक्षारोपण, पाना-फुलांची ओळख आणि लहान वयातच पर्यावरणाविषयी प्रेम, कृतज्ञता व निसर्ग संवर्धनाची जाणीव निर्माण करणारे उपक्रम.',
      image: '/school-photos/green-day-celebration.jpg',
      tag: 'NATURE & ECOLOGY',
      tagColor: '#10b981'
    },
    {
      titleEn: 'Yellow Day Bright Color Learning',
      titleMr: 'पिवळा रंग दिवस (Yellow Day) आनंदोत्सव',
      descEn: 'Celebration of sunshine color with yellow dress-ups, balloons, sensory crafts, and making early childhood color differentiation unforgettable.',
      descMr: 'पिवळ्या रंगाचे फुगे, वेशभूषा आणि हस्तकलेच्या माध्यमातून मुलांमध्ये रंगांची ओळख करून देणारा व उत्साह वाढविणारा रंजक दिवस.',
      image: '/school-photos/yellow-day-celebration.jpg',
      tag: 'COLOR DISCOVERY',
      tagColor: '#f59e0b'
    },
    {
      titleEn: 'English Alphabet A to Z Lineup',
      titleMr: 'इंग्रजी वर्णमाला (A to Z) उपक्रम',
      descEn: 'Interactive alphabet card lineup and phonics drills that develop early vocabulary, letter recognition, and speech clarity with confidence.',
      descMr: 'A to Z अक्षरांची प्रात्यक्षिकासह ओळख, सुस्पष्ट उच्चार आणि संवादातून इंग्रजी भाषेची गोडी निर्माण करणारी पद्धत.',
      image: '/school-photos/alphabet-activity-lineup.jpg',
      tag: 'EARLY LITERACY',
      tagColor: '#3b82f6'
    },
    {
      titleEn: 'Montessori & Smart Play-Way Learning',
      titleMr: 'मॉन्टेसरी खेळ व बौद्धिक विकास',
      descEn: 'Alphabet train, ring games, counting disks, and shape-matching cognitive puzzles that cultivate sharp logic effortlessly.',
      descMr: 'वर्णमाला गाडी, रिंग गेम्स, अंक चकती आणि विविध कोडी याद्वारे खेळातून मेंदूची कार्यक्षमता व बुद्धिमत्ता वृद्धी.',
      image: '/school-photos/montessori-learning-activities.jpg',
      tag: 'COGNITIVE PLAY',
      tagColor: '#8b5cf6'
    },
    {
      titleEn: 'Outdoor PT & Assembly Drills',
      titleMr: 'मैदानी कवायत व सामूहिक शिस्त',
      descEn: 'Open ground physical training, national anthem assembly, group games, and developing balance, cooperation, and school pride.',
      descMr: 'मोकळ्या मैदानावर सामूहिक कवायत, राष्ट्रगीत, समूह खेळ आणि शारीरिक स्वास्थ्य व शिस्त यांची सुंदर सांगड.',
      image: '/school-photos/morning-assembly-exercise.jpg',
      tag: 'PHYSICAL DRILLS',
      tagColor: '#ea580c'
    }
  ];

  return (
    <div style={{ padding: '3rem 0 5rem' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-badge">{t('navActivities')}</div>
          <h1 className="section-title">{t('activitiesHeading')}</h1>
          <p className="section-subtitle">{t('activitiesSubheading')}</p>
        </div>

        {/* Activities Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.25rem', marginBottom: '4rem' }}>
          {activities.map((act, idx) => (
            <div key={idx} className="class-card">
              <div className="class-card-img-wrapper" style={{ height: '220px' }}>
                <img src={act.image} alt={act.titleEn} className="class-card-img" />
                <span className="class-badge" style={{ background: act.tagColor }}>
                  {act.tag}
                </span>
              </div>
              <div className="class-card-body">
                <h3 className="class-card-title">{language === 'mr' ? act.titleMr : act.titleEn}</h3>
                <p className="class-card-desc">{language === 'mr' ? act.descMr : act.descEn}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', background: '#eff6ff', borderRadius: '18px', padding: '3rem 2rem', border: '1px solid #bfdbfe' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e3a8a', marginBottom: '0.75rem' }}>
            {language === 'mr' ? 'आपल्या मुलाला द्या आनंदी व संस्कारक्षम शिक्षण' : 'Experience Joyful Learning Firsthand'}
          </h2>
          <p style={{ color: '#475569', marginBottom: '1.5rem', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
            {language === 'mr' ? 'प्रवेशासंबंधी चौकशीसाठी आजच संपर्क करा.' : 'Join the G S Modern English School family today.'}
          </p>
          <Link to="/admission" className="btn-primary">
            <Heart size={18} fill="#ffffff" />
            <span>{t('heroBtnAdmission')}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
