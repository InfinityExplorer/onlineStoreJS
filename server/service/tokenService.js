const jwt = require('jsonwebtoken');
const { Token } = require('../models/models.js');
class TokenService
{
    generateToken(payload){
        const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET_KEY, {expiresIn: '3h'})
        const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY, {expiresIn: '30d'})
        
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken){
        const tokenData = Token.findOne({where: {userId}})
        if (tokenData){
            tokenData.refreshToken = refreshToken

            return tokenData.save();
        }
        const token = await Token.create({user: userId, refreshToken})
        return token;
    }
}
 module.exports = new TokenService();