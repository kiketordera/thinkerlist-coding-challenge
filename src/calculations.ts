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
    currentFrontTime += msToSeconds(part.estimated_duration);

    let itemCurrentFrontTime = part.front_time;
    // Iterate over each item in the part to calculate front times
    episodeData.part[partId].items.forEach((itemId: UUID) => {
      const item = timings.item[itemId];
      item.front_time = itemCurrentFrontTime;
      itemCurrentFrontTime += msToSeconds(item.estimated_duration);
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
    part.end_time = (part.front_time ?? 0) + msToSeconds(part.estimated_duration);

    // Iterate over each item in the part to calculate end times
    episodeData.part[partId].items.forEach((itemId: UUID) => {
      const item = timings.item[itemId];
      item.end_time = (item.front_time ?? 0) + msToSeconds(item.estimated_duration);
    });
  });
  return timings;
}
