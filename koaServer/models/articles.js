/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('articles', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    last_user_id: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    subtitle: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    page_image: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    meta_description: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    is_original: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    is_draft: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    view_count: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    published_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
  }, {
    tableName: 'articles'
  });
};
