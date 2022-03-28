<template>
    <div>
        <div style="margin-top: 100px;" class="container-fluid">
          <el-tabs style="margin-bottom: 20px;" tab-position="left">
        <el-tab-pane label="Refill Management Form">
          <el-card shadow="always">
                <h4>Refill Management Form</h4>
                <span>You can provide all the refill management data here. Also you can refill single product at the same time ! </span>
                <el-steps style="margin-top : 40px;" :active="steps">
                <el-step title="Stock on Hand List" description="Choose product from stock on hand"></el-step>
                <el-step title="Refill Information Modification" description="You can modify the product quantity and expiration here."></el-step>
                <el-step title="Finish" description="Successfully Insert an refill"></el-step>
                </el-steps>

                <div class="container">
                    <div v-if="steps == 1">
                        <el-card style="margin-top: 60px;" shadow="always">
                            <h3>Stocks on Hand List</h3>
                            <el-input
                                style="margin-bottom: 5px; width: 30%; margin-right: 10px"
                                placeholder="Search"
                                v-model="searchable"
                                clearable
                            >
                            </el-input>
                            <el-table
                :data="pagedTableData"
                style="width: 100%"
                            >
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
                                    {{ scope.row.productname }}
                                </template>
                                </el-table-column>
                                <el-table-column label="Product Quantity" style="width: 100%">
                                <template slot-scope="scope">
                                    {{ scope.row.productquantity }}
                                </template>
                                </el-table-column>

                                <el-table-column label="Actions" style="width: 100%">
                                <template slot-scope="scope">
                                    <el-button @click="onSelectStocks(scope.row.productname, scope.row.stockID, scope.row.stockNumber)" type="primary" size="small" plain>Select</el-button>
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
                        </el-card>
                        <el-button @click="onNextStep1()" type="primary" size="small" style="float : right; margin-top: 10px; margin-bottom: 20px;"
                        plain>Next</el-button>
                    </div>
                    <div v-else-if="steps == 2">
                        <el-card style="margin-top: 60px; margin-bottom: 30px;"  shadow="always">
                            <h3>Refill Management Form</h3>
                            <div style="margin-top: 20px;" class="container">
                              <div class="row">
                                <div class="col-sm">
                                  <span>Refill Quantity</span>
                                  <el-input
                                  type="text"
                                  placeholder="Enter refill quantity"
                                  clearable
                                  v-model="generatedConfig.prodquantity"
                                  style="margin-top: 10px; margin-bottom: 10px;"
                                  ></el-input>
                                </div>
                                <div class="col-sm">
                                  <span>Refill Product Expiration</span>
                                     <el-date-picker
                                    style=" margin-top: 10px; margin-bottom: 10px; width: 100%;"
                                    v-model="generatedConfig.expiration"
                                    format="yyyy/MM/dd"
                                    value-format="yyyy/MM/dd"
                                    type="date"
                                    :picker-options="pickerOptions"
                                    placeholder="Select date expiration">
                                    </el-date-picker>
                                </div>
                                <div class="col-sm">
                                  <span>Product Received</span>
                                  <el-date-picker
                                    style=" margin-top: 10px; margin-bottom: 10px; width: 100%;"
                                    v-model="generatedConfig.receiveddate"
                                    format="yyyy/MM/dd"
                                    value-format="yyyy/MM/dd"
                                    type="date"
                                    :picker-options="pickerOptions1"
                                    placeholder="Select date received">
                                    </el-date-picker>
                                </div>
                              </div>
                            </div>
                            <el-button
                            style="float : right; margin-top: 10px; margin-bottom: 10px;"
                            type="primary"
                            plain
                            size="small"
                            @click="onFinishRefill()"
                            v-loading.fullscreen.lock="fullscreenLoading"
                            >Finish</el-button>
                        </el-card>
                        <el-button @click="onPrevious()" type="primary" size="small" style="float : right; margin-top: 10px; margin-bottom: 20px;"
                        plain>Previous</el-button>
                    </div>
                    <div v-else>
                      <el-card style="margin-top: 60px; margin-bottom: 30px;"  shadow="always">
                         <el-alert
                          style="margin-top: 20px; margin-bottom: 30px"
                          title="You're all caught up"
                          type="success"
                          effect="dark"
                          :closable="false"
                          description="You can now check all refill product under refill management list."
                          show-icon
                        >
                        </el-alert>
                        <center>
                          <img
                            src="https://cdn3.iconfinder.com/data/icons/start-up-4/44/box-256.png"
                            alt="No image"
                            style="width: 10%; height: auto; margin-bottom: 20px"
                            class="img-fluid"
                          />
                          <h1>You're all caught up!</h1>
                          <hr />
                          <el-card style="margin-top: 20px" shadow="always">
                            <p style="font-size: 20px">
                              Good job! The refill successfully added
                            </p>
                            <el-button @click="onstartover()" type="primary"
                              >Start over</el-button
                            >
                          </el-card>
                        </center>
                      </el-card>
                    </div>
                </div>
            </el-card>
        </el-tab-pane>
        <el-tab-pane label="Refill Management List">
          <el-card shadow="always">
            <h3>Refill Management List</h3>
            <span>You can view all added refill products here! </span>
             <el-card style="margin-top: 60px;" shadow="always">
                            <h3>Refill Products List</h3>
                            <el-input
                                style="margin-bottom: 5px; width: 30%; margin-right: 10px"
                                placeholder="Search"
                                v-model="refillsearchable"
                                clearable
                            >
                            </el-input>
                            <el-table
                :data="refillpagedTableData"
                style="width: 100%"
                            >
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
                                    {{ scope.row.productname }}
                                </template>
                                </el-table-column>
                                <el-table-column label="Product Quantity" style="width: 100%">
                                <template slot-scope="scope">
                                    {{ scope.row.productquantity }}
                                </template>
                                </el-table-column>

                                <el-table-column label="Actions" style="width: 100%">
                                <template slot-scope="scope">
                                    <el-button @click="onViewRefill(scope.row.stockID)" type="primary" size="small" plain>View Refill</el-button>
                                </template>
                                </el-table-column>
                                
                            </el-table>
                            <el-pagination
                                layout="prev, pager, next"
                                :page-size="refillpageSize"
                                :total="this.refillproductArray.length"
                                @current-change="refillsetPage"
                            >
                            </el-pagination>
                        </el-card>
          </el-card>
        </el-tab-pane>
      </el-tabs>
            <el-dialog
              title="Refill Management List"
              :visible.sync="dialogVisible"
              width="70%"
              :before-close="handleClose">
              <div style="margin-top: 30px;" class="container">
                <h3>All refill product assigned to this product</h3>
                <el-card shadow="always">
                    <el-input
                                style="margin-bottom: 5px; width: 30%; margin-right: 10px"
                                placeholder="Search"
                                v-model="viewsearchable"
                                clearable
                            >
                            </el-input>
                            <el-table
                :data="viewpagedTableData"
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
                                    {{ scope.row.dumpExpiration | moment('MMMM Do YYYY') }}
                                </template>
                                </el-table-column>
                                <el-table-column label="Product Received">
                                <template slot-scope="scope">
                                    {{ scope.row.dumpReceived | moment(' MMMM Do YYYY') }}
                                </template>
                                </el-table-column>
                                
                            </el-table>
                            <el-pagination
                                layout="prev, pager, next"
                                :page-size="viewpageSize"
                                :total="this.viewproductArray.length"
                                @current-change="viewsetPage"
                            >
                            </el-pagination>
                </el-card>
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">Close</el-button>
              </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { getallstocks } from '@/store/request-common'
