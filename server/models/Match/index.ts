import {
  Model,
  HasManyGetAssociationsMixin,
  HasManyCreateAssociationMixin,
} from "sequelize";
import sequelize from "~/models";
import schema from "./schema";

class Match extends Model {
  declare id: string;
}

Match.init(schema, { sequelize });
export default Match;
