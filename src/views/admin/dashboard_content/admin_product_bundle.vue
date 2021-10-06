<template>
    <div>
        <div class="mt-3">
            <h1>Product Bundle</h1>
        <p style="font-size: 15px">Here you can create product bundle.</p>
        <el-alert
            title="Product Bundle"
            type="success" :closable="false">
        </el-alert>
        </div>
    <div id="testscroll">
        <ProductBundle />
    </div>
    </div>
</template>

<script>
import ProductBundle from "@/components/admin_dashboard/admin_dashboard_content/prodbundle/productbundle"
export default {
    components: {
        ProductBundle
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