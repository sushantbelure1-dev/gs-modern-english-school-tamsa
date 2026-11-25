import { query } from '../config/db.js';

export const getGallery = async (req, res) => {
  try {
    const { type, category, event_id } = req.query;
    let items = await query('SELECT * FROM `gallery` ORDER BY `id` DESC');

    if (type) {
      items = items.filter(i => i.media_type === type);
    }
    if (category && category !== 'all') {
      items = items.filter(i => i.category_slug === category);
    }
    if (event_id) {
      items = items.filter(i => String(i.event_id) === String(event_id));
    }

    return res.json({ success: true, data: items });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const uploadMedia = async (req, res) => {
  try {
    const files = req.files || (req.file ? [req.file] : []);
    if (!files || files.length === 0) {
      return res.status(400).json({ success: false, message: 'No media files uploaded.' });
    }

    const { title_en, title_mr, category_slug, event_id } = req.body;
    const catSlug = category_slug || 'annual-gathering';
    const eventIdVal = event_id ? Number(event_id) : null;

    const uploadedRecords = [];

    for (const file of files) {
      const isVideo = file.mimetype.startsWith('video/');
      const media_type = isVideo ? 'video' : 'photo';
      const file_url = isVideo ? `/uploads/videos/${file.filename}` : `/uploads/photos/${file.filename}`;
      const defaultTitleEn = title_en || file.originalname.replace(/\.[^/.]+$/, '');
      const defaultTitleMr = title_mr || defaultTitleEn;

      const result = await query(
        'INSERT INTO `gallery` (`title_en`, `title_mr`, `media_type`, `file_url`, `thumbnail_url`, `category_slug`, `event_id`) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [defaultTitleEn, defaultTitleMr, media_type, file_url, file_url, catSlug, eventIdVal]
      );

      uploadedRecords.push({
        id: result.insertId,
        title_en: defaultTitleEn,
        title_mr: defaultTitleMr,
        media_type,
        file_url,
        category_slug: catSlug
      });
    }

    return res.status(201).json({
      success: true,
      message: `${uploadedRecords.length} file(s) uploaded successfully!`,
      data: uploadedRecords
    });
  } catch (err) {
    console.error('Media upload error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;
    await query('DELETE FROM `gallery` WHERE `id` = ?', [id]);
    return res.json({ success: true, message: 'Media item deleted successfully' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
