import { calculateBackTimes, calculateEndTimes, calculateFrontTimes } from "./calculations";
import { EpisodeData, TimingsData } from "./data_model";

export function useTimings() {
  /**
   * Calculates the timings (front times, end times, back times) for all parts and items in the episode.
   *
   * @param episodeData - The data structure containing episode information, including parts and items.
   * @param timingsData - The data structure containing timing information for parts and items.
   * @returns A copy of the timings data with calculated front times, end times, and back times for parts and items.
   */
  function calculateTimings(episodeData: EpisodeData, timingsData: TimingsData): TimingsData {
    // Create a deep copy of the timings data to avoid mutating the original
    const copyOfTimings: TimingsData = JSON.parse(JSON.stringify(timingsData));
    const episodeOnAirTime = copyOfTimings.episode.on_air_time;
      
    calculateFrontTimes(episodeData, copyOfTimings, episodeOnAirTime);
    calculateEndTimes(episodeData, copyOfTimings);
    calculateBackTimes(episodeData, copyOfTimings);

    // Return the updated timings data
    return copyOfTimings;
  }
  return {
    calculateTimings
  };
}