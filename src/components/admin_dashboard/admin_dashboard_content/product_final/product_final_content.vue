<template>
  <div>
    <div style="margin-top: 30px" class="container">
      <el-steps :active="activesteps" align-center>
        <el-step
          title="Product finalization / adding"
          description="Create a product finalization"
        ></el-step>
        <el-step
          title="Select raw products/ingredients"
          description="Select raw products, this will deduct the quantity based on your input."
        ></el-step>
        <el-step
          title="Finish"
          description="Product successfully created"
        ></el-step>
      </el-steps>
      <div v-if="activesteps == 0" style="margin-top: 20px">
        <el-card shadow="always">
          <el-form ref="productFinalizationField">
          <h4>Add Product Finalization</h4>
          <el-alert
            style="margin-top: 20px; margin-bottom: 30px"
            title="Product finalization"
            type="info"
            effect="dark"
            :closable="false"
            description="You can finalize here your product and choose raw materials for it and this may appear on your POS system."
            show-icon
          >
          </el-alert>
          <center>
            <el-avatar
              shape="square"
              :size="100"
              fit="fill"
              style="margin-bottom: 3px"
              :src="taskfinalization.productImageUrl"
            ></el-avatar>
            <p style="color: gray">
              Preview of image will appear after the uploading.
            </p>
            <input
              type="file"
              class="btn btn-outline-primary"
              style="margin-bottom: 6px"
              @change="previewImage"
              accept="image/*"
            />
            <el-progress
              :text-inside="true"
              style="margin-bottom: 10px"
              :stroke-width="26"
              :percentage="uploadpercent"
            ></el-progress>
            <el-button
              type="primary"
              style="margin-bottom: 10px"
              plain
              @click="onupload()"
              >Upload now</el-button
            >
          </center>
          <label>Enter product name</label>
          <el-input
            ref="productName"
            style="margin-bottom: 20px" 
            placeholder="Please input"
            v-model="taskfinalization.prodname"
            clearable
          >
          </el-input>

          <label>Enter product final price</label>
          <el-input
            ref="productPrice"
            style="margin-bottom: 20px"
            placeholder="Please input"
            type="text"
            v-model="taskfinalization.prodprice"
            @input.native="validateqty"
            clearable
          >
          </el-input>

          <label>Select product category</label>
          <el-select
            ref="productCategory"
            style="width: 100%; margin-bottom: 20px"
            v-model="taskfinalization.prodcategory"
            filterable
            placeholder="Select"
          >
            <el-option
              v-for="item in options"
              :key="item.categoryname"
              :label="item.categoryname"
              :value="item.categoryname"
            >
            </el-option>
          </el-select>

          <label>Enter product quantity</label>
          <el-input
            ref="productQuantity"
            placeholder="Please input quantity"
            type="text"
            @input.native="validateqty"
            v-model="taskfinalization.prodquantity"
            clearable
          >
          </el-input>

          <label>Product Indicator</label>
           <el-select style="width: 100%; margin-bottom: 20px; margin-top: 10px;" v-model="taskfinalization.prodIsSolo" filterable placeholder="Select Indicator">
              <el-option
                v-for="item in optionsIndicator"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

          <el-button
            @click="onstartover()"
            type="info"
            plain
            style="
              margin-bottom: 20px;
              margin-top: 20px;
              margin-right: auto;
              margin-left: auto;
            "
            >Clear</el-button
          >
          <el-button
            @click="onnextfinalization()"
            :disabled="nextDisabling"
            type="primary"
            plain
            style="float: right; margin-bottom: 20px; margin-top: 20px"
            >Next</el-button
          >
          </el-form>
        </el-card>
      </div>
      <div v-else-if="activesteps == 1" style="margin-top: 20px">
        <div class="container-fluid">
          <el-input
            style="margin-bottom: 5px; width: 30%; margin-right: 10px"
            placeholder="Search"
            v-model="searchable"
            clearable
          >
          </el-input>
          <el-select
            @change="onselectfilter"
            style="margin-right: 10px"
            v-model="filtervalue"
            filterable
            placeholder="Select"
          >
            <el-option
              v-for="item in filteroptions"
              :key="item.categoryname"
              :label="item.categoryname"
              :value="item.categoryname"
            >
            </el-option>
          </el-select>
          <el-button @click="ongetall()" type="warning" plain
            >Get All</el-button
          >
          <div class="row">
            <el-card shadow="always">
              <el-table
                ref="multipleTable"
                :data="pagedTableData"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                :row-key="getRowKey"
              >
                <el-table-column
                  :selectable="selectable"
                  :reserve-selection="true"
                  type="selection"
                >
                </el-table-column>
                <el-table-column label="Product Image">
                  <template slot-scope="scope">
                    <img
                      :src="scope.row.productimgurl"
                      alt="No image"
                      style="width: 50%; height: auto"
                      class="img-fluid"
                    />
                  </template>
                </el-table-column>
                <el-table-column label="Product Name">
                  <template slot-scope="scope">
                    {{ scope.row.productName }}
                  </template>
                </el-table-column>
                <el-table-column label="Product Quantity" style="width: 100%">
                  <template slot-scope="scope">
                    {{ scope.row.product_quantity }}
                  </template>
                </el-table-column>
                
              </el-table>
              <el-pagination
                layout="prev, pager, next"
                :page-size="pageSize"
                :total="this.allstockslist.length"
                @current-change="setPage"
              >
              </el-pagination>
            </el-card>
           
          </div>
        </div>
        <div style="display: inline">
          <el-button
            @click="onnextfinalization1()"
            type="primary"
            plain
            style="float: right; margin-bottom: 20px; margin-top: 20px"
            >Next</el-button
          >
          <el-button
            @click="onpreviousfinalization()"
            type="primary"
            plain
            style="
              float: right;
              margin-bottom: 20px;
              margin-top: 20px;
              margin-right: 10px;
            "
            >Previous</el-button
          >
        </div>
      </div>
      <div v-else-if="activesteps == 3" style="margin-top: 20px">
        <div class="container">
          <el-card shadow="always">
            <el-alert
              style="margin-top: 20px; margin-bottom: 30px"
              title="You're all caught up"
              type="success"
              effect="dark"
              :closable="false"
              description="You can now activate the product you've created. The activated product may appear on POS System."
              show-icon
            >
            </el-alert>
            <center>
              <img
                src="https://cdn3.iconfinder.com/data/icons/start-up-4/44/box-256.png"
                alt="No image"
                style="width: 10%; height: auto; margin-bottom: 20px"
                class="img-fluid"
              />
              <h1>You're all caught up!</h1>
              <hr />
              <el-card style="margin-top: 20px" shadow="always">
                <p style="font-size: 20px">
                  Good job! The product you've created, may appear on your Point of Sales
                  System.
                </p>
                <el-button @click="onstartover()" type="primary"
                  >Start over</el-button
                >
              </el-card>
            </center>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  prod_final_get_all_categories,
  getalllistfinalcateg,
  filterrawmats,
  addproductfinal,
  getallstocksfinalization,
  selectedrawmat,
  listofselectedrawmat,
  getridselection,
  getallpcodeforselectedraw,
  product_quantity_deduction,
  clearallraws,
  product_finalization_history_raw_mats,
} from "@/store/request-common";
import firebase from "firebase";
import client from "@/store/0AuthRequest";
export default {
  data() {
    return {
      filtervalue: "",
      filteroptions: [],
      options: [],
      tableData: [],
      multipleSelection: [],
      uploadpercent: 0,
      activesteps: 0,
      img1: "",
      imageData: "",
      taskfinalization: {
        prodname: "",
        prodquantity: 0,
        prodprice: 0,
        prodcategory: "",
        productImageUrl: "",
        prodcode: "",
        prodcustomquantity: "",
        prodIsSolo: ''
      },
      allstockslist: [],
      pageSize: 5,
      page: 1,
      listLoading: true,
      searchable: "",
      listofrawmats: [],
      selectionshit: "selection",
      customQuantityArray: [],
      nextDisabling: false,
       optionsIndicator: [{
          value: '1',
          label: 'Solo'
        }, {
          value: '2',
          label: 'Buy 1 Take 1'
        }, {
          value: '3',
          label: 'Box of 6'
        }],
        
    };
  },
  computed: {
    pagedTableData() {
      if (this.searchable) {
        return this.allstockslist.filter((item) => {
          return this.searchable
            .toLowerCase()
            .split(" ")
            .every((v) => item.productName.toLowerCase().includes(v));
        });
      } else {
        return this.allstockslist.slice(
          this.pageSize * this.page - this.pageSize,
          this.pageSize * this.page
        );
      }
    },
  },
  created() {
    this.getallprodcategfinal();
    this.getallcategories();
    this.makeid(10);
    this.takeallstocks();
    this.allrawmats();
  },
  methods: {
    validateqty(event){
      const number = parseInt(event.target.value)
      event.target.value = number ? number : 0
      if(isNaN(number)){
         this.nextDisabling = true
        return
      }else{
        if(!number){
   
                this.nextDisabling = true
            } else if(number < 0){
                this.nextDisabling = true
            } 
             else{
                this.nextDisabling = false
            }
      }
    },
    onsavecustom: function (id, name) {
      const json = this.customQuantityArray;
      json.push({
        quantity: this.taskfinalization.prodcustomquantity,
        prodInvID: id,
        prodIvnName: name,
      });
      this.$confirm(
        "Are you sure you want to save this custom quantity?",
        "Warning",
        {
          cancelButtonText: "Cancel",
          confirmButtonText: "Yes",
          type: "warning",
        }
      ).then(() => {
        const loading = this.$loading({
          lock: true,
          text: "please wait...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        setTimeout(() => {
          const checkreq = client.get(
            `/api/product-finalization/check-custom-quantity/${id}/updating`
          );
          checkreq.then((response) => {
            if (response.data == "exist") {
              const updata = new FormData();
              updata.append("datajson", JSON.stringify(json));
              const upreq = client.put(
                `/api/product-finalization/update-custom-quantity/${id}/updating`,
                updata
              );
              upreq.then((res) => {
                if (res.data == "success update custom") {
                  this.$notify.success({
                    title: "Yey",
                    message: "Successfully Update Custom",
                    offset: 100,
                  });
                  this.taskfinalization.prodcustomquantity = null;
                  loading.close();
                }
              });
            } else {
              const data = new FormData();
              data.append("customJSON", JSON.stringify(json));
              data.append("id", id);
              const req = client.post(
                `/api/product-finalization/update-custom-quantity`,
                data
              );
              req.then(({ data }) => {
                if (data === "success custom add") {
                  loading.close();
                  this.$notify.success({
                    title: "Yey",
                    message: "Successfully Added Custom",
                    offset: 100,
                  });
                  this.taskfinalization.prodcustomquantity = null;
                  this.customQuantityArray = [];
                }
              });
            }
          });
        }, 2000);
      });
    },
    getRowKey(row) {
      return row.productID;
    },
    ongetall: function () {
      const loading = this.$loading({
        lock: true,
        text: "please wait...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      setTimeout(() => {
        this.takeallstocks();
        loading.close();
      }, 1000);
    },
    onselectfilter() {
      const loading = this.$loading({
        lock: true,
        text: "please wait...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      setTimeout(() => {
        filterrawmats(this.filtervalue).then((res) => {
          this.allstockslist = res.data;
          loading.close();
        });
      }, 1000);
    },
    onstartover() {
      this.getallcategories();
      this.makeid(10);
      this.takeallstocks();
      this.allrawmats();
      this.taskfinalization.prodprice = 0;
      this.taskfinalization.prodname = "";
      this.taskfinalization.prodquantity = 0;
      this.taskfinalization.prodcategory = "";
      this.taskfinalization.productImageUrl = "";
      this.activesteps = 0;
    },
    selectable(row, index) {
      if (row.product_quantity < this.taskfinalization.prodquantity) {
        return false;
      } else {
        return true;
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log("test 2", val);
      console.log("test", this.multipleSelection);
    },
    onnextfinalization() {
      if (
        !this.taskfinalization.prodname ||
        !this.taskfinalization.prodprice ||
        !this.taskfinalization.prodcategory ||
        !this.taskfinalization.productImageUrl ||
        !this.taskfinalization.prodquantity
      ) {
        this.$notify.warning({
          title: "Oops",
          message: "Something is empty please try again",
          offset: 100,
        });
        return false;
      } else {
        this.activesteps++;
      }
    },
    onnextfinalization1() {
      this.onsaveproductfinal();
    },
    history_product_finalization() {
      product_finalization_history_raw_mats(
        this.taskfinalization.prodcode,
        this.multipleSelection
      ).then((res) => {
        console.log(res.data);
      });
    },
    onpreviousfinalization() {
      this.activesteps--;
    },
    getallproductcodeforselectedraw() {
      getallpcodeforselectedraw().then((response) => {
        product_quantity_deduction(
          this.taskfinalization.prodquantity,
          response.data
        ).then((resp) => {
          console.log(resp.data);
        });
      });
    },
    onremoveselection(id) {
      this.$confirm(
        "Are you sure you want to remove this product?",
        "Warning",
        {
          cancelButtonText: "Cancel",
          confirmButtonText: "Yes",
          type: "warning",
        }
      ).then(() => {
        const loading = this.$loading({
          lock: true,
          text: "please wait...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        setTimeout(() => {
          getridselection(id).then((resolve) => {
            if (resolve.data === "success") {
              loading.close();
              this.$notify.success({
                title: "Yey",
                message: "Successfully removed",
                offset: 100,
              });
              this.allrawmats();
            }
          });
        }, 2000);
      });
    },
    allrawmats() {
      listofselectedrawmat().then((resolve) => {
        this.listofrawmats = resolve.data;
        console.log(resolve.data);
      });
    },
    onselectraw(pname, stocknumber, pimage) {
      const loading = this.$loading({
        lock: true,
        text: "please wait...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      setTimeout(() => {
        selectedrawmat(pname, stocknumber, pimage).then((resolve) => {
          if (resolve.data === "success") {
            loading.close();
            this.$notify.success({
              title: "Yey",
              message: "Successfully selected",
              offset: 100,
            });
            this.allrawmats();
          } else if (resolve.data === "exist") {
            loading.close();
            this.$notify.warning({
              title: "Oops",
              message: "Raw material already exist",
              offset: 100,
            });
            this.allrawmats();
            return false;
          }
        });
      }, 1000);
    },
    setPage(val) {
      this.page = val;
      console.log("pagination value", val);
      console.log("multiple value", this.multipleSelection);
    },
    //       setPage1(val){
    // this.page = val
    //       },
    takeallstocks() {
      getallstocksfinalization().then((resp) => {
        this.allstockslist = resp.data;
        console.log(this.allstockslist);
      });
    },
    makeid(length) {
      var result = [];
      var characters = "0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result.push(
          characters.charAt(Math.floor(Math.random() * charactersLength))
        );
      }
      return (this.taskfinalization.prodcode = result.join(""));
    },
    cleanselectedraw() {
      clearallraws().then((response) => {
        console.log(response.data);
        this.allrawmats();
      });
    },
    onsaveproductfinal() {
      if (this.taskfinalization.prodprice <= 0) {
        this.$notify.error({
          title: "Oops",
          message: "invalid product quantity or price",
          offset: 100,
        });
        return false;
      } else {
        const loading = this.$loading({
          lock: true,
          text: "please wait...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        setTimeout(() => {
          addproductfinal(this.taskfinalization, this.multipleSelection).then(
            (resolve) => {
              console.log(resolve.data);
              if (resolve.data === "success") {
                loading.close();
                this.$notify.success({
                  title: "Yey",
                  message: "Successfully added to Product Finalized",
                  offset: 100,
                });
                this.getallcategories();
                this.takeallstocks();
                this.allrawmats();
                this.history_product_finalization();
                this.activesteps = 3;
              } else if (resolve.data === "empty") {
                loading.close();
                this.$notify.error({
                  title: "Oops",
                  message: "Something is empty, please try again.",
                  offset: 100,
                });
                return false;
              } else if (resolve.data === "invalid quantity") {
                loading.close();
                this.$notify.error({
                  title: "Oops",
                  message: "Invalid quantity please try again.",
                  offset: 100,
                });
                this.getallcategories();
                this.takeallstocks();
                this.allrawmats();
                return false;
              }
            }
          );
        }, 3000);
      }
    },
    getallprodcategfinal() {
      getalllistfinalcateg().then((response) => {
        this.options = response.data;
      });
    },
    getallcategories() {
      prod_final_get_all_categories().then((response) => {
        this.filteroptions = response.data;
      });
    },
    previewImage(event) {
      this.img1 = event.target.files[0];
      this.uploadpercent = 0;
      this.imageData = event.target.files[0];
    },
    onupload() {
      if (!this.imageData) {
        this.$notify.error({
          title: "Oops",
          message: "Please choose image",
          offset: 100,
        });
        return false;
      }
      const loading = this.$loading({
        lock: true,
        text: "Uploading Image, please wait...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.img1 = null;

      const checkstorage = firebase
        .storage()
        .ref(`${this.imageData.name}`)
        .getDownloadURL()
        .then((resolve) => {
          const ref = firebase
            .storage()
            .ref(`productfinalimages/${this.imageData.name}`);
          ref.put(this.imageData.name).then(() => {
            ref.getDownloadURL().then((url) => {
              loading.close();
              this.$notify.success({
                title: "Yey",
                message: "Successfully Uploaded",
                offset: 100,
              });
              this.taskfinalization.productImageUrl = url;
              this.img1 = url;
            });
          });
        })
        .catch((err) => {
          const storageRef = firebase
            .storage()
            .ref(`productfinalimages/${this.imageData.name}`)
            .put(this.imageData);
          storageRef.on(
            `state_changed`,
            (snapshot) => {
              this.uploadpercent =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            (error) => {
              console.log(error.message);
            },
            () => {
              this.uploadpercent = 100;
              storageRef.snapshot.ref.getDownloadURL().then((url) => {
                loading.close();
                this.$notify.success({
                  title: "Yey",
                  message: "Successfully Uploaded",
                  offset: 100,
                });
                this.taskfinalization.productImageUrl = url;
                this.img1 = url;
              });
            }
          );
        });
    }
  },
};
</script>


<style scoped>
.el-table .warning-row {
  background: "rgb(252, 230, 190)";
}

.el-table .success-row {
  background: "rgb(252, 230, 190)";
}

.el-table .other-row {
  background: "rgb(252, 230, 190)";
}
</style>