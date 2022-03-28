<template>
    <div style="margin-top: 100px;" class="container-fluid">
        <el-card shadow="always">
            <!-- <h3>Inventory Reports</h3> -->
            <!-- table -->  
           
      <div style="display : flex; margin-left: 100px;">
                            <el-input type="text" v-model="searchable" clearable style="margin-right : 10px; width: 30%;" placeholder="Search"></el-input>
                          <!-- <label style="margin-right: 10px;">From : </label> -->
                          
                        <el-date-picker
                        v-model="filterable.fromdate"
                        format="yyyy/MM/dd"
                        value-format="yyyy/MM/dd"
                        type="date"
                        placeholder="Select date from">
                        </el-date-picker> &nbsp; -->
                         <label style="margin-right: 10px;">To : </label>
                        <el-date-picker
                        style="margin-right: 30px;"
                        v-model="filterable.todate"
                        format="yyyy/MM/dd"
                        value-format="yyyy/MM/dd"
                        type="date"
                        placeholder="Select date to">
                        </el-date-picker>
                         
                        <el-button @click="onfilter()" type="primary" size="small" plain>Search</el-button>
                                   <el-button @click="onOpenStoreMode()" type="primary"  size="small" plain >Open Store Mode</el-button>          
                        </div>
                          <el-button @click="onPrint" style="float: right; margin-bottom: 5px; margin-top: -40px;" type="danger">Print PDF</el-button>
                          
                        <download-excel
              class="btn btn-default"
              :data="invReportsExcel"
              worksheet="My Worksheet"
              name="filename.xls"
              style="float: right; margin-bottom: 5px; margin-top: -44px; margin-right: 5px;"
          >
                        <el-button type="success" >Print Excel</el-button>
                        
                        </download-excel>
                    <table class="table table-outline table-hover">
                        <thead>
                            <tr>
                            <th scope="col">Product Name</th>
                            <th scope="col">BEG</th>
                            <th scope="col">Available</th>
                            <th scope="col">END</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in pagedTableData" :key="item.invID">
                            <td>{{item.productName}}</td>
                            <td>{{item.beg_qty}}</td>
                            <td>{{item.available}}</td>
                            <td>{{item.end_qty}}</td>
                            </tr>
                        </tbody>
                        </table>
                          <el-pagination layout="prev, pager, next" :page-size="pageSize" :total="this.inventoryReports.length" @current-change="setPage">
                                    </el-pagination>
            <!-- end table -->
        </el-card>
        <vue-html2pdf
        :show-layout="false"
        :float-layout="true"
        :enable-download="true"
        :preview-modal="true"
        :paginate-elements-by-height="1400"
        filename="InventoryReports"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a4"
        pdf-orientation="landscape"
        pdf-content-width="800px"
 
        @progress="onProgress($event)"
        @hasStartedGeneration="hasStartedGeneration()"
        @hasGenerated="hasGenerated($event)"
        ref="html2Pdf"
    >
        <section slot="pdf-content">
            <!-- PDF Content Here -->
            <center>Generated Product Inventory Reports</center>
            <div style="margin-top: 50px;" class="container">
                <el-card shadow="always">
                    <h3>Product Sales</h3>
                    <table class="table table-hover table-bordered">
                        <thead>
                            <tr>
                            <th scope="col">Product Name</th>
                            <th scope="col">BEG Quantity</th>
                            <th scope="col">Available</th>
                            <th scope="col">END Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in inventoryReports" :key="item.productName">
                            <td>{{item.productName}}</td>
                            <td>{{item.beg_qty}}</td>
                            <td>{{item.available}}</td>
                            <td>{{item.end_qty}}</td>
                            </tr>
                        </tbody>
                        </table>
                </el-card>
            </div>
        </section>
    </vue-html2pdf>

     <!-- open store dialog here -->
     <el-dialog
            title="Product Inventory Reports Data Check"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            
            <div class="container">
                <div v-if="openStoremodeIdentifier != true">
                    <el-alert
                    title="Opening Store Mode"
                    type="error"
                    description="The system detected that you haven't have BEG products, kindly pull products from the stocks on hand"
                    closable="false"
                    style="margin-bottom : 20px;"
                    show-icon>
                </el-alert>
                <center>
                    <el-card shadow="always">
                        <div style="display : flex;">
                            <el-input type="text" v-model="searchableOpenstore" clearable style="margin-right : 10px;" placeholder="Search"></el-input>
                            <el-date-picker
                                            style="  margin-bottom: 5px;"
                                            v-model="dateFiltering"
                                            format="yyyy/MM/dd"
                                            value-format="yyyy/MM/dd"
                                            type="datetime"
                                            placeholder="Select date and time"
                                            @change="onchangeDate">
                                            </el-date-picker> <br>
                        </div>
                    <table class="table table-outline table-hover">
                        <thead>
                            <tr>
                            <th scope="col">Product Name</th>
                            <th scope="col">BEG</th>
                            <th scope="col">Available</th>
                            <th scope="col">END</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in OSpagedTableData" :key="item.invID">
                            <td>{{item.productName}}</td>
                            <td>{{item.beg_qty}}</td>
                            <td>{{item.available}}</td>
                            <td>{{item.end_qty}}</td>
                            </tr>
                        </tbody>
                        </table>
                        <el-pagination layout="prev, pager, next" :page-size="pageSizeOS" :total="this.inventoryReports.length" @current-change="setPageOS">
                                    </el-pagination>
                    </el-card>
                    <el-button @click="goPullProducts" style="width: 100%" type="info" size="medium" plain>Pull Products</el-button>
                </center>
                </div>
                <div v-else>
                    <el-card shadow="always">
                        <div style="display : flex;">
                            <el-input type="text" v-model="searchableOpenstore" clearable style="margin-right : 10px;" placeholder="Search"></el-input>
                            <el-date-picker
                                            style="  margin-bottom: 5px;"
                                            v-model="dateFiltering"
                                            format="yyyy/MM/dd"
                                            value-format="yyyy/MM/dd"
                                            type="datetime"
                                            placeholder="Select date and time"
                                            @change="onchangeDate">
                                            </el-date-picker> <br>
                        </div>
                    <table class="table table-outline table-hover">
                        <thead>
                            <tr>
                            <th scope="col">Product Name</th>
                            <th scope="col">BEG</th>
                            <th scope="col">Available</th>
                            <th scope="col">END</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in OSpagedTableData" :key="item.invID">
                            <td>{{item.productName}}</td>
                            <td>{{item.beg_qty}}</td>
                            <td>{{item.available}}</td>
                            <td>{{item.end_qty}}</td>
                            </tr>
                        </tbody>
                        </table>
                        <el-pagination layout="prev, pager, next" :page-size="pageSizeOS" :total="this.inventoryReports.length" @current-change="setPageOS">
                                    </el-pagination>
                    </el-card>
                </div>
            </div>

            <span slot="footer" class="dialog-footer">
                <div v-if="openStoremodeIdentifier != true">
                      <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="onSendInv()">Send to Inventory Reports</el-button>
                </div>
                <div v-else>
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="onSendInv()">Send to Inventory Reports</el-button>
                </div>
                
            </span>
            </el-dialog>
    </div>
