const express = require('express');
const PORT = 5001;
const app = express();
const apiRouter = require('./apiRouter');

app.use(express.json());

app.use('/api', apiRouter, (req, res) => {
  console.log(res.locals.data);
  res.status(200).send(res.locals.data);
})

app.use((err, req, res, next) => {
  let defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };

  let errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).send(errorObj.message);
});

app.listen(PORT, () => console.log(`🚀 Listening on PORT ${PORT}`));