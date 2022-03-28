<template>
    <div>
        <navadmin />
        <sidenavadmin />
        <!-- el dialog for list expired prod -->
                                              
                                <!-- end el dialog -->
                                <!-- el drawer view 0 quantity product -->
                                       
                                <!-- end el drawer view 0 quantity product -->

                                <b-modal  id="bv-modal-example" hide-footer>
                                <template #modal-title>
                                Product Expiration Notification
                                </template>
                                
                            <div style="margin-top: 20px;" class="container">
                                     <el-alert
                                        style="margin-top: 20px; margin-bottom: 30px;"
                                            title="Product expired"
                                            type="error"
                                            effect="dark"
                                            :closable="false"
                                            description="Please check in the list all of your products that expired."
                                            show-icon>
                                        </el-alert>
                                    <el-card shadow="always" style="margin-top: 20px;">
                                        <el-tabs type="card">
                                        <el-tab-pane label="Expired">
                                              <el-input
                                    style="margin-bottom: 5px; width: 30%;"
                                    placeholder="Search"
                                    v-model="searchable"
                                    clearable>
                                    </el-input>
                                              <el-table
                                    :key="0"
                                    :data="pagedTableData"
                                    border
                                    fit
                                    highlight-current-row
                                    style="width: 100%;"
                                    
                                    >
                                    <el-table-column label="Stock Number" prop="id" sortable="custom" align="center"  >
                                        <template slot-scope="{row}">
                                        <span>{{ row.productCode }}</span>
                                        </template>
                                    </el-table-column>
                                    
                                    <el-table-column label="Product Image" >
                                        <template slot-scope="{row}">
                                        <img :src="row.productimgurl" style="width: 100%; height: auto;" class="img-fluid" alt="No image">
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                    <el-table-column label="Product Name" >
                                        <template slot-scope="{row}">
                                        <span class="link-type" >{{ row.productName }}</span>
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                     <el-table-column label="Product Quantity" >
                                        <template slot-scope="{row}">
                                        <span class="link-type" >{{ row.product_quantity }}</span>
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                    

                                    
                                    <el-table-column label="Status" class-name="status-col" >
                                        <template >
                                          <el-tag type="danger" effect="dark">
                                            Expired
                                        </el-tag>
                                        </template>
                                    </el-table-column>

                                    <!-- <el-table-column label="More actions"  align="center">
                                        <template slot-scope="{row}">
                                        
                                        </template>
                                    </el-table-column> -->

                                    </el-table>
                                     <el-pagination layout="prev, pager, next" :page-size="pageSize" :total="this.productArray.length" @current-change="setPage">
                                    </el-pagination>
                                        </el-tab-pane>
                                        <el-tab-pane label="Warning">
                                               <el-input
                                    style="margin-bottom: 5px; width: 30%;"
                                    placeholder="Search"
                                    v-model="searchablewarning"
                                    clearable>
                                    </el-input>
                                              <el-table
                                    :key="0"
                                    v-loading="listLoading"
                                    :data="pagedTableDataWarning"
                                    border
                                    fit
                                    highlight-current-row
                                    style="width: 100%;"
                                    
                                    >
                                    <el-table-column label="Stock Number" prop="id" sortable="custom" align="center"  >
                                        <template slot-scope="{row}">
                                        <span>{{ row.productCode }}</span>
                                        </template>
                                    </el-table-column>
                                    
                                    <el-table-column label="Product Image" >
                                        <template slot-scope="{row}">
                                        <img :src="row.productimgurl" style="width: 100%; height: auto;" class="img-fluid" alt="No image">
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                    <el-table-column label="Product Name" >
                                        <template slot-scope="{row}">
                                        <span class="link-type" >{{ row.productName }}</span>
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                     <el-table-column label="Product Quantity" >
                                        <template slot-scope="{row}">
                                        <span class="link-type" >{{ row.product_quantity }}</span>
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                    

                                    
                                    <el-table-column label="Status" class-name="status-col" >
                                        <template >
                                          <el-tag type="warning" effect="dark">
                                            Will expire in 10 days
                                        </el-tag>
                                        </template>
                                    </el-table-column>

                                    <!-- <el-table-column label="More actions"  align="center">
                                        <template slot-scope="{row}">
                                        
                                        </template>
                                    </el-table-column> -->

                                    </el-table>
                                     <el-pagination layout="prev, pager, next" :page-size="pageSize" :total="this.productArray.length" @current-change="setPage">
                                    </el-pagination>
                                        </el-tab-pane>
                                    </el-tabs>
                                    </el-card>
                                </div>

                                <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Close Me</b-button>
                            </b-modal>


    </div>
