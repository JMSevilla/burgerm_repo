<template>
    <div>
         <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <!-- Navbar Brand-->
            <p class="navbar-brand ps-1" style=" font-size:24px;">&nbsp;&nbsp;&nbsp;&nbsp;BURGER MANIA</p>
            <!-- Sidebar Toggle-->
            <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" @click="sidebarToggle()"><i class="fas fa-bars"></i></button>
            <!-- Navbar Search-->
            <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                
            </form>
            <div class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                <div style="color: white; font-siz`e: 16px">
                   <!-- <el-button @click="onOpenStoreMode()" type="primary" size="small" plain style="margin-right : 30px;">Open Store Mode</el-button> {{fullnameSetter}} -->
                   {{fullnameSetter}}
                </div>
            </div>
            <!-- Navbar-->
            <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" id="navbarDropdown"  href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-user fa-2x "></i></a>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown" >
                        <li><router-link class="dropdown-item" :to="{name: 'More Settings'}"><font size="3px;">Settings</font></router-link></li>
                        <li><router-link class="dropdown-item" :to="{name: 'Product History'}"><font size="3px;">Activity Log</font></router-link></li>
                         <li><router-link class="dropdown-item" :to="{name: 'Profile', query: {email: getemail}}"><font size="3px;">Profile</font></router-link></li>
                        <li><hr class="dropdown-divider" /></li>
                        <li>
                            <center>
                                <el-button style="width: 80%" type="danger" size="small" @click="onlogout()">Logout</el-button>
                            </center>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
       
    </div>
</template>

<script>
import {userLogout, logouthistory} from "@/store/request-common"
import {mapGetters} from 'vuex';
import client from "@/store/0AuthRequest"
export default {
    computed: {
        fullnameSetter(){
            return JSON.parse(localStorage.getItem("oauth2_ss::_profileinfo_")).firstname + " " + JSON.parse(localStorage.getItem("oauth2_ss::_profileinfo_")).lastname
        },
        ...mapGetters({
            getemail: 'getemail'
        }),
        pagedTableData(){
            if(this.searchable){
                return this.inventoryReports.filter((item)=>{
                    return this.searchable.toLowerCase().split(' ').every(v => item.productName.toString().toLowerCase().includes(v))
                })
                }else{
                    return this.inventoryReports.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
                }
        },
    },
    created(){
       this.$store.state.emailObject.passParams = this.$route.query.email
       this.checkOnOpenStore()
       this.getInventoryReports();
    },
    data(){
        return {
            dialogVisible : false,
            openStoremodeIdentifier : false,
            searchable: '', pageSize : 5, page : 1, inventoryReports: [], dateFiltering : null
        }
    },
   methods: {
       onSendInv: function(){
           for(var x = 0; x < this.inventoryReports.length; x++){
            //    console.log(this.inventoryReports[x].end_qty)
            //    console.log(this.inventoryReports[x].refId)
               client.post('/api/inventory-reports/send-product-to-beg?prodname=' + this.inventoryReports[x].productName + '&beg=' + this.inventoryReports[x].end_qty + '&refid=' + this.inventoryReports[x].refId).then(response => {
                   if(response.data === 'success send') {
                       this.$notify.success({
                            title: 'Success',
                            message: 'Successfully Sent to Inventory Reports',
                            offset: 100
                            });
                            this.dialogVisible = false
                            this.checkOnOpenStore()
       this.getInventoryReports();
                   }
               })
           }
       },
       onchangeDate: function(){
           client.get('/api/inventory-reports/get-product-per-day?today=' + this.dateFiltering)
           .then(response => {
               this.inventoryReports = response.data
           })
       },
       setPage(val) {
           this.page = val
       },
       checkOnOpenStore : function(){
         client.get('/api/inventory-reports/check-on-openstore-mode').then(response => {
               if(response.data === "exist today") {
                   this.openStoremodeIdentifier = true
               }else{
                   this.openStoremodeIdentifier = false
               }
           })
       },
       getInventoryReports: function() {
           client.get('/api/inventory-reports/get-inventory-reports').then(response => {
               this.inventoryReports = response.data
           })
       },
       goPullProducts: function(){
           this.$router.push({name: 'Product Inventory Add'}).catch(() => {})
           this.dialogVisible = false
       },
       onOpenStoreMode(){
           this.dialogVisible= true
           this.checkOnOpenStore()
       },
      addinglogouthistory(email){
          logouthistory()
          .then(res => {
              if(res.data.message === "success"){
                  console.log(res.data)
              }
          })
      },
      handleClose(done) {
        this.$confirm('Are you sure to close this dialog?')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
       sidebarToggle(){
           document.body.classList.toggle('sb-sidenav-toggled');
           localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
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
                        userLogout(
                            JSON.parse(localStorage.getItem("oauth2_ss::_profileinfo_")).email
                        )
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