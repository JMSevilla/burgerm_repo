<template>
  <div id="app">
   <router-view/>

  </div>
</template>

<script>
import {scanSession,loginhistory, getrequestListOfData} from "@/store/request-common";
import client from "@/store/0AuthRequest"
export default {
  created()
  {
    this.checkIsLock()
    this.checker();
    getrequestListOfData().then((response) => {
      console.log("for initial testing" , response.data)
    })
  },
  methods: {
    checkIsLock: function(){
      client.get(`/api/csrf-login/get-attempts?useremail=${localStorage.getItem('usr')}`)
      .then((r) => {
        if(r.data === 5){
          this.$router.push({name : 'LockAccount'}).catch(() => {})
        }
        else{
          this.$router.push({name : 'Index'}).catch(() => {})
        }
      })
    },
    checker(){
      scanSession().then((response) => {
        if(response.data === "scan admin"){
          // this.historyloginmanagement()
          this.$router.push({name: 'admindashboard'}).catch(() => {})
        }
        else if(response.data === "scan customer"){
          this.$router.push({name: 'cashierdashboard'}).catch(() => {})
        }
        else if(response.data === "homepage"){
            // this.$router.push({name: 'Index'}).catch(() => {})
        }
      })
    },
    historyloginmanagement(){
      loginhistory(localStorage.getItem("oauth2_ss::_ss_")).then(response => {
        if(response.data.message === "success"){
          console.log(response.data.message)
        }
      })
    },
  }
}
</script>
