import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, VolumeX, Volume2 } from 'lucide-react';
import { useMusicPlayer } from '../../hooks/useMusicPlayer';
import { useSound } from '../../context/SoundProvider';
import { useCursorHandlers } from '../cursor/CustomCursor';

// ================================
// Minimal Music Player Component
// ================================
export function MusicPlayer() {
  const [isHovered, setIsHovered] = useState(false);
  const { playSound } = useSound();
  const buttonHandlers = useCursorHandlers('button');

  const {
    isPlaying,
    isMuted,
    togglePlay,
    toggleMute,
  } = useMusicPlayer();

  // ================================
  // Handlers
  // ================================
  const handlePlayPause = () => {
    playSound('click');
    togglePlay();
  };

  const handleMuteToggle = () => {
    playSound('click');
    toggleMute();
  };

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-40"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="glass-strong rounded-full flex items-center justify-center gap-3"
        animate={{
          padding: isHovered ? '20px 28px' : '16px',
        }}
        transition={{ 
          duration: 0.3, 
          ease: [0.4, 0.0, 0.2, 1] // Smooth easing
        }}
      >
        {/* Play/Pause Button */}
        <motion.button
          onClick={handlePlayPause}
          className="relative flex items-center justify-center"
          animate={{
            width: isHovered ? 44 : 40,
            height: isHovered ? 44 : 40,
          }}
          transition={{ duration: 0.3 }}
          {...buttonHandlers}
        >
          {/* Gradient background */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-pastel-purple to-pastel-cyan"
            animate={{
              opacity: isHovered ? 1 : 0.8,
            }}
            transition={{ duration: 0.2 }}
          />
          
          {/* Icon */}
          <div className="relative z-10">
            {isPlaying ? (
              <Pause className="w-5 h-5 text-dark-900" fill="currentColor" />
            ) : (
              <Play className="w-5 h-5 text-dark-900 ml-0.5" fill="currentColor" />
            )}
          </div>

          {/* Pulsing ring when playing */}
          {isPlaying && !isHovered && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-pastel-purple"
              animate={{
                scale: [1, 1.3],
                opacity: [0.4, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />
          )}
        </motion.button>

        {/* Mute Button - Only shows on hover */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{
            width: isHovered ? 'auto' : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          style={{ overflow: 'hidden' }}
        >
          <motion.button
            onClick={handleMuteToggle}
            className="p-2 rounded-full hover:bg-white/5 transition-colors"
            animate={{
              scale: isHovered ? 1 : 0.8,
            }}
            transition={{ duration: 0.2 }}
            {...buttonHandlers}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-zinc-500" />
            ) : (
              <Volume2 className="w-5 h-5 text-pastel-purple" />
            )}
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Subtle ambient glow */}
      <motion.div
        className="absolute inset-0 rounded-full blur-xl -z-10"
        animate={{
          opacity: isPlaying ? 0.15 : 0.08,
          scale: isHovered ? 1.2 : 1,
        }}
        transition={{ duration: 0.5 }}
        style={{
          background: 'radial-gradient(circle, rgba(167, 139, 250, 0.4), transparent 70%)',
        }}
      />
    </motion.div>
  );
}

