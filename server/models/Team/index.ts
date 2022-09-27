import {
  Model,
  HasManyGetAssociationsMixin,
  HasManyCreateAssociationMixin,
} from 'sequelize';
import sequelize from '~/models';
import schema from './schema';

class Team extends Model {
  static async get(playerAId: string, playerBId: string): Promise<Team | null> {
    return await Team.findOne({ where: { playerAId, playerBId } });
  }

  static async getOrCreate(
    playerAId: string,
    playerBId: string,
  ): Promise<[Team, boolean] | null> {
    return await Team.findOrCreate({
      where: { playerAId, playerBId },
    });
  }

  declare id: string;
  // declare getMatches: HasManyGetAssociationsMixin<Character>;
  // declare createCharacter: HasManyCreateAssociationMixin<Character>;
}

Team.init(schema, { sequelize });
export default Team;