</template>

<script>
import client from "@/store/0AuthRequest"
import JsonExcel from "vue-json-excel";
import VueHtml2pdf from 'vue-html2pdf'
export default {
    components:{
    'download-excel':JsonExcel, 'vue-html2pdf':VueHtml2pdf
  },
  data(){
        return {
            searchable : '', 
            searchableOpenstore: '', 
            dateFiltering : null, 
            pageSizeOS: 5,
            pageOS : 1,
            pageSize: 10, 
            page: 1, 
            inventoryReports: [],
            json_meta: [
            [
              {
                key: "charset",
                value: "utf-8",
              },
            ],
          ],
          invReportsExcel : [],
          filterable: {
              fromdate : '', todate: ''
          },
          dialogVisible: false,
          openStoremodeIdentifier : false,
          inventoryReportsOpenStore: [],
        }
    },
    computed : {
         pagedTableData() {
            if(this.searchable){
            return this.inventoryReports.filter((item)=>{
                return this.searchable.toLowerCase().split(' ').every(v => item.productName.toString().includes(v))
            })
            }else{
                return this.inventoryReports.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
            }
       
        },
         OSpagedTableData() {
            if(this.searchableOpenstore){
            return this.inventoryReports.filter((item)=>{
                return this.searchableOpenstore.toLowerCase().split(' ').every(v => item.productName.toString().includes(v))
            })
            }else{
                return this.inventoryReports.slice(this.pageSizeOS * this.pageOS - this.pageSizeOS, this.pageSizeOS * this.pageOS)
            }
       
        },
    },
    
    created(){
        this.getInventoryReports()
        this.getInventoryReportsOpenStore()
        this.onPrintExcel()
        this.checkOnOpenStore()
    },
    methods : {
        setPage(val){
        this.page = val
    },
    setPageOS(val){
        this.pageOS = val
    },
        onSendInv: function(){
           for(var x = 0; x < this.inventoryReportsOpenStore.length; x++){
            //    console.log(this.inventoryReports[x].end_qty)
            //    console.log(this.inventoryReports[x].refId)
               client.post('/api/inventory-reports/send-product-to-beg?prodname=' + this.inventoryReportsOpenStore[x].productName + '&beg=' + this.inventoryReportsOpenStore[x].end_qty + '&refid=' + this.inventoryReportsOpenStore[x].refId).then(response => {
                   if(response.data === 'success send') {
                       
                            this.dialogVisible = false
                            this.checkOnOpenStore()
      this.getInventoryReportsOpenStore()
                   }
               })
           }
           this.$notify.success({
                            title: 'Success',
                            message: 'Successfully Sent to Inventory Reports',
                            offset: 100
                            });
       },
       onchangeDate: function(){
           client.get('/api/inventory-reports/get-product-per-day?today=' + this.dateFiltering)
           .then(response => {
               this.inventoryReportsOpenStore = response.data
           })
       },
       getInventoryReportsOpenStore: function() {
           client.get('/api/inventory-reports/get-inventory-reports').then(response => {
               this.inventoryReportsOpenStore = response.data
           })
       },
        goPullProducts: function(){
           this.$router.push({name: 'Product Inventory Add'}).catch(() => {})
           this.dialogVisible = false
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
        onOpenStoreMode(){
           this.dialogVisible= true
           this.checkOnOpenStore()
       },
        onPrint: function() {
this.$refs.html2Pdf.generatePdf()
        },
        onfilter: function() {
            client.get(`/api/inventory-reports/filter-inventory-reports?datefrom=${this.filterable.fromdate}&dateto=${this.filterable.todate}`)
            .then((response) => {
                console.log("filter inventory reports", response.data)
                this.inventoryReports = response.data
            })
        },
        getInventoryReports: function() {
           client.get('/api/inventory-reports/get-inventory-reports').then(response => {
               this.inventoryReports = response.data
           })
       },
       onPrintExcel: function(){
           client.get('/api/inventory-reports/get-inventory-reports').then(response => {
               for(var x = 0; x < response.data.length; x++){
               
                this.invReportsExcel.push({
                    PRODUCTNAME: response.data[x].productName,
                    BEG : response.data[x].beg_qty,
                    AVAILABLE : response.data[x].available,
                    END : response.data[x].end_qty
                })
            }
               
           })
           
       }
    },
    
}
</script>