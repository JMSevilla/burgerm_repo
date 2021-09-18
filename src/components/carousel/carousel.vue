

<template>
   
         
<div>

  <b-card style="height:100%"
    overlay
    :img-src="dataimage"
    img-alt="Card Image"
    text-variant="white"
    
  >

    <b-card-text>
      <b-container fluid>

        <div style="margin-left:50%; margin-top:15%;margin-right: -150px;"></div>

 <div class="container">
   <div class="row">
   <div class="col-md-9"></div>
   <div class="col-md-3">
      <el-card style="margin-right: -100px; padding: 25px" shadow="hover">
          <h3>Welcome to login</h3>
          <el-input
          @keyup.enter.native="checkEnter"
          placeholder="Enter email"
          clearable
          v-model="task.email"
          style="margin-top: 10px; margin-bottom: 10px;"
          ></el-input>

          <el-input
          @keyup.enter.native="checkEnter"
          placeholder="Enter password"
          type="password"
          v-model="task.password"
          show-password
          clearable
          style="margin-top: 10px; margin-bottom: 10px;"
          ></el-input>
          <el-link type="primary" @click="onforgot()">Forgot password</el-link>
          <el-button  v-on:keyup="validateconfirm" @click="onsignin()" style="width: 100%; padding: 15px; margin-top: 10px; margin-bottom: 10px;" type="primary" round>Login</el-button>
      </el-card>
   </div>
 </div>
 </div>
  
      </b-container>
    </b-card-text>
  </b-card>
</div>
       
         
       
</template>
<script>
import {csrf_google_login, csrf_session_indicator, standardLogin, loginhistory} from "@/store/request-common"
import testimage from "@/assets/loginbackground.png"
import routers from "@/router/index";
  export default {
    data() {
      return {
        slide: 0,
        sliding: null,
         task: {
        email: '', password: ''
      },
      sessionTask: {
                  sessionID: 0,
                  sessionEmail: ''
                },
                dataimage: testimage
      }
    },
    methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      historyloginmanagement(){
      loginhistory(this.task.email).then(response => {
        if(response.data.message === "success"){
          console.log(response.data.message)
        }
      })
    },
      session_update_or_add: function() {
          csrf_session_indicator(this.sessionTask).then((response) => {
            // console.log(response.data)
            if(response.data === "session added") { 
              routers.push({name: 'admindashboard'})
              this.$notify.success({
                            title: 'Welcome!',
                            message: 'Successfully logged in.',
                            offset: 100
                            });
            } else if(response.data === "update session") { 
              routers.push({name: 'admindashboard'})
              this.$notify.success({
                            title: 'Welcome!',
                            message: 'Successfully logged in.',
                            offset: 100
                            });
            }
          })
                     
        },
      onSlideEnd(slide) {
        this.sliding = false
      },
      onforgot(){
      this.$router.push({name: 'Forgot Password'}).catch(() => {})
    },
    checkEnter(){
      this.onsignin()
    },
    onsignin(){
      if(!this.task.email || !this.task.password){
        this.$notify.error({
                            title: 'Uh oh!',
                            message: 'empty fields.',
                            offset: 100
                            });
                            return false;
      }else{
        const loading = this.$loading({
                    lock: true,
                    text: 'Logging in, please wait..',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                    setTimeout(() => {
                      standardLogin(this.task).then((rs) => {
                        console.log(rs.data)
                        if(rs.data.message === "empty"){
                          loading.close()
                          this.$notify.error({
                            title: 'Uh oh!',
                            message: 'empty fields.',
                            offset: 100
                            });
                            return false;
                        }else if(rs.data === "disabled"){
                          loading.close()
                          this.$notify.error({
                            title: 'Uh oh!',
                            message: 'Unfortunately your account is disable.',
                            offset: 100
                            });
                            return false;
                        }
                        else if(rs.data === "invalid"){
                          loading.close()
                          this.$notify.error({
                            title: 'Uh oh!',
                            message: 'Invalid password.',
                            offset: 100
                            });
                            return false;
                        }
                        else if(rs.data === "not found"){
                          loading.close()
                          this.$notify.error({
                            title: 'Uh oh!',
                            message: 'This account was not found.',
                            offset: 100
                            });
                            return false;
                        }
                        else if(rs.data.message === "SUCCESS"){
                          localStorage.setItem("oauth2_ss::_ss_", this.task.email)
                          sessionStorage.setItem("oauth2_ss::_ss_", this.task.email)
                          loading.close()
                          this.historyloginmanagement()
                           var logObject = { 
                            firstname: rs.data.databulk.firstname,
                            lastname: rs.data.databulk.lastname,
                            uid: rs.data.databulk.id,
                            istype : rs.data.databulk.istype,
                            email: rs.data.databulk.email
                          }
                   localStorage.setItem("oauth2_ss::_profileinfo_", JSON.stringify(logObject))
                          sessionStorage.setItem("oauth2_ss::_ss_", this.task.email)
                          
                          this.sessionTask.sessionEmail = this.task.email;
                          this.session_update_or_add();
                          this.$router.push({name: 'admindashboard'}).catch(() =>{})
                        } else if(rs.data.message === "SUCCESS CASHIER") {
                          localStorage.setItem("oauth2_ss::_ss_", this.task.email)
                          sessionStorage.setItem("oauth2_ss::_ss_", this.task.email)
                          loading.close()
                          this.historyloginmanagement()
                          var logObject = {
                            firstname: rs.data.databulk.firstname,
                            lastname: rs.data.databulk.lastname,
                            uid: rs.data.databulk.id,
                            istype : rs.data.databulk.istype,
                            email: rs.data.databulk.email
                          }
                          localStorage.setItem("oauth2_ss::_profileinfo_", JSON.stringify(logObject))
                          sessionStorage.setItem("oauth2_ss::_ss_", this.task.email)

                          this.sessionTask.sessionEmail = this.task.email;
                          this.session_update_or_add();
                          this.$router.push({name: 'cashierdashboard'}).catch(() =>{})
                        }
                      })
                    }, 3000)
        
      }
    },
    }
  }
</script>