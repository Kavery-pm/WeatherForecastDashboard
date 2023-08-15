import { render, screen, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import App from '../App';
import theme from '../themes/themes';

// Mock fetchWeather and fetchForecast functions
jest.mock('../services/apiServices/weatherApi', () => ({
  fetchWeatherByCityName: jest.fn(() =>
    Promise.resolve({
      name: 'Berlin',
      main: {
        temp: 20,
        humidity: 60,
      },
      weather: [{ description: 'Cloudy' }],
    })
  ),
  fetchWeatherByCoordinates: jest.fn(() =>
    Promise.resolve({
      name: 'Berlin',
      main: {
        temp: 20,
        humidity: 60,
      },
      weather: [{ description: 'Cloudy' }],
    })
  ),
  fetchForecast: jest.fn(() =>
    Promise.resolve({
      list: [
        {
          dt_txt: '2023-07-28 12:00:00',
          main: {
            temp_max: 25,
            temp_min: 15,
            humidity: 70,
          },
          weather: [{ description: 'Sunny' }],
        },
      ],
    })
  ),
}));

class GeolocationMock {
  getCurrentPosition(
    callback: PositionCallback,
   
  ): void {
    callback({
      coords: {
        latitude: 52.5200,
        longitude: 13.4050,
        accuracy: 1,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null,
      },
      timestamp: Date.now(),
    });
  }
}

describe('App', () => {
  beforeEach(() => {
    (global.navigator as any).geolocation = new GeolocationMock();
  });

  afterEach(() => {
    delete (global.navigator as any).geolocation;
  });

  it('renders App component', async () => {
    render(
    <ThemeProvider theme={theme}> {/* Provide the theme */}
    <App />
  </ThemeProvider>)
    // Wait for geolocation-based data to load
    await waitFor(() => screen.getByText(/Berlin/i));

   
  });
});
