/**
 * Layout Component
 *
 * The Layout component provides a consistent structure for rendering a page section.
 * It includes a customizable title, section subheader, and content area.
 *
 * @component
 * @example
 * // Basic usage of the Layout component
 * <Layout title="Page Title" content={<p>This is the main content of the page.</p>} />
 *
 * @param {LayoutProps} props - The props for the Layout component.
 * @returns {JSX.Element} - The rendered Layout component.
 */



import { Grid } from '@mui/material';
import React, { ReactNode } from 'react';
import SectionHeader from './sectionHeader';

interface LayoutProps {
  content: ReactNode;
  title: string;
  sx?: object;
  mb?: string;
  sectionSubHeader?: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ content, title, sx, mb, sectionSubHeader }) => {
  return (
    <Grid container sx={sx}  data-testid="layout-container">
      <Grid item xs={12}>
        <SectionHeader title={title} mb={mb || '0'} />
        {sectionSubHeader || null}
      </Grid>
      {content}
    </Grid>
  );
};

export default Layout;
