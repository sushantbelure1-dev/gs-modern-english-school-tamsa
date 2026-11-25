# 🏫 G S Modern English School Tamsa - Complete School Website

A modern, responsive, colourful, and bilingual (English & Marathi) school website and administrative portal built for **G S Modern English School Tamsa**, located in Mahatma Basaveshwar Nagar, Tamsa, Taluka Hadgaon, District Nanded, Maharashtra, India.

---

## 🌟 Key Features

1. **Bilingual Language Support (English & Marathi)**
   - Instant header toggle button (`EN | मराठी`).
   - Every label, button, heading, description, card, and footer element changes seamlessly.
   - Preserves user language preference in `localStorage`.

2. **10 Complete School Pages**
   - **Home**: Welcome banner, 4 class cards, facilities checklist, principal spotlight, activities preview, upcoming events, real photo & video gallery previews.
   - **About School**: Story, values, Mahatma Basaveshwar Nagar campus, safety & CCTV highlights.
   - **Principal & Staff**: Inspiring message from Principal **Usha Belure** and cards for staff members (**Jyoti Kamble**, **Sana Pathan**, **Pragati Lagdutkar**, **Ankita Sontakke**, **Anuradha Thombale** [Peon], **Jay Suryawanshi** [Driver]).
   - **Classes**: Dedicated cards for **Playgroup**, **Nursery**, **LKG**, and **UKG**.
   - **Activities**: International Yoga Day (21 June), Harit Utsav (Green Day), Yellow Day, Montessori & Play-Way, Alphabet A-Z Lineup, Physical Drills.
   - **Events & Celebrations**: 11 dedicated categories (Independence Day, Gokulashtami, Republic Day, Ashadhi Ekadashi, Diwali, Navratri, All Jayanti, Annual Gathering, Ganesh Chaturthi, Maharashtra Day, Science Exhibition) with filter tabs.
   - **Photo Gallery**: Real school photos, category filtering, and full-screen interactive lightbox modal.
   - **Video Gallery**: Video player card supporting MP4 video playback.
   - **Admission Enquiry**: Parent Name, Child Name, Mobile Number, Email, Class selection, Message, and Consent checkbox with validation.
   - **Contact Us**: Address in Tamsa, Principal contact point, configurable map locator.

3. **Secure Admin Dashboard (`/admin/login` & `/admin/dashboard`)**
   - Protected with JWT authentication and bcrypt password hashing.
   - **Dashboard Overview**: Metrics on enquiries, media, events, and database status.
   - **Enquiry Manager**: View submissions, update status (*Pending*, *Contacted*, *Enrolled*, *Closed*), delete entries.
   - **Media Manager**: Multi-file uploader for photos and MP4 videos, category assignment, and media deletion.
   - **Events Manager**: Add new school celebrations with date and cover image.
   - **Classes & Staff Directory**: Manage school information.

4. **Robust Database Architecture (MySQL + Seamless Fallback)**
   - Ready-to-import SQL script at `database/school.sql`.
   - Dual-engine design: Connects automatically to MySQL (`gs_modern_school`). If MySQL service is temporarily inactive, it seamlessly uses a local storage store so the entire website and admin panel run immediately without crashes!

---

## 📁 Project Folder Structure

```
G S Modern/
├── backend/
│   ├── config/
│   │   └── db.js                 # MySQL pool & fallback data store
│   ├── controllers/
│   │   ├── authController.js     # Admin login & JWT verification
│   │   ├── classController.js    # Classes API
│   │   ├── staffController.js    # Staff API
│   │   ├── eventController.js    # Events API
│   │   ├── galleryController.js  # Photo & Video gallery API
│   │   ├── enquiryController.js  # Admission enquiries API
│   │   └── contentController.js  # Website content CMS
│   ├── middleware/
│   │   ├── auth.js               # JWT verification middleware
│   │   └── upload.js             # Multer image/video upload middleware
│   ├── routes/                   # Express API routes
│   ├── uploads/
│   │   ├── photos/               # Uploaded school photos
│   │   └── videos/               # Uploaded school videos
│   ├── .env                      # Backend environment variables
│   ├── package.json
│   └── server.js                 # Express server entry point
├── frontend/
│   ├── public/
│   │   ├── logo-badge.svg        # School badge logo
│   │   └── school-photos/        # Authentic school photos
│   ├── src/
│   │   ├── admin/
│   │   │   ├── AdminLogin.jsx    # Admin login screen
│   │   │   └── AdminDashboard.jsx# Admin dashboard
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Responsive navigation with Marathi toggle
│   │   │   ├── Footer.jsx        # School footer
│   │   │   ├── ClassCard.jsx     # Class card component
│   │   │   ├── EventCard.jsx     # Event card component
│   │   │   └── Lightbox.jsx      # Full-screen photo viewer
│   │   ├── context/
│   │   │   └── LanguageContext.jsx # English/Marathi translation context
│   │   ├── pages/                # All 10 website pages
│   │   ├── services/
│   │   │   └── api.js            # Axios API service
│   │   ├── translations/
│   │   │   └── index.js          # Bilingual English & Marathi dictionary
│   │   ├── App.jsx               # React Router routes
│   │   ├── main.jsx              # React DOM entry
│   │   └── index.css             # Child-friendly, modern styling
│   ├── package.json
│   └── vite.config.js
├── database/
│   └── school.sql                # Complete MySQL setup script
├── start-project.bat             # 1-Click launcher for Windows
└── README.md
```

