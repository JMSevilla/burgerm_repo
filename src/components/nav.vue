<template>
    <div>
         <!-- Navbar -->
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <!-- Container wrapper -->
  <div class="container">
    <!-- Navbar brand -->
    <a class="navbar-brand me-2" href="#">
      <img
        src=""
        
        alt=""
        loading="lazy"
        style="margin-top: -1px; width: 5%; height:auto;"
      />
    </a>

    <!-- Toggle button -->
    <button
      class="navbar-toggler"
      type="button"
      data-mdb-toggle="collapse"
      data-mdb-target="#navbarButtonsExample"
      aria-controls="navbarButtonsExample"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i class="fas fa-bars"></i>
    </button>

    <!-- Collapsible wrapper -->
    <div class="collapse navbar-collapse" id="navbarButtonsExample">
      <!-- Left links -->
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
        </li>
      </ul>
      <!-- Left links -->

      <div class="d-flex align-items-center">
        
        
        <!-- <el-button  v-on:keyup="validateconfirm" @click="onlogin()" style="width: 10t0%; padding: 15px; margin-top: 10px; margin-bottom: 10px;" type="primary" round>Log in</el-button> -->
      </div>
    </div>
    <!-- Collapsible wrapper -->
  </div>
  <!-- Container wrapper -->
</nav>
<!-- Dialog Box -->
<el-dialog
  title="Welcome! Please login."
  :visible.sync="dialogVisible"
  width="35%"
  :before-close="handleClose">
  
 <el-input
 @keyup.enter.native="checkEnter"
 style="margin-bottom: 10px;"
  placeholder="Please input email"
  v-model="task.email"
  clearable>
</el-input>

<el-input
@keyup.enter.native="checkEnter"
  placeholder="Please input password"
  v-model="task.password"
  type="password"
  clearable show-password>
</el-input>

<!-- <el-link @click="onforgot()" type="primary">Forgot password?</el-link> -->
<!-- <div >
  <span>Don't have an account ? </span>
<el-link style="margin-bottom: 10px; margin-top: 5px;" @click="onnavigateRegister()" type="primary">Register</el-link>
</div> -->
<!-- Google Button -->
<center><br>
  <!-- <div>
  <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess"></GoogleLogin>
</div> -->
</center>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">Cancel</el-button>
    <el-button type="primary" v-on:keyup="validateconfirm" @click="onsignin()">Confirm</el-button>
  </span>
</el-dialog>
<!-- End Dialog Box -->
<!-- Navbar -->
    </div>
</template>

<script>
import GoogleLogin from 'vue-google-login';
//import function from request common
import {csrf_google_login, csrf_session_indicator, standardLogin, loginhistory} from "@/store/request-common"
import routers from "@/router/index";

