import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Récupérer les variables d'environnement
    const HTB_API_KEY = process.env.HTB_API_KEY;
    const HTB_USER_ID = process.env.HTB_USER_ID; // ID numérique selon la doc officielle

    if (!HTB_API_KEY) {
      throw new Error('HTB_API_KEY not configured');
    }

    if (!HTB_USER_ID) {
      throw new Error('HTB_USER_ID not configured');
    }

    // Utiliser l'API officielle selon la documentation T-Crypt
    // Endpoint pour obtenir les informations de profil public
    const response = await fetch(`https://www.hackthebox.com/api/v4/user/profile/basic/${HTB_USER_ID}`, {
      headers: {
        'Authorization': `Bearer ${HTB_API_KEY}`,
        'Accept': 'application/json',
        'User-Agent': 'Portfolio-App/1.0'
      },
      next: { revalidate: 300 } // Cache pendant 5 minutes
    });

    if (!response.ok) {
      console.error(response);
      console.error(response.status);
      console.error(response.statusText);
      console.error(response.body);
      console.error(response.headers);
      console.error(response.url);
      console.error(response.ok);
      console.error(response.json());
      console.error(response.text());
      throw new Error(`HTB API responded with status: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    
    // Structure basée sur la nouvelle API de Gubarz
    const profile = data.profile || data;

    if (!profile) {

      throw new Error('No profile data returned from HTB API');
    }

    // L'activité récente nécessite des endpoints différents selon la doc
    // Nous utiliserons les données de base pour générer l'activité
    // (L'endpoint activity n'est pas documenté dans les sources disponibles)

    // Extraire les données selon la structure moderne
    const stats = {
      rank: profile.rank || 'Hacker (default data due to API error)',
      points: profile.points || 24,
      userOwns: profile.user_owns || 16,
      rootOwns: profile.system_owns || 13,
      respect: profile.respects || 2,
      ranking: profile.ranking || 959,
      userBloods: profile.user_bloods || 0,
      systemBloods: profile.system_bloods || 0,
      challenges: (profile.user_owns || 0) + (profile.system_owns || 0),
      isVip: profile.isVip || false,
      country: profile.country_name || 'Unknown',
      currentRankProgress: profile.current_rank_progress || 0,
      nextRank: profile.next_rank || 'Pro Hacker',
      profileUrl: `https://app.hackthebox.com/profile/${HTB_USER_ID}`,
      lastUpdated: new Date().toISOString()
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching HackTheBox data:', error, process.env.HTB_API_KEY, process.env.HTB_USER_ID);
    
    // Retourner des données de fallback en cas d'erreur
    const fallbackStats = {
      rank: 'Hacker (default data due to API error)',
      points: 24,
      userOwns: 16,
      rootOwns: 13,
      respect: 2,
      ranking: 959,
      userBloods: 1,
      systemBloods: 1,
      challenges: 29,
      isVip: true,
      country: 'France',
      currentRankProgress: 0,
      nextRank: 'Pro Hacker',
      profileUrl: `https://app.hackthebox.com/profile/${process.env.HTB_USER_ID || 'unknown'}`,
      lastUpdated: new Date().toISOString(),
      error: 'Using fallback data - Check HTB_API_KEY and HTB_USER_ID'
    };

    return NextResponse.json(fallbackStats);
  }
}