const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

//JAWSDB is what heroku will use when the app is deployed
//add JAWSDB to the heroku deployment via resources tab
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {

  //so if this app isnt deployed from heroku it will use our environment variables
  //create a sequelize instance for our server, and export it
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;