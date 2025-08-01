'use client';

import { motion } from 'framer-motion';
import { MapPin, Clock, Briefcase, Bug } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/app/contexts/LanguageContext';
import Image from 'next/image';

const Experience = () => {
  const { t } = useLanguage();
  
  const experiences = [
    {
      company: t('company.thales'),
      position: t('experience.thales.position'),
      location: t('location.france'),
      type: t('status.apprenticeship'),
      period: t('dates.exp.thales'),
      missions: [
        "- " + t('experience.thales.missions.1'),
        "- " + t('experience.thales.missions.2'),
        "- " + t('experience.thales.missions.3'),
        "- " + t('experience.thales.missions.4')
      ],
      skills: [t('tech.python'), t('tech.javascript'), t('tech.burpsuite'), t('tech.docker'), t('tech.anglais')],
      icon: "/thales.png",
      color: "from-white to-white"
    },
    {
      company: t('company.ponant'),
      position: t('experience.ponant.position'),
      location: t('location.france'),
      type: t('status.internship'), 
      period: t('dates.exp.ponant'),
      missions: [
        "- " + t('experience.ponant.missions.1'),
        "- " + t('experience.ponant.missions.2'),
        "- " + t('experience.ponant.missions.3'),
        "- " + t('experience.ponant.missions.4')
      ],
      skills: [t('tech.automatisation'), t('tech.tests'), t('tech.python'), t('tech.reflexion')],
      icon: "/ponant.jpg",
      color: "from-white to-white"
    },
    {
      company: t('company.pn'),
      position: t('experience.pn.position'),
      location: t('location.fromhome'),
      type: t('status.volunteer'),
      period: t('dates.exp.pn'),
      missions: [
        "- " + t('experience.pn.missions.1'),
        "- " + t('experience.pn.missions.2'),
        "- " + t('experience.pn.missions.3')
      ],
      skills: [t('tech.python'), t('tech.enseignement'), t('tech.gestion'), t('tech.anglais')],
      icon: "/pn.png",
      color: "from-white to-white"
    }
  ];

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case t('status.apprenticeship'): return 'outline' as const;
      case t('status.internship'): return 'outline' as const;
      case t('status.volunteer'): return 'outline' as const;
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
        <Briefcase className="h-8 w-8 text-primary mr-3" />
        {t('experience.title')}
      </motion.h3>

      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary group hover:border-l-primary/80 bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 bg-gradient-to-r ${exp.color} rounded-lg flex items-center justify-center shadow-sm`}>
                      <Image 
                        src={exp.icon} 
                        alt={exp.company} 
                        width={50} 
                        height={50} 
                        className="h-8 w-8 object-contain"
                      />
                    </div>
                    <Badge variant={getBadgeVariant(exp.type)} className="text-xs">
                      {exp.type}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-lg font-bold leading-tight">
                  {exp.position}
                </CardTitle>
                <CardDescription className="text-base font-semibold text-primary">
                  {exp.company}
                </CardDescription>
                <div className="flex flex-wrap gap-3 text-muted-foreground text-xs mt-2">
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {exp.location}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {exp.period}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-2 pb-6">
                {/* Missions */}
                <div>
                  <h5 className="font-semibold text-foreground mb-2 flex items-center text-sm">
                    <Bug className="h-3 w-3 mr-1 text-primary" />
                    Missions :
                  </h5>
                  <ul className="space-y-1">
                    {exp.missions.slice(0, 4).map((mission, missionIndex) => (
                      <motion.li
                        key={missionIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: missionIndex * 0.1 }}
                        className="flex items-start text-muted-foreground text-xs"
                      >
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                        {mission}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Skills */}
                <div>
                  <h5 className="font-semibold text-foreground mb-2 text-sm">
                                       {t('experience.skills')}
                  </h5>
                  <div className="flex flex-wrap gap-1">
                    {exp.skills.slice(0, 5).map((skill, skillIndex) => (
                      <motion.div
                        key={skillIndex}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                      >
                        <Badge variant="secondary" className="text-xs px-2 py-0.5">
                          {skill}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Experience;