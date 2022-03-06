<template>
    <div>
        <div class="mt-3">
            <h3>Discount Management</h3>
        <p>Here you can discount management.</p>
        <el-alert
            title="Discount Management."
            type="success" :closable="false">
        </el-alert>
        </div>
        <div id="testscroll">
            <Discount />
        </div>
    </div>
</template>

<script>
import Discount from "@/components/admin_dashboard/admin_dashboard_content/DiscountManagement/discountManagement"
export default {
    components: {
        Discount
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