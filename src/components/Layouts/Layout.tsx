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
    <Grid container sx={sx}>
      <Grid item xs={12}>
        <SectionHeader title={title} mb={mb || '0'} />
        {sectionSubHeader || null}
      </Grid>
      {content}
    </Grid>
  );
};

export default Layout;
