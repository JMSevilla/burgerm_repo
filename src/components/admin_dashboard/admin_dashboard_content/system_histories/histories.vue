<template>
    <div>
        <div style="margin-top: 30px;" class="container-fluid">
            <el-card shadow="always">
                <h2 style="margin-top: 20px; margin-bottom: 20px;">Histories</h2>
                 <el-tabs type="card">
                    <el-tab-pane label="Login History">
                        <el-card shadow="hover" style="margin-top: 20px;">
                            <h3>Login History Report</h3>
                                <listofhistories  />
                        </el-card>
                    </el-tab-pane>
                    <el-tab-pane label="Activity Log">
                        <div style="margin-top: 20px;" class="container">
                            <div class="row">
                                <div class="col-md-12">
                                    <el-card shadow="always">
                                        <div class="row">
                                            <div class="col-md-8">
                                                <h4 style="margin-bottom: 20px;">User Management Activity Logs</h4>
                                            </div>
                                            <div class="col-md-4">
                                                <!-- <el-button style="margin-bottom: 20px; float: right;" type="success" size="small">Export Excel</el-button> -->
                                            </div>
                                        </div>
                                        <tableusermanage :onremovelogs="onremovelogs" :listoflogs="listoflogsusermanagement" />
                                    </el-card>
                                </div>
                                <!-- <div class="col-md-6">
                                    <el-card shadow="always">
                                        <h4>Product Inventory Activation Activity Logs</h4>
                                        <tableproductactivationlogs :removelogs="onremove_prod_activation_logs" :dataforprods="listofprodActivationArray" />
                                    </el-card>
                                </div> -->
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="User Archives">
                    <div class="container" style="margin-top: 20px;">
                      <div class="row">
                        <div class="col-md-12">
                          <el-card shadow="always">
                            <h4>User Management Archives</h4>
                            <tableuserarchives :recovery="onrecoveruser" :datalist="listofusersArray" />
                          </el-card>
                        </div>
                        <div class="col-md-6">

                        </div>
                      </div>
                    </div>
                    </el-tab-pane>
                    <el-tab-pane label="Product Archives">
                    <div class="container" style="margin-top: 20px;">
                      <div class="row">
                        <div class="col-md-12">
                          <el-card shadow="always">
                            <h4>Product Stocks Archives</h4>
                           <el-alert
                                title="Automatic Deletion"
                                :closable="false"
                                type="error"
                                style="margin-top: 10px; margin-bottom: 10px;"
                                description="Product Archives will be deleted after 1 month"
                                show-icon>
                            </el-alert>
                           <ProductArchives :fullscreenLoadingDelete="fullscreenLoadingDelete" :fullscreenLoading="fullscreenLoading" :onRemove="onRemove" :onRecover="onRecover" :listofproductArchives="listofproductArchives" />
                          </el-card>
                        </div>
                        <div class="col-md-6">

                        </div>
                      </div>
                    </div>
                    </el-tab-pane>
                    <!-- <el-tab-pane label="Users Reports">Task</el-tab-pane> -->
                </el-tabs>
            </el-card>
        </div>
    </div>
</template>