</template>

<script>
//import side nav, nav, footer of dashboard
import navadmin from "@/components/admin_dashboard/admin_nav"
import sidenavadmin from "@/components/admin_dashboard/admin_side"
import {scanSession, productexpiredafter10days, productexpired, STOCK_EMPTY_NOTIF, getzero} from "@/store/request-common";
import client from "@/store/0AuthRequest"
export default {
    components: {
        navadmin, sidenavadmin
    },
    data(){
        return {
            quantityviewerdrawer: false,
            searchablewarning: '',
            dialogVisible: false,
            dialogExpirationVisible: false,
              pageSize: 5,
              page: 1,
              listLoading: true,
               searchable: '',
                productArray: [],
                productWarningArray : [],
                zeroquantity: []
        }
    },
     computed: {
          pagedTableData() {
       if(this.searchable){
      return this.productArray.filter((item)=>{
        return this.searchable.toLowerCase().split(' ').every(v => item.productName.toLowerCase().includes(v) || item.productID.toString().toLowerCase().includes(v))
      })
      }else{
        return this.productArray.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
      }
       
     },
     pagedTableDataWarning(){
         if(this.searchablewarning){
      return this.productWarningArray.filter((item)=>{
        return this.searchable.toLowerCase().split(' ').every(v => item.productName.toLowerCase().includes(v) || item.productID.toString().toLowerCase().includes(v))
      })
      }else{
        return this.productWarningArray.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
      }
     }
    },
    created(){
        this.getBeforeExpiration()
        this.getExpiredProduct()
        // Reload niyo yung site if gusto niyo makita ulit yung notification ng expired product and warning to expired
        this.checker()
        setInterval(() => {

        }, 10000)
        this.checkquantity()
    },
    methods: {
        getExpiredProduct(){
            const req = client.get(`/api/expired-notif/product-expired`)
            return req.then(r => {
                console.log("expired product", r.data)
                if(r.data === 'not exist expiry'){
                    this.listLoading = false;
                    this.$bvModal.show('bv-modal-example')
                }else{
                    this.productArray = r.data
                    this.listLoading = false;
                    this.$bvModal.show('bv-modal-example')
                }
            })
        },
        getBeforeExpiration: function() {
            const request = client.get(`/api/expired-notif/check-10-days-before-expiration`)
            return request.then((response) => {
               this.productWarningArray = response.data
               this.listLoading = false
              this.$bvModal.show('bv-modal-example')
            })
        },
        oncheckstocks(){
            const loading = this.$loading({
                    lock: true,
                    text: 'please wait..',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                    setTimeout(() => {
                        loading.close()
                        this.$router.push({name: 'Stocks on hand'}).catch(() => {})
                         
                    }, 2000)
        },
        takeallzeroquantity(){
            getzero().then(res => {
                this.zeroquantity = res.data
            })
        },
        handleClose(done) {
        this.$confirm('Are you sure you want to close this?')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
       checkquantity(){
           STOCK_EMPTY_NOTIF().then((resolve) => {
               if(resolve.data === "empty quantity"){
                    this.$confirm('There is an empty product on your stock would you like to check ?', 'Empty Product Quantity', {
                    cancelButtonText: 'No',
                    confirmButtonText: 'Yes',
                    type: 'error'
                    })
                    .then(() => {
                       this.$router.push({name : 'Stocks on hand'}).catch(() => {})
                    })
               }
           })
       },
         setPage (val) {
        this.page = val
      },
        checker(){
      scanSession().then((response) => {
       if(response.data === "homepage"){
            this.$router.push({name: 'Index'}).catch(() => {})
        }
      })
        },
        exactdateexpired(){
            productexpired().then(response => {
                console.log(response.data)
                if(response.data == "not exist expiry"){
                     this.dialogVisible = false;
                     this.listLoading = false;
                     this.productArray = response.data
                }
                else if(response.data[0] == null || response.data[0] == ''){
                    this.dialogVisible = false;
                    this.listLoading = false;
                    this.productArray = response.data
                }else{
                    this.dialogVisible = true;
                    this.listLoading = false;
                    this.productArray = response.data
                }
            })
        },
        getafter10daysexpiration(){
            // productexpiredafter10days().then(response => {
            //     if(response.data.respObj == null || response.data == null || response.data.respObj == ''){
            //         this.dialogVisible = false;
            //         console.log(this.after10days)
            //         console.log(response.data);
            //     }else{  
            //     this.dialogVisible = true;
            //     this.after10days = response.data.respObj;
            //     console.log(this.after10days)
            //     console.log(response.data);
            //     }
            // })
        },
    }
}
</script>