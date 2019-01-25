/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('articles', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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
    pageImage: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    metaDescription: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    isOriginal: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    isDraft: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    viewCount: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    publishedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
  }, {
    tableName: 'articles'
  });
};
