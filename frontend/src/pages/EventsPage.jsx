import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { getEvents } from '../services/api';
import EventCard from '../components/EventCard';
import { Calendar, Filter, Image as ImageIcon } from 'lucide-react';

export default function EventsPage() {
  const { language, t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [events, setEvents] = useState([]);
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');

  const categories = [
    { slug: 'all', titleEn: 'All Celebrations', titleMr: 'सर्व सण व उत्सव' },
    { slug: 'independence-day', titleEn: 'Independence Day', titleMr: 'स्वातंत्र्य दिन' },
    { slug: 'gokulashtami', titleEn: 'Gokulashtami', titleMr: 'गोकुळाष्टमी' },
    { slug: 'republic-day', titleEn: 'Republic Day', titleMr: 'प्रजासत्ताक दिन' },
    { slug: 'ashadhi-ekadashi', titleEn: 'Ashadhi Ekadashi', titleMr: 'आषाढी एकादशी दिंडी' },
    { slug: 'diwali-celebration', titleEn: 'Diwali Celebration', titleMr: 'दिवाळी महोत्सव' },
    { slug: 'navratri', titleEn: 'Navratri', titleMr: 'नवरात्रौत्सव' },
    { slug: 'all-jayanti-celebrations', titleEn: 'All Jayanti Celebrations', titleMr: 'सर्व जयंती उत्सव' },
    { slug: 'annual-gathering', titleEn: 'Annual Gathering', titleMr: 'वार्षिक स्नेहसंमेलन' },
    { slug: 'ganesh-chaturthi', titleEn: 'Ganesh Chaturthi', titleMr: 'गणेशोत्सव' },
    { slug: 'maharashtra-day', titleEn: 'Maharashtra Day', titleMr: 'महाराष्ट्र दिन' },
    { slug: 'science-exhibition', titleEn: 'Science Exhibition', titleMr: 'विज्ञान प्रदर्शन' }
  ];

  useEffect(() => {
    getEvents()
      .then(res => {
        if (res.data?.success) setEvents(res.data.data);
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

  const filteredEvents = activeCategory === 'all'
    ? events
    : events.filter(e => e.category_slug === activeCategory);

  return (
    <div style={{ padding: '3rem 0 5rem' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-badge">{t('navEvents')}</div>
          <h1 className="section-title">{t('eventsHeading')}</h1>
          <p className="section-subtitle">{t('eventsSubheading')}</p>
        </div>

        {/* Categories Filter Tabs */}
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

        {/* Events Grid */}
        <div className="classes-grid">
          {filteredEvents.map((ev) => (
            <EventCard key={ev.id} event={ev} />
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
            <Calendar size={40} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
            <p>No events found for this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
