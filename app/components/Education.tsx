'use client';

import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Clock, Award } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/app/contexts/LanguageContext';
import Image from 'next/image';

const Education = () => {
  const { t } = useLanguage();
  
  const education = [
    {
      institution: t('company.esgi'),
      degree: t('education.master'),
      location: t('location.france'),
      status: t('status.graduated'),
      period: t('dates.edu.master'),
      description: t('education.master.description'),
      specialNote: t('education.master.specialnote'),
      icon: "/esgi.png",
      highlight: "Master",
      special: true,
      color: "from-white to-white"
    },
    {
      institution: t('company.esgi'),
      degree: t('education.bachelor'),
      location: t('location.france'),
      status: t('status.graduated'),
      period: t('dates.edu.bachelor'),
      description: t('education.bachelor.description'),
      specialNote: t('education.bachelor.specialnote'),
      icon: "/esgi.png",
      highlight: "Bachelor",
      special: true,
      color: "from-white to-white"
    },
    {
      institution: t('company.uga'),
      degree: t('education.dut'),
      location: t('location.france'),
      status: t('status.graduated'),
      period: t('dates.edu.dut'),
      description: t('education.dut.description'),
      specialNote: t('education.dut.specialnote'),
      icon: "/iut.png",
      highlight: "DUT",
      special: false,
      color: "from-white to-white"
    }
  ];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case t('education.status.inprogress'): return 'default' as const;
      case t('status.graduated'): case 'Validé': return 'secondary' as const;
      default: return 'outline' as const;
    }
  };

  return (
    <div>
      <motion.h3 
        className="text-3xl font-bold text-foreground mb-8 flex items-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <GraduationCap className="h-8 w-8 text-primary mr-3" />
        {t('education.title')}
      </motion.h3>

      <div className="space-y-6">
        {education.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.15 }}
          >
            <Card className="hover:shadow-xl transition-all duration-300 border-r-4 border-r-primary group hover:border-r-primary/80 bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className={`w-10 h-10 bg-gradient-to-r ${edu.color} rounded-lg flex items-center justify-center shadow-sm`}>
                      <Image 
                        src={edu.icon} 
                        alt={edu.institution} 
                        width={50} 
                        height={50} 
                        className="h-8 w-8 object-contain"
                      />
                    </div>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs">
                        {edu.highlight}
                      </Badge>
                      {edu.special && (
                        <>
                          {edu.degree.includes('Bachelor') ? (
                            <Badge variant="default" className="text-xs shine-effect text-white border-yellow-500 relative overflow-hidden">
                              <Award className="h-3 w-3 mr-1 relative z-10" />
                              <span className="relative z-10">{t('education.major.promotion')}</span>
                            </Badge>
                          ) : (
                            <Badge variant="default" className="text-xs silver-effect text-white border-gray-400 relative overflow-hidden">
                              <Award className="h-3 w-3 mr-1 relative z-10" />
                              <span className="relative z-10">{t('education.excellent')}</span>
                            </Badge>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  <Badge variant={getStatusVariant(edu.status)} className="text-xs">
                    {edu.status}
                  </Badge>
                </div>
                <CardTitle className="text-lg font-bold leading-tight">
                  {edu.degree}
                </CardTitle>
                <CardDescription className="text-base font-semibold text-primary">
                  {edu.institution}
                </CardDescription>
                <div className="flex flex-wrap gap-3 text-muted-foreground text-xs mt-2">
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {edu.location}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {edu.period}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 pt-2 pb-6">
                {/* Description */}
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {edu.description}
                </p>

                {/* Special note */}
                {edu.specialNote && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="bg-primary/5 border border-primary/20 rounded-lg p-3"
                  >
                    <div className="flex items-center">
                      <Award className="h-4 w-4 text-primary mr-2" />
                      <span className="font-semibold text-primary text-xs">
                        {edu.specialNote}
                      </span>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Education;