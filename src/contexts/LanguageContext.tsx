
import React, { createContext, useContext, useState } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Header
    welcome_back: 'Welcome back',
    settings: 'Settings',
    logout: 'Logout',
    
    // Navigation
    home: 'Home',
    market_tab: 'Market',
    sell: 'Sell',
    history: 'History',
    
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
    
    // Common
    back: 'Back',
    save: 'Save',
    cancel: 'Cancel',
    add: 'Add',
    update: 'Update',
    delete: 'Delete',
    
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
    // Header
    welcome_back: 'वापसी पर स्वागत है',
    settings: 'सेटिंग्स',
    logout: 'लॉग आउट',
    
    // Navigation
    home: 'होम',
    market_tab: 'बाज़ार',
    sell: 'बेचें',
    history: 'इतिहास',
    
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
    
    // Common
    back: 'वापस',
    save: 'सेव करें',
    cancel: 'रद्द करें',
    add: 'जोड़ें',
    update: 'अपडेट करें',
    delete: 'हटाएं',
    
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
  const [language, setLanguage] = useState('en');

  const t = (key: string): string => {
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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
