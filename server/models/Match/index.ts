import {
  Model,
  HasManyGetAssociationsMixin,
  HasManyCreateAssociationMixin,
  Op,
} from 'sequelize';
import sequelize from '~/models';
import schema from './schema';

class Match extends Model {
  static async get(id: string): Promise<Match | null> {
    return await Match.findByPk(id);
  }

  static async getWins(teamId: string): Promise<number> {
    return await Match.count({ where: { teamWonId: teamId } });
  }

  static async getLosses(teamId: string): Promise<number> {
    return await Match.count({
      where: {
        [Op.or]: [{ teamAId: teamId }, { teamBId: teamId }],
        teamWonId: { [Op.not]: teamId },
      },
    });
  }

  static async getForTeam(teamId: string, limit: number): Promise<Match[]> {
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

  getPublicData() {
    return {
      id: this.id,
      teamAId: this.teamAId,
      teamBId: this.teamBId,
      teamWonId: this.teamWonId,
    };
  }

  declare id: string;
  declare teamAId: string;
  declare teamBId: string;
  declare teamWonId: string;
}

Match.init(schema, { sequelize });
export default Match;
