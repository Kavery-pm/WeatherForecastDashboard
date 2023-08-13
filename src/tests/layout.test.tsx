import { render, screen } from '@testing-library/react';
import Layout from '../components/Reusable/Layout';

describe('Layout', () => {
  it('renders the title', () => {
    const title = 'Test Title';
    render(<Layout title={title} content={<div />} />);
    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();
  });

  it('renders the section sub-header if provided', () => {
    const sectionSubHeader = <div>Sub-header content</div>;
    render(<Layout title="Test Title" content={<div />} sectionSubHeader={sectionSubHeader} />);
    const subHeaderElement = screen.getByText('Sub-header content');
    expect(subHeaderElement).toBeInTheDocument();
  });

  it('does not render the section sub-header if not provided', () => {
    render(<Layout title="Test Title" content={<div />} />);
    const subHeaderElement = screen.queryByText('Sub-header content');
    expect(subHeaderElement).not.toBeInTheDocument();
  });

  it('renders the content', () => {
    const content = <div>Content</div>;
    render(<Layout title="Test Title" content={content} />);
    const contentElement = screen.getByText('Content');
    expect(contentElement).toBeInTheDocument();
  });

  it('applies custom styling to the container', () => {
    const customStyle = { backgroundColor: 'red' };
    render(<Layout title="Test Title" content={<div />} sx={customStyle} />);
    const container = screen.getByTestId('layout-container');
    expect(container).toHaveStyle('background-color: red');
  });

 
});
