import { Box,TextField,Button } from '@mui/material'
import React, { useState } from 'react'
interface SearchFormProps {
    onSearch:(cityName:string) =>void
}
const SearchForm:React.FC<SearchFormProps> = ({onSearch})=>{
    
const [cityName, setcityName] = useState<string>('')
    const handleSearch = ()=>{
       onSearch(cityName)
    }
return (
    <Box display="flex" alignItems="center" justifyContent="center" mb={3} mt={3}>
        <TextField type='text' onChange={(event)=>setcityName(event.target.value)} label='Enter city Name' variant='outlined' color='warning' sx={{
          
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
        <Button type='button' color='warning' variant='contained' onClick={handleSearch}>Search city</Button>

    </Box>
)

}
export default SearchForm;