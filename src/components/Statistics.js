import  React,{useState, useEffect} from 'react';
import {Card} from 'semantic-ui-react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Layout from '../Layout';
import axios from 'axios';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));

// const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });




 const Statistics=()=> {

    const [, token] = document.cookie.split("=");
    let [stat, setStat] = useState([]);
    
    
    const retrieveStats=async()=>{
     const req = {
         token
    };
     const res =await axios.post("http://localhost:4004/generateStatistics/show", req,{
       withCredentials: true,
     })
     console.log(res.data);
    
     return res.data;
    }
    
    const getStats = async()=>{
     const datA = await retrieveStats();
     console.log(datA)
     if(datA) setStat(datA)
     else alert("server Error")
    
     console.log(stat);
    
    }
    
    useEffect(async()=>{
        await getStats();
        console.log(stat)
    },[])

  return (
      <Layout>
        {stat.length > 0 && 
    <div
        className="container"
        style={{ margin: "20px 300px 30px 150px", borderRadius: "1%" }}
      >
      {/* {[lightTheme, darkTheme].map((theme, index) => ( */}
        <Grid item xs={8}>
          <ThemeProvider theme={lightTheme}>
            <Box
              sx={{
                // p: 2,
                // bgcolor: 'background.default',
                display: 'grid',
                gridTemplateColumns: { md: '1fr 1fr' },
                gap: 3,
              }}
            >
              {stat.map((item, index) => (
                <Item key={index} elevation={24}>
                  <Card>
                    <Card.Content>
                    <Card.Header>Meal Report: {new Date(item.overView.startDate).toLocaleString('default',{month:'long'})}</Card.Header>
        <Card.Meta>{item.overView.startDate} - {item.overView.endDate}</Card.Meta>
        <Card.Description>
          <p>Meal cost: {item.overView.mealCost.toFixed(2)}</p>{'\n'}
          <p>Total meal: {item.overView.totalMeal.toString()}</p>{'\n'}
          <p>Total expense: {item.overView.totalExpense.toString()}</p>
        </Card.Description>
                    </Card.Content>
                  </Card>
                 
                </Item>
              ))}
            </Box>
          </ThemeProvider>
        </Grid>
      {/* ))} */}
</div>
 }
</Layout>
    
  );
}

export default Statistics