<template>
    <div>
        <div class="container">
            <el-tabs :tab-position="tabPosition" style="height: 100%;">
                <el-tab-pane label="Default Settings">
                    <!-- <el-card shadow="always">
                        <h4>Purchase Order</h4>
                        <hr>
                        <div style="margin-top: 20px;">
                            <el-card shadow="hover">
                                    <div v-show="needtosave">
                                        <el-alert
                                            title="You need to save this new settings update"
                                            type="warning" :closable="false">
                                        </el-alert>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                             <el-switch
                                    style="display: block; margin-bottom: 10px;"
                                    v-model="settings.purchasesettings"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949"
                                    active-text="Enable purchase order"
                                    @change="onenable"
                                    inactive-text="Disable purchase order">
                                    </el-switch>
                                        </div>
                                        <div class="col-md-6">
                                             <el-switch
                                        style="display: block; margin-bottom: 10px;"
                                        v-model="settings.purchasesettings4"
                                        active-color="#13ce66"
                                        inactive-color="#ff4949"
                                        :disabled="ondisable3"
                                        active-text="Multiple Entry"
                                        inactive-text="Single Entry">
                                        </el-switch>
                                        </div>
                                    </div>
                                   
                                        <div class="row">
                                            <div class="col-md-6">
                                                   <el-switch
                                        style="display: block; margin-bottom: 10px;"
                                        v-model="settings.purchasesettings3"
                                        active-color="#13ce66"
                                        inactive-color="#ff4949"
                                        :disabled="ondisable2"
                                        active-text="Enable PO listview"
                                        inactive-text="Disable PO listview">
                                        </el-switch> -->
                                            <!-- </div>
                                            <div class="col-md-6">
                                                
                                            </div>
                                        </div>
                                  
                                       
                                </el-card>
                        </div>
                        <el-button type="primary" plain style="float: right; margin-bottom: 10px; margin-top: 10px;" @click="onsavesettings()">Save</el-button>
                    </el-card> --> 
                    <!-- Inventory Settings -->
                         <el-card shadow="always" style="margin-top: 20px;">
                        <h4>Product Inventory</h4>
                        <hr>
                        <div style="margin-top: 20px;">
                            <el-card shadow="hover">
                                    <div v-show="needtosave1">
                                        <el-alert
                                            title="You need to save this new settings update"
                                            type="warning" :closable="false">
                                        </el-alert>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                             <el-switch
                                    style="display: block; margin-bottom: 10px;"
                                    v-model="settings2.inventorysettings"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949"
                                    @change="onenable1"
                                    active-text="Enable product inventory form"
                                    inactive-text="Disable product inventory form">
                                    </el-switch>
                                        </div>
                                        <div class="col-md-6">
                                              <el-switch
                                    style="display: block; margin-bottom: 10px;"
                                    v-model="settings2.inventorysupplier"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949"
                                    @change="onenable2"
                                    active-text="Enable product supplier"
                                    inactive-text="Disable product supplier">
                                    </el-switch>
                                        </div>
                                    </div>

                                    <div class="row" style="margin-top: 20px;">
                                        <div class="col-md-6">
                                             <el-switch
                                    style="display: block; margin-bottom: 10px;"
                                    v-model="settings2.inventoryexpiration"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949"
                                    @change="onenable3"
                                    active-text="Enable product set expiration"
                                    inactive-text="Disable product set expiration">
                                    </el-switch>
                                        </div>
                                        <div class="col-md-6">
                                            
                                        </div>
                                    </div>
                                   
                                </el-card>
                        </div>
                        <el-button type="primary" plain style="float: right; margin-bottom: 10px; margin-top: 10px;" @click="onsavesettings1()">Save</el-button>
                    </el-card>
                     <!-- <el-card shadow="always" style="margin-top: 20px;">
                          <h4>Product Sizes</h4>
                        <hr>
                        <div class="row">
                            <div class="col-sm">
                                <el-card shadow="always">
                                    <span>Size</span>
                                <el-input
                                placeholder="Enter size"
                                clearable
                                type="text"
                                style="margin-bottom: 10px;"
                                v-model="settings3.sizeInput"
                                ></el-input>
                                <el-button
                                @click="onaddsize"
                                type="primary"
                                plain
                                style="float: right; margin-top: 10px; margin-bottom: 10px"
                                >Save</el-button>
                                </el-card>
                            </div>
                            <div class="col-sm">
                                
                            </div>
                        </div>
                     </el-card> -->
                    <!-- End Inventory Settings -->
                </el-tab-pane>
                <!-- <el-tab-pane label="Config">Config</el-tab-pane>
                <el-tab-pane label="Role">Role</el-tab-pane>
                <el-tab-pane label="Task">Task</el-tab-pane> -->
            </el-tabs>
        </div>
    </div>
</template>

