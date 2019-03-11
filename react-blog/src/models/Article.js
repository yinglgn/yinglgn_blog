/**
 * 文章类模型
 * @class Article
 */
class Article {
  constructor(id, title, content, img, author, categoryName, tagName, publicTime) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.img = img;
    this.author = author;
    this.categoryName = categoryName;
    this.tagName = tagName;
    this.publicTime = publicTime;
  }
}


/**
 * 通过文章详情数据创建文章对象函数
 *
 * @param {*} data
 */
function createArticles(data) {
  return new Article(
    data.id,
    data.title,
    data.subtitle,
    data.avator,
    data.realName,
    data.category.name,
    filterTags(date.tags),
    data.createdAt
  )
}

function filterTags(tags) {
  let tagArr = tags.map( (tag) => {
    return tag.name;
  })
  return tagArr.join(' / ');
}

export {
  createArticles
}