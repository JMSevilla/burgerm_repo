<template>
    <div style="margin-top: 100px;" class="container">
        <el-card shadow="always">
            <h3>Inventory Reports</h3>
            <!-- table -->  
           
      <div style="display : flex;">
                            <el-input type="text" v-model="searchable" clearable style="margin-right : 10px;" placeholder="Search"></el-input>
                          <label style="margin-right: 10px;">From : </label>
                        <el-date-picker
                        v-model="filterable.fromdate"
                        format="yyyy/MM/dd"
                        value-format="yyyy/MM/dd"
                        type="date"
                        placeholder="Select date from">
                        </el-date-picker> &nbsp; -->
                         <label style="margin-right: 10px;">To : </label>
                        <el-date-picker
                        style="margin-right: 10px;"
                        v-model="filterable.todate"
                        format="yyyy/MM/dd"
                        value-format="yyyy/MM/dd"
                        type="date"
                        placeholder="Select date to">
                        </el-date-picker>
                        <el-button @click="onfilter()" type="primary" size="small" plain>Search</el-button>
                                             
                        </div>
                        <download-excel
              class="btn btn-default"
              :data="invReportsExcel"
              worksheet="My Worksheet"
              name="filename.xls"
          >
                        <el-button @click="onPrintExcel" style="margin-top: 10px; margin-bottom: 20px;" type="primary" size="small" plain>Print Excel</el-button>
                        </download-excel>
                    <table class="table table-outline table-hover">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">BEG</th>
                            <th scope="col">Available</th>
                            <th scope="col">END</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in pagedTableData" :key="item.invID">
                            <th scope="row">{{item.invID}}</th>
                            <td>{{item.productName}}</td>
                            <td>{{item.beg_qty}}</td>
                            <td>{{item.available}}</td>
                            <td>{{item.end_qty}}</td>
                            </tr>
                        </tbody>
                        </table>
                        <el-pagination layout="prev, pager, next" :page-size="pageSize" :total="inventoryReports.length" @current-change="setPage">
                                    </el-pagination>
            <!-- end table -->
        </el-card>
    </div>
</template>

<script>
import client from "@/store/0AuthRequest"
import JsonExcel from "vue-json-excel";
export default {
    components:{
    'download-excel':JsonExcel
  },
    computed : {
        pagedTableData(){
            if(this.searchable){
                return this.inventoryReports.filter((item)=>{
                    return this.searchable.toLowerCase().split(' ').every(v => item.productName.toString().toLowerCase().includes(v))
                })
                }else{
                    return this.inventoryReports.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
                }
        },
    },
    data(){
        return {
            searchable : '', dateFiltering : null, pageSize: 5, page: 1, inventoryReports: [],json_meta: [
            [
              {
                key: "charset",
                value: "utf-8",
              },
            ],
          ],
          invReportsExcel : [],
          filterable: {
              fromdate : '', todate: ''
          }
        }
    },
    created(){
        this.getInventoryReports()
    },
    methods : {
        onfilter: function() {
            client.get(`/api/inventory-reports/filter-inventory-reports?datefrom=${this.filterable.fromdate}&dateto=${this.filterable.todate}`)
            .then((response) => {
                console.log("filter inventory reports", response.data)
                this.inventoryReports = response.data
            })
        },
        getInventoryReports: function() {
           client.get('/api/inventory-reports/get-inventory-reports').then(response => {
               this.inventoryReports = response.data
           })
       },
       onPrintExcel: function(){
           client.get('/api/inventory-reports/get-inventory-reports').then(response => {
               for(var x = 0; x < response.data.length; x++){
               
                this.invReportsExcel.push({
                    PRODUCTNAME: response.data[x].productName,
                    BEG : response.data[x].beg_qty,
                    AVAILABLE : response.data[x].available,
                    END : response.data[x].end_qty
                })
            }
               
           })
           
       }
    },
    setPage(val){
        this.page = val
    }
}
</script>