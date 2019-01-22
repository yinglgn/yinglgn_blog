const sequelize = require('./index')
const usersModel = sequelize.import('./../models/users.js')
const articlesModel = sequelize.import('./../models/articles.js')
const categoryModel = sequelize.import('./../models/category.js')
const tagModel = sequelize.import('./../models/tag.js')

// 同步所有尚未在数据库中的模型
// sequelize.sync()

// 强制同步所有模型
// sequelize.sync({force: true})

//这将创建一个名为 UserProject 的新模型
tagModel.belongsToMany(articlesModel, { through: 'articles_tag' });
articlesModel.belongsToMany(tagModel, { through: 'articles_tag' });

module.exports = {
  usersModel,
  articlesModel,
  categoryModel,
  tagModel
}
