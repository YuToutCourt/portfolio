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
                <div className="w-52 h-52 rounded-full bg-gradient-to-br from-violet-500/20 via-cyan-500/20 to-pink-500/20 p-3 shadow-2xl">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-background to-muted/50 flex items-center justify-center border-2 border-primary/30">
                    <div className="w-40 h-40 rounded-full bg-gradient-to-br from-muted via-muted/50 to-background flex items-center justify-center overflow-hidden">
                      <Image 
                        src="/profile.png" 
                        alt="YùToutCourt" 
                        width={160} 
                        height={160} 
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
              <h1 className="text-4xl md:text-5xl font-bold mb-4 font-poppins">
                YùToutCourt
              </h1>
              
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-6">
                <Badge variant="outline" className="text-sm flex items-center gap-2 bg-gradient-to-r from-blue-100 to-cyan-100 border-blue-300 hover:shadow-md transition-all text-blue-800 font-medium">
                  <Image 
                    src="/py_logo.svg.png" 
                    alt="Python" 
                    width={12} 
                    height={12} 
                    className="w-3 h-3"
                  />
                  Python
                </Badge>
                <Badge variant="outline" className="text-sm flex items-center gap-2 bg-gradient-to-r from-orange-100 to-red-100 border-orange-300 hover:shadow-md transition-all text-orange-800 font-medium">
                  <Image 
                    src="/java.png" 
                    alt="Java" 
                    width={12} 
                    height={12} 
                    className="w-3 h-3"
                  />
                  Java
                </Badge>
                <Badge variant="outline" className="text-sm flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-300 hover:shadow-md transition-all text-yellow-800 font-medium">
                  <Image 
                    src="/js.png" 
                    alt="JavaScript" 
                    width={12} 
                    height={12} 
                    className="w-3 h-3"
                  />
                  JavaScript
                </Badge>   
                <Badge variant="outline" className="text-sm flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 border-blue-300 hover:shadow-md transition-all text-blue-800 font-medium">
                  <Image 
                    src="/docker.webp" 
                    alt="Docker" 
                    width={12} 
                    height={12} 
                    className="w-3 h-3"
                  />
                  Docker
                </Badge>             
                <Badge variant="outline" className="text-sm flex items-center gap-2 bg-gradient-to-r from-orange-100 to-yellow-100 border-orange-300 hover:shadow-md transition-all text-orange-800 font-medium">
                  <Image 
                    src="/burp_logo.png" 
                    alt="Burp Suite" 
                    width={12} 
                    height={12} 
                    className="w-3 h-3"
                  />
                  Burp Suite
                </Badge>
                <Badge variant="outline" className="text-sm flex items-center gap-2 bg-gradient-to-r from-green-100 to-teal-100 border-green-300 hover:shadow-md transition-all text-green-800 font-medium">
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
          <div className="lg:col-span-8 space-y-6 lg:pt-40">
            {/* Specializations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-4">
              {specializations.map((spec) => (
                <div key={spec.title}>
                  <Card className="relative overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-card to-card/50 border-primary/20 h-full">
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${spec.color} p-3 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <spec.icon className="w-full h-full text-white" />
                      </div>
                      <h3 className="font-semibold text-base mb-3 text-foreground group-hover:text-primary transition-colors">{spec.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{spec.description}</p>
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