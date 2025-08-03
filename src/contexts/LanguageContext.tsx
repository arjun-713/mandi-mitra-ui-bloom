
import React, { createContext, useContext, useState } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export type Language = 'en' | 'hi' | 'ta' | 'te' | 'kn' | 'mr';

const translations = {
  en: {
    // Login & Auth
    login: 'Login',
    create_account: 'Create Account',
    phone_number: 'Phone Number',
    password: 'Password',
    enter_password: 'Enter Password',
    smart_farming_platform: 'Smart Farming Platform',
    invalid_credentials: 'Invalid phone number or password',
    account_exists: 'Account already exists with this phone number',
    no_account_signup: "Don't have an account? Sign Up",
    have_account_login: 'Already have an account? Login',
    change_language: 'Change Language',
    
    // Header
    welcome_back: 'Welcome back',
    settings: 'Settings',
    logout: 'Logout',
    
    // Navigation
    home: 'Home',
    market_tab: 'Market',
    sell: 'Sell',
    history: 'History',
    mandi: 'Mandi',
    
    // Main sections
    quick_actions: 'Quick Actions',
    active_crops: 'Active Crops',
    market_news: 'Market News',
    weather: 'Weather',
    
    // Quick Actions
    add_crop: 'Add Crop',
    predict_price: 'Predict Price',
    add_expense: 'Add Expense',
    sell_crop: 'Sell Crop',
    
    // Crop Watchlist
    crop_watchlist: 'Crop Watchlist',
    view_all: 'View All',
    
    // Active Crops
    total_investment: 'Total Investment',
    days_left: 'days left',
    no_crops_message: 'No crops added yet. Start by adding your first crop!',
    
    // Crop Status
    land_preparation: 'Land Preparation',
    sowing: 'Sowing',
    growing: 'Growing',
    ready_to_harvest: 'Ready to Harvest',
    harvested: 'Harvested',
    
    // Weather
    todays_weather: "Today's Weather",
    humidity: 'Humidity',
    wind: 'Wind',
    feels_like: 'Feels Like',
    sunny: 'Sunny',
    partly_cloudy: 'Partly Cloudy',
    cloudy: 'Cloudy',
    light_rain: 'Light Rain',
    
    // Common
    back: 'Back',
    save: 'Save',
    cancel: 'Cancel',
    add: 'Add',
    update: 'Update',
    delete: 'Delete',
    
    // News categories
    market_alert: 'Market Alert',
    policy_update: 'Policy Update',
    weather_update: 'Weather Update',
    
    // Crop management additional
    active_crops_title: 'Active Crops',
    add_crop_button: 'Add Crop',
    add_new_crop: 'Add New Crop',
    search_crop_placeholder: 'Search or type crop name',
    start_date_label: 'Start Date',
    acres_label: 'Acres',
    acres_placeholder: 'Enter acres (e.g., 2.5)',
    no_crops_added: 'No crops added yet',
    add_now: 'Add Now',
    started: 'Started',
    total_expenses_label: 'Total Expenses',
    
    // Time
    hours_ago: 'hours ago',
    two_hours_ago: '2 hours ago',
    four_hours_ago: '4 hours ago',
    six_hours_ago: '6 hours ago',
    
    // News titles
    wheat_price_surge: 'Wheat prices surge 5% amid supply concerns',
    govt_subsidy_news: 'New government subsidy for organic farming announced',
    monsoon_forecast: 'Monsoon forecast: Normal rainfall expected this season',
    
    // Survey
    survey_title: 'Tell us about yourself',
    survey_subtitle: 'Help us personalize your experience',
    name: 'Full Name',
    state: 'State',
    district: 'District',
    survey_market: 'Preferred Market',
    crops: 'Crops you grow',
    complete_survey: 'Complete Setup',
    
    // Crop Management
    crop_name: 'Crop Name',
    start_date: 'Start Date of Farming',
    acres: 'Plantation Acres',
    current_status: 'Current Status',
    expenses: 'Expenses',
    add_new_expense: 'Add New Expense',
    expense_amount: 'Amount',
    payment_method: 'Payment Method',
    cash: 'Cash',
    upi: 'UPI',
    notes: 'Notes',
    total_expenses: 'Total Expenses'
  },
  hi: {
    // Login & Auth
    login: 'लॉगिन',
    create_account: 'खाता बनाएं',
    phone_number: 'फोन नंबर',
    password: 'पासवर्ड',
    enter_password: 'पासवर्ड दर्ज करें',
    smart_farming_platform: 'स्मार्ट कृषि प्लेटफॉर्म',
    invalid_credentials: 'गलत फोन नंबर या पासवर्ड',
    account_exists: 'इस फोन नंबर से खाता पहले से मौजूद है',
    no_account_signup: 'खाता नहीं है? साइन अप करें',
    have_account_login: 'पहले से खाता है? लॉगिन करें',
    change_language: 'भाषा बदलें',
    
    // Header
    welcome_back: 'वापसी पर स्वागत है',
    settings: 'सेटिंग्स',
    logout: 'लॉग आउट',
    
    // Navigation
    home: 'होम',
    market_tab: 'बाज़ार',
    sell: 'बेचें',
    history: 'इतिहास',
    mandi: 'मंडी',
    
    // Main sections
    quick_actions: 'त्वरित कार्य',
    active_crops: 'सक्रिय फसलें',
    market_news: 'बाज़ार समाचार',
    weather: 'मौसम',
    
    // Quick Actions
    add_crop: 'फसल जोड़ें',
    predict_price: 'मूल्य का अनुमान',
    add_expense: 'खर्च जोड़ें',
    sell_crop: 'फसल बेचें',
    
    // Crop Watchlist
    crop_watchlist: 'फसल वॉचलिस्ट',
    view_all: 'सभी देखें',
    
    // Active Crops
    total_investment: 'कुल निवेश',
    days_left: 'दिन बचे',
    no_crops_message: 'अभी तक कोई फसल नहीं जोड़ी गई। अपनी पहली फसल जोड़कर शुरुआत करें!',
    
    // Crop Status
    land_preparation: 'भूमि तैयारी',
    sowing: 'बुआई',
    growing: 'बढ़ रहा है',
    ready_to_harvest: 'कटाई के लिए तैयार',
    harvested: 'कटाई हो गई',
    
    // Weather
    todays_weather: 'आज का मौसम',
    humidity: 'नमी',
    wind: 'हवा',
    feels_like: 'महसूस होता है',
    sunny: 'धूप',
    partly_cloudy: 'आंशिक बादल',
    cloudy: 'बादल',
    light_rain: 'हल्की बारिश',
    
    // Common
    back: 'वापस',
    save: 'सेव करें',
    cancel: 'रद्द करें',
    add: 'जोड़ें',
    update: 'अपडेट करें',
    delete: 'हटाएं',
    
    // News categories
    market_alert: 'बाज़ार अलर्ट',
    policy_update: 'नीति अपडेट',
    weather_update: 'मौसम अपडेट',
    
    // Crop management additional
    active_crops_title: 'सक्रिय फसलें',
    add_crop_button: 'फसल जोड़ें',
    add_new_crop: 'नई फसल जोड़ें',
    search_crop_placeholder: 'फसल का नाम खोजें या टाइप करें',
    start_date_label: 'शुरुआत की तारीख',
    acres_label: 'एकड़',
    acres_placeholder: 'एकड़ दर्ज करें (जैसे 2.5)',
    no_crops_added: 'अभी तक कोई फसल नहीं जोड़ी गई',
    add_now: 'अभी जोड़ें',
    started: 'शुरू किया गया',
    total_expenses_label: 'कुल खर्च',
    
    // Time
    hours_ago: 'घंटे पहले',
    two_hours_ago: '2 घंटे पहले',
    four_hours_ago: '4 घंटे पहले',
    six_hours_ago: '6 घंटे पहले',
    
    // News titles
    wheat_price_surge: 'आपूर्ति की चिंताओं के बीच गेहूं की कीमतों में 5% की तेजी',
    govt_subsidy_news: 'जैविक खेती के लिए नई सरकारी सब्सिडी की घोषणा',
    monsoon_forecast: 'मानसून पूर्वानुमान: इस सीजन सामान्य बारिश की उम्मीद',
    
    // Survey
    survey_title: 'अपने बारे में बताएं',
    survey_subtitle: 'अपने अनुभव को व्यक्तिगत बनाने में हमारी मदद करें',
    name: 'पूरा नाम',
    state: 'राज्य',
    district: 'जिला',
    survey_market: 'पसंदीदा बाज़ार',
    crops: 'आप जो फसलें उगाते हैं',
    complete_survey: 'सेटअप पूरा करें',
    
    // Crop Management
    crop_name: 'फसल का नाम',
    start_date: 'खेती शुरू करने की तारीख',
    acres: 'रोपण एकड़',
    current_status: 'वर्तमान स्थिति',
    expenses: 'खर्चे',
    add_new_expense: 'नया खर्च जोड़ें',
    expense_amount: 'राशि',
    payment_method: 'भुगतान विधि',
    cash: 'नकद',
    upi: 'यूपीआई',
    notes: 'नोट्स',
    total_expenses: 'कुल खर्च'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('selectedLanguage') || 'en';
  });

  const handleSetLanguage = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem('selectedLanguage', lang);
  };

  const t = (key: string): string => {
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
