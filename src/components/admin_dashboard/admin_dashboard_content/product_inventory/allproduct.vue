<template>
    <div class="col-sm">
                    <el-card shadow="always" id="mycustomscroll" >
                        <h5>All Added Products</h5>
                        
                        <div class="row">
                            <div class="col-md-6">
                                <label>Search :</label>&nbsp;
                        <el-input
                                    style="margin-bottom: 5px; width: 50%;"
                                    placeholder="Search"
                                    v-model="searchable"
                                    clearable>
                                    </el-input><br>
                            </div>
                            <div class="col-md-6">
                                <el-button type="warning" plain size="mini" @click="onchangeview()">{{dataview ? 'Switch to List View' : 'Switch to Grid View'}}</el-button>
                            </div>
                        </div>

                        <label style="margin-right: 10px;">From : </label>
                        <el-date-picker
                        v-model="filterable.fromdate"
                        format="yyyy/MM/dd"
                        value-format="yyyy/MM/dd"
                        type="date"
                        placeholder="Select date from">
                        </el-date-picker> &nbsp;
                        <label style="margin-right: 10px;">To : </label>
                        <el-date-picker
                        style="margin-right: 10px;"
                        v-model="filterable.todate"
                        format="yyyy/MM/dd"
                        value-format="yyyy/MM/dd"
                        type="date"
                        placeholder="Select date to">
                        </el-date-picker>
                        <div style="display: inline;">
                            <!-- <el-button type="warning" plain size="mini" @click="dialogVisible = true">More filters</el-button> -->
                        <el-button type="primary" plain size="mini" @click="onsearchbydate()">Search</el-button>
                        
                        </div>
                        
                        <!-- Element Dialog for More Filters -->
                            <el-dialog
                            
                                title="Edit more search filters"
                                :visible.sync="dialogVisible"
                                width="50%"
                                :before-close="handleClose">
                                <div style="padding: 25px;">
                                     <el-alert
                                 style="margin-bottom: 20px;"
                                    title="Note : You can only filter minimal search options here."
                                    type="error" :closable="false">
                                </el-alert>
                                <el-card style="margin-bottom: 20px; width: 30%;" shadow="hover">
                                    <el-switch
                                    style="display: block;"
                                    v-model="morefilter.filterbased"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949"
                                    active-text="Exact result"
                                    inactive-text="Filter based">
                                    </el-switch>
                                </el-card>
                               <div class="row">
                                   <div class="col-sm">
                                        <el-card shadow="hover" id="filter1">
                                            <h5>Search by product code</h5>
                                    <el-input
                                    placeholder="Please input product code"
                                    v-model="morefilter.filterbycode"
                                    clearable>
                                    </el-input>
                                        </el-card>
                                   </div>
                                   <div class="col-sm">
                                       <el-card shadow="hover" id="filter2">
                                            <h5>Search by product name</h5>
                                    <el-input
                                    placeholder="Please input product name"
                                    v-model="morefilter.filterbypname"
                                    clearable>
                                    </el-input>
                                       </el-card>
                                   </div>
                               </div>
                               <div class="row" style="margin-top: 30px;">
                                   <div class="col-sm">
                                        <el-card shadow="hover" id="filter3">
                                            <h5>Search by status</h5>
                                    <el-radio v-model="morefilter.filterbystatus1" label="1">Active</el-radio>
                                    <el-radio v-model="morefilter.filterbystatus1" label="0">Inactive</el-radio>
                                        </el-card>
                                   </div>
                                   <div class="col-sm">
                                        <el-card shadow="hover" id="filter4">
                                            <div style="display: inline;">
                                                <h6>Get all result</h6>
                                    <el-button type="primary" size="mini" plain style="width: 100%;" @click="ongetall()">Get All</el-button>
                                            </div>
                                        </el-card>
                                   </div>
                               </div>
                               <div class="row" style="margin-top: 30px;">
                                   <div class="col-sm">
                                        <el-card shadow="hover" id="filter3">
                                            <h5>Search by category</h5>
                                             
                                      <el-select v-model="morefilter.filterbycateg" style="width: 100%;" filterable placeholder="Select category">
                                        <el-option
                                        v-for="item in categoryoptions"
                                        :key="item.categoryname"
                                        :label="item.categoryname"
                                        :value="item.categoryname">
                                        </el-option>
                                    </el-select>
                                        </el-card>
                                   </div>
                                   <div class="col-sm">
                                     
                                   </div>
                               </div>
                                </div>
                                <span slot="footer" class="dialog-footer">
                                    <el-button @click="dialogVisible = false">Cancel</el-button>
                                    <el-button type="primary" @click="onsearchnow()">Search now</el-button>
                                </span>
                                </el-dialog>
                        <!-- Element Dialog for more filters end -->
                        <hr>
                          <div v-if="dataview == true">
                              <div v-if="getallproductlist == null || getallproductlist == ''">
                              <center>
                                  <div style="margin-top: 30px;">
                                      <img src="https://cdn.dribbble.com/users/2382015/screenshots/6065978/no_result.gif"
                                       alt="No Data" style="width: 100%; height: auto;" class="img-fluid">
                                  </div>
                              </center>
                          </div>
                          <div v-else>
                              <el-timeline style="margin-top: 50px;" >
                                <el-timeline-item v-for="item in pagedTableData" :key="item.productID" :timestamp="item.createdAt | moment('dddd, MMMM Do YYYY')" placement="top">
                                <el-card style="padding: 15px;">
                                    <div class="row">
                                        <div class="col-md-3">
                                                   <img :src="item.productimgurl" class="img-fluid"
                                                   style="width: 100%; height: auto;" alt="NO image">
                                               </div>
                                    <div class="col-md-9">
                                        <div class="row">
                                            <div class="col-md-5">
                                                <p>Product Code : <el-tag effect="dark">{{item.productCode}}</el-tag></p>
                                            </div>
                                            <div class="col-md-7">
                                                <el-button type="warning" style="float: right;" @click="onviewexpiration(item.productCode, item.productName)">View expiration</el-button>
                                            </div>
                                        </div>
                                                    <h4>Product Name : {{item.productName}}</h4>
                                                    <p>Product Category : {{item.product_category}}</p>
                                                    <p>Product Quantity : {{item.product_quantity}}</p>
                                                    <div v-show="inventorysupplier">
                                                        <p>Product supplier : {{item.product_supplier}}</p>
                                                    </div>
                                                    <p>Administrator added : {{item.createdAt | moment('dddd, MMMM Do YYYY')}}</p>
                                                    <p>Status : <el-tag effect="dark" type="success">Activated</el-tag></p>
                                                    <div style="margin-top: 20px;">
                                                        <!-- <h4>Total Price : &#8369; {{item.product_price * item.product_quantity}}</h4> -->
                                                    </div>
                                                    <el-card shadow="always" style="background-color: #2D2D30; color: white; border-radius: 20px;">
                                                        <h5>More Actions</h5>
                                                        <div class="row">
                                                            <div class="col-sm">
                                                                <el-button type="primary" style="width: 100%;"
                                                                @click="onmodifyproduct(
                                                                    item.productCode,
                                                                    item.productID,
                                                                    item.productName,
                                                                    item.product_quantity,
                                                                    item.product_price,
                                                                    item.product_supplier,
                                                                    item.productimgurl,
                                                                    item.product_category,
                                                                    item.expirationprod
                                                                )"
                                                                >Modify</el-button>
                                                            
                                                            </div>
                                                            <div class="col-sm">
                                                                <el-button type="danger" style="width: 100%;" @click="onremoveproduct(item.productID, item.product_quantity, item.productCode)">Remove</el-button>
                                                            </div>
                                                        </div>
                                                        <!-- Modify dialog -->
                                                        <el-dialog
                                                            title="Product Inventory Modify"
                                                            :visible.sync="modifyDialog"
                                                            width="50%"
                                                            :before-close="handleClose">
                                                            <div v-show="tagalertshow">
                                                                <el-alert
                                                                    style="margin-top: 20px; margin-bottom: 30px;"
                                                                        title="Product Exist On Stock"
                                                                        type="warning"
                                                                        effect="dark"
                                                                        :closable="false"
                                                                        description="Modifying this product may also take effect on your stock on hand product"
                                                                        show-icon>
                                                                    </el-alert>
                                                            </div>
                                                                <center>
                                                                    <el-avatar shape="square" :size="100" fit="fill" style="margin-bottom: 3px;" :src="modifyimg1"></el-avatar>
                                                                        <p style="color: gray;">Preview of image will appear after the uploading.</p>
                                                                    <input type="file" class="btn btn-outline-primary" style="margin-bottom: 6px;" @change="modifypreviewImage" accept="image/*" />
                                                                    <el-progress :text-inside="true" style="margin-bottom: 10px;" :stroke-width="26" :percentage="modifyuploadpercent"></el-progress>
                                                                    <el-button type="primary" style=" margin-bottom: 10px;" plain @click="modifyonupload()">Upload now</el-button>
                                                                </center>
                                                                <div class="row" style="margin-top: 20px;">
                                                                   <div class="col-sm">
                                                                        <label>Product name</label>
                                                                        <el-input
                                                                            placeholder="Please input product name"
                                                                            v-model="modifyTask.modifyproductname"
                                                                            clearable>
                                                                            </el-input>
                                                                    </div>
                                                                    <div class="col-sm">
                                                                        <label>Product quantity</label>
                                                                        <el-input
                                                                            placeholder="Product Quantity"
                                                                            v-model="modifyTask.modifyproductquantity"
                                                                            type="number"
                                                                            disabled
                                                                            clearable>
                                                                            </el-input>
                                                                    </div>
                                                                </div>
                                                                <div class="row" style="margin-top: 20px;">
                                                                        <!-- <div class="col-sm">
                                                                            <label>Product price</label>
                                                                            <el-input
                                                                                placeholder="Please input product price"
                                                                                v-model="modifyTask.modifyproductprice"
                                                                                type="number"
                                                                                clearable>
                                                                                </el-input>
                                                                        </div> -->
                                                                        <div v-show="inventoryexpiration">
                                                                                    <div class="col-sm">
                                                                                    <label>Product Expiration</label> <el-tag type="success" effect="dark" size="mini" style="margin-bottom: 10px; margin-top: 10px; margin-right: 10px;">Enabled from settings</el-tag>
                                                                                     <el-link v-if="editableexpiry == true" @click="oncancel()" style="margin-bottom: 10px; margin-top: 10px;" type="primary">Cancel</el-link>
                                                                                     <el-link v-else @click="oneditable()" style="margin-bottom: 10px; margin-top: 10px;" type="primary">Edit</el-link>
                                                                                    <el-date-picker
                                                                                            v-if="editableexpiry == true"
                                                                                            style=" width: 100%; margin-bottom: 5px;"
                                                                                            v-model="modifyTask.modifyexpired"
                                                                                            format="yyyy/MM/dd hh:mm:ss A"
                                                                                            value-format="yyyy/MM/dd hh:mm:ss A"
                                                                                            type="datetime"
                                                                                            placeholder="Select date and time">
                                                                                            </el-date-picker>
                                                                                            <el-input
                                                                                            v-else
                                                                                            placeholder="Product Expiration"
                                                                                            v-model="modifyTask.modifyexpired"
                                                                                            disabled
                                                                                            clearable>
                                                                                            </el-input>
                                                                                </div>
                                                                                </div>
                                                                        <div class="col-sm">
                                    <label>Product category</label>
                                      <el-select v-model="modifyTask.modifycategory" style="width: 100%;" filterable placeholder="Select category">
                                        <el-option
                                        v-for="item in categoryoptions"
                                        :key="item.categoryname"
                                        :label="item.categoryname"
                                        :value="item.categoryname">
                                        </el-option>
                                    </el-select>
                                </div>
                                <!-- must show if enable on settings -->
                                <div v-show="inventorysupplier">
                                    <div class="col-sm">
                                    <label>Product supplier</label>
                                      <el-select v-model="modifyTask.modifyproductsupplier" style="width: 100%;" filterable placeholder="Select supplier">
                                        <el-option
                                            v-for="item in listofsuppliers"
                                            :key="item.supplierfirstname"
                                            :label="item.supplierfirstname"
                                            :value="item.supplierfirstname">
                                            </el-option>
                                    </el-select>
                                </div>
                                </div>
                                                                        
                                                                    </div>
                                                            <span slot="footer" class="dialog-footer">
                                                                <el-button @click="modifyDialog = false">Cancel</el-button>
                                                                <el-button type="primary" @click="onmodifysave()">Save</el-button>
                                                            </span>
                                                            </el-dialog>
                                                        <!-- end modify dialog -->
                                                    </el-card>
                                                    
                                    </div>
                                    </div>
                                </el-card>
                                </el-timeline-item>
                            </el-timeline>
                          </div>
                            <!-- el dialog view expiration -->
                                <el-dialog
                                    :title="dynamicTitle"
                                    :visible.sync="drawerviewexpiration"
                                    width="40%"
                                    :before-close="handleClose">
                                    <div style="margin-top: 20px;" class="container">
                                        <el-card shadow="always">
                                            <h1>{{getexpirydatearry | moment('dddd, MMMM Do YYYY, h:mm:ss a')}}</h1>
                                        </el-card>
                                    </div>
                                    <span slot="footer" class="dialog-footer">
                                        <el-button @click="drawerviewexpiration = false">Close</el-button>
                                    </span>
                                    </el-dialog>
                            <!-- end el dialog view expiration -->
                          <el-pagination layout="prev, pager, next" :page-size="pageSize" :total="this.getallproductlist.length" @current-change="setPage">
                                    </el-pagination>
                          </div>
                          <div v-else>
                              <!-- start table -->
                                        <el-table
                                    :key="0"
                                    v-loading="listLoading"
                                    :data="pagedTableData"
                                    border
                                    fit
                                    highlight-current-row
                                    style="width: 100%;"
                                    
                                    >
                                    <el-table-column label="Product Code" prop="id" sortable="custom" align="center"  >
                                        <template slot-scope="{row}">
                                        <span>{{ row.productCode }}</span>
                                        </template>
                                    </el-table-column>
                                    
                                    <el-table-column label="Product Image" >
                                        <template slot-scope="{row}">
                                        <img :src="row.productimgurl" style="width: 100%; height: auto;" class="img-fluid" alt="No image">
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                    <el-table-column label="Product Name" >
                                        <template slot-scope="{row}">
                                        <span class="link-type" >{{ row.productName }}</span>
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                     <el-table-column label="Product Quantity" >
                                        <template slot-scope="{row}">
                                        <span class="link-type" >{{ row.product_quantity }}</span>
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                   
                                    
                                    <el-table-column label="Status" class-name="status-col" >
                                        <template slot-scope="{row}">
                                        <div v-if="row.product_status == 1">
                                            <el-tag type="success">
                                            Active
                                        </el-tag>
                                        </div>
                                        <div v-else>
                                                <el-tag type="warning">
                                            Inactive
                                        </el-tag>
                                        </div>
                                        </template>
                                    </el-table-column>

                                    
                                    <el-table-column label="Created"  align="center">
                                        <template slot-scope="{row}">
                                        <span>{{ row.createdAt | moment("dddd, MMMM Do YYYY") }}</span>
                                        </template>
                                    </el-table-column>

                                    
                                    </el-table>
                                    <el-pagination layout="prev, pager, next" :page-size="pageSize" :total="this.getallproductlist.length" @current-change="setPage">
                                    </el-pagination>
                              <!-- end table -->    
                          </div>
                    </el-card>
                     
                </div>
</template>