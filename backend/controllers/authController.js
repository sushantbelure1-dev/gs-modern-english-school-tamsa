import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query, getDbStatus } from '../config/db.js';

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required.'
      });
    }

    const admins = await query('SELECT * FROM `admins` WHERE `username` = ?', [username.trim()]);
    if (!admins || admins.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Please verify your username and password.'
      });
    }

    const admin = admins[0];
    const isMatch = await bcrypt.compare(password, admin.password_hash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Please verify your username and password.'
      });
    }

    const secret = process.env.JWT_SECRET || 'gs_modern_school_super_secret_jwt_key_2026_tamsa';
    const token = jwt.sign(
      {
        id: admin.id,
        username: admin.username,
        role: admin.role,
        fullName: admin.full_name
      },
      secret,
      { expiresIn: '7d' }
    );

    return res.json({
      success: true,
      message: 'Login successful.',
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        fullName: admin.full_name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal server error during login.'
    });
  }
};

export const verifySession = async (req, res) => {
  try {
    const admins = await query('SELECT id, username, email, full_name, role FROM `admins` WHERE `id` = ?', [req.admin.id]);
    if (!admins || admins.length === 0) {
      return res.status(404).json({ success: false, message: 'Admin not found.' });
    }
    return res.json({
      success: true,
      admin: admins[0],
      dbStatus: getDbStatus()
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
