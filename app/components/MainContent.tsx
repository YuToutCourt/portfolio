'use client';


import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/app/contexts/LanguageContext';
import Experience from './Experience';
import Education from './Education';


const MainContent = () => {
  const { t } = useLanguage();
  
  return (
    <section id="about" className="pt-8 pb-20 bg-muted/30">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t('maincontent.title')}
          </h2>
          <Separator className="w-24 mx-auto mb-8 bg-primary h-1" />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('maincontent.description')}
          </p>
        </div>

        {/* Two column layout with visible separator */}
        <div className="relative">
          {/* Central separator line - prominent white line */}
          <div className="hidden lg:block absolute left-1/2 top-16 bottom-16 w-px bg-white transform -translate-x-1/2 z-10"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left side - Experience */}
            <div className="lg:pr-10">
              <Experience />
            </div>

            {/* Right side - Education */}
            <div className="lg:pl-10">
              <Education />
            </div>
          </div>
        </div>


      </div>
    </section>
  );
};

export default MainContent;