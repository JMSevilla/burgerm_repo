<template>
    <div>
        <div style="margin-top: 100px" class="container-fluid">
            <div class="row">
                <div class="col-md-6">
                    <el-card
                    shadow="always">
                        <h3>Product Bundle Form</h3>
                        <center>
                        <el-avatar shape="square" :size="100" fit="fill" style="margin-bottom: 3px;" :src="img1"></el-avatar>
                            <p style="color: gray;">Preview of image will appear after the uploading.</p>
                        <input type="file" class="btn btn-outline-primary" style="margin-bottom: 6px;" @change="previewImage" accept="image/*" />
                        <el-progress :text-inside="true" style="margin-bottom: 10px;" :stroke-width="26" :percentage="uploadpercent"></el-progress>
                        <el-button type="primary" style=" margin-bottom: 10px;" plain @click="onupload()">Upload now</el-button>
                        </center>
                        <span>Bundle Title</span>
                        <el-input
                        clearable
                        placeholder="Enter bundle name"
                        type="text"
                        v-model="bundleTask.bundleTitle"
                        style="margin-top: 10px; margin-bottom: 10px;"
                        @change="watchFieldsIsChange"
                        ></el-input>
                        <div style="display: inline;">
                            <div class="row">
                                <div class="col-sm">
                                    <el-select @change="onselectbundle" v-model="bundleTask.bundlevalue" style="margin-right: 20px;width:100%;" filterable placeholder="Select">
                                        <el-option
                                        
                                        v-for="item in options"
                                        :key="item.prodname"
                                        :label="item.prodname"
                                        :value="item.prodname">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="col-sm">
                                     <el-input
                                     
                                        clearable
                                        placeholder="input quantity of selected product"
                                        type="text"
                                        v-model="bundleTask.bundleQuantity"
                                        style="width:100%;"
                                        ></el-input>
                                </div>
                                <div class="col-sm">
                                    <el-button
                                    style="width:100%;"
                                    type="success"
                                    plain
                                    @click="onvalidatebundle"
                                    :disabled="validateDisable"
                                    >Validate Bundle Details</el-button>
                                </div>
                            </div>
                        </div>
                         <el-input
                            clearable
                            placeholder="input product bundle price"
                            type="text"
                            v-model="bundleTask.bundleprice"
                            style="margin-top: 10px; margin-bottom: 10px;"
                            ></el-input>
                            <div v-if="validateIndicator">
                                <el-button
                        type="primary"
                        plain
                        style="float: right; margin-top: 10px; margin-bottom : 10px;"
                        @click="onaddbundle"
                        >Save</el-button>
                            </div>
                            <div v-else>

                            </div>
                        
                    </el-card>
                </div>
                <div class="col-md-6">
                    <el-card
                    shadow="always">
                        <h3>Product Bundle List</h3>
                        <BundleList 
                        :propPage="page"
                        :propLazyload="lazyload"
                        :propPageSize="pageSize"
                        :propArray="bundleArray"
                        />
                    </el-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import client from "@/store/0AuthRequest"
