import {  render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import WeeklyForecast from '../components/weeklyForecast/WeeklyForecast';


describe('WeeklyForecast component', () => {

 test('renders WeeklyForecast component without data', () => {
    render(<WeeklyForecast forecastData={{ list: [] }} />);

    // Test if the "No weather data available" message is displayed correctly
    const noDataMessageElement = screen.getByText(/No weather data available./);
    expect(noDataMessageElement).toBeInTheDocument();
  });
});
