import { render, screen, fireEvent } from "@testing-library/react";

import ErrorBox from "../components/reusable/errorBox";

describe("ErrorBox", () => {
  it('renders with "info" type', () => {
    render(<ErrorBox type="info" />);
    const errorBox = screen.getByTestId("error-box");
    expect(errorBox).toHaveStyle("color: #f5a922");
  });

  it('renders with "error" type', () => {
    render(<ErrorBox type="error" />);
    const errorBox = screen.getByTestId("error-box");
    expect(errorBox).toHaveStyle("color: #DC2941");
  });

  it("displays provided error message", () => {
    const errorMessage = "This is a test error message";
    render(<ErrorBox errorMessage={errorMessage} />);
    const errorText = screen.getByText(errorMessage);
    expect(errorText).toBeInTheDocument();
  });

  it("displays default error message if no errorMessage prop is provided", () => {
    render(<ErrorBox />);
    const defaultErrorMessage = "Internal error";
    const errorText = screen.getByText(defaultErrorMessage);
    expect(errorText).toBeInTheDocument();
  });

  it('displays "Reload page" button and reloads the page when clicked', () => {
    const reload = jest.fn();
    // Mock window.location.reload to be a jest.fn()
    Object.defineProperty(window, "location", {
      value: { reload },
      writable: true,
    });

    render(<ErrorBox />);

    // Find the "Reload page" button and click it
    const reloadButton = screen.getByText("Reload page");
    fireEvent.click(reloadButton);

    // Verify that window.location.reload has been called
    expect(reload).toHaveBeenCalled();

    // Restore the original window.location
    Object.defineProperty(window, "location", {
      value: location,
      writable: true,
    });
  });
});