import BundleList from "./productbundleList.vue"
import firebase from 'firebase';
export default {
    components: {
        BundleList
    },
    data(){
        return{
             options: [],
            bundleTask: {
                bundlevalue: null,
                bundleTitle: null,
                bundleQuantity: null, bundleprice: null, prodinvID: [], bundleImage: null
            },
             
            pageSize: 5,
              page: 1,
              lazyload: true,
              bundleArray: [],
              img1: '',
            imageData: null,
            uploadpercent: 0,
            validateDisable: false,
            validateIndicator: false,
            isvalidationpassed: false
        }
    },
    
    created(){
        this.fetchAllproductfinal()
        this.getallBundle()
    },
    methods: {
        watchFieldsIsChange(){
            // if(this.bundleTask.bundlevalue != null
            // || this.bundleTask.bundleQuantity != null){
            //     this.validateDisable = false
            // }else{
            //     this.validateDisable = true
            // }
        },
        onvalidatebundle: function(){
            this.$vs.loading({
                  type: 'sound'
              })
            setTimeout(() => {
                if(!this.bundleTask.bundlevalue || !this.bundleTask.bundleQuantity){
                this.$notify.error({
                                title: 'Oops',
                                message: 'Select bundle product',
                                offset: 100
                                });
                                this.$vs.loading.close()
                                return false
            }else{
                const req = client.get(`/api/bundle/validate-bundle/${this.bundleTask.bundlevalue}/${this.bundleTask.bundleQuantity}`)
                return req.then(({ data }) => {
                    if(data == "invalid validation"){
                        this.$vs.loading.close()
                        this.$notify.error({
                                title: 'Oops',
                                message: 'Invalid validation',
                                offset: 100
                                });
                                this.bundleTask.bundlevalue = null;
                                this.bundleTask.bundleQuantity = null;
                                return false
                    }else{
                        this.$vs.loading.close()
                        this.$notify.success({
                                title: 'Noice!',
                                message: 'Successfully Validated',
                                offset: 100
                                });
                                this.validateIndicator = true
                                this.validateDisable = true
                                this.isvalidationpassed = true
                    }
                })
            }
            }, 3000)
        },
        previewImage(event) {
            this.uploadpercent = 0;
            this.img1=null;
            this.imageData = event.target.files[0];
        },
        onupload(){
            if(!this.imageData){
                this.$notify.error({
                                title: 'Oops',
                                message: 'Please choose image',
                                offset: 100
                                });
                                return false
            }
            
             const loading = this.$loading({
                    lock: true,
                    text: 'Uploading Image, please wait...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
            this.img1 = null;
             
            const checkstorage = firebase.storage().ref(`${this.imageData.name}`)
            .getDownloadURL()
            .then((resolve) => {
               const ref = firebase.storage().ref(`bundle/${this.imageData.name}`);
               ref.put(this.imageData.name).then(() => {
                   ref.getDownloadURL().then((url) => {
                       loading.close()
                       this.$notify.success({
                                title: 'Yey',
                                message: 'Successfully Uploaded',
                                offset: 100
                                });
                       this.bundleTask.bundleImage = url;
                   })
               })
            }).catch((err) => {
                const storageRef = firebase.storage().ref(`bundle/${this.imageData.name}`).put(this.imageData);
                 storageRef.on(`state_changed`, snapshot => {
                this.uploadpercent = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;

            }, error => {console.log(error.message)},
            () => {
                this.uploadpercent = 100;
                storageRef.snapshot.ref.getDownloadURL().then((url) => {
                    this.img1 = url;
                    loading.close()
                    this.$notify.success({
                                title: 'Yey',
                                message: 'Successfully Uploaded',
                                offset: 100
                                });
                    this.bundleTask.bundleImage = url;
                })
            })
            })
        },
        getallBundle: function(){
            const req = client.get(`/api/bundle/fetchAll-bundle`)
            return req.then(({ data }) => {
                this.bundleArray = data
                this.lazyload = false
                // const check = JSON.parse(data[1].bundleIntegratedProdInvID)
                // for(var x = 0; x < check.length; x++){
                //     console.log(JSON.parse(check[x].integratedRaws))
                // }
            })
        },
        fetchAllproductfinal: function(){
           const req = client.get(`/api/bundle/fetchAll-prodfinal`)
            return req.then(({ data }) => {
                this.options = data
            })
        },
        onselectbundle(){
           const req = client.get(`/api/bundle/get-specific-prod-inv-id/${this.bundleTask.bundlevalue}`)
            return req.then(({ data }) => {
                this.bundleTask.prodinvID = data
                this.bundleTask.bundleQuantity = data[0].prodquantity
            })
        },
        onaddbundle: function(){
            if(!this.bundleTask.bundleTitle || !this.bundleTask.bundlevalue
            || !this.bundleTask.bundleQuantity || !this.bundleTask.bundleprice
            || !this.bundleTask.bundleImage){
                this.$notify.error({
                      title: 'Oops',
                      message: 'Please input fields',
                      offset: 100
                    });
                    return false
            }
            const loading = this.$loading({
                lock: true,
                text: 'please wait...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });
            setTimeout(() => {
            const data = new FormData();
            data.append("title", this.bundleTask.bundleTitle)
            data.append("prodfinal", this.bundleTask.bundlevalue)
            data.append("prodinvID", JSON.stringify(this.bundleTask.prodinvID))
            data.append("bundlequantity", this.bundleTask.bundleQuantity)
            data.append("prodprice", this.bundleTask.bundleprice)
            data.append("prodimg", this.bundleTask.bundleImage)
            const req = client.post(`/api/bundle/add-bundle`, data)
            return req.then(({ data }) => {
                if(data == "success bundle") {
                    loading.close()
                    this.getallBundle()
                    this.$notify.success({
                      title: 'Yey',
                      message: 'Successfully added to Product Bundle',
                      offset: 100
                    });
                    this.validateDisable = false
                    if(this.isvalidationpassed){
                        const req = client.put(`/api/bundle/validate-passed/${this.bundleTask.bundlevalue}/${this.bundleTask.bundleQuantity}`)
                        return req.then(({ data }) => {
                            console.log(data)
                        })
                    }
                }
            })
            }, 3000)
        }
    }
}
</script>