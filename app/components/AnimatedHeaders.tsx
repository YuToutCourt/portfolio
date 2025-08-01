'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Animation Matrix pour HackTheBox
export const MatrixAnimation = () => {
  const [matrix, setMatrix] = useState<string[]>([]);

  useEffect(() => {
    const generateMatrix = () => {
      const chars = ['0', '1'];
      const newMatrix = Array.from({ length: 300 }, () => 
        chars[Math.floor(Math.random() * chars.length)]
      );
      setMatrix(newMatrix);
    };

    generateMatrix();
    const interval = setInterval(generateMatrix, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden opacity-10">
      <div className="flex flex-wrap gap-1 text-xs text-green-400 font-mono">
        {matrix.map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.02,
              repeat: Infinity,
              repeatDelay: 1
            }}
          >
            {char}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

// Animation Terminal pour RootMe
export const TerminalAnimation = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-15">
      <div className="space-y-1 text-xs text-orange-400 font-mono">
        <motion.div
          className="whitespace-nowrap"
          animate={{ x: [-200, 300] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          root@exegol:~# nmap -sS -A target.com
        </motion.div>
        <motion.div
          className="whitespace-nowrap"
          animate={{ x: [300, -200] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 1 }}
        >
          root@kali:~# nc -nlvp 4444
        </motion.div>
        <motion.div
          className="whitespace-nowrap"
          animate={{ x: [-200, 300] }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear", delay: 2 }}
        >
          root@kali:~# python3 exploit.py
        </motion.div>
        <motion.div
          className="whitespace-nowrap"
          animate={{ x: [300, -200] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 3 }}
        >
          root@exegol:~# proxychains4 -f /etc/proxychains.conf -q nxc smb 192.168.1.100 --users
        </motion.div>

        <motion.div
          className="whitespace-nowrap"
          animate={{ x: [400, -200] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 3 }}
        >
          john --wordlist=rockyou.txt hash.txt
        </motion.div>
      </div>
    </div>
  );
};

// Animation Code pour GitHub
export const CodeAnimation = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-10">
      <div className="space-y-1 text-xs text-blue-400 font-mono">
        <motion.div
          className="whitespace-nowrap"
          animate={{ x: [-200, 300] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          {`const portfolio = () => {`}
        </motion.div>
        <motion.div
          className="whitespace-nowrap"
          animate={{ x: [300, -200] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 1 }}
        >
          {`  return <Portfolio />;`}
        </motion.div>
        <motion.div
          className="whitespace-nowrap"
          animate={{ x: [-200, 300] }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear", delay: 2 }}
        >
          {`}; // Git commit -m "feat: portfolio"`}
        </motion.div>
        <motion.div
          className="whitespace-nowrap"
          animate={{ x: [300, -200] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 3 }}
        >
          git push origin main
        </motion.div>
      </div>
    </div>
  );
};

// Animation de particules flottantes - Version ultra-optimisée
export const FloatingParticles = ({ color = 'blue' }: { color?: string }) => {
  // Version statique pour de meilleures performances
  return (
    <div className="absolute inset-0 overflow-hidden opacity-10">
      <div className={`absolute w-1 h-1 bg-${color}-400 rounded-full`} style={{ left: '20%', top: '20%' }} />
      <div className={`absolute w-1 h-1 bg-${color}-400 rounded-full`} style={{ left: '80%', top: '30%' }} />
      <div className={`absolute w-1 h-1 bg-${color}-400 rounded-full`} style={{ left: '60%', top: '70%' }} />
    </div>
  );
};