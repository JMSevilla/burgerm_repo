<template>
  <div>
   <div class="mt-3">
            <h1>Cashier POS</h1>
        <p style="font-size: 15px">Welcome to Cashier POS</p>
        <el-alert
            title="This is your pos, here you can make transaction with customers."
            type="success" :closable="false">
        </el-alert>
       </div>
       <div id="testscroll">
           <Posmain />
       </div>
  </div>
</template>

<script>
import Posmain from "@/components/cashier_components/cashier_dashboard_content/cashier_index_content"
import productAddedList from "@/components/cashier_components/cashier_dashboard_content/cashier_list_product_added/cashier_list_products"
export default {
  components : {
    productAddedList, Posmain
  }
}
</script>

<style scoped>
#testscroll{
    height: 900px;
  overflow: scroll;
  overflow-x: hidden;
}
</style>