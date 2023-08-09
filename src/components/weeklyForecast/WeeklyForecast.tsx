// import React from 'react';
// import { Grid } from '@mui/material';


// import Layout from '../Layouts/Layout';
// import { ForecastItem } from '../../types';
// import TodayWeather from '../weatherToday/todayWeather';
// import DayWeatherDetails from './DayWeatherDetails';

// interface WeeklyForecastProps {
//   forecastData: {
//     list: ForecastItem[];
//   };
// }

// const WeeklyForecast:React.FC<WeeklyForecastProps> = ({forecastData}) => {
//   if (!forecastData || !forecastData.list || forecastData.list.length === 0) {
    
//     return (
//       <div style={{ width: '100%', textAlign: 'center' }}>
//         <h1>No weather data available.</h1>
//       </div>
//     );
//   }

  
//   const groupedData = forecastData.list.reduce((acc, item) => {
//     const date = item.dt_txt.split(' ')[0];
//     if (!acc[date]) {
//       acc[date] = [item];
//     } else {
//       acc[date].push(item);
//     }
//     return acc;
//   }, {});
//   console.log(groupedData)
//  console.log(Object.keys(groupedData))
// console.log(forecastData);
// const firstFiveDays = Object.keys(groupedData).slice(1,6);
// console.log(firstFiveDays);
// const content = (
//   <Grid
//     item
//     container
//     display="flex"
//     flexDirection="column"
//     xs={12}
//     gap="4px"
//   >
 
//  {firstFiveDays.map((date,idx) => {
//           const dayData = groupedData[date];
          
//           const firstDataOfDay = dayData[0]; // Assuming the weather data for a day is the same for all hours

//           return (
//             <Grid
//               item
//               key={date}
//               xs={12}
//               display="flex"
//               alignItems="center"
//               sx={{
//                 padding: '2px 0 2px',
//                 background:
//                   'linear-gradient(0deg, rgba(255, 255, 255, .05) 0%, rgba(171, 203, 222, .05) 100%) 0% 0%',
//                 boxShadow:
//                   'rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
//                 borderRadius: '8px',
//               }}
//             >
//             <DayWeatherDetails day={date} description={firstDataOfDay.weather[0].main}/>
//               {/* <DayWeatherDetails
//                 day={forecastDays[idx]}
//                 icon={firstDataOfDay.weather[0].icon}
//                 description={firstDataOfDay.weather[0].description}
//               /> */}

//               <Grid
//                 container
//                 sx={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                 }}
//               >
              
//               </Grid>

//               <Grid
//                 container
//                 sx={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                 }}
//               >
               
//               </Grid>
//             </Grid>
//           );
//         })}
      
//   </Grid>
// );
//   return (
//     <Layout
//       title="WEEKLY FORECAST"
//       content={content}
//       mb=".8rem"
//       sx={{
//         display: 'flex',
//         alignItems: 'center',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         padding: '3rem 0 0',
//       }}
//     />
//   );
// };

// export default WeeklyForecast;
// import React, { useState } from 'react';
// import { Grid, Accordion, AccordionSummary, AccordionDetails, useTheme } from '@mui/material';
// import Layout from '../Layouts/Layout';
// import { ForecastItem } from '../../types';
// import DayWeatherDetails from './DayWeatherDetails';
// import TodayWeather from '../weatherToday/todayWeather';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// interface WeeklyForecastProps {
//   forecastData: {
//     list: ForecastItem[];
//   };
// }

// const WeeklyForecast: React.FC<WeeklyForecastProps> = ({ forecastData }) => {
//   const theme = useTheme();
//   const [expandedDay, setExpandedDay] = useState<string | false>(false);
//   const [hourlyWeather, setHourlyWeather] = useState<ForecastItem[]>([]);

//   if (!forecastData || !forecastData.list || forecastData.list.length === 0) {
//     return (
//       <div style={{ width: '100%', textAlign: 'center' }}>
//         <h1>No weather data available.</h1>
//       </div>
//     );
//   }

//   const groupedData = forecastData.list.reduce((acc, item) => {
//     const date = item.dt_txt.split(' ')[0];
//     if (!acc[date]) {
//       acc[date] = [item];
//     } else {
//       acc[date].push(item);
//     }
//     return acc;
//   }, {});

//   const handleDayClick = (date: string) => {
//     setExpandedDay((prevExpanded) => (prevExpanded === date ? false : date));
//     setHourlyWeather(groupedData[date]);
//   };

//   return (
//     <Layout
//       title={expandedDay ? 'Detailed Forecast' : 'WEEKLY FORECAST'}
//       content={
//         <Grid item container display="flex" flexDirection="column" xs={12} gap="4px">
//           {Object.keys(groupedData).map((date) => {
//             const dayData = groupedData[date];
//             const firstDataOfDay = dayData[0];

