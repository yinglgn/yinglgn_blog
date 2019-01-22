const tagModel = require('./../db/base').tagModel
const url = require('url')
const querystring = require('querystring')
const retCode = require('./../utils/retcode')

const resultAll = {
  code: retCode.Success,
  data: null
}

const tagInfo = {

  /**
   * 根据条件查询所有数据
   * @param  {object} ctx   上下文
   * @return {object}       结果
   */
  async findAll(ctx) {
    let result = resultAll;
    let query = url.parse(ctx.request.url).query;
    let params = querystring.parse(query);
    let { currentPage = 1, size = 20, status = 1 } = params;
    let offset = (currentPage - 1) * size;
    let userResult = await tagModel.findAndCountAll({
      limit: parseInt(size),
      offset: offset
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
    let res = await tagModel.findById(id, {
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
    let res = await tagModel.create(params);
    if (!res) {
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
    console.info(ctx.request.body);
    let res = await tagModel.update(params, {
      where: {
        id: params.id
      },
      fields: ['name']
    });
    if (!res) {
      result.code = retCode.Fail;
      result.data = "修改失败！";
      ctx.status = 406;
      return result;
    }

    ctx.status = 202;
    return result;
  },

  /**
   * 删除数据(物理删除)
   * @param  {object} ctx   上下文
   * @return {object}       结果
   */
  async del(ctx) {
    let result = resultAll;
    let id = ctx.params.id;
    let res = await tagModel.destroy({
      where: {
        id: id
      }
    });
    if (!res) {
      result.code = retCode.Fail;
      result.data = "删除失败，该id数据不存在！";
      ctx.status = 406;
      return result;
    }

    ctx.status = 204;
    return result;
  }
}

module.exports = tagInfo

