import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Récupérer les informations du profil GitHub
    const userResponse = await fetch('https://api.github.com/users/YuToutCourt', {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Portfolio-App'
      },
      next: { revalidate: 300 } // Cache pendant 5 minutes
    });

    if (!userResponse.ok) {
      throw new Error('Failed to fetch GitHub user data');
    }

    const userData = await userResponse.json();

    // Récupérer les repositories
    const reposResponse = await fetch(`https://api.github.com/users/YuToutCourt/repos?per_page=100`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Portfolio-App'
      },
      next: { revalidate: 300 }
    });

    if (!reposResponse.ok) {
      throw new Error('Failed to fetch GitHub repos data');
    }

    const reposData = await reposResponse.json();

    // Calculer les statistiques
    const totalStars = reposData.reduce((sum: number, repo: Record<string, unknown>) => sum + (repo.stargazers_count as number), 0);
    const languages = reposData.reduce((acc: Record<string, number>, repo: Record<string, unknown>) => {
      if (repo.language && typeof repo.language === 'string') {
        acc[repo.language] = (acc[repo.language] || 0) + 1;
      }
      return acc;
    }, {});

    const stats = {
      repositories: userData.public_repos,
      followers: userData.followers,
      following: userData.following,
      stars: totalStars,
      bio: userData.bio,
      location: userData.location,
      company: userData.company,
      topLanguages: Object.entries(languages)
        .sort(([,a], [,b]) => (b as number) - (a as number))
        .slice(0, 5)
        .map(([lang, count]) => ({ language: lang, count })),
      lastUpdated: new Date().toISOString()
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub data' },
      { status: 500 }
    );
  }
}