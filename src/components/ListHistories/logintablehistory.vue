<template>
    <div>
      <el-input
                                    style="margin-bottom: 5px; width: 30%;"
                                    placeholder="Search"
                                    v-model="searchable"
                                    clearable>
                                    </el-input>
        <table class="table table-hover table-bordered">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">User Email</th>
      <th scope="col">Login</th>
      <th scope="col">Logout</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in pagedTableData" :key="item.id">
      <th scope="row">{{item.id}}</th>
      <td>{{item.email}}</td>
      <td>
        <div v-if="item.loggedinstatus == 1">
          {{item.logindate | moment('calendar')}}
        </div>
      </td>
      <td>
        <div v-if="item.loggedoutstatus == 0">
          {{item.logoutdate | moment('calendar')}}
        </div>
      </td>
    </tr>
  </tbody>
</table>
<el-pagination layout="prev, pager, next" :page-size="pageSize" :total="this.listofhistorieslogindata.length" @current-change="setPage">
                                    </el-pagination>
    </div>
</template>

<script>
import {listofhistorieslogin} from "@/store/request-common"
import {mapGetters} from 'vuex'
export default {
    props: {
        fetchalllogindatahistories: Array
    },
    data(){
      return{
        listofhistorieslogindata: [],
        pageSize: 15,
              page: 1,
              searchable:''
      }
    },
    computed: {
      ...mapGetters({
        get_response_from_remove_user_login_history: 'get_response_from_remove_user_login_history'
        }),
          pagedTableData() {
       if(this.searchable){
      return this.listofhistorieslogindata.filter((item)=>{
        return this.searchable.toLowerCase().split(' ').every(v => item.email.toLowerCase().includes(v) || item.id.toString().toLowerCase().includes(v))
      })
      }else{
        return this.listofhistorieslogindata.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
      }

     }
    },
    created(){
      this.getallhistoriesforuserlogin()
    },
    methods: {
      setPage(val){
        this.page = val
      },
    getallhistoriesforuserlogin(){
listofhistorieslogin().then(response => {
            this.listofhistorieslogindata = response.data
            console.log(response.data)
        })
    },
    onremovehistory(id){
        this.$confirm('This will permanently delete the data. Continue?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
            const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          setTimeout(() => {
           this.$store.dispatch('ACTIONS_REMOVE_LOGIN_HISTORY', {
             self: this,
             id,
             loading
           })
          }, 3000)
        })
    },
    removehistory_response(loading){
      if(this.get_response_from_remove_user_login_history === "invalid id"){
        loading.close()
        this.$notify.error({
                            title: 'Error',
                            message: 'Invalid id',
                            offset: 100
                            });
                            return false
      }else{
        loading.close()
        this.$notify.success({
                            title: 'Success',
                            message: 'Successfully removed',
                            offset: 100
                            });
                            this.getallhistoriesforuserlogin()

      }
    }
    }
}
</script>
