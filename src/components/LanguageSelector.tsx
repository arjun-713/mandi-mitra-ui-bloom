
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage, Language } from '@/contexts/LanguageContext';

const LanguageSelector = () => {
  const { language, setLanguage, t } = useLanguage();

  const languages = [
    { code: 'en' as Language, name: 'English' },
    { code: 'hi' as Language, name: 'हिंदी' },
    { code: 'kn' as Language, name: 'ಕನ್ನಡ' },
    { code: 'ta' as Language, name: 'தமிழ்' },
    { code: 'te' as Language, name: 'తెలుగు' },
    { code: 'ml' as Language, name: 'മലയാളം' },
  ];

  return (
    <div className="w-full">
      <Select value={language} onValueChange={setLanguage}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={t('change_language')} />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              {lang.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
