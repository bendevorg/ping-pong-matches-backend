import {
  Model,
  HasManyGetAssociationsMixin,
  HasManyCreateAssociationMixin,
} from 'sequelize';
import sequelize, { Match, Team } from '~/models';
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

  async getPublicData(expanded: boolean = false, matchesAmount: number = 0) {
    if (!expanded) {
      return {
        id: this.id,
        name: this.name,
      };
    }
    const teamsModels = await Team.getForPlayer(this.id);
    const teams: any[] = teamsModels.map((team) => team.id);
    const teamIds = teamsModels.map((team) => team.id);
    let matches: Array<Match> = [];
    if (matchesAmount > 0) {
      const matchesData = await Match.getForTeam(teamIds, matchesAmount);
      matches = await Promise.all(
        matchesData.map(async (match) => await match.getPublicData(true)),
      );
    }
    return {
      id: this.id,
      name: this.name,
      wins: await Match.getWins(teamIds),
      losses: await Match.getLosses(teamIds),
      teams,
      matches,
    };
  }

  declare id: string;
  declare name: string;
}

Player.init(schema, { sequelize });
export default Player;
