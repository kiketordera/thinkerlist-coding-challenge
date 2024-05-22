export type UUID = string;

export interface EpisodeData {
  episode: Episode;
  part: { [key: UUID]: Part };
  item: { [key: UUID]: Item };
}

export interface Episode {
  id: UUID;
  status: string;
  title: string;
  parts: UUID[];
}

export interface Part {
  id: UUID;
  title: string;
  items: UUID[];
}

export interface Item {
  id: UUID;
  title: string;
}

// ********************** TIMINGS

export type UnixTimestamp = number;

export interface EpisodeTimings {
  on_air_time: UnixTimestamp;
  off_air_time: UnixTimestamp;
}


export interface TimingsStructure {
  estimated_duration: number;
  front_time: UnixTimestamp | null;
  end_time: UnixTimestamp | null;
  back_time: UnixTimestamp | null;
}



export interface TimingsData {
  episode: EpisodeTimings;
  part: Record<UUID, TimingsStructure>;
  item: Record<UUID, TimingsStructure>;
}

