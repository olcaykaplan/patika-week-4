import { Grid, Typography } from '@mui/material';

import bgImage from '../utils/img/bg-img.jpeg'
const Home = () => {
  
  return (
    <Grid
      container
      item    
      justify="center"
      style={{  
        height:"100%",      
        backgroundImage: `url("${bgImage}")`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        filter: 'brightness(85%)',
      }}
    >
      <Grid item xs={4} sm={4} md={2} lg={3} xl={4}></Grid>
      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} style={{marginTop:'15vh'}}>
          <Typography variant='h2' style={{color:'darkOrange'}}>
             <strong> Write your own blog, </strong>
          </Typography>
          <Typography variant='h1' style={{color:'yellow',marginLeft:'5vw'}}>
          <strong> Make IT </strong> 
          </Typography>
          <Typography variant='h1' style={{color:'green', marginLeft:'15vw'}}>
          <strong>Different !</strong> 
          </Typography>
      </Grid>
    </Grid>
  );
};

export default Home;
