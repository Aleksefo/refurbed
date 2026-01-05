# Refurbed - Deals Spotlight Feature

A React Native mobile app showcasing Deals Spotlight feature with filtering, sorting, and analytics tracking capabilities.

## Tech Stack

- **Framework**: React Native (Expo)
- **Language**: TypeScript
- **Navigation**: Expo Router
- **Testing**: Jest
- **State Management**: React Hooks
- **Performance**: useMemo, useCallback, Flatlist optimizations

### Installation
```bash
yarn install
```
### Running the App

yarn start

yarn ios

yarn android

## Running tests
```bash
yarn test
```

## Features Implemented
- **Deals List Screen**: Displays a list of refurbished product deals with key information
- **Deal Details Screen**: Shows information about a selected deal
- **Sort & Filter**: Sort by price or score, filter by minimum score
- **Navigation**: Stack-based navigation with deep-link friendly routes (Expo router)
- **Analytics Integration**: Mocked analytics service tracking deal impressions and clicks
- **Feature Flag System**: Mocked feature flag service to conditionally enable/disable the feature
- **Performance Optimizations**: Memoization, virtualized lists, and optimized rendering
- **Testing**: Unit tests for core business logic


## Architectural Decisions
**Separation of Concerns**
- All the functionality is separated into screens, components, navigation, utils, services and tests to make the code more maintainable and testable.
- Business logic in `utils/` can be tested independently of UI.
- Service abstractions (`analytics.ts`, `featureFlags.ts`) can be easily replaced with real implementations.

**State Management**
- I used React hooks for local state management since the implementation is quite simple. 
- If it would grow in complexity, I would use Zustand and possibly something like React Query to manage the state received from the backend.

**Performance Optimizations**
- Implemented React.memo, useMemo, useCallback for filtering/sorting to reduce computation on every render.
- FlatList optimizations to prevent unnecessary re-renders of list items.

**TypeScript Usage**
- Strict TypeScript throughout the codebase for better code quality, easier readability and maintainability.

**Expo Router**
- I used Expo Router for file-based routing since it provides deep linking support out of the box, has type-safe navigation and provides simpler than React Navigation setup.

**Testing Approach**
- Tests are written for core business logic (not UI components). No need to render components, just test logic


## What I Would Do Next
Given more time, I would:

### Short Term
1. **Add more test coverage**: Component tests using React Native Testing Library. Test services and utils.
2. **Error handling**: Mock API and provide network error states, retry logic, loading states
3. **Accessibility**: Add proper labels, screen reader support, keyboard navigation
4. **Animations**: Add subtle transitions between screens and list updates
5. **Real data integration**: Replace mock data with actual API calls

### Medium Term
1. **Pagination**: Implement infinite scroll for large datasets
2. **Search functionality**: Add search bar to filter deals by name
3. **Advanced filters**: Multiple filter options (category, price range, etc.)
4. **Favorites**: Allow users to save deals
5. **Share functionality**: Share deals via native share sheet

### Long Term
1. **Offline support**: Cache deals locally for offline viewing
2. **Push notifications**: Notify users about new deals
3. **Performance monitoring**: Add Sentry or similar for crash reporting
4. **Analytics deep dive**: Track user behavior patterns and optimize UX


## OTA Updates vs Store Releases
For the initial release I would use the standard path of internal testing/testflight.

Normally I would also use this approach for a regularly scheduled released that are not time-sensitive.

If I need to publish a release fast (e.g. a critical bug-fix) I would use Expo Updates for OTA.
It can also be used for some minor UI updates, feature flag toggles, etc, but usually it is safer to use it only for something critical since both Google and Apple do not appreaciate developers going around their respective stores and might cause us issues long-term.

If I need to update feature flags or minimum required app version, for example, I prefer to use something like Firebase Remote config.

The biggest limitation of OTA is not being able to update native code. So any native SDK integration changes or certain library updates have to go through the official store process.

The biggest advantage of OTA is speed and developer control (e.g. can even rollback a buggy feature, or time the update for an important event).
