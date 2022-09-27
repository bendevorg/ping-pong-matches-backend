import { Sequelize } from 'sequelize';
import logger from 'log-champ';
import database from '~/constants/database';

const sequelize = new Sequelize(
  database.NAME,
  database.USERNAME,
  database.PASSWORD,
  {
    host: database.HOST,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    logging: false,
  },
);

sequelize
  .authenticate()
  .then(() => console.info('🦞 Database connected.'))
  .catch((err) => logger.error(err));

export default sequelize;
export { default as Player } from './Player';
export { default as Team } from './Team';
export { default as Match } from './Match';

// Associations
import Player from './Player';
import Team from './Team';
import Match from './Match';

// In order to create associations the model needs to be initiated
// before the association is made. To avoid circular dependencies
// We need to make this from here.
// There are clevers way to do this but the code becomes less readable
// So we are doing it right for now.
Player.hasMany(Team, { foreignKey: 'playerAId' });
Player.hasMany(Team, { foreignKey: 'playerBId' });
Team.hasMany(Match, { foreignKey: 'teamAId' });
Team.hasMany(Match, { foreignKey: 'teamBId' });
Team.hasMany(Match, { foreignKey: 'teamWonId' });

// Syncs
Player.sync({ alter: true });
Team.sync({ alter: true });
Match.sync({ alter: true });
