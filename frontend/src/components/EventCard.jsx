import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, Image as ImageIcon, ArrowRight } from 'lucide-react';

export default function EventCard({ event }) {
  const { language, t } = useLanguage();
  const title = language === 'mr' ? event.title_mr : event.title_en;
  const desc = language === 'mr' ? event.description_mr : event.description_en;

  return (
    <div className="class-card">
      <div className="class-card-img-wrapper" style={{ height: '200px' }}>
        <img
          src={event.featured_image || '/school-photos/hero-independence-day-banner.jpg'}
          alt={title}
          className="class-card-img"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/school-photos/hero-independence-day-banner.jpg';
          }}
        />
        <span className="class-badge" style={{ background: '#0284c7' }}>
          {event.category_slug ? event.category_slug.replace('-', ' ').toUpperCase() : 'EVENT'}
        </span>
      </div>

      <div className="class-card-body">
        {event.event_date && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', fontSize: '0.82rem', marginBottom: '0.4rem' }}>
            <Calendar size={14} style={{ color: '#ea580c' }} />
            <span>{event.event_date}</span>
          </div>
        )}

        <h3 className="class-card-title" style={{ fontSize: '1.25rem' }}>{title}</h3>
        <p className="class-card-desc">{desc}</p>

        <div className="class-card-footer">
          <Link
            to={`/photo-gallery?category=${event.category_slug}`}
            className="btn-link-action"
          >
            <ImageIcon size={15} />
            <span>{t('eventViewPhotos')}</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
