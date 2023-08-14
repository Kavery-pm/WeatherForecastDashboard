/**
 * ErrorBox Component
 *
 * The ErrorBox component displays an error message along with an optional "Reload page" button.
 * It provides different visual styles for different error types.
 *
 * @component
 * @example
 * // Display an error message with "Reload page" button
 * <ErrorBox errorMessage="Something went wrong. Please try again." type="error" />
 *
 * @example
 * // Display an info message without "Reload page" button
 * <ErrorBox errorMessage="This is an informational message." type="info" />
 *
 * @param {ErrorBoxProps} props - The props for the ErrorBox component.
 * @returns {JSX.Element} - The rendered ErrorBox component.
 */



import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Box from '@mui/material/Box';
import { Button, Typography} from '@mui/material';

interface ErrorBoxProps {
  type?: 'info' | 'error'; 
  display?: string;
  justifyContent?: string;
  alignItems?: string;
  margin?: string;
  gap?: string;
  flex?: string;
  width?: string;
  errorMessage?: string;
}

export default function ErrorBox(props: ErrorBoxProps) {
  return (
    <Box
    data-testid="error-box"
      display={props.display || 'flex'}
      justifyContent={props.justifyContent || 'center'}
      alignItems={props.alignItems || 'center'}
      margin={props.margin || '1rem auto'}
      gap={props.gap || '8px'}
      flex={props.flex || 'auto'}
      width={props.width || 'auto'}
      sx={{
        padding: '1rem',
        flexDirection: { xs: 'column', sm: 'row' },
        color: props.type === 'info' ? '#f5a922' : '#DC2941',
        border: props.type === 'info' ? '1px solid #f5a922' : '1px solid #DC2941',
        borderRadius: '8px',
        background: props.type === 'info'
          ? 'rgba(245, 169, 34, .1)'
          : 'rgba(220, 41, 65, .25)',
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: '24px' }} />

      <Typography
        variant="h2"
        component="h2"
        sx={{
          fontSize: props.type === 'info'
            ? { xs: '12px', sm: '14px' }
            : { xs: '14px', sm: '16px' },
          fontFamily: 'Poppins',
          textAlign: 'center',
        }}
      >
        {props.errorMessage || 'Internal error'}
        <Button onClick={()=>{window.location.reload()}}>Reload page</Button>
      </Typography>
    </Box>
  );
}
