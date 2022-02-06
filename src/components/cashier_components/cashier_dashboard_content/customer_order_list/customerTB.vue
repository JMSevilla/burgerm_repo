<template>
    <div>
                                    <vs-input icon="search" placeholder="Search" v-model="searchable"/>
                                    <el-table
                                    :key="0"
                                    v-loading="lazyload"
                                    :data="pagedTableData"
                                    border
                                    fit
                                    highlight-current-row
                                    style="width: 100%;"
                                    
                                    >
                                    <!-- <el-table-column label="Order Code" prop="id" sortable="custom" align="center"  >
                                        <template slot-scope="{row}">
                                        <span>{{ row.orderCode }}</span>
                                        </template>
                                    </el-table-column> -->
                                    
                                 
                                        
                                    <el-table-column label="Order Name" align="center">
                                        
                                        <template slot-scope="{row}">
                                            <sequential-entrance fromRight delay="2000">
                                                <span class="link-type" >{{ row.orderName }}</span>
                                        </sequential-entrance>
                                        
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                    <el-table-column label="Order Price" align="center">
                                        <template slot-scope="{row}">
                                            <sequential-entrance fromRight delay="2000">
                                        <span class="link-type" > &#8369;{{ row.orderPrice }}</span>
                                        </sequential-entrance>
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                    <el-table-column label="Order Status" align="center">
                                        <template slot-scope="{row}">
                                            <div v-if="row.orderStatus === '1'">
                                                <el-tag
                                                type="success"
                                                size="mini"
                                                effect="dark"
                                                >B1T1</el-tag>
                                            </div>
                                            <div v-else-if="row.orderStatus === '2'">
                                                <el-tag
                                                type="success"
                                                size="mini"
                                                effect="dark"
                                                >Solo</el-tag>
                                            </div>
                                            <div v-else>
                                                 <el-tag
                                                type="success"
                                                size="mini"
                                                effect="dark"
                                                >Box of 6</el-tag>
                                            </div>
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                     <el-table-column label="Order QTY" width="50" align="center">
                                        <template slot-scope="{row}">
                                            <sequential-entrance fromRight delay="2000">
                                        <span class="link-type" >{{ row.orderQuantity }}</span>
                                         </sequential-entrance>
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                   

                                     <el-table-column label="More actions"  width="300" align="center">
                                        <template slot-scope="{row}">
                                        <sequential-entrance fromRight delay="2000">
                                            <div style="display: flex;">
                                                <div v-if="row.discountIsApplied === '1'">
                                                    <el-button @click="oncancelDiscount(row.orderID, row.orderBarcode)" type="danger" size="mini">Cancel Discount</el-button>
                                        <el-button type="success" size="mini"
                                        @click="onaddqty(row.orderID)">+ Qty</el-button>
                                                 <el-button type="danger" size="mini"
                                        @click="voidItem(row.orderBarcode, row.orderQuantity, row.orderID)">Void</el-button>
                                                </div>
                                                <div v-else>
                                                    <el-button type="warning" size="mini"
                                        @click="addDiscountItem(row.orderPrice, row.orderID, row.orderBarcode)">+ Discount</el-button>
                                        <el-button type="success" size="mini"
                                        @click="onaddqty(row.orderID)">+ Qty</el-button>
                                                 <el-button type="danger" size="mini"
                                        @click="voidItem(row.orderBarcode, row.orderQuantity, row.orderID)">Void</el-button>
                                                </div>
                                            </div>
                                        </sequential-entrance>
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                    </el-table>
                                    <el-pagination layout="prev, pager, next" :page-size="pageSize" :total="this.passCustomerArray.length" @current-change="setPage">
                                    </el-pagination>
                                    <div style="margin-top: 10px; margin-bottom: 10px;" class="row">
                                        <div class="col-sm"></div>
                                        <div class="col-sm">
                                        <el-card>
                                        <h3 style="margin-bottom : 20px;">Total Discount : &#8369; {{totalDiscount}}</h3>
                                        </el-card>
                                        </div>
                                        <div class="col-sm">
                                        <el-card shadow="always">
                                            <h3 style="margin-bottom : 20px;">Total Price : &#8369;{{getTotalPrice}}</h3>
                                        </el-card>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="row">
                                        <el-card style="padding: 30px;" shadow="always">
                                                <div style="margin-bottom : 20px;">
                                                    <h3>Transaction Actions</h3>
                                                    <hr>
                                                </div>
                                              <div style="margin-bottom: 20px;">
                                                  <center>
                                                   <div class="row">
                                                       <div class="col-sm">
                                                           <el-button style="width: 100%;" @click="pay" size="small" type="primary" >
                                                       <i class="el-icon-money"></i> Make payment [F1]
                                                   </el-button>
                                                       </div>
                                                       <div class="col-sm">
                                                           <el-badge :value="countready" style="width: 100%;"  class="item">
                                                    <el-button size="small" @click="onready" style="width: 100%;" :disabled="onreadypay" type="success" >
                                                       <i class="el-icon-check"></i> Ready [F2]
                                                   </el-button>
                                                    </el-badge>
                                                       </div>
                                                   </div>
                                                     
                                                   
                                                   
                                                
                                              </center>
                                              </div>
                                             </el-card>
                                        <el-drawer
                                            title="I am the title"
                                            :visible.sync="getState_Drawer"
                                            :with-header="false" size="30%">
                                                <div style="margin-top: 100px;" class="container">
                                                    <div class="container">
                                                        <div class="row">
                                                                <div class="col-sm">
                                                                    <h3>Payment Mode</h3>
                                                                </div>
                                                                <div class="col-sm">
                                                                    <el-button
                                                                    type="danger"
                                                                    size="small"
                                                                    style="float: right;"
                                                                    @click="onpaymentclose"
                                                                    >Close</el-button>
                                                                </div>
                                                            </div>
                                                        <hr>
                                                        <div v-show="validatePayment">
                                                            <el-alert
                                                            title="Ready Payment"
                                                            type="error"
                                                            :closable="false"
                                                            description="Please finish the existing ready payment before making new one."
                                                            show-icon>
                                                        </el-alert>
                                                        </div>
                                                        <el-card shadow="always" style="margin-bottom: 30px;margin-top: 30px;">
                                                            <h4>Transaction Details</h4>
                                                            <hr>
                                                            <div style="margin-top: 30px;" class="row">
                                                                <div class="col-sm">
                                                                    <img 
                                                                    src="https://cdn.dribbble.com/users/992274/screenshots/15336814/media/c8ae8e3b3040f03d7e65676b7abe185c.jpg?compress=1&resize=1200x900" 
                                                                    alt="no image"
                                                                    style="width: 100%; height: auto;"
                                                                    class="img-fluid">
                                                                </div>
                                                                <div class="col-sm">
                                                                    <el-card shadow="always">
                                                                        <h2 style="margin-bottom: 10px;">Total Price : &#8369;{{getTotalPrice}}</h2>
                                                                    <h2 style="margin-bottom: 10px;">Discount Applied : 0%</h2>
                                                                    <div v-if="paymentObj.amount == null || paymentObj.amount == ''">
                                                                        <h4 style="margin-bottom: 10px;">Amount : &#8369; 0</h4>
                                                                    </div>
                                                                    <div v-else>
                                                                        <h4 style="margin-bottom: 10px;">Amount : &#8369;{{paymentObj.amount}}</h4>
                                                                    </div>
                                                                    <div v-if="paymentObj.amount == null || paymentObj.amount == ''">
                                                                        <h4 style="margin-bottom: 10px;">Change : &#8369; 0</h4>
                                                                    </div>
                                                                    <div v-else>
                                                                        <h4 style="margin-bottom: 10px;">Change : &#8369;{{paymentObj.amount - getTotalPrice}}</h4>
                                                                    </div>
                                                                    
                                                                    <div style="display: inline;">
                                                                     <div v-if="getTotalPrice > paymentObj.amount">
                                                                         <el-tag style="margin-bottom: 10px;" type="error" size="small">Payment Status: Fail</el-tag>
                                                                     </div>
                                                                     <div v-else>
                                                                         <el-tag style="margin-bottom: 10px;" type="success" size="small">Payment Status: No issue</el-tag>
                                                                     </div>
                                                                    </div>
                                                                    </el-card>
                                                                </div>
                                                            </div>
                                                        </el-card>
                                                        <el-card shadow="always" style="margin-top: 30px;">
                                                            <div class="row">
                                                                <div class="col-sm">
                                                                    <h4>Customer Information</h4>
                                                                </div>
                                                                <div class="col-sm">
                                                                    <el-link style="float: right;" type="primary">Hook existing customer</el-link>
                                                                </div>
                                                            </div>
                                                            <hr>
                                                            <div class="row" style="margin-bottom: 20px;">
                                                                <div class="col-sm">
                                                                    <el-input
                                                                type="text"
                                                                clearable
                                                                placeholder="Enter customer name"
                                                                style="margin-top: 10px; margin-bottom: 10px;"
                                                                v-model="paymentObj.customerName"
                                                                ></el-input>
                                                                </div>
                                                                <div class="col-sm">
                                                                    <el-input
                                                                type="text"
                                                                clearable
                                                                placeholder="Enter mobile number"
                                                                style="margin-top: 10px; margin-bottom: 10px;"
                                                                v-model="paymentObj.customerNumber"
                                                                ></el-input>
                                                                </div>
                                                            </div>
                                                             <h4>Payment Information</h4>
                                                            <hr>
                                                            <div class="row">
                                                                <div class="col-sm">
                                                                    <el-input
                                                                type="text"
                                                                clearable
                                                                placeholder="Enter amount"
                                                                style="margin-top: 10px; margin-bottom: 10px;"
                                                                v-model="paymentObj.amount"
                                                                @input.native="onamountchange"
                                                                ></el-input>
                                                                </div>
                                                                <div class="col-sm">
                                                                    <el-select style="margin-top: 10px; width: 100%; margin-bottom: 10px;"
                                                                     v-model="paymentObj.discount" filterable placeholder="Select discount">
                                                                        <el-option
                                                                        v-for="item in discount"
                                                                        :key="item.value"
                                                                        :label="item.label"
                                                                        :value="item.value">
                                                                        </el-option>
                                                                    </el-select>
                                                                </div>
                                                            </div>
                                                            <el-button
                                                            type="primary"
                                                            size="medium"
                                                            style="float: right; margin-top: 10px; margin-bottom: 10px;"
                                                            @click="onpay"
                                                            :disabled="onfailpayment"
                                                            >Pay</el-button>
                                                        </el-card>
                                                    </div>
                                                </div>
                                            </el-drawer>
                                            
                                    </div>
                                    <el-dialog title="All ready transactions" :visible.sync="readyDialogVisible">
                                                <div style="margin-top: 30px;" class="container">
                                                    <el-badge :value="countready" style="width: 20%;"  class="item">
                                                    <h3>Payment Transactions</h3>
                                                    </el-badge>
                                                    <!-- <div v-for="t in longRangeArraysOrders" :key="t.orderID">
                                                        {{t.paymentinfo.orderBarcode}} {{t.orderName}} {{t.paymentapprvl.paymentID}}
                                                    </div> -->
                                                    <hr>
                                                    <el-card shadow="always">
                                                        <el-table
                                                                :data="paymentapprvl"
                                                                style="width: 100%">
                                                                <el-table-column type="expand">
                                                                <template>
                                                                    
                                                                   <div v-for="(item) in DataMappingOrderViewing" :key="item.orderviewing.orderID">
                                                                        <el-card  style="margin-bottom: 20px;" shadow="always">
                                                                        <div class="row">
                                                                            <div class="col-sm">
                                                                                <el-avatar shape="square" :size="100" fit="fill" :src="item.orderviewing.orderImage"></el-avatar>
                                                                            </div>
                                                                            <div class="col-sm">
                                                                                <span>Product Name : {{item.orderviewing.orderName}}</span><br><br>
                                                                                <span>QTY : {{item.orderviewing.orderQuantity}}</span>
                                                                            </div>
                                                                             <div class="col-sm">
                                                                                <span>Price :  &#8369;{{item.orderviewing.orderPrice}}</span><br><br>
                                                                                <span>Category : {{item.orderviewing.orderCategory}}</span>
                                                                            </div>
                                                                        </div>
                                                                    </el-card>
                                                                   </div>
                                                                </template>
                                                                </el-table-column>
                                                                <el-table-column
                                                                label="Payment ID">
                                                                <template>
                                                                    <div v-for="(t) in longRangeArraysOrders" :key="t.paymentapprvl.paymentID">
                                                                        <span>{{t.paymentapprvl.paymentID}}</span>
                                                                    </div>
                                                                </template>
                                                                </el-table-column>
                                                                <el-table-column
                                                                label="Customer Name">
                                                                <template>
                                                                    <div v-for="(t) in longRangeArraysOrders" :key="t.paymentinfo.orderID">
                                                                        <span>{{t.paymentinfo.orderName}}</span>
                                                                    </div>
                                                                </template>
                                                                </el-table-column>
                                                                <el-table-column
                                                                label="Payment Status">
                                                                <template>
                                                                    <div v-for="(t) in longRangeArraysOrders" :key="t.paymentapprvl.paymentID">
                                                                        <div  v-if="t.paymentapprvl.paymentStatus == '1'">
                                                                        <el-tag type="success" size="small" effect="dark">OK</el-tag>
                                                                    </div>
                                                                    <div v-else>
                                                                        <el-tag type="danger" size="small" effect="dark">Fail</el-tag>
                                                                    </div>
                                                                    </div>
                                                                </template>
                                                                </el-table-column>
                                                                 <el-table-column
                                                                label="More Actions">
                                                                     <div v-for="(t) in longRangeArraysOrders" :key="t.paymentinfo.orderID">
                                                                         <el-link type="primary" @click="onconfirmpayment(t.paymentapprvl.paymentID)">View receipt</el-link>
                                                                      <!-- <el-link @click="onfail()" type="primary">Decline</el-link> -->
                                                                     </div>
                                                                </el-table-column>
                                                            </el-table>
                                                    </el-card>
                                                </div>
                                            </el-dialog>
                                            <!-- adding qty -->
                                            <el-dialog
                                                                            title="Tips"
                                                                            :visible.sync="addqtydialogvisible"
                                                                            width="30%"
                                                                            :before-close="handleCloseaddqty">
                                                                            <div class="container">
                                                                                <span>Enter Quantity</span>
                                                                                <el-input
                                                                                type="text"
                                                                                clearable
                                                                                placeholder="Enter quantity"
                                                                                v-model="updateQtyTask.addingQty"
                                                                                style="margin-top: 10px; margin-bottom : 10px;"
                                                                                ></el-input>
                                                                            </div>
                                                                            <span slot="footer" class="dialog-footer">
                                                                                <el-button @click="addqtydialogvisible = false">Cancel</el-button>
                                                                                <el-button type="primary" @click="onconfirmaddqty">Confirm</el-button>
                                                                            </span>
                                                                            </el-dialog> 
                                                    <!-- Receipt Printing -->
     <div style="display: none;" id="printMe">
                                                               
                   <div v-for="(t) in longRangeArraysOrders" :key="t.paymentinfo.orderID">
                       <div id="invoice-POSS">
    
    <div class="logo"></div>
      <div class="info"> 
        <h2>Burger Mania</h2>
      </div><!--End Info-->
      <hr>
    <div id="mid">
      <div class="info">
        <h2>Contact Info</h2>
        <p> 
            Customer Name   : {{t.paymentinfo.customerName}}<br>
            Phone   : {{t.paymentinfo.customerNumber}}<br>
        </p>
      </div>
    </div><!--End Invoice Mid-->
    
    <div id="bot">

					<div id="table">
						<table>
							<tr class="tabletitle">
								<td class="item" ><h2 style="margin-right: 30px;">Item</h2></td>
								<td class="Hours"><h2 style="margin-right: 30px;">Qty</h2></td>
								<td class="Rate"><h2 style="margin-right: 30px;">SubTotal</h2></td>
							</tr>

							<tr v-for="(y) in DataMappingOrderViewing" :key="y.orderviewing.orderID" class="service">
								<td class="tableitem"><p class="itemtext">{{y.orderviewing.orderName}}</p></td>
								<td class="tableitem"><p class="itemtext">{{y.orderviewing.orderQuantity}}</p></td>
								<td class="tableitem"><p class="itemtext"> &#8369;{{y.orderviewing.orderPrice}}</p></td>
							</tr>

							<tr class="tabletitle">
								<td></td>
								<td class="Rate"><h2>Total</h2></td>
								<td class="payment"><h2>&#8369;{{receiptTotalPrice}}</h2></td>
							</tr>

						</table>
					</div><!--End Table-->

					<div id="legalcopy">
						<p class="legal"><strong>Thank you for Ordering!</strong>  Please keep this receipt thank you !. 
						</p>
					</div>

				</div><!--End InvoiceBot-->
  </div><!--End Invoice-->
                                                                     </div>    
                                                                       <!-- add qty  -->
                                                                     

                                                            </div>
                                                    <!-- end receipt -->
                                   
    </div>
