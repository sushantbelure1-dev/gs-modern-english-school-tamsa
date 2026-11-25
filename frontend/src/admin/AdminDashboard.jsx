import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  verifyAdmin,
  getEnquiries,
  updateEnquiry,
  deleteEnquiry,
  getGallery,
  uploadMediaFiles,
  deleteGalleryMedia,
  getEvents,
  createSchoolEvent,
  deleteSchoolEvent,
  getClasses,
  getStaff
} from '../services/api';
import {
  LayoutDashboard,
  Users,
  Image as ImageIcon,
  Calendar,
  BookOpen,
  LogOut,
  Upload,
  Trash2,
  CheckCircle,
  Clock,
  Sparkles,
  Database,
  Search,
  Plus
} from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [adminUser, setAdminUser] = useState(null);
  const [dbStatus, setDbStatus] = useState(null);

  // Data states
  const [enquiries, setEnquiries] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [events, setEvents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [staff, setStaff] = useState([]);

  // Upload Form states
  const [uploadFiles, setUploadFiles] = useState([]);
  const [uploadTitleEn, setUploadTitleEn] = useState('');
  const [uploadTitleMr, setUploadTitleMr] = useState('');
  const [uploadCategory, setUploadCategory] = useState('annual-gathering');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState('');

  // Event Form states
  const [showEventModal, setShowEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    category_slug: 'annual-gathering',
    title_en: '',
    title_mr: '',
    description_en: '',
    description_mr: '',
    event_date: '',
    is_upcoming: 0
  });
  const [eventFile, setEventFile] = useState(null);

  useEffect(() => {
    // Verify admin token
    verifyAdmin()
      .then(res => {
        if (res.data?.success) {
          setAdminUser(res.data.admin);
          setDbStatus(res.data.dbStatus);
          loadAllData();
        } else {
          handleLogout();
        }
      })
      .catch(() => handleLogout());
  }, []);

  const loadAllData = () => {
    getEnquiries().then(r => r.data?.success && setEnquiries(r.data.data)).catch(() => {});
    getGallery().then(r => r.data?.success && setGallery(r.data.data)).catch(() => {});
    getEvents().then(r => r.data?.success && setEvents(r.data.data)).catch(() => {});
    getClasses().then(r => r.data?.success && setClasses(r.data.data)).catch(() => {});
    getStaff().then(r => r.data?.success && setStaff(r.data.data)).catch(() => {});
  };

  const handleLogout = () => {
    localStorage.removeItem('gs_admin_token');
    localStorage.removeItem('gs_admin_user');
    navigate('/admin/login');
  };

  // Enquiry Status Update
  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateEnquiry(id, { status: newStatus });
      setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status: newStatus } : e));
    } catch (err) {
      alert('Failed to update status.');
    }
  };

  const handleDeleteEnquiry = async (id) => {
    if (!window.confirm('Are you sure you want to delete this enquiry?')) return;
    try {
      await deleteEnquiry(id);
      setEnquiries(prev => prev.filter(e => e.id !== id));
    } catch (err) {
      alert('Failed to delete enquiry.');
    }
  };

  // Media Upload handler
  const handleMediaUpload = async (e) => {
    e.preventDefault();
    if (uploadFiles.length === 0) {
      alert('Please select at least one photo or video to upload.');
      return;
    }

    setIsUploading(true);
    setUploadSuccess('');

    const formData = new FormData();
    for (let i = 0; i < uploadFiles.length; i++) {
      formData.append('media', uploadFiles[i]);
    }
    formData.append('title_en', uploadTitleEn);
    formData.append('title_mr', uploadTitleMr);
    formData.append('category_slug', uploadCategory);

    try {
      const res = await uploadMediaFiles(formData);
      if (res.data?.success) {
        setUploadSuccess(res.data.message || 'Files uploaded successfully!');
        setUploadFiles([]);
        setUploadTitleEn('');
        setUploadTitleMr('');
        // Reload gallery
        getGallery().then(r => r.data?.success && setGallery(r.data.data));
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Error uploading media.');
    } finally {
      setIsUploading(false);
    }
  };

  // Delete Media
  const handleDeleteMedia = async (id) => {
    if (!window.confirm('Are you sure you want to delete this media item?')) return;
    try {
      await deleteGalleryMedia(id);
      setGallery(prev => prev.filter(g => g.id !== id));
    } catch (err) {
      alert('Failed to delete media.');
    }
  };

  // Create Event
  const handleCreateEvent = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('category_slug', newEvent.category_slug);
    formData.append('title_en', newEvent.title_en);
    formData.append('title_mr', newEvent.title_mr);
    formData.append('description_en', newEvent.description_en);
    formData.append('description_mr', newEvent.description_mr);
    formData.append('event_date', newEvent.event_date);
    formData.append('is_upcoming', newEvent.is_upcoming);
    if (eventFile) {
      formData.append('featured_image', eventFile);
    }

    try {
      await createSchoolEvent(formData);
      setShowEventModal(false);
      setNewEvent({
        category_slug: 'annual-gathering',
        title_en: '',
        title_mr: '',
        description_en: '',
        description_mr: '',
        event_date: '',
        is_upcoming: 0
      });
      setEventFile(null);
      getEvents().then(r => r.data?.success && setEvents(r.data.data));
    } catch (err) {
      alert('Error creating event.');
    }
  };

  const handleDeleteEvent = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      await deleteSchoolEvent(id);
      setEvents(prev => prev.filter(e => e.id !== id));
    } catch (err) {
      alert('Error deleting event.');
    }
  };

  const pendingEnquiriesCount = enquiries.filter(e => e.status === 'Pending').length;

  return (
    <div className="admin-layout">
      {/* Header */}
      <header className="admin-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img src="/logo-badge.svg" alt="G S Modern Logo" style={{ width: '40px', height: '40px' }} />
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>G S Modern School Admin</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
              Welcome, {adminUser?.fullName || 'Administrator'}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link to="/" target="_blank" className="btn-secondary" style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem', color: '#ffffff', borderColor: '#475569' }}>
            View Live Website
          </Link>
          <button onClick={handleLogout} className="btn-secondary" style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem', background: '#ef4444', color: '#ffffff', borderColor: '#ef4444' }}>
            <LogOut size={14} /> Log Out
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="admin-tabs">
        <button
          onClick={() => setActiveTab('overview')}
          className={`admin-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
        >
          <LayoutDashboard size={16} style={{ display: 'inline', marginRight: '6px' }} />
          Dashboard Overview
        </button>

        <button
          onClick={() => setActiveTab('enquiries')}
          className={`admin-tab-btn ${activeTab === 'enquiries' ? 'active' : ''}`}
        >
          <Users size={16} style={{ display: 'inline', marginRight: '6px' }} />
          Admission Enquiries ({pendingEnquiriesCount > 0 ? `${pendingEnquiriesCount} New` : enquiries.length})
        </button>

        <button
          onClick={() => setActiveTab('media')}
          className={`admin-tab-btn ${activeTab === 'media' ? 'active' : ''}`}
        >
          <Upload size={16} style={{ display: 'inline', marginRight: '6px' }} />
          Upload Photos & Videos ({gallery.length})
        </button>

        <button
          onClick={() => setActiveTab('events')}
          className={`admin-tab-btn ${activeTab === 'events' ? 'active' : ''}`}
        >
          <Calendar size={16} style={{ display: 'inline', marginRight: '6px' }} />
          School Events ({events.length})
        </button>

        <button
          onClick={() => setActiveTab('classes-staff')}
          className={`admin-tab-btn ${activeTab === 'classes-staff' ? 'active' : ''}`}
        >
          <BookOpen size={16} style={{ display: 'inline', marginRight: '6px' }} />
          Classes & Staff ({classes.length} / {staff.length})
        </button>
      </div>

      <div className="admin-content-box">
        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div>
            {/* DB Status Banner */}
            <div style={{ background: dbStatus?.isUsingMySQL ? '#ecfdf5' : '#eff6ff', border: `1px solid ${dbStatus?.isUsingMySQL ? '#a7f3d0' : '#bfdbfe'}`, borderRadius: '12px', padding: '1rem 1.25rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Database size={24} style={{ color: dbStatus?.isUsingMySQL ? '#059669' : '#2563eb' }} />
                <div>
                  <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem' }}>
                    Database Mode: {dbStatus?.isUsingMySQL ? 'Connected to MySQL Database (gs_modern_school)' : 'Seamless Local Storage Engine Active'}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    {dbStatus?.isUsingMySQL ? 'Host: localhost:3306 • Live table synchronization active' : 'All CRUD operations, file uploads, and enquiry records are 100% functional and safely preserved.'}
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '0.8rem', background: '#ffffff', padding: '0.35rem 0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                Status: <strong style={{ color: '#059669' }}>Online & Ready</strong>
              </div>
            </div>

            {/* KPI Summary Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '14px', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Total Enquiries</div>
                <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#1d4ed8', marginTop: '0.35rem' }}>{enquiries.length}</div>
                <div style={{ fontSize: '0.8rem', color: '#ea580c', marginTop: '0.2rem' }}>{pendingEnquiriesCount} pending response</div>
              </div>

              <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '14px', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>School Events</div>
                <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#059669', marginTop: '0.35rem' }}>{events.length}</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.2rem' }}>11 Standard Categories</div>
              </div>

              <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '14px', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Gallery Media</div>
                <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#d97706', marginTop: '0.35rem' }}>{gallery.length}</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.2rem' }}>Real school photos loaded</div>
              </div>

              <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '14px', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Active Classes</div>
                <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#7c3aed', marginTop: '0.35rem' }}>4</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.2rem' }}>Playgroup, Nursery, LKG, UKG</div>
              </div>
            </div>

            {/* Recent Enquiries Preview */}
            <div style={{ background: '#ffffff', borderRadius: '14px', padding: '1.5rem', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>Recent Admission Inquiries</h3>
                <button onClick={() => setActiveTab('enquiries')} className="btn-link-action">
                  View All ({enquiries.length})
                </button>
              </div>

              {enquiries.length === 0 ? (
                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>No enquiries submitted yet.</p>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Parent Name</th>
                        <th>Child Name</th>
                        <th>Mobile</th>
                        <th>Class</th>
                        <th>Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enquiries.slice(0, 5).map(e => (
                        <tr key={e.id}>
                          <td style={{ fontWeight: 600 }}>{e.parent_name}</td>
                          <td>{e.child_name}</td>
                          <td>{e.parent_mobile}</td>
                          <td><span style={{ fontWeight: 700, color: '#1d4ed8' }}>{e.class_interested}</span></td>
                          <td>{new Date(e.created_at).toLocaleDateString()}</td>
                          <td>
                            <span className={`status-badge status-${(e.status || 'pending').toLowerCase()}`}>
                              {e.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Admission Enquiries */}
        {activeTab === 'enquiries' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>
                Admission Inquiries Management
              </h2>
              <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                Total Records: <strong>{enquiries.length}</strong>
              </span>
            </div>

            {enquiries.length === 0 ? (
              <div style={{ background: '#ffffff', padding: '3rem', borderRadius: '14px', textAlign: 'center', color: '#64748b' }}>
                <Users size={40} style={{ margin: '0 auto 1rem', opacity: 0.4 }} />
                <p>No admission enquiries received yet.</p>
              </div>
            ) : (
              <div style={{ background: '#ffffff', borderRadius: '14px', overflowX: 'auto', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)' }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Parent Name</th>
                      <th>Child Name</th>
                      <th>Mobile Number</th>
                      <th>Class</th>
                      <th>Message</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enquiries.map((enq) => (
                      <tr key={enq.id}>
                        <td style={{ color: '#94a3b8' }}>#{enq.id}</td>
                        <td style={{ fontWeight: 700 }}>{enq.parent_name}</td>
                        <td>{enq.child_name}</td>
                        <td>
                          <a href={`tel:${enq.parent_mobile}`} style={{ color: '#1d4ed8', fontWeight: 600 }}>
                            {enq.parent_mobile}
                          </a>
                        </td>
                        <td><span style={{ fontWeight: 700, color: '#ea580c' }}>{enq.class_interested}</span></td>
                        <td style={{ maxWidth: '200px', fontSize: '0.85rem', color: '#475569' }}>
                          {enq.message || '-'}
                        </td>
                        <td style={{ fontSize: '0.8rem', color: '#64748b' }}>
                          {new Date(enq.created_at).toLocaleDateString()}
                        </td>
                        <td>
                          <select
                            value={enq.status || 'Pending'}
                            onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                            style={{ padding: '0.3rem 0.5rem', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 700, border: '1px solid #cbd5e1' }}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Enrolled">Enrolled</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </td>
                        <td>
                          <button
                            onClick={() => handleDeleteEnquiry(enq.id)}
                            style={{ background: 'transparent', color: '#ef4444', padding: '0.3rem' }}
                            title="Delete Enquiry"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Media Upload & Gallery */}
        {activeTab === 'media' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', marginBottom: '3rem' }}>
              {/* Upload Form Box */}
              <div style={{ background: '#ffffff', padding: '1.75rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Upload size={20} style={{ color: '#1d4ed8' }} /> Upload Photos & Videos
                </h3>

                {uploadSuccess && (
                  <div className="alert-box alert-success" style={{ padding: '0.75rem 1rem', fontSize: '0.85rem', marginBottom: '1rem' }}>
                    {uploadSuccess}
                  </div>
                )}

                <form onSubmit={handleMediaUpload}>
                  <div className="form-group">
                    <label className="form-label">Select Files (JPG, PNG, WEBP, MP4) *</label>
                    <input
                      type="file"
                      multiple
                      accept="image/jpeg,image/png,image/webp,video/mp4"
                      onChange={(e) => setUploadFiles(Array.from(e.target.files))}
                      className="form-control"
                      required
                    />
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
                      Tip: You can select multiple photos at once.
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Title (English)</label>
                    <input
                      type="text"
                      value={uploadTitleEn}
                      onChange={(e) => setUploadTitleEn(e.target.value)}
                      placeholder="e.g. Annual Sports & Games"
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Title (Marathi)</label>
                    <input
                      type="text"
                      value={uploadTitleMr}
                      onChange={(e) => setUploadTitleMr(e.target.value)}
                      placeholder="उदा. वार्षिक क्रीडा स्पर्धा"
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Event / Category</label>
                    <select
                      value={uploadCategory}
                      onChange={(e) => setUploadCategory(e.target.value)}
                      className="form-control"
                    >
                      <option value="annual-gathering">Annual Gathering (वार्षिक स्नेहसंमेलन)</option>
                      <option value="independence-day">Independence Day (स्वातंत्र्य दिन)</option>
                      <option value="republic-day">Republic Day (प्रजासत्ताक दिन)</option>
                      <option value="ashadhi-ekadashi">Ashadhi Ekadashi (आषाढी एकादशी दिंडी)</option>
                      <option value="gokulashtami">Gokulashtami (गोकुळाष्टमी)</option>
                      <option value="diwali-celebration">Diwali (दिवाळी महोत्सव)</option>
                      <option value="navratri">Navratri (नवरात्रौत्सव)</option>
                      <option value="all-jayanti-celebrations">All Jayanti Celebrations (सर्व जयंती)</option>
                      <option value="ganesh-chaturthi">Ganesh Chaturthi (गणेशोत्सव)</option>
                      <option value="maharashtra-day">Maharashtra Day (महाराष्ट्र दिन)</option>
                      <option value="science-exhibition">Science Exhibition (विज्ञान प्रदर्शन)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isUploading}
                    className="btn-primary"
                    style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}
                  >
                    <Upload size={16} />
                    <span>{isUploading ? 'Uploading Media...' : 'Upload to Gallery'}</span>
                  </button>
                </form>
              </div>

              {/* Uploaded Media Gallery List */}
              <div style={{ background: '#ffffff', padding: '1.75rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem' }}>
                  Manage Uploaded Media ({gallery.length} items)
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '1rem', maxHeight: '520px', overflowY: 'auto', padding: '0.25rem' }}>
                  {gallery.map((item) => (
                    <div key={item.id} style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', border: '1px solid #e2e8f0', background: '#f8fafc' }}>
                      {item.media_type === 'video' ? (
                        <div style={{ height: '95px', background: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}>
                          <span style={{ fontSize: '0.75rem' }}>🎥 MP4 Video</span>
                        </div>
                      ) : (
                        <img
                          src={item.file_url}
                          alt={item.title_en}
                          style={{ width: '100%', height: '95px', objectFit: 'cover' }}
                        />
                      )}
                      <div style={{ padding: '0.4rem', fontSize: '0.75rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.title_en}
                      </div>
                      <button
                        onClick={() => handleDeleteMedia(item.id)}
                        style={{ position: 'absolute', top: '4px', right: '4px', background: 'rgba(239, 68, 68, 0.85)', color: '#ffffff', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        title="Delete Media"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Events */}
        {activeTab === 'events' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>
                School Events & Celebrations
              </h2>
              <button
                onClick={() => setShowEventModal(true)}
                className="btn-primary"
                style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
              >
                <Plus size={16} /> Add New Event
              </button>
            </div>

            <div style={{ background: '#ffffff', borderRadius: '14px', overflowX: 'auto', border: '1px solid #e2e8f0' }}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Title (English)</th>
                    <th>Title (Marathi)</th>
                    <th>Event Date</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((ev) => (
                    <tr key={ev.id}>
                      <td><span style={{ background: '#eff6ff', color: '#1d4ed8', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>{ev.category_slug}</span></td>
                      <td style={{ fontWeight: 700 }}>{ev.title_en}</td>
                      <td>{ev.title_mr}</td>
                      <td>{ev.event_date || '-'}</td>
                      <td style={{ maxWidth: '280px', fontSize: '0.85rem', color: '#64748b' }}>{ev.description_en}</td>
                      <td>
                        <button
                          onClick={() => handleDeleteEvent(ev.id)}
                          style={{ background: 'transparent', color: '#ef4444', padding: '0.3rem' }}
                          title="Delete Event"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add Event Modal */}
            {showEventModal && (
              <div className="lightbox-backdrop" onClick={() => setShowEventModal(false)}>
                <div className="lightbox-content" onClick={(e) => e.stopPropagation()} style={{ background: '#ffffff', padding: '2rem', borderRadius: '16px', maxWidth: '540px', width: '90%' }}>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.25rem' }}>Add School Event</h3>
                  <form onSubmit={handleCreateEvent}>
                    <div className="form-group">
                      <label className="form-label">Category</label>
                      <select
                        value={newEvent.category_slug}
                        onChange={(e) => setNewEvent({ ...newEvent, category_slug: e.target.value })}
                        className="form-control"
                      >
                        <option value="independence-day">Independence Day</option>
                        <option value="gokulashtami">Gokulashtami</option>
                        <option value="republic-day">Republic Day</option>
                        <option value="ashadhi-ekadashi">Ashadhi Ekadashi</option>
                        <option value="diwali-celebration">Diwali Celebration</option>
                        <option value="navratri">Navratri</option>
                        <option value="all-jayanti-celebrations">All Jayanti Celebrations</option>
                        <option value="annual-gathering">Annual Gathering</option>
                        <option value="ganesh-chaturthi">Ganesh Chaturthi</option>
                        <option value="maharashtra-day">Maharashtra Day</option>
                        <option value="science-exhibition">Science Exhibition</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Title (English) *</label>
                      <input
                        type="text"
                        value={newEvent.title_en}
                        onChange={(e) => setNewEvent({ ...newEvent, title_en: e.target.value })}
                        className="form-control"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Title (Marathi) *</label>
                      <input
                        type="text"
                        value={newEvent.title_mr}
                        onChange={(e) => setNewEvent({ ...newEvent, title_mr: e.target.value })}
                        className="form-control"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Event Date</label>
                      <input
                        type="date"
                        value={newEvent.event_date}
                        onChange={(e) => setNewEvent({ ...newEvent, event_date: e.target.value })}
                        className="form-control"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Event Photo</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setEventFile(e.target.files[0])}
                        className="form-control"
                      />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                      <button type="button" onClick={() => setShowEventModal(false)} className="btn-secondary">
                        Cancel
                      </button>
                      <button type="submit" className="btn-primary">
                        Save Event
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 5: Classes & Staff */}
        {activeTab === 'classes-staff' && (
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>
              Classes & Staff Directory
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', color: '#1d4ed8' }}>Classes (4)</h3>
                {classes.map(c => (
                  <div key={c.id} style={{ padding: '0.75rem 0', borderBottom: '1px solid #f1f5f9' }}>
                    <div style={{ fontWeight: 700 }}>{c.name}</div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{c.description_en}</div>
                  </div>
                ))}
              </div>

              <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', color: '#059669' }}>Staff Members</h3>
                {staff.map(s => (
                  <div key={s.id} style={{ padding: '0.75rem 0', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 700 }}>{s.name_en} ({s.name_mr})</div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{s.role_en} / {s.role_mr}</div>
                    </div>
                    <span style={{ fontSize: '0.75rem', background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                      {s.role_en}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
