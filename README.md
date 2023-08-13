# WeatherForecastDashboard


This is a single-page application (SPA) built using React and TypeScript that consumes the OpenWeatherMap API. The Weather Dashboard allows users to view weather details of different cities, search for cities, mark cities as favorites, and view weather forecasts and also has the location based weather

## Features

- Search for a city by name to view current weather conditions.
- Mark and display favorite cities.
- Display a 5-day weather forecast for the selected city.
- Responsive design for various device sizes.
- Error handling for API request failures and non-existent city searches.
- Unit tests for components using Jest and Testing Library.

## Setup and Run Instructions

1. Clone the repository:
git clone https://github.com/Kavery-pm/WeatherForecastDashboard.git
2. Install dependencies:
cd weather-app
npm install

3. Start the development server:

  npm run dev

  

4. Access the app in your browser at the URL provided by Vite, typically http://localhost:3000 or another URL mentioned in your Vite configuration.

## Note for Vite Users

If you're using Vite, the development server URL may differ from the traditional http://localhost:3000, depending on your Vite configuration. Refer to the console output when you run `npm run dev` to determine the correct URL to access the app.



## Design and Development Choices

- **Technologies Used**: React, TypeScript, OpenWeatherMap API, @mui/material, Jest, scss,Testing Library.
- **Search Functionality**: Users can search for cities by name using the OpenWeatherMap API's city search endpoint.
- **Favorites Functionality**: Favorite cities are stored in local storage for persistence across page reloads.
- **Weather Forecast**: The app fetches and displays a 5-day weather forecast for the selected city.
- **Responsiveness**: The app is designed to be responsive using @mui/material's responsive design features.
- **Error Handling**: Errors from API requests and non-existent city searches are handled and displayed to the user.
- **Unit Tests**: Basic unit tests are implemented for components using Jest and Testing Library.

## Bonus Features

- **Detailed Forecast**: Clicking on a day in the 5-day forecast displays a more detailed forecast.
- **Location-based Weather**: Users can view weather for their current location if they grant access.
- **Custom Styling**: The app uses @mui/material for styling and responsive design.

## Contributors

-Kavery (shiny.kavery@gmail.com)



