const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const pages = require('./routes/pages');
const series = require('./routes/series');

const port = process.env.PORT || 3000;
const mongo = process.env.MONGODB || 'mongodb://localhost:27017/minhas-series';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const app = express();

/** View engine - EJS */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/** Process request body */
app.use(bodyParser.urlencoded({ extended: true }));

/** Assets */
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', pages);
app.use('/series', series);

mongoose.connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(port, (err) => {
            console.log('Listening on ' + port)
        });
    })
    .catch(error => {
        console.log(error);
    });