/**
 * index.js
 * @description :: exports all the models and its relationships among other models
 */

import dbConnection from "../common/config/database";

//models
import AccessToken from "./accessToken";
import RefreshToken from "./refreshToken";
import User from "./user";

const db = {};
db.sequelize = dbConnection;

// user -access_token
AccessToken.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
    targetKey: 'id',
    onDelete: "CASCADE"
});

User.hasMany(AccessToken, {
    foreignKey: 'userId',
    sourceKey: 'id'
});

// access_token -refresh_token
RefreshToken.belongsTo(AccessToken, {
    foreignKey: 'accessToken',
    as: 'accessTokens',
    targetKey: 'token',
    onDelete: "CASCADE"
});
AccessToken.hasOne(RefreshToken, {
    foreignKey: 'accessToken',
    sourceKey: 'token',
    onDelete: "CASCADE"
});








export default db