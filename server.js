const express = require('express');
const session = require('express-session');
const exprhb = require('express-handlebars');
const routes = require('./controller');

const sequelize = require('./config');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const PORT = process.env.PORT || 3001;

const app = express();

const hbs = exprhb.create({});

const thisSession = {
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 3600000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(thisSession));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`App on at ${PORT}`));
});