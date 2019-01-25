const sequelize = require('./index')
const usersModel = sequelize.import('./../models/users.js')
const articlesModel = sequelize.import('./../models/articles.js')
const categoryModel = sequelize.import('./../models/category.js')
const tagModel = sequelize.import('./../models/tag.js')

const trantransaction = (fun) => {
  return sequelize.transaction(fun).then(function (result) {
    // Transaction 会自动提交
    // result 是事务回调中使用promise链中执行结果
    return true
  }).catch(function (err) {
    // Transaction 会自动回滚
    // err 是事务回调中使用promise链中的异常结果
    return false
  });
}

// 同步所有尚未在数据库中的模型
// sequelize.sync()

// 强制同步所有模型
// sequelize.sync({force: true})

//这将创建一个名为 UserProject 的新模型
tagModel.belongsToMany(articlesModel, {
  through: 'articlesTags',
  foreignKey: 'articleId', //通过外键articleId
})
articlesModel.belongsToMany(tagModel, {
  through: 'articlesTags',
  foreignKey: 'tagId', //通过外键tagId
})

articlesModel.belongsTo(usersModel)
articlesModel.belongsTo(categoryModel)



module.exports = {
  usersModel,
  articlesModel,
  categoryModel,
  tagModel,
  trantransaction,
}
