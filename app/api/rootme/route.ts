import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET() {
  try {
    // Récupérer la page du profil RootMe
    const response = await fetch('https://www.root-me.org/Yu', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      next: { revalidate: 600 } // Cache pendant 10 minutes
    });

    if (!response.ok) {
      throw new Error('Failed to fetch RootMe profile');
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Extraire les statistiques principales avec des sélecteurs plus spécifiques
    let place = '1506';
    let points = '4765';
    let challenges = '219';
    let compromissions = '5';

    // Approche plus simple : chercher par texte exact dans les éléments
    $('*').each((i, element) => {
      const $el = $(element);
      const text = $el.text().trim();
      
      if (text === 'Place') {
        const prevH3 = $el.prev('h3').text().trim();
        if (prevH3 && /^\d+$/.test(prevH3)) {
          place = prevH3;
        }
      } else if (text === 'Points') {
        const prevH3 = $el.prev('h3').text().trim();
        if (prevH3 && /^\d+$/.test(prevH3)) {
          points = prevH3;
        }
      } else if (text === 'Challenges') {
        const prevH3 = $el.prev('h3').text().trim();
        if (prevH3 && /^\d+$/.test(prevH3)) {
          challenges = prevH3;
        }
      } else if (text === 'Compromissions') {
        const prevH3 = $el.prev('h3').text().trim();
        if (prevH3 && /^\d+$/.test(prevH3)) {
          compromissions = prevH3;
        }
      }
    });

    // Extraire le pourcentage global
    const globalPercentage = $('.progress-bar').first().attr('style');
    const percentage = globalPercentage?.match(/width:\s*(\d+)%/)?.[1] || '36';

    // Extraire le rang/rank de l'utilisateur
    let rank = 'Enthusiast';
    const rankImg = $('img[src*="rang/"]').first();
    if (rankImg.length) {
      const rankSrc = rankImg.attr('src') || '';
      const rankMatch = rankSrc.match(/rang\/([^.]+)\.svg/);
      if (rankMatch) {
        rank = rankMatch[1].charAt(0).toUpperCase() + rankMatch[1].slice(1);
      }
    }

    // Extraire l'activité récente avec icônes
    const recentActivity: Array<{
      name: string;
      iconUrl: string;
      category: string;
      timeAgo: string;
      challengeUrl: string;
    }> = [];
    
    // Chercher dans la section "Activité récente"
    $('h3:contains("Activité récente")').next('ul').find('li').each((i, element) => {
      if (i < 5) { // Prendre les 5 dernières activités
        const $item = $(element);
        
        // Extraire l'URL de l'icône
        const iconSrc = $item.find('img').attr('src') || '';
        const iconUrl = iconSrc.startsWith('IMG/logo/') ? 
          `https://www.root-me.org/${iconSrc}` : iconSrc;
        
        // Extraire le nom du challenge
        const challengeName = $item.find('a').text().trim();
        
        // Extraire la catégorie depuis l'URL du lien
        const challengeUrl = $item.find('a').attr('href') || '';
        const categoryMatch = challengeUrl.match(/\/Challenges\/([^\/]+)\//);
        const category = categoryMatch ? categoryMatch[1].replace(/-/g, ' ') : 'Unknown';
        
        // Construire l'URL complète du challenge
        const fullChallengeUrl = challengeUrl.startsWith('http') ? 
          challengeUrl : `https://www.root-me.org/${challengeUrl}`;
        
        // Extraire le temps écoulé
        const timeAgo = $item.find('.right').text().trim() || 'récemment';
        
        if (challengeName && iconUrl) {
          recentActivity.push({
            name: challengeName,
            iconUrl,
            category,
            timeAgo,
            challengeUrl: fullChallengeUrl
          });
        }
      }
    });

    // Si pas d'activité trouvée via selector, utiliser les données de fallback avec icônes
    const fallbackActivity = [
      { name: 'Nginx - SSRF Misconfiguration', iconUrl: 'https://www.root-me.org/IMG/logo/rubon68.svg', category: 'Web Serveur', timeAgo: 'il y a 1 semaine', challengeUrl: 'https://www.root-me.org/fr/Challenges/Web-Serveur/Nginx-SSRF-Misconfiguration' },
      { name: 'Yaml - Deserialization', iconUrl: 'https://www.root-me.org/IMG/logo/rubon68.svg', category: 'Web Serveur', timeAgo: 'il y a 1 semaine', challengeUrl: 'https://www.root-me.org/fr/Challenges/Web-Serveur/Yaml-Deserialization' },
      { name: 'ELF x64 - Double free', iconUrl: 'https://www.root-me.org/IMG/logo/rubon203.svg', category: 'App Systeme', timeAgo: 'il y a 1 mois', challengeUrl: 'https://www.root-me.org/fr/Challenges/App-Systeme/ELF-x64-Double-free' },
      { name: 'ELF x64 - Basic heap overflow', iconUrl: 'https://www.root-me.org/IMG/logo/rubon203.svg', category: 'App Systeme', timeAgo: 'il y a 1 mois', challengeUrl: 'https://www.root-me.org/fr/Challenges/App-Systeme/ELF-x64-Basic-heap-overflow' },
      { name: 'XMPP - Authentication', iconUrl: 'https://www.root-me.org/IMG/logo/rubon182.svg', category: 'Reseau', timeAgo: 'il y a 2 mois', challengeUrl: 'https://www.root-me.org/fr/Challenges/Reseau/XMPP-Authentification' },
      { name: 'Windows - NTDS Extraction de secrets', iconUrl: 'https://www.root-me.org/IMG/logo/rubon208.svg', category: 'Forensic', timeAgo: 'il y a 3 mois', challengeUrl: 'https://www.root-me.org/fr/Challenges/Forensic/Windows-NTDS-Extraction-de-secrets' },
      { name: 'Docker layers', iconUrl: 'https://www.root-me.org/IMG/logo/rubon208.svg', category: 'Forensic', timeAgo: 'il y a 3 mois', challengeUrl: 'https://www.root-me.org/fr/Challenges/Forensic/Docker-layers' },
      { name: 'Windows - Group Policy Preferences Passwords', iconUrl: 'https://www.root-me.org/IMG/logo/rubon70.svg', category: 'Realiste', timeAgo: 'il y a 3 mois', challengeUrl: 'https://www.root-me.org/fr/Challenges/Realiste/Windows-Group-Policy-Preferences-Passwords' }
    ];

    // Extraire les badges/validations par catégorie
    const validations: { [key: string]: number } = {};
    $('.progress-category').each((i, element) => {
      const category = $(element).find('.category-name').text().trim();
      const count = $(element).find('.category-count').text().trim();
      if (category && count) {
        validations[category] = parseInt(count) || 0;
      }
    });

    const stats = {
      place: parseInt(place) || 1506,
      points: parseInt(points) || 4765,
      challenges: parseInt(challenges) || 219,
      compromissions: parseInt(compromissions) || 5,
      percentage: parseInt(percentage) || 36,
      totalChallenges: 602, // Nombre total approximatif de challenges sur RootMe
      rank: rank,
      recentActivity: recentActivity.length > 0 ? recentActivity : fallbackActivity,
      validations,
      lastUpdated: new Date().toISOString()
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching RootMe data:', error);
    
    // Retourner des données de fallback en cas d'erreur
    const fallbackStats = {
      place: 1506,
      points: 4765,
      challenges: 219,
      compromissions: 5,
      percentage: 36,
      totalChallenges: 602,
      rank: 'Enthusiast',
      recentActivity: [
        'Nginx - SSRF Misconfiguration',
        'Yaml - Deserialization', 
        'ELF x64 - Double free',
        'ELF x64 - Basic heap overflow',
        'ELF x86 - Stack buffer overflow basic 3',
        'PE32 - Stack buffer overflow basic',
        'XMPP - Authentication',
        'Windows - NTDS Extraction de secrets',
        'Docker layers',
        'Windows - Group Policy Preferences Passwords'
      ],
      validations: {},
      lastUpdated: new Date().toISOString(),
      error: 'Using fallback data'
    };

    return NextResponse.json(fallbackStats);
  }
}