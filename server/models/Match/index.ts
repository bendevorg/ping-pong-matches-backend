import {
  Model,
  HasManyGetAssociationsMixin,
  HasManyCreateAssociationMixin,
  Op,
} from 'sequelize';
import sequelize from '~/models';
import schema from './schema';
import { Team } from '~/models';

class Match extends Model {
  static async get(id: string): Promise<Match | null> {
    return await Match.findByPk(id);
  }

  static async getWins(teamId: string | string[]): Promise<number> {
    return await Match.count({ where: { teamWonId: teamId } });
  }

  static async getLosses(teamId: string | string[]): Promise<number> {
    return await Match.count({
      where: {
        [Op.or]: [{ teamAId: teamId }, { teamBId: teamId }],
        teamWonId: { [Op.not]: teamId },
      },
    });
  }

  static async getForTeam(
    teamId: string | string[],
    limit: number,
  ): Promise<Match[]> {
    return await Match.findAll({
      where: { [Op.or]: [{ teamAId: teamId }, { teamBId: teamId }] },
      limit,
      order: [['createdAt', 'DESC']],
    });
  }

  static async getAll(limit: number): Promise<Match[]> {
    return await Match.findAll({
      limit,
      order: [['createdAt', 'DESC']],
    });
  }

  static async new(
    teamAId: string,
    teamBId: string,
    teamWonId: string,
  ): Promise<Match> {
    return await Match.create({
      teamAId,
      teamBId,
      teamWonId,
    });
  }

  static async undoLast(): Promise<number> {
    const latestMatch = await Match.findOne({ order: [['createdAt', 'DESC']] });
    if (!latestMatch) return 0;
    return await Match.destroy({ where: { id: latestMatch.id } });
  }

  async getPublicData(includeFullMatches?: boolean): Promise<any> {
    if (!includeFullMatches) {
      return {
        id: this.id,
        teamAId: this.teamAId,
        teamBId: this.teamBId,
        teamWonId: this.teamWonId,
        createdAt: this.createdAt,
      };
    }
    const teamA = await Team.get(this.teamAId);
    const teamB = await Team.get(this.teamBId);
    if (!teamA || !teamB) return null;
    return {
      id: this.id,
      teamA: await teamA.getPublicData(),
      teamB: await teamB.getPublicData(),
      teamWonId: this.teamWonId,
      createdAt: this.createdAt,
    };
  }

  declare id: string;
  declare teamAId: string;
  declare teamBId: string;
  declare teamWonId: string;
  declare createdAt: string;
}

Match.init(schema, { sequelize });
export default Match;
