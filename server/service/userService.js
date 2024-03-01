const {User, Basket} = require('../models/models.js')
const bcrypt = require('bcrypt')
const ApiError = require('../errors/APIError.js')
const JWT = require('jsonwebtoken')
const mailService = require('./mailService.js')
const uuid = require('uuid')
const tokenService = require('./tokenService.js')
const UserDto = require('../dtos/userDto.js')

class UserService
{
    async registration(email, password, role)
        {
            const candidate = await User.findOne({where: {email}})
            if(candidate)
            {
                throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
            }
            const hashPassword = await bcrypt.hash(password, 5);
            const user = await User.create({email, role, password: hashPassword});
            const basket = await Basket.create({userId: user.id});
            const activationLink = uuid.v4();
            
            await mailService.sendActivationMail(email, activationLink);

            const userDto = new UserDto(user);
            const tokens = tokenService.generateToken({...userDto});
            await tokenService.saveToken(userDto.id, tokens.refreshToken);
            
            return {...tokens, user: userDto};

        }
}
 module.exports = new UserService();