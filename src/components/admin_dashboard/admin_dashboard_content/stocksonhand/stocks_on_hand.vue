<template>
  <div>
    <div style="margin-top: 30px" class="container">
      <div v-show="criticalquantityshow">
        <el-alert
          style="margin-top: 20px; margin-bottom: 30px"
          title="Product on critical quantity"
          type="error"
          effect="dark"
          :closable="false"
          description="There is a product with 0 quantity. please check"
          show-icon
        >
        </el-alert>
      </div>

      <el-card style="margin-top: 30px; margin-bottom: 30px" shadow="always">
        <el-alert
          style="margin-top: 20px; margin-bottom: 30px"
          title="Adding new stocks"
          type="info"
          effect="dark"
          :closable="false"
          description="If you want to add new product stock you need to navigate on inventory and stocks page.."
          show-icon
        >
        </el-alert>
        <h4>List of products</h4>
        <div class="row">
          <div class="col-sm">
            <el-input
              style="margin-bottom: 5px; width: 100%"
              placeholder="Search"
              v-model="searchable"
              clearable
            >
            </el-input>
          </div>
          <div class="col-sm">
            <el-checkbox @change="onsortofexpired" v-model="sortofexpired"
              >Expired products</el-checkbox
            >
          </div>
          <div class="col-sm">
            <el-select
              style="width: 100%"
              @change="onfiltercategory"
              v-model="optionsfilterval"
              filterable
              placeholder="Select category"
            >
              <el-option
                v-for="item in optionscategory"
                :key="item.categoryname"
                :label="item.categoryname"
                :value="item.categoryname"
              >
              </el-option>
            </el-select>
          </div>
          <div class="col-sm">
            <el-button
              @click="onfetchall()"
              type="primary"
              size="medium"
              plain
              round
            >
              Fetch All
            </el-button>
          </div>
          <div class="col-sm">
            <el-button
              @click="onredirecttoadding()"
              type="success"
              style="float: right; margin-bottom: 10px"
              ><i class="el-icon-circle-plus-outline"></i> Go to 
              Inventory Stocks</el-button
            >
          </div>
        </div>
        <el-table
          :key="0"
          v-loading="listLoading"
          :data="pagedTableData"
          border
          fit
          highlight-current-row
          style="width: 100%"
        >
          <!-- <el-table-column
            label="Stock Number"
            prop="id"
            sortable="custom"
            align="center"
          >
            <template slot-scope="{ row }">
              <span>{{ row.stockNumber }}</span>
            </template>
          </el-table-column> -->

          <el-table-column label="Product Image" align="center">
            <template slot-scope="{ row }">
              <img
                :src="row.productimgurl"
                style="width: 100%; height: auto"
                class="img-fluid"
                alt="No image"
              />
              <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
            </template>
          </el-table-column>

          <el-table-column label="Product Name" align="center">
            <template slot-scope="{ row }">
              <span class="link-type">{{ row.productname }}</span>
              <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
            </template>
          </el-table-column>

          <el-table-column label="Product Quantity" align="center">
            <template slot-scope="{ row }">
              <span class="link-type">{{ row.productquantity }}</span>
              <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
            </template>
          </el-table-column>

          <el-table-column label="Product Category" align="center">
            <template slot-scope="{ row }">
              <span class="link-type">{{ row.productcategory }}</span>
              <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
            </template>
          </el-table-column>

          <el-table-column
            label="Quantity Status"
            class-name="status-col"
            align="center"
          >
            <template slot-scope="{ row }">
              <div v-if="row.productquantity <= 0 || row.productquantity <= 20">
                <el-tag type="danger" size="medium" effect="dark"
                  >Critical</el-tag
                >
              </div>
              <div
                v-else-if="
                  row.productquantity <= 50 || row.productquantity <= 30
                "
              >
                <el-tag type="warning" size="medium" effect="dark"
                  >Warning</el-tag
                >
              </div>
              <div v-else>
                <el-tag type="success" size="medium" effect="dark">Good</el-tag>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="Product Expiration" align="center">
            <template slot-scope="{ row }">
              <div v-if="row.expirationprod == null">
                <el-tag type="danger" size="medium"
                  >No Expiration</el-tag
                >
              </div>
              <div v-else>
                <span class="link-type">{{
                row.expirationprod | moment("MMM DD, YYYY")
              }}</span>
              </div>
            </template>
          </el-table-column>

         
            <div v-if="product_status_indicator == '1'">
            <el-table-column label="Product Status" class-name="status-col">
              <template>
                <div v-if="product_status_indicator == '1'">
                  <center ><el-tag type="danger" size="medium" effect="dark"
                    >Expired</el-tag
                  >
                  </center>
                </div>
                <div v-else></div>
              </template>
            </el-table-column>
          </div>
          
          <div v-else></div>

          <el-table-column label="More actions" align="center">
            <template slot-scope="{ row }">
              <div
                v-if="
                  row.productquantity <= 0 ||
                  row.productquantity <= 20 ||
                  row.productquantity <= 50 ||
                  row.productquantity <= 30
                "
              >
                <div class="row">
                  <div class="col-md-6">
                    <el-button
                        slot="reference"
                        type="warning"
                        size="small"
                        style="margin-left: 75%"
                        plain
                         @click="onAddMore(row.stockID)"
                        >Refill
                      </el-button>
                    <!-- <el-popover placement="left" width="400" trigger="click">
                      <el-card shadow="hover">
                        <div v-show="picker">
                          <center>
                            <h4>Choose loadout</h4>
                            <el-select
                              @change="pickloadout"
                              style="width: 100%; margin-bottom: 10px"
                              v-model="stocksquantityupdaterTask.value"
                              placeholder="Select quantity"
                            >
                              <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                              >
                              </el-option>
                            </el-select>
                          </center>
                          <el-button
                            @click="onsaveselection(row.stockID)"
                            type="primary"
                            style="float: right; margin-bottom: 10px"
                            >Save</el-button
                          >
                        </div>
                        <div v-show="picker1">
                          <center>
                            <h4>Choose loadout</h4>
                            <el-input
                              style="width: 100%; margin-bottom: 10px"
                              placeholder="Please input quantity"
                              @input.native="qtyvalidation"
                              v-model="stocksquantityupdaterTask.custominput"
                              clearable
                              type="text"
                            >
                            </el-input>
                          </center>
                          <div style="display: inline">
                            <el-button
                              @click="onsavecustom(row.stockID)"
                              type="primary"
                              style="float: right; margin-bottom: 10px"
                              :disabled="confirmdisabling"
                              >Save</el-button
                            >
                            <el-button
                              type="warning"
                              style="
                                float: right;
                                margin-bottom: 10px;
                                margin-right: 10px;
                              "
                              @click="oncancel()"
                              >Cancel</el-button
                            >
                          </div>
                        </div>
                      </el-card>
                      
                    </el-popover> -->
                  </div>
                  <div class="col-md-6" style="width: 100%; margin-left: 20%">
                    <br />
                    <el-button
                      @click="onmodifystock(row.stockID, row.productname, row.productcategory, row.expirationprod)"
                      type="info"
                      size="small"
                      plain
                      :disabled="confirmdisabling"
                      >Modify</el-button
                    >
                  </div>
                  <div class="col-md-6" style="width: 100%; margin-left: 20%">
                    <br />
                    <el-button
                      @click="onremovestock(row.stockID)"
                      type="danger"
                      size="small"
                      plain
                      >Remove</el-button
                    >
                  </div>
                </div>
              </div>
              <div v-else-if="row.productquantity >= 50">
                <div class="row">
                  <div class="col-md-6">
                    <el-button
                        slot="reference"
                        type="success"
                        size="small"
                        style="margin-left: 50%"
                        plain
                        @click="onAddMore(row.stockID)"
                        >Add more</el-button>
                   
                  </div>
                  <div class="col-md-6" style="width: 100%; margin-left: 20%">
                    <br />
                    <el-button
                      @click="onmodifystock(row.stockID, row.productname, row.productcategory, row.expirationprod)"
                      type="info"
                      size="small"
                      plain
                      >Modify</el-button
                    >
                  </div>
                  <div class="col-md-6" style="width: 100%; margin-left: 18%">
                    <br /><el-button
                      @click="onremovestock(row.stockID)"
                      type="danger"
                      size="small"
                      plain
                      >Remove</el-button
                    >
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="this.productArray.length"
          @current-change="setPage"
        >
        </el-pagination>
        <!-- el dialog if custom -->
        <el-dialog
          title="Custom input quantity"
          :visible.sync="dialogVisible"
          width="30%"
        >
          <span>This is a message</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="dialogVisible = false"
              >Confirm</el-button
            >
          </span>
        </el-dialog>
        <!-- el dialog end if custom -->
