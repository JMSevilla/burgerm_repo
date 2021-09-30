<template>
  <div>
    <cashier_nav :fullname="fullname" />
    <sidenav />
  </div>
</template>

<script>
import cashier_nav from "@/components/cashier_components/cashiernavbar"
import sidenav from "@/components/cashier_components/cashiersidebar"
export default {
  components : {
    cashier_nav, sidenav
  },
  data(){
    return{
      fullNamePlotter : {
        fname : '',
        lname : ''
      }
    }
  },
  created(){
    this.fullname()
  },
  methods : {
    fullname() {
     this.fullNamePlotter.fname = JSON.parse(localStorage.getItem("oauth2_ss::_profileinfo_")).firstname
      this.fullNamePlotter.lname = JSON.parse(localStorage.getItem("oauth2_ss::_profileinfo_")).lastname
      const fullnamegetter = this.fullNamePlotter.fname + " " + this.fullNamePlotter.lname;
     return fullnamegetter
    }
  }
}
</script>