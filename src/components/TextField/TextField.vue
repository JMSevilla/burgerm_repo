<template>
    <div>
        <label>{{label}}</label>
       <input :type="type" :placeholder="placeholder" @input="$emit('input', $event.target.value)" class="form-control" style="margin-top: 20px; margin-bottom: 20px;">
    </div>
</template>


<script>
export default {
    props : {
        label : String,
        type : String,
        placeholder: String
    }
}
</script>