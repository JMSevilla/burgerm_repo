<template>
    <div>
        <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
                <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div class="sb-sidenav-menu">
                        <div class="nav" id="mycustomscroll">
                           <el-menu
                                default-active="1"
                                class="el-menu-vertical-demo"
                                @open="handleOpen"
                                @close="handleClose"
                                background-color="#212529"
                                text-color="#fff"
                                active-text-color="#ffd04b">

                                    <el-menu-item index="1" @click="ondashboard()">
                                    <img src="https://cdn2.iconfinder.com/data/icons/scenarium-vol-1-2/128/005_workplace_workspace_computer_desktop_dashboard_account_analytics-256.png"
                                     alt="no image" style="width: 15%; height:auto;">&nbsp;
                                    <span>Cashier POS</span>
                                </el-menu-item>

                                    <el-menu-item index="2" @click="onusermanagement()">
                                    <img src="../../assets/user.png"
                                     alt="no image" style="width: 15%; height:auto;">&nbsp;
                                    <span>Inventory Viewing</span>
                                </el-menu-item>
                                <hr>
                                

                                

                                
                                <!-- div if = if true this will be shown if not hide -->

                                    
                                    

    <!-- div if end -->


                                 

                                
                                </el-menu>
                                
                        </div>
                    </div>
                    <div class="sb-sidenav-footer">
                        <div class="small ps-5">Logged in as: &nbsp;&nbsp;<el-tag type="warning">Cashier</el-tag></div>
                    </div>
                </nav>
            </div>
            <div id="layoutSidenav_content">
                <!-- content -->
                <main>
                    <div class="container-fluid px-4">
                       
                         <router-view></router-view>
                    </div>
                </main>
                
                <footer class="py-4 bg-light mt-auto">
                    <div class="container-fluid px-4">
                        <div class="d-flex align-items-center justify-content-between small">
                            <div class="text-muted">Copyright &copy; Burger Mania {{ new Date().getFullYear() }}</div>
                            <div>
                                <!-- <a href="#">Privacy Policy</a>
                                &middot;
                                <a href="#">Terms &amp; Conditions</a> -->
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    </div>
</template>