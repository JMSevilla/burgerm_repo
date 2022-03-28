<template>
    <div>
         <b-navbar style="padding: 15px" toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="#">{{title}}</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    
  </b-navbar>
    </div>
</template>
<script>
export default {
  props : {
    title : ''
  }
}
</script>