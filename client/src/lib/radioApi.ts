import axios from 'axios';
import { RadioStation } from '@/store/radioStore';

const RADIO_BROWSER_API = 'https://fi1.api.radio-browser.info/json';

export const radioApi = {
  async getStations(limit: number = 500): Promise<RadioStation[]> {
    try {
      const response = await axios.get(
        `${RADIO_BROWSER_API}/stations?limit=${limit}&order=votes&reverse=true`,
        {
          headers: {
            'User-Agent': 'RadioGarden/1.0',
          },
        }
      );

      // Transform API response to our RadioStation format
      return response.data.map((station: any) => ({
        id: station.stationuuid || station.name,
        name: station.name,
        url: station.url || station.url_resolved,
        country: station.country || 'Unknown',
        countrycode: station.countrycode || 'XX',
        state: station.state || '',
        language: station.language || '',
        votes: station.votes || 0,
        favicon: station.favicon || '',
        tags: station.tags || '',
        clickcount: station.clickcount || 0,
        geo: station.geo_lat && station.geo_long ? {
          latitude: parseFloat(station.geo_lat),
          longitude: parseFloat(station.geo_long),
        } : undefined,
      }));
    } catch (error) {
      console.error('Error fetching radio stations:', error);
      throw new Error('Failed to fetch radio stations');
    }
  },

  async searchStations(query: string): Promise<RadioStation[]> {
    try {
      const response = await axios.get(
        `${RADIO_BROWSER_API}/stations/search?name=${encodeURIComponent(query)}&limit=100`,
        {
          headers: {
            'User-Agent': 'RadioGarden/1.0',
          },
        }
      );

      return response.data.map((station: any) => ({
        id: station.stationuuid || station.name,
        name: station.name,
        url: station.url || station.url_resolved,
        country: station.country || 'Unknown',
        countrycode: station.countrycode || 'XX',
        state: station.state || '',
        language: station.language || '',
        votes: station.votes || 0,
        favicon: station.favicon || '',
        tags: station.tags || '',
        clickcount: station.clickcount || 0,
        geo: station.geo_lat && station.geo_long ? {
          latitude: parseFloat(station.geo_lat),
          longitude: parseFloat(station.geo_long),
        } : undefined,
      }));
    } catch (error) {
      console.error('Error searching radio stations:', error);
      throw new Error('Failed to search radio stations');
    }
  },

  async getStationsByCountry(countryCode: string): Promise<RadioStation[]> {
    try {
      const response = await axios.get(
        `${RADIO_BROWSER_API}/stations/bycountrycodeexact?countrycode=${countryCode}&limit=100`,
        {
          headers: {
            'User-Agent': 'RadioGarden/1.0',
          },
        }
      );

      return response.data.map((station: any) => ({
        id: station.stationuuid || station.name,
        name: station.name,
        url: station.url || station.url_resolved,
        country: station.country || 'Unknown',
        countrycode: station.countrycode || 'XX',
        state: station.state || '',
        language: station.language || '',
        votes: station.votes || 0,
        favicon: station.favicon || '',
        tags: station.tags || '',
        clickcount: station.clickcount || 0,
        geo: station.geo_lat && station.geo_long ? {
          latitude: parseFloat(station.geo_lat),
          longitude: parseFloat(station.geo_long),
        } : undefined,
      }));
    } catch (error) {
      console.error('Error fetching stations by country:', error);
      throw new Error('Failed to fetch stations by country');
    }
  },

  async getStationsByTag(tag: string): Promise<RadioStation[]> {
    try {
      const response = await axios.get(
        `${RADIO_BROWSER_API}/stations/bytagexact?tag=${encodeURIComponent(tag)}&limit=100`,
        {
          headers: {
            'User-Agent': 'RadioGarden/1.0',
          },
        }
      );

      return response.data.map((station: any) => ({
        id: station.stationuuid || station.name,
        name: station.name,
        url: station.url || station.url_resolved,
        country: station.country || 'Unknown',
        countrycode: station.countrycode || 'XX',
        state: station.state || '',
        language: station.language || '',
        votes: station.votes || 0,
        favicon: station.favicon || '',
        tags: station.tags || '',
        clickcount: station.clickcount || 0,
        geo: station.geo_lat && station.geo_long ? {
          latitude: parseFloat(station.geo_lat),
          longitude: parseFloat(station.geo_long),
        } : undefined,
      }));
    } catch (error) {
      console.error('Error fetching stations by tag:', error);
      throw new Error('Failed to fetch stations by tag');
    }
  },
};

