import {
  Model,
  HasManyGetAssociationsMixin,
  HasManyCreateAssociationMixin,
} from 'sequelize';
import sequelize from '~/models';
import schema from './schema';

class Player extends Model {
  static async get(id: string): Promise<Player | null> {
    return await Player.findByPk(id);
  }

  static async getOrCreate(name: string): Promise<[Player, boolean] | null> {
    return await Player.findOrCreate({
      where: { name },
    });
  }

  static async getAll(): Promise<Player[]> {
    return await Player.findAll();
  }

  declare id: string;
  declare name: string;
  // declare getMatches: HasManyGetAssociationsMixin<Character>;
  // declare createCharacter: HasManyCreateAssociationMixin<Character>;
}

Player.init(schema, { sequelize });
export default Player;