<script>
import listofhistories from "@/components/ListHistories/logintablehistory"
import tableusermanage from
"@/components/admin_dashboard/ActivityLogs/usermanagement_logs/usermanagementlogs"
import ProductArchives from "@/components/admin_dashboard/ActivityLogs/product_archives/ProductArchives"
import tableproductactivationlogs from 
"@/components/admin_dashboard/ActivityLogs/product_activation_logs/prodactivationlogs"
import tableuserarchives from "@/components/admin_dashboard/ActivityLogs/usermanagement_logs/usermanagementarchives"
import {usermanagementlogs} from "@/store/request-common"
import {mapGetters} from 'vuex'
import client from "@/store/0AuthRequest"
export default {
components: {
    listofhistories, tableusermanage, tableuserarchives, tableproductactivationlogs, ProductArchives
},
data(){
    return{
        listoflogsusermanagement: [],
        listofusersArray: [],
        listofprodActivationArray: [],
        listofproductArchives : [],
        fullscreenLoading: false,
        fullscreenLoadingDelete: false
    }
},
computed: {
    ...mapGetters({
        get_all_users_in_archive: 'get_all_users_in_archive',
        get_response_product_history_activation: 'get_response_product_history_activation'
    })
},
created(){
    this.getlogs_user_management()
    //dispatch from store
    this.$store.dispatch("MUTATE_GET_ARCHIVES_USERS", {self : this})
    this.load_all_prod_activation_logs()
    this.listOfProductArchives()
    this.deletionAfter1Week()
},
methods: {
    onRecover : function(stockid) {
        this.$confirm('Are you sure you want to recover this product ? ', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
            this.fullscreenLoading = true
            setTimeout(() => {
                const request = client.put(`/api/activity-log-management/recover-product-archive?stockID=${stockid}`)
                return request.then(({data}) => {
                    if(data === 'success recover'){
                         this.$notify.success({
                            title: 'Success',
                            message: 'Successfully recover',
                            offset: 100
                            });
                            this.fullscreenLoading = false
                         this.listOfProductArchives()
                    }
                })
            }, 2000)
        })
      },
      onRemove: function(stockid){
          this.$confirm('This will permanently delete the product. Continue?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
             this.fullscreenLoadingDelete = true
             setTimeout(() => {
                 const request = client.delete(`/api/activity-log-management/remove-product-archive?stockID=${stockid}`)
                 return request.then(({data}) => {
                      if(data === 'success deleted'){
                         this.$notify.success({
                            title: 'Success',
                            message: 'Successfully Removed',
                            offset: 100
                            });
                            this.fullscreenLoadingDelete = false
                         this.listOfProductArchives()
                    }
                 })
             }, 2000)
        })
      },
    deletionAfter1Week: function(){
        client.delete(`/api/archive-users-management/auto-deletion-after-1-week`)
        .then(r => {
            if(r.data === 'success deletion') {
                this.listOfProductArchives()
            }
        })
    },
    listOfProductArchives: function(){
        client.get(`/api/archive-users-management/product-archive-list`)
        .then((r) => {
            this.listofproductArchives = r.data
        })
    },
    onremove_prod_activation_logs(id){
        this.$confirm('This will permanently delete the data. Continue?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
            const payload = this.$loading({
                    lock: true,
                    text: 'Recovering, Please wait..',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                    setTimeout(() => {
                        this.$store.dispatch(`ACTIONS_REMOVE_PROD_ACTIVATION_LOGS`, {id}).then(() => {
                            if(this.get_response_product_history_activation === "invalid id"){
                                payload.close()
                                this.$notify.error({
                            title: 'Error',
                            message: 'Invalid id',
                            offset: 100
                            });
                            return false
                            }else{
                                this.$notify.success({
                            title: 'Success',
                            message: 'Successfully removed',
                            offset: 100
                            });
                            payload.close()
                            this.load_all_prod_activation_logs()
                            }
                        })
                    }, 3000)
        })
    },
    load_all_prod_activation_logs(){
        this.$store.dispatch(`ACTIONS_GET_LIST_PROD_ACTIVATION_LOGS`).then(response => {
            this.listofprodActivationArray = response.data
        }, error => {
            console.log(error)
        })
    },
   onremovelogs(id){
       this.$confirm('This will permanently delete the data. Continue?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
            const payload = this.$loading({
                    lock: true,
                    text: 'Recovering, Please wait..',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                    setTimeout(() => {
                        this.$store.dispatch('ACTIONS_LOGS_USERS', {
                            self: this,
                            id,
                            payload
                        })
                    }, 3000)
        })
   },
   removelogs_response(payload){
       if(this.$store.state.archive_logs_Object.archivelogsResponse === "invalid id"){
           payload.close()
           this.$notify.error({
                            title: 'Error',
                            message: 'Invalid id',
                            offset: 100
                            });
                            return false
       }else{
           payload.close()
           this.$notify.success({
                            title: 'Success',
                            message: 'Successfully removed',
                            offset: 100
                            });
                            this.getlogs_user_management()
       }
   },
    getlistofusersdata(){
        this.listofusersArray = this.get_all_users_in_archive
        
    },
    getlogs_user_management(){
        usermanagementlogs().then(res => {
            this.listoflogsusermanagement = res.data
        })
    },
    onrecoveruser(id, cliendid){
        this.$confirm('This will recover the data. Continue?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
            const loading = this.$loading({
                    lock: true,
                    text: 'Recovering, Please wait..',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                    setTimeout(() => {
                        this.$store.dispatch("ACTIONS_RECOVERY_USERS", {
                        self: this,
                        id,
                        cliendid,
                        loading
                        });
                    }, 3000)
        })
        
    },
    onrecoveruser_response(loading){
        if(this.$store.state.archive_recovery_Object.recoveryResponse === "invalid id"){
            loading.close()
            this.$notify.error({
                            title: 'Error',
                            message: 'Invalid id',
                            offset: 100
                            });
                            return false
        }else {
            loading.close()
            this.$notify.success({
                            title: 'Success',
                            message: 'Successfully Recovered',
                            offset: 100
                            });
                            this.$store.dispatch("MUTATE_GET_ARCHIVES_USERS", {self : this})
        }
    }
}
}
</script>
