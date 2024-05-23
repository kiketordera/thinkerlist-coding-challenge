import { EpisodeData, TimingsData, UUID, UnixTimestamp } from "./data_model";
import { msToSeconds } from "./helpers";


/**
 * Calculates the front times for all parts and items in the episode.
 *
 * @param episodeData - The data structure containing episode information, including parts and items.
 * @param timings - The data structure containing timing information for parts and items.
 * @param onAirTime - The start time of the episode as a Unix timestamp.
 * @returns The updated timings data with calculated front times for parts and items.
 */
export function calculateFrontTimes(episodeData: EpisodeData, timings: TimingsData, onAirTime: UnixTimestamp): TimingsData {
  let currentFrontTime = onAirTime;

  // Iterate over each part in the episode to calculate front times
  episodeData.episode.parts.forEach((partId: UUID) => {
    const part = timings.part[partId];
    part.front_time = currentFrontTime;
    currentFrontTime += part.estimated_duration;

    // Initialize current front time for items within the part
    let itemCurrentFrontTime = part.front_time;

    // Iterate over each item in the part to calculate front times
    episodeData.part[partId].items.forEach((itemId: UUID) => {
      const item = timings.item[itemId];
      item.front_time = itemCurrentFrontTime;
      itemCurrentFrontTime += item.estimated_duration;
    });
  });
  return timings;
}




/**
 * Calculates the end times for all parts and items in the episode.
 *
 * @param episodeData - The data structure containing episode information, including parts and items.
 * @param timings - The data structure containing timing information for parts and items.
 * @returns The updated timings data with calculated end times for parts and items.
 */
export function calculateEndTimes(episodeData: EpisodeData, timings: TimingsData): TimingsData {
  // Iterate over each part in the episode to calculate end times
  episodeData.episode.parts.forEach((partId: UUID) => {
    const part = timings.part[partId];

    // Calculate the end time for the part
    part.end_time = part.front_time! + part.estimated_duration;

    // Iterate over each item in the part to calculate end times
    episodeData.part[partId].items.forEach((itemId: UUID) => {
      const item = timings.item[itemId];
      item.end_time = item.front_time! + item.estimated_duration;
    });
  });
  return timings;
}

/**
 * Calculates the back times for all parts and items in the episode.
 *
 * @param episodeData - The data structure containing episode information, including parts and items.
 * @param timings - The data structure containing timing information for parts and items.
 * @returns The updated timings data with calculated back times for parts and items.
 */
export function calculateBackTimes(episodeData: EpisodeData, timings: TimingsData): TimingsData {
  const episodeOffAirTime = timings.episode.off_air_time;
  let previousBackTime = episodeOffAirTime;

  // Reverse iterate over each part in the episode to calculate back times
  episodeData.episode.parts.reverse().forEach((partId: UUID) => {
    const part = timings.part[partId];
    part.back_time = previousBackTime - part.estimated_duration;
    previousBackTime = part.back_time;

    // Initialize next back time for items within the part
    let nextItemBackTime = part.end_time;

    // Reverse iterate over each item in the part to calculate back times
    episodeData.part[partId].items.reverse().forEach((itemId: UUID) => {
      const item = timings.item[itemId];
      item.back_time = (nextItemBackTime ?? 0) - item.estimated_duration;
      nextItemBackTime = item.back_time;
    });
  });
  return timings;
}