const express = require('express');
const app = express();
const port = 3000;

app.get('/',(req,res)=>{
res.send('primer servicio');
});

app.listen(port, ()=>{
  console.log('Mi port'+port);
});
