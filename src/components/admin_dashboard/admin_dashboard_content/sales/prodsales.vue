<template>
    <div>
        <div style="margin-top: 30px;" class="container">
                         <el-input
                                    style="margin-bottom: 5px; width: 30%;"
                                    placeholder="Search"
                                    v-model="searchable"
                                    clearable>
                                    </el-input>
          <download-excel
              class="btn btn-default"
              :data="exportProductSales"
              worksheet="My Worksheet"
              name="filename.xls"
              style="width: 100%;"
          >
                                     <el-button @click="onPrint" style="float: right; margin-bottom: 5px; margin-top: 5px;" type="danger">Print PDF</el-button>
          </download-excel>
                <div style="display: inline; float: right; margin-top: 10px; margin-bottom: 20px">
                    <label style="margin-right: 10px;">From : </label>
                        <el-date-picker
                        v-model="filterable.fromdate"
                        format="yyyy/MM/dd"
                        value-format="yyyy/MM/dd"
                        type="date"
                        placeholder="Select date from">
                        </el-date-picker> &nbsp; -->
                         <label style="margin-right: 10px;">To : </label>
                        <el-date-picker
                        style="margin-right: 10px;"
                        v-model="filterable.todate"
                        format="yyyy/MM/dd"
                        value-format="yyyy/MM/dd"
                        type="date"
                        placeholder="Select date to">
                        </el-date-picker>
                        <el-button @click="onfilter()" type="primary" size="small" plain>Search</el-button>
                </div>
            <el-table
                                    :key="0"
                                    v-loading="listLoading"
                                    :data="pagedTableData"
                                    border
                                    fit
                                    highlight-current-row
                                    style="width: 100%;"
                                    
                                    >
                                    <el-table-column label="Sales ID" prop="id" sortable="custom" align="center"  >
                                        <template slot-scope="{row}">
                                        <span>{{ row.salesID }}</span>
                                        </template>
                                    </el-table-column>
                                    
                                    <el-table-column label="Product Image" align="center">
                                        <template slot-scope="{row}">
                                        <img :src="row.salesImage" style="width: 100%; height: auto;" class="img-fluid" alt="No image">
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                    <el-table-column label="Product Name" align="center">
                                        <template slot-scope="{row}">
                                        <span class="link-type" >{{ row.salesName }}</span>
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                     <el-table-column label="Product Quantity" align="center">
                                        <template slot-scope="{row}">
                                        <span class="link-type" >{{ row.salesQuantity }}</span>
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>
 <el-table-column label="Product Category" align="center">
                                        <template slot-scope="{row}">
                                        <span class="link-type" >{{ row.salesCategory }}</span>
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>
<!--                                     

                                    

                                    
                                    <el-table-column label="Status" class-name="status-col" align="center">
                                        <template slot-scope="{row}">
                                        <div v-if="row.salesStatus == '3'">
                                             <el-tag type="success">
                                            Bundle
                                        </el-tag>
                                        </div>
                                        <div v-else-if="row.salesStatus == '2'">
                                                <el-tag type="success">
                                            Solo
                                        </el-tag>
                                        </div>
                                        <div v-else>
                                              <el-tag type="success">
                                            Solo
                                        </el-tag>
                                        </div>
                                        </template>
                                    </el-table-column> -->

                                    
                                    <el-table-column label="Created"  align="center">
                                        <template slot-scope="{row}">
                                        <span>{{ row.salesCreatedAt | moment("dddd, MMMM Do YYYY") }}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column label="More Actions" align="center">
                                        <template slot-scope="{row}">
                                             <el-button @click="onmoreinfo(row.salesID, row.salesName, row.salesPrice, row.salesQuantity, row.salesPaymentID)" type="info" size="small" plain>More info</el-button>
                                        </template>
                                    </el-table-column>
                                    

                                    </el-table>
                                    <el-pagination layout="prev, pager, next" :page-size="pageSize" :total="this.productArray.length" @current-change="setPage">
                                    </el-pagination>
    <el-card style="float: right; margin-top: 10px; margin-bottom: 30px;">
       <h3>Total Sales :  {{salesTodayComputation}}</h3>
    </el-card>
                                    <el-dialog
                                    title="More Sales Information"
                                    :visible.sync="dialogVisible"
                                    width="50%"
                                    :before-close="handleClose">
                                    <el-card style="margin-bottom: 20px;" shadow="always">
                                        <h3>More Information</h3>
                                        <div class="row">
                                            <div class="col-sm">
                                                <span style="margin-bottom: 10px">Sales ID : {{this.moreInfoSales.salesID}}</span><br>
                                                <span style="margin-bottom: 10px">Product name : {{this.moreInfoSales.prodname}}</span>
                                            </div>
                                            <div class="col-sm">
                                                <span style="margin-bottom: 10px">Product Price : {{this.moreInfoSales.salesPrice}}</span><br>
                                                <span style="margin-bottom: 10px">Product QTY : {{this.moreInfoSales.salesQty}}</span>
                                            </div>
                                        </div>
                                    </el-card>
                                    <span slot="footer" class="dialog-footer">
                                        <el-button @click="dialogVisible = false">Close</el-button>
                                    </span>
                                    </el-dialog>
                                    <!-- PDF SHT -->
    <vue-html2pdf
        :show-layout="false"
        :float-layout="true"
        :enable-download="true"
        :preview-modal="true"
        :paginate-elements-by-height="1400"
        filename="hee hee"
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
            <center>Generated Product Sales</center>
            <div style="margin-top: 50px;" class="container">
                <el-card shadow="always">
                    <h3>Product Sales</h3>
                    <table class="table table-hover table-bordered">
                        <thead>
                            <tr>
                            <th scope="col">Sales ID</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Product Quantity</th>
                            <th scope="col">Product Price</th>
                            <th scope="col">Product Category</th>
                            <th scope="col">Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in productArray" :key="item.salesID">
                            <th scope="row">{{item.salesID}}</th>
                            <td>{{item.salesName}}</td>
                            <td>{{item.salesQuantity}}</td>
                             <td>{{item.salesPrice}}</td>
                            <td>{{item.salesCategory}}</td>
                            <td>{{item.salesCreatedAt | moment("dddd, MMMM Do YYYY")}}</td>
                            </tr>
                        </tbody>
                        </table>
                        <el-card style="float: right; margin-top: 10px; margin-bottom: 20px;">
                            <h3>Total Sales : {{salesTodayComputation}}</h3>
                        </el-card>
                </el-card>
            </div>
        </section>
    </vue-html2pdf>
                                    <!-- PDF END SHT -->
        </div>
    </div>
