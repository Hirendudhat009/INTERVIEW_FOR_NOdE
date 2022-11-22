import express from "express"
import authController from "../../src/auth/auth.controller";
import storeFiles from "../../common/middleware/storeFile"
import asyncWrap from "express-async-wrapper";
import dashboardController from "../../src/dashboard/dashboard.controller";
import userController from "../../src/users/users.controller";
import authenticate from "../../common/middleware/authenticate";
const router = express.Router();

router.get('/register', authController.getRegisterPage)
router.get('/login', authController.getLoginPage)
router.post('/register', storeFiles('media/users', 'profileImage'), asyncWrap(authController.register))
router.post('/login', authController.login)
router.get('/logout', authController.logout)
router.get('/dashboard', authenticate, dashboardController.getDashboard)

router.get('/users/data', authenticate, userController.getUserData)
router.get('/profile', authenticate, userController.userProfile)

module.exports = router