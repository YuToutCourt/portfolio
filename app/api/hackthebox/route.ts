import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Récupérer les variables d'environnement
    const HTB_API_KEY = process.env.HTB_API_KEY;
    const HTB_USER_ID = process.env.HTB_USER_ID;

    if (!HTB_API_KEY) {
      throw new Error('HTB_API_KEY not configured');
    }

    if (!HTB_USER_ID) {
      throw new Error('HTB_USER_ID not configured');
    }

    // Endpoint pour récupérer le profil de base
    const url = `https://labs.hackthebox.com/api/v4/user/profile/basic/${HTB_USER_ID}`;

    // En-têtes nécessaires comme dans l'exemple Python
    const headers = {
      "Authorization": `Bearer ${HTB_API_KEY}`,
      "Accept": "application/json, text/plain, */*",
      "Origin": "https://app.hackthebox.com",
      "Referer": "https://app.hackthebox.com/",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 OPR/120.0.0.0",
      "Accept-Language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
    };

    const response = await fetch(url, {
      headers,
      next: { revalidate: 300 } // Cache pendant 5 minutes
    });

    if (!response.ok) {
      throw new Error(`HTB API responded with status: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    const profile = data.profile || data;

    if (!profile) {
      throw new Error('No profile data returned from HTB API');
    }

    const stats = {
      rank: profile.rank || 'Hacker',
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
      rank: 'Hacker (Fallback Data)',
      points: 24,
      userOwns: 16,
      rootOwns: 13,
      respect: 2,
      ranking: 959,
      userBloods: 0,
      systemBloods: 0,
      challenges: 29,
      isVip: false,
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