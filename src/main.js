import { createApp } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/dist/quasar.css'
import router from './route'
import { createStore } from 'vuex'

const sessionStore = createStore({
  state: {
    session: null,
    userType: null,
    userName: null,
  },
  getters: {
    getSession: state => {
      return state.session
    },
    getUserType: state => {
      return state.userType
    },
    getUserName: state => {
      return state.userName
    },    
  },
  mutations: {
    updateSession(state, keyRole) {
      state.session = keyRole
    },
    updateUserType(state, userType) {
      state.userType = userType
    },
    updateUserName(state, userName) {
      state.userName = userName
    }
  }
})

export default sessionStore
//createApp(App).use(router).use(Quasar).mount('#app')
const app = createApp(App)
app.use(router)
app.use(Quasar)
app.use(sessionStore)
app.mount('#app')