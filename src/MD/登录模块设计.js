// 后端（Egg.js + Redis + MySQL）
// 1. 用户注册
// 在 controller/user.js:
const Controller = require('egg').Controller;
const bcrypt = require('bcryptjs');

class UserController extends Controller {
    async register () {
        const { ctx, service } = this;
        const { username, password, phone } = ctx.request.body;
        const encryptedPassword = bcrypt.hashSync(password, 10);
        const user = await service.user.create({
            username,
            password: encryptedPassword,
            phone,
        });
        ctx.body = {
            id: user.id,
            username: user.username,
            phone: user.phone
        };
    }
}

module.exports = UserController;
// 在 service/user.js:
const Service = require('egg').Service;

class UserService extends Service {
    async create (user) {
        return this.ctx.model.User.create(user);
    }
}

module.exports = UserService;
// 在 model/user.js (使用 Sequelize ORM):
module.exports = app => {
    const { STRING, INTEGER } = app.Sequelize;

    const User = app.model.define('user', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        username: STRING,
        password: STRING,
        phone: STRING
    });

    return User;
};
//   2. 账号密码登录
//   在 controller/user.js:  
async login() {
    const { ctx, service } = this;
    const { username, password } = ctx.request.body;
    const user = await service.user.findByUsername(username);
    if (user && bcrypt.compareSync(password, user.password)) {
        const token = service.jwt.sign({ userId: user.id });
        ctx.body = { token };
    } else {
        ctx.status = 401;
        ctx.body = { message: '用户名或密码错误' };
    }
}
//   在 service/user.js:
async findByUsername(username) {
    return this.ctx.model.User.findOne({ where: { username } });
}
//   在 service/jwt.js:
// const Service = require('egg').Service;
// const jwt = require('jsonwebtoken');

// class JWTService extends Service {
//   sign(payload) {
//     return jwt.sign(payload, this.app.config.jwt.secret);
//   }

//   verify(token) {
//     return jwt.verify(token, this.app.config.jwt.secret);
//   }
// }

// module.exports = JWTService;

// 3. 手机验证码登录
// 在 controller/user.js:
async sendSms() {
    const { ctx, service } = this;
    const { phone } = ctx.request.body;
    const code = Math.floor(100000 + Math.random() * 900000); // 生成6位验证码
    await service.redis.set(`sms:${phone}`, code, 'EX', 300); // 保存到 Redis, 有效期5分钟
    await service.sms.send(phone, code); // 假设有一个发送短信的服务
    ctx.status = 200;
}
  
  async loginBySms() {
    const { ctx, service } = this;
    const { phone, code } = ctx.request.body;
    const redisCode = await service.redis.get(`sms:${phone}`);
    if (redisCode && redisCode === code) {
        const user = await service.user.findByPhone(phone);
        const token = service.jwt.sign({ userId: user.id });
        ctx.body = { token };
    } else {
        ctx.status = 401;
        ctx.body = { message: '验证码错误或已过期' };
    }
}

//   在 service/user.js:

  async findByPhone(phone) {
    return this.ctx.model.User.findOne({ where: { phone } });
}

