<template>
    <div>
        <div class="mt-3">
            <h3>Product Sales</h3>
        <p>Here you can check your product sales.</p>
        <el-alert
            title="Sales."
            type="success" :closable="false">
        </el-alert>
        </div>
        <div id="testscroll">
            <ProductSales />
        </div>
    </div>
</template>

<script>
import ProductSales from "@/components/admin_dashboard/admin_dashboard_content/sales/prodsales"
export default {
    components: {
        ProductSales
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