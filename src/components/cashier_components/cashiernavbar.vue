<template>
  <div>
    <b-navbar style="padding: 20px" toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">BURGER MANIA &nbsp; <el-tag type="warning" effect="dark" size="small">Cashier Area</el-tag></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
       
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">



          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>{{fullname()}}</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
             <center>
              <el-button style="width: 80%" type="danger" size="small" @click="onlogout()">Logout</el-button>     
              </center>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import client from "@/store/0AuthRequest"
import { logouthistory} from "@/store/request-common"
export default {
  props: {
    fullname: Function
  },
  methods:{
     addinglogouthistory(email){
          logouthistory(email)
          .then(res => {
              if(res.data.message === "success"){
                  console.log(res.data)
              }
          })
      },
     onlogout(){
           this.$confirm('Are you sure you want to logout?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
            const loading = this.$loading({
                    lock: true,
                    text: 'Please wait...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                    setTimeout(() => {
                      client.post(`/api/csrf-login/cashier-account-logout?email=${JSON.parse(localStorage.getItem("oauth2_ss::_profileinfo_")).email}`)
                        .then(response => {
                            if(response.data === "logout"){
                                this.addinglogouthistory(localStorage.getItem("oauth2_ss::_ss_"))
                                loading.close()
                                localStorage.removeItem("oauth2_ss::_ss_")
                                localStorage.removeItem("oauth2_ss::_profileinfo_")
                                
                                this.$router.push({name: 'Index'}).catch(() => {})
                            }
                        })
                    }, 3000)
        }).catch(() => {
            this.$notify.info({
                            title: 'Info',
                            message: 'Cancel logout',
                            offset: 100
                            });
        })
       }
   }
  }
</script>