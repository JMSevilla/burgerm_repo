<template>
    <div id="app">
        <div class="container-fluid" style="margin-top: 50px; margin-bottom : 20px;">
            <div class="row">
              <div class="col-md-2">
                <el-card shadow="always">
                  <h4>Categories</h4>
                  <b-button variant="primary" size="lg" style="margin-top: 20px; padding: 15px; width: 100%;" >Bundle</b-button>
                  <b-button variant="primary" size="lg" style="margin-top: 20px; padding: 15px; width: 100%;" >Bundle</b-button>
  <b-button variant="primary" size="lg" style="margin-top: 20px; padding: 15px; width: 100%;" >Bundle</b-button>
  <b-button variant="primary" size="lg" style="margin-top: 20px; padding: 15px; width: 100%;" >Bundle</b-button>
                </el-card>
              </div>
                <div class="col-md-6">
                    <el-card shadow="always">
                        
                        <div class="row">
                            <div class="col-sm">
                                 <vs-input label="Product Search" class="inputx" placeholder="Search" v-model="searchable"/>
                                 
                            </div>
                            <div class="col-sm"></div>
                        </div>
                        <hr>
                        <div style="margin-top: 30px;">
                           <div v-if="select1 == 0">
                              <div v-if="posprodBundle == null || posprodBundle == [] || posprodBundle == '' ">
                                      <img 
                                       src="https://cdn.dribbble.com/users/1753953/screenshots/3818675/media/f59ed80d5c527e2461d8ba49adc36160.gif"
                                       style="width: 100%; height: auto;"
                                       class="img-fluid"
                                       alt="no image">
                               
                                </div>
                                <div v-else>
                                  
                                     <!-- <div class="wrapper">
                                        <vs-card v-for="item in bundlePagedTableData" :key="item.bundleID" style="justify-content: center" class="card" >
                                    <div slot="header">
                                        <h3>
                                        {{item.bundleTitle}}
                                        </h3>
                                    </div>
                                    <div>
                                        <center>
                                             <el-image
                                                style="width: 100px; height: 100px"
                                                :src="item.prodImg"
                                                :fit="fit"></el-image>
                                            
                                        </center>
                                    </div>
                                    <div>
                                        
                                       
                                    </div>
                                     <div slot="footer">
                                            <vs-row vs-justify="flex-end">
                                            <vs-button type="gradient" color="danger" @click="onaddcartbundle(
                                              item.bundleTitle, item.prodPrice, item.prodImg
                                            )" icon="favorite"></vs-button>
                                            <vs-button color="primary" icon="turned_in_not"></vs-button>
                                            </vs-row>
                                        </div>
                                    </vs-card>
                                  </div> -->
                                  <!-- end product bundle -->
                               
                                 <el-pagination layout="prev, pager, next" :page-size="pageSize" :total="this.posprodBundle.length" @current-change="setPage">
                                    </el-pagination>
                                </div>
                           </div>
                           <div v-else>
                             <div v-if="AllProduct == null || AllProduct == [] || AllProduct == '' ">
                                      <img 
                                       src="https://cdn.dribbble.com/users/1753953/screenshots/3818675/media/f59ed80d5c527e2461d8ba49adc36160.gif"
                                       style="width: 100%; height: auto;"
                                       class="img-fluid"
                                       alt="no image">
                               
                                </div>
                                
                                <div v-else>
                                   <div class="row">
                                     <div v-for="item in pagedTableData" :key="item.id" class="col-md-3 col-6 my-1">
                                         <sequential-entrance delay="1000">
                                            <vs-card style="justify-content: center;" class="card" >
                                    <div slot="header">
                                        <h3>
                                        {{item.prodname}}
                                        </h3>
                                    </div>
                                    <div>
                                        <center>
                                             <el-image
                                                style="width: 100px; height: 100px"
                                                :src="item.prodimg"
                                                :fit="fit"></el-image>
                                            
                                        </center>
                                    </div>
                                    <div style="margin-top: 20px;">
                                        
                                        <div v-if="item.prodquantity == 0">
                                            <el-tag  type="danger" size="small">Unavailable</el-tag>
                                          </div>
                                          <div v-else>
                                             <el-tag  type="success" size="small">Available</el-tag>
                                          </div>
                                          <span style="font-size: 13px;">Remaining Quantity : {{item.prodquantity}}</span>
                                    </div>
                                     <div slot="footer">
                                            <vs-row vs-justify="flex-end">
                                              <div v-if="item.prodquantity == 0">
                                                <vs-button color="primary" icon="turned_in_not"></vs-button>
                                              </div>
                                            <div v-else>
                                               <vs-button type="gradient" color="danger" @click="onaddsolocard(
                                              item.prodquantity, item.id, item.prodname, item.prodimg, item.integratedRaws, item.prodprice, item.productCode, item.prodcategory
                                              )" icon="favorite"></vs-button>
                                             <vs-button color="primary" @click="onbundleOrder(
                                               item.prodquantity, item.id, item.prodname, item.prodimg, item.integratedRaws, item.prodprice, item.productCode, item.prodcategory
                                             )" icon="turned_in_not"></vs-button>
                                            </div>
                                            </vs-row>
                                        </div>
                                    </vs-card>
                                         </sequential-entrance>
                                      </div>
                                   </div>
                                     <!-- <div class="wrapper">
                                            <vs-card v-for="item in pagedTableData" :key="item.id" style="justify-content: center;" class="card" >
                                    <div slot="header">
                                        <h3>
                                        {{item.prodname}}
                                        </h3>
                                    </div>
                                    <div>
                                        <center>
                                             <el-image
                                                style="width: 100px; height: 100px"
                                                :src="item.prodimg"
                                                :fit="fit"></el-image>
                                            
                                        </center>
                                    </div>
                                    <div>
                                        
                                        <div v-if="item.prodquantity == 0">
                                            <el-tag  type="danger" size="small">Unavailable</el-tag>
                                          </div>
                                          <div v-else>
                                             <el-tag  type="success" size="small">Available</el-tag>
                                          </div>
                                    </div>
                                     <div slot="footer">
                                            <vs-row vs-justify="flex-end">
                                              <div v-if="item.prodquantity == 0">
                                                <vs-button color="primary" icon="turned_in_not"></vs-button>
                                              </div>
                                            <div v-else>
                                               <vs-button type="gradient" color="danger" @click="onaddsolocard(
                                              item.prodquantity, item.id, item.prodname, item.prodimg, item.integratedRaws, item.prodprice, item.productCode, item.prodcategory
                                              )" icon="favorite"></vs-button>
                                             <vs-button color="primary" icon="turned_in_not"></vs-button>
                                            </div>
                                            </vs-row>
                                        </div>
                                    </vs-card>
                                         </div> -->
                                   <el-pagination layout="prev, pager, next" :page-size="pageSize" :total="this.AllProduct.length" @current-change="setPage">
                                    </el-pagination>
                                </div>
                           </div>
                        </div>
                    </el-card>
                </div>
                <div class="col-md-4">
                    <el-card shadow="always">
                        <h4>Customer Cart</h4>
                        <CustomerOrders
                        :paymentapprvl="paymentapprvl" 
                        :paymentinf="paymentinf" 
                        :onready="onready" 
                        :countready="countready" 
                        :onpay="onpay" 
                        :paymentObj="paymentObject" 
                        :voidItem="voidItem" 
                        :discount="discountOption" 
                        :pay="onpayment" 
                        :passCustomerArray="customerOrderArray" 
                        :lazyload="listLoading"
                        :onconfirmpayment="onconfirmpayment"
                        :receiptDrawer="receiptDrawer"
                        :handleClose="handleClose"
                        :onpayerror="onpayerror"
                        :savedSubPayment="savedSubPayment"
                        :OrderInformation="OrderInformation"
                        :onDecline="onDecline" />
                    </el-card>
                </div>
            </div>
             <vs-popup class="holamundo"  :title="popupSettings.title" :active.sync="popupActivo">
                 <el-alert
                        title="Searching via barcode"
                        type="warning"
                        description="Make sure you will enter a right product barcode"
                        show-icon
                        :closable="false">
                    </el-alert>
                                   <el-input
                                    placeholder="Please input quantity"
                                    v-model="searchSettings.barcodeInput"
                                    clearable
                                    style="width: 100%; margin-top: 10px; margin-bottom: 10px;">
                                    </el-input>
                                   <vs-button @click="onbarcodesearch" style="float: right;margin-top: 10px; margin-bottom: 10px;  " type="relief">Search</vs-button>
                                    </vs-popup>

                                    <!-- solo add cart modal -->
   <vs-popup class="holamundo"  :title="popupSettings.soloaddcartTitle" :active.sync="popupActivoSolo">
                 <el-alert
                        title="Input Quantity"
                        type="info"
                        description="Make sure you will enter a quantity"
                        show-icon
                        :closable="false">
                    </el-alert>
                                   <el-input
                                    placeholder="Please input quantity"
                                    v-model="soloOrderTask.soloQuantity"
                                    clearable
                                    style="width: 100%; margin-top: 10px; margin-bottom: 10px;">
                                    </el-input>
                                   <vs-button style="float: right;margin-top: 10px; margin-bottom: 10px;" @click="onqtyOk()" type="relief">OK</vs-button>
                                    </vs-popup>
                                    <!-- end solo add card modal -->

                                    <!-- bundle order modal -->
                                    <vs-popup class="holamundo"  :title="popupSettingsBundle.title" :active.sync="popActiveBundle">
                 <el-alert
                        title="Choose Bundle Order"
                        type="info"
                        description="Make sure you will choose a bundle"
                        show-icon
                        :closable="false">
                    </el-alert>

                    <div style="display: inline;">
                      <el-button type="primary" @click="onchoosebundleofsix(6)" plain style="margin-bottom: 10px; margin-top: 10px;">Bundle of 6</el-button>
                       <el-button type="primary" plain style="margin-bottom: 10px; margin-top: 10px;">Bundle of 8</el-button>
                    </div>
                                   
                                    </vs-popup>
                                    <!-- end bundle order modal -->
        </div>
                                
    </div>
