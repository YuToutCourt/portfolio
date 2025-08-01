'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Star, Users, GitBranch, Code, Trophy, Target, Shield, Loader2, RefreshCw, Terminal, User, Crown, Droplet, Zap, Award } from 'lucide-react';
import Image from 'next/image';
import { MatrixAnimation, TerminalAnimation, CodeAnimation, FloatingParticles } from './AnimatedHeaders';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { useState, useEffect } from 'react';

interface GitHubStats {
  repositories: number;
  followers: number;
  following: number;
  stars: number;
  bio: string;
  location: string;
  company: string;
  topLanguages: { language: string; count: number }[];
  lastUpdated: string;
}

interface RootMeStats {
  place: number;
  points: number;
  challenges: number;
  compromissions: number;
  percentage: number;
  totalChallenges: number;
  rank: string;
  recentActivity: Array<{
    name: string;
    iconUrl: string;
    category: string;
    timeAgo: string;
    challengeUrl: string;
  }>;
  validations: { [key: string]: number };
  lastUpdated: string;
  error?: string;
}

interface HackTheBoxStats {
  rank: string;
  points: number;
  userOwns: number;
  rootOwns: number;
  respect: number;
  ranking: number;
  userBloods: number;
  systemBloods: number;
  challenges: number;
  isVip: boolean;
  country: string;
  currentRankProgress: number;
  nextRank: string;
  profileUrl: string;
  lastUpdated: string;
  error?: string;
}

// Cette fonction n'est plus nécessaire car nous récupérons maintenant
// les vraies icônes SVG directement depuis l'API RootMe

