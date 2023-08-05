import { Box,TextField,Button } from '@mui/material'

const SearchForm = ()=>{
return (
    <Box display="flex" alignItems="center" justifyContent="center" mb={3} mt={3}>
        <TextField type='text' label='Enter city Name' variant='outlined' color='warning' sx={{
          
             '& .MuiOutlinedInput-input': {
                 color: '#ffffff',
                fontFamily: 'Poppins' 
              },
              '& .MuiInputLabel-root': {
                color: '#ffffff'},
                '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#ffffff', 
                  },
                   '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                     borderColor: '#ed6c02',
                  },
                  mr: 3
        }} />
        <Button type='button' color='warning' variant='contained'>Search city</Button>

    </Box>
)

}
export default SearchForm;