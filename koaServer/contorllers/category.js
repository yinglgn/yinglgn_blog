const { Op, categoryModel } = require('./../db/base')
const url = require('url')
const querystring = require('querystring')
const retCode = require('./../utils/retcode')

const resultAll = {
  code: retCode.Success,
  data: null
}

const categoryInfo = {

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
    let obj = {
      limit: parseInt(size),
      offset: offset,
      where: {}
    }
    if(params.name) {
      // 模糊查询
      obj.where.name = {
        [Op.like]: `%${params.name}%`
      }
    }
    let userResult = await categoryModel.findAndCountAll(obj);

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
    let res = await categoryModel.findById(id, {
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
    let res = await categoryModel.create(params);
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
    let res = await categoryModel.update(params, {
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
    let res = await categoryModel.destroy({
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

module.exports = categoryInfo
