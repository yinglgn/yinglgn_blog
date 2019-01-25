const { usersModel, articlesModel, categoryModel, tagModel, trantransaction } = require('./../db/base')
const url = require('url')
const querystring = require('querystring')
const retCode = require('./../utils/retcode')

const resultAll = {
  code: retCode.Success,
  data: null
}

const includes = [
  {
    model: usersModel, // 关联查询
    attributes: ['id', 'realName']
  },
  {
    model: categoryModel, // 关联查询
    attributes: ['id', 'name']
  },
  {
    model: tagModel, // 关联查询
    attributes: ['id', 'name']
  }
]

const articlesInfo = {

  /**
   * 根据条件查询所有数据
   * @param  {object} ctx   上下文
   * @return {object}       结果
   */
  async findAll(ctx) {
    let result = resultAll;
    let query = url.parse(ctx.request.url).query;
    let params = querystring.parse(query);
    let { currentPage = 1, size = 20, status = 1} = params;
    let userResult = await articlesModel.findAndCountAll({
      limit: parseInt(size),
      offset: (currentPage - 1) * size,
      include: includes,
      where: {
        status,
      },
      distinct: true, //一个文章有多个tag，避免count不准确
    });

    result.data = [];
    result.count = 0;
    if (userResult.count > 0) {
      result.data = userResult.rows;
      result.count = userResult.count;
    }

    return result;
  },

  /**
   * 根据id查询数据
   * @param  {object} ctx   上下文
   * @return {object}       结果
   */
  async findById(ctx) {
    let result = resultAll;
    let id = ctx.params.id;
    let res = await articlesModel.findById(id, {
      include: includes,
      where: {
        status: 1
      }
    })

    if (!res) {
      result.code = retCode.NotExist;
      result.data = "数据不存在！";
      ctx.status = 406;
      return result;
    }

    result.data = res;
    return result;
  },

  /**
   * 新增数据
   * @param  {object} ctx   上下文
   * @return {object}       结果
   */
  async add(ctx) {
    let result = resultAll;
    let params = ctx.request.body;
    params.userId = ctx.session.passport.user.id;
    let tranRes = await trantransaction( async (t) => {
      let res = await articlesModel.create(params, {transaction: t});
      await res.addTags(params.tag,{transaction: t})
    })

    if (!tranRes) {
      result.code = retCode.Fail;
      result.data = "新增失败！";
      ctx.status = 406;
      return result;
    }

    ctx.status = 201;
    return result;
  },

  /**
   * 修改数据
   * @param  {object} ctx   上下文
   * @return {object}       结果
   */
  async update(ctx) {
    let result = resultAll;
    let params = ctx.request.body;
    let articles = await articlesModel.findByPk(params.id)
    if (!articles) {
      result.code = retCode.Fail;
      result.data = "该id数据不存在！";
      ctx.status = 406;
      return result;
    }

    let tranRes = await trantransaction( async (t) => {
      await articlesModel.update(params, {
        where: {
          id: params.id
        },
        transaction: t
      })
      await articles.setTags(params.tag, {type: 'update', transaction: t })
    })

    if (!tranRes) {
      result.code = retCode.Fail;
      result.data = "修改失败！";
      ctx.status = 406;
      return result;
    }

    ctx.status = 202;
    return result;
  },

  /**
   * 删除数据(逻辑删除)
   * @param  {object} ctx   上下文
   * @return {object}       结果
   */
  async del(ctx) {
    let result = resultAll;
    let id = ctx.params.id;

    let res = await articlesModel.findById(id);
    if (!res) {
      result.code = retCode.Fail;
      result.data = "该id数据不存在！";
      ctx.status = 406;
      return result;
    }

    let obj = {
      status: 0
    }
    res = await articlesModel.update(obj, {
      where: {
        id
      },
      fields: ['status']
    });

    if (!res) {
      result.code = retCode.Fail;
      result.data = "删除失败";
      ctx.status = 406;
      return result;
    }

    ctx.status = 204;
    return result;
  }
}

module.exports = articlesInfo
