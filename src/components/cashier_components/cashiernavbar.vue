<template>
  <div>
    <b-navbar style="padding: 20px" toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">BURGER MANIA &nbsp; <el-tag type="warning" effect="dark" size="small">Cashier Area</el-tag></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
       
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">



          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>{{fullname()}}</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  props: {
    fullname: Function
  }
}
</script>