-- G S Modern English School Tamsa
-- Database Setup Script (MySQL)
-- Database Name: gs_modern_school

CREATE DATABASE IF NOT EXISTS `gs_modern_school` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `gs_modern_school`;

-- 1. Admins Table
CREATE TABLE IF NOT EXISTS `admins` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `email` VARCHAR(100) DEFAULT NULL,
  `full_name` VARCHAR(100) NOT NULL,
  `role` VARCHAR(20) DEFAULT 'admin',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Classes Table
CREATE TABLE IF NOT EXISTS `classes` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(50) NOT NULL,
  `slug` VARCHAR(50) NOT NULL UNIQUE,
  `description_en` TEXT NOT NULL,
  `description_mr` TEXT NOT NULL,
  `image_url` VARCHAR(255) DEFAULT NULL,
  `order_index` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Staff Table
CREATE TABLE IF NOT EXISTS `staff` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name_en` VARCHAR(100) NOT NULL,
  `name_mr` VARCHAR(100) NOT NULL,
  `role_en` VARCHAR(100) NOT NULL,
  `role_mr` VARCHAR(100) NOT NULL,
  `photo_url` VARCHAR(255) DEFAULT NULL,
  `order_index` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Events Table
CREATE TABLE IF NOT EXISTS `events` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `category_slug` VARCHAR(50) NOT NULL,
  `title_en` VARCHAR(150) NOT NULL,
  `title_mr` VARCHAR(150) NOT NULL,
  `description_en` TEXT DEFAULT NULL,
  `description_mr` TEXT DEFAULT NULL,
  `event_date` DATE DEFAULT NULL,
  `is_upcoming` TINYINT(1) DEFAULT 0,
  `featured_image` VARCHAR(255) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Gallery Table (Photos & Videos)
CREATE TABLE IF NOT EXISTS `gallery` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title_en` VARCHAR(150) NOT NULL,
  `title_mr` VARCHAR(150) NOT NULL,
  `media_type` ENUM('photo', 'video') NOT NULL DEFAULT 'photo',
  `file_url` VARCHAR(255) NOT NULL,
  `thumbnail_url` VARCHAR(255) DEFAULT NULL,
  `category_slug` VARCHAR(50) NOT NULL,
  `event_id` INT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_gallery_event` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Admission Enquiries Table
CREATE TABLE IF NOT EXISTS `admission_enquiries` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `parent_name` VARCHAR(100) NOT NULL,
  `child_name` VARCHAR(100) NOT NULL,
  `parent_mobile` VARCHAR(20) NOT NULL,
  `parent_email` VARCHAR(100) DEFAULT NULL,
  `class_interested` VARCHAR(50) NOT NULL,
  `message` TEXT DEFAULT NULL,
  `consent_given` TINYINT(1) NOT NULL DEFAULT 1,
  `status` ENUM('Pending', 'Contacted', 'Enrolled', 'Closed') DEFAULT 'Pending',
  `admin_notes` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Website Content Table (Key-Value CMS for Bilingual Texts)
CREATE TABLE IF NOT EXISTS `website_content` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `content_key` VARCHAR(100) NOT NULL UNIQUE,
  `section` VARCHAR(50) NOT NULL,
  `content_en` TEXT NOT NULL,
  `content_mr` TEXT NOT NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed Data: Initial Administrator (Default credentials: admin / Admin@123)
-- Hash generated using bcrypt for 'Admin@123': $2a$10$oidpMcWGpN2ODFQnnVFRH.geUwfQk9UQwK05i1cavHqvlfpMtAfw.
INSERT INTO `admins` (`username`, `password_hash`, `email`, `full_name`, `role`)
VALUES ('admin', '$2a$10$oidpMcWGpN2ODFQnnVFRH.geUwfQk9UQwK05i1cavHqvlfpMtAfw.', 'admin@gsmodernschool.edu.in', 'School Administrator', 'admin')
ON DUPLICATE KEY UPDATE `username`=`username`;

-- Seed Data: Classes
INSERT INTO `classes` (`name`, `slug`, `description_en`, `description_mr`, `image_url`, `order_index`)
VALUES 
('Playgroup', 'playgroup', 'A loving, playful introduction to school life filled with sensory activities, joyful rhymes, games, and motor skill development.', 'खेळ आणि आनंदी वातावरणात मुलांचा शाळेतील पहिला अनुभव. मनोरंजक खेळ, बडबडगीते व हस्तकला यांद्वारे बौद्धिक व शारीरिक विकास.', '/school-photos/activity-fun-learning.jpg', 1),
('Nursery', 'nursery', 'Nurturing curiosity through language discovery, numbers, colours, creative art, and social interaction in a caring environment.', 'रंग, आकार, अक्षरे आणि अंकांचे प्राथमिक ज्ञान, सर्जनशील कला आणि सुसंस्कृत वातावरणात भाषिक व सामाजिक कौशल्यांची जडणघडण.', '/school-photos/montessori-learning-activities.jpg', 2),
('LKG', 'lkg', 'Building early literacy, structured learning, phonics, mathematics foundations, and active classroom engagement.', 'वाचन, लेखन, उच्चार (Phonics), मूलभूत गणित व विज्ञानाची पहिली ओळख आणि विचारशक्तीला चालना देणारे आधुनिक शिक्षण.', '/school-photos/alphabet-activity-lineup.jpg', 3),
('UKG', 'ukg', 'Preparing young learners with solid academic readiness, sentence construction, general awareness, and self-confidence.', 'पहिलीत प्रवेशासाठी परिपूर्ण पूर्वतयारी, सुस्पष्ट संभाषण, स्वावलंबन आणि सर्वसमावेशक व्यक्तिमत्त्व विकासावर विशेष भर.', '/school-photos/classroom-study-session.jpg', 4)
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);

-- Seed Data: Principal & Staff
INSERT INTO `staff` (`name_en`, `name_mr`, `role_en`, `role_mr`, `photo_url`, `order_index`)
VALUES
('Usha Belure', 'उषा बेलुरे', 'Principal', 'मुख्याध्यापिका', '/school-photos/principal-usha-belure.jpg', 1),
('Jyoti Kamble', 'ज्योती कांबळे', 'Teacher', 'शिक्षक', '/school-photos/staff-jyoti-kamble.jpg', 2),
('Sana Pathan', 'सना पठाण', 'Teacher', 'शिक्षक', NULL, 3),
('Pragati Lagdutkar', 'प्रगती लगडूतकर', 'Teacher', 'शिक्षक', '/school-photos/staff-pragati-lagdutkar.jpg', 4),
('Ankita Sontakke', 'अंकिता सोनटक्के', 'Teacher', 'शिक्षक', '/school-photos/staff-ankita-sontakke.jpg', 5),
('Anuradha Thombale', 'अनुराधा थोंबळे', 'Peon', 'शिपाई', '/school-photos/staff-anuradha-thombale.jpg', 6),
('Jay Suryawanshi', 'जय सूर्यवंशी', 'Driver', 'वाहन चालक', NULL, 7)
ON DUPLICATE KEY UPDATE `name_en`=VALUES(`name_en`);

-- Seed Data: School Events (11 Requested Categories)
INSERT INTO `events` (`category_slug`, `title_en`, `title_mr`, `description_en`, `description_mr`, `event_date`, `is_upcoming`, `featured_image`)
VALUES
('independence-day', 'Independence Day', 'स्वातंत्र्य दिन', 'Grand 15th August celebration with flag hoisting, national freedom fighters fancy dress, patriotic songs, and cultural performances by tiny tots.', '१५ ऑगस्ट स्वातंत्र्य दिन उत्साहात साजरा. चिमुकल्यांचे देशभक्तिपर वेशभूषा, राष्ट्रगीत, भाषणे व सांस्कृतिक कार्यक्रम.', '2026-08-15', 0, '/school-photos/hero-independence-day-banner.jpg'),
('gokulashtami', 'Gokulashtami', 'गोकुळाष्टमी उत्सव', 'Joyful celebration of Shri Krishna Janmashtami with colourful Bal Gopal & Radha costumes, singing, and safe child-friendly Dahi Handi.', 'श्रीकृष्ण जन्माष्टमी व दहीहंडी सोहळा. राधा-कृष्णाच्या सुंदर वेशभूषेत चिमुकल्यांचा आनंदोत्सव आणि पारंपरिक गीते.', '2026-09-04', 0, '/school-photos/school-activity-group.jpg'),
('republic-day', 'Republic Day', 'प्रजासत्ताक दिन', 'Celebration of national pride, unfurling the tricolour, march past, and instilling patriotic values in children from early childhood.', '२६ जानेवारी प्रजासत्ताक दिनानिमित्त ध्वजारोहण, शिस्तबद्ध संचलन व लहान मुलांमध्ये देशप्रेमाची मूल्ये रुजविणारा सोहळा.', '2026-01-26', 0, '/school-photos/independence-day-costumes.jpg'),
('ashadhi-ekadashi', 'Ashadhi Ekadashi', 'आषाढी एकादशी दिंडी', 'Traditional Dindi procession with students dressed in traditional Warkari attire carrying small saffron flags and experiencing Maharashtra heritage.', 'वारकरी संप्रदायाची संस्कृती जपणारी भव्य बाल दिंडी, विठ्ठल-रखुमाई वेशभूषा, टाळ-मृदुंगाचा गजर आणि भक्तिमय वातावरण.', '2026-07-26', 0, '/school-photos/ashadhi-ekadashi-dindi.jpg'),
('diwali-celebration', 'Diwali Celebration', 'दिवाळी महोत्सव', 'Festival of lights celebration with handmade diyas, lantern making, traditional dress, sweet sharing, and safety awareness.', 'दीपोत्सवाचा आनंद! चिमुकल्यांनी स्वतः बनवलेले दिवे, कंदील, रांगोळी आणि पारंपारिक कपड्यांमधील आनंददायी क्षण.', '2026-11-08', 0, '/school-photos/school-activity-group.jpg'),
('navratri', 'Navratri', 'नवरात्रौत्सव व गरबा', 'Nine days of joy featuring traditional Dandiya/Garba dance, colorful traditional costumes, and cultural storytelling.', 'दांडिया आणि गरबा नृत्याचा उत्साह. पारंपरिक वेशभूषेत मुलांचा सहभाग आणि भारतीय संस्कृतीचे दर्शन.', '2026-10-12', 0, '/school-photos/annual-gathering-crowd.jpg'),
('all-jayanti-celebrations', 'All Jayanti Celebrations', 'सर्व थोर महापुरुषांच्या जयंत्या', 'Honoring great leaders and social reformers: Chhatrapati Shivaji Maharaj, Dr. B.R. Ambedkar, Mahatma Gandhi, Savitribai Phule and Basaveshwar Maharaj.', 'छत्रपती शिवाजी महाराज, डॉ. बाबासाहेब आंबेडकर, महात्मा फुले, सावित्रीबाई फुले व बसवेश्वर महाराज यांच्या जयंत्यांचे प्रेरणादायी आयोजन.', '2026-02-19', 0, '/school-photos/independence-day-costumes.jpg'),
('annual-gathering', 'Annual Gathering', 'वार्षिक स्नेहसंमेलन', 'Grand stage event where every student showcases their talent in dance, drama, recitation, and sports before proud parents and community guests.', 'भव्य वार्षिक स्नेहसंमेलन व पारितोषिक वितरण सोहळा. विद्यार्थ्यांच्या कलागुणांना वाव देणारे रंगारंग सांस्कृतिक सादरीकरण.', '2026-12-20', 0, '/school-photos/annual-gathering-crowd.jpg'),
('ganesh-chaturthi', 'Ganesh Chaturthi', 'गणेशोत्सव', 'Welcoming Lord Ganesha with eco-friendly idol making, modak distribution, morning aarti, and devotional prayers.', 'पर्यावरणपूरक बाप्पाची स्थापना, मुलांचे भजन, आरती व पारंपरिक आनंदोत्सव.', '2026-09-14', 0, '/school-photos/principal-ashadhi-ekadashi.jpg'),
('maharashtra-day', 'Maharashtra Day', 'महाराष्ट्र दिन व कामगार दिन', 'Celebrating the glory and culture of Maharashtra with patriotic speeches, traditional songs, and honoring our community helpers.', '१ मे महाराष्ट्र दिनानिमित्त गौरवशाली इतिहास व मराठी संस्कृतीचे दर्शन घडविणारे विशेष उपक्रम.', '2026-05-01', 0, '/school-photos/campus-garden-overview.jpg'),
('science-exhibition', 'Science Exhibition', 'विज्ञान प्रदर्शन', 'Hands-on simple science experiments, nature exploration, senses identification, and nurturing scientific temper in young learners.', 'चिमुकल्यांचे छोटे वैज्ञानिक प्रयोग, निसर्ग परिचय, झाडे व पर्यावरणाची ओळख करून देणारे ज्ञानवर्धक प्रदर्शन.', '2026-02-28', 0, '/school-photos/montessori-learning-activities.jpg')
ON DUPLICATE KEY UPDATE `title_en`=VALUES(`title_en`);

-- Seed Data: Initial Photos (linking the 16 school photos)
INSERT INTO `gallery` (`title_en`, `title_mr`, `media_type`, `file_url`, `category_slug`, `event_id`)
VALUES
('Independence Day Banner & Celebrations', 'स्वातंत्र्य दिन फलक व बाल देशभक्त', 'photo', '/school-photos/hero-independence-day-banner.jpg', 'independence-day', 1),
('Ashadhi Ekadashi Grand Child Dindi', 'आषाढी एकादशी भव्य बाल दिंडी सोहळा', 'photo', '/school-photos/ashadhi-ekadashi-dindi.jpg', 'ashadhi-ekadashi', 4),
('Principal & Staff at Festive Blessing', 'मुख्याध्यापिका व शिक्षक वृंद - सण सोहळा', 'photo', '/school-photos/principal-ashadhi-ekadashi.jpg', 'ashadhi-ekadashi', 4),
('Independence Day Freedom Fighters Costumes', 'देशभक्त व स्वातंत्र्य सेनानी वेशभूषा', 'photo', '/school-photos/independence-day-costumes.jpg', 'independence-day', 1),
('Yellow Day Bright Color Learning', 'पिवळा रंग दिवस (Yellow Day) आनंदोत्सव', 'photo', '/school-photos/yellow-day-celebration.jpg', 'annual-gathering', 8),
('Green Day Nature & Environment Activity', 'हरित दिन (Green Day) व पर्यावरण जाणीव', 'photo', '/school-photos/green-day-celebration.jpg', 'science-exhibition', 11),
('International Yoga Day Asanas by Tiny Tots', '२१ जून आंतरराष्ट्रीय योग दिन योगासने', 'photo', '/school-photos/international-yoga-day.jpg', 'annual-gathering', 8),
('English Alphabet A to Z Activity Lineup', 'इंग्रजी वर्णमाला (A to Z) उपक्रम', 'photo', '/school-photos/alphabet-activity-lineup.jpg', 'annual-gathering', 8),
('Montessori Play and Early Childhood Learning', 'मॉन्टेसरी खेळ व पूर्वप्राथमिक शिक्षण', 'photo', '/school-photos/montessori-learning-activities.jpg', 'annual-gathering', 8),
('Classroom Focused Reading and Writing', 'वर्गखोलीत वाचन व लेखन सराव', 'photo', '/school-photos/classroom-study-session.jpg', 'annual-gathering', 8),
('Morning Physical Training & Assembly', 'सकाळची प्रार्थना व शारीरिक कवायत', 'photo', '/school-photos/morning-assembly-exercise.jpg', 'annual-gathering', 8),
('Annual Gathering Huge Parent Gathering', 'वार्षिक स्नेहसंमेलन पालक उपस्थिती', 'photo', '/school-photos/annual-gathering-crowd.jpg', 'annual-gathering', 8),
('School Garden and Beautiful Green Campus', 'शाळेचा सुंदर हिरवागार परिसर व बाग', 'photo', '/school-photos/campus-garden-overview.jpg', 'annual-gathering', 8),
('Interactive Outdoor Shape Formation Activity', 'मैदानावर आकार निर्मिती व सामूहिक खेळ', 'photo', '/school-photos/activity-fun-learning.jpg', 'annual-gathering', 8),
('School Information Brochure in Marathi', 'शाळेचे माहिती पत्रक व वैशिष्ट्ये', 'photo', '/school-photos/school-brochure-marathi.jpg', 'annual-gathering', 8),
('Students Joyful Group Activity', 'विद्यार्थ्यांचा समूह उपक्रम व सहकार्य', 'photo', '/school-photos/school-activity-group.jpg', 'annual-gathering', 8),
('Spacious Classrooms & Alphabet Wall Art Corridor', 'सुंदर प्रशस्त वर्गखोल्या व शैक्षणिक भिंतीचित्रे', 'photo', '/school-photos/school-classrooms-corridor-infrastructure.jpg', 'annual-gathering', 8)
ON DUPLICATE KEY UPDATE `title_en`=VALUES(`title_en`);

-- Seed Data: Real School Event Videos
INSERT INTO `gallery` (`title_en`, `title_mr`, `media_type`, `file_url`, `thumbnail_url`, `category_slug`, `event_id`)
VALUES
('Annual Gathering Cultural Performances', 'वार्षिक स्नेहसंमेलन सांस्कृतिक कार्यक्रम सादरीकरण', 'video', '/school-videos/school-event-video-1.mp4', '/school-photos/annual-gathering-crowd.jpg', 'annual-gathering', 8),
('Students Stage Dance & Folk Celebration', 'विद्यार्थ्यांचे रंगमंचावरील लोकनृत्य व सण सोहळा', 'video', '/school-videos/school-event-video-2.mp4', '/school-photos/annual-gathering-crowd.jpg', 'annual-gathering', 8),
('Independence Day Patriotic Drill & Parade', 'स्वातंत्र्य दिन संचलन व देशभक्तीपर कवायत', 'video', '/school-videos/school-event-video-3.mp4', '/school-photos/hero-independence-day-banner.jpg', 'independence-day', 1),
('Ashadhi Ekadashi Dindi Procession & Chants', 'आषाढी एकादशी दिंडी सोहळा व टाळ-मृदंग गजर', 'video', '/school-videos/school-event-video-4.mp4', '/school-photos/ashadhi-ekadashi-dindi.jpg', 'ashadhi-ekadashi', 4),
('Grand Stage Celebration & Parent Gathering', 'भव्य शालेय स्नेहसंमेलन व पालक मेळावा सोहळा', 'video', '/school-videos/school-event-video-5.mp4', '/school-photos/annual-gathering-crowd.jpg', 'annual-gathering', 8),
('Students Joyful Assembly & Marching Rhythm', 'विद्यार्थ्यांची उत्साहपूर्ण प्रार्थना व संचलन', 'video', '/school-videos/school-event-video-6.mp4', '/school-photos/morning-assembly-exercise.jpg', 'annual-gathering', 8),
('Grand Annual Gathering Stage Drama & Dance', 'वार्षिक स्नेहसंमेलन रंगमंचीय नाटक व नृत्य सादरीकरण', 'video', '/school-videos/school-event-video-7.mp4', '/school-photos/annual-gathering-crowd.jpg', 'annual-gathering', 8),
('Festive Celebrations & Students Grand Finale', 'उत्सव सोहळा व विद्यार्थ्यांचे भव्य अंतिम सादरीकरण', 'video', '/school-videos/school-event-video-8.mp4', '/school-photos/annual-gathering-crowd.jpg', 'annual-gathering', 8)
ON DUPLICATE KEY UPDATE `title_en`=VALUES(`title_en`);
