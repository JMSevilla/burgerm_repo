<template>
    <div>
           <el-input clearable type="text" placeholder="Search" style="margin-top: 10px; margin-bottom: 10px;" v-model="searchable"></el-input>
                                    <el-table
                                    :key="0"
                                    v-loading="propLazyload"
                                    :data="pagedTableData"
                                    border
                                    fit
                                    highlight-current-row
                                    style="width: 100%;"
                                    
                                    >
                                    <el-table-column label="Bundle Code" prop="id" sortable="custom" align="center"  >
                                        <template slot-scope="{row}">
                                        <span>{{ row.bundleCode }}</span>
                                        </template>
                                    </el-table-column>
                                    
                                    <el-table-column label="Bundle Title" align="center">
                                        <template slot-scope="{row}">
                                        <!-- <img :src="row.orderImage" style="width: 100%; height: auto;" class="img-fluid" alt="No image"> -->
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        <span>{{ row.bundleTitle }}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column label="Bundle Integrated Product" align="center">
                                        <template slot-scope="{row}">
                                        <span class="link-type" >{{ row.bundleIntegratedProdFinal }}</span>
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                     <el-table-column label="Bundle Quantity" align="center">
                                        <template slot-scope="{row}">
                                        <span class="link-type" >{{ row.bundleQuantity }}</span>
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                    <el-table-column label="Bundle Price" align="center">
                                        <template slot-scope="{row}">
                                        <span class="link-type" >&#8369;{{ row.prodPrice }}</span>
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>
                                    
                                    <el-table-column label="Created"  align="center">
                                        <template slot-scope="{row}">
                                        <span>{{ row.createdAt }}</span>
                                        </template>
                                    </el-table-column>
                                    </el-table>
                                    <el-pagination layout="prev, pager, next" :page-size="propPageSize" :total="this.propArray.length" @current-change="setPage">
                                    </el-pagination>
    </div>
</template>

<script>
export default {
    props:{
        propPage: Number,
        propLazyload: Boolean,
        propPageSize : Number,
        propArray: Array
    },
    data(){
        return{
            searchable: '',
        }
    },
    computed: {
         pagedTableData(){
            if(this.searchable){
      return this.propArray.filter((item)=>{
        return this.searchable.toLowerCase().split(' ').every(v => item.bundleTitle.toString().toLowerCase().includes(v))
      })
      }else{
        return this.propArray.slice(this.propPageSize * this.propPage - this.propPageSize, this.propPageSize * this.propPage)
      }
        }
    },
    methods:{
        setPage(val){
            this.propPage = val
        }
    }
}
</script>