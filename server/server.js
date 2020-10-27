const express = require('express');
const PORT = 5001;
const app = express();
const apiRouter = require('./apiRouter');

app.use('/api', apiRouter, (req, res) => {
  console.log(res.locals.data);
  res.status(200).send(res.locals.data);
})


app.listen(PORT, () => console.log(`🚀 Listening on PORT ${PORT}`));