// import { render, screen} from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect'; // Import the jest-dom matchers
// import DayTemperatureDetails from '../components/weeklyForecast/dayTemperatureDetails';

// test('renders temperature details',()=>{
//     const maxTemp = 313.15; // In Kelvin
//     const minTemp = 285.15; // In Kelvin
// const humidity = 89;
// render(<DayTemperatureDetails maxTemp={maxTemp} minTemp={minTemp} humidity={humidity}/>)
//  const maxTempElement = screen.getByText(`Max: ${Math.round(maxTemp - 273.15)}°C`);
// const minTempElement = screen.getByText(`Min: ${Math.round(minTemp - 273.15)}°C`);
// const humidityElement = screen.getByText(`Humidity: ${humidity}%`);
// expect(maxTempElement).toBeInTheDocument();
// expect(minTempElement).toBeInTheDocument();
// expect(humidityElement).toBeInTheDocument();
// })
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DayTemperatureDetails from '../components/weeklyForecast/dayTemperatureDetails';

test('renders temperature details', () => {
  const maxTemp = 313; // Kelvin value
  const minTemp = 285; // Kelvin value
  const humidity = 89;

  const maxTempPattern = new RegExp(`Max: ${Math.round(maxTemp - 273.15)} °C`);
  const minTempPattern = new RegExp(`Min: ${Math.round(minTemp - 273.15)} °C`);
  const humidityPattern = new RegExp(`Humidity: ${humidity}%`);

  render(<DayTemperatureDetails maxTemp={maxTemp} minTemp={minTemp} humidity={humidity} />);

  const maxTempElement = screen.getByText(maxTempPattern);
  const minTempElement = screen.getByText(minTempPattern);
  const humidityElement = screen.getByText(humidityPattern);

  expect(maxTempElement).toBeInTheDocument();
  expect(minTempElement).toBeInTheDocument();
  expect(humidityElement).toBeInTheDocument();
});
