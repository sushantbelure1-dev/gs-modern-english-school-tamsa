import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getGallery } from '../services/api';
import { Video, Play, Filter } from 'lucide-react';

export default function VideoGalleryPage() {
  const { language, t } = useLanguage();
  const [videos, setVideos] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    getGallery({ type: 'video' })
      .then(res => {
        if (res.data?.success) setVideos(res.data.data);
      })
      .catch(() => {});
  }, []);

  const categories = [
    { slug: 'all', titleEn: 'All Videos', titleMr: 'सर्व व्हिडिओ' },
    { slug: 'independence-day', titleEn: 'Independence Day', titleMr: 'स्वातंत्र्य दिन' },
    { slug: 'annual-gathering', titleEn: 'Annual Gathering', titleMr: 'वार्षिक स्नेहसंमेलन' },
    { slug: 'gokulashtami', titleEn: 'Gokulashtami', titleMr: 'गोकुळाष्टमी' },
    { slug: 'ashadhi-ekadashi', titleEn: 'Ashadhi Ekadashi', titleMr: 'आषाढी एकादशी दिंडी' }
  ];

  const filteredVideos = activeCategory === 'all'
    ? videos
    : videos.filter(v => v.category_slug === activeCategory);

  return (
    <div style={{ padding: '3rem 0 5rem' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-badge">{t('navVideoGallery')}</div>
          <h1 className="section-title">{t('videoGalleryHeading')}</h1>
          <p className="section-subtitle">{t('videoGallerySubheading')}</p>
        </div>

        {/* Categories Bar */}
        <div className="gallery-filter-bar">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`filter-btn ${activeCategory === cat.slug ? 'active' : ''}`}
            >
              {language === 'mr' ? cat.titleMr : cat.titleEn}
            </button>
          ))}
        </div>

        {/* Videos Grid */}
        <div className="video-grid">
          {filteredVideos.map((video) => (
            <div key={video.id} className="video-card">
              <div className="video-player-wrap">
                <video
                  controls
                  poster={video.thumbnail_url || '/school-photos/hero-independence-day-banner.jpg'}
                  className="video-player"
                >
                  <source src={video.file_url} type="video/mp4" />
                  Your browser does not support HTML5 video.
                </video>
              </div>
              <div className="video-card-body">
                <h3 className="video-card-title">
                  {language === 'mr' ? video.title_mr : video.title_en}
                </h3>
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: '#ea580c',
                    background: '#fff7ed',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '4px',
                    marginTop: '0.5rem'
                  }}
                >
                  {video.category_slug ? video.category_slug.replace('-', ' ').toUpperCase() : 'VIDEO'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
            <Video size={40} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
            <p>No video uploads available for this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
