<template>
    <div>
      <el-input
                                    style="margin-bottom: 5px; width: 30%;"
                                    placeholder="Search"
                                    v-model="searchable"
                                    clearable>
                                    </el-input>
        <table class="table table-hover table-bordered">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col" style="width: 20%;">Image</th>
      <th scope="col">Product Name</th>
      <th scope="col">Product Quantity</th>
      <th scope="col">Product Status</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in pagedTableData" :key="item.stockID">
      <th scope="row">{{item.stockNumber}}</th>
      <td >
          <center><img 
          :src="item.productimgurl"
          alt="No image"
          style="width: 50%; height : auto;"
          class="img-fluid"></center>
      </td>
      <td>
          {{item.productname}}
      </td>
      <td>
          {{item.productquantity}}
      </td>
      <td>
          <el-tag type="danger" size="small" effect="dark">
              Will be deleted after 1 week
          </el-tag>
          </td>
      <td>
          <div style="display: flex;">
              <el-button type="danger" size="small" plain style="width: 100%;">Remove</el-button>
          </div>
      </td>
    </tr>
  </tbody>
</table>
<el-pagination layout="prev, pager, next" :page-size="pageSize" :total="this.listofproductArchives.length" @current-change="setPage">
                                    </el-pagination>
    </div>
</template>

<script>
export default {
    props: {
        listofproductArchives: Array,
    },
    data(){
      return{
        pageSize: 5,
              page: 1,
              searchable:''
      }
    },
    computed:{
    pagedTableData() {
       if(this.searchable){
      return this.listofproductArchives.filter((item)=>{
        return this.searchable.toLowerCase().split(' ').every(v => item.stockNumber.toString().toLowerCase().includes(v))
      })
      }else{
        return this.listofproductArchives.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
      }

     }
},
methods: {
   setPage(val){
        this.page = val
      },
}
}
</script>