export default {
  components: {
            GoogleLogin
        },
  data(){
    return {
      dialogVisible: false,
      task: {
        email: '', password: ''
      },
      params: {
                    client_id: "276210162071-n2n48b9329du9fgm4rkjrc0gmuj9buk7.apps.googleusercontent.com" //Localhost
                    // client_id: "276210162071-51kdasipabb443pmfi0cthgfkvrof67u.apps.googleusercontent.com" //production
                },
                // only needed if you want to render the button with the google ui
                renderParams: {
                    width: 250,
                    height: 50,
                    longtitle: true
                },
                sessionTask: {
                  sessionID: 0,
                  sessionEmail: ''
                }
    }
  },
  created(){
    this.makeid(5)
  },
  methods: {
    checkEnter(e){
      this.onsignin()
    },
    historyloginmanagement(){
      loginhistory(this.task.email).then(response => {
        if(response.data.message === "success"){
          console.log(response.data.message)
        }
      })
    },
    googleloginhistory(email){
      loginhistory(email).then(response => {
        if(response.data.message === "success"){
          console.log(response.data.message)
        }
      })
    },
    onaboutus(){
      this.$router.push({name: 'About Us'}).catch(() => {})
    },
    onforgot(){
      this.$router.push({name: 'Forgot Password'}).catch(() => {})
    },
    onhome(){
      this.$router.push({name: 'Index'}).catch(() => {})
    },
    onsignin(){
      if(!this.task.email || !this.task.password){
        this.$notify.error({
                            title: 'Warning!',
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
                            title: 'Warning!',
                            message: 'empty fields.',
                            offset: 100
                            });
                            return false;
                        }else if(rs.data === "disabled"){
                          loading.close()
                          this.$notify.error({
                            title: 'Warning!',
                            message: 'Unfortunately your account is disable.',
                            offset: 100
                            });
                            return false;
                        }
                        else if(rs.data === "invalid"){
                          loading.close()
                          this.$notify.error({
                            title: 'Warning!',
                            message: 'Invalid password.',
                            offset: 100
                            });
                            return false;
                        }
                        else if(rs.data === "not found"){
                          loading.close()
                          this.$notify.error({
                            title: 'Warning!!',
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
                          routers.push({name: 'admindashboard'})
                        }
                      })
                    }, 3000)
        
      }
    },
    makeid(length) {
        var result           = [];
        var characters       = '0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result.push(characters.charAt(Math.floor(Math.random() *
      charactersLength)));
      }
      return this.sessionTask.sessionID = result.join('');
      },
    onnavigateRegister(){
      this.$router.push({name: 'Registration'}).catch(() => {})
    },
    onSuccess(googleUser) {
            console.log(googleUser);
            csrf_google_login(googleUser.getBasicProfile().It)
            .then((response) => {
              if(response.data.response_message === "proceed login admin") {
                //route to dashboard admin
                this.googleloginhistory(googleUser.getBasicProfile().It)
                const loading = this.$loading({
                    lock: true,
                    text: 'Redirecting, please wait..',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                    setTimeout(() => {
                      
                   sessionStorage.setItem("oauth2_ss::_ss_", googleUser.getBasicProfile().It)
                   localStorage.setItem("oauth2_ss::_ss_", googleUser.getBasicProfile().It)
                   this.sessionTask.sessionEmail = googleUser.getBasicProfile().It;
                   var logObject = { 
                     firstname: response.data.bundle[0].firstname,
                     lastname: response.data.bundle[0].lastname,
                     uid: response.data.bundle[0].id,
                     istype : response.data.bundle[0].istype,
                     email: response.data.bundle[0].email
                   }
                   localStorage.setItem("oauth2_ss::_profileinfo_", JSON.stringify(logObject))
                    this.session_update_or_add();
                   loading.close()
                    }, 3000)
              }
              else if(response.data.response_message === "proceed login customer"){
                //route to dashboard customer
              }
              else if(response.data === "disable"){
                this.$notify.warning({
                            title: 'Warning!',
                            message: 'Your account is disabled.',
                            offset: 100
                            });
                            return false;
              }else if(response.data === "not verified") {
                this.$notify.warning({
                            title: 'Warning!',
                            message: 'Your account is not yet verified.',
                            offset: 100
                            });
                            //show modal to input verification code.
                            return false;
              }
              else if(response.data === "email not exists") {
                this.$notify.error({
                            title: 'Warning!',
                            message: 'We cant find this account. Please register.',
                            offset: 100
                            });
                            return false;
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
    onlogin(){
      this.dialogVisible = true
      // this.$router.push({name: 'Login'}).catch(() => {})
    },
     handleClose(done) {
        this.$confirm('Are you sure to close this dialog?')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
  }
}
</script>
<style scoped>
.bhome{
	background-color:transparent;
	border-radius:15px;
	display:inline-block;
	cursor:pointer;
	color: #4e9bf9;
	font-family:Arial;
	font-size:15px;
  font-weight: bold;
	padding:10px 20px;
	text-decoration:none;
}
.bhome:hover {
  color:#C4DEFD;
	background-color: #34312D ;
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);

}
.bhome:active {
	position:relative;
	top:1px;
}
.blog{
	background-color:transparent;
	border-radius:15px;
	display:inline-block;
	cursor:pointer;
	color: #4e9bf9;
	font-family:Arial;
	font-size:15px;
  font-weight: bold;
	padding:10px 20px;
	text-decoration:none;
}
.blog:hover {
  color:#C4DEFD;
	background-color: #34312D ;
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);

}
.blog:active {
	position:relative;
	top:1px;
}
.babout{
	background-color:transparent;
	border-radius:15px;
	display:inline-block;
	cursor:pointer;
	color: #4e9bf9;
	font-family:Arial;
	font-size:15px;
  font-weight: bold;
	padding:10px 20px;
	text-decoration:none;
}
.babout:hover {
  color:#C4DEFD;
	background-color: #34312D ;
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);

}
.babout:active {
	position:relative;
	top:1px;
}
</style>