# Episode Timing Calculation

This project is designed to calculate and manage the timings of parts and items within an episode. It includes functions to calculate the front times, end times, and back times for all components of an episode.

## Project Structure

The project is organized into the following files:

- `app.ts`: Main entry point which provides the `useTimings` hook.
- `calculations.ts`: Contains the core functions for calculating front times, end times, and back times.
- `data_model.ts`: Defines the TypeScript interfaces and types used throughout the project.
- `helpers.ts`: Contains utility functions used by the main calculation functions.

## Decisions and Justifications

### Modularity

The project is structured to ensure modularity and separation of concerns:

- **app.ts**: Acts as the main entry point and provides a hook (`useTimings`) that integrates all timing calculation functions.
- **calculations.ts**: Contains the core logic for calculating timings. This separation ensures that the main logic is isolated and can be easily tested or modified.
- **data_model.ts**: Defines the data models used in the project. This centralization of type definitions ensures consistency and makes it easier to manage changes to the data structures.
- **helpers.ts**: Contains utility functions such as `msToSeconds` to avoid code duplication and enhance readability.

### Documentation

Each function is thoroughly documented using JSDoc comments to explain its purpose, parameters, and return values. This improves code readability and maintainability, making it easier for other developers to understand and contribute to the project.

### Immutability

The `calculateTimings` function in `app.ts` creates a deep copy of the `timingsData` to ensure that the original data is not mutated. This follows the principle of immutability, which helps prevent unintended side effects and makes the code more predictable and easier to debug.

## Usage


### Functions

#### useTimings

The `useTimings` function provides the `calculateTimings` function to calculate all required timings for an episode.

```typescript
import { useTimings } from './app';
import { EpisodeData, TimingsData } from './data_model';

const { calculateTimings } = useTimings();

const updatedTimings = calculateTimings(episodeData, timingsData);
console.log(updatedTimings);
```

### Data Models

The data models are defined in src/data_model.ts and include types for UUID, UnixTimestamp, EpisodeData, Part, Item, EpisodeTimings, PartTimings, ItemTimings, and TimingsData.

### Utility Functions

msToSeconds

Converts milliseconds to seconds.

### Running Tests

Use Jest to run the tests.

```
npm test
```