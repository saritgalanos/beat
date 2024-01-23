import axios from "axios";
import { stationService } from "./station.service";

export const youtubeService = {
    search
}

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY

async function search(query) {
    try {
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
        params: {
          part: 'snippet',
          maxResults: 30,
          type: 'video',
          key: API_KEY,
          q: query,
          order: 'viewCount'
        },
      })
      const songs =  stationService.createSongsListFromSearchResults(response.data)
      return songs

    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  }