</template>

<script>
import {mapGetters} from "vuex"
import client from "@/store/0AuthRequest"
export default {
    props: {
        passCustomerArray: Array,
        lazyload: Boolean,
        prodTotalPrice: Number,
        pay: Function,
        discount: Array,
        voidItem: Function,
        paymentObj: Object,
        onpay: Function,
        countready: Number,
        onreadypay: Boolean,
        paymentinf: Array,
        paymentapprvl: Array,
        onconfirmpayment: Function,
        handleClose: Function,
        onpayerror: Boolean,
        savedSubPayment: Array,
        OrderInformation: Array,
        totalDiscount: Number,
        fetchingCustomers: Function
    },
    data(){
        return {
            discountIsHide : false,
            readyDialogVisible: false,
              tableData: [],
             pageSize: 5,
              page: 1,
              searchable:'',
                activities: [{
          content: 'Event start',
          timestamp: '2018-04-15'
        }, {
          content: 'Approved',
          timestamp: '2018-04-13'
        }],
        onfailpayment: false,
        receiptDrawer: false, addqtydialogvisible : false, updateQtyTask: { addingQty : '', addingID: ''}
        }
    },
    computed: {
        pagedTableData(){
            if(this.searchable){
      return this.passCustomerArray.filter((item)=>{
        return this.searchable.toLowerCase().split(' ').every(v => item.orderName.toString().toLowerCase().includes(v))
      })
      }else{
        return this.passCustomerArray.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
      }
        },
        ...mapGetters({
            getTotalPrice: 'getTotalPrice',
            getState_Drawer: 'getState_Drawer'
        }),
        longRangeArraysOrders (){
            return this.paymentapprvl.map((payment, i) => {
                return { 
                    paymentapprvl : payment,
                    paymentinfo: this.paymentinf[i]
                }
            })
        },
        validatePayment(){
            return this.onpayerror
        },
        receiptTotalPrice(){
            return localStorage.getItem("itemtotal")
        },
        DataMappingOrderViewing(){
            return this.OrderInformation.map((py) => {
                return {
                    orderviewing: py
                }
            })
        }
    },
    mounted(){
        console.log("on mount", this.getTotalPrice)
        this.onfailpayment = true
        this.fetchingCustomers()
    },
    methods: {
        onconfirmaddqty: function(){
            client.put('/api/orders/update-qty-cart?id=' + this.updateQtyTask.addingID + '&qty=' + this.updateQtyTask.addingQty).then(response => {
                console.log(response.data)
                if(response.data === "success update qty"){
                    this.$notify.success({
                            title : 'Success',
                            message : 'Successfully Added Quantity',
                            offset: 100
                        })
                        this.fetchingCustomers()
                }
            })
        },
        onaddqty(id){
            this.addqtydialogvisible = true
            this.updateQtyTask.addingID = id
        },
        handleCloseaddqty(done) {
        this.$confirm('Are you sure to close this dialog?')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
        oncancelDiscount(id, barcode) {
            this.$confirm('Are you sure you want to cancel this discount ? ', 'Warning', {
            confirmButtonText : 'OK',
            cancelButtonText : 'Cancel',
            type : 'warning'
        }).then(() => {
            client.put('/api/orders/cancel-discount?id=' + id + '&barcode=' + barcode).then(response => {
                console.log("cancellation of discount", response.data)
                if(response.data === "success cancellation"){
                     this.$notify.success({
                            title : 'Success',
                            message : 'Discount Successfully Applied',
                            offset: 100
                        })
                        this.fetchingCustomers()
                }
            })
        })
        },
        addDiscountItem: function(price, id, barcode) {
        this.$confirm('Are you sure you want to apply this discount ? ', 'Warning', {
            confirmButtonText : 'OK',
            cancelButtonText : 'Cancel',
            type : 'warning'
        }).then(() => {
            client.get('/api/orders/check-update-discount').then(resp => {
                if(resp.data === "exist discount"){
                    this.$notify.warning({
                            title : 'Warning',
                            message : 'Discount Already Applied',
                            offset: 100
                        })
                        return false
                }else{
                    const discount = 0.20;
                        const decimal = Number(null);
                        const newValue = decimal + (price - (price * discount));
                    //    const val = parseInt(this.$store.state.customerTotalPrice) + parseInt(this.getTotalPrice)
            client.get('/api/orders/get-prod-finalization-price?barcode=' + barcode ).then(res => {
                client.put('/api/orders/update-discount?id=' + id + '&newAmount=' + newValue).then(r => {

                    if(r.data === "success discount") {
                        this.$notify.success({
                            title : 'Success',
                            message : 'Discount Successfully Applied',
                            offset: 100
                        })
                        this.fetchingCustomers()

                    } else {
                        this.$notify.warning({
                            title : 'Warning',
                            message : 'Discount Already Applied',
                            offset: 100
                        })
                        return false
                    }
                })
            })
                }
            })
            
        })
        },
        onfail: function(){
            this.receiptDrawer = true
        },
        onready : function(){
            this.readyDialogVisible = true
        },
        onamountchange(event){
            if(!event.target.value){
                this.onfailpayment = true
            } else if(this.getTotalPrice > event.target.value){
                this.onfailpayment = true
            }else{
                this.onfailpayment = false
            }
        },
        setPage(val){
            this.page = val
        },
        onpaymentclose: function(){
            this.$store.state.stateDrawer = false
            this.paymentObj.amount = null;
        },
    }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  background-color: none;
  transition: all 2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  background-color: yellow;
}

</style>
