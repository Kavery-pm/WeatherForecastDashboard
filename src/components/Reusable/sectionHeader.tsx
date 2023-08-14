/**
 * SectionHeader Component
 *
 * The SectionHeader component displays a title for a section, with optional margin bottom.
 *
 * @component
 * @example
 * // Basic usage of the SectionHeader component
 * <SectionHeader title="Section Title" />
 *
 * @param {SectionHeaderProps} props - The props for the SectionHeader component.
 * @returns {JSX.Element} - The rendered SectionHeader component.
 */



import { Typography, TypographyProps } from '@mui/material';
import React from 'react';

interface SectionHeaderProps {
  title: string;
  mb?: string;
}

const SectionHeader: React.FC<SectionHeaderProps & TypographyProps> = ({ title, mb }) => {
  return (
    <Typography
      variant="h5"
      component="h5"
      sx={{
        fontSize: { xs: '12px', sm: '16px', md: '18px' },
        color: 'rgba(255,255,255,.7)',
        fontWeight: '600',
        lineHeight: 1,
        textAlign: 'center',
        fontFamily: 'Roboto Condensed',
        marginBottom: mb ? mb : '1rem',
      }}
    >
      {title}
    </Typography>
  );
};

export default SectionHeader;
