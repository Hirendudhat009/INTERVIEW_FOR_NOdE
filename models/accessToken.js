/**
* accessToken.js
* @description :: sequelize model of database table accessToken
*/

import sequelize from "../common/config/database";
import sequelizeTransforms from "sequelize-transforms";
import { DataTypes } from "sequelize";

let AccessToken = sequelize.define('access_token', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: { type: DataTypes.INTEGER },
  token: { type: DataTypes.STRING, primaryKey: true },
  isRevoked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  createdAt: { type: DataTypes.DATE },
  updatedAt: { type: DataTypes.DATE },
  expiresAt: { type: DataTypes.DATE },
});

AccessToken.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};

sequelizeTransforms(AccessToken);
export default AccessToken
