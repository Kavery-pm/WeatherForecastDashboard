import { useState } from 'react'

import './App.scss'
import { Container, Typography } from '@mui/material'
import SearchForm from './components/searchForm'

function App() {

const [cityWeather, setcityWeather] = useState('');
const handleSearch = (cityName)=>{
console.log(cityName);
}
  return (
   <Container maxWidth='md' className='app-container'>
    <Typography variant='h4' className='app-title' align='center' >Weather Dashboard</Typography>
<SearchForm onSearch={handleSearch}/>
   </Container>
  )
}

export default App
