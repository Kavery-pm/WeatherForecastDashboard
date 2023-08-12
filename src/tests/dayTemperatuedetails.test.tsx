import { render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import the jest-dom matchers
import DayTemperatureDetails from '../components/weeklyForecast/dayTemperatureDetails';

test('renders temperature details',()=>{
const maxTemmp =40;
const minTemp= 12;
const humidity = 89;
render(<DayTemperatureDetails maxTemp={maxTemmp} minTemp={minTemp} humidity={humidity}/>)
const maxTempElement = screen.getByText(`Max: ${maxTemmp}°C`);
const minTempElement = screen.getByText(`Min: ${minTemp}°C`);
const humidityElement = screen.getByText(`Humidity: ${humidity}%`);
expect(maxTempElement).toBeInTheDocument();
expect(minTempElement).toBeInTheDocument();
expect(humidityElement).toBeInTheDocument();
})