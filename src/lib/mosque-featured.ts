// Curated "landmark" mosques per city — the famous, iconic mosques that people
// actually search for. These are hand-verified and always shown first on the
// city pages (and used to enrich the directory), because the raw OpenStreetMap
// dump often ranks small neighbourhood mosques above the landmark ones or omits
// them entirely. Coordinates are the well-known location of each landmark.
//
// Shape mirrors MosqueEntry in mosque-cities.ts: n = English name, na = Arabic
// name, lat/lng = location. All entries here are treated as landmarks.

export interface FeaturedMosque { n: string; na: string; lat: number; lng: number }

export const FEATURED: Record<string, FeaturedMosque[]> = {
  makkah: [
    { n: 'Masjid al-Haram (Great Mosque of Mecca)', na: 'المسجد الحرام', lat: 21.42251, lng: 39.82616 },
    { n: 'Aisha Mosque (Masjid al-Taneem)', na: 'مسجد عائشة (التنعيم)', lat: 21.44796, lng: 39.79017 },
  ],
  madinah: [
    { n: "Al-Masjid an-Nabawi (The Prophet's Mosque)", na: 'المسجد النبوي', lat: 24.46818, lng: 39.61417 },
    { n: 'Quba Mosque', na: 'مسجد قباء', lat: 24.43833, lng: 39.61750 },
    { n: 'Al-Qiblatayn Mosque', na: 'مسجد القبلتين', lat: 24.48420, lng: 39.57760 },
  ],
  riyadh: [
    { n: 'Imam Turki bin Abdullah Grand Mosque', na: 'جامع الإمام تركي بن عبدالله', lat: 24.63140, lng: 46.71360 },
    { n: 'Al Rajhi Grand Mosque', na: 'جامع الراجحي', lat: 24.69660, lng: 46.68890 },
  ],
  jeddah: [
    { n: 'Al-Rahma Mosque (Floating Mosque)', na: 'مسجد الرحمة (المسجد العائم)', lat: 21.48940, lng: 39.17350 },
    { n: 'King Saud Mosque', na: 'جامع الملك سعود', lat: 21.54300, lng: 39.17200 },
  ],
  dubai: [
    { n: 'Jumeirah Mosque', na: 'مسجد جميرا', lat: 25.23320, lng: 55.26650 },
    { n: 'Grand Mosque (Bur Dubai)', na: 'المسجد الكبير (بر دبي)', lat: 25.26350, lng: 55.29720 },
  ],
  'abu-dhabi': [
    { n: 'Sheikh Zayed Grand Mosque', na: 'جامع الشيخ زايد الكبير', lat: 24.41280, lng: 54.47480 },
  ],
  sharjah: [
    { n: 'Al Noor Mosque', na: 'مسجد النور', lat: 25.33000, lng: 55.38140 },
    { n: 'Sharjah Mosque', na: 'مسجد الشارقة', lat: 25.28870, lng: 55.47150 },
  ],
  doha: [
    { n: 'Imam Muhammad ibn Abdul Wahhab Mosque (Qatar State Mosque)', na: 'جامع الإمام محمد بن عبد الوهاب (مسجد الدولة)', lat: 25.31710, lng: 51.50510 },
  ],
  'kuwait-city': [
    { n: 'Grand Mosque of Kuwait', na: 'المسجد الكبير', lat: 29.36970, lng: 47.97830 },
  ],
  manama: [
    { n: 'Al-Fateh Grand Mosque (Ahmad Al-Fateh)', na: 'مسجد أحمد الفاتح الكبير', lat: 26.21000, lng: 50.59340 },
  ],
  muscat: [
    { n: 'Sultan Qaboos Grand Mosque', na: 'جامع السلطان قابوس الأكبر', lat: 23.58440, lng: 58.38870 },
  ],
  sanaa: [
    { n: 'Al Saleh Mosque', na: 'جامع الصالح', lat: 15.32860, lng: 44.19980 },
    { n: "Great Mosque of Sana'a", na: 'الجامع الكبير بصنعاء', lat: 15.35390, lng: 44.21410 },
  ],
  cairo: [
    { n: 'Al-Azhar Mosque', na: 'الجامع الأزهر', lat: 30.04590, lng: 31.26250 },
    { n: 'Mosque of Muhammad Ali (Citadel)', na: 'مسجد محمد علي (القلعة)', lat: 30.02870, lng: 31.25990 },
    { n: 'Sultan Hassan Mosque', na: 'مسجد السلطان حسن', lat: 30.03240, lng: 31.25610 },
    { n: 'Mosque of Amr ibn al-As', na: 'جامع عمرو بن العاص', lat: 30.01060, lng: 31.23310 },
  ],
  alexandria: [
    { n: 'Abu al-Abbas al-Mursi Mosque', na: 'مسجد أبو العباس المرسي', lat: 31.20490, lng: 29.88270 },
  ],
  amman: [
    { n: 'King Abdullah I Mosque', na: 'مسجد الملك عبدالله الأول', lat: 31.95060, lng: 35.90960 },
    { n: 'Al-Husseini Mosque', na: 'المسجد الحسيني', lat: 31.95150, lng: 35.93450 },
  ],
  beirut: [
    { n: 'Mohammad Al-Amin Mosque', na: 'مسجد محمد الأمين', lat: 33.89580, lng: 35.50780 },
  ],
  damascus: [
    { n: 'Umayyad Mosque (Great Mosque of Damascus)', na: 'الجامع الأموي', lat: 33.51140, lng: 36.30670 },
    { n: 'Sayyidah Ruqayya Mosque', na: 'مسجد السيدة رقية', lat: 33.51390, lng: 36.30500 },
  ],
  baghdad: [
    { n: 'Abu Hanifa Mosque', na: 'جامع الإمام أبو حنيفة النعمان', lat: 33.37060, lng: 44.36390 },
    { n: 'Al-Kadhimiya Mosque', na: 'مسجد الكاظمية', lat: 33.38030, lng: 44.33780 },
  ],
  istanbul: [
    { n: 'Sultan Ahmed Mosque (Blue Mosque)', na: 'جامع السلطان أحمد (المسجد الأزرق)', lat: 41.00540, lng: 28.97680 },
    { n: 'Hagia Sophia Grand Mosque', na: 'جامع آيا صوفيا الكبير', lat: 41.00860, lng: 28.98020 },
    { n: 'Süleymaniye Mosque', na: 'جامع السليمانية', lat: 41.01610, lng: 28.96390 },
    { n: 'Eyüp Sultan Mosque', na: 'جامع أبي أيوب الأنصاري', lat: 41.04780, lng: 28.93370 },
  ],
  ankara: [
    { n: 'Kocatepe Mosque', na: 'جامع كوجاتبه', lat: 39.91740, lng: 32.85460 },
  ],
  tehran: [
    { n: 'Imam Khomeini Mosque (Shah Mosque)', na: 'مسجد الإمام الخميني', lat: 35.67390, lng: 51.41880 },
  ],
  karachi: [
    { n: 'Masjid-e-Tooba', na: 'مسجد طوبى', lat: 24.84790, lng: 67.06490 },
    { n: 'Memon Mosque', na: 'مسجد ميمن', lat: 24.85560, lng: 67.01860 },
  ],
  lahore: [
    { n: 'Badshahi Mosque', na: 'المسجد البادشاهي', lat: 31.58820, lng: 74.31030 },
    { n: 'Wazir Khan Mosque', na: 'مسجد وزير خان', lat: 31.58260, lng: 74.32390 },
  ],
  islamabad: [
    { n: 'Faisal Mosque', na: 'مسجد فيصل', lat: 33.72950, lng: 73.03720 },
  ],
  delhi: [
    { n: 'Jama Masjid (Delhi)', na: 'الجامع المسجد بدلهي', lat: 28.65070, lng: 77.23340 },
    { n: 'Fatehpuri Mosque', na: 'مسجد فتحبوري', lat: 28.65620, lng: 77.21600 },
  ],
  mumbai: [
    { n: 'Haji Ali Dargah', na: 'ضريح حاجي علي', lat: 18.98270, lng: 72.80890 },
    { n: 'Jama Masjid (Mumbai)', na: 'الجامع المسجد بمومباي', lat: 18.94900, lng: 72.83300 },
  ],
  hyderabad: [
    { n: 'Mecca Masjid', na: 'مسجد مكة', lat: 17.36040, lng: 78.47380 },
  ],
  dhaka: [
    { n: 'Baitul Mukarram (National Mosque)', na: 'بيت المكرم (المسجد الوطني)', lat: 23.72900, lng: 90.41250 },
    { n: 'Star Mosque (Tara Masjid)', na: 'مسجد النجمة', lat: 23.71560, lng: 90.40330 },
  ],
  jakarta: [
    { n: 'Istiqlal Mosque', na: 'مسجد الاستقلال', lat: -6.16990, lng: 106.83060 },
  ],
  surabaya: [
    { n: 'Al-Akbar Mosque (Great Mosque of Surabaya)', na: 'المسجد الأكبر بسورابايا', lat: -7.34660, lng: 112.71600 },
    { n: 'Sunan Ampel Mosque', na: 'مسجد سونان أمبيل', lat: -7.22970, lng: 112.74300 },
  ],
  bandung: [
    { n: 'Grand Mosque of Bandung (Masjid Raya)', na: 'مسجد باندونغ الكبير', lat: -6.92180, lng: 107.60700 },
  ],
  'kuala-lumpur': [
    { n: 'National Mosque of Malaysia (Masjid Negara)', na: 'المسجد الوطني (مسجد نيغارا)', lat: 3.14170, lng: 101.69170 },
    { n: 'Masjid Jamek', na: 'مسجد جامك', lat: 3.14890, lng: 101.69540 },
    { n: 'Federal Territory Mosque (Masjid Wilayah)', na: 'مسجد الإقليم الاتحادي', lat: 3.17200, lng: 101.66900 },
  ],
  singapore: [
    { n: 'Sultan Mosque', na: 'مسجد السلطان', lat: 1.30210, lng: 103.85910 },
  ],
  khartoum: [
    { n: 'Grand Mosque of Khartoum', na: 'مسجد الخرطوم الكبير', lat: 15.60080, lng: 32.53350 },
  ],
  casablanca: [
    { n: 'Hassan II Mosque', na: 'مسجد الحسن الثاني', lat: 33.60830, lng: -7.63250 },
  ],
  rabat: [
    { n: 'Hassan Tower & Mosque', na: 'صومعة حسان', lat: 34.02420, lng: -6.82220 },
    { n: 'As-Sunna Mosque', na: 'مسجد السنة', lat: 34.02090, lng: -6.83390 },
  ],
  tunis: [
    { n: 'Ez-Zitouna Mosque', na: 'جامع الزيتونة', lat: 36.79720, lng: 10.17100 },
  ],
  algiers: [
    { n: 'Great Mosque of Algiers (Djamaa el Djazair)', na: 'جامع الجزائر الأعظم', lat: 36.71750, lng: 3.11360 },
    { n: 'Ketchaoua Mosque', na: 'جامع كتشاوة', lat: 36.78360, lng: 3.06030 },
  ],
  kano: [
    { n: 'Great Mosque of Kano', na: 'مسجد كانو الكبير', lat: 12.00220, lng: 8.51670 },
  ],
  london: [
    { n: 'London Central Mosque (Regent Park)', na: 'مسجد لندن المركزي', lat: 51.52660, lng: -0.16570 },
    { n: 'East London Mosque', na: 'مسجد شرق لندن', lat: 51.51700, lng: -0.06540 },
  ],
  birmingham: [
    { n: 'Birmingham Central Mosque', na: 'مسجد برمنغهام المركزي', lat: 52.46320, lng: -1.89310 },
  ],
  manchester: [
    { n: 'Manchester Central Mosque (Victoria Park)', na: 'مسجد مانشستر المركزي', lat: 53.45740, lng: -2.21590 },
  ],
  paris: [
    { n: 'Grande Mosquee de Paris', na: 'مسجد باريس الكبير', lat: 48.84190, lng: 2.35520 },
  ],
  berlin: [
    { n: 'Sehitlik Mosque', na: 'مسجد الشهيدلك', lat: 52.47900, lng: 13.40340 },
  ],
  'new-york': [
    { n: 'Islamic Cultural Center of New York', na: 'المركز الثقافي الإسلامي بنيويورك', lat: 40.77670, lng: -73.95070 },
  ],
};

export const featuredFor = (slug: string): FeaturedMosque[] => FEATURED[slug] ?? [];
