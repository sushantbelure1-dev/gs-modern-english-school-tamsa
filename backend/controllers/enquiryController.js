import { query } from '../config/db.js';

export const submitEnquiry = async (req, res) => {
  try {
    const { parent_name, child_name, parent_mobile, parent_email, class_interested, message, consent_given } = req.body;

    // Validation
    if (!parent_name || !parent_name.trim()) {
      return res.status(400).json({ success: false, message: 'Parent name is required.' });
    }
    if (!child_name || !child_name.trim()) {
      return res.status(400).json({ success: false, message: 'Child name is required.' });
    }
    if (!parent_mobile || !parent_mobile.trim()) {
      return res.status(400).json({ success: false, message: 'Parent mobile number is required.' });
    }
    // Clean mobile number validation (standard 10-digit Indian mobile or with country code)
    const cleanMobile = parent_mobile.trim().replace(/[^0-9]/g, '');
    if (cleanMobile.length < 10) {
      return res.status(400).json({ success: false, message: 'Please enter a valid 10-digit mobile number.' });
    }
    if (!class_interested || !class_interested.trim()) {
      return res.status(400).json({ success: false, message: 'Please select a class.' });
    }
    if (!consent_given) {
      return res.status(400).json({ success: false, message: 'Consent is required to submit admission enquiry.' });
    }

    const result = await query(
      'INSERT INTO `admission_enquiries` (`parent_name`, `child_name`, `parent_mobile`, `parent_email`, `class_interested`, `message`, `consent_given`) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        parent_name.trim(),
        child_name.trim(),
        cleanMobile,
        parent_email ? parent_email.trim() : null,
        class_interested.trim(),
        message ? message.trim() : null,
        1
      ]
    );

    return res.status(201).json({
      success: true,
      message: 'Admission enquiry submitted successfully! Our school administration will contact you soon.',
      enquiryId: result.insertId
    });
  } catch (err) {
    console.error('Enquiry submission error:', err);
    return res.status(500).json({ success: false, message: 'Unable to submit enquiry. Please try again.' });
  }
};

export const getEnquiries = async (req, res) => {
  try {
    const enquiries = await query('SELECT * FROM `admission_enquiries` ORDER BY `created_at` DESC');
    return res.json({ success: true, data: enquiries });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const updateEnquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, admin_notes } = req.body;

    const validStatuses = ['Pending', 'Contacted', 'Enrolled', 'Closed'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value.' });
    }

    await query(
      'UPDATE `admission_enquiries` SET `status` = ?, `admin_notes` = ? WHERE `id` = ?',
      [status || 'Pending', admin_notes || '', id]
    );

    return res.json({ success: true, message: 'Enquiry updated successfully' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params;
    await query('DELETE FROM `admission_enquiries` WHERE `id` = ?', [id]);
    return res.json({ success: true, message: 'Enquiry deleted successfully' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
