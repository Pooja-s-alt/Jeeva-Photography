/**
 * JEEVA PHOTOGRAPHY - CLIENT-SIDE DATA STORE & SYNC LAYER (IndexedDB + localStorage)
 * Provides seamless storage for large media files (photos, videos from PC) and site data.
 */

const JeevaDB = (() => {
  const DB_NAME = 'JeevaPhotographyDB';
  const DB_VERSION = 1;
  const STORE_MEDIA = 'media_files'; // for large photo/video data from PC

  // Open / Init IndexedDB
  function openDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(STORE_MEDIA)) {
          db.createObjectStore(STORE_MEDIA, { keyPath: 'id' });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Media storage helpers (IndexedDB)
  async function saveMedia(id, dataUrl) {
    try {
      const db = await openDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_MEDIA, 'readwrite');
        const store = tx.objectStore(STORE_MEDIA);
        store.put({ id, data: dataUrl, timestamp: Date.now() });
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => reject(tx.error);
      });
    } catch (e) {
      console.warn('IndexedDB save failed, falling back:', e);
      return false;
    }
  }

  async function getMedia(id) {
    try {
      const db = await openDB();
      return new Promise((resolve) => {
        const tx = db.transaction(STORE_MEDIA, 'readonly');
        const store = tx.objectStore(STORE_MEDIA);
        const req = store.get(id);
        req.onsuccess = () => resolve(req.result ? req.result.data : null);
        req.onerror = () => resolve(null);
      });
    } catch (e) {
      return null;
    }
  }

  async function deleteMedia(id) {
    try {
      const db = await openDB();
      return new Promise((resolve) => {
        const tx = db.transaction(STORE_MEDIA, 'readwrite');
        const store = tx.objectStore(STORE_MEDIA);
        store.delete(id);
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => resolve(false);
      });
    } catch (e) {
      return false;
    }
  }

  // HOME / HERO DEFAULT DATA
  const DEFAULT_HOME = {
    studioNameScript: 'Jeeva',
    studioNameSerif: 'Photography',
    heroTitleLine1: 'Preserving Timeless Emotions.',
    heroTitleHighlight: 'Crafting Visual Legacies.',
    heroSubtitle: 'A masterclass fine-art studio dedicated to documenting unscripted emotion, royal wedding ceremonies & unforgettable life chapters with bespoke elegance.',
    heroSlide1: 'images/hero-slide-1.jpg',
    heroSlide2: 'images/hero-slide-2.jpg',
    heroSlide3: 'images/hero-slide-3.jpg',
    trust1Num: '16+',
    trust1Lbl: 'Years Mastery',
    trust2Num: '571+',
    trust2Lbl: 'Celebrations',
    trust3Num: '4K',
    trust3Lbl: 'Cinema Grade',
    trust4Num: '100%',
    trust4Lbl: 'Artisanal Finish',
    btn1Text: 'Explore Portfolio',
    btn2Text: 'Watch Highlights',
    btn3Text: 'Book a Session'
  };

  // ABOUT / FOUNDER DEFAULT DATA
  const DEFAULT_ABOUT = {
    sectionTag: 'About The Founder',
    headingAccent: 'Meet',
    headingName: 'Jeeva',
    expHeading: '16+ Years of Capturing Beautiful Stories',
    leadText1: 'With over 16 years of dedicated mastery in the photography field, Jeeva has been turning meaningful celebrations and authentic human connections into timeless visual heirlooms.',
    leadText2: 'From intimate ceremonies to grand destination weddings, every frame is crafted with a meticulous eye for natural light, heartfelt emotion, editorial composition, and soulful storytelling.',
    quoteText: '“Trusted by clients to capture their most meaningful moments.”',
    founderName: 'Jeeva',
    founderRole: 'Founder & Lead Artist',
    founderImage: 'images/founder.jpg',
    floatingBadgeNum: '571+',
    floatingBadgeLabel: 'Happy Clients',
    features: [
      'Cinematic Color Palette',
      'Candid Emotional Essence',
      'Heritage & Royal Venues',
      'Master Retouching & Framing'
    ]
  };

  // PACKAGES DEFAULT DATA
  const DEFAULT_PACKAGES = [
    {
      id: 'pkg-1',
      title: 'Premium Package',
      scriptTitle: 'Premium',
      price: '1,60,000',
      currency: 'Rs',
      badge: 'PROMESSE',
      isPopular: false,
      mainImage: 'images/hero-slide-2.jpg',
      thumbImage: 'images/hero-slide-1.jpg',
      features: [
        'Full-Day Coverage (8–12 Hours)',
        'Pre-Wedding Ceremony',
        'Wedding Ceremony',
        'Reception Coverage',
        'Family and Group Portraits',
        'Couple Portraits',
        'Candid Photography throughout the event'
      ]
    },
    {
      id: 'pkg-2',
      title: 'Standard Package',
      scriptTitle: 'Standard',
      price: '1,00,000',
      currency: 'Rs',
      badge: 'EVERYTHING',
      isPopular: true,
      popularBadge: 'Most Popular',
      mainImage: 'images/hero-slide-3.jpg',
      thumbImage: 'images/hero-slide-1.jpg',
      features: [
        '1 Lead Professional Photographer',
        '1 Assistant Photographer (Optional)',
        'Online Gallery for easy sharing',
        'USB Drive with all edited images',
        'Premium Photo Album (Optional)',
        'Same-Day Teaser Photos (10–20 Images)',
        'Couple Portraits, Candid Photography throughout the event'
      ]
    },
    {
      id: 'pkg-3',
      title: 'Basic Package',
      scriptTitle: 'Basic',
      price: '80,000',
      currency: 'Rs',
      badge: 'TIMELESS UNION',
      isPopular: false,
      mainImage: 'images/pkg-basic-main.jpg',
      thumbImage: 'images/hero-slide-2.jpg',
      features: [
        '1 Lead Professional Photographer',
        '1 Assistant Photographer (Optional)',
        'Album (Optional)',
        'Same-Day Teaser Photos (10–20 Images)',
        'Couple Portraits, Candid Photography throughout the event'
      ]
    }
  ];

  // TESTIMONIALS DEFAULT DATA
  const DEFAULT_TESTIMONIALS = [
    {
      id: 1,
      name: 'Priya & Karthik',
      location: 'Grand Wedding, Ramanathapuram',
      text: '“Jeeva Photography captured every important moment beautifully. The photographs felt natural, emotional, and incredibly professional. We will always treasure these memories.”',
      stars: 5,
      avatar: ''
    },
    {
      id: 2,
      name: 'Arjun & Sneha',
      location: 'Grand Celebration, Paramakudi',
      text: '“The team has an extraordinary eye for candid shots. During our reception, they were completely unobtrusive yet captured the most priceless laughter and tears. Truly 16+ years of mastery!”',
      stars: 5,
      avatar: ''
    },
    {
      id: 3,
      name: 'Divya & Rohit',
      location: 'Pre-Wedding & Engagement',
      text: '“Our pre-wedding photoshoot in the hills looked like scenes straight out of a high-fashion magazine. Jeeva made us feel so comfortable and confident in front of the lens.”',
      stars: 5,
      avatar: ''
    }
  ];

  // SETTINGS DEFAULT DATA
  const DEFAULT_SETTINGS = {
    name: 'Jeeva Photography',
    tagline: 'Preserving Emotions & Visual Legacies for Over 16 Years',
    phone: '+91 95147 51045',
    whatsapp: '+91 95147 51045',
    email: 'jeevaphotography1820@gmail.com',
    instagram: '@__jeeva_photography__',
    instagramUrl: 'https://www.instagram.com/__jeeva_photography__',
    address: 'SB Tower Building, 1st Floor (Opp. Register Office), Vandikara Street, Ramanathapuram - 623504',
    hours: 'Mon - Sun, 9:00 AM - 8:30 PM',
    yearsExp: '16+',
    happyClients: '571+',
    momentsCaptured: '1000+',
    passionScore: '100%'
  };

  // LocalStorage Helpers
  function getLS(key, defaultVal) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultVal;
    } catch (e) {
      return defaultVal;
    }
  }

  function setLS(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.warn('localStorage set failed for key:', key, e);
    }
  }

  // HOME / HERO
  function getHome() {
    return getLS('jp_home', DEFAULT_HOME);
  }

  function saveHome(data) {
    const current = getHome();
    const merged = { ...current, ...data };
    setLS('jp_home', merged);
    window.dispatchEvent(new CustomEvent('jeeva:homeUpdated', { detail: merged }));
    return merged;
  }

  // ABOUT / FOUNDER
  function getAbout() {
    return getLS('jp_about', DEFAULT_ABOUT);
  }

  function saveAbout(data) {
    const current = getAbout();
    const merged = { ...current, ...data };
    setLS('jp_about', merged);
    window.dispatchEvent(new CustomEvent('jeeva:aboutUpdated', { detail: merged }));
    return merged;
  }

  // PORTFOLIO CRUD
  function getPortfolio() {
    const custom = getLS('jp_portfolio', null);
    if (custom && Array.isArray(custom)) return custom;
    if (typeof PORTFOLIO_DATA !== 'undefined') {
      return JSON.parse(JSON.stringify(PORTFOLIO_DATA));
    }
    return [];
  }

  function savePortfolio(list) {
    setLS('jp_portfolio', list);
    window.dispatchEvent(new CustomEvent('jeeva:portfolioUpdated', { detail: list }));
  }

  function addPortfolioItem(item) {
    const list = getPortfolio();
    if (!item.id) item.id = 'p_' + Date.now();
    list.unshift(item);
    savePortfolio(list);
    return item;
  }

  function updatePortfolioItem(id, updatedFields) {
    const list = getPortfolio();
    const idx = list.findIndex(x => String(x.id) === String(id));
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updatedFields };
      savePortfolio(list);
      return list[idx];
    }
    return null;
  }

  function deletePortfolioItem(id) {
    let list = getPortfolio();
    list = list.filter(x => String(x.id) !== String(id));
    savePortfolio(list);
    return true;
  }

  // VIDEOS CRUD
  function getVideos() {
    const custom = getLS('jp_videos', null);
    if (custom && Array.isArray(custom)) return custom;
    if (typeof VIDEO_HIGHLIGHTS_DATA !== 'undefined') {
      return JSON.parse(JSON.stringify(VIDEO_HIGHLIGHTS_DATA));
    }
    return [];
  }

  function saveVideos(list) {
    setLS('jp_videos', list);
    window.dispatchEvent(new CustomEvent('jeeva:videosUpdated', { detail: list }));
  }

  function addVideoItem(item) {
    const list = getVideos();
    if (!item.id) item.id = 'v_' + Date.now();
    list.unshift(item);
    saveVideos(list);
    return item;
  }

  function updateVideoItem(id, updatedFields) {
    const list = getVideos();
    const idx = list.findIndex(x => String(x.id) === String(id));
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updatedFields };
      saveVideos(list);
      return list[idx];
    }
    return null;
  }

  function deleteVideoItem(id) {
    let list = getVideos();
    list = list.filter(x => String(x.id) !== String(id));
    saveVideos(list);
    return true;
  }

  // TESTIMONIALS CRUD
  function getTestimonials() {
    return getLS('jp_test', DEFAULT_TESTIMONIALS);
  }

  function saveTestimonials(list) {
    setLS('jp_test', list);
    window.dispatchEvent(new CustomEvent('jeeva:testimonialsUpdated', { detail: list }));
  }

  function addTestimonial(item) {
    const list = getTestimonials();
    if (!item.id) item.id = 't_' + Date.now();
    list.unshift(item);
    saveTestimonials(list);
    return item;
  }

  function updateTestimonial(id, updatedFields) {
    const list = getTestimonials();
    const idx = list.findIndex(x => String(x.id) === String(id));
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updatedFields };
      saveTestimonials(list);
      return list[idx];
    }
    return null;
  }

  function deleteTestimonial(id) {
    let list = getTestimonials();
    list = list.filter(x => String(x.id) !== String(id));
    saveTestimonials(list);
    return true;
  }

  // PACKAGES CRUD
  function getPackages() {
    return getLS('jp_packages', DEFAULT_PACKAGES);
  }

  function savePackages(list) {
    setLS('jp_packages', list);
    window.dispatchEvent(new CustomEvent('jeeva:packagesUpdated', { detail: list }));
  }

  function addPackage(item) {
    const list = getPackages();
    if (!item.id) item.id = 'pkg_' + Date.now();
    list.push(item);
    savePackages(list);
    return item;
  }

  function updatePackage(id, updatedFields) {
    const list = getPackages();
    const idx = list.findIndex(x => String(x.id) === String(id));
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updatedFields };
      savePackages(list);
      return list[idx];
    }
    return null;
  }

  function deletePackage(id) {
    let list = getPackages();
    list = list.filter(x => String(x.id) !== String(id));
    savePackages(list);
    return true;
  }

  // ENQUIRIES CRUD
  function getEnquiries() {
    return getLS('jp_enquiries', []);
  }

  function saveEnquiries(list) {
    setLS('jp_enquiries', list);
    window.dispatchEvent(new CustomEvent('jeeva:enquiriesUpdated', { detail: list }));
  }

  function addEnquiry(item) {
    const list = getEnquiries();
    if (!item.id) item.id = Date.now();
    if (!item.submittedAt) item.submittedAt = new Date().toISOString();
    if (!item.status) item.status = 'New';
    list.unshift(item);
    saveEnquiries(list);
    return item;
  }

  function updateEnquiry(id, updatedFields) {
    const list = getEnquiries();
    const idx = list.findIndex(x => String(x.id) === String(id));
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updatedFields };
      saveEnquiries(list);
      return list[idx];
    }
    return null;
  }

  function deleteEnquiry(id) {
    let list = getEnquiries();
    list = list.filter(x => String(x.id) !== String(id));
    saveEnquiries(list);
    return true;
  }

  function clearAllEnquiries() {
    localStorage.removeItem('jp_enquiries');
    window.dispatchEvent(new CustomEvent('jeeva:enquiriesUpdated', { detail: [] }));
  }

  // SETTINGS
  function getSettings() {
    return getLS('jp_settings', DEFAULT_SETTINGS);
  }

  function saveSettings(settings) {
    const current = getSettings();
    const merged = { ...current, ...settings };
    setLS('jp_settings', merged);
    window.dispatchEvent(new CustomEvent('jeeva:settingsUpdated', { detail: merged }));
    return merged;
  }

  // AUTH CREDENTIALS
  function getAuth() {
    return {
      username: localStorage.getItem('jp_u') || 'admin',
      password: localStorage.getItem('jp_p') || 'jeeva2024'
    };
  }

  function setAuth(u, p) {
    if (u) localStorage.setItem('jp_u', u);
    if (p) localStorage.setItem('jp_p', p);
  }

  // COMPLETE BACKUP & RESTORE
  function exportFullBackup() {
    return {
      version: '2.0',
      exportedAt: new Date().toISOString(),
      studio: 'Jeeva Photography',
      home: getHome(),
      about: getAbout(),
      portfolio: getPortfolio(),
      videos: getVideos(),
      testimonials: getTestimonials(),
      packages: getPackages(),
      enquiries: getEnquiries(),
      settings: getSettings()
    };
  }

  function importFullBackup(data) {
    if (!data || typeof data !== 'object') throw new Error('Invalid backup file format.');
    if (data.home && typeof data.home === 'object') saveHome(data.home);
    if (data.about && typeof data.about === 'object') saveAbout(data.about);
    if (data.portfolio && Array.isArray(data.portfolio)) savePortfolio(data.portfolio);
    if (data.videos && Array.isArray(data.videos)) saveVideos(data.videos);
    if (data.testimonials && Array.isArray(data.testimonials)) saveTestimonials(data.testimonials);
    if (data.packages && Array.isArray(data.packages)) savePackages(data.packages);
    if (data.enquiries && Array.isArray(data.enquiries)) saveEnquiries(data.enquiries);
    if (data.settings && typeof data.settings === 'object') saveSettings(data.settings);
    return true;
  }

  function resetToDefaults() {
    localStorage.removeItem('jp_home');
    localStorage.removeItem('jp_about');
    localStorage.removeItem('jp_portfolio');
    localStorage.removeItem('jp_videos');
    localStorage.removeItem('jp_test');
    localStorage.removeItem('jp_packages');
    localStorage.removeItem('jp_settings');
    return true;
  }

  // Public API
  return {
    saveMedia,
    getMedia,
    deleteMedia,

    getHome,
    saveHome,
    getAbout,
    saveAbout,

    getPortfolio,
    savePortfolio,
    addPortfolioItem,
    updatePortfolioItem,
    deletePortfolioItem,

    getVideos,
    saveVideos,
    addVideoItem,
    updateVideoItem,
    deleteVideoItem,

    getTestimonials,
    saveTestimonials,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,

    getPackages,
    savePackages,
    addPackage,
    updatePackage,
    deletePackage,

    getEnquiries,
    saveEnquiries,
    addEnquiry,
    updateEnquiry,
    deleteEnquiry,
    clearAllEnquiries,

    getSettings,
    saveSettings,
    getAuth,
    setAuth,

    exportFullBackup,
    importFullBackup,
    resetToDefaults,

    DEFAULT_HOME,
    DEFAULT_ABOUT,
    DEFAULT_PACKAGES,
    DEFAULT_TESTIMONIALS,
    DEFAULT_SETTINGS
  };
})();

if (typeof window !== 'undefined') {
  window.JeevaDB = JeevaDB;
}