import client from "@/store/0AuthRequest"
export default {
    data() {
        return { 
            steps : 1,
            searchable: '', refillsearchable: '', multipleSelection: [], pageSize : 5, page : 1, listLoading: true, productArray: [], pageSizeGenerated: 5, pageGenerated : 1,
            refillpageSize: 5,
            refillproductArray: [],
            refillPage : 1,
            viewsearchable: '',
            viewpageSize: 5, viewproductArray: [],
            viewpage: 1,
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
                 generatedForms : [],
                 generatedConfig : {
                     prodquantity : '', expiration : '',
                        receiveddate : '', dumpID : '', dumpProductname : '', dumpNumber : ''
                 },
                 pickerOptions: {
                      disabledDate(time) {
                        return time.getTime() < Date.now();
                    }
                },
                pickerOptions1 : {
                   disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                },
                fullscreenLoading: false,
                dialogVisible: false,
                viewConfig : {
                  id : ''
                }
        }
    },
    computed : {
      viewpagedTableData(){
        if (this.viewsearchable) {
        return this.viewproductArray.filter((item) => {
          return this.viewsearchable
            .toLowerCase()
            .split(" ")
            .every(
              (v) =>
                item.stockDumpName.toLowerCase().includes(v) ||
                item.stockDumpNumber.toString().toLowerCase().includes(v)
            );
        });
      } else {
        return this.viewproductArray.slice(
          this.viewpageSize * this.viewpage - this.viewpageSize,
          this.viewpageSize * this.viewpage
        );
      }
      },
        pagedTableData(){
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
        refillpagedTableData(){
           if (this.refillsearchable) {
        return this.refillproductArray.filter((item) => {
          return this.refillsearchable
            .toLowerCase()
            .split(" ")
            .every(
              (v) =>
                item.productname.toLowerCase().includes(v) ||
                item.stockNumber.toString().toLowerCase().includes(v)
            );
        });
      } else {
        return this.refillproductArray.slice(
          this.refillpageSize * this.refillPage - this.refillpageSize,
          this.refillpageSize * this.refillPage
        );
      }
        },
        pagedTableDataGenerated(){
            return this.multipleSelection.slice(
          this.pageSizeGenerated * this.pageGenerated - this.pageSizeGenerated,
          this.pageSizeGenerated * this.pageGenerated
        );
        }
    },
    created(){
        this.fetchProductAllStock()
        console.log("multiple",this.multipleSelection)
        
    },
    methods : {
      onViewRefill(id) {
        client.get(`/api/pull-request-product/refill-list?stockDumpId=${id}`)
        .then(r => {
          this.dialogVisible = true
          this.viewproductArray = r.data
        })
      },
      onstartover: function(){
        this.steps = 1
        this.generatedConfig.prodquantity = ''
        this.generatedConfig.expiration = ''
        this.generatedConfig.receiveddate = ''
      },
      onPrevious: function() {
        this.steps--;
      },
      onFinishRefill: function(){
        this.$confirm('This will save as your refill. Continue?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.fullscreenLoading = true
          setTimeout(() => {
            const req = client.post(`/api/pull-request-product/refill-entry?dumpprodname=${this.generatedConfig.dumpProductname}
            &dumpid=${this.generatedConfig.dumpID}&dumpNumber=${this.generatedConfig.dumpNumber}&qty=${this.generatedConfig.prodquantity}
            &exp=${this.generatedConfig.expiration}&received=${this.generatedConfig.receiveddate}`)
            return req.then(r => {
              if(r.data === 'success refill') {
                this.$notify.success({
                    title: "Success",
                    message: "Successfully Added",
                    offset: 100,
                  });
                  this.steps++
                  this.fullscreenLoading = false
                  
              } else if(r.data === 'success refill update'){
                this.$notify.success({
                    title: "Success",
                    message: "Successfully Added",
                    offset: 100,
                  });
                  this.steps++
                  this.fullscreenLoading = false
                  
              }
            })
          }, 2000)
        })
      },
      onSelectStocks: function(productname, stockID, stockNumber){
        this.steps++;
        this.generatedConfig.dumpProductname = productname
        this.generatedConfig.dumpID = stockID
        this.generatedConfig.dumpNumber = stockNumber
      },
        setPageGenerated(val){
            this.pageGenerated = val
        },
        onNextStep1: function(){
            if(this.multipleSelection.length == 0){
                this.$notify.error({
                    title: "Error",
                    message: "Invalid, please choose stock on hand",
                    offset: 100,
                  });
                  return false
            }else{
                this.generatedForms.push({
                    prodqty : this.generatedConfig.prodquantity,
                    prodexpiration : this.generatedConfig.expiration,
                    prodReceived: this.generatedConfig.receiveddate
                })
                this.steps++;
            }
        },
        handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log("test 2", val);
      console.log("test", this.multipleSelection);
    },
    getRowKey(row) {
      return row.stockID;
    },
    selectable(row, index) {
      if(row.productstatus === '1'){
          return true
      }else{
          return false
      }
    },
    setPage(val){
        this.page = val
    },
    refillsetPage(val){
      this.refillPage = val
    },
    viewsetPage(val){
      this.viewpage = val
    },
    fetchProductAllStock: function(){
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
        this.refillproductArray = res.data;
        this.listLoading = false;
      });
    }
    }
}
</script>