# rn_challenge
React Native app for evaluation that lists searched results from OMDb API.

## Setup
___

To run this project you need to React Native environment was setup. For more details see __'React Native CLI Quickstart'__ section in [official documentation](https://reactnative.dev/docs/environment-setup).

If you already setup React Native environment, run `yarn install` in the project root folder.

After that go to the `ios` folder (run `cd ios`) and run `pod install`.

## Run
___
In the project root folder run:
- `react-native run-ios` to run project on iPhone simulator 

or
- `react-native run-android` to run on Android emulator.

Also you can run project using IDE:
- XCode for iPhone,
- Android Studio for Android.

## Manual run using IDEs
___
Run `react-native start` in console.
### iPhone
1. Open XCode and open __rn_challenge.xcworkspace__ from this project __ios__ folder.
2. Press run button.

### Android
1. Open Android Studio and open __app__ folder from this project __android__ folder.
2. Press run button.

## Running tests
___
`yarn test`

## Technical choices and solutions
___
- OMDb API was used.
- The latest React Native and Typescript versions were used.
- Unit tests were written.
- Pagination was implemented.
- The following libraries were used for testing:
    
    * _jest_ for writing unit-tests
    * _react-test-renderer_ for components snapshot testing
    * _redux-saga-test-plan_ for testing sagas
    * _redux-mock-store_ for mocking Redux store in components/screens tests 

## Project structure
___
- \_\_tests__
    * \_\_mocks__ - contains mocked data for tests
    * \_\_utils__ - contains boilerplate code for testing
    * componentsTests - contains tests for general components from src/components
    * reduxTests - contains tests for actions, reducers, selectors and sagas
    * screensTests - contains tests for screens and their components
    * utilsTests - contains tests for utils from src/utils
- src
    * api - contains API calls
    * components - contains general components, which can be used on different screens
    * constants - contains string literals (errors texts, messages to user), API config, screen names etc.
    * navigation - contains navigator
    * redux - contains Redux
        * movies - contains actions, reducer, saga and selectors related to fetching movies
        * index.ts - exports store, action creators and types from all redux module to use from screens
        * store.ts - configures store 
        * types.ts - contains Redux types
    * screens
        * MovieScreen - contains all types, logic and view related to movie detailed information
        * SearchScreen - contains all types, logic and view related to home screen with search input    
        * index.ts - exports all screens
   * services - contains modules related to core business logic of application
   * theme - contains app palette
   * utils - contains network error handler, boilerplate saga code etc. 