<el-dialog
  title="Stock On Hand Refill"
  :visible.sync="AddMoredialogVisible"
  width="70%"
  :before-close="handleClose">
  <div style="margin-top: 30px;" class="container">
    <el-card shadow="always">
      <h3>Available Refillable Products</h3>
       <el-input
                                style="margin-bottom: 5px; width: 30%; margin-right: 10px"
                                placeholder="Search"
                                v-model="stock_viewsearchable"
                                clearable
                            >
                            </el-input>
                            <el-table
                :data="stock_viewpagedTableData"
                style="width: 100%"
                            >
                                <el-table-column label="Stock Dump Product Name">
                                <template slot-scope="scope">
                                    {{ scope.row.stockDumpName }}
                                </template>
                                </el-table-column>
                                <el-table-column label="Dump Product Quantity" style="width: 100%">
                                <template slot-scope="scope">
                                    {{ scope.row.dumpQuantity }}
                                </template>
                                </el-table-column>
                                <el-table-column label="Expiration">
                                <template slot-scope="scope">
                                    {{ scope.row.dumpExpiration | moment('dddd, MMMM Do YYYY') }}
                                </template>
                                </el-table-column>
                                <el-table-column label="Product Received">
                                <template slot-scope="scope">
                                    {{ scope.row.dumpReceived | moment('dddd, MMMM Do YYYY') }}
                                </template>
                                </el-table-column>
                                <el-table-column label="Actions">
                                <template slot-scope="scope">
                                    <el-button type="warning" size="medium" v-loading.fullscreen.lock="refillfullscreenLoading" @click="onSelectRefill(scope.row.stockDumpId, scope.row.dumpExpiration, scope.row.dumpQuantity, scope.row.dumpId)">SELECT</el-button>
                                </template>
                                </el-table-column>
                            </el-table>
                            <el-pagination
                                layout="prev, pager, next"
                                :page-size="stock_viewpageSize"
                                :total="this.stock_viewproductArray.length"
                                @current-change="stock_viewsetPage"
                            >
                            </el-pagination>
    </el-card>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="AddMoredialogVisible = false">CLOSE</el-button>
  </span>
