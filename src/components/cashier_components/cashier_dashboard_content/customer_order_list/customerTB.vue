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
                                    <el-table-column label="Order Code" prop="id" sortable="custom" align="center"  >
                                        <template slot-scope="{row}">
                                        <span>{{ row.orderCode }}</span>
                                        </template>
                                    </el-table-column>
                                    
                                    <el-table-column label="Order Image" align="center">
                                        <template slot-scope="{row}">
                                        <img :src="row.orderImage" style="width: 100%; height: auto;" class="img-fluid" alt="No image">
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                    <el-table-column label="Order Name" align="center">
                                        <template slot-scope="{row}">
                                        <span class="link-type" >{{ row.orderName }}</span>
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                     <el-table-column label="Order Quantity" align="center">
                                        <template slot-scope="{row}">
                                        <span class="link-type" >{{ row.orderQuantity }}</span>
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

                                    
                                    <el-table-column label="Created"  align="center">
                                        <template slot-scope="{row}">
                                        <span>{{ row.createdAt }}</span>
                                        </template>
                                    </el-table-column>

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
                                        <div class="col-sm"></div>
                                        <div class="col-sm">
                                        <el-card shadow="always">
                                            <h3 style="margin-bottom : 20px;">Total Price : &#8369;1000</h3>
                                            <h6>Customer name : </h6>
                                        </el-card>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="row">
                                        <div class="col-md-7">
                                            <el-card style="padding: 30px;" shadow="always">
                                                <div style="margin-bottom : 20px;">
                                                    <h3>Transaction Actions</h3>
                                                    <hr>
                                                </div>
                                              <div style="margin-bottom: 20px;">
                                                  <center>
                                                    <div style="display: inline; ">
                                                     <el-button size="small" type="primary" >
                                                       <i class="el-icon-money"></i> Payment [F1]
                                                   </el-button>
                                                   <el-button size="small" type="success" >
                                                       <i class="el-icon-user"></i> Customer [F2]
                                                   </el-button>
                                                   <el-button size="small" type="warning" >
                                                       <i class="el-icon-document-add"></i> Request Quantity [F3]
                                                   </el-button>
                                                </div>
                                              </center>
                                              </div>
                                               <div>
                                                   <center>
                                                    <div style="display: inline; ">
                                                     <el-button size="small" type="primary" >
                                                       <i class="el-icon-money"></i> Payment [F1]
                                                   </el-button>
                                                   <el-button size="small" type="success" >
                                                       <i class="el-icon-user"></i> Customer [F2]
                                                   </el-button>
                                                   <el-button size="small" type="warning" >
                                                       <i class="el-icon-document-add"></i> Request Quantity [F3]
                                                   </el-button>
                                                </div>
                                              </center>
                                               </div>
                                             </el-card>
                                        </div>
                                        <div class="col-md-5">
                                            <el-card style="padding: 15px;" shadow="always">
                                                <h3>Today's Orders History</h3>
                                                <hr>
                                                <el-timeline>
                                                    <el-timeline-item
                                                    v-for="(activity, index) in activities"
                                                    :key="index"
                                                    :timestamp="activity.timestamp">
                                                    {{activity.content}}
                                                    </el-timeline-item>
                                                </el-timeline>
                                            </el-card>
                                        </div>
                                    </div>
                                    <el-card style="margin-top: 10px;" shadow="always">

                                    </el-card>
                                   
    </div>
</template>

<script>
export default {
    props: {
        passCustomerArray: Array,
        lazyload: Boolean
    },
    data(){
        return {
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
        }
    },
    methods: {
        setPage(val){
            this.page = val
        }
    }
}
</script>