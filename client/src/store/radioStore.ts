import { create } from 'zustand';

export interface RadioStation {
  id: string;
  name: string;
  url: string;
  country: string;
  countrycode: string;
  state: string;
  language: string;
  votes: number;
  favicon: string;
  tags: string;
  clickcount: number;
  geo?: {
    latitude: number;
    longitude: number;
  };
}

interface RadioStore {
  stations: RadioStation[];
  filteredStations: RadioStation[];
  currentStation: RadioStation | null;
  isPlaying: boolean;
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  selectedCountry: string | null;
  selectedGenre: string | null;

  setStations: (stations: RadioStation[]) => void;
  setFilteredStations: (stations: RadioStation[]) => void;
  setCurrentStation: (station: RadioStation | null) => void;
  setIsPlaying: (playing: boolean) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCountry: (country: string | null) => void;
  setSelectedGenre: (genre: string | null) => void;
  filterStations: (query: string, country?: string | null, genre?: string | null) => void;
}

export const useRadioStore = create<RadioStore>((set, get) => ({
  stations: [],
  filteredStations: [],
  currentStation: null,
  isPlaying: false,
  isLoading: false,
  error: null,
  searchQuery: '',
  selectedCountry: null,
  selectedGenre: null,

  setStations: (stations) => set({ stations }),
  setFilteredStations: (stations) => set({ filteredStations: stations }),
  setCurrentStation: (station) => set({ currentStation: station }),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCountry: (country) => set({ selectedCountry: country }),
  setSelectedGenre: (genre) => set({ selectedGenre: genre }),

  filterStations: (query, country, genre) => {
    const { stations } = get();
    let filtered = stations;

    if (query) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(
        (station) =>
          station.name.toLowerCase().includes(lowerQuery) ||
          station.country.toLowerCase().includes(lowerQuery) ||
          station.tags.toLowerCase().includes(lowerQuery)
      );
    }

    if (country) {
      filtered = filtered.filter((station) => station.country === country);
    }

    if (genre) {
      const lowerGenre = genre.toLowerCase();
      filtered = filtered.filter((station) =>
        station.tags.toLowerCase().includes(lowerGenre)
      );
    }

    set({
      filteredStations: filtered,
      searchQuery: query,
      selectedCountry: country || null,
      selectedGenre: genre || null,
    });
  },
}));