</el-dialog>
        <!-- dialog for modification -->
          <el-dialog
          title=""
          :visible.sync="dialogVisibleModify"
          width="70%"
          :before-close="handleCloseModify">
          
        <div style="margin-top: 30px" class="container">
            <el-card shadow="always">
              <h3>Stocks on hand modification</h3>
              <div class="row">
                <div class="col-sm">
                  <label>Enter product name</label>
                  <el-input
                  type="text"
                  clearable placeholder="Enter new product name"
                  style="margin-top: 10px; margin-bottom: 10px;"
                  v-model="stockModification.prodName"
                  ></el-input>
                </div>
                <div class="col-sm">
                  <label>Enter product Category</label>
                  <el-select style="width: 100%; margin-top: 10px; margin-bottom: 10px;" v-model="stockModification.prodCategory" filterable placeholder="Select new category">
                <el-option
                  v-for="item in optionsModifyCategory"
                  :key="item.categoryname"
                  :label="item.categoryname"
                  :value="item.categoryname">
                </el-option>
              </el-select>
                </div>
              </div>
              <div class="row">
                <div class="col-sm">
                  <label>Enter product expiration</label>
                  <el-date-picker
                        style=" margin-top: 10px; margin-bottom: 10px; width: 100%;"
                        v-model="stockModification.prodExpiration"
                        format="yyyy/MM/dd"
                        value-format="yyyy/MM/dd"
                        type="date"
                        :picker-options="pickerOptions"
                        placeholder="Select date expiration">
                        </el-date-picker>
                </div>
                <div class="col-sm">
                 
                </div>
              </div>
            </el-card>
        </div>

          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleModify = false">Cancel</el-button>
            <el-button type="primary" @click="onsaveUpdate">Save</el-button>
          </span>
        </el-dialog>
        <!-- end dialog for modification -->
      </el-card>
    </div>
  </div>
