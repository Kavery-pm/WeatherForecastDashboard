import React from 'react';



import Layout from '../Layouts/Layout';



const WeeklyForecast = () => {
 

  return (
    <Layout
      title="WEEKLY FORECAST"
      content={<h1>hello</h1>}
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
