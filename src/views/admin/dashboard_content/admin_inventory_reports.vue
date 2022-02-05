<template>
    <div>
        <div class="mt-3">
            <h1>Inventory Reports</h1>
        <p style="font-size: 15px">Here you can check the inventory reports.</p>
        <el-alert
            title="Viewing inventory reports."
            type="success" :closable="false">
        </el-alert>
        </div>
        <div id="testscroll">
            <InventoryReports  />
        </div>
        
    </div>  
</template>

<script>
import InventoryReports from "@/components/admin_dashboard/admin_dashboard_content/inventoryReports/inventoryReports"

export default {
    components: {
        InventoryReports
    },
    
    
    
}
</script>

<style scoped>
#testscroll{
    height: 900px;
  overflow: scroll;
  overflow-x: hidden;
}
</style>