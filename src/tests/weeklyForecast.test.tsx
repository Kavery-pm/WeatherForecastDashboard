import {  render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import WeeklyForecast from '../components/weeklyForecast/WeeklyForecast';


describe('WeeklyForecast component', () => {
//   const forecastData: { list: ForecastItem[] } = {
//     list: [
//       {
//         dt: 1691971200,
//         dt_txt: '08/08/2023 15:00:00',
//         temperature: 456,
//         humidity: 100,
//         main: {
//           feels_like: 292.76,
//           temp_min: 292.26,
//           temp_max: 292.26,
//           pressure: 1017,
//           humidity: 60,
//           // ... other properties
//         },
//         weather: [
//           {
//             description: 'Cloudy',
//           },
//         ],
//       },
//     ],
//   };

 
 
  
  
  
  
  
  
  test('renders WeeklyForecast component without data', () => {
    render(<WeeklyForecast forecastData={{ list: [] }} />);

    // Test if the "No weather data available" message is displayed correctly
    const noDataMessageElement = screen.getByText(/No weather data available./);
    expect(noDataMessageElement).toBeInTheDocument();
  });
});
