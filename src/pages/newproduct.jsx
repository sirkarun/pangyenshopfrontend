import React ,{ useEffect, useRef, useState }  from 'react'
import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material';
import axios from 'axios'



function Newproduct() {
  const [Name,setName]=useState('');
  const [Price,setPrice]=useState('');
  const [Img,setImg]=useState('');

 const handlesubmit= event=>{
  event.preventDefault();
    var myheader=new Headers();
    myheader.append("Content-Type","application/json")
    var raw = {
    "name": Name,
    "price": Price,
    "img": Img
    };

    var requestOptions={
      method:'post',
      header:myheader,
      body:raw,
      redirect:'follow'
    }

    const result= axios.post('https://pangyenbackend.onrender.com/add',raw);
    alert("save")

    // fetch('http://192.168.1.41:4000/add',requestOptions)
    // .then(response => response.json())
    // .then(result=> {
    //   alert(result['message'])
    //   if(result['status'] ==='ok'){
    //     window.location.href='/'
    //   }
    // })

  }
  return (

    <div>
  <form onSubmit={handlesubmit}>


 <Grid container spacing={2}>
    <Grid item xs={12} sm={12}>
    <TextField id="outlined-basic" label="Name" variant="outlined" fullWidth required onChange={(e) => setName(e.target.value)}/>
    </Grid>
    <Grid item xs={12} sm={12}>
    <TextField id="outlined-basic" label="price" variant="outlined" fullWidth required onChange={(e) => setPrice(e.target.value)}/>
    </Grid>
    <Grid item xs={12} sm={12}>
    <TextField id="outlined-basic" label="img" variant="outlined" fullWidth required onChange={(e) => setImg(e.target.value)}/>
    </Grid>
    <Grid item xs={12} sm={12}>
    <button type='submit' variant='contained'  >Create</button>
    </Grid>
</Grid>
</form>
    </div>
  
  )
}

export default Newproduct