<template>
    <div style="margin-top: 100px;" class="container">
        <el-card shadow="always">
            <h3>Inventory Reports</h3>
            <!-- table -->  
      <div style="display : flex;">
                            <el-input type="text" v-model="searchable" clearable style="margin-right : 10px;" placeholder="Search"></el-input>
                            <el-date-picker
                                            style="  margin-bottom: 5px;"
                                            v-model="dateFiltering"
                                            format="yyyy/MM/dd hh:mm:ss A"
                                            value-format="yyyy/MM/dd hh:mm:ss A"
                                            type="datetime"
                                            placeholder="Select date and time">
                                            </el-date-picker> <br>
                        </div>
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
export default {
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
            searchable : '', dateFiltering : null, pageSize: 5, page: 1, inventoryReports: []
        }
    },
    created(){
        this.getInventoryReports()
    },
    methods : {
        getInventoryReports: function() {
           client.get('/api/inventory-reports/get-inventory-reports').then(response => {
               this.inventoryReports = response.data
           })
       },
    },
    setPage(val){
        this.page = val
    }
}
</script>