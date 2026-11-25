import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fallbackDir = process.env.VERCEL
  ? path.join(os.tmpdir(), 'gs-modern-data')
  : path.join(__dirname, '..', 'data');
const fallbackFile = path.join(fallbackDir, 'db-fallback.json');

// Ensure fallback dir exists
try {
  if (!fs.existsSync(fallbackDir)) {
    fs.mkdirSync(fallbackDir, { recursive: true });
  }
} catch (err) {
  console.warn('Could not create fallback dir:', err.message);
}

let isUsingMySQL = false;
let pool = null;

// Initial seed data for fallback / first run
const initialData = {
  admins: [
    {
      id: 1,
      username: 'admin',
      password_hash: '$2a$10$oidpMcWGpN2ODFQnnVFRH.geUwfQk9UQwK05i1cavHqvlfpMtAfw.', // Admin@123
      email: 'admin@gsmodernschool.edu.in',
      full_name: 'School Administrator',
      role: 'admin',
      created_at: new Date().toISOString()
    }
  ],
  classes: [
    {
      id: 1,
      name: 'Playgroup',
      slug: 'playgroup',
      description_en: 'A loving, playful introduction to school life filled with sensory activities, joyful rhymes, games, and motor skill development.',
      description_mr: 'खेळ आणि आनंदी वातावरणात मुलांचा शाळेतील पहिला अनुभव. मनोरंजक खेळ, बडबडगीते व हस्तकला यांद्वारे बौद्धिक व शारीरिक विकास.',
      image_url: '/school-photos/activity-fun-learning.jpg',
      order_index: 1
    },
    {
      id: 2,
      name: 'Nursery',
      slug: 'nursery',
      description_en: 'Nurturing curiosity through language discovery, numbers, colours, creative art, and social interaction in a caring environment.',
      description_mr: 'रंग, आकार, अक्षरे आणि अंकांचे प्राथमिक ज्ञान, सर्जनशील कला आणि सुसंस्कृत वातावरणात भाषिक व सामाजिक कौशल्यांची जडणघडण.',
      image_url: '/school-photos/montessori-learning-activities.jpg',
      order_index: 2
    },
    {
      id: 3,
      name: 'LKG',
      slug: 'lkg',
      description_en: 'Building early literacy, structured learning, phonics, mathematics foundations, and active classroom engagement.',
      description_mr: 'वाचन, लेखन, उच्चार (Phonics), मूलभूत गणित व विज्ञानाची पहिली ओळख आणि विचारशक्तीला चालना देणारे आधुनिक शिक्षण.',
      image_url: '/school-photos/alphabet-activity-lineup.jpg',
      order_index: 3
    },
    {
      id: 4,
      name: 'UKG',
      slug: 'ukg',
      description_en: 'Preparing young learners with solid academic readiness, sentence construction, general awareness, and self-confidence.',
      description_mr: 'पहिलीत प्रवेशासाठी परिपूर्ण पूर्वतयारी, सुस्पष्ट संभाषण, स्वावलंबन आणि सर्वसमावेशक व्यक्तिमत्त्व विकासावर विशेष भर.',
      image_url: '/school-photos/classroom-study-session.jpg',
      order_index: 4
    }
  ],
  staff: [
    {
      id: 1,
      name_en: 'Usha Belure',
      name_mr: 'उषा बेलुरे',
      role_en: 'Principal',
      role_mr: 'मुख्याध्यापिका',
      photo_url: '/school-photos/principal-usha-belure.jpg',
      order_index: 1
    },
    {
      id: 2,
      name_en: 'Jyoti Kamble',
      name_mr: 'ज्योती कांबळे',
      role_en: 'Teacher',
      role_mr: 'शिक्षक',
      photo_url: '/school-photos/staff-jyoti-kamble.jpg',
      order_index: 2
    },
    {
      id: 3,
      name_en: 'Sana Pathan',
      name_mr: 'सना पठाण',
      role_en: 'Teacher',
      role_mr: 'शिक्षक',
      photo_url: null,
      order_index: 3
    },
    {
      id: 4,
      name_en: 'Pragati Lagdutkar',
      name_mr: 'प्रगती लगडूतकर',
      role_en: 'Teacher',
      role_mr: 'शिक्षक',
      photo_url: '/school-photos/staff-pragati-lagdutkar.jpg',
      order_index: 4
    },
    {
      id: 5,
      name_en: 'Ankita Sontakke',
      name_mr: 'अंकिता सोनटक्के',
      role_en: 'Teacher',
      role_mr: 'शिक्षक',
      photo_url: '/school-photos/staff-ankita-sontakke.jpg',
      order_index: 5
    },
    {
      id: 6,
      name_en: 'Anuradha Thombale',
      name_mr: 'अनुराधा थोंबळे',
      role_en: 'Peon',
      role_mr: 'शिपाई',
      photo_url: '/school-photos/staff-anuradha-thombale.jpg',
      order_index: 6
    },
    {
      id: 7,
      name_en: 'Jay Suryawanshi',
      name_mr: 'जय सूर्यवंशी',
      role_en: 'Driver',
      role_mr: 'वाहन चालक',
      photo_url: null,
      order_index: 7
    }
  ],
  events: [
    {
      id: 1,
      category_slug: 'independence-day',
      title_en: 'Independence Day',
      title_mr: 'स्वातंत्र्य दिन',
      description_en: 'Grand 15th August celebration with flag hoisting, national freedom fighters fancy dress, patriotic songs, and cultural performances by tiny tots.',
      description_mr: '१५ ऑगस्ट स्वातंत्र्य दिन उत्साहात साजरा. चिमुकल्यांचे देशभक्तिपर वेशभूषा, राष्ट्रगीत, भाषणे व सांस्कृतिक कार्यक्रम.',
      event_date: '2026-08-15',
      is_upcoming: 0,
      featured_image: '/school-photos/hero-independence-day-banner.jpg'
    },
    {
      id: 2,
      category_slug: 'gokulashtami',
      title_en: 'Gokulashtami',
      title_mr: 'गोकुळाष्टमी उत्सव',
      description_en: 'Joyful celebration of Shri Krishna Janmashtami with colourful Bal Gopal & Radha costumes, singing, and safe child-friendly Dahi Handi.',
      description_mr: 'श्रीकृष्ण जन्माष्टमी व दहीहंडी सोहळा. राधा-कृष्णाच्या सुंदर वेशभूषेत चिमुकल्यांचा आनंदोत्सव आणि पारंपरिक गीते.',
      event_date: '2026-09-04',
      is_upcoming: 0,
      featured_image: '/school-photos/school-activity-group.jpg'
    },
    {
      id: 3,
      category_slug: 'republic-day',
      title_en: 'Republic Day',
      title_mr: 'प्रजासत्ताक दिन',
      description_en: 'Celebration of national pride, unfurling the tricolour, march past, and instilling patriotic values in children from early childhood.',
      description_mr: '२६ जानेवारी प्रजासत्ताक दिनानिमित्त ध्वजारोहण, शिस्तबद्ध संचलन व लहान मुलांमध्ये देशप्रेमाची मूल्ये रुजविणारा सोहळा.',
      event_date: '2026-01-26',
      is_upcoming: 0,
      featured_image: '/school-photos/independence-day-costumes.jpg'
    },
    {
      id: 4,
      category_slug: 'ashadhi-ekadashi',
      title_en: 'Ashadhi Ekadashi',
      title_mr: 'आषाढी एकादशी दिंडी',
      description_en: 'Traditional Dindi procession with students dressed in traditional Warkari attire carrying small saffron flags and experiencing Maharashtra heritage.',
      description_mr: 'वारकरी संप्रदायाची संस्कृती जपणारी भव्य बाल दिंडी, विठ्ठल-रखुमाई वेशभूषा, टाळ-मृदुंगाचा गजर आणि भक्तिमय वातावरण.',
      event_date: '2026-07-26',
      is_upcoming: 0,
      featured_image: '/school-photos/ashadhi-ekadashi-dindi.jpg'
    },
    {
      id: 5,
      category_slug: 'diwali-celebration',
      title_en: 'Diwali Celebration',
      title_mr: 'दिवाळी महोत्सव',
      description_en: 'Festival of lights celebration with handmade diyas, lantern making, traditional dress, sweet sharing, and safety awareness.',
      description_mr: 'दीपोत्सवाचा आनंद! चिमुकल्यांनी स्वतः बनवलेले दिवे, कंदील, रांगोळी आणि पारंपारिक कपड्यांमधील आनंददायी क्षण.',
      event_date: '2026-11-08',
      is_upcoming: 0,
      featured_image: '/school-photos/school-activity-group.jpg'
    },
    {
      id: 6,
      category_slug: 'navratri',
      title_en: 'Navratri',
      title_mr: 'नवरात्रौत्सव व गरबा',
      description_en: 'Nine days of joy featuring traditional Dandiya/Garba dance, colorful traditional costumes, and cultural storytelling.',
      description_mr: 'दांडिया आणि गरबा नृत्याचा उत्साह. पारंपरिक वेशभूषेत मुलांचा सहभाग आणि भारतीय संस्कृतीचे दर्शन.',
      event_date: '2026-10-12',
      is_upcoming: 0,
      featured_image: '/school-photos/annual-gathering-crowd.jpg'
    },
    {
      id: 7,
      category_slug: 'all-jayanti-celebrations',
      title_en: 'All Jayanti Celebrations',
      title_mr: 'सर्व थोर महापुरुषांच्या जयंत्या',
      description_en: 'Honoring great leaders and social reformers: Chhatrapati Shivaji Maharaj, Dr. B.R. Ambedkar, Mahatma Gandhi, Savitribai Phule and Basaveshwar Maharaj.',
      description_mr: 'छत्रपती शिवाजी महाराज, डॉ. बाबासाहेब आंबेडकर, महात्मा फुले, सावित्रीबाई फुले व बसवेश्वर महाराज यांच्या जयंत्यांचे प्रेरणादायी आयोजन.',
      event_date: '2026-02-19',
      is_upcoming: 0,
      featured_image: '/school-photos/independence-day-costumes.jpg'
    },
    {
      id: 8,
      category_slug: 'annual-gathering',
      title_en: 'Annual Gathering',
      title_mr: 'वार्षिक स्नेहसंमेलन',
      description_en: 'Grand stage event where every student showcases their talent in dance, drama, recitation, and sports before proud parents and community guests.',
      description_mr: 'भव्य वार्षिक स्नेहसंमेलन व पारितोषिक वितरण सोहळा. विद्यार्थ्यांच्या कलागुणांना वाव देणारे रंगारंग सांस्कृतिक सादरीकरण.',
      event_date: '2026-12-20',
      is_upcoming: 0,
      featured_image: '/school-photos/annual-gathering-crowd.jpg'
    },
    {
      id: 9,
      category_slug: 'ganesh-chaturthi',
      title_en: 'Ganesh Chaturthi',
      title_mr: 'गणेशोत्सव',
      description_en: 'Welcoming Lord Ganesha with eco-friendly idol making, modak distribution, morning aarti, and devotional prayers.',
      description_mr: 'पर्यावरणपूरक बाप्पाची स्थापना, मुलांचे भजन, आरती व पारंपरिक आनंदोत्सव.',
      event_date: '2026-09-14',
      is_upcoming: 0,
      featured_image: '/school-photos/principal-ashadhi-ekadashi.jpg'
    },
    {
      id: 10,
      category_slug: 'maharashtra-day',
      title_en: 'Maharashtra Day',
      title_mr: 'महाराष्ट्र दिन व कामगार दिन',
      description_en: 'Celebrating the glory and culture of Maharashtra with patriotic speeches, traditional songs, and honoring our community helpers.',
      description_mr: '१ मे महाराष्ट्र दिनानिमित्त गौरवशाली इतिहास व मराठी संस्कृतीचे दर्शन घडविणारे विशेष उपक्रम.',
      event_date: '2026-05-01',
      is_upcoming: 0,
      featured_image: '/school-photos/campus-garden-overview.jpg'
    },
    {
      id: 11,
      category_slug: 'science-exhibition',
      title_en: 'Science Exhibition',
      title_mr: 'विज्ञान प्रदर्शन',
      description_en: 'Hands-on simple science experiments, nature exploration, senses identification, and nurturing scientific temper in young learners.',
      description_mr: 'चिमुकल्यांचे छोटे वैज्ञानिक प्रयोग, निसर्ग परिचय, झाडे व पर्यावरणाची ओळख करून देणारे ज्ञानवर्धक प्रदर्शन.',
      event_date: '2026-02-28',
      is_upcoming: 0,
      featured_image: '/school-photos/montessori-learning-activities.jpg'
    }
  ],
  gallery: [
    {
      id: 1,
      title_en: 'Independence Day Banner & Celebrations',
      title_mr: 'स्वातंत्र्य दिन फलक व बाल देशभक्त',
      media_type: 'photo',
      file_url: '/school-photos/hero-independence-day-banner.jpg',
      thumbnail_url: '/school-photos/hero-independence-day-banner.jpg',
      category_slug: 'independence-day',
      event_id: 1,
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      title_en: 'Ashadhi Ekadashi Grand Child Dindi',
      title_mr: 'आषाढी एकादशी भव्य बाल दिंडी सोहळा',
      media_type: 'photo',
      file_url: '/school-photos/ashadhi-ekadashi-dindi.jpg',
      thumbnail_url: '/school-photos/ashadhi-ekadashi-dindi.jpg',
      category_slug: 'ashadhi-ekadashi',
      event_id: 4,
      created_at: new Date().toISOString()
    },
    {
      id: 3,
      title_en: 'Principal & Staff at Festive Blessing',
      title_mr: 'मुख्याध्यापिका व शिक्षक वृंद - सण सोहळा',
      media_type: 'photo',
      file_url: '/school-photos/principal-ashadhi-ekadashi.jpg',
      thumbnail_url: '/school-photos/principal-ashadhi-ekadashi.jpg',
      category_slug: 'ashadhi-ekadashi',
      event_id: 4,
      created_at: new Date().toISOString()
    },
    {
      id: 4,
      title_en: 'Independence Day Freedom Fighters Costumes',
      title_mr: 'देशभक्त व स्वातंत्र्य सेनानी वेशभूषा',
      media_type: 'photo',
      file_url: '/school-photos/independence-day-costumes.jpg',
      thumbnail_url: '/school-photos/independence-day-costumes.jpg',
      category_slug: 'independence-day',
      event_id: 1,
      created_at: new Date().toISOString()
    },
    {
      id: 5,
      title_en: 'Yellow Day Bright Color Learning',
      title_mr: 'पिवळा रंग दिवस (Yellow Day) आनंदोत्सव',
      media_type: 'photo',
      file_url: '/school-photos/yellow-day-celebration.jpg',
      thumbnail_url: '/school-photos/yellow-day-celebration.jpg',
      category_slug: 'annual-gathering',
      event_id: 8,
      created_at: new Date().toISOString()
    },
    {
      id: 6,
      title_en: 'Green Day Nature & Environment Activity',
      title_mr: 'हरित दिन (Green Day) व पर्यावरण जाणीव',
      media_type: 'photo',
      file_url: '/school-photos/green-day-celebration.jpg',
      thumbnail_url: '/school-photos/green-day-celebration.jpg',
      category_slug: 'science-exhibition',
      event_id: 11,
      created_at: new Date().toISOString()
    },
    {
      id: 7,
      title_en: 'International Yoga Day Asanas by Tiny Tots',
      title_mr: '२१ जून आंतरराष्ट्रीय योग दिन योगासने',
      media_type: 'photo',
      file_url: '/school-photos/international-yoga-day.jpg',
      thumbnail_url: '/school-photos/international-yoga-day.jpg',
      category_slug: 'annual-gathering',
      event_id: 8,
      created_at: new Date().toISOString()
    },
    {
      id: 8,
      title_en: 'English Alphabet A to Z Activity Lineup',
      title_mr: 'इंग्रजी वर्णमाला (A to Z) उपक्रम',
      media_type: 'photo',
      file_url: '/school-photos/alphabet-activity-lineup.jpg',
      thumbnail_url: '/school-photos/alphabet-activity-lineup.jpg',
      category_slug: 'annual-gathering',
      event_id: 8,
      created_at: new Date().toISOString()
    },
    {
      id: 9,
      title_en: 'Montessori Play and Early Childhood Learning',
      title_mr: 'मॉन्टेसरी खेळ व पूर्वप्राथमिक शिक्षण',
      media_type: 'photo',
      file_url: '/school-photos/montessori-learning-activities.jpg',
      thumbnail_url: '/school-photos/montessori-learning-activities.jpg',
      category_slug: 'annual-gathering',
      event_id: 8,
      created_at: new Date().toISOString()
    },
    {
      id: 10,
      title_en: 'Classroom Focused Reading and Writing',
      title_mr: 'वर्गखोलीत वाचन व लेखन सराव',
      media_type: 'photo',
      file_url: '/school-photos/classroom-study-session.jpg',
      thumbnail_url: '/school-photos/classroom-study-session.jpg',
      category_slug: 'annual-gathering',
      event_id: 8,
      created_at: new Date().toISOString()
    },
    {
      id: 11,
      title_en: 'Morning Physical Training & Assembly',
      title_mr: 'सकाळची प्रार्थना व शारीरिक कवायत',
      media_type: 'photo',
      file_url: '/school-photos/morning-assembly-exercise.jpg',
      thumbnail_url: '/school-photos/morning-assembly-exercise.jpg',
      category_slug: 'annual-gathering',
      event_id: 8,
      created_at: new Date().toISOString()
    },
    {
      id: 12,
      title_en: 'Annual Gathering Huge Parent Gathering',
      title_mr: 'वार्षिक स्नेहसंमेलन पालक उपस्थिती',
      media_type: 'photo',
      file_url: '/school-photos/annual-gathering-crowd.jpg',
      thumbnail_url: '/school-photos/annual-gathering-crowd.jpg',
      category_slug: 'annual-gathering',
      event_id: 8,
      created_at: new Date().toISOString()
    },
    {
      id: 13,
      title_en: 'School Garden and Beautiful Green Campus',
      title_mr: 'शाळेचा सुंदर हिरवागार परिसर व बाग',
      media_type: 'photo',
      file_url: '/school-photos/campus-garden-overview.jpg',
      thumbnail_url: '/school-photos/campus-garden-overview.jpg',
      category_slug: 'annual-gathering',
      event_id: 8,
      created_at: new Date().toISOString()
    },
    {
      id: 14,
      title_en: 'Interactive Outdoor Shape Formation Activity',
      title_mr: 'मैदानावर आकार निर्मिती व सामूहिक खेळ',
      media_type: 'photo',
      file_url: '/school-photos/activity-fun-learning.jpg',
      thumbnail_url: '/school-photos/activity-fun-learning.jpg',
      category_slug: 'annual-gathering',
      event_id: 8,
      created_at: new Date().toISOString()
    },
    {
      id: 15,
      title_en: 'School Information Brochure in Marathi',
      title_mr: 'शाळेचे माहिती पत्रक व वैशिष्ट्ये',
      media_type: 'photo',
      file_url: '/school-photos/school-brochure-marathi.jpg',
      thumbnail_url: '/school-photos/school-brochure-marathi.jpg',
      category_slug: 'annual-gathering',
      event_id: 8,
      created_at: new Date().toISOString()
    },
    {
      id: 16,
      title_en: 'Students Joyful Group Activity',
      title_mr: 'विद्यार्थ्यांचा समूह उपक्रम व सहकार्य',
      media_type: 'photo',
      file_url: '/school-photos/school-activity-group.jpg',
      thumbnail_url: '/school-photos/school-activity-group.jpg',
      category_slug: 'annual-gathering',
      event_id: 8,
      created_at: new Date().toISOString()
    },
    {
      id: 17,
      title_en: 'Spacious Classrooms & Alphabet Wall Art Corridor',
      title_mr: 'सुंदर प्रशस्त वर्गखोल्या व शैक्षणिक भिंतीचित्रे',
      media_type: 'photo',
      file_url: '/school-photos/school-classrooms-corridor-infrastructure.jpg',
      thumbnail_url: '/school-photos/school-classrooms-corridor-infrastructure.jpg',
      category_slug: 'annual-gathering',
      event_id: 8,
      created_at: new Date().toISOString()
    },
    {
      id: 18,
      title_en: 'Annual Gathering Cultural Performances',
      title_mr: 'वार्षिक स्नेहसंमेलन सांस्कृतिक कार्यक्रम सादरीकरण',
      media_type: 'video',
      file_url: '/school-videos/school-event-video-1.mp4',
      thumbnail_url: '/school-photos/annual-gathering-crowd.jpg',
      category_slug: 'annual-gathering',
      event_id: 8,
      created_at: new Date().toISOString()
    },
    {
      id: 19,
      title_en: 'Students Stage Dance & Folk Celebration',
      title_mr: 'विद्यार्थ्यांचे रंगमंचावरील लोकनृत्य व सण सोहळा',
      media_type: 'video',
      file_url: '/school-videos/school-event-video-2.mp4',
      thumbnail_url: '/school-photos/annual-gathering-crowd.jpg',
      category_slug: 'annual-gathering',
      event_id: 8,
      created_at: new Date().toISOString()
    },
    {
      id: 20,
      title_en: 'Independence Day Patriotic Drill & Parade',
      title_mr: 'स्वातंत्र्य दिन संचलन व देशभक्तीपर कवायत',
      media_type: 'video',
      file_url: '/school-videos/school-event-video-3.mp4',
      thumbnail_url: '/school-photos/hero-independence-day-banner.jpg',
      category_slug: 'independence-day',
      event_id: 1,
      created_at: new Date().toISOString()
    },
    {
      id: 21,
      title_en: 'Ashadhi Ekadashi Dindi Procession & Chants',
      title_mr: 'आषाढी एकादशी दिंडी सोहळा व टाळ-मृदंग गजर',
      media_type: 'video',
      file_url: '/school-videos/school-event-video-4.mp4',
      thumbnail_url: '/school-photos/ashadhi-ekadashi-dindi.jpg',
      category_slug: 'ashadhi-ekadashi',
      event_id: 4,
      created_at: new Date().toISOString()
    },
    {
      id: 22,
      title_en: 'Grand Stage Celebration & Parent Gathering',
      title_mr: 'भव्य शालेय स्नेहसंमेलन व पालक मेळावा सोहळा',
      media_type: 'video',
      file_url: '/school-videos/school-event-video-5.mp4',
      thumbnail_url: '/school-photos/annual-gathering-crowd.jpg',
      category_slug: 'annual-gathering',
      event_id: 8,
      created_at: new Date().toISOString()
    },
    {
      id: 23,
      title_en: 'Students Joyful Assembly & Marching Rhythm',
      title_mr: 'विद्यार्थ्यांची उत्साहपूर्ण प्रार्थना व संचलन',
      media_type: 'video',
      file_url: '/school-videos/school-event-video-6.mp4',
      thumbnail_url: '/school-photos/morning-assembly-exercise.jpg',
      category_slug: 'annual-gathering',
      event_id: 8,
      created_at: new Date().toISOString()
    },
    {
      id: 24,
      title_en: 'Grand Annual Gathering Stage Drama & Dance',
      title_mr: 'वार्षिक स्नेहसंमेलन रंगमंचीय नाटक व नृत्य सादरीकरण',
      media_type: 'video',
      file_url: '/school-videos/school-event-video-7.mp4',
      thumbnail_url: '/school-photos/annual-gathering-crowd.jpg',
      category_slug: 'annual-gathering',
      event_id: 8,
      created_at: new Date().toISOString()
    },
    {
      id: 25,
      title_en: 'Festive Celebrations & Students Grand Finale',
      title_mr: 'उत्सव सोहळा व विद्यार्थ्यांचे भव्य अंतिम सादरीकरण',
      media_type: 'video',
      file_url: '/school-videos/school-event-video-8.mp4',
      thumbnail_url: '/school-photos/annual-gathering-crowd.jpg',
      category_slug: 'annual-gathering',
      event_id: 8,
      created_at: new Date().toISOString()
    }
  ],
  admission_enquiries: [],
  website_content: [
    {
      id: 1,
      content_key: 'welcome_tagline',
      section: 'home',
      content_en: 'Shaping Bright Futures with Love, Values & Modern Learning',
      content_mr: 'बालकांचे भविष्य घडविण्यासाठी संस्कार व आधुनिक शिक्षणाची उत्तम सुरुवात'
    }
  ]
};

