import { query } from '../config/db.js';

export const getEvents = async (req, res) => {
  try {
    const { category, upcoming } = req.query;
    let sql = 'SELECT * FROM `events`';
    const params = [];

    if (category) {
      sql += ' WHERE `category_slug` = ?';
      params.push(category);
    }

    sql += ' ORDER BY `event_date` DESC, `id` DESC';
    const events = await query(sql, params);
    return res.json({ success: true, data: events });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const events = await query('SELECT * FROM `events` WHERE `id` = ?', [id]);
    if (events.length === 0) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    return res.json({ success: true, data: events[0] });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const createEvent = async (req, res) => {
  try {
    const { category_slug, title_en, title_mr, description_en, description_mr, event_date, is_upcoming } = req.body;
    let featured_image = req.file ? `/uploads/photos/${req.file.filename}` : (req.body.featured_image || null);

    if (!category_slug || !title_en || !title_mr) {
      return res.status(400).json({ success: false, message: 'Category, English title, and Marathi title are required.' });
    }

    const result = await query(
      'INSERT INTO `events` (`category_slug`, `title_en`, `title_mr`, `description_en`, `description_mr`, `event_date`, `is_upcoming`, `featured_image`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [category_slug, title_en, title_mr, description_en || '', description_mr || '', event_date || null, is_upcoming ? 1 : 0, featured_image]
    );

    return res.status(201).json({ success: true, message: 'Event created successfully', id: result.insertId });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { category_slug, title_en, title_mr, description_en, description_mr, event_date, is_upcoming } = req.body;
    let featured_image = req.file ? `/uploads/photos/${req.file.filename}` : req.body.featured_image;

    await query(
      'UPDATE `events` SET `category_slug` = ?, `title_en` = ?, `title_mr` = ?, `description_en` = ?, `description_mr` = ?, `event_date` = ?, `is_upcoming` = ?, `featured_image` = COALESCE(?, `featured_image`) WHERE `id` = ?',
      [category_slug, title_en, title_mr, description_en, description_mr, event_date, is_upcoming ? 1 : 0, featured_image, id]
    );

    return res.json({ success: true, message: 'Event updated successfully' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    await query('DELETE FROM `events` WHERE `id` = ?', [id]);
    return res.json({ success: true, message: 'Event deleted successfully' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
