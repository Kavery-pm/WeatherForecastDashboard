import { useState } from 'react'
import './App.scss'
import { Container, Typography,Grid,Paper,Button,Box } from '@mui/material'
import SearchForm from './components/searchForm'
import { fetchWeather } from './services/apiServices/weatherApi';
import TodayWeather from './components/weatherToday/todayWeather';
import { getFavorites, saveFavorites } from './helpers/storage';

function App() {

const [cityName, setcityName] = useState('');
const [weather, setweather] = useState<any>(null);
const [favorites, setFavorites] = useState<string[]>(getFavorites());
const handleSearch = async(cityName:string)=>{
const cityWeatherData = await fetchWeather(cityName);
setcityName(cityName);
setweather(cityWeatherData)
}
const handleAddFavorite = () => {
  if (cityName && weather) {
    const isValidCity = weather.name.toLowerCase() === cityName.toLowerCase();
    if (isValidCity && !favorites.includes(cityName)) {
      const newFavorites = [...favorites, cityName];
      setFavorites(newFavorites);
      saveFavorites(newFavorites);
    }
  }
 
};
const isCityInFavorites = cityName && favorites.includes(cityName);
  return (
    
      <Container maxWidth="md" className='app-container'>
        <Typography variant="h4" align="center" gutterBottom className='app-title'>
          Weather Dashboard
        </Typography>
        <SearchForm onSearch={handleSearch} />
  
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid item xs={12} md={4}>
          <Paper
              elevation={3}
              sx={{
                minHeight: '400px',
                padding: 2,
                color: '#FFFFFF',
                background: 'linear-gradient(-35deg, #000428 0%, #004e92)',
                border: '2px solid #FFFFFF',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
                borderRadius: '8px',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  borderColor: '#00bcd4',
                  transform: 'scale(1.05)',
                  cursor: 'pointer',
                },
              }}
            >
              <Typography variant="h6" gutterBottom>
                Favorite Cities
              </Typography>
              {favorites.length > 0 ? (
                favorites.map((favoriteCity) => (
                  <Paper
                  key={favoriteCity}
                
                    sx={{
                    padding: 2,
                    marginBottom: 4,
                    borderRadius: '4px',
                    background: 'linear-gradient(-35deg, #FF5722 0%, #FF9800 100%)',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.25)',
                    transition: 'transform 0.2s ease-in-out',
                    fontWeight: '600',
                    textTransform:'uppercase',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                  onClick={() => handleSearch(favoriteCity)}
                >
                    <Typography className='favorite-city-name'>{favoriteCity}</Typography>
                  </Paper>
                ))
              ) : (
                <Typography>No favorite cities yet.</Typography>
              )}
            </Paper>
          </Grid>
  
          <Grid item xs={12} md={8}>
            {cityName && (
              <Paper elevation={3} className='weather-paper'>
              
                <TodayWeather weather={weather} city={cityName}/>
                <Box sx={{ marginTop: 2 }}>
                {!isCityInFavorites && (
            <Button variant="contained" color="warning" onClick={handleAddFavorite} sx={{alignItems:'center'}}>
              Add to Favorites
            </Button>
          )}
                </Box>
              </Paper>
            )}
          </Grid>
        </Grid>
  
      
      </Container>
  )
}

export default App
