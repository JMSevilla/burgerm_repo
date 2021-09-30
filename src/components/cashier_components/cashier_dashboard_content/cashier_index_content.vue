<template>
    <div id="app">
        <div class="container-fluid" style="margin-top: 50px">
            <div class="row">
                <div class="col-md-4">
                    <el-card shadow="always">
                        <div class="row">
                            <div class="col-md-8">
                                <h3>Products</h3>
                            </div>
                            <div class="col-md-4">
                                 
                               <vs-button style="float: right;" @click="onsearchbarcode" type="relief">Search barcode</vs-button>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm">
                                 <vs-input label="Product Search" class="inputx" placeholder="Search" v-model="searchable"/>
                                 
                            </div>
                            <div class="col-sm">
                                <vs-select
                                class="selectExample"
                                v-model="select1"
                                label="Product Categories"
                                placeholder="Choose Categories"
                                >
                                <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="item,index in options1" />
                                </vs-select>
                            </div>
                            <div class="col-sm">
                                 <vs-button @click="ongetall" type="relief">Get All</vs-button>
                            </div>
                            <div class="col-sm"></div>
                        </div>
                        <hr>
                        <div style="margin-top: 30px;">
                           
                                <div v-if="AllProduct == null || AllProduct == [] || AllProduct == '' ">
                                      <img 
                                       src="https://cdn.dribbble.com/users/1753953/screenshots/3818675/media/f59ed80d5c527e2461d8ba49adc36160.gif"
                                       style="width: 100%; height: auto;"
                                       class="img-fluid"
                                       alt="no image">
                               
                                </div>
                                <div v-else>
                                     <div class="wrapper">
                                        <vs-card v-for="item in pagedTableData" :key="item.id" style="justify-content: center" class="card" >
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
                                        
                                        <span style="font-size: 12px;">Product Code : {{item.productCode}}.</span>
                                    </div>
                                     <div slot="footer">
                                            <vs-row vs-justify="flex-end">
                                            <vs-button type="gradient" color="danger" icon="favorite"></vs-button>
                                            <vs-button color="primary" icon="turned_in_not"></vs-button>
                                            </vs-row>
                                        </div>
                                    </vs-card>
                                  </div>
                                  
                               
                               <el-pagination layout="prev, pager, next" :page-size="pageSize" :total="this.AllProduct.length" @current-change="setPage">
                                    </el-pagination>
                                </div>
                            
                            
                        </div>
                    </el-card>
                </div>
                <div class="col-md-8">
                    <el-card shadow="always">
                        <h4>Customer Cart</h4>
                        <CustomerOrders :passCustomerArray="customerOrderArray" :lazyload="listLoading" />
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
                                    placeholder="Please input barcode"
                                    v-model="searchSettings.barcodeInput"
                                    clearable
                                    style="width: 100%; margin-top: 10px; margin-bottom: 10px;">
                                    </el-input>
                                   <vs-button @click="onbarcodesearch" style="float: right;margin-top: 10px; margin-bottom: 10px;  " type="relief">Search</vs-button>
                                    </vs-popup>
        </div>
                                
    </div>
</template>

<script>
import client from "@/store/0AuthRequest"
import CustomerOrders from "./customer_order_list/customerTB.vue"
export default {
    components: {
        CustomerOrders
    },
    data(){
        return{
            popupSettings: {
                title: 'Search via barcode'
            },
            searchSettings: {
                barcodeInput: ''
            },
            pageSize: 6,
            popupActivo: false,
              page: 1,
              searchable:'',
            select1:null,
              options1:[
                {text:'IT',value:0},
                {text:'Blade Runner',value:2},
                {text:'Thor Ragnarok',value:3},
            ],
            AllProduct:[],
            fit: ['fill'],
            customerOrderArray: [],
            listLoading: true
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

     }
    },
    created(){
        this.fetchAllProduct()
        this.fetchAllCustomerOrders()
    },
    methods: {
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
               this.AllProduct = data
          })
      },
      fetchAllCustomerOrders: async function(){
          await client
          .get(`/api/orders/order-list`)
          .then(({ data }) => {
              this.customerOrderArray = data
              this.listLoading = false
          })
      }
    }
}
</script>

<style scoped>
html, body {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 16px;
  margin-bottom: 16px;
}

div#app {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
div#app .search-wrapper {
  position: relative;
}
div#app .search-wrapper label {
  position: absolute;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
  top: 8px;
  left: 12px;
  z-index: -1;
  transition: 0.15s all ease-in-out;
}
div#app .search-wrapper input {
  padding: 4px 12px;
  color: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(0, 0, 0, 0.12);
  transition: 0.15s all ease-in-out;
  background: white;
}
div#app .search-wrapper input:focus {
  outline: none;
  transform: scale(1.05);
}
div#app .search-wrapper input:focus + label {
  font-size: 10px;
  transform: translateY(-24px) translateX(-12px);
}
div#app .search-wrapper input::-webkit-input-placeholder {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
  font-weight: 100;
}
div#app .wrapper {
  display: flex;
  max-width: 444px;
  flex-wrap: wrap;
  padding-top: 12px;
}
div#app .card {
  box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px;
  max-width: 124px;
  margin: 12px;
  transition: 0.15s all ease-in-out;
}
div#app .card:hover {
  transform: scale(1.1);
}
div#app .card a {
  text-decoration: none;
  padding: 12px;
  color: #03A9F4;
  font-size: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
div#app .card a img {
  height: 100px;
}
div#app .card a small {
  font-size: 10px;
  padding: 4px;
}
div#app .hotpink {
  background: hotpink;
}
div#app .green {
  background: green;
}
div#app .box {
  width: 100px;
  height: 100px;
  border: 1px solid rgba(0, 0, 0, 0.12);
}
</style>