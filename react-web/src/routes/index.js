import App from './../components/App';
import Home from "../modules/Home/Home";

const routes = [
  {
    path: '/',
    component: App,
    // indexRoute: {
    //   component: Home
    // },
    childRoutes: [
      { path: 'home', component: Home },
    ]
  }
]

export default routes
