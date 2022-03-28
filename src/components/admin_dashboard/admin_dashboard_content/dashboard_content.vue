<template>
    <div>
        <div class="container-fluid">
            <div class="container">
                    <div class="row" style="margin-bottom: 20px;">
                    <div class="col-sm">
                        <el-card shadow="always" style="height: 100%;">
                            <div class="row">
                                <div class="col-sm-4">
                                    <img src="https://cdn1.iconfinder.com/data/icons/business-finance-vol-3-39/512/sales_salesman_businessman_selling-256.png"
                            style="width: 90%; margin-top: 10px; height: auto;" class="img-fluid" alt="no image">
                                </div>
                                <div class="col-sm-8">
                                    <h2>Sales Today</h2>
                                    <hr>
                                    <h3>{{ summary.SalesToday }}</h3>
                                </div>
                            </div>
                        </el-card>
                    </div>
                    <div class="col-sm">
                        <el-card shadow="always" style="height: 100%;">
                            <div class="row">
                                <div class="col-sm-4">
                                    <img src="https://cdn0.iconfinder.com/data/icons/seo-web-4-1/128/Vigor_Users-People-Friends-256.png"
                            style="width: 90%; margin-top: 10px; height: auto;" class="img-fluid" alt="no image">
                                </div>
                                <div class="col-sm-8">
                                    <h2>System Users</h2>
                                    <hr>
                                    <h3>{{ summary.SystemUsers }}</h3>
                                </div>
                            </div>
                        </el-card>
                    </div>
                    <div class="col-sm">
                        <el-card shadow="always" style="height: 100%;">
                            <div class="row">
                                <div class="col-sm-4">
                                    <img src="https://cdn-icons-png.flaticon.com/512/5619/5619329.png"
                            style="width: 90%; margin-top: 10px; height: auto;" class="img-fluid" alt="no image">
                                </div>
                                <div class="col-sm-8">
                                    <h2>Total Products</h2>
                                    <hr>
                                    <h3>{{ summary.TotalProducts }}</h3>
                                </div>
                            </div>
                        </el-card>
                    </div>
                   <div class="col-sm">
                        <el-card shadow="always" style="height: 100%;">
                            <div class="row">
                                <div class="col-sm-4">
                                    <img src="https://cdn2.iconfinder.com/data/icons/alert-message/64/exclamation-label-icon-256.png"
                            style="width: 90%; margin-top: 10px; height: auto;" class="img-fluid" alt="no image">
                                </div>
                                <div class="col-sm-8">
                                    <h3>Warning Product Stocks</h3>
                                    <hr>
                                    <h3>{{ summary.WarningProduct }}</h3>
                                </div>
                            </div>
                        </el-card>
                    </div>
                </div>
                <!-- <el-card shadow="always" style="width: 100%; margin-bottom: 30px;">
                     <div id="chart-container"></div> -->
                <!-- </el-card> -->
                </div>
      </div>
      <div class="container">
         <el-card shadow="always">
                                        <div class="row">
                                            <div class="col-md-5">
                                                <h3>Stocks</h3>
                                            </div>
                                            <div class="col-md-7">
                                                
                                            </div>
                                        </div>
                                         <high :options="chartOptions" :redraw="true" ref="changerdata" style="margin-top: 30px;"></high>   
                                    </el-card>
      </div>
  </div>
</template>

<script>
import { getallstocks, getDashboardSummary } from "@/store/request-common"
import { Chart } from 'highcharts-vue'
import Highcharts from "highcharts";
import exportingInit from "highcharts/modules/exporting";
import offlineExporting from "highcharts/modules/offline-exporting";
exportingInit(Highcharts)
offlineExporting(Highcharts)
export default {
   components: {
    high: Chart ,
  },
    data: () => ({
            editableTabsValue: '1',
            editableTabs: [{
            title: 'Dashboard',
            name: '1',
            content: ''
        }],
        tabIndex: 1,
        chartOptions: {
             chart: {
                    type: 'spline'
                },
                tooltip: {
                    valueSuffix: ' quantities',
                    crosshairs: true,
          shared: true
                },
                credits: {
          enabled: false
        },
                plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
                series: [],
                    subtitle: {
                    text: 'Line Graph'
                },
                title: {
                    text: 'Stocks Overall Quantities'
                }
            },
            productArray: [],
            listLoading: false,
            summary: []
    }),
    created(){
        this.allstocks();
        this.getSummary();
    },
    methods: {
        getSummary() {
            getDashboardSummary().then(response => {
                this.summary = response.data
                console.log(response.data);
            })
        },
        allstocks(){
            getallstocks().then(res => {
                
                var vm = this;
                
                for(var x = 0; x < res.data.length; x++){
                    var ifExist = 0;
                    if(vm.chartOptions.series.length > 0)
                    {
                        for(var check = 0;check < vm.chartOptions.series.length; check++) {
                            if(res.data[x].productname == vm.chartOptions.series[check].name){
                                ifExist = 1;
                                check = vm.chartOptions.series.length;
                                vm.chartOptions.series = []
                                 var data1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                                    for(var dataCount1 = 0; dataCount1 < res.data.length; dataCount1++){
                                        if(res.data[dataCount1].productname == res.data[x].productname){
                                            data1[res.data[dataCount1].stockID] = res.data[dataCount1].productquantity
                                        }
                                    }
                                vm.chartOptions.series.push({
                                    name: res.data[x].productname,
                                    data: data1
                                })
                            }
                        }
                    }
                    if(ifExist == 0){
                        var data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                        for(var dataCount = 0; dataCount < res.data.length; dataCount++){
                            if(res.data[dataCount].productname == res.data[x].productname){
                                data[dataCount] = res.data[dataCount].productquantity
                            }
                        }
                        console.log(data)
                        vm.chartOptions.series.push({
                            name: res.data[x].productname,
                            data: data
                        })
                    }
                }
                this.productArray = res.data
                this.listLoading = false;
            })
        },
    }
    
}
</script>