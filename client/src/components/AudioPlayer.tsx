import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp, FaTimes } from 'react-icons/fa';
import { RadioStation } from '@/store/radioStore';

interface AudioPlayerProps {
  station: RadioStation | null;
  onClose: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ station, onClose }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!station || !audioRef.current) {
      setIsPlaying(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    const audio = audioRef.current;
    audio.src = station.url;
    audio.volume = volume;

    const playPromise = audio.play();
    if (playPromise) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error('Playback error:', err);
          setError('Unable to play stream');
          setIsLoading(false);
        });
    }
  }, [station]);

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.error('Playback error:', err);
            setError('Unable to play stream');
          });
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  if (!station) return null;

  return (
    <>
      <audio ref={audioRef} crossOrigin="anonymous" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-4 right-4 w-96 glassmorphic-dark p-6 rounded-2xl z-50 max-w-[calc(100vw-2rem)]"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 pr-4">
            <h3 className="text-white font-bold text-lg truncate hud-text">
              {station.name}
            </h3>
            <p className="text-gray-400 text-sm">{station.country}</p>
            {station.favicon && (
              <img
                src={station.favicon}
                alt={station.name}
                className="w-8 h-8 rounded mt-2"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Status */}
        {isLoading && (
          <div className="text-center mb-4">
            <div className="inline-block">
              <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-gray-300 text-sm mt-2">Connecting...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mb-4">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <button
            onClick={togglePlayPause}
            disabled={isLoading || error !== null}
            className="neumorphic-button flex items-center justify-center w-12 h-12 disabled:opacity-50"
          >
            {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
          </button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-3">
          {volume === 0 ? (
            <FaVolumeMute size={16} className="text-gray-400" />
          ) : (
            <FaVolumeUp size={16} className="text-gray-400" />
          )}
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
          <span className="text-gray-400 text-xs w-8 text-right">
            {Math.round(volume * 100)}%
          </span>
        </div>

        {/* Visualization */}
        <div className="mt-4 flex items-center justify-center gap-1 h-8">
          {isPlaying &&
            [0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                animate={{
                  height: ['8px', '20px', '8px'],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
                className="w-1 bg-gradient-to-t from-purple-500 to-blue-500 rounded-full"
              />
            ))}
        </div>
      </motion.div>
    </>
  );
};

