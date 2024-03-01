const ApiError = require('../errors/APIError.js')
//const bcrypt = require('bcrypt')
//const {User, Basket} = require('../models/models.js')
const UserService = require('../service/userService.js')

class UserController{
    async registration(req, res, next){
        try {
            const {email, password, role} = req.body;
            if(!email || !password)
            {
                throw new next(ApiError.badRequest('Некорректный email или password'))
            }
            
            const userData = await UserService.registration(email, password, role);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            //basket service realization needed
            return res.json(userData);
            
        } catch (e) {
            next(e);
        }
    }

    async login(req, res,next){
        try {
            
        } catch (e) {
            
        }
    }

    async logout(req, res, next){
        try {
            
        } catch (e) {
            
        }
    }

    async refresh(req, res, next){
        try {
            
        } catch (e) {
            
        }
    }

    async check(req, res, next){
        const {id} = req.query
        if (!id){
            return next(ApiError.badRequest('Не задан ID'))
        }
        res.json(id)
    }

    async getUser(req, res, next){
        try {
            
        } catch (e) {
            
        }
    }
        
}
module.exports = new UserController()