export default [
  {
    path: "/",
    name: "home",
    component: () => import(/* webpackChunkName: "home" */ "../modules/home/views/index.vue")
  },
  {
    path: "/article",
    name: "article",
    component: () => import(/* webpackChunkName: "home" */ "../modules/article/views/index.vue")
  },
  {
    path: "/article/:id",
    name: "article_detail",
    component: () => import(/* webpackChunkName: "home" */ "../modules/article/views/detail.vue")
  },
]
