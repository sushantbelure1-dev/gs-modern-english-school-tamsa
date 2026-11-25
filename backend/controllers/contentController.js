import { query } from '../config/db.js';

export const getContent = async (req, res) => {
  try {
    const content = await query('SELECT * FROM `website_content`');
    return res.json({ success: true, data: content });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