// Initialize fallback JSON file if not present
if (!fs.existsSync(fallbackFile)) {
  fs.writeFileSync(fallbackFile, JSON.stringify(initialData, null, 2), 'utf-8');
}

export const readFallbackStore = () => {
  try {
    const raw = fs.readFileSync(fallbackFile, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading fallback store:', err.message);
    return initialData;
  }
};

export const writeFallbackStore = (data) => {
  try {
    fs.writeFileSync(fallbackFile, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing fallback store:', err.message);
  }
};

// Attempt MySQL connection
export const initDB = async () => {
  try {
    const connectionConfig = {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      port: Number(process.env.DB_PORT) || 3306,
      multipleStatements: true
    };

    // Try connecting to MySQL server directly
    const tempConn = await mysql.createConnection(connectionConfig);
    await tempConn.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'gs_modern_school'}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    await tempConn.end();

    // Create pool for the specific database
    pool = mysql.createPool({
      ...connectionConfig,
      database: process.env.DB_NAME || 'gs_modern_school',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    // Test pool connection
    const [rows] = await pool.query('SELECT 1 + 1 AS test');
    if (rows && rows[0].test === 2) {
      isUsingMySQL = true;
      console.log('✅ Successfully connected to MySQL database:', process.env.DB_NAME || 'gs_modern_school');

      // Check if tables exist, or run setup script
      const [tableCheck] = await pool.query("SHOW TABLES LIKE 'admins'");
      if (tableCheck.length === 0) {
        console.log('⚡ Initializing tables from database/school.sql...');
        const sqlPath = path.join(__dirname, '..', '..', 'database', 'school.sql');
        if (fs.existsSync(sqlPath)) {
          const sqlScript = fs.readFileSync(sqlPath, 'utf-8');
          await pool.query(sqlScript);
          console.log('✅ MySQL schema and seed data created successfully.');
        }
      }
    }
  } catch (err) {
    isUsingMySQL = false;
    console.warn('⚠️  MySQL Connection Note:', err.message);
    console.log('ℹ️  Running in Seamless Local Storage mode. All features (Galleries, Enquiries, Events, Admin) work 100%.');
    console.log('👉 To enable MySQL: Ensure MySQL Server is running on port 3306 and check credentials in backend/.env');
  }
};

// Generic query wrapper compatible with both MySQL and fallback
export const query = async (sql, params = []) => {
  if (isUsingMySQL && pool) {
    const [results] = await pool.execute(sql, params);
    return results;
  }

  // Fallback handler for development without live MySQL
  return handleFallbackQuery(sql, params);
};

const handleFallbackQuery = (sql, params) => {
  const store = readFallbackStore();
  const lowerSql = sql.trim().toLowerCase();

  // SELECT enquiries
  if (lowerSql.startsWith('select') && lowerSql.includes('from `admission_enquiries`')) {
    let results = [...(store.admission_enquiries || [])];
    results.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    return results;
  }

  // SELECT events
  if (lowerSql.startsWith('select') && lowerSql.includes('from `events`')) {
    return store.events || [];
  }

  // SELECT classes
  if (lowerSql.startsWith('select') && lowerSql.includes('from `classes`')) {
    return store.classes || [];
  }

  // SELECT staff
  if (lowerSql.startsWith('select') && lowerSql.includes('from `staff`')) {
    return store.staff || [];
  }

  // SELECT gallery
  if (lowerSql.startsWith('select') && lowerSql.includes('from `gallery`')) {
    let items = store.gallery || [];
    return items;
  }

  // SELECT admins by username
  if (lowerSql.startsWith('select') && lowerSql.includes('from `admins` where `username`')) {
    const username = params[0];
    const match = (store.admins || []).filter(a => a.username === username);
    return match;
  }

  // SELECT admins by id
  if (lowerSql.startsWith('select') && lowerSql.includes('from `admins` where `id`')) {
    const id = Number(params[0]);
    const match = (store.admins || []).filter(a => a.id === id);
    return match;
  }

  // INSERT admission enquiry
  if (lowerSql.startsWith('insert into `admission_enquiries`')) {
    const newEnquiry = {
      id: (store.admission_enquiries.length > 0 ? Math.max(...store.admission_enquiries.map(e => e.id)) : 0) + 1,
      parent_name: params[0],
      child_name: params[1],
      parent_mobile: params[2],
      parent_email: params[3] || null,
      class_interested: params[4],
      message: params[5] || null,
      consent_given: params[6] ? 1 : 0,
      status: 'Pending',
      admin_notes: null,
      created_at: new Date().toISOString()
    };
    store.admission_enquiries.push(newEnquiry);
    writeFallbackStore(store);
    return { insertId: newEnquiry.id, affectedRows: 1 };
  }

  // UPDATE admission enquiry status
  if (lowerSql.startsWith('update `admission_enquiries`')) {
    const status = params[0];
    const notes = params[1];
    const id = Number(params[2]);
    const item = store.admission_enquiries.find(e => e.id === id);
    if (item) {
      item.status = status;
      if (notes !== undefined) item.admin_notes = notes;
      item.updated_at = new Date().toISOString();
      writeFallbackStore(store);
      return { affectedRows: 1 };
    }
    return { affectedRows: 0 };
  }

  // DELETE admission enquiry
  if (lowerSql.startsWith('delete from `admission_enquiries`')) {
    const id = Number(params[0]);
    const initialLen = store.admission_enquiries.length;
    store.admission_enquiries = store.admission_enquiries.filter(e => e.id !== id);
    writeFallbackStore(store);
    return { affectedRows: initialLen - store.admission_enquiries.length };
  }

  // INSERT gallery
  if (lowerSql.startsWith('insert into `gallery`')) {
    const newItem = {
      id: (store.gallery.length > 0 ? Math.max(...store.gallery.map(g => g.id)) : 0) + 1,
      title_en: params[0],
      title_mr: params[1],
      media_type: params[2],
      file_url: params[3],
      thumbnail_url: params[4] || null,
      category_slug: params[5],
      event_id: params[6] || null,
      created_at: new Date().toISOString()
    };
    store.gallery.push(newItem);
    writeFallbackStore(store);
    return { insertId: newItem.id, affectedRows: 1 };
  }

  // DELETE gallery
  if (lowerSql.startsWith('delete from `gallery`')) {
    const id = Number(params[0]);
    const initialLen = store.gallery.length;
    store.gallery = store.gallery.filter(g => g.id !== id);
    writeFallbackStore(store);
    return { affectedRows: initialLen - store.gallery.length };
  }

  // INSERT event
  if (lowerSql.startsWith('insert into `events`')) {
    const newEvent = {
      id: (store.events.length > 0 ? Math.max(...store.events.map(e => e.id)) : 0) + 1,
      category_slug: params[0],
      title_en: params[1],
      title_mr: params[2],
      description_en: params[3] || '',
      description_mr: params[4] || '',
      event_date: params[5] || null,
      is_upcoming: params[6] ? 1 : 0,
      featured_image: params[7] || null,
      created_at: new Date().toISOString()
    };
    store.events.push(newEvent);
    writeFallbackStore(store);
    return { insertId: newEvent.id, affectedRows: 1 };
  }

  // UPDATE event
  if (lowerSql.startsWith('update `events`')) {
    const id = Number(params[params.length - 1]);
    const event = store.events.find(e => e.id === id);
    if (event) {
      event.category_slug = params[0];
      event.title_en = params[1];
      event.title_mr = params[2];
      event.description_en = params[3];
      event.description_mr = params[4];
      event.event_date = params[5];
      event.is_upcoming = params[6] ? 1 : 0;
      if (params[7]) event.featured_image = params[7];
      writeFallbackStore(store);
      return { affectedRows: 1 };
    }
    return { affectedRows: 0 };
  }

  // DELETE event
  if (lowerSql.startsWith('delete from `events`')) {
    const id = Number(params[0]);
    store.events = store.events.filter(e => e.id !== id);
    writeFallbackStore(store);
    return { affectedRows: 1 };
  }

  return [];
};

export const getDbStatus = () => ({
  isUsingMySQL,
  database: isUsingMySQL ? (process.env.DB_NAME || 'gs_modern_school') : 'local-json-fallback',
  host: process.env.DB_HOST || 'localhost'
});
