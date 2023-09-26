"use client"

import React,{useState} from 'react'
import { Box,Typography,TextField,Button } from '@mui/material'

const Dash = () => {
    const [name, setName] = useState('Customer');
    const [email,setEmail] =useState('Customer@gmail.com');
    const [total,setTotal]= useState('4,50,000')
    
    const generateInvoice = e => {
      e.preventDefault();
      // send a post request with the name to our API endpoint
      const fetchData = async () => {
        const data = await fetch('http://localhost:3000/api/generateinvoice', {
          method: 'POST',
          body: JSON.stringify({name,email,total}),
        });
        // convert the response into an array Buffer
        console.log(data,"data");
        return data.arrayBuffer();
      };
      const saveAsPDF = async () => {
        const buffer = await fetchData();
        const blob = new Blob([buffer]);
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'invoice.pdf';
        link.click();
      };
  
      saveAsPDF();
    };








  return (
    <Box  sx={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:'2rem'}}>
        <Typography  marginTop='5rem' fontFamily='Poppins' fontSize='30px' fontWeight='600'>Generate PDF dynamically in Next js</Typography>

        <TextField 
        label="Enter your name"
        type='text'
        onChange={e => setName(e.target.value)}
        InputProps={{
            style:{
                width:'400px',
                height:'50px',
                borderRadius:'25px'
            }
        }}
        />
        <TextField 
        label="Enter your email"
        type='email'
        onChange={e => setEmail(e.target.value)}
        InputProps={{
            style:{
                width:'400px',
                height:'50px',
                borderRadius:'25px'
            }
        }}
        />
        <TextField 
        label="Enter the price"
        type='Number'
        onChange={e => setTotal(e.target.value)}
        InputProps={{
            style:{
                width:'400px',
                height:'50px',
                borderRadius:'25px'
            }
        }}
        />

        <Button 
        variant='outlined'
        onClick={generateInvoice}
        sx={{
            width:'400px',
            borderRadius:'25px',
            height:'50px',
            background:'linear-gradient(to right, #780206, #061161)',
            color:'white'
        }}
        >
            Generate Invoice
        </Button>
    </Box>
  )
}

export default Dash