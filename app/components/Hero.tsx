'use client';

import { Shield, Terminal, Cpu, Cog } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/app/contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';

import Image from 'next/image';

const Hero = () => {
  const { t } = useLanguage();

  const specializations = [
    { 
      icon: Shield, 
      title: t('skills.devsecops.title'), 
      description: t('skills.devsecops.description'),
      color: "from-blue-500 to-blue-600"
    },
    { 
      icon: Terminal, 
      title: t('skills.pentesting.title'), 
      description: t('skills.pentesting.description'),
      color: "from-green-500 to-green-600"
    },
    { 
      icon: Cpu, 
      title: t('skills.redteam.title'), 
      description: t('skills.redteam.description'),
      color: "from-red-500 to-red-600"
    },
    { 
      icon: Cog, 
      title: t('skills.automation.title'), 
      description: t('skills.automation.description'),
      color: "from-indigo-500 to-indigo-600"
    }
  ];

  return (
    <section id="home" className="relative bg-background pb-12">
      {/* Language Toggle - Positioned at top right */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageToggle />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left side - Profile & Info */}
          <div className="lg:col-span-4 space-y-6">
            {/* Profile Image */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-2">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-background to-muted/50 flex items-center justify-center border-2 border-primary/20">
                                          <div className="w-36 h-36 rounded-full bg-gradient-to-br from-muted via-muted/50 to-background flex items-center justify-center overflow-hidden">
                        <Image 
                          src="/profile.png" 
                          alt="YùToutCourt" 
                          width={144} 
                          height={144} 
                          className="w-full h-full object-cover rounded-full"
                          priority
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAQABADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                        />
                      </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Name and Title */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                YùToutCourt
              </h1>
              
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-6">
                <Badge variant="outline" className="text-sm flex items-center gap-1">
                  <Image 
                    src="/py_logo.svg.png" 
                    alt="Python" 
                    width={12} 
                    height={12} 
                    className="w-3 h-3"
                  />
                  Python
                </Badge>
                <Badge variant="outline" className="text-sm flex items-center gap-1">
                <Image 
                    src="/java.png" 
                    alt="Java" 
                    width={12} 
                    height={12} 
                    className="w-3 h-3"
                  />
                  Java
                </Badge>
                <Badge variant="outline" className="text-sm flex items-center gap-1">
                <Image 
                    src="/js.png" 
                    alt="JavaScript" 
                    width={12} 
                    height={12} 
                    className="w-3 h-3"
                  />
                  JavaScript
                </Badge>   
                <Badge variant="outline" className="text-sm flex items-center gap-1">
                <Image 
                    src="/docker.webp" 
                    alt="Docker" 
                    width={12} 
                    height={12} 
                    className="w-3 h-3"
                  />
                  Docker
                </Badge>             
                <Badge variant="outline" className="text-sm flex items-center gap-1">
                <Image 
                    src="/burp_logo.png" 
                    alt="Burp Suite" 
                    width={12} 
                    height={12} 
                    className="w-3 h-3"
                  />
                  Burp Suite
                </Badge>
                <Badge variant="outline" className="text-sm flex items-center gap-1">
                <Image 
                    src="/ghidra_logo.png" 
                    alt="Ghidra" 
                    width={12} 
                    height={12} 
                    className="w-3 h-3"
                  />
                  Ghidra
                </Badge>
              </div>
              
              <p className="text-lg text-muted-foreground max-w-md mx-auto lg:mx-0">
                {t('hero.description')}
              </p>
            </div>
          </div>

          {/* Right side - Specializations Grid */}
          <div className="lg:col-span-8 space-y-6 lg:pt-35">

            {/* Specializations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {specializations.map((spec) => (
                <div key={spec.title}>
                  <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-card to-card/50 border-primary/20 h-full">
                    <CardContent className="p-4">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${spec.color} p-2 mb-3 group-hover:scale-105 transition-transform duration-200`}>
                        <spec.icon className="w-full h-full text-white" />
                      </div>
                      <h3 className="font-semibold text-sm mb-2 text-foreground">{spec.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{spec.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;