</template>

<script>
import {
  STOCK_EMPTY_NOTIF,
  getallstocks,
  pushrefillbyviaselect,
  pushrefillbyviacustom,
  removezerostock,
  sorting_expired_product_stocks, listcategory
} from "@/store/request-common";
import { Chart } from "highcharts-vue";
import Highcharts from "highcharts";
import exportingInit from "highcharts/modules/exporting";
import offlineExporting from "highcharts/modules/offline-exporting";
import { mapGetters } from "vuex";
import TextField from "@/components/TextField/TextField"
import client from "@/store/0AuthRequest"
//import moment from "moment";

exportingInit(Highcharts);
offlineExporting(Highcharts);
export default {
  components: {
    high: Chart, TextField
  },
  data() {
    return {
      stockModification : {
        prodName : '', prodCategory : '', prodExpiration : '', id : ''
      },
      refillfullscreenLoading: false,
      AddMoredialogVisible: false,
      stock_viewsearchable: '', stock_viewpageSize : 5, stock_viewproductArray: [], stock_viewpage: 1,
      optionsModifyCategory: [],
      optionscategory: [],
      optionsfilterval: "",
      dialogVisibleModify: false,
      sortofexpired: false,
      loading: true,
      chartOptions: {
        chart: {
          type: "spline",
        },
        tooltip: {
          valueSuffix: " quantities",
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
          text: "Line Graph",
        },
        title: {
          text: "Stocks Overall Quantities",
        },
      },
      criticalquantityshow: false,
      dialogVisible: false,
      pageSize: 5,
      page: 1,
      listLoading: true,
      searchable: "",
      productArray: [],
      options: [
        {
          value: "100",
          label: "100",
        },
        {
          value: "200",
          label: "200",
        },
        {
          value: "300",
          label: "300",
        },
        {
          value: "400",
          label: "400",
        },
        {
          value: "500",
          label: "500",
        },
        {
          value: "Custom",
          label: "Custom",
        },
      ],
      stocksquantityupdaterTask: {
        value: "",
        custominput: "",
      },
      picker: true, 
      picker1: false,
      product_status_indicator: "",
      confirmdisabling: false,
      pickerOptions: {
         disabledDate(time) {
                        return time.getTime() < Date.now();
                    }
      }
    };
  },
  created() {
    this.getnotifforcritical();
    this.allstocks();
    this.getallcategorylist();
  },
  computed: {
    stock_viewpagedTableData(){
      if (this.stock_viewsearchable) {
        return this.stock_viewproductArray.filter((item) => {
          return this.stock_viewsearchable
            .toLowerCase()
            .split(" ")
            .every(
              (v) =>
                item.stockDumpName.toLowerCase().includes(v) ||
                item.stockDumpNumber.toString().toLowerCase().includes(v)
            );
        });
      } else {
        return this.stock_viewproductArray.slice(
          this.stock_viewpageSize * this.stock_viewpage - this.stock_viewpageSize,
          this.stock_viewpageSize * this.stock_viewpage
        );
      }
    },
    pagedTableData() {
      if (this.searchable) {
        return this.productArray.filter((item) => {
          return this.searchable
            .toLowerCase()
            .split(" ")
            .every(
              (v) =>
                item.productname.toLowerCase().includes(v) ||
                item.stockNumber.toString().toLowerCase().includes(v)
            );
        });
      } else {
        return this.productArray.slice(
          this.pageSize * this.page - this.pageSize,
          this.pageSize * this.page
        );
      }
    },
    ...mapGetters({
      category_mapper: "get_category_list_mapper",
      filter_category_mapper: "get_stocks_by_category",
      getModifiedProductResponse : 'getState_modifyprod'
    }),
  },
  methods: {
    onSelectRefill(id, exp, qty, genid) {
      this.refillfullscreenLoading = true
      setTimeout(() => {
        const req = client.put(`/api/pull-request-product/stocks-refill?dumpid=${id}&currExp=${exp}&qty=${qty}&genid=${genid}`)
        return req.then(({data}) => {
          if(data === 'invalid pull'){
            this.$notify.error({
                title: "Error",
                message: "The product expiration you've selected was behind from the stocks on hand product expiration",
                offset: 100,
              });
              this.refillfullscreenLoading = false
              return false
          } else{
            this.$notify.success({
                title: "Success",
                message: "Successfully refill.",
                offset: 100,
              });
              this.getnotifforcritical();
              this.allstocks();
              this.getallcategorylist();
              this.AddMoredialogVisible = false
              this.refillfullscreenLoading = false
          }
        })
      }, 3000)
    },
    onAddMore: function(id){
      
       client.get(`/api/pull-request-product/refill-list?stockDumpId=${id}`)
        .then(r => {
          this.AddMoredialogVisible = true
          this.stock_viewproductArray = r.data
        })
    },
    handleCloseModify(done) {
        this.$confirm('Are you sure to close this dialog?')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
    onfetchall() {
      this.allstocks();
    },
     getallcategories(){
            listcategory().then(response => {
                this.optionsModifyCategory = response.data
            })
        },
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
    onsaveUpdate: function() {
 this.$confirm(
        "Are you sure you want to modify this product?",
        "Warning",
        {
          cancelButtonText: "No",
          confirmButtonText: "Yes",
          type: "warning",
        }
      ).then(() => {
         const loading = this.$loading({
        lock: true,
        text: "please wait..",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
        setTimeout(() => {
          this.$store.dispatch('actions_modify_stocks', {
            object : this.stockModification
          }).then(() => {
            if(this.getModifiedProductResponse.data === "success update") {
              this.dialogVisibleModify = false
              loading.close()
              this.$notify.success({
                title: "Nicely done!",
                message: "Successfully update.",
                offset: 100,
              });
               this.getnotifforcritical();
    this.allstocks();
    this.getallcategorylist();
            }
            
          })
        }, 3000)
      })
    },
    onmodifystock: function(id, pname, pcategory, pexpiration) {
      this.getallcategories();
     this.dialogVisibleModify = true
    this.stockModification.id = id
    this.stockModification.prodName = pname
    this.stockModification.prodCategory = pcategory
    // this.stockModification.prodExpiration = pexpiration
    },
    onfiltercategory() {
      this.listLoading = true;
      this.$store
        .dispatch(`actions_filter_category_stocks`, {
          val: this.optionsfilterval,
        })
        .then(() => {
          if (this.filter_category_mapper === "Category not exist") {
            this.listLoading = false;
            this.productArray = [];
          } else {
            this.listLoading = false;
            this.productArray = this.filter_category_mapper;
          }
        });
    },
    getallcategorylist() {
      this.$store.dispatch(`actions_get_all_categories_for_stocks`).then(() => {
        this.optionscategory = this.category_mapper;
      });
    },
    onsortofexpired() {
      const loading = this.$loading({
        lock: true,
        text: "please wait..",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      setTimeout(() => {
        sorting_expired_product_stocks(this.sortofexpired).then((res) => {
          if (res.data === "not exist expiry") {
            this.productArray = [];
            this.listLoading = false;
            loading.close();
          } else {
            console.log(res.data);
            this.product_status_indicator = res.data.msg;
            console.log("test" + this.product_status_indicator);
            this.productArray = res.data.bulk;
            this.listLoading = false;
            loading.close();
          }
        });
      }, 1000);
    },
    onredirecttoadding() {
      const loading = this.$loading({
        lock: true,
        text: "Redirecting to stocks and inventory, please wait..",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      setTimeout(() => {
        loading.close();
        this.$router.push({ name: "Product Inventory Add" }).catch(() => {});
      }, 2000);
    },
    onremovestock(id) {
      this.$confirm(
        "This product will be on your archive list, would you like to proceed ?",
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
          client.put(`/api/pull-request-product/stock-to-archive?stockid=${id}`).then((r) => {
            if(r.data === 'success'){
              loading.close()
                  this.$notify.success({
                    title: "Nicely done!",
                    message: "Successfully moved to archive.",
                    offset: 100,
                  });
                  this.allstocks();
            }
          })
          // removezerostock(id).then((resp) => {
          //   if (resp.data === "success remove") {
          //     this.stocksquantityupdaterTask.value = "";
          //     this.stocksquantityupdaterTask.custominput = "";
          //     loading.close();
          //     this.$notify.success({
          //       title: "Nicely done!",
          //       message: "Successfully remove.",
          //       offset: 100,
          //     });
          //     this.allstocks();
          //   }
          // });
        }, 1000);
      });
    },
    onsavecustom(id) {
      if (!this.stocksquantityupdaterTask.custominput) {
        this.$notify.error({
          title: "Oops",
          message: "Empty, please input quantity.",
          offset: 100,
        });
        return false;
      } else if(this.stocksquantityupdaterTask.custominput < 0) {
        this.$notify.error({
          title: "Error",
          message: "Negative value is invalid",
          offset: 100,
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
            pushrefillbyviacustom(this.stocksquantityupdaterTask, id).then(
              (resolve) => {
                if (resolve.data === "success refill") {
                  this.stocksquantityupdaterTask.value = "";
                  this.stocksquantityupdaterTask.custominput = "";
                  loading.close();
                  this.$notify.success({
                    title: "Nicely done!",
                    message: "Successfully refill quantity.",
                    offset: 100,
                  });
                  this.allstocks();
                }
              }
            );
          }, 1000);
        });
      }
    },
    onsaveselection(id) {
      if (!this.stocksquantityupdaterTask.value) {
        this.$notify.error({
          title: "Oops",
          message: "Empty, please choose quantity loadout.",
          offset: 100,
        });
        return false;
      } else if(this.stocksquantityupdaterTask.value < 0) {
         this.$notify.error({
          title: "Error",
          message: "Negative Value is invalid.",
          offset: 100,
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
            pushrefillbyviaselect(this.stocksquantityupdaterTask, id).then(
              (resolve) => {
                if (resolve.data === "success refill") {
                  this.stocksquantityupdaterTask.value = "";
                  this.stocksquantityupdaterTask.custominput = "";
                  loading.close();
                  this.$notify.success({
                    title: "Nicely done!",
                    message: "Successfully refill quantity.",
                    offset: 100,
                  });
                  this.allstocks();
                }
              }
            );
          }, 1000);
        });
      }
    },
    oncancel() {
      this.picker = true;
      this.picker1 = false;
      this.stocksquantityupdaterTask.value = "";
    },
    pickloadout() {
      if (this.stocksquantityupdaterTask.value === "Custom") {
        this.picker = false;
        this.picker1 = true;
      }
    },
    getnotifforcritical() {
      STOCK_EMPTY_NOTIF().then((res) => {
        if (res.data === "empty quantity") {
          this.criticalquantityshow = true;
        } else {
          this.criticalquantityshow = false;
        }
      });
    },
    allstocks() {
      getallstocks().then((res) => {
        var vm = this;

        for (var x = 0; x < res.data.length; x++) {
          var ifExist = 0;
          if (vm.chartOptions.series.length > 0) {
            for (
              var check = 0;
              check < vm.chartOptions.series.length;
              check++
            ) {
              if (
                res.data[x].productname == vm.chartOptions.series[check].name
              ) {
                ifExist = 1;
                check = vm.chartOptions.series.length;
                vm.chartOptions.series = [];
                var data1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                for (
                  var dataCount1 = 0;
                  dataCount1 < res.data.length;
                  dataCount1++
                ) {
                  if (
                    res.data[dataCount1].productname == res.data[x].productname
                  ) {
                    data1[res.data[dataCount1].stockID] =
                      res.data[dataCount1].productquantity;
                  }
                }
                vm.chartOptions.series.push({
                  name: res.data[x].productname,
                  data: data1,
                });
              }
            }
          }
          if (ifExist == 0) {
            var data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (var dataCount = 0; dataCount < res.data.length; dataCount++) {
              if (res.data[dataCount].productname == res.data[x].productname) {
                data[dataCount] = res.data[dataCount].productquantity;
              }
            }
            console.log(data);
            vm.chartOptions.series.push({
              name: res.data[x].productname,
              data: data,
            });
          }
        }
        this.productArray = res.data;
        this.listLoading = false;
        this.getnotifforcritical();
      });
    },
    setPage(val) {
      this.page = val;
    },
    stock_viewsetPage(val) {
      this.stock_viewpage = val
    }
  },
};
</script>