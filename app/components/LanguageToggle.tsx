'use client';

import { useLanguage } from '@/app/contexts/LanguageContext';
import { motion } from 'framer-motion';
import Image from 'next/image';

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative"
    >
      <div 
        onClick={toggleLanguage}
        className="relative w-16 h-8 bg-background/80 backdrop-blur-sm border border-primary/20 rounded-full cursor-pointer overflow-hidden transition-all duration-300 hover:border-primary/40"
      >
        {/* Background track */}
        <div className="absolute inset-0 bg-gradient-to-r from-muted to-muted-foreground/20 rounded-full" />
        
        {/* Sliding button */}
        <motion.div
          className="absolute top-0.5 w-7 h-7 bg-white rounded-full shadow-lg border border-primary/10 flex items-center justify-center"
          animate={{
            x: language === 'fr' ? 2 : 34,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30
          }}
        >
          <Image
            src={language === 'fr' ? '/fr.png' : '/us.png'}
            alt={language === 'fr' ? 'Français' : 'English'}
            width={16}
            height={16}
            className="w-4 h-4 object-cover rounded-sm"
          />
        </motion.div>
        
        {/* Static flags in background */}
        <div className="absolute inset-0 flex items-center justify-between px-1">
          <div className="w-6 h-6 flex items-center justify-center">
            <Image
              src="/fr.png"
              alt="Français"
              width={12}
              height={12}
              className={`w-3 h-3 object-cover rounded-sm transition-opacity ${
                language === 'fr' ? 'opacity-30' : 'opacity-60'
              }`}
            />
          </div>
          <div className="w-6 h-6 flex items-center justify-center">
            <Image
              src="/us.png"
              alt="English"
              width={12}
              height={12}
              className={`w-3 h-3 object-cover rounded-sm transition-opacity ${
                language === 'en' ? 'opacity-30' : 'opacity-60'
              }`}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LanguageToggle;