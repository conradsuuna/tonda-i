import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import connectDB from './Config.js';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/index.js';

dotenv.config();

const app = express();

// DB connection
connectDB();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('', routes);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

app.use((req, res) => {
  const err = new Error('Not Found');
  err.status = 404;

  res.status(err.status).json({
    status: 404,
    message: err.message,
  });
});

if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500).json({
      status: 500,
      message: err.message,
    });
  });
}

// error handler
app.use((err, req, res) => {
  res.status(err.status || 500).json({
    status: 500,
    message: 'Server error',
  });
});

export default app;
