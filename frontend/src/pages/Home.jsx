import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { getClasses, getEvents, getGallery } from '../services/api';
import ClassCard from '../components/ClassCard';
import Lightbox from '../components/Lightbox';
import {
  Sparkles,
  ArrowRight,
  Heart,
  CheckCircle2,
  Calendar,
  Image as ImageIcon,
  Video,
  Play,
  MapPin,
  Award,
  Shield,
  Smile,
  BookOpen
} from 'lucide-react';

export default function Home() {
  const { language, t } = useLanguage();
  const [classes, setClasses] = useState([]);
  const [events, setEvents] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [lightboxItem, setLightboxItem] = useState(null);
  const [selectedClassModal, setSelectedClassModal] = useState(null);
  const [heroPhotoIndex, setHeroPhotoIndex] = useState(0);

  const heroBanners = [
    {
      src: '/school-photos/school-building-campus-combined.jpg',
      captionEn: '🏫 G S MODERN ENGLISH SCHOOL TAMSA • School Building & Campus Views',
      captionMr: '🏫 जि एस मॉडर्न इंग्लिश स्कूल तामसा • भव्य शालेय इमारत व निसर्गरम्य परिसर'
    },
    {
      src: '/school-photos/hero-independence-day-banner.jpg',
      captionEn: '🇮🇳 G S MODERN SCHOOL TAMSA • One Nation ! One Vision ! One Identity !',
      captionMr: '🇮🇳 १५ ऑगस्ट स्वातंत्र्य दिन सोहळा • भव्य फलक व बाल देशभक्त'
    }
  ];

  useEffect(() => {
    getClasses()
      .then(res => {
        if (res.data?.success) setClasses(res.data.data);
      })
      .catch(() => {});

    getEvents()
      .then(res => {
        if (res.data?.success) setEvents(res.data.data.slice(0, 3));
      })
      .catch(() => {});

    getGallery({ type: 'photo' })
      .then(res => {
        if (res.data?.success) setPhotos(res.data.data.slice(0, 8));
      })
      .catch(() => {});
  }, []);

  const badgeColors = ['playgroup', 'nursery', 'lkg', 'ukg'];

  return (
    <div>
      {/* 1. Large Hero Section */}
      <section className="hero-section">
        <div className="container hero-grid">
          <div>
            <div className="hero-tag">
              <Sparkles size={16} />
              <span>{t('heroWelcome')}</span>
            </div>

            <h1 className="hero-title">
              {language === 'mr' ? (
                <>
                  बालकांचे भविष्य घडविण्यासाठी <span className="hero-title-highlight">उत्तम सुरुवात...</span>
                </>
              ) : (
                <>
                  A Joyful Beginning for Your Child's <span className="hero-title-highlight">Bright Future</span>
                </>
              )}
            </h1>

            <p className="hero-desc">{t('heroSubtitle')}</p>

            <div className="hero-btn-group">
              <Link to="/admission" className="btn-primary">
                <Heart size={18} fill="#ffffff" />
                <span>{t('heroBtnAdmission')}</span>
              </Link>
              <Link to="/classes" className="btn-secondary">
                <span>{t('heroBtnClasses')}</span>
                <ArrowRight size={18} />
              </Link>
              <Link to="/photo-gallery" className="btn-secondary" style={{ borderColor: '#cbd5e1' }}>
                <ImageIcon size={18} />
                <span>{t('heroBtnVirtualTour')}</span>
              </Link>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#64748b', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <CheckCircle2 size={16} style={{ color: '#059669' }} />
                <span>Pre-Primary (Playgroup to UKG)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <CheckCircle2 size={16} style={{ color: '#059669' }} />
                <span>CCTV Secured</span>
              </div>
            </div>
          </div>

          {/* Real School Banner Photo with Toggle */}
          <div>
            <div className="hero-banner-card">
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img
                  src={heroBanners[heroPhotoIndex].src}
                  alt={language === 'mr' ? heroBanners[heroPhotoIndex].captionMr : heroBanners[heroPhotoIndex].captionEn}
                  className="hero-banner-img"
                  style={{ transition: 'opacity 0.3s ease', aspectRatio: '4/3' }}
                />
                
                {/* Switcher Pills on top of card */}
                <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '6px', background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(4px)', padding: '4px 8px', borderRadius: '999px' }}>
                  <button
                    onClick={() => setHeroPhotoIndex(0)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '999px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      background: heroPhotoIndex === 0 ? '#1d4ed8' : 'transparent',
                      color: '#ffffff'
                    }}
                  >
                    {language === 'mr' ? '🏫 इमारत व परिसर' : '🏫 Campus & Building'}
                  </button>
                  <button
                    onClick={() => setHeroPhotoIndex(1)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '999px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      background: heroPhotoIndex === 1 ? '#ea580c' : 'transparent',
                      color: '#ffffff'
                    }}
                  >
                    {language === 'mr' ? '🇮🇳 स्वातंत्र्य दिन' : '🇮🇳 Event Banner'}
                  </button>
                </div>
              </div>

              <div className="hero-banner-caption">
                {language === 'mr' ? heroBanners[heroPhotoIndex].captionMr : heroBanners[heroPhotoIndex].captionEn}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Highlights / Stats Ribbon */}
      <div className="container">
        <div className="stats-ribbon">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon blue"><Smile size={26} /></div>
              <div>
                <div className="stat-title">{t('statClasses')}</div>
                <div className="stat-sub">{t('statClassesSub')}</div>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon orange"><Sparkles size={26} /></div>
              <div>
                <div className="stat-title">{t('statActivities')}</div>
                <div className="stat-sub">{t('statActivitiesSub')}</div>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon green"><Shield size={26} /></div>
              <div>
                <div className="stat-title">{t('statSafety')}</div>
                <div className="stat-sub">{t('statSafetySub')}</div>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon yellow"><Award size={26} /></div>
              <div>
                <div className="stat-title">{t('statEnvironment')}</div>
                <div className="stat-sub">{t('statEnvironmentSub')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Classes Section */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-badge">{t('navClasses')}</div>
            <h2 className="section-title">{t('classesHeading')}</h2>
            <p className="section-subtitle">{t('classesSubheading')}</p>
          </div>

          <div className="classes-grid">
            {classes.map((cls, idx) => (
              <ClassCard
                key={cls.slug || idx}
                name={cls.name}
                slug={cls.slug}
                descEn={cls.description_en}
                descMr={cls.description_mr}
                image={cls.image_url}
                badgeClass={badgeColors[idx % 4]}
                onLearnMore={(item) => setSelectedClassModal(item)}
              />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/classes" className="btn-secondary">
              <span>{t('heroBtnClasses')}</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. About School Section */}
      <section className="about-section">
        <div className="container about-grid">
          <div className="about-img-collage">
            <img
              src="/school-photos/campus-garden-overview.jpg"
              alt="School Campus & Garden"
              className="about-main-img"
            />
            <div className="about-floating-badge">
              <Shield size={32} style={{ color: '#059669' }} />
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0f172a' }}>Tamsa, Nanded</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Basaveshwar Nagar Campus</div>
              </div>
            </div>
          </div>

          <div>
            <div className="section-badge" style={{ backgroundColor: '#ecfdf5', color: '#059669', borderColor: '#a7f3d0' }}>
              {t('navAbout')}
            </div>
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.25rem' }}>
              {t('aboutHeading')}
            </h2>
            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1rem' }}>
              {t('aboutP1')}
            </p>
            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              {t('aboutP2')}
            </p>

            <div className="facility-pill-grid">
              <div className="facility-pill"><CheckCircle2 size={16} /> {t('aboutFacilitySmart')}</div>
              <div className="facility-pill"><CheckCircle2 size={16} /> {t('aboutFacilityPlay')}</div>
              <div className="facility-pill"><CheckCircle2 size={16} /> {t('aboutFacilityCCTV')}</div>
              <div className="facility-pill"><CheckCircle2 size={16} /> {t('aboutFacilityWater')}</div>
              <div className="facility-pill"><CheckCircle2 size={16} /> {t('aboutFacilityHealth')}</div>
              <div className="facility-pill"><CheckCircle2 size={16} /> {t('aboutFacilityTransport')}</div>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <Link to="/about" className="btn-primary">
                <span>{t('learnMore')}</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Principal Spotlight */}
      <section className="container">
        <div className="principal-spotlight">
          <div className="principal-grid">
            <div className="principal-avatar-wrap">
              <img
                src="/school-photos/principal-usha-belure.jpg"
                alt="Principal Usha Belure"
                className="principal-img"
                style={{ objectPosition: 'top center' }}
              />
            </div>
            <div>
              <div className="section-badge" style={{ background: '#fef3c7', color: '#b45309', borderColor: '#fde68a' }}>
                {t('principalHeading')}
              </div>
              <blockquote className="principal-quote">
                "{t('principalQuote')}"
              </blockquote>
              <div className="principal-name">{t('principalName')}</div>
              <div className="principal-role">{t('principalRole')}</div>
              <div style={{ marginTop: '1rem' }}>
                <Link to="/staff" className="btn-link-action">
                  <span>{t('staffHeading')}</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Activities Preview */}
      <section style={{ padding: '4rem 0', background: '#f8fafc' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-badge">{t('navActivities')}</div>
            <h2 className="section-title">{t('activitiesHeading')}</h2>
            <p className="section-subtitle">{t('activitiesSubheading')}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {/* Activity 1: Yoga Day */}
            <div className="class-card">
              <div className="class-card-img-wrapper" style={{ height: '210px' }}>
                <img src="/school-photos/international-yoga-day.jpg" alt="Yoga Day" className="class-card-img" />
                <span className="class-badge" style={{ background: '#059669' }}>YOGA & FITNESS</span>
              </div>
              <div className="class-card-body">
                <h3 className="class-card-title">{t('actYogaTitle')}</h3>
                <p className="class-card-desc">{t('actYogaDesc')}</p>
              </div>
            </div>

            {/* Activity 2: Green Day */}
            <div className="class-card">
              <div className="class-card-img-wrapper" style={{ height: '210px' }}>
                <img src="/school-photos/green-day-celebration.jpg" alt="Green Day" className="class-card-img" />
                <span className="class-badge" style={{ background: '#10b981' }}>NATURE & ECO</span>
              </div>
              <div className="class-card-body">
                <h3 className="class-card-title">{t('actGreenTitle')}</h3>
                <p className="class-card-desc">{t('actGreenDesc')}</p>
              </div>
            </div>

            {/* Activity 3: Alphabet Learning */}
            <div className="class-card">
              <div className="class-card-img-wrapper" style={{ height: '210px' }}>
                <img src="/school-photos/alphabet-activity-lineup.jpg" alt="Alphabet Lineup" className="class-card-img" />
                <span className="class-badge" style={{ background: '#3b82f6' }}>EARLY LITERACY</span>
              </div>
              <div className="class-card-body">
                <h3 className="class-card-title">{t('actLanguageTitle')}</h3>
                <p className="class-card-desc">{t('actLanguageDesc')}</p>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/activities" className="btn-secondary">
              <span>{t('learnMore')}</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Upcoming & Recent Events Preview */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-badge">{t('navEvents')}</div>
            <h2 className="section-title">{t('eventsHeading')}</h2>
            <p className="section-subtitle">{t('eventsSubheading')}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {events.map((ev) => (
              <div key={ev.id} className="class-card">
                <div className="class-card-img-wrapper" style={{ height: '190px' }}>
                  <img src={ev.featured_image || '/school-photos/hero-independence-day-banner.jpg'} alt={ev.title_en} className="class-card-img" />
                  <span className="class-badge" style={{ background: '#ea580c' }}>
                    {ev.category_slug ? ev.category_slug.replace('-', ' ').toUpperCase() : 'EVENT'}
                  </span>
                </div>
                <div className="class-card-body">
                  <h3 className="class-card-title">{language === 'mr' ? ev.title_mr : ev.title_en}</h3>
                  <p className="class-card-desc">{language === 'mr' ? ev.description_mr : ev.description_en}</p>
                  <div className="class-card-footer">
                    <Link to="/events" className="btn-link-action">
                      <span>{t('eventViewPhotos')}</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/events" className="btn-secondary">
              <span>{t('eventsHeading')}</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Photo Gallery Preview */}
      <section style={{ padding: '4rem 0', background: '#ffffff' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-badge">{t('navPhotoGallery')}</div>
            <h2 className="section-title">{t('photoGalleryHeading')}</h2>
            <p className="section-subtitle">{t('photoGallerySubheading')}</p>
          </div>

          <div className="gallery-grid">
            {photos.map((item) => (
              <div
                key={item.id}
                className="gallery-card"
                onClick={() => setLightboxItem(item)}
              >
                <img
                  src={item.file_url}
                  alt={item.title_en}
                  className="gallery-img"
                  loading="lazy"
                />
                <div className="gallery-overlay">
                  <div className="gallery-card-title">
                    {language === 'mr' ? item.title_mr : item.title_en}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/photo-gallery" className="btn-primary">
              <ImageIcon size={18} />
              <span>{t('viewAllPhotos')}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Video Gallery Preview */}
      <section style={{ padding: '4rem 0', background: '#f8fafc' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-badge">{t('navVideoGallery')}</div>
            <h2 className="section-title">{t('videoGalleryHeading')}</h2>
            <p className="section-subtitle">{t('videoGallerySubheading')}</p>
          </div>

          <div className="video-grid" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="video-card">
              <div className="video-player-wrap">
                <video
                  controls
                  poster="/school-photos/annual-gathering-crowd.jpg"
                  className="video-player"
                >
                  <source src="/school-videos/school-event-video-2.mp4" type="video/mp4" />
                  Your browser does not support HTML5 video.
                </video>
              </div>
              <div className="video-card-body">
                <h3 className="video-card-title">
                  {language === 'mr' ? 'वार्षिक स्नेहसंमेलन सांस्कृतिक कार्यक्रम' : 'Annual Gathering Cultural Performances'}
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '0.35rem' }}>
                  {language === 'mr' ? 'विद्यार्थ्यांचे रंगमंचावरील सुंदर नृत्य व कला सादरीकरण' : 'Student stage performances, music and dance'}
                </p>
              </div>
            </div>

            <div className="video-card">
              <div className="video-player-wrap">
                <video
                  controls
                  poster="/school-photos/hero-independence-day-banner.jpg"
                  className="video-player"
                >
                  <source src="/school-videos/school-event-video-5.mp4" type="video/mp4" />
                  Your browser does not support HTML5 video.
                </video>
              </div>
              <div className="video-card-body">
                <h3 className="video-card-title">
                  {language === 'mr' ? 'भव्य शालेय सोहळा व स्नेहसंमेलन' : 'Grand School Gathering & Celebrations'}
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '0.35rem' }}>
                  {language === 'mr' ? 'पालक व मान्यवरांच्या उपस्थितीत दिमाखदार सोहळा' : 'Special school events in presence of proud parents'}
                </p>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/video-gallery" className="btn-secondary">
              <Video size={18} />
              <span>{t('viewAllVideos')}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 10. Admission Enquiry Call To Action Banner */}
      <section style={{ padding: '5rem 0', background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)', color: '#ffffff' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '820px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.15)', padding: '0.4rem 1rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1.25rem' }}>
            <Sparkles size={16} />
            <span>{t('admissionsOpenBadge')}</span>
          </div>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '1.25rem', lineHeight: 1.25 }}>
            {language === 'mr' ? 'आपल्या पाल्याच्या उज्ज्वल भविष्यासाठी आजच संपर्क करा' : 'Give Your Child the Best Start in Life'}
          </h2>
          <p style={{ fontSize: '1.15rem', opacity: 0.9, lineHeight: 1.7, marginBottom: '2.25rem' }}>
            {language === 'mr'
              ? 'प्लेग्रुप, नर्सरी, एलकेजी (LKG) व युकेजी (UKG) मधील प्रवेशासाठी आजच ऑनलाईन नोंदणी करा किंवा प्रत्यक्ष शाळेत भेट द्या.'
              : 'Enrol now for Playgroup, Nursery, LKG, and UKG. Limited seats ensuring individual attention for every child.'}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <Link to="/admission" className="btn-primary" style={{ background: '#f59e0b', color: '#0f172a' }}>
              <Heart size={18} fill="#0f172a" />
              <span>{t('heroBtnAdmission')}</span>
            </Link>
            <Link to="/contact" className="btn-secondary" style={{ background: 'transparent', color: '#ffffff', borderColor: '#ffffff' }}>
              <MapPin size={18} />
              <span>{t('navContact')}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox for photo preview */}
      {lightboxItem && (
        <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
      )}

      {/* Class Modal details */}
      {selectedClassModal && (
        <div className="lightbox-backdrop" onClick={() => setSelectedClassModal(null)}>
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
            style={{ background: '#ffffff', padding: '2rem', borderRadius: '18px', maxWidth: '540px', width: '90%' }}
          >
            <img
              src={selectedClassModal.image}
              alt={selectedClassModal.name}
              style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '12px', marginBottom: '1rem' }}
            />
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              {selectedClassModal.name}
            </h3>
            <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {language === 'mr' ? selectedClassModal.descMr : selectedClassModal.descEn}
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                onClick={() => setSelectedClassModal(null)}
                className="btn-secondary"
                style={{ padding: '0.5rem 1.25rem' }}
              >
                Close
              </button>
              <Link
                to="/admission"
                className="btn-primary"
                style={{ padding: '0.5rem 1.25rem' }}
                onClick={() => setSelectedClassModal(null)}
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
