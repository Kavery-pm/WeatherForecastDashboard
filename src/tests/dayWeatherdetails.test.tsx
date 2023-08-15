import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DayWeatherDetails from "../components/hourlyForecasts/dayWeatherDetails";
describe("renders day weather details", () => {
  test("renders time", () => {
    const desc = "cloudy";
    const day = "2023-08-14 12:00:00";
    const type = "hourly";

    render(<DayWeatherDetails description={desc} day={day} type={type} />);

    const descriptionElement = screen.getByText(/cloudy/);
    expect(descriptionElement).toBeInTheDocument();

    if (type === "hourly") {
      const timeElement = screen.getByText("12:00:00");
      expect(timeElement).toBeInTheDocument();
    } else {
      const dayElement = screen.getByText(/Sunday/);
      expect(dayElement).toBeInTheDocument();
    }
  });
  test("renders the day correctly", () => {
    const desc = "cloudy";
    const day = "2023-08-14 12:00:00";
    const type = "hourly";
    render(<DayWeatherDetails description={desc} day={day} type={type} />);
    const descriptionElement = screen.getByText(/cloudy/);
    expect(descriptionElement).toBeInTheDocument();

    if (type === "hourly") {
      const timeElement = screen.getByText("12:00:00");
      expect(timeElement).toBeInTheDocument();
    } else {
      const dayElement = screen.getByText(/Monday/);
      expect(dayElement).toBeInTheDocument();
    }
  });
});
