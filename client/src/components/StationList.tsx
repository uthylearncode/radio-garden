import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaGlobe, FaMusic } from 'react-icons/fa';
import { RadioStation } from '@/store/radioStore';

interface StationListProps {
  stations: RadioStation[];
  onStationSelect: (station: RadioStation) => void;
  selectedStation: RadioStation | null;
  isLoading: boolean;
}

export const StationList: React.FC<StationListProps> = ({
  stations,
  onStationSelect,
  selectedStation,
  isLoading,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  // Get unique countries and genres
  const countries = useMemo(() => {
    const unique = new Set(stations.map((s) => s.country));
    return Array.from(unique).sort();
  }, [stations]);

  const genres = useMemo(() => {
    const genreSet = new Set<string>();
    stations.forEach((s) => {
      s.tags.split(',').forEach((tag) => {
        const trimmed = tag.trim();
        if (trimmed) genreSet.add(trimmed);
      });
    });
    return Array.from(genreSet).sort().slice(0, 20);
  }, [stations]);

  // Filter stations
  const filteredStations = useMemo(() => {
    return stations.filter((station) => {
      const matchesSearch =
        !searchQuery ||
        station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        station.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        station.tags.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCountry = !selectedCountry || station.country === selectedCountry;

      const matchesGenre =
        !selectedGenre ||
        station.tags.toLowerCase().includes(selectedGenre.toLowerCase());

      return matchesSearch && matchesCountry && matchesGenre;
    });
  }, [stations, searchQuery, selectedCountry, selectedGenre]);

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-slate-900 to-black rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <h2 className="text-white font-bold text-lg mb-4 hud-text">Radio Stations</h2>

        {/* Search */}
        <div className="relative mb-4">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search stations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>

        {/* Filters */}
        <div className="space-y-3">
          {/* Country Filter */}
          <div>
            <label className="text-gray-400 text-xs font-semibold flex items-center gap-2 mb-2">
              <FaGlobe size={12} /> Country
            </label>
            <select
              value={selectedCountry || ''}
              onChange={(e) => setSelectedCountry(e.target.value || null)}
              className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500 transition-colors"
            >
              <option value="">All Countries</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          {/* Genre Filter */}
          <div>
            <label className="text-gray-400 text-xs font-semibold flex items-center gap-2 mb-2">
              <FaMusic size={12} /> Genre
            </label>
            <select
              value={selectedGenre || ''}
              onChange={(e) => setSelectedGenre(e.target.value || null)}
              className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500 transition-colors"
            >
              <option value="">All Genres</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results count */}
        <p className="text-gray-400 text-xs mt-3">
          {isLoading ? 'Loading...' : `${filteredStations.length} stations`}
        </p>
      </div>

      {/* Station List */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence>
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-gray-400 text-sm">Loading stations...</p>
              </div>
            </div>
          ) : filteredStations.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-400 text-sm">No stations found</p>
            </div>
          ) : (
            <div className="space-y-2 p-4">
              {filteredStations.map((station, index) => (
                <motion.button
                  key={station.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.02 }}
                  onClick={() => onStationSelect(station)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                    selectedStation?.id === station.id
                      ? 'glassmorphic hud-glow'
                      : 'hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-sm truncate">
                        {station.name}
                      </p>
                      <p className="text-gray-400 text-xs">{station.country}</p>
                      {station.tags && (
                        <p className="text-purple-400 text-xs mt-1 truncate">
                          {station.tags.split(',').slice(0, 2).join(', ')}
                        </p>
                      )}
                    </div>
                    {station.favicon && (
                      <img
                        src={station.favicon}
                        alt={station.name}
                        className="w-8 h-8 rounded ml-2 flex-shrink-0"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

