const usersModel = require("./../db/base").usersModel
const retCode = require("./../utils/retcode")
const md5 = require("md5")
const url = require('url')
const querystring = require('querystring')

const resultAll = {
  code: retCode.Success,
  data: null
}

const usersInfo = {
  /**
   * 登录
   * @param  {object} ctx   上下文
   * @return {object}       结果
   */
  async login(ctx) {
    let from = ctx.request.body;
    const args = {
      username: from.username,
      password: md5(from.password)
    };

    let resutlt = resultAll;

    if (!args.username || !args.password) {
      resutlt.code = retCode.ArgsError;
      resutlt.data = "登录名和密码不能为空！";
      return result;
    }

    let userResult = await usersModels.getByUserName(args);
    if (userResult.length == 0) {
      result.code = retCode.UserNotExist;
      result.data = "该用户不存在，请注册！";
      return resutlt;
    }
    if (
      userResult[0].username != args.username ||
      userResult[0].password != args.password
    ) {
      resutlt.code = retCode.UsernameOrPasswordError;
      resutlt.data = "用户名或者密码错误，请重新输入！";
      return resutlt;
    }

    ctx.session = {
      id: userResult[0].id,
      real_name: userResult[0].real_name
    };
    return resutlt;
  },

  /**
   * 注册
   * @param  {object} ctx   上下文
   * @return {object}       结果
   */
  async register(ctx) {
    let from = ctx.request.body;
    const args = {
      username: from.username,
      password: md5(from.password)
    };
    let result = {
      code: retCode.Success,
      data: "注册成功！"
    };

    if (!args.username || !args.password) {
      resutlt.code = retCode.ArgsError;
      resutlt.data = "登录名和密码不能为空！";
      return result;
    }

    let userCount = await usersModels.getByCountUserName(args);
    if (userCount[0].count > 0) {
      result.code = retCode.UserExisted;
      result.data = "该用户已存在，请登录！";
      return resutlt;
    }

    let userResult = await usersModels.add(args);
    if (userResult.insertId <= 0) {
      result.code = retCode.Fail;
      result.data = "注册失败！";
      return result;
    }

    return result;
  },

  /**
   * 根据条件查询所有数据
   * @param  {object} ctx   上下文
   * @return {object}       结果
   */
  async findAll(ctx) {
    let result = resultAll;
    let query = url.parse(ctx.request.url).query;
    let params = querystring.parse(query);
    let { currentPage = 1, size = 20 } = params;
    let offset = (currentPage - 1) * size;
    let userResult = await usersModel.findAndCountAll({
      limit: parseInt(size),
      offset: offset,
      attributes: { exclude: ["password"] },
    });

    if (userResult.count > 0) {
      result.data = userResult.rows;
      result.count = userResult.count;
    }

    return result;
  },

  /**
   * 根据当前用户获取信息
   * @param  {object} ctx   上下文
   * @return {object}       结果
   */
  async findUser(ctx) {
    let result = resultAll;
    let userId = ctx.session.passport.user.id;
    let userResult = await usersModel.findOne({
      where: {
        id: userId
      },
      attributes: { exclude: ["password"] },
    });
    if(!userResult) {
      ctx.throw(401);
    }
    result.data = userResult
    return result;
  },

  async findUserById(ctx) {
    let result = resultAll;
    let userId = ctx.params.userId;
    let userResult = await usersModel.findOne({
      where: {
        id: userId
      },
      attributes: { exclude: ["password"] },
    });
    if (!userResult) {
      ctx.throw(401);
    }
    result.data = userResult
    return result;
  }

}

module.exports = usersInfo;
