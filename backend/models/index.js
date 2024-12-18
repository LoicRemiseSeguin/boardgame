const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    process.env.PG_DB,
    process.env.PG_USER,
    process.env.PG_PASSWORD,
    {
        host: process.env.PG_HOST,
        dialect: 'postgres',
    }
);

sequelize.sync

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Game = require('./game')(sequelize, Sequelize);
db.Event = require('./event')(sequelize, Sequelize);
db.EventNotification = require('./eventNotification')(sequelize, Sequelize);
db.EventParticipant = require('./eventParticipant')(sequelize, Sequelize);
db.Friend = require('./friend')(sequelize, Sequelize);
db.UserStatistic = require('./userStatistic')(sequelize, Sequelize);

db.User.hasMany(db.Event, { foreignKey: 'creator_id' });
db.Game.hasMany(db.Event, { foreignKey: 'game_id' });
db.User.belongsToMany(db.Event, { through: db.EventParticipant, foreignKey: 'user_id' });
db.Event.belongsToMany(db.User, { through: db.EventParticipant, foreignKey: 'event_id' });
db.User.belongsToMany(db.User, { as: 'Friends', through: db.Friend, foreignKey: 'user_id1', otherKey: 'user_id2' });
db.User.hasMany(db.UserStatistic, { foreignKey: 'user_id' });
db.Game.hasMany(db.UserStatistic, { foreignKey: 'game_id' });
db.Game.hasMany(db.Event, { foreignKey: 'game_id' });
db.Event.belongsTo(db.Game, { foreignKey: 'game_id' });

module.exports = db;
