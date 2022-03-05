<template>
   <div>
        <Nav />
        <div style="margin-top: 100px" class="container">
            <center>
                 <img 
                    src="@/assets/logogo.gif" 
                    alt="No image"
                    style="width: 10%; height: auto;"
                    class="img-fluid">
            </center>
            <el-card style="margin-top: 50px;" shadow="always">
                        <h3>Account has been locked</h3>
                        <el-steps style="margin-top: 50px; margin-bottom: 30px;" :active="active" align-center>
                        <el-step title="Request Access" description="You can request an access here"></el-step>
                        <el-step title="Verification" description="Please input verification code provided by your administrator"></el-step>
                        <el-step title="Credentials Renewal" description="Create your new credentials here"></el-step>
                        <el-step title="Finish" description="Congratulations you've already completed all steps"></el-step>
                        </el-steps>
                        <hr />
                        <div v-if="active == 1">
                            <div style="margin-top: 30px; margin-bottom: 20px;" class="row">
                                <div class="col-sm"></div>
                                <div class="col-sm">
                                    <el-card shadow="always">
                                        <center>
                                            <h2>Request Access</h2>
                                             <img 
                                                src="https://cdn.dribbble.com/users/34790/screenshots/14985256/media/c3cf36095fcc141ebea96d4f3f42b9cf.png?compress=1&resize=1200x900&vertical=top" 
                                                alt="No image"
                                                style="width: 50%; height: auto;"
                                                class="img-fluid">
                                                <el-button v-loading.fullscreen.lock="fullscreenLoading" @click="onContinue" type="primary" style="width: 100%;" plain round size="medium">Continue</el-button>
                                        </center>
                                    </el-card>
                                </div>
                                <div class="col-sm"></div>
                            </div>
                        </div>
                        <div v-else-if="active == 2">
                            <el-card shadow="always">
                                <h4>Verification Area</h4>
                                <p>Please contact your administrator and input the verification code provided by your administrator sent via email. </p>
                                <div style="margin-top: 20px;" class="container">
                                    <el-input
                                    type="text"
                                    placeholder="Enter API Key"
                                    clearable
                                    style="padding: 15px;  margin-top: 10px; "
                                    v-model="lockInfo.apikey"
                                    ></el-input>
                                    <el-button
                                    style="float: right; margin-top: 5px; margin-bottom: 10px;"
                                    plain
                                    type="success"
                                    size="medium"
                                    v-loading.fullscreen.lock="fullscreenLoading"
                                    @click="onVerify"
                                    >Verify</el-button>
                                     <el-button
                                    style="float: right; margin-top: 5px; margin-right : 10px; margin-bottom: 10px;"
                                    plain
                                    type="primary"
                                    size="medium"
                                    @click="onResend"
                                    >Resend</el-button>
                                </div>
                            </el-card>
                        </div>
                        <div v-else-if="active == 3">
                            <el-card shadow="always">
                                 <h4>New Credentials</h4>
                                <p>Kindly provide your new credentials here. </p>
                                <div style="margin-top: 20px;" class="row">
                                    <div class="col-sm">
                                        <span>Email Address</span>
                                        <el-input
                                        type="email"
                                        clearable
                                        style="margin-top: 10px; margin-bottom: 10px;"
                                        placeholder="Enter email"
                                        v-model="CredentialsInfo.email"
                                        ></el-input>
                                    </div>
                                    <div class="col-sm">
                                         <span>New Password</span>
                                        <el-input
                                        type="password"
                                        show-password
                                        clearable
                                        style="margin-top: 10px; margin-bottom: 10px;"
                                        placeholder="Enter password"
                                        v-model="CredentialsInfo.password"
                                        ></el-input>
                                    </div>
                                    <div class="col-sm">
                                         <span>Confirm Password</span>
                                        <el-input
                                        type="password"
                                        show-password
                                        clearable
                                        style="margin-top: 10px; margin-bottom: 10px;"
                                        placeholder="Confirm password"
                                        v-model="CredentialsInfo.confirmpass"
                                        ></el-input>
                                    </div>
                                </div>
                                <el-button
                                type="primary"
                                plain
                                style="float: right; margin-top: 10px; margin-bottom: 20px;"
                                size="medium"
                                @click="onNext"
                                >Next</el-button>
                            </el-card>
                        </div>
                        <div v-else-if="active == 4">
                            <el-card shadow="always">
                               <div class="row">
                                   <div class="col-sm"></div>
                                   <div class="col-sm">
                                        <center>
                                    <h3>Congratulations ! You're all caught up</h3>
                                    <img 
                                    src="https://cdn.dribbble.com/users/997338/screenshots/14118567/media/fd193848744e851927a2f7e8ae6c2961.png?compress=1&resize=1200x900&vertical=top" 
                                    alt="No image"
                                    style="width: 60%; height: auto;"
                                    class="img-fluid">
                                    <el-button
                                    type="danger"
                                    style="width: 100%;"
                                    size="medium"
                                    @click="onReturnHome"
                                    >RETURN HOME</el-button>
                                </center>
                                   </div>
                                   <div class="col-sm"></div>
                               </div>
                            </el-card>
                        </div>
                    </el-card>
        </div>
   </div>
