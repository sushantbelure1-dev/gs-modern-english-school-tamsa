import { query } from '../config/db.js';

export const getStaff = async (req, res) => {
  try {
    const staff = await query('SELECT * FROM `staff` ORDER BY `order_index` ASC');
    return res.json({ success: true, data: staff });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
