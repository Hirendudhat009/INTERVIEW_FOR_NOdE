/**
 * user.js
 * @description :: sequelize model of database table user
 */


import sequelizePaginate from "sequelize-paginate"
import sequelize from "../common/config/database";
import sequelizeTransforms from "sequelize-transforms";
import { DataTypes } from "sequelize";
import { baseUrl } from "../common/constants/config-constant";
import bcrypt from "bcryptjs"
import { BCRYPT } from "../common/constants/constant";

let User = sequelize.define('user', {
    profileImage: {
        type: DataTypes.STRING,
        allowNull: true
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true
    },
    dob: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
}, {
    hooks: {
        beforeUpdate: [
            async function (user, options) {
                if (user.password) {
                    user.password =
                        await bcrypt.hash(user.password, BCRYPT.SALT_ROUND);
                }
            },
        ],
        beforeCreate: [
            async function (user, options) {
                if (user.password) {
                    user.password =
                        await bcrypt.hash(user.password, BCRYPT.SALT_ROUND);
                }
            },
        ],

    }
})

User.prototype.isPasswordMatch = async function (password) {
    const user = this;
    return bcrypt.compare(password, user.password);
};

User.prototype.toJSON = function () {
    return {
        userId: this.id,
        fullname: this.fullname,
        email: this.email,
        profileImage: this.profileImage ? baseUrl(this.profileImage) : null,
        phoneNumber: this.phoneNumber,
        dob: this.dob,

    };
};

sequelizeTransforms(User);
sequelizePaginate.paginate(User);
export default User;