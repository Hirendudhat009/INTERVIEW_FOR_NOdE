require('dotenv').config();

import './common/config/jwt-passport'
import express from "express";
import path from "path"
import cors from "cors"
import session from "express-session";
// models
import modelsAllRelations from "./models";
// seeders
import routes from "./routes/index"
import { PORT } from './common/constants/config-constant';
import passport from 'passport';

const app = express()


//template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(
    session({ secret: "hjs89d", resave: "false", saveUninitialized: "true" })
);

app.use(require('./utils/response/responseHandler'));

const corsOptions = { origin: process.env.ALLOW_ORIGIN, };
app.use(cors(corsOptions));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', express.static(`${__dirname}/public`));
app.use('/media', express.static(path.join(__dirname, 'media')))

app.use(routes)

app.use(require('./common/middleware/error'))

modelsAllRelations.sequelize.sync({ alter: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Your application is running on ${PORT}`);
        })
    })