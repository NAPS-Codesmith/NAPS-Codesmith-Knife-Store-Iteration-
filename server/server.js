// import and require all controllers, port initialization, paths, and app(express)
const path = require('path');
const express = require('express');
const cartRouter = require('./routes/cartRoute');
const knifeRouter = require('./routes/knifeRoute');
const customerRouter = require('./routes/customerRoute');

const PORT = 3000;

// invoke express
const app = express();

// parse request body using express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) =>
  res.status(200).sendFile(path.join(__dirname, '../build/index.html'))
);

// app.post('/api', (req, res) => {
//   res.status(200).json({isLogged=In: true})
// })
// handles routing
app.use('/knives', knifeRouter);
app.use('/customers', customerRouter);
app.use('/cart', cartRouter);


// catch-all router handler for any request to an unknown route
app.use('*', (req, res) => {
  return res.status(404).send('ERROR, ROUTE NOT FOUND');
})

// global error handling
app.use((err, req, res, next) => {
  const globalErr = {
    log: 'UNKNOWN MIDDLEWARE ERROR',
    status: 500,
    message: { err: 'ERROR' },
  };
  const errorObj = Object.assign({}, globalErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

// export app module
module.exports = app;
