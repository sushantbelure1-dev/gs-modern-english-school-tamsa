import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Lightbox({ item, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  return (
    <div className="lightbox-backdrop" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close-btn" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        <img
          src={item.file_url}
          alt={item.title_en || 'School Photo'}
          className="lightbox-image"
        />

        <div className="lightbox-caption">
          {item.title_mr || item.title_en}
        </div>
      </div>
    </div>
  );
}
