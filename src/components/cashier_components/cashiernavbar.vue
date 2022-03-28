<template>
  <div>
    <b-navbar style="padding: 10px" toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#" style="font-size:24px;">BURGER MANIA &nbsp; <el-tag type="warning" effect="dark" size="small">Cashier Area</el-tag></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
       
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">


    <el-button type="danger" size="mini" plain style="margin-right : 20px;" @click="drawer = true">Close Store Mode</el-button>
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            
            <template #button-content>
              <div style="color: white; font-size: 16px">
               <em>{{fullname()}}</em>
            </div></template>
            <!-- <b-dropdown-item href="#">Profile</b-dropdown-item> -->
             <center>
              <el-button style="width: 80%" type="danger" size="medium" @click="onlogout()">Logout</el-button>     
              </center>
          </b-nav-item-dropdown>
          
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <el-drawer
  title="I am the title"
  :visible.sync="drawer"
  :with-header="false"
  :before-close="handleClose">

    <div style="margin-top: 100px;" class="container">
      <el-alert
        title="Warning"
        style="margin-top: 10px; margin-bottom: 20px;"
        type="warning"
        closable="false"
        description="Upon confirming your close products the data may enter on admin inventory reports"
        show-icon>
      </el-alert>
  <el-card shadow="always" style="margin-top: 20px;">
        <h3>Closing Product Inventory Reports</h3>
        <table class="table table-hover table-outline">
          <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">BEG</th>
                            <th scope="col">Available</th>
                            <th scope="col">END</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in pagedTableData" :key="item.invID">
                            <th style="font-size: 14px;" scope="row">{{item.invID}}</th>
                            <td style="font-size: 14px;">{{item.productName}}</td>
                            <td style="font-size: 14px;">{{item.beg_qty}}</td>
                            <td style="font-size: 14px;">{{item.available}}</td>
                            <td style="font-size: 14px;">{{item.end_qty}}</td>
                            
                            </tr>
                        </tbody>
        </table>
         <el-button
                              type="danger"
                              size="small"
                              style="float: right; margin-top: 10px; margin-bottom: 10px;"
                              @click="onCloseStoreMode()"
                              :disabled="willDisableClosing"
                              >Confirm Close</el-button>
        <el-pagination layout="prev, pager, next" :page-size="pageSize" :total="this.inventoryReports.length" @current-change="setPage">
                                    </el-pagination>
      </el-card>
    </div>


</el-drawer>

  </div>
</template>

<script>
import client from "@/store/0AuthRequest"
import { logouthistory} from "@/store/request-common"
export default {
  props: {
    fullname: Function
  },
  data(){ 
    return{
      drawer : false, pageSize : 5, page: 1, inventoryReports: [], willDisableClosing : false
    }
  },
  computed: {
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
    this.getInventoryReports()
  },
  methods:{
    onCloseStoreMode(){
      for(var x = 0; x < this.inventoryReports.length; x++) {
          client.put('/api/inventory-reports/get-quantity-current-inventory?refId=' + this.inventoryReports[x].refId).then(res => {
          console.log(res.data)
          if(res.data === "success update end"){
            this.willDisableClosing = true
            
                                  this.getInventoryReports()
          }
        })
      }
      this.$notify.success({
                                  title: 'Success!',
                                  message: 'This product successfully close and sent to END Reports',
                                  offset: 100
                                  });
    },
     getInventoryReports: function() {
           client.get('/api/inventory-reports/get-inventory-reports').then(response => {
               this.inventoryReports = response.data
           })
       },
    setPage(val){
      this.page = val
    },
    handleClose(done) {
        this.$confirm('Are you sure you want to close this?')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
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