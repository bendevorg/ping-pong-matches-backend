import {
  Model,
  HasManyGetAssociationsMixin,
  HasManyCreateAssociationMixin,
} from 'sequelize';
import sequelize, { Player, Match } from '~/models';
import schema from './schema';

class Team extends Model {
  static async get(id: string): Promise<Team | null> {
    return await Team.findByPk(id);
  }

  static async getForPlayers(
    playerAId: string,
    playerBId: string,
  ): Promise<Team | null> {
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

  static async getAll(): Promise<Team[]> {
    return await Team.findAll();
  }

  async getPublicData(
    lastMatches: number = 10,
    includeFullMatches: boolean = false,
  ) {
    const matchesData = await Match.getForTeam(this.id, lastMatches);
    const matches = await Promise.all(
      matchesData.map(
        async (match) => await match.getPublicData(includeFullMatches),
      ),
    );
    const playerAData = await Player.get(this.playerAId);
    const playerA = playerAData?.getPublicData();
    const playerBData = await Player.get(this.playerBId);
    const playerB = playerBData?.getPublicData();
    return {
      id: this.id,
      playerA,
      playerB,
      wins: await Match.getWins(this.id),
      losses: await Match.getLosses(this.id),
      matches,
    };
  }

  declare id: string;
  declare playerAId: string;
  declare playerBId: string;
  // declare getMatches: HasManyGetAssociationsMixin<Character>;
  // declare createCharacter: HasManyCreateAssociationMixin<Character>;
}

Team.init(schema, { sequelize });
export default Team;
