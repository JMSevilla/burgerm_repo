<template>
    <div>
                                    <vs-input style="width: 45%;" icon="search" placeholder="Search" v-model="searchable"/><br>
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

                                   

                                     <el-table-column label="More actions"  width="200" align="center">
                                        <template slot-scope="{row}">
                                        <sequential-entrance fromRight delay="2000">
                                            
                                         <div style="display: flex;">
                                             <el-button type="success" size="mini"
                                        @click="onaddqty(row.orderID, row.indicator, row.orderBarcode)">+ Qty</el-button>
                                                <el-button type="danger" size="mini"
                                        @click="voidItem(row.orderBarcode, row.orderQuantity, row.orderID, row.indicator)">Void</el-button>
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
                                        <!-- <el-card>
                                        <h3 style="margin-bottom : 20px;">Total Discount : &#8369; {{totalDiscount}}</h3>
                                        </el-card> -->
                                        </div>
                                        <div class="col-sm">
                                        <el-card shadow="always">
                                            <h3 style="margin-bottom : 20px;">Total Price : &#8369;{{cartTotalPrice}}</h3>
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
                                                       <i class="el-icon-money"></i> Make payment 
                                                   </el-button>
                                                       </div>
                                                       <div class="col-sm">
                                                           <el-button size="small" @click="onready" style="width: 100%;" :disabled="onreadypay" type="success" >
                                                       <i class="el-icon-check"></i> Ready to Serve
                                                   </el-button>
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
                                                                        <h2 style="margin-bottom: 10px;">Total Price : &#8369;{{cartTotalPrice}}</h2>
                                                                    <!-- <h2 style="margin-bottom: 10px;">Discount Applied : 0%</h2> -->
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
                                                                        <h4 style="margin-bottom: 10px;">Change : &#8369;{{paymentObj.amount - cartTotalPrice}}</h4>
                                                                    </div>
                                                                    
                                                                    <div style="display: inline;">
                                                                     <div v-if="cartTotalPrice > paymentObj.amount">
                                                                         <el-tag style="margin-bottom: 10px;" type="error" size="small">Payment Status: Fail</el-tag>
                                                                     </div>
                                                                     <div v-else>
                                                                         <el-tag style="margin-bottom: 10px;" type="success" size="small">Payment Status: No issue</el-tag>
                                                                     </div>
                                                                    </div>
                                                                    <!-- <el-button @click="addDiscount()" :disabled="willDisableDiscount" type="success" size="small" style="margin-top: 10px; margin-bottom: 10px;">Add 20% Discount</el-button> -->
                                                                    </el-card>
                                                                </div>
                                                            </div>
                                                        </el-card>
                                                        <el-card shadow="always" style="margin-top: 30px;">
                                                            <div class="row">
                                                                <div class="col-sm">
                                                                    <h4>Customer Information</h4>
                                                                </div>
                                                                <!-- <div class="col-sm">
                                                                    <el-link style="float: right;" type="primary">Hook existing customer</el-link>
                                                                </div> -->
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
                                                                type="number"
                                                                clearable
                                                                placeholder="Enter amount"
                                                                style="margin-top: 10px; margin-bottom: 10px;"
                                                                v-model="paymentObj.amount"
                                                                @input.native="onamountchange"
                                                                ></el-input>
                                                                </div>
                                                                <!-- <div class="col-sm">
                                                                    <el-select style="margin-top: 10px; width: 100%; margin-bottom: 10px;"
                                                                     v-model="paymentObj.discount" filterable placeholder="Select discount">
                                                                        <el-option
                                                                        v-for="item in discount"
                                                                        :key="item.value"
                                                                        :label="item.label"
                                                                        :value="item.value">
                                                                        </el-option>
                                                                    </el-select>
                                                                </div> -->
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
                                                    <h3>Payment Transactions</h3>
                                                    <!-- <div v-for="t in longRangeArraysOrders" :key="t.orderID">
                                                        {{t.paymentinfo.orderBarcode}} {{t.orderName}} {{t.paymentapprvl.paymentID}}
                                                    </div> -->
                                                    <hr>
                                                    <el-card shadow="always">
                                                        <el-table
                                                                :data="OrderInformation"
                                                                style="width: 100%">
                                                                <el-table-column
                                                                label="Order Image">
                                                                <template slot-scope="{row}">
                                                                    <div>
                                                                        <img 
                                                                        :src="row.orderImage"
                                                                        alt="no image"
                                                                        style="width: 30%; height : auto;"
                                                                        class="img-fluid"
                                                                        />
                                                                    </div>
                                                                </template>
                                                                </el-table-column>
                                                                <el-table-column
                                                                label="Order">
                                                               <template slot-scope="{row}">
                                                                    <div>
                                                                        <span>{{row.orderName}}</span>
                                                                    </div>
                                                                </template>
                                                                </el-table-column>
                                                                
                                                                 <!-- <el-table-column
                                                                label="More Actions">
                                                                     <template slot-scope="{row}">
                                                                        
                                                                        <el-link type="primary" @click="onconfirmpayment(
                                                                             row.orderBarcode,
                                                                              row.orderName,
                                                                              row.orderImage,
                                                                              row.orderPrice,
                                                                              row.orderQuantity,
                                                                              row.orderCategory,
                                                                              row.orderTotalPrice)">Approved</el-link>
                                                                     </template>
                                                                </el-table-column> -->
                                                            </el-table>
                                                            <el-button type="primary" plain size="small" style="float: right; margin-top: 10px; margin-bottom: 10px;"
                                                            @click="onconfirmTransaction()">Confirm Transaction</el-button>
                                                    </el-card>
                                                    
                                                </div>
                                            </el-dialog>
                                            <!-- adding qty -->
                                            <el-dialog
                                                                            :visible.sync="addqtydialogvisible"
                                                                            width="30%">
                                                                            <div class="container">
                                                                                <div v-if="addQuantityIdentfier == 1">
                                                                                    <span>Enter Quantity for Solo</span>
                                                                                    <el-input
                                                                                    type="text"
                                                                                    clearable
                                                                                    @input.native="qtyvalidation"
                                                                                    placeholder="Enter quantity"
                                                                                    v-model="updateQtyTask.addingQty"
                                                                                    style="margin-top: 10px; margin-bottom : 10px;"
                                                                                    ></el-input>
                                                                                </div>
                                                                                <div v-else-if="addQuantityIdentfier == 2">
                                                                                    <span>Enter Quantity for Box of 6</span>
                                                                                    <el-input
                                                                                    type="text"
                                                                                    @input.native="qtyvalidation"
                                                                                    clearable
                                                                                    placeholder="Enter quantity"
                                                                                    v-model="bundleQtyTask.addingQty"
                                                                                    style="margin-top: 10px; margin-bottom : 10px;"
                                                                                    ></el-input>
                                                                                </div>
                                                                                <div v-else-if="addQuantityIdentfier == 3">
                                                                                    <span>Enter Quantity for Buy 1 Take 1</span>
                                                                                    <el-input
                                                                                    type="text"
                                                                                    @input.native="qtyvalidation"
                                                                                    clearable
                                                                                    placeholder="Enter quantity"
                                                                                    v-model="b1t1QtyTask.addingQty"
                                                                                    style="margin-top: 10px; margin-bottom : 10px;"
                                                                                    ></el-input>
                                                                                </div>
                                                                            </div>
                                                                            <span slot="footer" class="dialog-footer">
                                                                                <el-button @click="addqtydialogvisible = false">Cancel</el-button>
                                                                                <el-button type="primary" :disabled="confirmdisabling"  @click="onconfirmaddqty()">Confirm</el-button>
                                                                            </span>
                                                                            </el-dialog> 
                                                    <!-- Receipt Printing -->
     <div style="display: none;" id="printMe">
                                                               
                   <div >
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
            Customer Name   : {{paymentObj.customerName}}<br>
            Phone   : {{paymentObj.customerNumber}}<br>
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

							<tr  v-for="(y) in OrderInformation" :key="y.orderID" class="service">
								<td class="tableitem"><p class="itemtext">{{y.orderName}}</p></td>
								<td class="tableitem"><p class="itemtext">{{y.orderQuantity}}</p></td>
								<td class="tableitem"><p class="itemtext"> &#8369;{{y.orderPrice}}</p></td>
							</tr>

							
						</table>
					</div><!--End Table-->
                        <h2>Total : &#8369;{{cartTotalPrice}} </h2> <br />
                            <p> Amount : &#8369;{{paymentObj.amount}}</p> <br />
                             <p> Change : &#8369;{{paymentObj.amount - cartTotalPrice}}</p> <br />
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
import {mapGetters, mapActions} from "vuex"
import {PUSH_ADDQTY,
 GET_ADDQTY,
  GET_SCREEN,
   PUSH_BOXOF6_TYPE,
    PUSH_TOTAL,
    PUSH_B1T1_TYPE,
    } from "@/store/types"
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
        fetchAllCustomerOrders: Function, soloOrderTask : Object, bundleOrderTask: Object,
        buyOneTakeOneTask: Object, cartTotalPrice: Number, onconfirmTransaction: Function, willDisableDiscount: Boolean
    },
    data(){
        return {
            discountIsHide : false,
            confirmdisabling: false,
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
        receiptDrawer: false, addqtydialogvisible : false, updateQtyTask: { addingQty : '', addingID: ''}, 
        bundleQtyTask: {addingQty : '', addingID: ''}, b1t1QtyTask : {addingQty: '', addingID: ''},
        IndicatorHelper : '', barcodeHelper : ''
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
            getState_Drawer: 'getState_Drawer',
            getaddqty: GET_ADDQTY,
            
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
        console.log("payment approval list ", this.paymentapprvl)
    },
    mounted(){
        console.log("on mount", this.getTotalPrice)
        this.onfailpayment = true
        this.fetchAllCustomerOrders()
    },
    methods: {
        qtyvalidation(event) {
           const number = parseInt(event.target.value)
      event.target.value = number ? number : 0
      if(isNaN(number)){
          this.confirmdisabling = true
        return
      }else{
        if(!number){
   
                this.confirmdisabling = true
            } else if(number < 0){
                this.confirmdisabling = true
            } 
             else{
                this.confirmdisabling = false
            }
      }
        },
        ...mapActions({
            addqty: PUSH_ADDQTY,
            addboxof6qty : PUSH_BOXOF6_TYPE,
            getTotal : PUSH_TOTAL,
            onpushAddb1t1Qty : PUSH_B1T1_TYPE
        }),
        addDiscount : function() {
             const discount = 0.20;
                        const decimal = Number(null);
                        const newValue = decimal + (this.cartTotalPrice - (this.cartTotalPrice * discount));
                        this.cartTotalPrice = newValue
                        this.willDisableDiscount = true
        },
        onconfirmaddqty: function(){
            this.addqtydialogvisible = false
            const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
            setTimeout(() => {
                if(this.IndicatorHelper === '1'){
                 const request = client.get(`/api/orders/get-product-final-integration?barcode=${this.barcodeHelper}`)
                request.then((r) => {
                    let integratedjson = []
                    for(var x = 0; x < r.data.length; x++){
                        integratedjson = JSON.parse(r.data[x].integratedRaws)
                            for(var y = 0; y < integratedjson.length; y++){
                                client.get(`/api/orders/check-detection-product-invetory-quantity?quantity=${this.updateQtyTask.addingQty}&indicator=${this.IndicatorHelper}&prodcode=${integratedjson[y].productCode}`)
                                .then(r => {
                                    if(r.data === 'exceed solo'){
                                        
                                    localStorage.setItem('detectionKey', '1')
                                    return false
                                    }
                                })
                                } 
                    }
                })
                setTimeout(() => {
                    if(localStorage.getItem('detectionKey') === '1'){
                        this.addqtydialogvisible = false
                         localStorage.removeItem('detectionKey')
                         this.$notify.error({
                                      title: 'Error',
                                      message: 'One or more ingredients was below quantity',
                                      offset: 100
                                      }); 
                                      loading.close()
                                      return false;
                    }else{
                         this.fetchAllCustomerOrders()
                        this.getTotal()
                        this.addqtydialogvisible = false
                        loading.close()
                        localStorage.removeItem('detectionKey')
                       this.addqty(
                            {
                            objectQTYUpdater : this.updateQtyTask,
                            objectQTYReducer: this.soloOrderTask
                            }
                        )
                       
                    }
                }, 1000)
                
            } 
            else if(this.IndicatorHelper === '3')
            {
                const request = client.get(`/api/orders/get-product-final-integration?barcode=${this.barcodeHelper}`)
                request.then((r) => {
                    let integratedjson = []
                    for(var x = 0; x < r.data.length; x++){
                        integratedjson = JSON.parse(r.data[x].integratedRaws)
                            for(var y = 0; y < integratedjson.length; y++){
                                client.get(`/api/orders/check-detection-product-invetory-quantity?quantity=${this.bundleQtyTask.addingQty}&indicator=${this.IndicatorHelper}&prodcode=${integratedjson[y].productCode}`)
                                .then(r => {
                                    if(r.data === 'exceed box of 6'){
                                    localStorage.setItem('detectionKey', '3')
                                    return false
                                    }
                                })
                                } 
                    }
                })
                setTimeout(() => {
                    if(localStorage.getItem('detectionKey') === '3'){
                        this.addqtydialogvisible = false
                         localStorage.removeItem('detectionKey')
                         loading.close()
                         this.$notify.error({
                                      title: 'Error',
                                      message: 'One or more ingredients was below quantity',
                                      offset: 100
                                      }); 
                                      return false;
                    }else{
                        this.addqtydialogvisible = false
                        localStorage.removeItem('detectionKey')
                        loading.close()
                         this.fetchAllCustomerOrders()
                         
                    this.getTotal()
                       this.addboxof6qty(
                        {
                        objectQTYUpdater : this.bundleQtyTask,
                        objectQTYReducer: this.bundleOrderTask
                        }
                    )
                   
                    
                    }
                }, 1000)
                
            } else if (this.IndicatorHelper === '2'){
                const request = client.get(`/api/orders/get-product-final-integration?barcode=${this.barcodeHelper}`)
                request.then((r) => {
                    let integratedjson = []
                    for(var x = 0; x < r.data.length; x++){
                        integratedjson = JSON.parse(r.data[x].integratedRaws)
                            for(var y = 0; y < integratedjson.length; y++){
                                client.get(`/api/orders/check-detection-product-invetory-quantity?quantity=${this.b1t1QtyTask.addingQty}&indicator=${this.IndicatorHelper}&prodcode=${integratedjson[y].productCode}`)
                                .then(r => {
                                    if(r.data === 'exceed b1t1'){
                                    localStorage.setItem('detectionKey', '2')
                                    return false
                                    }
                                })
                                } 
                    }
                })
                setTimeout(() => {
                    if(localStorage.getItem('detectionKey') === '2'){
                        this.addqtydialogvisible = false
                         localStorage.removeItem('detectionKey')
                         loading.close()
                         this.$notify.error({
                                      title: 'Error',
                                      message: 'One or more ingredients was below quantity',
                                      offset: 100
                                      }); 
                                      return false;
                    }else{
                        localStorage.removeItem('detectionKey')
                        loading.close()
                         this.fetchAllCustomerOrders()
                        this.getTotal()
                         this.addqtydialogvisible = false
                       this.onpushAddb1t1Qty(
                        {
                            objectQTYUpdater : this.b1t1QtyTask,
                            objectQTYReducer: this.buyOneTakeOneTask
                        }
                        )
                       
                    }
                }, 1000)
            }
            }, 2000)
            
        },
        onaddqty(id, indicator, barcode){
            this.barcodeHelper = barcode
            this.IndicatorHelper = indicator
            if(indicator === "1"){
                this.addqtydialogvisible = true
            this.updateQtyTask.addingID = id
            this.addQuantityIdentfier = 1
            } else if(indicator === "3"){
                 this.addqtydialogvisible = true
                        this.bundleQtyTask.addingID = id
                        this.addQuantityIdentfier = 2
            } else if(indicator === "2"){
                
                this.addqtydialogvisible = true
            this.b1t1QtyTask.addingID = id
            this.addQuantityIdentfier = 3
            }
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
                        this.fetchAllCustomerOrders()
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
                        this.fetchAllCustomerOrders()

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
            event.target.value =event.target.value.replace(/^0+/, '')
            if(!event.target.value){
                this.onfailpayment = true
            } else if(this.cartTotalPrice > event.target.value){
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
