'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  fr: {
    // Hero
    'hero.description': '24 ans, Pentesteur chez Thales, diplômé d\'un Master en Cybersécurité. Je conçois des outils qui automatisent jusqu\'à 50 % du travail en pentest et développe des solutions personnalisées pour les opérations Red Team.',
    'hero.badges.devsecops': 'DevSecOps',
    'hero.badges.pentesting': 'Pentesting',
    'hero.badges.redteam': 'Red Team',
    'hero.skills.title': 'Compétences & Expertise',
    'hero.skills.description': 'Domaines de spécialisation en cybersécurité',
    'hero.button.contact': 'Contactez-moi',
    'hero.button.journey': 'Voir mon parcours',
    
    // Skills specializations
    'skills.devsecops.title': 'DevSecOps',
    'skills.devsecops.description': 'Développement sécurisation et déploiement de solution de reporting',
    'skills.pentesting.title': 'Pentesting',
    'skills.pentesting.description': 'Tests d\'intrusion et évaluation de sécurité avec rédaction de rapport',
    'skills.redteam.title': 'Red Team',
    'skills.redteam.description': 'Création d\'outils offensifs sur mesure',
    'skills.automation.title': 'Automation',
    'skills.automation.description': 'Scripts et outils pour simplifier le quotidien',
    
    // Education
    'education.title': 'Formation Académique',
    'education.master': 'Master en Cybersécurité',
    'education.bachelor': 'Bachelor en Cybersécurité',
    'education.dut': 'DUT Informatique',
    'education.status.graduated': 'Diplômé',
    'education.status.inprogress': 'En cours',
    'education.major.promotion': 'Major de promotion • 1er/21',
    'education.excellent': 'Excellent • 2ème/21',
    'education.master.description': 'Formation avancée : Investigation Numérique (Computer/Memory/Mobile/Networks Forensics), Sécurité (Cryptographie, IOT, Systems), Préparation certifications (OSCP, CISSP, CISA), Audit & Tests d\'intrusion, RedTeam, Cloud & IAM.',
    'education.bachelor.description': 'Formation complète en cybersécurité : Développement (C, Python, Assembleur x86), Réseaux (CCNA), Systèmes (Linux, Git), Sécurité (Préparation CEH, Cryptographie, Pentesting, Hardening), Gestion de projets SI.',
    'education.dut.description': 'Formation technique complète : Algorithmique et Programmation, Architecture Systèmes et Réseaux, Génie Logiciel, Mathématiques, Économie-Gestion, Langues-Communication.',
    'education.master.specialnote': 'Certification Professionnelle Expert en Architectures Systèmes-Réseaux et Sécurité Informatique (RNCP36296)',
    'education.bachelor.specialnote': 'Certification Professionnelle Chef de Projet Systèmes, Réseaux et Sécurité (RNCP39115)',
    'education.dut.specialnote': 'Diplôme Universitaire de Technologie, spécialité Informatique',
    
    // Experience
    'experience.title': 'Expérience Professionnelle',
    'experience.thales.position': 'Ingénieur Pentesting en Cybersécurité',
    'experience.ponant.position': 'Validation des tests de fin de production',
    'experience.pn.position': 'Professeur d\'Informatique',
    'experience.type.apprenticeship': 'Alternance',
    'experience.type.internship': 'Stage',
    'experience.type.volunteer': 'Bénévolat',
    'experience.missions': 'Missions :',
    'experience.skills': 'Compétences :',
    'experience.thales.description': 'Développement et amélioration d\'outils Red Team, création de plugins BurpSuite, amélioration de PwnDoc et intégration DefectDojo.',
    'experience.ponant.description': 'Création et imagination de nouvelles façons de tester le robot eTASQ Motion, automatisation des tests et correction de bugs.',
    'experience.pn.description': 'Enseignement de l\'informatique, gestion de groupes, correction d\'exercices d\'algorithmes Python et échanges en anglais.',
    
    // Platforms
    'platforms.title': 'Mes Profils',
    'platforms.description': 'Découvrez mon activité sur GitHub, RootMe et HackTheBox',
    
    // Main Content
    'maincontent.title': 'Mon Parcours',
    'maincontent.description': 'Découvrez mon expérience professionnelle et mon parcours académique ',
    
    // Footer
    'footer.follow': 'Suivez-moi',
    'footer.made': 'Fait avec ❤️, Next.js et Shadcn',
    'footer.navigation': 'Navigation',
    'footer.home': 'Accueil',
    'footer.journey': 'Parcours',
    'footer.profiles': 'Mes Profils',
    
    // GitHub Platform
    'github.title': 'GitHub',
    'github.subtitle': '@YuToutCourt • DevSecOps',
    'github.repositories': 'Repositories',
    'github.followers': 'Followers',
    'github.following': 'Following',
    'github.stats': 'Statistiques',
    'github.stats.title': 'Stats',
    'github.languages': 'Langages',
    'github.contribution.title': 'Contributions',
    
    // RootMe Platform
    'rootme.title': 'RootMe',
    'rootme.subtitle': 'Yù • Enthusiast',
    'rootme.place': 'Place',
    'rootme.points': 'Points',
    'rootme.challenges': 'Challenges',
    'rootme.validations': 'Validations',
    'rootme.solved': 'challenges résolus',
    'rootme.recent.activity': 'Activité récente',
    'rootme.recent.week': 'il y a 1 semaine',
    'rootme.recent.month': 'il y a 1 mois',
    
    // HackTheBox Platform
    'htb.title': 'HackTheBox',
    'htb.subtitle': 'YuToutCourt • Hacker',
    'htb.global.ranking': 'Global Ranking',
    'htb.points': 'Points',
    'htb.total.owns': 'Total Owns',
    'htb.rank.progress': 'Rank Progress',
    'htb.towards': 'towards',
    'htb.statistics': 'Statistics',
    'htb.user.owns': 'User Owns',
    'htb.system.owns': 'System Owns',
    'htb.user.bloods': 'User Bloods',
    'htb.system.bloods': 'System Bloods',
    'htb.respect': 'Respect',
    'htb.plan.type': 'Plan Type',
    'htb.rank.hacker': 'Hacker',
    'htb.rank.prohacker': 'Pro Hacker',
    'htb.plan.free': 'FREE',
    
    // Experience missions (Thales)
    'experience.thales.missions.1': 'Développement et amélioration d\'outils Red Team (Implants)',
    'experience.thales.missions.2': 'Amélioration de PwnDoc pour la génération automatisée de rapports',
    'experience.thales.missions.3': 'Intégration DefectDojo et automatisation des tâches de pentest',
    'experience.thales.missions.4': 'Création d\'un outils de reporting pour les pentests. IA powered',
    
    // Experience missions (PONANT)
    'experience.ponant.missions.1': 'Créer et imaginer de nouvelles façons de tester le robot eTASQ Motion',
    'experience.ponant.missions.2': 'Automatiser les tests',
    'experience.ponant.missions.3': 'Corriger les bugs dans le robot eTASQ Motion',
    'experience.ponant.missions.4': 'Implantation de nouvelles fonctionnalités dans le robot eTASQ Motion',
    
    // Experience missions (PN Cambodia)
    'experience.pn.missions.1': 'Gestion de groupes d\'étudiants',
    'experience.pn.missions.2': 'Correction d\'exercices d\'algorithmes Python',
    'experience.pn.missions.3': 'Échanges en anglais avec les étudiants',
    
    // Technologies
    'tech.python': 'Python',
    'tech.javascript': 'JavaScript',
    'tech.java': 'Java',
    'tech.docker': 'Docker',
    'tech.burpsuite': 'Burp Suite',
    'tech.ghidra': 'Ghidra',
    'tech.anglais': 'Anglais',
    'tech.automatisation': 'Automatisation',
    'tech.tests': 'Tests',
    'tech.reflexion': 'Réflexion d\'ingénieur',
    'tech.enseignement': 'Enseignement',
    'tech.gestion': 'Gestion de groupe',
    
    // Locations and Status
    'location.france': 'France',
    'location.fromhome': 'France',
    'status.graduated': 'Diplômé',
    'status.apprenticeship': 'Alternance',
    'status.internship': 'Stage',
    'status.volunteer': 'Bénévolat',
    
    // Company names (keeping original but with context)
    'company.thales': 'Thales',
    'company.ponant': 'PONANT Technologies',
    'company.pn': 'Passerelle Numérique Cambodia',
    'company.esgi': 'ESGI - École Supérieure de Génie Informatique',
    'company.uga': 'UGA',
    
    // Dates - Experience
    'dates.exp.thales': 'Septembre 2022 - Septembre 2025',
    'dates.exp.ponant': 'Mars 2022 - Juin 2022',
    'dates.exp.pn': 'Juin 2021 - Juillet 2021',
    
    // Dates - Education
    'dates.edu.master': 'Septembre 2023 - Septembre 2025',
    'dates.edu.bachelor': 'Octobre 2022 - Août 2023',
    'dates.edu.dut': 'Septembre 2020 - Juillet 2022',
    
    // Common
    'common.france': 'France',
    'common.loading': 'Chargement des plateformes...',
    'common.refresh': 'Actualiser',
    'common.error': 'Erreur',
  },
  en: {
    // Hero
    'hero.description': '24 years old, Pentester at Thales, graduated with a Master\'s in Cybersecurity. I design tools that automate up to 50% of pentest work and develop custom solutions for Red Team operations.',
    'hero.badges.devsecops': 'DevSecOps',
    'hero.badges.pentesting': 'Pentesting',
    'hero.badges.redteam': 'Red Team',
    'hero.skills.title': 'Skills & Expertise',
    'hero.skills.description': 'Cybersecurity specialization areas',
    'hero.button.contact': 'Contact me',
    'hero.button.journey': 'View my journey',
    
    // Skills specializations
    'skills.devsecops.title': 'DevSecOps',
    'skills.devsecops.description': 'Secure development and deployment of reporting solutions',
    'skills.pentesting.title': 'Pentesting',
    'skills.pentesting.description': 'Penetration testing and security assessment',
    'skills.redteam.title': 'Red Team',
    'skills.redteam.description': 'Advanced intrusion tools development',
    'skills.automation.title': 'Automation',
    'skills.automation.description': 'Pentesting scripts and tools',
    
    // Education
    'education.title': 'Academic Background',
    'education.master': 'Master in Cybersecurity',
    'education.bachelor': 'Bachelor in Cybersecurity',
    'education.dut': '2nd year Degree in Computer Science',
    'education.status.graduated': 'Graduated',
    'education.status.inprogress': 'In Progress',
    'education.major.promotion': 'Valedictorian • 1st/21',
    'education.excellent': 'Excellent • 2nd/21',
    'education.master.description': 'Advanced training: Digital Investigation (Computer/Memory/Mobile/Networks Forensics), Security (Cryptography, IOT, Systems), Preparation Certifications (OSCP, CISSP, CISA), Audit & Penetration Testing, RedTeam, Cloud & IAM.',
    'education.bachelor.description': 'Complete cybersecurity training: Development (C, Python, x86 Assembly), Networks (CCNA), Systems (Linux, Git), Security (Preparation CEH, Cryptography, Pentesting, Hardening), IT Project Management.',
    'education.dut.description': 'Complete technical training: Algorithms and Programming, Systems and Networks Architecture, Software Engineering, Mathematics, Economics-Management, Languages-Communication.',
    'education.master.specialnote': 'Professional Certification Expert in Systems-Networks Architectures and Computer Security (RNCP36296)',
    'education.bachelor.specialnote': 'Professional Certification Systems, Networks and Security Project Manager (RNCP39115)',
    'education.dut.specialnote': 'University Diploma of Technology, Computer Science specialty',
    
    // Experience
    'experience.title': 'Professional Experience',
    'experience.thales.position': 'Cybersecurity Pentesting Engineer',
    'experience.ponant.position': 'End-of-production test validation',
    'experience.pn.position': 'Computer Science Teacher',
    'experience.type.apprenticeship': 'Apprenticeship',
    'experience.type.internship': 'Internship',
    'experience.type.volunteer': 'Volunteer',
    'experience.missions': 'Missions:',
    'experience.skills': 'Skills:',
    'experience.thales.description': 'Development and improvement of Red Team tools, creation of BurpSuite plugins, PwnDoc enhancement and DefectDojo integration.',
    'experience.ponant.description': 'Creation and imagination of new ways to test the eTASQ Motion robot, test automation and bug fixes.',
    'experience.pn.description': 'Computer science teaching, group management, Python algorithm exercise correction and English exchanges.',
    
    // Platforms
    'platforms.title': 'My Profiles',
    'platforms.description': 'Discover my activity on GitHub, RootMe and HackTheBox',
    
    // Main Content
    'maincontent.title': 'My Journey',
    'maincontent.description': 'Discover my professional experience and academic background',
    
    // Footer
    'footer.follow': 'Follow me',
    'footer.made': 'Made with ❤️, Next.js and Shadcn',
    'footer.navigation': 'Navigation',
    'footer.home': 'Home',
    'footer.journey': 'Journey',
    'footer.profiles': 'My Profiles',
    
    // GitHub Platform
    'github.title': 'GitHub',
    'github.subtitle': '@YuToutCourt • DevSecOps',
    'github.repositories': 'Repositories',
    'github.followers': 'Followers',
    'github.following': 'Following',
    'github.stats': 'Statistics',
    'github.stats.title': 'Stats',
    'github.languages': 'Languages',
    'github.contribution.title': 'Contributions',
    
    // RootMe Platform
    'rootme.title': 'RootMe',
    'rootme.place': 'Place',
    'rootme.points': 'Points',
    'rootme.challenges': 'Challenges',
    'rootme.validations': 'Validations',
    'rootme.solved': 'challenges solved',
    'rootme.recent.activity': 'Recent Activity',
    'rootme.recent.week': '1 week ago',
    'rootme.recent.month': '1 month ago',
    
    // HackTheBox Platform
    'htb.title': 'HackTheBox',
    'htb.global.ranking': 'Global Ranking',
    'htb.points': 'Points',
    'htb.total.owns': 'Total Owns',
    'htb.rank.progress': 'Rank Progress',
    'htb.towards': 'towards',
    'htb.statistics': 'Statistics',
    'htb.user.owns': 'User Owns',
    'htb.system.owns': 'System Owns',
    'htb.user.bloods': 'User Bloods',
    'htb.system.bloods': 'System Bloods',
    'htb.respect': 'Respect',
    'htb.plan.type': 'Plan Type',
    'htb.rank.hacker': 'Hacker',
    'htb.rank.prohacker': 'Pro Hacker',
    'htb.plan.free': 'FREE',
    
    // Experience missions (Thales)
    'experience.thales.missions.1': 'Development and improvement of Red Team tools (Implants)',
    'experience.thales.missions.2': 'PwnDoc enhancement for automated report generation',
    'experience.thales.missions.3': 'DefectDojo integration and pentest task automation',
    'experience.thales.missions.4': 'Creation of AI-powered reporting tool for pentests',
    
    // Experience missions (PONANT)
    'experience.ponant.missions.1': 'Create and imagine new ways to test the eTASQ Motion robot',
    'experience.ponant.missions.2': 'Automate tests',
    'experience.ponant.missions.3': 'Fix bugs in the eTASQ Motion robot',
    'experience.ponant.missions.4': 'Implementation of new features in the eTASQ Motion robot',
    
    // Experience missions (PN Cambodia)
    'experience.pn.missions.1': 'Student group management',
    'experience.pn.missions.2': 'Python algorithm exercise correction',
    'experience.pn.missions.3': 'English exchanges with students',
    
    // Technologies
    'tech.python': 'Python',
    'tech.javascript': 'JavaScript',
    'tech.java': 'Java',
    'tech.docker': 'Docker',
    'tech.burpsuite': 'Burp Suite',
    'tech.ghidra': 'Ghidra',
    'tech.anglais': 'English',
    'tech.automatisation': 'Automation',
    'tech.tests': 'Testing',
    'tech.reflexion': 'Engineering thinking',
    'tech.enseignement': 'Teaching',
    'tech.gestion': 'Group management',
    
    // Locations and Status
    'location.france': 'France',
    'location.fromhome': 'FROM HOME, France',
    'status.graduated': 'Graduated',
    'status.apprenticeship': 'Apprenticeship',
    'status.internship': 'Internship',
    'status.volunteer': 'Volunteer',
    
    // Company names (keeping original but with context)
    'company.thales': 'Thales',
    'company.ponant': 'PONANT Technologies',
    'company.pn': 'Passerelle Numérique Cambodia',
    'company.esgi': 'ESGI - École Supérieure de Génie Informatique',
    'company.uga': 'UGA',
    
    // Dates - Experience
    'dates.exp.thales': 'September 2022 - September 2025',
    'dates.exp.ponant': 'March 2022 - June 2022',
    'dates.exp.pn': 'June 2021 - July 2021',
    
    // Dates - Education
    'dates.edu.master': 'September 2023 - September 2025',
    'dates.edu.bachelor': 'October 2022 - August 2023',
    'dates.edu.dut': 'September 2020 - July 2022',
    
    // Common
    'common.france': 'France',
    'common.loading': 'Loading platforms...',
    'common.refresh': 'Refresh',
    'common.error': 'Error',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('fr');

  // Charger la langue depuis localStorage au démarrage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'fr' || savedLanguage === 'en')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[Language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};