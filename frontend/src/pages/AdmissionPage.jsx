import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { submitAdmissionEnquiry } from '../services/api';
import { Heart, CheckCircle2, AlertCircle, Sparkles, ShieldCheck } from 'lucide-react';

export default function AdmissionPage() {
  const { language, t } = useLanguage();

  const [formData, setFormData] = useState({
    parent_name: '',
    child_name: '',
    parent_mobile: '',
    parent_email: '',
    class_interested: '',
    message: '',
    consent_given: false
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    // Validation
    if (!formData.parent_name.trim()) {
      setErrorMsg(language === 'mr' ? 'कृपया पालकांचे नाव प्रविष्ट करा.' : 'Please enter parent name.');
      return;
    }
    if (!formData.child_name.trim()) {
      setErrorMsg(language === 'mr' ? 'कृपया पाल्याचे नाव प्रविष्ट करा.' : 'Please enter child name.');
      return;
    }
    const cleanMobile = formData.parent_mobile.replace(/[^0-9]/g, '');
    if (cleanMobile.length < 10) {
      setErrorMsg(language === 'mr' ? 'कृपया वैध १० अंकी मोबाईल नंबर प्रविष्ट करा.' : 'Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!formData.class_interested) {
      setErrorMsg(language === 'mr' ? 'कृपया इच्छित वर्ग निवडा.' : 'Please select class interested in.');
      return;
    }
    if (!formData.consent_given) {
      setErrorMsg(language === 'mr' ? 'कृपया संमतीच्या चौकटीत खूण (Tick) करा.' : 'Please agree to the consent checkbox.');
      return;
    }

    setLoading(true);
    try {
      const res = await submitAdmissionEnquiry(formData);
      if (res.data?.success) {
        setSuccessMsg(res.data.message || t('formSuccessMessage'));
        setFormData({
          parent_name: '',
          child_name: '',
          parent_mobile: '',
          parent_email: '',
          class_interested: '',
          message: '',
          consent_given: false
        });
      } else {
        setErrorMsg(res.data?.message || 'Submission failed.');
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '3rem 0 5rem' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-badge">{t('navAdmission')}</div>
          <h1 className="section-title">{t('admissionHeading')}</h1>
          <p className="section-subtitle">{t('admissionSubheading')}</p>
        </div>

        <div className="enquiry-container">
          {successMsg ? (
            <div className="alert-box alert-success" style={{ textAlign: 'center', padding: '2.5rem 1.5rem' }}>
              <CheckCircle2 size={48} style={{ color: '#059669', margin: '0 auto 1rem' }} />
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#065f46', marginBottom: '0.75rem' }}>
                {t('formSuccessTitle')}
              </h3>
              <p style={{ color: '#047857', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {successMsg}
              </p>
              <button
                onClick={() => setSuccessMsg('')}
                className="btn-primary"
                style={{ background: '#059669' }}
              >
                {language === 'mr' ? 'दुसरा अर्ज करा' : 'Submit Another Enquiry'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {errorMsg && (
                <div className="alert-box alert-error" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <AlertCircle size={20} style={{ flexShrink: 0 }} />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Parent Name */}
              <div className="form-group">
                <label className="form-label">{t('formParentName')}</label>
                <input
                  type="text"
                  name="parent_name"
                  value={formData.parent_name}
                  onChange={handleChange}
                  placeholder={t('formParentNamePlaceholder')}
                  className="form-control"
                  required
                />
              </div>

              {/* Child Name */}
              <div className="form-group">
                <label className="form-label">{t('formChildName')}</label>
                <input
                  type="text"
                  name="child_name"
                  value={formData.child_name}
                  onChange={handleChange}
                  placeholder={t('formChildNamePlaceholder')}
                  className="form-control"
                  required
                />
              </div>

              {/* Mobile & Email Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">{t('formMobile')}</label>
                  <input
                    type="tel"
                    name="parent_mobile"
                    value={formData.parent_mobile}
                    onChange={handleChange}
                    placeholder={t('formMobilePlaceholder')}
                    className="form-control"
                    maxLength={15}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">{t('formEmail')}</label>
                  <input
                    type="email"
                    name="parent_email"
                    value={formData.parent_email}
                    onChange={handleChange}
                    placeholder={t('formEmailPlaceholder')}
                    className="form-control"
                  />
                </div>
              </div>

              {/* Class Interested In */}
              <div className="form-group">
                <label className="form-label">{t('formClass')}</label>
                <select
                  name="class_interested"
                  value={formData.class_interested}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="">{t('formSelectClass')}</option>
                  <option value="Playgroup">Playgroup (प्लेग्रुप)</option>
                  <option value="Nursery">Nursery (नर्सरी)</option>
                  <option value="LKG">LKG (एलकेजी)</option>
                  <option value="UKG">UKG (युकेजी)</option>
                </select>
              </div>

              {/* Message (Optional) */}
              <div className="form-group">
                <label className="form-label">{t('formMessage')}</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  placeholder={t('formMessagePlaceholder')}
                  className="form-control"
                />
              </div>

              {/* Consent Checkbox */}
              <div className="form-group" style={{ marginTop: '1.25rem' }}>
                <label className="form-checkbox-label">
                  <input
                    type="checkbox"
                    name="consent_given"
                    checked={formData.consent_given}
                    onChange={handleChange}
                    required
                  />
                  <span>{t('formConsent')}</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}
              >
                <Heart size={18} fill="#ffffff" />
                <span>{loading ? t('formSubmitting') : t('formSubmit')}</span>
              </button>

              {/* Privacy Guarantee Note */}
              <div className="privacy-notice">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                  <ShieldCheck size={16} />
                  <span>{language === 'mr' ? 'गोपनीयता हमी' : 'Privacy Guarantee'}</span>
                </div>
                {t('formPrivacyNote')}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
