<template>
  <div>
    <div style="margin-top: 30px; margin-bottom: 30px" class="container">
      <!-- <el-card shadow="always" style="margin-bottom: 20px;">
      <div class="row">
        <div class="col-md-5">
          <h3>Product Activation Graph</h3>
        </div>
        <div class="col-md-7">
          <el-switch
              @change="onswitchgraphview"
              style="display: block"
              v-model="filtergraph"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="Active"
              inactive-text="Inactive">
          </el-switch>
        </div>
      </div>
      <high :options="chartOptions" :redraw="true" style="margin-top: 30px;"></high>
    </el-card> -->
      <el-card shadow="always">
        <h3>List of Final Product</h3><br>
        <el-input
          style="margin-bottom: 5px; width: 30%; margin-right: 10px"
          placeholder="Search"
          v-model="searchable"
          clearable
        >
        <br>
        </el-input>

       
        <el-table
          v-loading="listLoading"
          ref="filterTable"
          :data="pagedTableData"
          style="width: 100%"
        >
       
          <el-table-column
            label="Product Image"
            prop="id"
            
            align="center"
          >
            <template slot-scope="{ row }">
              <img
                :src="row.prodimg"
                alt="No image"
                style="width: 50%; height: auto"
                class="img-fluid"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="Product Name"
            
            align="center"
          >
            <template slot-scope="{ row }">
              <span>{{ row.prodname }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="Product Category"
            
            align="center"
          >
            <template slot-scope="{ row }">
              <span>{{ row.prodcategory }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="Product Quantity"
            
            align="center"
          >
            <template slot-scope="{ row }">
              <span>{{ row.prodquantity }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="Product Indicator"
            
            align="center"
          >
            <template slot-scope="{ row }">
             <div v-if="row.issolo === '1'">
               <el-tag type="success">SOLO</el-tag>
             </div>
             <div v-else-if="row.issolo === '2'">
                 <el-tag type="warning">BUY 1 TAKE 1</el-tag>
             </div>
             <div v-else>
                 <el-tag type="info">BOX OF 6</el-tag>
             </div>
            </template>
          </el-table-column>
          <el-table-column
            width="270"
            fixed="right"
            label="Operations"
            
            align="center"
          >
            <template slot-scope="{ row }">
              <div v-if="row.prodstatus == 1">
                <!-- <el-button size="small" type="danger" @click="ondeactivate(row.id)">Deactivate</el-button>&nbsp; -->
                <!-- <el-button size="small" type="danger" @click="onremove(row.id, row.productCode, row.prodquantity)">Remove</el-button>&nbsp; -->
                <el-popover placement="left" width="550" trigger="click">
                  <div class="container">
                    <el-card shadow="always">
                      <h3>Ingredients List</h3>
                      <table class="table table-hover table-bordered">
                        <thead>
                          <tr>
                            <th scope="col" align="center">Ingredient/s Name</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="item in listofingredients"
                            :key="item.productCode"
                          >
                            <td>{{ item.productName }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </el-card>
                  </div>

                  <el-button
                    @click="ongetrawmats(row.productCode)"
                    slot="reference"
                    size="small"
                    type="info"
                    >View ingredients</el-button
                  >
                </el-popover>

                <div class="col-md-6" style="width: 100%; margin-left: 65px">

                  <el-button

                      slot="reference"
                      type="warning"
                      size="small"
                      style="width: 65%; margin-top: 10%"
                      plain
                     @click="onRefill(row.id, row.prodquantity)"
                      >Refill
                    </el-button>

                </div>

                <div class="col-md-6" style="width: 100%; margin-left: 65px">
                  <el-button
                    @click="onRemoveProduct(row.id)"
                    type="danger"
                    size="small"
                    style="width: 100%; margin-top: 10%"
                    plain
                    >Remove</el-button
                  >
                </div>
              </div>

              <div v-else>
                <!-- <el-button size="small" @click="onactivate(row.id)" type="success">Activate</el-button>&nbsp; -->
                <!-- <el-button size="small" @click="onremove(row.id, row.productCode, row.prodquantity)" type="danger">Remove</el-button>&nbsp; -->

                <el-popover placement="left" width="550" trigger="click">
                  <div class="container">
                    <el-card shadow="always">
                      <h3>Ingredients List</h3>
                      <table class="table table-hover table-bordered">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Product Name</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="item in listofingredients"
                            :key="item.productCode"
                          >
                            <th scope="row">{{ item.productCode }}</th>
                            <td>{{ item.productName }}</td>
                          </tr>
                        </tbody>
                      </table>
                      <!-- <el-pagination layout="prev, pager, next" :page-size="pageSizeRaw" :total="this.listofingredients.length" @current-change="setPageraw">
                                    </el-pagination> -->
                    </el-card>
                  </div>

                  <el-button
                    @click="ongetrawmats(row.productCode)"
                    slot="reference"
                    size="small"
                    type="info"
                    style="margin-bottom: -10%"
                  >
                    View ingredients
                  </el-button>
                </el-popover>

                <div class="col-md-6" style="width: 100%; margin-left: 80px">
                  <el-button
                      slot="reference"
                      type="warning"
                      size="small"
                      style="width: 65%; margin-top: 10%"
                      plain
                      @click="onRefill(row.id, row.prodquantity)"
                      >Refill
                    </el-button>
                </div>

                <div class="col-md-6" style="width: 100%; margin-left: 80px">
                  <el-button
                    @click="onRemoveProduct(row.id)"
                    type="danger"
                    size="small"
                    style="width: 65%; margin-top: 10%"
                    plain
                    >Remove</el-button
                  >
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="this.tableData.length"
          @current-change="setPage"
        >
        </el-pagination>

      <el-dialog
        title="Refill Product Validation Area"
        :visible.sync="RefillVisible"
        width="60%"
        :before-close="handleClose">
        <div style="margin-top: 20px;" class="container">
           <el-alert
            title="Pull out quantity exceeds inventory"
            type="error"
            :description="showErrorDescription"
            v-show="showErrorIndicator"
            style="margin-bottom: 30px;"
            :closable="false"
            show-icon>
          </el-alert>
          <div style="display: inline;">
            <el-input
            style="margin-bottom: 5px; width: 30%; margin-right: 30px"
            placeholder="Search"
            v-model="refillsearchable"
            clearable
          >
          </el-input>
          <span style="margin-right: 10px">Enter Quantity :</span>
          <el-input
            style="margin-bottom: 5px; width: 30%; margin-right: 10px"
            placeholder="Quantity"
            v-model="taskRefill.Quantity"
            clearable
            @input.native="pulloutqty"
            type="text"
          >
          </el-input>
          </div>
          <el-table
                ref="multipleTable"
                :data="refillPagedTable"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                :row-key="getRowKey"
                
              >
                <el-table-column
                  :selectable="selectable"
                  :reserve-selection="true"
                  type="selection"
                >
                </el-table-column>
                <el-table-column label="Product Image">
                  <template slot-scope="scope">
                    <img
                      :src="scope.row.productimgurl"
                      alt="No image"
                      style="width: 50%; height: auto"
                      class="img-fluid"
                    />
                  </template>
                </el-table-column>
                <el-table-column label="Product Name">
                  <template slot-scope="scope">
                    {{ scope.row.productName }}
                  </template>
                </el-table-column>
                <el-table-column label="Product Quantity" style="width: 100%">
                  <template slot-scope="{row}">
                    {{ row.product_quantity }}
                  </template>
                </el-table-column>
                
              </el-table>
              <el-pagination
                layout="prev, pager, next"
                :page-size="fillpageSize"
                :total="this.allstockslist.length"
                @current-change="setPageRefill"
              >
              </el-pagination>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="RefillVisible = false">Cancel</el-button>
          <el-button v-loading.fullscreen.lock="fullscreenLoading" :disabled="disableBtnConfirm" type="primary" @click="onConfirmRefill()">Confirm</el-button>
        </span>
      </el-dialog>

      </el-card>
    </div>
  </div>
</template>

<script>
import {
  getallfinalize,
  graphcheck,
  activate_product_finalization,
  deactivate_product_finalization,
  getactivatedproducts,
  getdeactivatedproducts,
  removeproductfinalization,
  getrawpercreatedproducts,
  getallproductfinalize,
  ascendquantity,
  deleteFinalizedProduct,
  updateProductQuantity,
  getallstocksfinalization
} from "@/store/request-common";
import { Chart } from "highcharts-vue";
import Highcharts from "highcharts";
import exportingInit from "highcharts/modules/exporting";
import offlineExporting from "highcharts/modules/offline-exporting";
import client from "@/store/0AuthRequest"
exportingInit(Highcharts);
offlineExporting(Highcharts);
import { mapGetters } from "vuex";
export default {
  name: "product_activator_final",
  components: {
    high: Chart,
  },
  data() {
    return {
      disableBtnConfirm : true,
      showErrorIndicator : false,
      showErrorDescription: '',
      taskRefill: {
        Quantity: undefined,
        currentQuantity : '',
        TotalQuantity : '',
        btnConfirmDisabling: true, refillId: ''
      },
      listofingredients: [],
      searchablerawmats: "",
      listLoadingraw: false,
      prodbulkaction_activation: false,
      tableData: [],
      filtergraph: true,
      searchable: "",
      pageSize: 5,
      page: 1,
      pageSizeRaw: 5,
      pageraw: 1,
      listLoading: true,
      newProductQuantity: "",
      chartOptions: {
        chart: {
          type: "bar",
        },
        tooltip: {
          valueSuffix: " count",
          crosshairs: true,
          shared: true,
        },
        credits: {
          enabled: false,
        },
        plotOptions: {
          series: {
            dataLabels: {
              enabled: true,
            },
          },
        },
        series: [],
        subtitle: {
          text: "Bar Graph",
        },
        title: {
          text: "Activated and Deactivated Products graph",
        },
      },
      confirmdisabling : false,
      RefillVisible : false,
      allstockslist: [],
      refillsearchable: '',
      multipleSelection: [],
      fillpageSize: 5,
      fillpage: 1,
      fullscreenLoading: false
    };
  },
  computed: {
    pagedTableData() {
      if (this.searchable) {
        return this.tableData.filter((item) => {
          return this.searchable
            .toLowerCase()
            .split(" ")
            .every(
              (v) =>
                item.prodname.toLowerCase().includes(v) ||
                item.id.toString().toLowerCase().includes(v)
            );
        });
      } else {
        return this.tableData.slice(
          this.pageSize * this.page - this.pageSize,
          this.pageSize * this.page
        );
      }
    },
    refillPagedTable(){
      
       if(this.refillsearchable){
            return this.allstockslist.filter((item)=>{
                return this.refillsearchable.toLowerCase().split(' ').every(v => item.productName.toString().includes(v))
            })
            }else{
                return this.allstockslist.slice(this.fillpageSize * this.fillpage - this.fillpageSize, this.fillpageSize * this.fillpage)
            }
    },
    ...mapGetters({
      remove_raws: "get_response_product_finalization_raw",
    }),
  },
  created() {
     this.takeallstocks()
    this.getallproductfromfinalize();
    this.trialanderrorgraph();
   this.taskRefill.btnConfirmDisabling = true
  },
  methods: {
    onConfirmRefill: function() {
      this.$confirm('Are you sure you want to refill this product?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.fullscreenLoading = true
          setTimeout(() => {
            const request = client.put(`/api/product-finalization/refill-product?id=${this.taskRefill.refillId}&qty=${this.taskRefill.Quantity}`)
            return request.then(( {data} )=> {
              if(data === 'success refill'){
                this.fullscreenLoading = false
                this.$notify.success({
                  title: 'Success',
                  message: 'Successfully Update',
                  offset: 100
                });
                this.taskRefill.Quantity = null
                this.RefillVisible = false
                this.takeallstocks()
                this.getallproductfromfinalize();
              }
            })
          }, 3000)
        })
    },
    pulloutqty(event){
      const total = parseInt(event.target.value) + parseInt(this.taskRefill.currentQuantity)
      this.taskRefill.TotalQuantity = total
      const number = parseInt(event.target.value)
      event.target.value = number ? number : 0
      if(isNaN(number)){
        this.taskRefill.btnConfirmDisabling = true
        return
      }else{
        if(!number){
   
                this.taskRefill.btnConfirmDisabling = true
            } else if(number < 0){
                this.taskRefill.btnConfirmDisabling = true
            } 
             else{
                this.taskRefill.btnConfirmDisabling = false
            }
      }
    },
    onRefill: function(id, qty) {
      this.RefillVisible = true
      this.taskRefill.currentQuantity = qty;
      this.taskRefill.refillId = id
      //list-integrated-ingredients
      client.get(`/api/product-finalization/list-integrated-ingredients?id=${id}`)
      .then(res => {
        for(var x = 0; x < res.data.length; x++) {
          this.allstockslist  = JSON.parse(res.data[x].integratedRaws)
        }
        
      })
    },
    setPageRefill(val){
      this.fillpage = val
    },
    selectable(row, index) {
      switch(true){
        case this.taskRefill.TotalQuantity > row.product_quantity:
        this.showErrorIndicator = true
        this.disableBtnConfirm = true
        this.showErrorDescription = "You have the current quantity of " + this.taskRefill.currentQuantity + " " + "and based on your desired pull out quantity you will have the total of " + this.taskRefill.TotalQuantity + " " + "that exceeds the quantity below."
        return false;
        default : 
         this.taskRefill.showErrorIndicator = false
         this.disableBtnConfirm = false
        this.taskRefill.showErrorDescription = ""
        return true;
      }
      
    },
    getRowKey(row) {
      return row.productID;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    takeallstocks() {
      getallstocksfinalization().then((resp) => {
        this.allstockslist = resp.data;
        console.log("all inventory", this.allstockslist);
      });
    },
    qtyvalidation(event) {
           
           event.target.value =parseInt(event.target.value, 10)
 if(!event.target.value){
   
                this.confirmdisabling = true
            } else if(event.target.value < 0){
                this.confirmdisabling = true
            } 
             else{
                this.confirmdisabling = false
            }
        },
    ongetrawmats(pcode) {
      getrawpercreatedproducts(pcode).then((res) => {
        getallproductfinalize(pcode).then((respo) => {
          //console.log(respo.data);
          this.listofingredients = respo.data;
        });
      });
    },
    onremove(id, pcode, pquantity) {
      this.$confirm(
        "Are you sure you want to remove this product?",
        "Warning",
        {
          cancelButtonText: "No",
          confirmButtonText: "Yes",
          type: "warning",
        }
      ).then(() => {
        const loading = this.$loading({
          lock: true,
          text: "please wait...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        setTimeout(() => {
          removeproductfinalization(id, pcode).then((response) => {
            if (response.data.msg === "success remove") {
              loading.close();
              this.$notify.success({
                title: "Nicely done!",
                message: "Successfully remove.",
                offset: 100,
              });
              this.getallproductfromfinalize();
              this.trialanderrorgraph();
              ascendquantity(pquantity, response.data.getobj).then(() => {
                this.$store
                  .dispatch(`actions_product_remove_raw`, {
                    pcode,
                  })
                  .then(() => {
                    if (this.remove_raws === "success") {
                      this.$notify.success({
                        title: "Nicely done!",
                        message: "Successfully remove raws.",
                        offset: 100,
                      });
                    }
                  });
              });
            }
          });
        }, 2000);
      });
    },
    onchoosegetall() {
      const loading = this.$loading({
        lock: true,
        text: "please wait...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      setTimeout(() => {
        this.getallproductfromfinalize();
        this.trialanderrorgraph();
        loading.close();
      }, 1000);
    },
    onchoosegetdeactivated() {
      const loading = this.$loading({
        lock: true,
        text: "please wait...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      setTimeout(() => {
        getdeactivatedproducts().then((resp) => {
          this.tableData = resp.data;
          loading.close();
          //console.log(resp.data);
          this.getallproductfromfinalize();
          this.trialanderrorgraph();
        });
      }, 1000);
    },
    onchoosegetactivated() {
      const loading = this.$loading({
        lock: true,
        text: "please wait...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      setTimeout(() => {
        getactivatedproducts().then((resp) => {
          this.tableData = resp.data;
          loading.close();
          //.log(resp.data);
          this.getallproductfromfinalize();
          this.trialanderrorgraph();
        });
      }, 1000);
    },
    ondeactivate(id) {
      this.$confirm(
        "Are you sure you want to deactivate this product?",
        "Warning",
        {
          cancelButtonText: "No",
          confirmButtonText: "Yes",
          type: "warning",
        }
      ).then(() => {
        const loading = this.$loading({
          lock: true,
          text: "please wait...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        setTimeout(() => {
          deactivate_product_finalization(id).then((res) => {
            if (res.data === "success deactivate") {
              loading.close();
              this.$notify.success({
                title: "Nicely done!",
                message: "Successfully deactivated.",
                offset: 100,
              });
              this.getallproductfromfinalize();
              this.trialanderrorgraph();
            }
          });
        }, 3000);
      });
    },
    handleSelectionChange1(val) {
      this.multipleSelection = val;
    },
    onactivate(id) {
      this.$confirm(
        "Are you sure you want to activate this product?",
        "Warning",
        {
          cancelButtonText: "No",
          confirmButtonText: "Yes",
          type: "warning",
        }
      ).then(() => {
        const loading = this.$loading({
          lock: true,
          text: "please wait...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        setTimeout(() => {
          activate_product_finalization(id).then((res) => {
            if (res.data === "success activate") {
              loading.close();
              this.$notify.success({
                title: "Nicely done!",
                message: "Successfully activated.",
                offset: 100,
              });
              this.getallproductfromfinalize();
              this.trialanderrorgraph();
            }
          });
        }, 3000);
      });
    },
    onswitchgraphview() {
      this.trialanderrorgraph();
    },
    trialanderrorgraph() {
      graphcheck(this.filtergraph).then((res) => {
        var vm = this;

        for (var x = 0; x < res.data.bulk.length; x++) {
          var ifExist = 0;
          if (vm.chartOptions.series.length > 0) {
            for (
              var check = 0;
              check <= vm.chartOptions.series.length;
              check++
            ) {
              if (
                res.data.bulk[x].prodname == vm.chartOptions.series[check].name
              ) {
                ifExist = 1;
                check = vm.chartOptions.series.length;
                vm.chartOptions.series = [];
                var data1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                for (
                  var dataCount1 = 0;
                  dataCount1 < res.data.bulk.length;
                  dataCount1++
                ) {
                  if (
                    res.data.bulk[dataCount1].prodname == res.data[x].prodname
                  ) {
                    data1[res.data.bulk[dataCount1].id] = res.data.counter;
                  }
                }
                vm.chartOptions.series.push({
                  name: res.data.bulk[x].prodname,
                  data: data1,
                });
              }
            }
          }
          if (ifExist == 0) {
            var data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (
              var dataCount = 0;
              dataCount < res.data.bulk.length;
              dataCount++
            ) {
              if (
                res.data.bulk[dataCount].prodname == res.data.bulk[x].prodname
              ) {
                data[dataCount] = res.data.counter;
              }
            }
            //console.log(data);
            vm.chartOptions.series.push({
              name: res.data.bulk[x].prodname,
              data: data,
            });
          }
        }
      });
    },

    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.prodstatus === value;
    },
    getallproductfromfinalize() {
      getallfinalize().then((res) => {
        this.tableData = res.data;
        this.listLoading = false;
        console.log(res.data);
      });
    },
    setPage(val) {
      this.page = val;
    },
    setPageraw(val) {
      this.pageraw = val;
    },
    onUpdateProductQuantity(id) {
      if (this.newProductQuantity == 0) {
        this.$notify.error({
          title: "Error",
          message: "Empty, please choose enter valid quantity.",
          offset: 0,
        });
        return false;
      } else if(this.newProductQuantity < 0) {
        this.$notify.error({
          title: "Error",
          message: "Empty, please choose enter valid quantity.",
          offset: 0,
        });
        return false;
      }
      else {
        this.$confirm(
          "Are you sure you want to refill this product?",
          "Warning",
          {
            cancelButtonText: "No",
            confirmButtonText: "Yes",
            type: "warning",
          }
        ).then(() => {
          const loading = this.$loading({
            lock: true,
            text: "please wait...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          setTimeout(() => {
            updateProductQuantity(this.newProductQuantity, id).then((response) => {
                if (response.data === "success refill") {
                  this.newProductQuantity = 0;;
                  loading.close();
                  this.$notify.success({
                    title: "Success!",
                    message: "Successfully refill product.",
                    offset: 0,
                  });
                  this.getallproductfromfinalize();
                }
              }
            );
          }, 1000);
        });
      }
    },
    onRemoveProduct(id) {
      this.$confirm(
        "Are you sure you want to remove this product?",
        "Warning",
        {
          cancelButtonText: "No",
          confirmButtonText: "Yes",
          type: "warning",
        }
      ).then(() => {
        const loading = this.$loading({
          lock: true,
          text: "please wait...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        setTimeout(() => {
          console.log(id);
          deleteFinalizedProduct(id).then((response) => {
            if (response.data === "success delete") {
              loading.close();
              this.$notify.success({
                title: "Success",
                message: "Product removed",
                offset: 100,
              });
              this.getallproductfromfinalize();
            }
          });
        }, 1000);
      });
    },
  },
};
</script>
<style scoped>
.el-table el-table-column:nth-child(odd) {
    background-color: #845353;
}

input[type=number] {
  -moz-appearance: textfield;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>