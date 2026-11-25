import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { getGallery } from '../services/api';
import Lightbox from '../components/Lightbox';
import { Image as ImageIcon, Filter } from 'lucide-react';

export default function PhotoGalleryPage() {
  const { language, t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [photos, setPhotos] = useState([]);
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
  const [lightboxItem, setLightboxItem] = useState(null);

  const categories = [
    { slug: 'all', titleEn: 'All Photos', titleMr: 'सर्व छायाचित्रे' },
    { slug: 'independence-day', titleEn: 'Independence Day', titleMr: 'स्वातंत्र्य दिन' },
    { slug: 'ashadhi-ekadashi', titleEn: 'Ashadhi Ekadashi', titleMr: 'आषाढी एकादशी दिंडी' },
    { slug: 'annual-gathering', titleEn: 'Gathering & Activities', titleMr: 'स्नेहसंमेलन व उपक्रम' },
    { slug: 'science-exhibition', titleEn: 'Green Day & Science', titleMr: 'हरित दिन व विज्ञान' },
    { slug: 'gokulashtami', titleEn: 'Gokulashtami', titleMr: 'गोकुळाष्टमी' },
    { slug: 'republic-day', titleEn: 'Republic Day', titleMr: 'प्रजासत्ताक दिन' },
    { slug: 'diwali-celebration', titleEn: 'Diwali', titleMr: 'दिवाळी' },
    { slug: 'navratri', titleEn: 'Navratri', titleMr: 'नवरात्री' }
  ];

  useEffect(() => {
    getGallery({ type: 'photo' })
      .then(res => {
        if (res.data?.success) setPhotos(res.data.data);
      })
      .catch(() => {});
  }, []);

  const handleFilter = (slug) => {
    setActiveCategory(slug);
    if (slug === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', slug);
    }
    setSearchParams(searchParams);
  };

  const filteredPhotos = activeCategory === 'all'
    ? photos
    : photos.filter(p => p.category_slug === activeCategory);

  return (
    <div style={{ padding: '3rem 0 5rem' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-badge">{t('navPhotoGallery')}</div>
          <h1 className="section-title">{t('photoGalleryHeading')}</h1>
          <p className="section-subtitle">{t('photoGallerySubheading')}</p>
        </div>

        {/* Categories Bar */}
        <div className="gallery-filter-bar">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => handleFilter(cat.slug)}
              className={`filter-btn ${activeCategory === cat.slug ? 'active' : ''}`}
            >
              {language === 'mr' ? cat.titleMr : cat.titleEn}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className="gallery-card"
              onClick={() => setLightboxItem(photo)}
            >
              <img
                src={photo.file_url}
                alt={photo.title_en}
                className="gallery-img"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/school-photos/hero-independence-day-banner.jpg';
                }}
              />
              <div className="gallery-overlay">
                <div className="gallery-card-title">
                  {language === 'mr' ? photo.title_mr : photo.title_en}
                </div>
                {photo.category_slug && (
                  <span className="gallery-badge">
                    {photo.category_slug.replace('-', ' ').toUpperCase()}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredPhotos.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
            <ImageIcon size={40} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
            <p>No photos found for this category.</p>
          </div>
        )}

        {/* Lightbox Modal */}
        {lightboxItem && (
          <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
        )}
      </div>
    </div>
  );
}
