import axios from "axios";
import { stationService } from "./station.service";

export const youtubeService = {
  search,
  getSongUrlByTitle
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

    const videoItems = response.data.items;

    // Fetch duration for each video
    const songs = await Promise.all(videoItems.map(async (item) => {
      const videoId = item.id.videoId;
      const duration = await getVideoDuration(videoId);
      return {
        id: item.id.videoId,
        title: item.snippet.title,
        url: item.id.videoId,
        imgUrl: item.snippet.thumbnails.default.url,
        addedBy: '',
        addedAt: '',
        duration: formatDuration(duration)
      }
    }))

    return songs

  } catch (error) {
    console.error('Error fetching data: ', error);
  }
}



async function getVideoDuration(videoId) {
  try {
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
      params: {
        part: 'contentDetails',
        id: videoId,
        key: API_KEY
      },
    });

    const duration = response.data.items[0].contentDetails.duration;
    return duration;
  } catch (error) {
    console.error('Error fetching video duration: ', error);
    return null; // Return null in case of error
  }
}


async function getSongUrlByTitle(songTitle) {
  try {
    
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
      params: {
        part: 'snippet',
        maxResults: 5,
        type: 'video',
        key: API_KEY,
        q: songTitle
      },
    })

    console.log('getSongUrlByTitle:',response.data.items[0].id.videoId)

    // Extract the video ID from the response
    const videoId = response.data.items[0].id.videoId;

    return videoId;
  } catch (error) {
    console.error('Error fetching YouTube video ID:', error);
    return null;
  }
}


function formatDuration(durationString) {
  // Extract minutes and seconds from the duration string using regular expressions
  const minutesMatch = durationString.match(/(\d+)M/);
  const secondsMatch = durationString.match(/(\d+)S/);

  // Extract minutes and seconds from the matches, defaulting to 0 if not found
  const minutes = minutesMatch ? parseInt(minutesMatch[1]) : 0;
  const seconds = secondsMatch ? parseInt(secondsMatch[1]) : 0;

  // Format the duration as 'mm:ss'
  const formattedDuration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  return formattedDuration;
}
