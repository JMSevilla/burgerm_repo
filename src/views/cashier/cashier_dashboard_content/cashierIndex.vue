<template>
  <div>
    <div class="container-fluid" style="margin-top: 100px">
      <div class="row">
        <div class="col-sm">
              <productAddedList/>
        </div>
        <div class="col-sm">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import productAddedList from "@/components/cashier_components/cashier_dashboard_content/cashier_list_product_added/cashier_list_products"
export default {
  components : {
    productAddedList
  }
}
</script>