//             return (
//               <Accordion
//                 key={date}
//                 expanded={expandedDay === date}
//                 onChange={() => handleDayClick(date)}
//                 sx={{
//                   background: `linear-gradient(-35deg, ${theme.palette.background.default} 0%, ${theme.palette.primary.main})`,
//                 }}
//               >
//                 <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                   <DayWeatherDetails day={date} description={firstDataOfDay.weather[0].main} />
//                 </AccordionSummary>
//                 <AccordionDetails>
//                   <div>
//                     {/* Display all the weather details for the selected day */}
//                     <h2>{firstDataOfDay.dt_txt}</h2>
//                     <TodayWeather weather={firstDataOfDay} city='am' />
//                     {/* Add other weather details here */}
//                   </div>

//                   {/* Display hourly weather details for the selected day */}
//                   <Grid container display="flex" flexDirection="column" xs={12} gap="4px">
//                     {hourlyWeather.map((hourlyData) => (
//                       <Grid
//                         item
//                         key={hourlyData.dt}
//                         xs={12}
//                         display="flex"
//                         alignItems="center"
//                         sx={{
//                           padding: '2px 0 2px',
//                           background: 'rgba(0, 0, 0, 0.05)',
//                           borderRadius: '8px',
//                         }}
//                       >
//                         {/* Display hourly weather details here */}
//                         <DayWeatherDetails
//                           day={hourlyData.dt_txt}
//                           description={hourlyData.weather[0].main}
//                         />
//                       </Grid>
//                     ))}
//                   </Grid>
//                 </AccordionDetails>
//               </Accordion>
//             );
//           })}
//         </Grid>
//       }
//       mb=".8rem"
//       sx={{
//         display: 'flex',
//         alignItems: 'center',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         padding: '3rem 0 0',
//       }}
//     />
//   );
// };

// export default WeeklyForecast;


import React, { useState } from 'react';
import { Grid, Accordion, AccordionSummary, AccordionDetails, useTheme } from '@mui/material';
import Layout from '../Layouts/Layout';
import { ForecastItem } from '../../types';
import DayWeatherDetails from './DayWeatherDetails';
import TodayWeather from '../weatherToday/todayWeather';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DayTemperatureDetails from './dayTemperatureDetails';

interface WeeklyForecastProps {
  forecastData: {
    list: ForecastItem[];
  };
}

const WeeklyForecast: React.FC<WeeklyForecastProps> = ({ forecastData }) => {
  const theme = useTheme();
  const [expandedDay, setExpandedDay] = useState<string | false>(false);
  const [hourlyWeather, setHourlyWeather] = useState<ForecastItem[]>([]);

  if (!forecastData || !forecastData.list || forecastData.list.length === 0) {
    return (
      <div style={{ width: '100%', textAlign: 'center' }}>
        <h1>No weather data available.</h1>
      </div>
    );
  }

  const groupedData = forecastData.list.reduce((acc, item) => {
    const date = item.dt_txt.split(' ')[0];
    if (!acc[date]) {
      acc[date] = [item];
    } else {
      acc[date].push(item);
    }
    return acc;
  }, {});

  const handleDayClick = (date: string) => {
    setExpandedDay((prevExpanded) => (prevExpanded === date ? false : date));
    setHourlyWeather(groupedData[date]);
  };

  return (
    <Layout
      title={expandedDay ? 'Detailed Forecast' : 'WEEKLY FORECAST'}
      content={
        <Grid item container display="flex" flexDirection="column" xs={12} gap="4px">
          {Object.keys(groupedData).map((date) => {
            const dayData = groupedData[date];
            const firstDataOfDay = dayData[0];
            const maxTemp = Math.max(...dayData.map((item) => item.main.temp_max));
            const minTemp = Math.min(...dayData.map((item) => item.main.temp_min));

            return (
              <Accordion
                key={date}
                expanded={expandedDay === date}
                onChange={() => handleDayClick(date)}
                sx={{
                    background: 'linear-gradient(-35deg, #000428 0%, #004e92)',
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Grid container xs={12} alignItems="center">
                    <Grid item xs={6}>
                      <DayWeatherDetails day={date} description={firstDataOfDay.weather[0].main} />
                    </Grid>
                    <Grid item xs={6}>
                      <DayTemperatureDetails maxTemp={maxTemp} minTemp={minTemp} />
                    </Grid>
                  </Grid>
                </AccordionSummary>
                <AccordionDetails>
                  <div>
                  
                    {/* Display all the weather details for the selected day */}
                    {/* <h2>{firstDataOfDay.dt_txt}</h2> */}
                    {/* <TodayWeather weather={firstDataOfDay} city='am' /> */}
                    {/* Add other weather details here */}
                  </div>

                  {/* Display hourly weather details for the selected day */}
                  <Grid container display="flex" flexDirection="column" xs={12} gap="4px">
                    <Grid item container xs={12} gap="4px">
                      {hourlyWeather.map((hourlyData) => (
                        <Grid
                          item
                          key={hourlyData.dt}
                          xs={2} // Adjust this value as per your desired grid layout
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                          sx={{
                            padding: '2px 0 2px',
                            background: 'rgba(0, 0, 0, 0.05)',
                            borderRadius: '8px',
                          }}
                        >
                          {/* Display hourly weather details here */}
                          <DayWeatherDetails type='hourly'
                            day={hourlyData.dt_txt}
                            description={hourlyData.weather[0].main}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Grid>
      }
      mb=".8rem"
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '3rem 0 0',
      }}
    />
  );
};

export default WeeklyForecast;