const PlatformsShowcase = () => {
  const { t } = useLanguage();
  const [githubData, setGithubData] = useState<GitHubStats | null>(null);
  const [rootMeData, setRootMeData] = useState<RootMeStats | null>(null);
  const [hackTheBoxData, setHackTheBoxData] = useState<HackTheBoxStats | null>(null);
  const [githubLoading, setGithubLoading] = useState(true);
  const [rootMeLoading, setRootMeLoading] = useState(true);
  const [hackTheBoxLoading, setHackTheBoxLoading] = useState(true);
  const [githubError, setGithubError] = useState<string | null>(null);
  const [rootMeError, setRootMeError] = useState<string | null>(null);
  const [hackTheBoxError, setHackTheBoxError] = useState<string | null>(null);

  const fetchGitHubData = async () => {
    try {
      setGithubLoading(true);
      setGithubError(null);
      const response = await fetch('/api/github');
      if (!response.ok) {
        throw new Error('Failed to fetch GitHub data');
      }
      const data = await response.json();
      setGithubData(data);
    } catch (error) {
      setGithubError(error instanceof Error ? error.message : 'Unknown error');
      console.error('Error fetching GitHub data:', error);
    } finally {
      setGithubLoading(false);
    }
  };

  const fetchRootMeData = async () => {
    try {
      setRootMeLoading(true);
      setRootMeError(null);
      const response = await fetch('/api/rootme');
      if (!response.ok) {
        throw new Error('Failed to fetch RootMe data');
      }
      const data = await response.json();
      setRootMeData(data);
      
    } catch (error) {
      setRootMeError(error instanceof Error ? error.message : 'Unknown error');
      console.error('Error fetching RootMe data:', error);
    } finally {
      setRootMeLoading(false);
    }
  };

  const fetchHackTheBoxData = async () => {
    try {
      setHackTheBoxLoading(true);
      setHackTheBoxError(null);
      const response = await fetch('/api/hackthebox');
      if (!response.ok) {
        throw new Error('Failed to fetch HackTheBox data');
      }
      const data = await response.json();
      setHackTheBoxData(data);
    } catch (error) {
      setHackTheBoxError(error instanceof Error ? error.message : 'Unknown error');
      console.error('Error fetching HackTheBox data:', error);
    } finally {
      setHackTheBoxLoading(false);
    }
  };

  useEffect(() => {
    fetchGitHubData();
    fetchRootMeData();
    fetchHackTheBoxData();
  }, []);

  const githubStats = githubData ? [
                { label: t('github.repositories'), value: githubData.repositories.toString(), icon: GitBranch },
            { label: t('github.followers'), value: githubData.followers.toString(), icon: Users },
            { label: t('github.following'), value: githubData.following.toString(), icon: Users }
  ] : [];



  return (
    <div className="space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h3 className="text-3xl font-bold text-foreground mb-4">
          {t('platforms.title')}
        </h3>
        <Separator className="w-16 mx-auto mb-6 bg-primary h-1" />
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t('platforms.description')}
        </p>
      </motion.div>

      {/* Platforms Grid - GitHub, RootMe and HackTheBox */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        
        {/* GitHub Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
                      <Card className="h-full hover:shadow-xl transition-all duration-300 bg-gray-900 border border-gray-800">
              <CardHeader className="bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-t-lg relative overflow-hidden border-b border-gray-700 min-h-[80px]">
                {/* Animation de code pour GitHub */}
                <CodeAnimation />
                <FloatingParticles color="blue" />
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30 p-2">
                    <Github className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-white">{t('github.title')}</CardTitle>
                    <p className="text-blue-400 text-sm font-mono">{t('github.subtitle')}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" asChild className="text-white hover:bg-white/20">
                  <a 
                    href="https://github.com/YuToutCourt/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6 bg-gray-900">
              {/* GitHub-style Stats Cards */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h6 className="font-semibold text-sm text-gray-300 uppercase tracking-wider">{t('github.stats')}</h6>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={fetchGitHubData}
                    disabled={githubLoading}
                    className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                  >
                    {githubLoading ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <RefreshCw className="h-3 w-3" />
                    )}
                  </Button>
                </div>
                
                {githubLoading ? (
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-gray-800 rounded-lg p-4 animate-pulse border border-gray-700">
                        <div className="w-8 h-8 bg-gray-700 rounded mx-auto mb-3"></div>
                        <div className="w-16 h-6 bg-gray-700 rounded mx-auto mb-2"></div>
                        <div className="w-20 h-4 bg-gray-700 rounded mx-auto"></div>
                      </div>
                    ))}
                  </div>
                ) : githubError ? (
                  <div className="text-center p-4 text-red-400 text-sm bg-gray-800 rounded-lg border border-gray-700">
                    Erreur: {githubError}
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-4">
                    {githubStats.map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="text-center p-3 bg-gray-800 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-colors"
                      >
                        <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3 border border-blue-500/30">
                          <stat.icon className="h-6 w-6 text-blue-400" />
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* GitHub Images - Dark Theme */}
              <div className="space-y-3">
                 <div className="text-sm text-gray-300 uppercase tracking-wider">GitHub Stats</div>
                 <div className="grid grid-cols-1 gap-2">
                   {/* Stats Image */}
                     <h6 className="font-semibold text-xs mb-2 flex items-center justify-left text-blue-400">
                       <Star className="h-3 w-3 mr-1"
                       />
                       Stats
                     </h6>
                     <div className="flex justify-left">
                                               <Image 
                          src={`https://github-readme-stats.vercel.app/api?username=YuToutCourt&show_icons=true&theme=dark&bg_color=1f2937&border_color=374151&text_color=d1d5db&title_color=60a5fa&icon_color=8b5cf6`}
                          alt="GitHub Stats"
                          className="rounded border border-gray-600"
                          width={380}
                          height={200}
                          style={{ maxWidth: '380px', width: '100%', height: 'auto' }}
                          loading="lazy"
                          unoptimized
                        />
                   </div>
                   
                   {/* Languages Image */}
                     <h6 className="font-semibold text-xs mb-2 flex items-center justify-left text-purple-400">
                       <Code className="h-3 w-3 mr-1" />
                       {t('github.languages')}
                     </h6>
                     <div className="flex justify-left">
                                               <Image 
                          src={`https://github-readme-stats.vercel.app/api/top-langs/?username=YuToutCourt&hide=html,twig,css,scss&layout=compact&theme=dark&bg_color=1f2937&border_color=374151&text_color=d1d5db&title_color=8b5cf6`}
                          alt="Top Languages"
                          className="rounded border border-gray-600"
                          width={380}
                          height={200}
                          style={{ maxWidth: '380px', width: '100%', height: 'auto' }}
                          loading="lazy"
                          unoptimized
                        />
                   </div>
                 </div>
               </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* RootMe Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="h-full hover:shadow-xl transition-all duration-300 bg-gray-900 border border-gray-800">
                          <CardHeader className="bg-gradient-to-br from-red-900 to-black-900 text-white rounded-t-lg relative overflow-hidden border-b border-gray-700 min-h-[80px]">
                {/* Animation terminal pour RootMe */}
                <TerminalAnimation />
                <FloatingParticles color="orange" />
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center border border-red-500/30 p-2">
                    <Image 
                      src="/rootme-logo.webp" 
                      alt="RootMe Logo" 
                      width={48}
                      height={48}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-white">RootMe</CardTitle>
                    <p className="text-red-400 text-sm font-mono">
                      Yù • {rootMeData?.rank || 'Enthusiast'}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" asChild className="text-white hover:bg-white/20">
                  <a 
                    href="https://www.root-me.org/Yu" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6 bg-gray-900">
              {/* RootMe-style Stats Cards */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h6 className="font-semibold text-sm text-gray-300 uppercase tracking-wider">Overview</h6>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={fetchRootMeData}
                    disabled={rootMeLoading}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    {rootMeLoading ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <RefreshCw className="h-3 w-3" />
                    )}
                  </Button>
                </div>

                {rootMeLoading ? (
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="bg-gray-800 rounded-lg p-4 animate-pulse border border-gray-700">
                        <div className="w-8 h-8 bg-gray-700 rounded mx-auto mb-3"></div>
                        <div className="w-16 h-6 bg-gray-700 rounded mx-auto mb-2"></div>
                        <div className="w-20 h-4 bg-gray-700 rounded mx-auto"></div>
                      </div>
                    ))}
                  </div>
                ) : rootMeError ? (
                  <div className="text-center p-4 text-red-400 text-sm bg-gray-800 rounded-lg border border-gray-700">
                    Erreur: {rootMeError}
                    {rootMeData?.error && <div className="text-xs mt-1 text-gray-500">Données de secours utilisées</div>}
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-4">
                    {/* Place Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="bg-gray-800 rounded-lg p-4 text-center border border-gray-700 hover:border-red-500/50 transition-colors"
                    >
                      <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3 border border-green-500/30">
                        <Trophy className="h-6 w-6 text-green-400" />
                      </div>
                      <div className="text-2xl font-bold text-white mb-1">#{rootMeData?.place || '1506'}</div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider">Place</div>
                    </motion.div>

                    {/* Points Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="bg-gray-800 rounded-lg p-5 text-center border border-gray-700 hover:border-red-500/50 transition-colors"
                    >
                      <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3 border border-blue-500/30">
                        <Star className="h-6 w-6 text-blue-400" />
                      </div>
                      <div className="text-2xl font-bold text-white mb-1">{rootMeData?.points || '4765'}</div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider">Points</div>
                    </motion.div>

                    {/* Challenges Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="bg-gray-800 rounded-lg p-4 text-center border border-gray-700 hover:border-red-500/50 transition-colors"
                    >
                      <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-3 border border-yellow-500/30">
                        <Target className="h-6 w-6 text-yellow-400" />
                      </div>
                      <div className="text-2xl font-bold text-white mb-1">{rootMeData?.challenges || '219'}</div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider">Challenges</div>
                    </motion.div>

                  </div>
                )}
              </div>

              {/* Progress - RootMe Style */}
              {rootMeData && (
                <div className="space-y-4">
                  <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-sm text-gray-300 uppercase tracking-wider">Validations</div>
                      <div className="text-red-400 font-mono text-sm">{rootMeData.percentage}%</div>
                    </div>
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center border border-red-500/30">
                        <Target className="h-4 w-4 text-red-400" />
                      </div>
                      <div>
                        <div className="text-white font-semibold">{rootMeData.challenges}/{rootMeData.totalChallenges}</div>
                        <div className="text-xs text-gray-400">challenges résolus</div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full transition-all duration-1000 relative overflow-hidden"
                        style={{ width: `${rootMeData.percentage}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Recent Activity - RootMe Style */}
              {rootMeData && (
                <div className="space-y-4">
                  <div className="text-sm text-gray-300 uppercase tracking-wider">Activité récente</div>
                  <div className="space-y-2">
                    {rootMeData.recentActivity.slice(0, 4).map((activity, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <a 
                          href={activity.challengeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center bg-gray-800 p-3 rounded-lg border border-gray-700 hover:border-red-500/50 hover:bg-gray-750 transition-all duration-200 cursor-pointer group"
                        >
                          <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 border border-gray-600 p-2 group-hover:border-red-500/30 transition-colors">
                            <Image 
                              src={activity.iconUrl} 
                              alt={activity.category}
                              width={40}
                              height={40}
                              className="w-full h-full object-contain"
                              unoptimized
                            />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-white text-sm group-hover:text-red-300 transition-colors">
                              {activity.name}
                            </div>
                            <div className="text-xs text-gray-400 mt-1 flex items-center">
                              <span className="text-red-400 font-medium mr-2 group-hover:text-red-300 transition-colors">
                                {activity.category}
                              </span>
                              •
                              <span className="ml-2">{activity.timeAgo}</span>
                            </div>
                          </div>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                            <ExternalLink className="h-4 w-4 text-red-400" />
                          </div>
                        </a>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* HackTheBox Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Card className="h-full hover:shadow-xl transition-all duration-300 bg-gray-900 border border-gray-800">
                          <CardHeader className="bg-gradient-to-br from-green-900 to-gray-900 text-white rounded-t-lg relative overflow-hidden border-b border-gray-700 min-h-[80px]">
                {/* Animation Matrix pour HackTheBox */}
                <MatrixAnimation />
                <FloatingParticles color="green" />
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center border border-green-500/30 p-2">
                    <Image 
                      src="/hackthebox_logo.png" 
                      alt="HackTheBox Logo" 
                      width={48}
                      height={48}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-white">HackTheBox</CardTitle>
                    <p className="text-green-400 text-sm font-mono">
                      YuToutCourt • {hackTheBoxData?.rank}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" asChild className="text-white hover:bg-white/20">
                  <a 
                    href={hackTheBoxData?.profileUrl || "https://app.hackthebox.com/profile/796022"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6 bg-gray-900">
              {/* HTB-style Stats Cards */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h6 className="font-semibold text-sm text-gray-300 uppercase tracking-wider">Overview</h6>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={fetchHackTheBoxData}
                    disabled={hackTheBoxLoading}
                    className="text-green-400 hover:text-green-300 hover:bg-green-500/10"
                  >
                    {hackTheBoxLoading ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <RefreshCw className="h-3 w-3" />
                    )}
                  </Button>
                </div>

                {hackTheBoxLoading ? (
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-gray-800 rounded-lg p-4 animate-pulse border border-gray-700">
                        <div className="w-8 h-8 bg-gray-700 rounded mx-auto mb-3"></div>
                        <div className="w-16 h-6 bg-gray-700 rounded mx-auto mb-2"></div>
                        <div className="w-20 h-4 bg-gray-700 rounded mx-auto"></div>
                      </div>
                    ))}
                  </div>
                ) : hackTheBoxError ? (
                  <div className="text-center p-4 text-red-400 text-sm bg-gray-800 rounded-lg border border-gray-700">
                    Erreur: {hackTheBoxError}
                    {hackTheBoxData?.error && <div className="text-xs mt-1 text-gray-500">Données de secours utilisées</div>}
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-4">
                    {/* Global Ranking Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="bg-gray-800 rounded-lg p-4 text-center border border-gray-700 hover:border-green-500/50 transition-colors"
                    >
                      <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3 border border-green-500/30">
                        <Trophy className="h-6 w-6 text-green-400" />
                      </div>
                      <div className="text-2xl font-bold text-white mb-1">#{hackTheBoxData?.ranking.toLocaleString() || '955'}</div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider">Global Ranking</div>
                    </motion.div>

                    {/* Points Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="bg-gray-800 rounded-lg p-4 text-center border border-gray-700 hover:border-green-500/50 transition-colors"
                    >
                      <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3 border border-green-500/30">
                        <Star className="h-6 w-6 text-green-400" />
                      </div>
                      <div className="text-2xl font-bold text-white mb-1">{hackTheBoxData?.points || '24'}</div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider">Points</div>
                    </motion.div>

                    {/* Owns Combined Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="bg-gray-800 rounded-lg p-4 text-center border border-gray-700 hover:border-green-500/50 transition-colors"
                    >
                      <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3 border border-green-500/30">
                        <Terminal className="h-6 w-6 text-green-400" />
                      </div>
                      <div className="text-2xl font-bold text-white mb-1">{(hackTheBoxData?.userOwns || 0) + (hackTheBoxData?.rootOwns || 0)}</div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider">Total Owns</div>
                    </motion.div>
                  </div>
                )}
              </div>

              {/* Rank Progress - HTB Style */}
              {hackTheBoxData && (
                <div className="space-y-4">
                  <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-sm text-gray-300 uppercase tracking-wider">Rank Progress</div>
                      <div className="text-green-400 font-mono text-sm">{Math.round(hackTheBoxData.currentRankProgress * 100)}%</div>
                    </div>
                    <div className="flex items-center space-x-3 mb-3">

                      <div>
                        <div className="text-white font-semibold">{hackTheBoxData.rank}</div>
                        <div className="text-xs text-gray-400">towards {hackTheBoxData.nextRank}</div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full transition-all duration-1000 relative overflow-hidden"
                        style={{ width: `${hackTheBoxData.currentRankProgress * 100}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Detailed Stats Grid - HTB Style */}
              {hackTheBoxData && (
                <div className="space-y-4">
                  <div className="text-sm text-gray-300 uppercase tracking-wider">Statistics</div>
                  <div className="grid grid-cols-2 gap-4">
                    {/* User Owns */}
                    <div className="bg-gray-800 rounded-lg p-3 border border-gray-700 hover:border-green-500/50 transition-colors">
                      <div className="flex items-center space-x-2 mb-2">
                        <User className="h-4 w-4 text-green-400" />
                        <div className="text-green-400 text-lg font-bold">{hackTheBoxData.userOwns}</div>
                      </div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider">{t('htb.user.owns')}</div>
                    </div>
                    
                    {/* System Owns */}
                    <div className="bg-gray-800 rounded-lg p-3 border border-gray-700 hover:border-green-500/50 transition-colors">
                      <div className="flex items-center space-x-2 mb-2">
                        <Crown className="h-4 w-4 text-green-400" />
                        <div className="text-green-400 text-lg font-bold">{hackTheBoxData.rootOwns}</div>
                      </div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider">{t('htb.system.owns')}</div>
                    </div>
                    
                    {/* User Bloods */}
                    <div className="bg-gray-800 rounded-lg p-3 border border-gray-700 hover:border-green-500/50 transition-colors">
                      <div className="flex items-center space-x-2 mb-2">
                        <Droplet className="h-4 w-4 text-red-400" />
                        <div className="text-red-400 text-lg font-bold">{hackTheBoxData.userBloods}</div>
                      </div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider">User Bloods</div>
                    </div>
                    
                    {/* System Bloods */}
                    <div className="bg-gray-800 rounded-lg p-3 border border-gray-700 hover:border-green-500/50 transition-colors">
                      <div className="flex items-center space-x-2 mb-2">
                        <Zap className="h-4 w-4 text-red-400" />
                        <div className="text-red-400 text-lg font-bold">{hackTheBoxData.systemBloods}</div>
                      </div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider">System Bloods</div>
                    </div>
                    
                    {/* Respect */}
                    <div className="bg-gray-800 rounded-lg p-3 border border-gray-700 hover:border-green-500/50 transition-colors">
                      <div className="flex items-center space-x-2 mb-2">
                        <Award className="h-4 w-4 text-blue-400" />
                        <div className="text-blue-400 text-lg font-bold">{hackTheBoxData.respect}</div>
                      </div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider">Respect</div>
                    </div>
                    
                    {/* Plan Type */}
                    <div className="bg-gray-800 rounded-lg p-3 border border-gray-700 hover:border-green-500/50 transition-colors">
                      <div className="flex items-center space-x-2 mb-2">
                        <Shield className="h-4 w-4 text-yellow-400" />
                        <div className={`text-lg font-bold ${hackTheBoxData.isVip ? 'text-yellow-400' : 'text-gray-400'}`}>
                          {hackTheBoxData.isVip ? 'VIP' : 'FREE'}
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider">Plan Type</div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default PlatformsShowcase;