<template>
  <div>
    <table class="table table-hover table-bordered">
  <thead>
    <tr>
      <th scope="col">Fullname</th>
      <th scope="col">Message</th>
      <th scope="col">User Type</th>
      <th scope="col">Archive date</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in datalist" :key="item.id">
      <td>{{item.firstname + " " + item.lastname}}</td>
      <td>{{item.archiveusermessage}}</td>
      <td>
        <div v-if="item.usertype == 1">
          <el-tag type="success" effect="dark" size="small">Administrator</el-tag>
        </div>
        <div v-else-if="item.usertype == 0">
          <el-tag type="warning" effect="dark" size="small">Cashier</el-tag>
        </div>
      </td>
      <td>
        {{item.archiveCreated | moment('calendar')}}
      </td>
      <td>
        <el-button type="warning" size="mini" @click="recovery(item.id, item.client_id)">Recover</el-button>
      </td>
    </tr>
  </tbody>
</table>
  </div>
</template>

<script>
  export default {
    props : {
      datalist: Array,
      recovery: Function
    },
    data(){
      return{
        listoflogsusermanagement: []
      }
    }
  }
</script>
