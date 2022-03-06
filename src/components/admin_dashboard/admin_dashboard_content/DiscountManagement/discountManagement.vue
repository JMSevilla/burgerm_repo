<template>
    <div>
        <div class="container" style="margin-top: 100px;">
            <el-card shadow="always" style="padding: 15px;">
                <div class="row">
                    <div class="col-sm">
                        <span>Enter Discount</span>
                        <el-input
                        type="text"
                        placeholder="Enter discount"
                        clearable
                        v-model="discountObj.discount"
                        ></el-input>
                    </div>
                    <div class="col-sm">    
                            <h4>QR Code Preview</h4>
                            <qr-code :text="discountObj.discount"
    size="200"
    error-level="L"></qr-code>
                    </div>
                </div>
                <el-button
                type="primary"
                plain
                size="small"
                style="float: right; margin-top: 10px; margin-bottom: 20px;"
                @click="onGenerateDiscount"
                >Generate</el-button>
            </el-card>
        </div>
    </div>
</template>

<script>
export default {
    data() { 
        return {
            discountObj : {
                discount : ''
            }
        }
    },
    methods : {
        onGenerateDiscount: function() {
            
        }
    }
}
</script>