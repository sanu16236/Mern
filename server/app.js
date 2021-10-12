const dotenv = require('dotenv');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();


dotenv.config({ path: './config.env' });
require('./db/conn');
app.use(express.json());
app.use(cookieParser());
app.use(require('./router/router'));
const PORT = process.env.PORT;

const middleware = (req, res, next) => {
    console.log(`hello from middle ware`);
    next();
}

// app.get('/', (req, res) => {
//     res.send(`hello from skCoding`);
// });

// app.get('/about',(req, res) => {

//     res.send("hello from about page");
// });

app.get('/contact', (req, res) => {
    res.send(`hello form contact page`);
});

app.get('/signin', (req, res) => {
    res.send(`hello form signin page`);
});

app.get('/signup', (req, res) => {
    res.send(`hello from signup page`);
});

// server port listen 

app.listen(PORT, () => {
    console.log(`server is runnig on port ${PORT}`);

});