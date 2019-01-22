const articlesModel = require('./../db/base').articlesModel
const url = require('url')
const querystring = require('querystring')
const retCode = require('./../utils/retcode')

const resultAll = {
  code: retCode.Success,
  data: null
}

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
    let { currentPage = 1, size = 20, status = 1 } = params;
    let offset = (currentPage - 1) * size;
    let userResult = await articlesModel.findAndCountAll({
      limit: parseInt(size),
      offset: offset,
      where: {
        status: status
      }
    });

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
  async findDataById(ctx) {
    let result = resultAll;
    let id = ctx.params.id;
    let res = await articlesModel.findById(id, {
      where: {
        status: 1
      }
    })

    if (!res) {
      resutlt.code = retCode.NotExist;
      resutlt.data = "数据不存在！";
      return resutlt;
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
    let params = ctx.body;
    let res = await articlesModel.save(params);
    if (!res) {
      result.code = retCode.Fail;
      result.data = "新增失败！"
      return result;
    }

    return result;
  },

  /**
   * 修改数据
   * @param  {object} ctx   上下文
   * @return {object}       结果
   */
  async update(ctx) {
    let result = resultAll;
    let params = ctx.body;
    let res = await articlesModel.save(params);
    if (!res) {
      result.code = retCode.Fail;
      result.data = "修改失败！"
      return result;
    }

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
    let res = await articlesModel.destroy({
      where: {
        id: id
      }
    });
    if (!res) {
      result.code = retCode.Fail;
      result.data = "删除失败，该id数据不存在！"
      return result;
    }

    return result;
  }
}

module.exports = articlesInfo
