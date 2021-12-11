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
              :data="productArray"
              worksheet="My Worksheet"
              name="filename.xls"
              style="width: 100%;"
          >
                                     <el-button style="float: right; margin-bottom: 5px; margin-top: 5px;" type="warning" plain>Print excel</el-button>
          </download-excel>
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
                                    </el-table-column>

                                    
                                    <el-table-column label="Created"  align="center">
                                        <template slot-scope="{row}">
                                        <span>{{ row.salesCreatedAt | moment("calendar") }}</span>
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
                                    <el-card shadow="always">
                                        <h3>Customer Information</h3>
                                        <div class="row">
                                            <div class="col-sm">
                                                <span style="margin-bottom: 10px">Customer Name : {{this.customerInformation.customerName}}</span><br>
                                                <span style="margin-bottom: 10px">Customer Number : {{this.customerInformation.customerNumber}}</span>
                                            </div>
                                            <div class="col-sm">
                                                <span style="margin-bottom: 10px">Amount Paid : {{this.customerInformation.amount}}</span><br>
                                                <span style="margin-bottom: 10px">Total Price : {{this.customerInformation.totalPrice}}</span>
                                            </div>
                                        </div>
                                    </el-card>
                                    <span slot="footer" class="dialog-footer">
                                        <el-button @click="dialogVisible = false">Close</el-button>
                                    </span>
                                    </el-dialog>
        </div>
    </div>
</template>

<script>
import client from '@/store/0AuthRequest'
import JsonExcel from "vue-json-excel";
export default {
  components:{
    'download-excel':JsonExcel
  },
    data() {
        return{
             pageSize: 5,
              page: 1,
              productArray: [],
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
    },
    created(){
        this.getAllSales()
    },
    methods:{
        getAllSales: function(){
            this.$store.dispatch(`actions_get_sales`).then(() => {
                for(var x = 0; x < this.$store.state.productSales.salesArray.length; x++){
                    let salesHandler = []
                    salesHandler = JSON.parse(this.$store.state.productSales.salesArray[x].orderInfo)
                    this.productArray.push({
                        salesCreatedAt: salesHandler[0].createdAt,
                        salesBarcode: salesHandler[0].orderBarcode,
                        salesCategory: salesHandler[0].orderCategory,
                        salesCode : salesHandler[0].orderCode,
                        salesID : salesHandler[0].orderID,
                        salesImage: salesHandler[0].orderImage,
                        salesName : salesHandler[0].orderName,
                        salesPrice : salesHandler[0].orderPrice,
                        salesQuantity : salesHandler[0].orderQuantity,
                        salesTotal : salesHandler[0].orderTotalPrice,
                        salesStatus : this.$store.state.productSales.salesArray[x].paymentStatus,
                        salesPaymentID: this.$store.state.productSales.salesArray[x].paymentID
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
        }
    }
}
</script>