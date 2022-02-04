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
                                        <span class="link-type" >{{ row.orderPrice }}</span>
                                        </sequential-entrance>
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                     <el-table-column label="Order Quantity" align="center">
                                        <template slot-scope="{row}">
                                            <sequential-entrance fromRight delay="2000">
                                        <span class="link-type" >{{ row.orderQuantity }}</span>
                                         </sequential-entrance>
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                    

                                     <el-table-column label="More actions" align="center">
                                        <template slot-scope="{row}">
                                        <sequential-entrance fromRight delay="2000">
                                        <el-button type="danger"
                                        @click="voidItem(row.orderBarcode, row.orderQuantity, row.orderID)">Void</el-button>
                                        </sequential-entrance>
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                    

                                    

                                    
                                    <!-- <el-table-column label="Status" class-name="status-col" align="center">
                                        <template slot-scope="{row}">
                                        <div v-if="row.product_status == 1">
                                            <el-tag type="success">
                                            Active
                                        </el-tag>
                                        </div>
                                        <div v-else>
                                                <el-tag type="warning">
                                            Inactive
                                        </el-tag>
                                        </div>
                                        </template>
                                    </el-table-column> -->

                                    
                                    <!-- <el-table-column label="Created"  align="center">
                                        <template slot-scope="{row}">
                                        <span>{{ row.createdAt }}</span>
                                        </template>
                                    </el-table-column> -->

                                    <!-- <el-table-column label="More Actions" align="center">
                                        <template slot-scope="{row}">
                                        <div v-if="row.product_status == 1">
                                           <el-button @click="ondeactivate(row.productID)" type="danger" style="width: 100%;" size="medium">
                                                   Deactivate
                                               </el-button>
                                        </div>
                                        <div v-else>
                                               <el-button @click="onactivate(row.productID)" type="success" style="width: 100%;" size="medium">
                                                   Activate
                                               </el-button>
                                        </div>
                                        </template>
                                    </el-table-column> -->
                                    

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

                                                            </div>
                                                    <!-- end receipt -->
                                   
    </div>
</template>

<script>
import {mapGetters} from "vuex"
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
        totalDiscount: Number
    },
    data(){
        return {
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
        receiptDrawer: false
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
    created(){
        this.computeTotalDiscount();
    },
    mounted(){
        console.log("on mount", this.getTotalPrice)
        this.onfailpayment = true
    },
    methods: {
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
        computeTotalDiscount: function(){
            const discount = 0.2
            this.totalDiscount =  this.getTotalPrice + (this.getTotalPrice + ( this.getTotalPrice * discount))
        }
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
