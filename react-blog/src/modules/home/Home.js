import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import LazyLoad, { forceCheck }  from 'react-lazyload';
import * as ArticleModel from '../../models/Article';
import { NavLink } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleList: []
    }
  }

  componentDidMount() {

  }
  
  RenderMethod() {
    let { match } = this.props;
    let articles = this.state.articleList.map((item) => {
      //通过函数创建文章对象
      let article = ArticleModel.createArticles(item);
      return (
        <div className="article-wrapper" key={item.id}>
          <NavLink to={`${match.url}/${item.id}`} className="nav-link">
            <div className="aritcle-title">
              <div className="pull-left user-info">
                <LazyLoad>
                  <img src={article.img} width="100%" height="100%" alt={article.author}/>
                </LazyLoad>
                <span>{article.author}</span>
              </div>
              <div className="pull-right">
                {article.categoryName} / {article.tagName}
              </div>
            </div>
            <div className="article-content">
              {article.content}
            </div>
            <div className="article-footer">
              <div className="pull-right">
                {article.publicTime}
              </div>
            </div>
          </NavLink>
        </div>
      );
    });
  }

  render() {
    this.RenderMethod();
    return (
      <div className="home-container">
        <div className="home-view">
        </div>
      </div>
    );
  }
}

// Home.propTypes = {

// };

export default Home;