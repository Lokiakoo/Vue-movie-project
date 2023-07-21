<template >
  <div class="backgroundImage" >
    <q-layout view="hHh lpR fFf">
      <q-header style="background-color:#424242" class="text-white" height-hint="98" >
        <q-toolbar class="main-container">
          <q-toolbar-title style="display:contents">
          <img src="./components/icons/iconmonstr-calendar.png" style="width:15px; margin: 0 3px">
          <div class="text-subtitle1">{{ todayDate }}, {{ todayTime }}</div>
          <q-space />
          <div class="menu-social">
            <a href="https://www.facebook.com/" target="_blank">
            <img src="./components/icons/iconmonstr-facebook.png" style="width:25px; margin: 0 0px">
            </a>
            <a href="https://www.instagram.com" target="_blank">
            <img src="./components/icons/iconmonstr-instagram.png" style="width:25px; margin: 0 3px">
            </a>
            <a href="https://www.youtube.com/" target="_blank">
            <img src="./components/icons/iconmonstr-youtube.png" style="width:25px; margin: 0 3px">
            </a>
            <a href="https://www.reddit.com/" target="_blank">
              <img src="./components/icons/iconmonstr-reddit.png" style="width:25px; margin: 0 3px">
            </a>
            <a href="https://www.twitter.com/" target="_blank">
            <img src="./components/icons/iconmonstr-twitter.png" style="width:25px; margin: 0 3px">
            </a>
          </div>
        </q-toolbar-title>
        </q-toolbar>
        <q-tabs align="left" class="main-container">
          <q-route-tab to="/aboutus">
            <img src="./components/icons/logo.png" class="bor" style="width:150px">
          </q-route-tab>
          <q-route-tab to="/" label="Home" />
          <q-space />
          <div v-if="!isLogin">
        	  <q-btn flat @click="signCard=true" >Sign In</q-btn>
        	</div>
        	<div v-if="isLogin" style="display: contents;">
          <div v-if="isStaff" >
            <q-route-tab to="/addfilm" label="Add Film" />  
          </div>          
            <q-route-tab to="/changepassword" label="Change Password" />            
            <q-btn flat @click="logout" >Logout</q-btn>
          </div>             
        </q-tabs> 
      </q-header>  
        <q-page-container class="main-container">
            <router-view />
        </q-page-container>
      <q-footer elevated class="bg-grey-8 text-white">
        <q-toolbar>
          <q-toolbar>
            <div class="text-subtitle1">© {{ thisyear }} Moive Hub | All Rights Reserved</div>
            <q-space />
            <div v-if="typeof weather.main != 'undefined'" class="text-subtitle1">
            {{ weather.name }},
            {{ weather.sys.country }},
            {{ Math.round(weather.main.temp) }}°C
            {{ weather.weather[0].main }}
          </div>
          </q-toolbar> 
        </q-toolbar>
      </q-footer>
    </q-layout>    
  </div>

  <q-dialog v-model="signCard" class="LoginCard">
    <q-card class="LoginForm">      
      <q-card-section>
        <label for="username">Username
          <q-input 
            placeholder="Enter username"   
            class="bg-white col"
            v-model="un" 
            :error="!isUNValid" error-message="Required"
          />
        </label>
        <label for="password">Password
          <q-input
            placeholder="Enter Password"
            class="bg-white col"
            :type="isPwd?'password':'text'"
            v-model="pwd"
            :error="!isPwdValid" error-message="Required"
            >
            <template v-slot:append>
              <q-icon :name="isPwd? 'visibility_off': 'visibility'" 
              class="cursor-pointer"
              @click="isPwd=!isPwd"
            />
            </template>
          </q-input>
        </label>
      </q-card-section>
      <div style="margin:16px">
        <q-btn color="primary" label="Login" type="submit" style="width:100%" @click="onSubmit"/>
        <p><a href="/changepassword">Forgot Username or Password?</a></p>
      </div>
      <q-card-section>
        <p class="text-negative">{{errMsg}}</p>
      </q-card-section>  
    </q-card>
  </q-dialog>
</template>

<script>
import { date } from 'quasar';
import { computed } from 'vue';
import { Buffer } from 'buffer';
import axios from 'axios';
import url from './http-common.js';
import router from './route';
import PageScroller from './components/PageScroller.vue'

export default ({
   components: {
    PageScroller
  },
  computed: {
    todayDate() {
      const timeStamp = Date.now()
      return date.formatDate(timeStamp, 'dddd D MMMM') //return唔同格式時間
    },
    todayTime() {
      const timeStamp = Date.now()
      return date.formatDate(timeStamp, 'HH:mm')
    },
    thisyear() {
      const timeStamp = Date.now()
      return date.formatDate(timeStamp, 'YYYY')
    }
  },
  name: "weather",
  data() {
    return {
    //fetching API from openweathermap.org
      weather: {},
      search: '',
      isLogin: false,
      signCard: false,
      isUNValid: true,
      isPwdValid: true,
      un: '224750197s',
      pwd: '123456abcde',
      userType: '',
      isStaff: '',
      isValid: false,
      isPwd: true,
      errMsg: '',
    }
  },
  methods: {
    onSubmit() {
      this.isUNValid = computed( () => this.un.length > 0 );
      this.isPwdValid = computed( () => this.pwd.length > 0 );
      this.isValid = this.isUNValid && this.isPwdValid;
      const userType = this.un.slice(-1) 
      console.log(this.isValid);
      if(this.isValid) {
        const token = `${this.un}:${this.pwd}`;
        const encodedToken = Buffer.from(token).toString('base64')
        const header = {
          'Authorization': `Basic ${encodedToken}`
        }
        axios({
          url: `${url}/user`,
          method: 'GET',
          headers: header
        }).then((res)=>{
          console.log(res.data.key);
          this.$store.commit('updateSession', res.data.key);          
          if(userType == "s") {
            this.$store.commit('updateUserType', "staff");  
            this.isStaff = true
          }          
          if(userType == "c") {
            this.$store.commit('updateUserType', "customer");            
          }
          this.$store.commit('updateUserName', this.un);  
          console.log(this.$store.getters.getSession);
          console.log(this.$store.getters.getUserType);
          console.log(this.$store.getters.getUserName);
          this.signCard = false
          this.isLogin = true
          this.un = '224750197s'
          this.pwd = '123456abcde'
        }).catch((err)=>{
          this.errMsg = "Invalid Information";
          console.log(err)
        })        
      }
    },
    logout() {
      this.$store.commit('updateSession', null)
      this.isLogin = false
      this.$store.commit('updateUserType', null)
      this.isStaff = false
      this.$store.commit('updateUserName', null)
      router.push({ path: '/', replace: true })
      console.log(this.$store.getters.getSession)
      console.log("Logout")
    },
    fetchWeather(e) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=hongkong&units=metric&APPID=7f40938131da6e5fe5ebeaea4fe2d0da`
      ).then((res) => {
        return res.json();
      }).then(this.setResults);
    },
    setResults(results) {
      this.weather = results;
    },
  },
  beforeMount() {
    this.fetchWeather();
  },
})
</script>

<style>
.backgroundImage {
  background: url('./components/icons/bluesky.jpg');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.main-container {
  max-width: 1420px;
  margin: 0 auto;
}
.toolbar-input-container {
  min-width: 100px;
  width: 55%;
}
.toolbar-input-btn {
  border-radius: 0;
  max-width: 60px;
  width: 100%;
}
.LoginForm{
  width: 420px;
  display: block;
  margin: 110px auto;
}
</style>