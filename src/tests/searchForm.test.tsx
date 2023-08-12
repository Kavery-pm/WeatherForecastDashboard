
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import the jest-dom matchers
import SearchForm from '../components/searchForm';


test('renders input field and search button', () => {
  render(<SearchForm onSearch={() => {}} />);

  const inputElement = screen.getByLabelText(/Enter city Name/i);
  const buttonElement = screen.getByRole('button', { name: /Search city/i });

  expect(inputElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();
});

test('calls onSearch with correct value when button is clicked', () => {
  const mockOnSearch = jest.fn();
  render(<SearchForm onSearch={mockOnSearch} />);

  const inputElement = screen.getByLabelText(/Enter city Name/i);
  const buttonElement = screen.getByRole('button', { name: /Search city/i });

  fireEvent.change(inputElement, { target: { value: 'New York' } });
  fireEvent.click(buttonElement);

  expect(mockOnSearch).toHaveBeenCalledWith('New York');
});
