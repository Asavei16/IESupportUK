import { create } from 'zustand';

// Define the supported languages
export type Language = 'en' | 'ro';

// Define translations
type Translations = Record<string, Record<Language, string>>;

const translations: Translations = {
  // Navigation
  'nav.home': {
    en: 'Home',
    ro: 'Acasă'
  },
  'nav.about': {
    en: 'About Us',
    ro: 'Despre Noi'
  },
  'nav.universities': {
    en: 'Courses',
    ro: 'Cursuri'
  },
  // 'nav.courses': {
  //   en: 'Courses',
  //   ro: 'Cursuri'
  // },
  'nav.apply': {
    en: 'Apply Now',
    ro: 'Aplică Acum'
  },
  'nav.testimonials': {
    en: 'Testimonials',
    ro: 'Mărturii'
  },
  'nav.blog': {
    en: 'Blog',
    ro: 'Blog'
  },
  'nav.contact': {
    en: 'Contact',
    ro: 'Contact'
  },
  
  // Hero section
  'hero.title': {
    en: 'Step into the Future',
    ro: 'Pășește în Viitor'
  },
  'hero.subtitle': {
    en: 'Study in the UK',
    ro: 'Studiază în UK'
  },
  'hero.cta': {
    en: 'Join Our UK Student Community',
    ro: 'Alătură-te Comunității Noastre de Studenți din UK'
  },

  // About section
  'about.title': {
    en: 'About IE Support UK',
    ro: 'Despre IE Support UK'
  },
  'about.description': {
    en: 'IE Support UK is your trusted educational partner, specializing in helping students access quality education in the United Kingdom. Our team of experienced advisors guides you through every step of the application process, from choosing the right university.',
    ro: 'IE Support UK este partenerul tău educațional de încredere, specializat în a ajuta studenții să acceseze educație de calitate în Regatul Unit. Echipa noastră de consilieri cu experiență te ghidează prin fiecare etapă a procesului de aplicare, de la alegerea universității potrivite.'
  },
  'about.mission': {
    en: 'Our mission is to make UK education accessible to international students by providing personalized guidance and support throughout the entire process.',
    ro: 'Misiunea noastră este de a face educația din Regatul Unit accesibilă studenților internaționali, oferind îndrumare și sprijin personalizat pe tot parcursul procesului.'
  },
  
  // Universities section
  'universities.title': {
    en: 'Top Courses',
    ro: 'Cursuri de Top'
  },
  'universities.subtitle': {
    en: 'Discover world-class education opportunities',
    ro: 'Descoperă oportunități educaționale de clasă mondială'
  },
  'universities.viewPrograms': {
    en: 'View Courses',
    ro: 'Vezi Cursurile'
  },
  
  // Testimonials section
  'testimonials.title': {
    en: 'Student Success Stories',
    ro: 'Povești de Succes ale Studenților'
  },
  'testimonials.subtitle': {
    en: 'Hear from our students who are now studying at top UK universities',
    ro: 'Ascultă de la studenții noștri care studiază acum la universități de top din UK'
  },
  
  // Application form
  'application.title': {
    en: 'Apply to Work With Us',
    ro: 'Aplică pentru a Lucra Cu Noi'
  },
  'application.subtitle': {
    en: 'Complete the form below to join our team as a student advisor',
    ro: 'Completează formularul de mai jos pentru a te alătura echipei noastre ca și consilier pentru studenți'
  },
  'application.name': {
    en: 'What is your name?',
    ro: 'Care este numele tău?'
  },
  'application.phone': {
    en: 'What is your phone number?',
    ro: 'Care este numărul tău de telefon?'
  },
  'application.earliestStartDate': {
    en: 'What is the earliest possible start date?',
    ro: 'Care este cea mai apropiată dată posibilă de începere?'
  },
  'application.preferredInterviewDate': {
    en: 'Preferred interview date:',
    ro: 'Data preferată pentru interviu:'
  },
  'application.settleStatus': {
    en: 'Do you have pre-settle status or settle status?',
    ro: 'Ai statut de pre-stabilire sau statut de stabilire?'
  },
  'application.englishLevel': {
    en: 'English level:',
    ro: 'Nivel de engleză:'
  },
  'application.englishBeginner': {
    en: 'Beginner/Elementary',
    ro: 'Începător/Elementar'
  },
  'application.englishIntermediate': {
    en: 'Intermediate',
    ro: 'Intermediar'
  },
  'application.englishAdvanced': {
    en: 'Advanced',
    ro: 'Avansat'
  },
  'application.employed': {
    en: 'Are you currently employed?',
    ro: 'Ești angajat în prezent?'
  },
  'application.nationality': {
    en: 'Nationality:',
    ro: 'Naționalitate:'
  },
  'application.jobDescription': {
    en: 'The position of student advisor involves recruiting students, taking the documents from them putting them on our internal platform, and preparing them for the interview and test. The agency offers you training and support throughout the collaboration with us!',
    ro: 'Poziția de consilier pentru studenți implică recrutarea studenților, preluarea documentelor de la aceștia, introducerea lor pe platforma noastră internă și pregătirea lor pentru interviu și test. Agenția îți oferă instruire și sprijin pe tot parcursul colaborării cu noi!'
  },
  'application.submit': {
    en: 'Submit Application',
    ro: 'Trimite Aplicația'
  },

  // Contact section
  'contact.title': {
    en: 'Contact Us',
    ro: 'Contactează-ne'
  },
  'contact.subtitle': {
    en: 'We\'re here to help with any questions you have about studying in the UK',
    ro: 'Suntem aici pentru a te ajuta cu orice întrebări ai despre studiul în Regatul Unit'
  },
  'contact.name': {
    en: 'Your Name',
    ro: 'Numele Tău'
  },
  'contact.email': {
    en: 'Email Address',
    ro: 'Adresa de Email'
  },
  'contact.phone': {
    en: 'Phone Number (optional)',
    ro: 'Număr de Telefon (opțional)'
  },
  'contact.message': {
    en: 'Your Message',
    ro: 'Mesajul Tău'
  },
  'contact.submit': {
    en: 'Send Message',
    ro: 'Trimite Mesajul'
  },
  'contact.whatsapp': {
    en: 'Chat with us on WhatsApp',
    ro: 'Discută cu noi pe WhatsApp'
  },
  
  // Blog section
  'blog.title': {
    en: 'Latest Articles',
    ro: 'Ultimele Articole'
  },
  'blog.subtitle': {
    en: 'Tips, guides, and news about studying in the UK',
    ro: 'Sfaturi, ghiduri și știri despre studiul în Regatul Unit'
  },
  'blog.readMore': {
    en: 'Read More',
    ro: 'Citește Mai Mult'
  },
  
  // Footer
  'footer.rights': {
    en: 'All Rights Reserved',
    ro: 'Toate Drepturile Rezervate'
  },
  'footer.privacyPolicy': {
    en: 'Privacy Policy',
    ro: 'Politica de Confidențialitate'
  },
  'footer.termsOfService': {
    en: 'Terms of Service',
    ro: 'Termeni și Condiții'
  }
};

// Create a store for managing language and translations
interface I18nStore {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

export const useI18n = create<I18nStore>((set, get) => ({
  language: 'en',
  setLanguage: (language: Language) => set({ language }),
  t: (key: string) => {
    const { language } = get();
    const translation = translations[key];
    
    if (!translation) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    
    return translation[language] || translation.en;
  }
}));
