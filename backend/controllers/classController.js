import { query } from '../config/db.js';

export const getClasses = async (req, res) => {
  try {
    const classes = await query('SELECT * FROM `classes` ORDER BY `order_index` ASC');
    return res.json({ success: true, data: classes });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const getClassBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const classes = await query('SELECT * FROM `classes` WHERE `slug` = ?', [slug]);
    if (classes.length === 0) {
      return res.status(404).json({ success: false, message: 'Class not found' });
    }
    return res.json({ success: true, data: classes[0] });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