</template>

<script>
import client from '@/store/0AuthRequest'
import moment from 'moment'
import JsonExcel from "vue-json-excel";
import {mapGetters} from 'vuex'
import VueHtml2pdf from 'vue-html2pdf'
export default {
  components:{
    'download-excel':JsonExcel, 'vue-html2pdf':VueHtml2pdf
  },
    data() {
        return{
             pageSize: 5,
              page: 1,
              productArray: [],
              exportProductSales: [],
              searchable: '',
              listLoading: false,
              dialogVisible: false,
              moreInfoSales : {
                  salesID : '',
                  prodname: '',
                  salesPrice: '',
                  salesQty : ''
              },
              customerInformation: {
                  amount: '',
                  customerName: '',
                  customerNumber: '',
                  totalPrice: ''
              },
              filterable : {
                  fromdate : '', todate: ''
              },
          json_meta: [
            [
              {
                key: "charset",
                value: "utf-8",
              },
            ],
          ],
        }
    },
    computed: {
         pagedTableData() {
       if(this.searchable){
      return this.productArray.filter((item)=>{
        return this.searchable.toLowerCase().split(' ').every(v => item.salesName.toLowerCase().includes(v) || item.salesID.toString().toLowerCase().includes(v))
      })
      }else{
        return this.productArray.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
      }
       
     },
     ...mapGetters({
         getsalesreport : 'get_sales_report'
        }),
        salesTodayComputation(){
            return this.productArray.reduce((acc, item) => acc + item.salesTotal, 0)
        }
    },
    created(){
        this.getAllSales();
        this.exportSales();
    },
    methods:{
        onPrint: function() {
this.$refs.html2Pdf.generatePdf()
        },
        onfilter(){
            client.get(`/api/product-sales/filter-sales?datefrom=${this.filterable.fromdate}&dateto=${this.filterable.todate}`)
            .then((r) => {
                
                    this.productArray = []
                for(var x = 0; x => r.data.length; x++){
                    let salesArray = []
                    salesArray = JSON.parse(r.data[x].salesInfo)
                    this.productArray.push({
                        salesCreatedAt: salesArray.createdAt,
                        salesBarcode: salesArray.orderBarcode,
                        salesCategory: salesArray.orderCategory,
                        salesCode : salesArray.orderCode,
                        salesID : salesArray.orderID,
                        salesImage: salesArray.orderImage,
                        salesName : salesArray.orderName,
                        salesPrice : salesArray.orderPrice,
                        salesQuantity : salesArray.orderQuantity,
                        salesTotal : salesArray.orderTotalPrice,
                    })
                }
            })
        },
        setPage(val){
            this.page = val
        },
        getAllSales: function(){
            this.$store.dispatch(`actions_get_sales`).then(() => {
                
                for(var x = 0; x => this.getsalesreport.length; x++){
                    let salesArray = []
                    salesArray = JSON.parse(this.getsalesreport[x].salesInfo)
                    this.productArray.push({
                        salesCreatedAt: this.getsalesreport[x].createdAt,
                        salesBarcode: salesArray.orderBarcode,
                        salesCategory: salesArray.orderCategory,
                        salesCode : salesArray.orderCode,
                        salesID : salesArray.orderID,
                        salesImage: salesArray.orderImage,
                        salesName : salesArray.orderName,
                        salesPrice : salesArray.orderPrice,
                        salesQuantity : salesArray.orderQuantity,
                        salesTotal : salesArray.orderTotalPrice,
                    })
                }
            })
        },
        onmoreinfo: function(id, prodname, price, qty, paymentid){
            this.dialogVisible = true
            this.moreInfoSales.salesID = id
            this.moreInfoSales.prodname = prodname
            this.moreInfoSales.salesPrice = price
            this.moreInfoSales.salesQty = qty
            const req = client.get(`/api/product-sales/get-customer-json/${paymentid}`)
            return req.then(({ data }) => {
                for(var x = 0; x < data.length; x++){
                    let customerArray = []
                    customerArray = JSON.parse(data[x].paymentInfo)
                    this.customerInformation.amount = customerArray.amount
                    this.customerInformation.customerName = customerArray.customerName
                    this.customerInformation.customerNumber = customerArray.customerNumber
                    this.customerInformation.totalPrice = customerArray.totalPrice
                }
            })
        },
        exportSales: function(){
            this.$store.dispatch(`actions_get_sales`).then(() => {
                console.log("SALES REPORT",this.getsalesreport)
                for(var x = 0; x < this.getsalesreport.length; x++){
                    let salesHandler = []
                    salesHandler = JSON.parse(this.getsalesreport[x].salesInfo)
                    this.exportProductSales.push({
                        MENU : salesHandler[0].orderName,
                        PRICE : salesHandler[0].orderPrice,
                        SALES : salesHandler[0].orderQuantity,
                        SALES_AMOUNT : ( salesHandler[0].orderPrice * salesHandler[0].orderQuantity)
                    })
                }
                this.exportProductSales.push({
                    MENU : "TOTAL SALES"
                }),
                this.exportProductSales.push({
                    MENU : "TOTAL SALES PER ORDER"
                }),
                this.exportProductSales.push({
                    MENU : "ACTUAL CASH TURN IN"
                }),
                this.exportProductSales.push({
                    MENU : "ACTUAL SALES"
                }),
                this.exportProductSales.push({
                    MENU : "VARIANCE"
                }),
                this.exportProductSales.push({
                    MENU : "EMPLOYEE CHARGED ORDERS"
                }),
                this.exportProductSales.push({
                    MENU : "CASH ADVANCES"
                }),
                this.exportProductSales.push({
                    MENU : "ICE/OTHER EXPENSES"
                }),
                this.exportProductSales.push({
                    MENU : "SENIOR DISCOUNT"
                }),
                this.exportProductSales.push({
                    MENU : "SHORT/OVER"
                }),
                this.exportProductSales.push({
                    MENU : "FOOD PANDA DELIVER"
                }),
                this.exportProductSales.push({
                    MENU : "FOOD PANDA PICK UP"
                })
            })
        },
    }
}
</script>