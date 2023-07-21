<template>
  <div class="ChangePassword">
    <div class="ChangePasswordHeader">Reset account password</div>
    <div class="ChangePasswordHeader2">Enter a new password for {{ userName }}</div>
    <input dense outlined square type="current-password" 
      v-model="password" placeholder="Password" class="bg-white col" />
    <input dense outlined square type="current-password" 
      v-model="confirmPassword" placeholder="Confirm password" class="bg-white col" />
    <q-btn type="submit" color="primary"  @click="changePassword">Reset password</q-btn>
    <div class="returnMsg" v-if="Msg"> "{{Msg}}" </div>  
  </div>
</template>

<script>
import { computed } from 'vue'
import url from '../http-common.js'
import axios from 'axios';

export default {
  data()
  {
    return {
    userType: this.$store.getters.getUserType,
    userName: this.$store.getters.getUserName,
    password: '',
    confirmPassword: '',
    Msg: '',
    isPwdValid: true,
    isPwdValid2: true,
    }
  },
  methods:{
     async changePassword() {
      this.isPwdValid = computed( () => this.password.length > 0 )
      this.isPwdValid2 = computed( () => this.confirmPassword.length > 0 )
      
      if(this.isPwdValid && this.isPwdValid2 && this.isPwdValid === this.isPwdValid2) {
        const data =  {"password": this.password}

        try {
          const response = await axios.put(`${url}/user`, data, {
            headers: {
              'Content-Type': 'application/json',
              'k': this.$store.getters.getSession
            }
          })
          this.Msg = response.data.description
          console.log(response.data.description)
        } catch (error) {
          this.Msg = error.message
          console.log(error.message)
        }
      }
      console.log("Reset password success")
    }
  }
}
</script>

<style>
.ChangePassword{
  width: 400px;
  display: block;
  margin: 5px auto;
  text-align: center
}
.ChangePasswordHeader{
  font-size: 30px;
  font-weight: bold;
  margin: 20px;
}
.ChangePasswordHeader2{
  margin: 20px;
  color: grey;
}
.ChangePassword input{
  width: 70%;
  height: 40px;
  padding-left: 10px;
  display: block;
  margin: 5px auto 5px auto;
}
.ChangePassword button{
  width: 70%;
  height: 40px;
  margin: 18px 0px 5px 0px;    
}
.returnMsg{
  color: var(--q-negative) !important;
}
</style>