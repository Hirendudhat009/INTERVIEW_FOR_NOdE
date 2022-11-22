/**
 * refreshToken.js
 * @description :: sequelize model of database table refreshToken
 */


import sequelize from "../common/config/database";
import sequelizeTransforms from "sequelize-transforms";
import { DataTypes } from "sequelize";

let RefreshToken = sequelize.define('refresh_token', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  accessToken: { type: DataTypes.STRING },
  token: { type: DataTypes.STRING },
  isRevoked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  createdAt: { type: DataTypes.DATE },
  updatedAt: { type: DataTypes.DATE },
  expiresAt: { type: DataTypes.DATE },
});
RefreshToken.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(RefreshToken);

export default RefreshToken

