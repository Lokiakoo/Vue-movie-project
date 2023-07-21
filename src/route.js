import { createWebHistory, createRouter} from "vue-router";
import Home from './pages/Home.vue';
import AboutUs from './pages/AboutUs.vue';
import ChangePassword from './pages/ChangePassword.vue';
import DetailsFilm from './pages/DetailsFilm.vue';
import AddFilm from './pages/AddFilm.vue';
import Weather from './pages/Weather.vue';
import NotFound from './pages/NotFound.vue';
import store from './main'

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/aboutus",
    name: "About Us",
    component: AboutUs,
  },
  {
    path: "/d/:id",
    name: "Film",
    component: DetailsFilm,
  },
  {
    path: "/addfilm",
    name: "AddFilm",
    component: AddFilm,
    meta: {
      isRequiredAuth: true,
      role: [null, 'staff'],
    }
  },
  {
    path: "/changepassword",
    name: "ChangePassword",
    component: ChangePassword,
  },
  {
    path: "/weather",
    name: "Weather",
    component: Weather,
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
  }
]

const route = createRouter({
  history: createWebHistory(),
  routes,
});

route.beforeEach((to, from, next) => {
  const token = store.getters.getSession
  const userType = store.getters.getUserType

  if (to.meta.isRequiredAuth) {

    if (token === null) {
      next("/")
    }
    else if (typeof to.meta.role === 'undefined') {
      next()
    }
    else if (to.meta.role.includes(userType)) {
      next()
    }

  }
  else {
    next()
  }
})

export default route;