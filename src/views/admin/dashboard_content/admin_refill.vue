<template>
    <div>
       <div class="mt-3">
            <h1>Refill Management</h1>
        <p style="font-size: 15px">Here you can manage your stocks on hand refill management</p>
        <el-alert
            title="Here you can manage your stocks on hand refill management."
            type="success" :closable="false">
        </el-alert>
       </div>
       <div id="testscroll">
           <refillManagement />
       </div>
    
    </div>
</template>

<script>
import refillManagement from "@/components/admin_dashboard/admin_dashboard_content/refillManagement/refillManagement"
export default {
    components: {
        refillManagement
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