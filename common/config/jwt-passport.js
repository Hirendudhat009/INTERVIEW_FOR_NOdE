import passport from "passport"
import { ExtractJwt, Strategy as JWTstratagy } from "passport-jwt"
import { JWT } from "../constants/constant"
import moment from "moment";
import AccessToken from "../../models/accessToken";
import commonService from "../../utils/commonService";
import { decrypt } from "../helper";

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT.SECRET,
}

passport.use(
    new JWTstratagy(options, async (jwtPayload, done) => {
        try {
            if (moment.utc().unix() > jwtPayload.exp) {
                return done(null, false)
            }
            const decodedData = JSON.parse(await decrypt(jwtPayload.data))

            const checkToken =
                await commonService.findOne(
                    AccessToken,
                    {
                        userId: decodedData.user.id,
                        token: decodedData.jti,
                        isRevoked: false
                    }
                )
            if (
                !checkToken ||
                moment.utc().unix() > moment.unix(checkToken.expiresAt)
            ) {
                return done(null, false)
            }
            const user = decodedData.user
            return done(null, user)
        } catch (error) {
            return done(error, false)
        }
    })
)