</template>

<script>
import client from "@/store/0AuthRequest"
import CustomerOrders from "./customer_order_list/customerTB.vue"
import {mapGetters} from "vuex"
export default {
    components: {
        CustomerOrders
    },
    data(){
        return{
            popupSettings: {
                title: 'Search via barcode',
                soloaddcartTitle: 'Quantities'
            },
            popupSettingsBundle: {
              title: 'Bundle Order'
            },
            searchSettings: {
                barcodeInput: ''
            },
            soloOrderTask: {
              soloQuantity : '',
              externalIDQTY : '',
              soloProdname : '',
              soloProdimage : '',
              soloProdIntegrated: '',
              soloProdprice: '',
              soloProdCode: '', soloProdCategory: ''
            },
            bundleOrderTask: {
              bundleQuantity: '',
              externalIDQTY: '',
              bundleProdname: '',
              bundleProdimage: '',
              bundleProdIntegrated: '',
              bundleProdprice: '',
              bundleProdCode: '', bundleProdCategory: ''
            },
            pageSize: 8,
            popupActivo: false,
            popupActivoSolo: false,
            popActiveBundle: false,
              page: 1,
              searchable:'',
            select1:null,
              options1:[
                {text:'Product Bundle',value:0},
                {text:'Blade Runner',value:2},
                {text:'Thor Ragnarok',value:3},
            ],
            AllProduct:[],
            fit: ['fill'],
            customerOrderArray: [],
            listLoading: true,
            posprodBundle: [],
            discountOption: [{
                value: 'Option1',
                label: 'Option1'
              }, {
                value: 'Option2',
                label: 'Option2'
              }, {
                value: 'Option3',
                label: 'Option3'
              }, {
                value: 'Option4',
                label: 'Option4'
              }, {
                value: 'Option5',
                label: 'Option5'
              }],
              value: '',
              paymentObject: {
                customerName: null,
                customerNumber: null,
                amount: null,
                discount: null,
                totalPrice: null
              },
              countready: null,
              onreadypay: true,
              paymentinf: [],
              paymentapprvl: [],
              paymentDetailsQTY: [],
              paymentProdCode: [],
              onpayerror: false,
              OB: [],
              OrderInformation: [],
              IngredientsArray: [],
              helper: [],
              savedIngredients: [],
              savedSubPayment: [],
              isbundle: false
        }
    },
     computed:{
    pagedTableData() {
       if(this.searchable){
      return this.AllProduct.filter((item)=>{
        return this.searchable.toLowerCase().split(' ').every(v => item.prodname.toString().toLowerCase().includes(v))
      })
      }else{
        return this.AllProduct.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
      }

     },
     bundlePagedTableData(){
       if(this.searchable){
      return this.posprodBundle.filter((item)=>{
        return this.searchable.toLowerCase().split(' ').every(v => item.bundleTitle.toString().toLowerCase().includes(v))
      })
      }else{
        return this.posprodBundle.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
      }
     },
     ...mapGetters({
       getTotalPrice: 'getTotalPrice',
     })
    },
    created(){
        this.fetchAllProduct()
        this.fetchAllCustomerOrders()
        this.countAllReady()
        this.listof_ready_payments()
    },
    methods: {
      OnPrint: function(){
        
      },
      handleClose: function(){
        this.$confirm('Are you sure you want to close this?')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      onchoosebundleofsix: function(qty){
        this.bundleOrderTask.bundleQuantity = qty
        if(!this.bundleOrderTask.bundleQuantity){

        }else{ 
         this.$vs.loading({
                  type: 'sound'
              })
              setTimeout(() => {
                const req = client.get(`/api/orders/bundle-validate-cart/${this.bundleOrderTask.bundleQuantity}/${this.bundleOrderTask.externalIDQTY}`)
                return req.then(({data}) => {
                  if(data === "invalid qty"){
                     this.$vs.notify({title:'Nope',text:'Invalid Quantity',color:'danger',position:'top-right', icon:'highlight_off'})
                      this.$vs.loading.close()
                      return false
                  }else{ 
                    const data = new FormData()
                    data.append("bundle_order_name", this.bundleOrderTask.bundleProdname)
                    data.append("bundle_order_code", this.bundleOrderTask.bundleProdCode)
                    data.append("bundle_order_price", this.bundleOrderTask.bundleProdprice)
                    data.append("bundle_order_qty", this.bundleOrderTask.bundleQuantity)
                    data.append("bundle_order_category", this.bundleOrderTask.bundleProdCategory)
                    data.append("bundle_order_image", this.bundleOrderTask.bundleProdimage)
                    const addreq = client.post(`/api/orders/order-bundle`, data)
                    return addreq.then((response) => {
                      if(response.data === "success order") { 
                         
                        const reduceQuantity = client.put(`/api/orders/order-decrease-qty-bundle/${this.bundleOrderTask.externalIDQTY}/${this.bundleOrderTask.bundleQuantity}`)
                        reduceQuantity.then((resp) => {
                          if(resp.data === "success decrease") { 
                            this.isbundle = true
                            this.$vs.notify({title:'Success',text:'Added to cart',color:'success',position:'top-right', icon:'highlight_off'})
                            this.fetchAllCustomerOrders()
                            this.fetchAllProduct()
                            this.$vs.loading.close()
                            this.popActiveBundle = false
                          }
                        })
                      }
                    })
                  }
                })
              }, 3000)
        }
      },
      onbundleOrder: function(qty, id, name, image, integrated, price, prodcode, category) {
        this.popActiveBundle = true
        this.bundleOrderTask.externalIDQTY = id;
        this.bundleOrderTask.bundleProdname = name;
        this.bundleOrderTask.bundleProdimage = image;
        this.bundleOrderTask.bundleProdIntegrated = integrated;
        this.bundleOrderTask.bundleProdprice = price
        this.bundleOrderTask.bundleProdCode = prodcode
        this.bundleOrderTask.bundleProdCategory = category
      },
      onconfirmpayment: function(paymentID){
        this.$confirm('Are you sure you want to make this payment?', 'Warning', {
                cancelButtonText: 'Cancel',
                confirmButtonText: 'Yes',
                type: 'warning'
                }).then(() => {
                  const loading = this.$loading({
                    lock: true,
                    text: 'please wait...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                  });
                  setTimeout(() => {
                      for(var d = 0; d < this.paymentDetailsQTY.length; d++){
             for(var a = 0; a < this.savedIngredients.length; a++){
               client.put(`/api/payment/decrease-solo/${this.savedIngredients[a].prodID}/${this.paymentDetailsQTY[d].QTY}`)
               .then((res) => {
                 if(res.data == "success reduce") {
                   

                 }
               })
             }
             
           }
           client.put(`/api/payment/approve-payment-update-to-receipt/${paymentID}/${this.isbundle}`)
             .then((res) => {
               if(res.data == "done payment") {
                 this.$message({
                    showClose: true,
                    message: 'Successfully Transact!.',
                    type: 'success'
                    });
                  loading.close()
                   this.$htmlToPaper('printMe');
                   this.fetchAllProduct()
                  this.fetchAllCustomerOrders()
                  this.countAllReady()
                  this.listof_ready_payments()
               }
             })
                  }, 2000)
                })
           
      },
      listof_ready_payments: function(){
        
         client.get(`/api/orders/break-ready-payments`)
        .then(res => {
          if(res.data == null || res.data == ""){
            console.log("true ")
            this.paymentapprvl = []
            this.paymentinf = []
            this.paymentDetailsQTY = []
            this.paymentProdCode = []
          }else{
          for(var x = 0; x < res.data.length; x++){ //parent loop
            
            this.OrderInformation = JSON.parse(res.data[x].orderInfo)
            for(var y = 0; y < this.OrderInformation.length; y++){
              console.log("order info", this.OrderInformation[y])
              this.OB.push({
                bcode: this.OrderInformation[y].orderBarcode
              })
              this.paymentapprvl.push({
                paymentID: res.data[x].paymentID,
                paymentStatus: res.data[x].paymentStatus,

              })
              console.log("Order Array", this.OrderInformation)

              console.log("payment approval",)
              this.paymentinf.push({
                      amount : JSON.parse(res.data[x].paymentInfo).amount,
                      customerName : JSON.parse(res.data[x].paymentInfo).customerName,
                      customerNumber: JSON.parse(res.data[x].paymentInfo).customerNumber,
                      discount: JSON.parse(res.data[x].paymentInfo).discount,
                      totalPrice: JSON.parse(res.data[x].paymentInfo).totalPrice,
                      orderBarcode: this.OrderInformation[y].orderBarcode,
                      orderCategory: this.OrderInformation[y].orderCategory,
                      orderCode: this.OrderInformation[y].orderCode,
                      orderID: this.OrderInformation[y].orderID,
                      orderImage: this.OrderInformation[y].orderImage,
                      orderName: this.OrderInformation[y].orderName,
                      orderQuantity: this.OrderInformation[y].orderQuantity,
                      orderPrice: this.OrderInformation[y].orderPrice
                    })
                  this.savedSubPayment.push({
                    orderBarcode: this.OrderInformation[y].orderBarcode,
                      orderCategory: this.OrderInformation[y].orderCategory,
                      orderCode: this.OrderInformation[y].orderCode,
                      orderID: this.OrderInformation[y].orderID,
                      orderImage: this.OrderInformation[y].orderImage,
                      orderName: this.OrderInformation[y].orderName,
                      orderQuantity: this.OrderInformation[y].orderQuantity,
                      orderPrice: this.OrderInformation[y].orderPrice
                  })
                    console.log("payment information", this.OrderInformation[y].orderBarcode)
                    this.paymentDetailsQTY.push({
                      QTY: this.OrderInformation[y].orderQuantity
                    })
                    this.paymentProdCode.push({
                      code: this.OrderInformation[y].orderBarcode
                    })
                    console.log("payment prod code", this.paymentProdCode)
              console.log("order inf", this.OrderInformation[y])
              for(var b = 0; b < this.OB.length; b++){
                const CL = client.get(`/api/payment/confirm-payment/${this.OB[b].bcode}`)
                return CL.then((response) => {
                  for(var v = 0; v < response.data.length; v++){
                    this.IngredientsArray = JSON.parse(response.data[v].integratedRaws)
                    for(var s = 0; s < this.IngredientsArray.length; s++){
                      // console.log("ingredients breakthrough", this.IngredientsArray[s])
                      this.savedIngredients.push({
                        prodID : this.IngredientsArray[s].productID
                      })
                      console.log("check prod IDS", this.savedIngredients)
                    }
                  }
                })
              }
            }
          }
          }
        })
      },
      countAllReady: function(){
        const req = client.get(`/api/orders/count-ready`)
        return req.then((res) => {
          if(res.data != null || res.data != "")
          this.countready = res.data
          else
          this.countready = 0
          this.onreadypay = false
        })
      },
      onpay: function(){
        if(!this.paymentObject.amount){
          this.$message({
          showClose: true,
          message: 'Please provide payment details.',
          type: 'error'
          });
          return false;
        } 
         else {
           if(this.countready > 0){
            this.onpayerror = true 
            return false;
          }
          this.$confirm('Are you sure you want to make this payment?', 'Warning', {
                cancelButtonText: 'Cancel',
                confirmButtonText: 'Yes',
                type: 'warning'
                }).then(() => {
                  const loading = this.$loading({
                    lock: true,
                    text: 'please wait...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                  });
                  setTimeout(() => {
                    this.paymentObject.totalPrice = this.getTotalPrice
                    localStorage.setItem("itemtotal", this.getTotalPrice)
                    const data = new FormData()
                    data.append("paymentinfo", JSON.stringify(this.paymentObject))
                    data.append("orderinfo", JSON.stringify(this.customerOrderArray))
                    const req = client.post(`/api/payment/make-payment`, data)
                    return req.then((response) => {
                      if(response.data.message == "success make payment"){
                        this.$notify.success({
                                title: 'Nice',
                                message: 'Successfully make payment',
                                offset: 100
                                }); 
                                loading.close()
                                this.onpayerror = false
                                this.$store.state.stateDrawer = false
                                 this.fetchAllProduct()
                                this.fetchAllCustomerOrders()
                                this.countAllReady()
                                this.listof_ready_payments()
                      }
                    })
                  }, 2000)
                })
        }
      },
      voidItem: function(code, qty, id){
        this.$vs.loading({
                  type: 'sound'
              })
        setTimeout(() => {
          const req = client.put(`/api/orders/void-item/${code}/${qty}/orderno/${id}`)
        return req.then((response) => {
          if(response.data == "success void"){
            this.$vs.notify({title:'Success',text:'Item successfully voided',color:'success',position:'top-right', icon:'highlight_off'})
                      this.fetchAllCustomerOrders()
                      this.fetchAllProduct()
                      this.$vs.loading.close()
          }
        })
        }, 1000)
      },
      onpayment: function(){
        console.log("customer array", this.customerOrderArray)
        if(this.customerOrderArray == [] || this.customerOrderArray == null || this.customerOrderArray == ""){
          this.$message({
          showClose: true,
          message: 'No transactions to be made.',
          type: 'error'
          });
          this.$store.state.stateDrawer = false
          return false;
        }else{
          this.$store.state.stateDrawer = true
        }
      },
      onqtyOk: function(){
        if(!this.soloOrderTask.soloQuantity){

        }else{ 
         this.$vs.loading({
                  type: 'sound'
              })
        setTimeout(() => {
          const req = client.get(`/api/orders/solo-validate-cart/${this.soloOrderTask.soloQuantity}/${this.soloOrderTask.externalIDQTY}`)
          return req.then(({data}) => {
            if(data === "invalid qty") { 
              this.$vs.notify({title:'Nope',text:'Invalid Quantity',color:'danger',position:'top-right', icon:'highlight_off'})
              this.$vs.loading.close() 
              return false
            }else {   
              const data = new FormData()
              data.append("solo_order_name", this.soloOrderTask.soloProdname)
              data.append("solo_order_code", this.soloOrderTask.soloProdCode)
              data.append("solo_order_price", this.soloOrderTask.soloProdprice)
              data.append("solo_order_qty", this.soloOrderTask.soloQuantity)
              data.append("solo_order_category", this.soloOrderTask.soloProdCategory)
              data.append("solo_order_image", this.soloOrderTask.soloProdimage)
              const addreq = client.post(`/api/orders/order-solo`, data)
              return addreq.then((response) => {
                console.log("first request", response.data)
                if(response.data === "success order") { 
                  const reducer = client.put(`/api/orders/order-decrease-qty/${this.soloOrderTask.externalIDQTY}/${this.soloOrderTask.soloQuantity}`)
                  reducer.then((resp) => {
                    console.log("second request",resp.data)
                    if(resp.data === "success decrease") { 
                      this.isbundle = false
                      this.$vs.notify({title:'Success',text:'Added to cart',color:'success',position:'top-right', icon:'highlight_off'})
                      this.fetchAllCustomerOrders()
                      this.fetchAllProduct()
                      this.$vs.loading.close()
                      this.popupActivoSolo = false
                    }
                  })
                }
              })
            } 
          })
        }, 2000)
        }
      },
      onaddsolocard: function(qty, id, name, image, integrated, price, prodcode, category){
        this.popupActivoSolo = true
        this.soloOrderTask.externalIDQTY = id;
        this.soloOrderTask.soloProdname = name;
        this.soloOrderTask.soloProdimage = image;
        this.soloOrderTask.soloProdIntegrated = integrated;
        this.soloOrderTask.soloProdprice = price
        this.soloOrderTask.soloProdCode = prodcode
        this.soloOrderTask.soloProdCategory = category
      },  
      onaddcartbundle: function(title, price, image){
        const data = new FormData()
        data.append("ordername", title)
        data.append("orderprice", price)
        data.append("orderimage", image)
        const req = client.post(`/api/bundle-order/add-to-cart`, data)
        return req.then(({ data }) => {
          if(data == "success cart"){
            this.$vs.notify({title:'Success',text:'Added to cart',color:'success',position:'top-right', icon:'highlight_off'})
            this.fetchAllCustomerOrders()
            this.fetchAllProduct()
          }
        })
      },
      onselectcateg: function(){
        if(this.select1 == 0){
          this.prodBundlePOS()
        }
      },
      prodBundlePOS: function(){
         this.$vs.loading({
                  type: 'sound'
              })
         setTimeout(() => {
           const req = client.get(`/api/bundle/fetchAll-bundle`)
            return req.then(({ data }) => {
              console.log("bundle", data)
                this.posprodBundle = data
                this.AllProduct = []
                

                // const check = JSON.parse(data[1].bundleIntegratedProdInvID)
                // for(var x = 0; x < check.length; x++){
                //     console.log(JSON.parse(check[x].integratedRaws))
                // }
            })
         }, 3000)
      },
        setPage(val){
        this.page = val
      },
      onsearchbarcode: function(){
          this.popupActivo = true
      },
      ongetall: function(){
          this.$vs.loading({
                  type: 'sound'
              })
              setTimeout(()=> {
                  this.fetchAllProduct()
                   this.$vs.loading.close()
              }, 1000)
          
      },
      onbarcodesearch: function(){
          if(!this.searchSettings.barcodeInput){
              this.$vs.notify({title:'Oops',text:'Please enter barcode',color:'danger',position:'top-right', icon:'highlight_off'})
              return false
          }else{
              this.$vs.loading({
                  type: 'sound'
              })
              setTimeout(() => {
                    client
                   .get(`/api/pos/products/${this.searchSettings.barcodeInput}/barcode`)
                   .then(({ data }) => {
                       this.$vs.loading.close()
                        this.AllProduct = data
                        this.popupActivo = false
                   })
              }, 2000)
          }
      },
      fetchAllProduct: async function(){
          await client
          .get(`/api/pos/products/get-all`)
          .then(({ data }) => {
            console.log("list of products" ,data)
               this.AllProduct = data
               this.posprodBundle = []
               this.select1 = null
          })
      },
      fetchAllCustomerOrders: async function(){
          await client
          .get(`/api/orders/order-list`)
          .then(({ data }) => {
              this.customerOrderArray = data
              this.totalPriceComputed()
              this.listLoading = false
          })
      },
      totalPriceComputed: function(){
         client
          .get(`/api/orders/order-total-price`)
          .then((response) => {
            this.$store.state.customerTotalPrice = response.data
          })
      },
      onDecline: function(paymentID){
        this.$confirm('Are you sure you want to decline this transaction?', 'Warning', {
                cancelButtonText: 'Cancel',
                confirmButtonText: 'Yes',
                type: 'warning'
                }).then(() => {
                  const loading = this.$loading({
                    lock: true,
                    text: 'please wait...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                  });
                  setTimeout(() => { 
                    client.post(`/api/orders/decline-payment/${paymentID}`)
                      .then((res) => {
                        loading.close()
                            this.fetchAllProduct()
                            this.fetchAllCustomerOrders()
                            this.countAllReady()
                            this.listof_ready_payments()
                      })
                  }, 2000)
                })
           
      },
    }
}
</script>
