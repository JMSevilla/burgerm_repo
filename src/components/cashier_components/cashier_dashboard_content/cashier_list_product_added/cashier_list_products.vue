<template>
  <div>
    <el-table
        :key="0"
        v-loading="listLoading"
        :data="pagedTableData"
        border
        fit
        highlight-current-row
        style="width: 100%;"

    >
      <el-table-column label="Stock Number" prop="id" sortable="custom" align="center"  >
        <template slot-scope="{row}">
          <span>12345</span>
        </template>
      </el-table-column>

      <el-table-column label="Product Image" align="center">
        <template slot-scope="{row}">
          <img src="https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png" style="width: 100%; height: auto;" class="img-fluid" alt="No image">
          <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
        </template>
      </el-table-column>

      <el-table-column label="Product Name" align="center">
        <template slot-scope="{row}">
          <span class="link-type" >test product name</span>
          <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
        </template>
      </el-table-column>

    </el-table>
    <el-pagination layout="prev, pager, next" :page-size="pageSize" :total="this.productArray.length" @current-change="setPage">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data(){
    return {
      listLoading: false,
      searchable: '',
      productArray : [],
      pageSize: 5,
      page: 1,
    }
  },
  computed: {
    pagedTableData(){
      if(this.searchable){
        return this.productArray.filter((item)=>{
          return this.searchable.toLowerCase().split(' ').every(v => item.productname.toLowerCase().includes(v) || item.stockNumber.toString().toLowerCase().includes(v))
        })
      }else{
        return this.productArray.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
      }
    }
  },
  methods : {
    setPage(val){
      this.page = val
    }
  }
}
</script>