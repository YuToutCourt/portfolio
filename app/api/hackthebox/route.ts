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

    // Utiliser l'API officielle. Certains environnements (prod) exigent app.hackthebox.com et des en-têtes réalistes
    let response = await fetch(`https://app.hackthebox.com/api/v4/user/profile/basic/${HTB_USER_ID}`, {
      headers: {
        Authorization: `Bearer ${HTB_API_KEY}`,
        Accept: 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        Referer: `https://app.hackthebox.com/profile/${HTB_USER_ID}`,
        Origin: 'https://app.hackthebox.com'
      },
      next: { revalidate: 300 }
    });

    // Fallback: essayer autre endpoint si 404
    if (response.status === 404) {
      response = await fetch(`https://app.hackthebox.com/api/v4/user/profile/${HTB_USER_ID}`, {
        headers: {
          Authorization: `Bearer ${HTB_API_KEY}`,
          Accept: 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          Referer: `https://app.hackthebox.com/profile/${HTB_USER_ID}`,
          Origin: 'https://app.hackthebox.com'
        },
        next: { revalidate: 300 }
      });
    }

    console.error(response);

    if (!response.ok) {
      let errorBody = '';
      try {
        errorBody = await response.text();
      } catch {}
      console.error('HTB API error', {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
        body: errorBody?.slice(0, 500)
      });
      throw new Error(`HTB API responded with status: ${response.status} - ${response.statusText}`);
    }

    // Parse JSON de manière robuste (certaines réponses HTML de protection peuvent passer en 200)
    let data: any;
    try {
      data = await response.json();
    } catch (parseError) {
      let raw = '';
      try {
        raw = await response.text();
      } catch {}
      console.error('HTB API returned non-JSON response', raw?.slice(0, 500));
      throw new Error('HTB API returned non-JSON response');
    }

    
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
    console.error('Error fetching HackTheBox data:', (error as Error)?.message || error);
    
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