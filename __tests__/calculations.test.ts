import { calculateFrontTimes, calculateEndTimes, calculateBackTimes } from '../src/calculations';
import { EpisodeData, TimingsData, UnixTimestamp } from '../src/data_model';

const mockEpisodeData: EpisodeData = {
  episode: {
    id: 'episode-1',
    status: 'active',
    title: 'Sample Episode',
    parts: ['part-1', 'part-2', 'part-3']
  },
  part: {
    'part-1': {
      id: 'part-1',
      title: 'Part 1',
      items: ['item-1', 'item-2']
    },
    'part-2': {
      id: 'part-2',
      title: 'Part 2',
      items: ['item-3', 'item-4', 'item-5']
    },
    'part-3': {
      id: 'part-3',
      title: 'Part 3',
      items: ['item-6']
    }
  },
  item: {
    'item-1': { id: 'item-1', title: 'Item 1.1' },
    'item-2': { id: 'item-2', title: 'Item 1.2' },
    'item-3': { id: 'item-3', title: 'Item 2.1' },
    'item-4': { id: 'item-4', title: 'Item 2.2' },
    'item-5': { id: 'item-5', title: 'Item 2.3' },
    'item-6': { id: 'item-6', title: 'Item 3.1' }
  }
};

const mockTimingsData: TimingsData = {
  episode: {
    on_air_time: 46800,
    off_air_time: 49500 
  },
  part: {
    'part-1': {
      estimated_duration: 600,
      front_time: null,
      end_time: null,
      back_time: null
    },
    'part-2': {
      estimated_duration: 1500,
      front_time: null,
      end_time: null,
      back_time: null
    },
    'part-3': {
      estimated_duration: 600,
      front_time: null,
      end_time: null,
      back_time: null
    }
  },
  item: {
    'item-1': {
      estimated_duration: 300,
      front_time: null,
      end_time: null,
      back_time: null
    },
    'item-2': {
      estimated_duration: 300,
      front_time: null,
      end_time: null,
      back_time: null
    },
    'item-3': {
      estimated_duration: 600,
      front_time: null,
      end_time: null,
      back_time: null
    },
    'item-4': {
      estimated_duration: 300,
      front_time: null,
      end_time: null,
      back_time: null
    },
    'item-5': {
      estimated_duration: 600,
      front_time: null,
      end_time: null,
      back_time: null
    },
    'item-6': {
      estimated_duration: 600,
      front_time: null,
      end_time: null,
      back_time: null
    }
  }
};

describe('Timing calculations', () => {
  it('should calculate front times correctly', () => {
    const updatedTimings = calculateFrontTimes(mockEpisodeData, mockTimingsData, mockTimingsData.episode.on_air_time);
    expect(updatedTimings.part['part-1'].front_time).toBe(46800); // 13:00:00
    expect(updatedTimings.item['item-1'].front_time).toBe(46800); // 13:00:00
    expect(updatedTimings.item['item-2'].front_time).toBe(47100); // 13:05:00
    expect(updatedTimings.part['part-2'].front_time).toBe(47400); // 13:10:00
    expect(updatedTimings.item['item-3'].front_time).toBe(47400); // 13:10:00
    expect(updatedTimings.item['item-4'].front_time).toBe(48000); // 13:20:00
    expect(updatedTimings.item['item-5'].front_time).toBe(48300); // 13:25:00
    expect(updatedTimings.part['part-3'].front_time).toBe(48900); // 13:35:00
    expect(updatedTimings.item['item-6'].front_time).toBe(48900); // 13:35:00
  });

  it('should calculate end times correctly', () => {
    const updatedTimings = calculateEndTimes(mockEpisodeData, calculateFrontTimes(mockEpisodeData, mockTimingsData, mockTimingsData.episode.on_air_time));
    expect(updatedTimings.part['part-1'].end_time).toBe(47400); // 13:10:00
    expect(updatedTimings.item['item-1'].end_time).toBe(47100); // 13:05:00
    expect(updatedTimings.item['item-2'].end_time).toBe(47400); // 13:10:00
    expect(updatedTimings.part['part-2'].end_time).toBe(48900); // 13:35:00
    expect(updatedTimings.item['item-3'].end_time).toBe(48000); // 13:20:00
    expect(updatedTimings.item['item-4'].end_time).toBe(48300); // 13:25:00
    expect(updatedTimings.item['item-5'].end_time).toBe(48900); // 13:35:00
    expect(updatedTimings.part['part-3'].end_time).toBe(49500); // 13:45:00
    expect(updatedTimings.item['item-6'].end_time).toBe(49500); // 13:45:00
  });

  it('should calculate back times correctly', () => {
    const updatedTimings = calculateBackTimes(mockEpisodeData, calculateEndTimes(mockEpisodeData, calculateFrontTimes(mockEpisodeData, mockTimingsData, mockTimingsData.episode.on_air_time)));
    expect(updatedTimings.part['part-3'].back_time).toBe(48900); // 13:35:00
    expect(updatedTimings.item['item-6'].back_time).toBe(48900); // 13:35:00
    expect(updatedTimings.part['part-2'].back_time).toBe(47400); // 13:10:00
    expect(updatedTimings.item['item-5'].back_time).toBe(48300); // 13:25:00
    expect(updatedTimings.item['item-4'].back_time).toBe(48000); // 13:20:00
    expect(updatedTimings.item['item-3'].back_time).toBe(47400); // 13:10:00
    expect(updatedTimings.part['part-1'].back_time).toBe(46800); // 13:00:00
    expect(updatedTimings.item['item-2'].back_time).toBe(47100); // 13:05:00
    expect(updatedTimings.item['item-1'].back_time).toBe(46800); // 13:00:00
  });
});