</template>

<script>
import Nav from "@/components/lockAccount/nav"
import client from "@/store/0AuthRequest"
export default {
    components : {
        Nav
    },
    data() {
        return {
            active : 1,
            lockObject : {
                key : '',
                email : 'jashrille.alcaraz@gmail.com'
            },
            lockInfo: {
                apikey : '', email : 'jashrille.alcaraz@gmail.com'
            },
            CredentialsInfo: { 
                email: '', password : '', confirmpass: ''
            },
            fullscreenLoading: false
        }
    },
    methods : {
        onReturnHome: function() {
            this.$router.push({name : 'Index'}).catch(() => {})
        },
        onNext: function() {
            this.fullscreenLoading = true;
            setTimeout(() => {
                if(!this.CredentialsInfo.email || !this.CredentialsInfo.password || !this.CredentialsInfo.confirmpass)
            {
                this.$notify.error({
                            title: 'Oops!',
                            message: 'Empty fields',
                            offset: 100
                            });
                            this.fullscreenLoading = false;
                            return false;
            }else if(this.CredentialsInfo.password != this.CredentialsInfo.confirmpass){
                this.$notify.warning({
                            title: 'Oops!',
                            message: 'Password mismatch',
                            offset: 100
                            });
                            this.fullscreenLoading = false;
                            return false;
            } else {
               client.get(`/api/forgot-password/user-checker?email=${this.CredentialsInfo.email}`)
                .then(r => {
                    if(r.data === 'exist') {
                        client.post(`/api/forgot-password/change-password?password=${this.CredentialsInfo.password}&email=${this.CredentialsInfo.email}`)
                        .then(res => {
                            if(res.data === 'success change'){
                                client.put(`/api/forgot-password/unlock-account?email=${this.CredentialsInfo.email}`)
                                .then(x => {
                                    if(x.data === 'success unlock') {
                                         this.$notify.success({
                                            title: 'Nice!',
                                            message: 'Successfully Changed Password',
                                            offset: 100
                                            });
                                            this.active++;
                                            this.fullscreenLoading = false;
                                    }
                                })
                            }
                        })
                    }else {
                        this.$notify.error({
                            title: 'Oops!',
                            message: 'Email not exist',
                            offset: 100
                            });
                            this.fullscreenLoading = false;
                            return false;
                    }
                })
            }
            }, 2000)
        },
        onVerify: function() {
            this.fullscreenLoading = true;
            setTimeout(() => {
                client.get(`/api/forgot-password/verify-code?code=${this.lockInfo.apikey}&email=${this.lockInfo.email}`)
                .then(r => {
                    if(r.data === 'success verification') {
                        this.$notify.success({
                            title: 'Nice!',
                            message: 'Successfully Verified',
                            offset: 100
                            });
                            this.active++;
                            this.fullscreenLoading = false;
                    }else { 
                        this.$notify.error({
                            title: 'Oops!',
                            message: 'Invalid Verification Code',
                            offset: 100
                            });
                            return false;
                    }
                })
            }, 2000)
        },
        onResend: function() {
              this.fullscreenLoading = true
            this.generatedKey()
            setTimeout(( ) => {
                
                client.put(`/api/forgot-password/code-verification-entry?email=${this.lockObject.email}&apicode=${this.lockObject.key}`)
                .then(r => {
                    if(r.data === 'success send'){
                        client.post(`/api/forgot-password/send-email?email=${this.lockObject.email}&vcode=${this.lockObject.key}`)
                        .then(repo => {
                            this.fullscreenLoading = false
                            this.$notify.success({
                            title: 'Nice!',
                            message: 'Successfully Sent to Administrator',
                            offset: 100
                            });
                            return false
                        })
                    } else if(r.data === 'maximum 3'){
                        this.fullscreenLoading = false
                        this.$notify.error({
                            title: 'Uh oh!',
                            message: 'You have reached the maximum of 3 request sent',
                            offset: 100
                          });
                    } else {
                        client.post(`/api/forgot-password/post-send-email?email=${this.lockObject.email}&apicode=${this.lockObject.key}`)
                        .then(res => {
                            if(res.data === 'success post'){
                                client.post(`/api/forgot-password/send-email?email=${this.lockObject.email}&vcode=${this.lockObject.key}`)
                                .then(repos => {
                                    this.fullscreenLoading = false
                                    this.$notify.success({
                                            title: 'Nice!',
                                            message: 'Successfully Sent to Administrator',
                                            offset: 100
                                        });
                                        return false
                                })
                                
                            }
                        })
                    }
                })
            }, 3000)
        },
        onContinue: function() {
            this.fullscreenLoading = true
            this.generatedKey()
            setTimeout(( ) => {
                
                client.put(`/api/forgot-password/code-verification-entry?email=${this.lockObject.email}&apicode=${this.lockObject.key}`)
                .then(r => {
                    if(r.data === 'success send'){
                        client.post(`/api/forgot-password/send-email?email=${this.lockObject.email}&vcode=${this.lockObject.key}`)
                        .then(repo => {
                            this.fullscreenLoading = false
                            this.$notify.success({
                            title: 'Nice!',
                            message: 'Successfully Sent to Administrator',
                            offset: 100
                            });
                            this.active++;
                            return false
                        })
                    } else if(r.data === 'maximum 3'){
                         this.fullscreenLoading = false
                        this.$notify.error({
                            title: 'Uh oh!',
                            message: 'You have reached the maximum of 3 request sent',
                            offset: 100
                          });
                    } else {
                        client.post(`/api/forgot-password/post-send-email?email=${this.lockObject.email}&apicode=${this.lockObject.key}`)
                        .then(res => {
                            if(res.data === 'success post'){
                                client.post(`/api/forgot-password/send-email?email=${this.lockObject.email}&vcode=${this.lockObject.key}`)
                                .then(repos => {
                                     this.fullscreenLoading = false
                                    this.$notify.success({
                                            title: 'Nice!',
                                            message: 'Successfully Sent to Administrator',
                                            offset: 100
                                        });
                                        this.active++;
                                        return false
                                })
                                
                            }
                        })
                    }
                })
            }, 3000)
        },
        generatedKey : function() {
            var d = new Date().getTime();
                if (window.performance && typeof window.performance.now === "function") {
                    d += performance.now();
                }
                var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
                    /[xy]/g,
                    function (c) {
                        var r = (d + Math.random() * 16) % 16 | 0;
                        d = Math.floor(d / 16);
                        return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
                    }
                );
                return this.lockObject.key = uuid;
                    }
    }
}
</script>