---

## 🚀 How to Run the Project (Step-by-Step for Beginners)

### Step 1: Open the Project in Terminal / PowerShell
Open your terminal in the project folder:
```powershell
cd "c:\Users\Lenovo\OneDrive\Desktop\G S Modern"
```

---

### Step 2: Configure MySQL Database (Optional but Recommended)
1. Open **MySQL Workbench** or start your MySQL server.
2. Open the file `database/school.sql` located inside this project.
3. Click the **Execute (Lightning icon)** in MySQL Workbench to run the script. This creates the database `gs_modern_school` and seeds the default admin, classes, staff, events, and photos.
4. Verify your MySQL credentials in `backend/.env`:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=gs_modern_school
   DB_PORT=3306
   ```
*(Note: If your MySQL is password protected, type your password next to `DB_PASSWORD=`.)*

---

### Step 3: Start the Backend Server
In your first terminal tab:
```powershell
cd backend
npm start
```
You will see:
```
🚀 G S Modern School Backend running at: http://localhost:5000
📡 Health Check: http://localhost:5000/api/health
```

---

### Step 4: Start the Frontend React Web App
In a second terminal tab:
```powershell
cd frontend
npm run dev
```
You will see:
```
  VITE v5.2.11  ready in 300 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

### Step 5: Test the Application in Your Browser
- Open your web browser and navigate to: **`http://localhost:5173`**
- Test switching between **English** and **मराठी** using the button in the top navigation bar.
- Test browsing **Classes**, **Principal & Staff**, **Activities**, **Events & Celebrations**, **Photo Gallery**, and **Video Gallery**.
- Test submitting an enquiry in the **Admission Enquiry** form (`/admission`).

---

### Step 6: Log In to the Admin Dashboard
- Go to: **`http://localhost:5173/admin/login`**
- Use the pre-configured credentials:
  - **Username**: `admin`
  - **Password**: `Admin@123`
- From the Admin Dashboard, you can:
  - View all parent admission enquiries and change status (*Pending*, *Contacted*, *Enrolled*).
  - Upload multiple new photos or MP4 videos directly to the school gallery.
  - Create new school events and celebrations.
  - Delete media or entries.

---

## 📸 Real School Photos Included
The 16 authentic photos you uploaded have been organized and pre-loaded into the website:
1. `hero-independence-day-banner.jpg` (Hero Banner: 15 August celebration with student freedom fighters)
2. `international-yoga-day.jpg` (21 June International Yoga Day celebration)
3. `ashadhi-ekadashi-dindi.jpg` (Ashadhi Ekadashi child Dindi procession)
4. `principal-ashadhi-ekadashi.jpg` (Principal Usha Belure & staff in festive celebration)
5. `independence-day-costumes.jpg` (National leaders & soldiers fancy dress)
6. `yellow-day-celebration.jpg` (Yellow Day colors & joy)
7. `green-day-celebration.jpg` (Harit Utsav nature appreciation)
8. `alphabet-activity-lineup.jpg` (English alphabet A to Z lineup)
9. `montessori-learning-activities.jpg` (Montessori play-way games & collage)
10. `classroom-study-session.jpg` (Classroom reading and writing practice)
11. `morning-assembly-exercise.jpg` (Morning prayer and physical exercises)
12. `annual-gathering-crowd.jpg` (Annual Gathering grand parent assembly)
13. `campus-garden-overview.jpg` (School green campus & garden)
14. `activity-fun-learning.jpg` (Outdoor shape-making and ground activities)
15. `school-brochure-marathi.jpg` (Authentic school Marathi information brochure)
16. `school-activity-group.jpg` (Students group activity)
