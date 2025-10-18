import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaTwitter, FaGlobe } from 'react-icons/fa';
import { Globe3D } from '@/components/Globe3D';
import { AudioPlayer } from '@/components/AudioPlayer';
import { StationList } from '@/components/StationList';
import { useRadioStore, RadioStation } from '@/store/radioStore';
import { radioApi } from '@/lib/radioApi';

export default function Home() {
  const {
    stations,
    setStations,
    currentStation,
    setCurrentStation,
    isLoading,
    setIsLoading,
    error,
    setError,
  } = useRadioStore();

  const [showPlayer, setShowPlayer] = useState(false);

  // Fetch stations on mount
  useEffect(() => {
    const fetchStations = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await radioApi.getStations(1000);
        setStations(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load stations');
      } finally {
        setIsLoading(false);
      }
    };

    if (stations.length === 0) {
      fetchStations();
    }
  }, []);

  const handleStationSelect = (station: RadioStation) => {
    setCurrentStation(station);
    setShowPlayer(true);
  };

  const handleClosePlayer = () => {
    setShowPlayer(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 gradient-mesh pointer-events-none opacity-30"></div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-40 border-b border-white/10 backdrop-blur-md bg-black/20"
      >
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <FaGlobe className="text-white text-lg" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white hud-text">Radio Garden</h1>
                <p className="text-gray-400 text-sm">Explore worldwide radio stations</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTwitter size={20} />
              </a>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Globe Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 neumorphic p-6 overflow-hidden"
          >
            <h2 className="text-white font-bold text-lg mb-4 hud-text">
              Explore the Globe
            </h2>
            <div className="h-[calc(100%-3rem)] rounded-xl overflow-hidden">
              <Globe3D
                stations={stations}
                onStationSelect={handleStationSelect}
                selectedStation={currentStation}
              />
            </div>
          </motion.div>

          {/* Station List Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="neumorphic p-6 overflow-hidden"
          >
            <StationList
              stations={stations}
              onStationSelect={handleStationSelect}
              selectedStation={currentStation}
              isLoading={isLoading}
            />
          </motion.div>
        </div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="glassmorphic-dark p-4 rounded-lg">
            <h3 className="text-white font-semibold text-sm mb-2">3D Globe</h3>
            <p className="text-gray-400 text-xs">
              Rotate the globe to explore radio stations from around the world
            </p>
          </div>
          <div className="glassmorphic-dark p-4 rounded-lg">
            <h3 className="text-white font-semibold text-sm mb-2">Live Streaming</h3>
            <p className="text-gray-400 text-xs">
              Click any station to start listening to live radio broadcasts
            </p>
          </div>
          <div className="glassmorphic-dark p-4 rounded-lg">
            <h3 className="text-white font-semibold text-sm mb-2">Filter & Search</h3>
            <p className="text-gray-400 text-xs">
              Find stations by country, genre, or search by name
            </p>
          </div>
        </motion.div>
      </main>

      {/* Audio Player */}
      {showPlayer && (
        <AudioPlayer station={currentStation} onClose={handleClosePlayer} />
      )}

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="relative z-10 border-t border-white/10 backdrop-blur-md bg-black/20 mt-12"
      >
        <div className="max-w-7xl mx-auto px-4 py-6 text-center">
          <p className="text-gray-400 text-sm">
            Radio Garden © 2024 | Powered by Radio Browser API
          </p>
        </div>
      </motion.footer>
    </div>
  );
}

