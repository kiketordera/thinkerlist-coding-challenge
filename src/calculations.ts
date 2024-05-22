import { EpisodeData, TimingsData, UUID, UnixTimestamp } from "./data_model";
import { msToSeconds } from "./helpers";


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

