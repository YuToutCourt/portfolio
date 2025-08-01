'use client';

import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/app/contexts/LanguageContext';
import Image from 'next/image';

const Footer = () => {
  const { t } = useLanguage();
  
  const socialLinks = [
    {
      icon: Github,
      name: "GitHub", 
      url: "https://github.com/YuToutCourt/",
      isComponent: true,
    },
    {
      icon: "/discord.png",
      name: "Discord",
      url: "https://discord.com/users/297055773714808833",
      isComponent: false,
    }
  ];

  const quickLinks = [
    { name: t('footer.home'), href: "#home" },
    { name: t('footer.journey'), href: "#about" },
  ];

  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h4 className="text-xl font-bold text-foreground mb-6">Navigation</h4>
              <div className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.div key={index} whileHover={{ x: 5 }}>
                    <Button
                      onClick={() => scrollToSection(link.href)}
                      variant="ghost"
                      size="sm"
                      className="justify-start p-0 h-auto text-muted-foreground hover:text-foreground"
                    >
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      {link.name}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >

              {/* Social Links */}
              <div>
                <h5 className="text-lg font-semibold text-foreground mb-4">{t('footer.follow')}</h5>
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="outline"
                        size="icon"
                        asChild
                      >
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.name}
                        >
                          {social.isComponent ? (
                            <social.icon className="h-4 w-4" />
                          ) : (
                            <Image 
                              src={social.icon as string} 
                              alt={social.name} 
                              width={16} 
                              height={16} 
                              className="h-4 w-4 object-contain"
                            />
                          )}
                        </a>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <Separator />
      </div>
    </footer>
  );
};

export default Footer;