<script>
import {systemsettings, savedsettings, systemsettingsforinventory, getsystemsettingsforinventory} from "@/store/request-common"
import client from "@/store/0AuthRequest"
export default {
    data(){
        return{
            tabPosition: 'left',
            settings3:{
                sizeInput: ''
            },
            settings: {
                purchasesettings: false,
                purchasesettings2: false,
                purchasesettings3: false,
                purchasesettings4: false
            },
            settings2: {
                inventorysettings: false,
                inventorysupplier: false,
                inventoryexpiration: false,
            },
            ondisable1: true,
            ondisable2: true,
            ondisable3: true,
            needtosave: false,
            needtosave1: false
        }
    },
    created(){
        this.getsavedsettings()
        this.getsavedsettingsforinventory()
    },  
    methods: {
        async onaddsize(){
            if(!this.settings3.sizeInput){
                this.$notify.error({
                                title: 'Oops',
                                message: 'Please input size',
                                offset: 100
                                });
                                return false
            }else{
               await this.$confirm('This will add sizes. Continue?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
                }).then(() => {
                    const loading = this.$loading({
                    lock: true,
                    text: 'Saving, please wait...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                    setTimeout(() => {
                         client
                        .post(`/api/size/add/${this.settings3.sizeInput}`)
                        .then(({ data }) => {
                            if(data === "success") {
                                loading.close()
                                this.$vs.notify({title:'Yey',text:'Successfully Added',color:'success',position:'top-right', icon:'highlight_off'})
                            }
                        })
                    }, 3000)
                })
            }
        },
        getsavedsettingsforinventory(){
            getsystemsettingsforinventory()
            .then((resolve) => {
                console.log(resolve.data)
                this.needtosave1 = false;
                if(resolve.data[0].enableinventform == 1){
                    this.settings2.inventorysettings = true;
                    
                } 
                else{
                    this.settings2.inventorysettings = false;
                    
                }
                if(resolve.data[0].enablesupplier == 1){
                    this.settings2.inventorysupplier = true;
                }
                else{
                    
                    this.settings2.inventorysupplier = false;
                }
                if(resolve.data[0].enableexpiration == 1){
                    this.settings2.inventoryexpiration = true;
                }else{
                    this.settings2.inventoryexpiration = false;
                }
            })
        },
        onsavesettings1(){
            this.$confirm('This will save the settings. Continue?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
                }).then(()=> {
                    const loading = this.$loading({
                    lock: true,
                    text: 'Saving, please wait...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                    setTimeout(()=> {
                        systemsettingsforinventory(this.settings2)
                        .then((resolve) => {
                            if(resolve.data === "success update invent"){
                                loading.close()
                                this.$notify.success({
                                title: 'Yey',
                                message: 'Successfully update',
                                offset: 100
                                });
                                this.getsavedsettingsforinventory()
                            }
                        })
                    }, 3000)
                })
        },
        getsavedsettings(){
            savedsettings().then(response => {
                this.needtosave = false;
               if(response.data[0].enablePO == 1){
                   this.settings.purchasesettings = true;
                   this.ondisable1 = false;
                   this.ondisable2 = false;
                   this.ondisable3 = false;
               }else{
                   this.settings.purchasesettings = false;
               }
                if(response.data[0].enablePOInventory == 1){
                   this.settings.purchasesettings2 = true
               }else{
                   this.settings.purchasesettings2 = false
               }
               if(response.data[0].enableListview == 1){
                   this.settings.purchasesettings3 = true;
               }else{
                   this.settings.purchasesettings3 = false;
               }
               if(response.data[0].viewentry == 1){
                   this.settings.purchasesettings4 = true;
               }else{
                   this.settings.purchasesettings4 = false
               }
            })
        },
        onsavesettings(){
            this.$confirm('This will save the settings. Continue?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
                }).then(() => {
                     const loading = this.$loading({
                    lock: true,
                    text: 'Saving, please wait...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                    setTimeout(() => {
                        systemsettings(this.settings).then(response => {
                            if(response.data === "success settings"){
                                loading.close()
                                this.$notify.success({
                                title: 'Yey',
                                message: 'Successfully update',
                                offset: 100
                                });
                                this.getsavedsettings()
                            } 
                            else if(response.data === "update settings success"){
                                loading.close()
                                this.$notify.success({
                                title: 'Yey',
                                message: 'Successfully update',
                                offset: 100
                                });
                                this.getsavedsettings()
                            }
                        })
                    }, 3000)
                })
        },
        onenable1(){
            if(this.settings2.inventorysettings === true){
                this.needtosave1 = true;
            }else{
                this.needtosave1 = true;
            }
        },
        onenable2(){
             if(this.settings2.inventorysupplier === true){
                this.needtosave1 = true;
            }else{
                this.needtosave1 = true;
            }
        },
        onenable3(){
             if(this.settings2.inventoryexpiration === true){
                this.needtosave1 = true;
            }else{
                this.needtosave1 = true;
            }
        },
        onenable(){
            if(this.settings.purchasesettings === true){
                this.ondisable1 = false;
                this.ondisable2 = false;
                this.ondisable3 = false;
                this.needtosave = true;
            }else{
                this.ondisable1 = true;
                this.ondisable2 = true;
                this.ondisable3 = true;
                this.settings.purchasesettings2 = false;
                this.settings.purchasesettings3 = false;
                this.settings.purchasesettings4 = false;
                this.needtosave = true;
            }
        }
    }
}
</script>