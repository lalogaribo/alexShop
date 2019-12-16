const express = require('express');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const cookieParser = require('cookie-parser');
const app = express();

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);

module.exports = app;
