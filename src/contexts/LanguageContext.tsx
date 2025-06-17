
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'hi' | 'kn' | 'ta' | 'te' | 'ml';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') as Language;
    if (savedLanguage) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('selectedLanguage', lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Login Page
    'smart_farming_platform': 'Smart Farming Platform',
    'phone_number': 'Phone Number',
    'password': 'Password',
    'enter_password': 'Enter your password',
    'login': 'Login',
    'create_account': 'Create Account',
    'no_account_signup': "Don't have an account? Sign up",
    'have_account_login': 'Already have an account? Login',
    'change_language': 'Change Language',
    'invalid_credentials': 'Invalid phone number or password',
    'account_exists': 'Account already exists with this phone number',
    
    // Survey Page
    'complete_profile': 'Complete Your Profile',
    'help_personalize': 'Help us personalize your farming experience',
    'name': 'Name',
    'enter_name': 'Enter your full name',
    'state': 'State',
    'select_state': 'Select your state',
    'district': 'District',
    'search_district': 'Search and select your district',
    'market': 'Market',
    'search_market': 'Search and select your preferred market',
    'crops': 'Crops You Grow',
    'search_crops': 'Search and select crops you grow',
    'complete_setup': 'Complete Setup',
    'please_fill_fields': 'Please fill in all fields',
    
    // Main Page
    'welcome_back': 'Welcome back',
    'logout': 'Logout',
    'crop_watchlist': 'Crop Watchlist',
    'quick_actions': 'Quick Actions',
    'add_crop': 'Add Crop',
    'predict_price': 'Predict Price',
    'add_expense': 'Add Expense',
    'sell_crop': 'Sell Crop',
    'todays_weather': "Today's Weather",
    'humidity': 'Humidity',
    'wind': 'Wind',
    'feels_like': 'Feels like',
    'active_crops': 'Active Crops',
    'total_investment': 'Total Investment',
    'days_left': 'days left',
    'market_news': 'Market News',
    'market_alert': 'Market Alert',
    'policy_update': 'Policy Update',
    'weather_update': 'Weather Update',
    'home': 'Home',
    'market': 'Market',
    'sell': 'Sell',
    'history': 'History',
    'settings': 'Settings',
    
    // Crop stages
    'seeding': 'Seeding',
    'growing': 'Growing',
    'flowering': 'Flowering',
    'harvesting': 'Harvesting',
    'ready': 'Ready',
    
    // Weather conditions
    'sunny': 'Sunny',
    'partly_cloudy': 'Partly Cloudy',
    'cloudy': 'Cloudy',
    'light_rain': 'Light Rain',
  },
  hi: {
    // Login Page
    'smart_farming_platform': 'स्मार्ट खेती प्लेटफॉर्म',
    'phone_number': 'फोन नंबर',
    'password': 'पासवर्ड',
    'enter_password': 'अपना पासवर्ड दर्ज करें',
    'login': 'लॉगिन',
    'create_account': 'खाता बनाएं',
    'no_account_signup': 'खाता नहीं है? साइन अप करें',
    'have_account_login': 'पहले से खाता है? लॉगिन करें',
    'change_language': 'भाषा बदलें',
    'invalid_credentials': 'गलत फोन नंबर या पासवर्ड',
    'account_exists': 'इस फोन नंबर से पहले से खाता मौजूद है',
    
    // Survey Page
    'complete_profile': 'अपनी प्रोफाइल पूरी करें',
    'help_personalize': 'अपने खेती अनुभव को व्यक्तिगत बनाने में हमारी मदद करें',
    'name': 'नाम',
    'enter_name': 'अपना पूरा नाम दर्ज करें',
    'state': 'राज्य',
    'select_state': 'अपना राज्य चुनें',
    'district': 'जिला',
    'search_district': 'अपना जिला खोजें और चुनें',
    'market': 'बाजार',
    'search_market': 'अपना पसंदीदा बाजार खोजें और चुनें',
    'crops': 'आपकी फसलें',
    'search_crops': 'अपनी फसलों को खोजें और चुनें',
    'complete_setup': 'सेटअप पूरा करें',
    'please_fill_fields': 'कृपया सभी फील्ड भरें',
    
    // Main Page
    'welcome_back': 'वापस स्वागत है',
    'logout': 'लॉगआउट',
    'crop_watchlist': 'फसल वॉचलिस्ट',
    'quick_actions': 'त्वरित कार्य',
    'add_crop': 'फसल जोड़ें',
    'predict_price': 'कीमत का अनुमान',
    'add_expense': 'खर्च जोड़ें',
    'sell_crop': 'फसल बेचें',
    'todays_weather': 'आज का मौसम',
    'humidity': 'नमी',
    'wind': 'हवा',
    'feels_like': 'महसूस होता है',
    'active_crops': 'सक्रिय फसलें',
    'total_investment': 'कुल निवेश',
    'days_left': 'दिन बचे',
    'market_news': 'बाजार समाचार',
    'market_alert': 'बाजार अलर्ट',
    'policy_update': 'नीति अपडेट',
    'weather_update': 'मौसम अपडेट',
    'home': 'होम',
    'market': 'बाजार',
    'sell': 'बेचें',
    'history': 'इतिहास',
    'settings': 'सेटिंग्स',
    
    // Crop stages
    'seeding': 'बुआई',
    'growing': 'बढ़ रहा',
    'flowering': 'फूल आना',
    'harvesting': 'कटाई',
    'ready': 'तैयार',
    
    // Weather conditions
    'sunny': 'धूप',
    'partly_cloudy': 'आंशिक बादल',
    'cloudy': 'बादल',
    'light_rain': 'हल्की बारिश',
  },
  kn: {
    // Login Page
    'smart_farming_platform': 'ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ವೇದಿಕೆ',
    'phone_number': 'ಫೋನ್ ಸಂಖ್ಯೆ',
    'password': 'ಪಾಸ್‌ವರ್ಡ್',
    'enter_password': 'ನಿಮ್ಮ ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ',
    'login': 'ಲಾಗಿನ್',
    'create_account': 'ಖಾತೆ ರಚಿಸಿ',
    'no_account_signup': 'ಖಾತೆ ಇಲ್ಲವೇ? ಸೈನ್ ಅಪ್ ಮಾಡಿ',
    'have_account_login': 'ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ? ಲಾಗಿನ್ ಮಾಡಿ',
    'change_language': 'ಭಾಷೆ ಬದಲಾಯಿಸಿ',
    'invalid_credentials': 'ತಪ್ಪು ಫೋನ್ ಸಂಖ್ಯೆ ಅಥವಾ ಪಾಸ್‌ವರ್ಡ್',
    'account_exists': 'ಈ ಫೋನ್ ಸಂಖ್ಯೆಯೊಂದಿಗೆ ಖಾತೆ ಈಗಾಗಲೇ ಅಸ್ತಿತ್ವದಲ್ಲಿದೆ',
    
    // Survey Page
    'complete_profile': 'ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಪೂರ್ಣಗೊಳಿಸಿ',
    'help_personalize': 'ನಿಮ್ಮ ಕೃಷಿ ಅನುಭವವನ್ನು ವೈಯಕ್ತಿಕಗೊಳಿಸಲು ನಮಗೆ ಸಹಾಯ ಮಾಡಿ',
    'name': 'ಹೆಸರು',
    'enter_name': 'ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರು ನಮೂದಿಸಿ',
    'state': 'ರಾಜ್ಯ',
    'select_state': 'ನಿಮ್ಮ ರಾಜ್ಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    'district': 'ಜಿಲ್ಲೆ',
    'search_district': 'ನಿಮ್ಮ ಜಿಲ್ಲೆಯನ್ನು ಹುಡುಕಿ ಮತ್ತು ಆಯ್ಕೆಮಾಡಿ',
    'market': 'ಮಾರುಕಟ್ಟೆ',
    'search_market': 'ನಿಮ್ಮ ಆದ್ಯತೆಯ ಮಾರುಕಟ್ಟೆಯನ್ನು ಹುಡುಕಿ ಮತ್ತು ಆಯ್ಕೆಮಾಡಿ',
    'crops': 'ನೀವು ಬೆಳೆಯುವ ಬೆಳೆಗಳು',
    'search_crops': 'ನೀವು ಬೆಳೆಯುವ ಬೆಳೆಗಳನ್ನು ಹುಡುಕಿ ಮತ್ತು ಆಯ್ಕೆಮಾಡಿ',
    'complete_setup': 'ಸೆಟಪ್ ಪೂರ್ಣಗೊಳಿಸಿ',
    'please_fill_fields': 'ದಯವಿಟ್ಟು ಎಲ್ಲಾ ಕ್ಷೇತ್ರಗಳನ್ನು ತುಂಬಿಸಿ',
    
    // Main Page
    'welcome_back': 'ಮತ್ತೆ ಸ್ವಾಗತ',
    'logout': 'ಲಾಗ್‌ಔಟ್',
    'crop_watchlist': 'ಬೆಳೆ ವಾಚ್‌ಲಿಸ್ಟ್',
    'quick_actions': 'ತ್ವರಿತ ಕ್ರಿಯೆಗಳು',
    'add_crop': 'ಬೆಳೆ ಸೇರಿಸಿ',
    'predict_price': 'ಬೆಲೆ ಊಹಿಸಿ',
    'add_expense': 'ವೆಚ್ಚ ಸೇರಿಸಿ',
    'sell_crop': 'ಬೆಳೆ ಮಾರಿ',
    'todays_weather': 'ಇಂದಿನ ಹವಾಮಾನ',
    'humidity': 'ಆರ್ದ್ರತೆ',
    'wind': 'ಗಾಳಿ',
    'feels_like': 'ಅನಿಸುತ್ತದೆ',
    'active_crops': 'ಸಕ್ರಿಯ ಬೆಳೆಗಳು',
    'total_investment': 'ಒಟ್ಟು ಹೂಡಿಕೆ',
    'days_left': 'ದಿನಗಳು ಬಾಕಿ',
    'market_news': 'ಮಾರುಕಟ್ಟೆ ಸುದ್ದಿ',
    'market_alert': 'ಮಾರುಕಟ್ಟೆ ಎಚ್ಚರಿಕೆ',
    'policy_update': 'ನೀತಿ ನವೀಕರಣ',
    'weather_update': 'ಹವಾಮಾನ ನವೀಕರಣ',
    'home': 'ಮನೆ',
    'market': 'ಮಾರುಕಟ್ಟೆ',
    'sell': 'ಮಾರಿ',
    'history': 'ಇತಿಹಾಸ',
    'settings': 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    
    // Crop stages
    'seeding': 'ಬಿತ್ತನೆ',
    'growing': 'ಬೆಳೆಯುತ್ತಿದೆ',
    'flowering': 'ಹೂಬಿಡುವಿಕೆ',
    'harvesting': 'ಕೊಯ್ಲು',
    'ready': 'ಸಿದ್ಧ',
    
    // Weather conditions
    'sunny': 'ಬಿಸಿಲು',
    'partly_cloudy': 'ಭಾಗಶಃ ಮೋಡ',
    'cloudy': 'ಮೋಡ',
    'light_rain': 'ಲಘು ಮಳೆ',
  },
  ta: {
    // Login Page
    'smart_farming_platform': 'ஸ்மார்ட் வேளாண் தளம்',
    'phone_number': 'தொலைபேசி எண்',
    'password': 'கடவுச்சொல்',
    'enter_password': 'உங்கள் கடவுச்சொல்லை உள்ளிடவும்',
    'login': 'உள்நுழைய',
    'create_account': 'கணக்கை உருவாக்கவும்',
    'no_account_signup': 'கணக்கு இல்லையா? பதிவு செய்யவும்',
    'have_account_login': 'ஏற்கனவே கணக்கு இருக்கிறதா? உள்நுழைய',
    'change_language': 'மொழியை மாற்றவும்',
    'invalid_credentials': 'தவறான தொலைபேசி எண் அல்லது கடவுச்சொல்',
    'account_exists': 'இந்த தொலைபேசி எண்ணுடன் கணக்கு ஏற்கனவே உள்ளது',
    
    // Survey Page
    'complete_profile': 'உங்கள் சுயவிவரத்தை முடிக்கவும்',
    'help_personalize': 'உங்கள் வேளாண் அனுபவத்தை தனிப்பயனாக்க எங்களுக்கு உதவுங்கள்',
    'name': 'பெயர்',
    'enter_name': 'உங்கள் முழு பெயரை உள்ளிடவும்',
    'state': 'மாநிலம்',
    'select_state': 'உங்கள் மாநிலத்தை தேர்ந்தெடுக்கவும்',
    'district': 'மாவட்டம்',
    'search_district': 'உங்கள் மாவட்டத்தை தேடி தேர்ந்தெடுக்கவும்',
    'market': 'சந்தை',
    'search_market': 'உங்கள் விருப்பமான சந்தையை தேடி தேர்ந்தெடுக்கவும்',
    'crops': 'நீங்கள் வளர்க்கும் பயிர்கள்',
    'search_crops': 'நீங்கள் வளர்க்கும் பயிர்களை தேடி தேர்ந்தெடுக்கவும்',
    'complete_setup': 'அமைப்பை முடிக்கவும்',
    'please_fill_fields': 'தயவுசெய்து அனைத்து புலங்களையும் நிரப்பவும்',
    
    // Main Page
    'welcome_back': 'மீண்டும் வருக',
    'logout': 'வெளியேற',
    'crop_watchlist': 'பயிர் கண்காணிப்பு பட்டியல்',
    'quick_actions': 'விரைவு செயல்கள்',
    'add_crop': 'பயிர் சேர்க்கவும்',
    'predict_price': 'விலை கணிக்கவும்',
    'add_expense': 'செலவு சேர்க்கவும்',
    'sell_crop': 'பயிர் விற்கவும்',
    'todays_weather': 'இன்றைய வானிலை',
    'humidity': 'ஈரப்பதம்',
    'wind': 'காற்று',
    'feels_like': 'போல் உணர்கிறது',
    'active_crops': 'செயலில் உள்ள பயிர்கள்',
    'total_investment': 'மொத்த முதலீடு',
    'days_left': 'நாட்கள் உள்ளன',
    'market_news': 'சந்தை செய்திகள்',
    'market_alert': 'சந்தை எச்சரிக்கை',
    'policy_update': 'கொள்கை புதுப்பிப்பு',
    'weather_update': 'வானிலை புதுப்பிப்பு',
    'home': 'வீடு',
    'market': 'சந்தை',
    'sell': 'விற்க',
    'history': 'வரலாறு',
    'settings': 'அமைப்புகள்',
    
    // Crop stages
    'seeding': 'விதைப்பு',
    'growing': 'வளர்ந்து கொண்டிருக்கிறது',
    'flowering': 'பூக்கும்',
    'harvesting': 'அறுவடை',
    'ready': 'தயார்',
    
    // Weather conditions
    'sunny': 'வெயில்',
    'partly_cloudy': 'பகுதி மேகம்',
    'cloudy': 'மேகம்',
    'light_rain': 'லேசான மழை',
  },
  te: {
    // Login Page
    'smart_farming_platform': 'స్మార్ట్ వ్యవసాయ వేదిక',
    'phone_number': 'ఫోన్ నంబర్',
    'password': 'పాస్‌వర్డ్',
    'enter_password': 'మీ పాస్‌వర్డ్‌ను నమోదు చేయండి',
    'login': 'లాగిన్',
    'create_account': 'ఖాతా సృష్టించండి',
    'no_account_signup': 'ఖాతా లేదా? సైన్ అప్ చేయండి',
    'have_account_login': 'ఇప్పటికే ఖాతా ఉందా? లాగిన్ చేయండి',
    'change_language': 'భాష మార్చండి',
    'invalid_credentials': 'తప్పు ఫోన్ నంబర్ లేదా పాస్‌వర్డ్',
    'account_exists': 'ఈ ఫోన్ నంబర్‌తో ఖాతా ఇప్పటికే ఉంది',
    
    // Survey Page
    'complete_profile': 'మీ ప్రొఫైల్‌ను పూర్తి చేయండి',
    'help_personalize': 'మీ వ్యవసాయ అనుభవాన్ని వ్యక్తిగతీకరించడంలో మాకు సహాయపడండి',
    'name': 'పేరు',
    'enter_name': 'మీ పూర్తి పేరును నమోదు చేయండి',
    'state': 'రాష్ట్రం',
    'select_state': 'మీ రాష్ట్రాన్ని ఎంచుకోండి',
    'district': 'జిల్లా',
    'search_district': 'మీ జిల్లాను వెతుకుని ఎంచుకోండి',
    'market': 'మార్కెట్',
    'search_market': 'మీ ఇష్టమైన మార్కెట్‌ను వెతుకుని ఎంచుకోండి',
    'crops': 'మీరు పండించే పంటలు',
    'search_crops': 'మీరు పండించే పంటలను వెతుకుని ఎంచుకోండి',
    'complete_setup': 'సెటప్ పూర్తి చేయండి',
    'please_fill_fields': 'దయచేసి అన్ని ఫీల్డ్‌లను పూర్తి చేయండి',
    
    // Main Page
    'welcome_back': 'తిరిగి స్వాగతం',
    'logout': 'లాగౌట్',
    'crop_watchlist': 'పంట వాచ్‌లిస్ట్',
    'quick_actions': 'త్వరిత చర్యలు',
    'add_crop': 'పంట జోడించండి',
    'predict_price': 'ధర అంచనా వేయండి',
    'add_expense': 'ఖర్చు జోడించండి',
    'sell_crop': 'పంట అమ్మండి',
    'todays_weather': 'నేటి వాతావరణం',
    'humidity': 'తేమ',
    'wind': 'గాలి',
    'feels_like': 'అనిపిస్తుంది',
    'active_crops': 'క్రియాశీల పంటలు',
    'total_investment': 'మొత్తం పెట్టుబడి',
    'days_left': 'రోజులు మిగిలి ఉన్నాయి',
    'market_news': 'మార్కెట్ వార్తలు',
    'market_alert': 'మార్కెట్ హెచ్చరిక',
    'policy_update': 'విధాన నవీకరణ',
    'weather_update': 'వాతావరణ నవీకరణ',
    'home': 'హోమ్',
    'market': 'మార్కెట్',
    'sell': 'అమ్మండి',
    'history': 'చరిత్ర',
    'settings': 'సెట్టింగ్‌లు',
    
    // Crop stages
    'seeding': 'విత్తనాలు',
    'growing': 'పెరుగుతోంది',
    'flowering': 'పూలు పూస్తోంది',
    'harvesting': 'పంట కోత',
    'ready': 'సిద్ధం',
    
    // Weather conditions
    'sunny': 'ఎండ',
    'partly_cloudy': 'పాక్షిక మేఘావృతం',
    'cloudy': 'మేఘావృతం',
    'light_rain': 'తేలికపాటి వర్షం',
  },
  ml: {
    // Login Page
    'smart_farming_platform': 'സ്മാർട്ട് കാർഷിക പ്ലാറ്റ്‌ഫോം',
    'phone_number': 'ഫോൺ നമ്പർ',
    'password': 'പാസ്‌വേഡ്',
    'enter_password': 'നിങ്ങളുടെ പാസ്‌വേഡ് നൽകുക',
    'login': 'ലോഗിൻ',
    'create_account': 'അക്കൗണ്ട് സൃഷ്ടിക്കുക',
    'no_account_signup': 'അക്കൗണ്ട് ഇല്ലേ? സൈൻ അപ്പ് ചെയ്യുക',
    'have_account_login': 'ഇതിനകം അക്കൗണ്ട് ഉണ്ടോ? ലോഗിൻ ചെയ്യുക',
    'change_language': 'ഭാഷ മാറ്റുക',
    'invalid_credentials': 'തെറ്റായ ഫോൺ നമ്പർ അല്ലെങ്കിൽ പാസ്‌വേഡ്',
    'account_exists': 'ഈ ഫോൺ നമ്പറിൽ അക്കൗണ്ട് ഇതിനകം നിലവിലുണ്ട്',
    
    // Survey Page
    'complete_profile': 'നിങ്ങളുടെ പ്രൊഫൈൽ പൂർത്തിയാക്കുക',
    'help_personalize': 'നിങ്ങളുടെ കാർഷിക അനുഭവം വ്യക്തിഗതമാക്കാൻ ഞങ്ങളെ സഹായിക്കുക',
    'name': 'പേര്',
    'enter_name': 'നിങ്ങളുടെ പൂർണ്ണ നാമം നൽകുക',
    'state': 'സംസ്ഥാനം',
    'select_state': 'നിങ്ങളുടെ സംസ്ഥാനം തിരഞ്ഞെടുക്കുക',
    'district': 'ജില്ല',
    'search_district': 'നിങ്ങളുടെ ജില്ല തിരയുകയും തിരഞ്ഞെടുക്കുകയും ചെയ്യുക',
    'market': 'മാർക്കറ്റ്',
    'search_market': 'നിങ്ങളുടെ ഇഷ്ടപ്പെട്ട മാർക്കറ്റ് തിരയുകയും തിരഞ്ഞെടുക്കുകയും ചെയ്യുക',
    'crops': 'നിങ്ങൾ വളർത്തുന്ന വിളകൾ',
    'search_crops': 'നിങ്ങൾ വളർത്തുന്ന വിളകൾ തിരയുകയും തിരഞ്ഞെടുക്കുകയും ചെയ്യുക',
    'complete_setup': 'സെറ്റപ്പ് പൂർത്തിയാക്കുക',
    'please_fill_fields': 'ദയവായി എല്ലാ ഫീൽഡുകളും പൂരിപ്പിക്കുക',
    
    // Main Page
    'welcome_back': 'തിരികെ സ്വാഗതം',
    'logout': 'ലോഗൗട്ട്',
    'crop_watchlist': 'വിള വാച്ച്‌ലിസ്റ്റ്',
    'quick_actions': 'വേഗത്തിലുള്ള പ്രവർത്തനങ്ങൾ',
    'add_crop': 'വിള ചേർക്കുക',
    'predict_price': 'വില പ്രവചിക്കുക',
    'add_expense': 'ചെലവ് ചേർക്കുക',
    'sell_crop': 'വിള വിൽക്കുക',
    'todays_weather': 'ഇന്നത്തെ കാലാവസ്ഥ',
    'humidity': 'ആർദ്രത',
    'wind': 'കാറ്റ്',
    'feels_like': 'തോന്നുന്നത്',
    'active_crops': 'സജീവ വിളകൾ',
    'total_investment': 'മൊത്തം നിക്ഷേപം',
    'days_left': 'ദിവസങ്ങൾ ബാക്കി',
    'market_news': 'മാർക്കറ്റ് വാർത്തകൾ',
    'market_alert': 'മാർക്കറ്റ് അലേർട്ട്',
    'policy_update': 'നയ അപ്‌ഡേറ്റ്',
    'weather_update': 'കാലാവസ്ഥാ അപ്‌ഡേറ്റ്',
    'home': 'ഹോം',
    'market': 'മാർക്കറ്റ്',
    'sell': 'വിൽക്കുക',
    'history': 'ചരിത്രം',
    'settings': 'ക്രമീകരണങ്ങൾ',
    
    // Crop stages
    'seeding': 'വിത്ത് ഇടൽ',
    'growing': 'വളർന്നു കൊണ്ടിരിക്കുന്നു',
    'flowering': 'പൂക്കൽ',
    'harvesting': 'വിളവെടുപ്പ്',
    'ready': 'തയ്യാർ',
    
    // Weather conditions
    'sunny': 'വെയിൽ',
    'partly_cloudy': 'ഭാഗികമായി മേഘാവൃതം',
    'cloudy': 'മേഘാവൃതം',
    'light_rain': 'നേരിയ മഴ',
  },
};
