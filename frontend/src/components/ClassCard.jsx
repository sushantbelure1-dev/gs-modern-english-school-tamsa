import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function ClassCard({ name, slug, descEn, descMr, image, badgeClass, onLearnMore }) {
  const { language, t } = useLanguage();
  const desc = language === 'mr' ? descMr : descEn;

  return (
    <div className="class-card">
      <div className="class-card-img-wrapper">
        <img
          src={image || '/school-photos/classroom-study-session.jpg'}
          alt={name}
          className="class-card-img"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/school-photos/classroom-study-session.jpg';
          }}
        />
        <span className={`class-badge ${badgeClass || 'playgroup'}`}>
          {name}
        </span>
      </div>

      <div className="class-card-body">
        <h3 className="class-card-title">{name}</h3>
        <p className="class-card-desc">{desc}</p>

        <div className="class-card-footer">
          <button
            onClick={() => onLearnMore && onLearnMore({ name, slug, descEn, descMr, image })}
            className="btn-link-action"
          >
            <span>{t('learnMore')}</span>
            <ArrowRight size={15} />
          </button>

          <Link
            to="/admission"
            style={{
              background: '#eff6ff',
              color: '#1d4ed8',
              fontSize: '0.8rem',
              fontWeight: 700,
              padding: '0.35rem 0.75rem',
              borderRadius: '999px'
            }}
          >
            {t('classEnquireNow')}
          </Link>
        </div>
      </div>
    </div>
  );
}
