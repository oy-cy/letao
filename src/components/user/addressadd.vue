<template>
    <div>
        <van-address-edit
            :area-list="areaList"
            show-postal
            show-set-default
            show-search-result
            :search-result="searchResult"
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
            @change-detail="onChangeDetail"
        />
    </div>
</template>

<script>
import { AddressEdit,Toast } from "vant";
import { addaddress } from "@/api/index.js";
import areaList from "@/assets/js/area.js";
export default {
    data() {
        return {
            areaList,
            searchResult: []
        };
    },
    methods: {
        async onSave(addressInfo) {

        addressInfo.country = addressInfo.county;
        if(addressInfo.isDefault == true){
            addressInfo.isDefault = 1;
        }else{
            addressInfo.isDefault = 0;
        }
        var userInfo = JSON.parse(localStorage.getItem('userInfo'));
        var user_id = userInfo.id;
        // 调用地址
        var { status,message } = await addaddress(user_id,addressInfo);
         this.$toast(message)
        if(status == 0){
            this.$router.push('/address')
        }
        },
        onDelete() {
            Toast("delete");
        },
        onChangeDetail(val) {
            if (val) {
                this.searchResult = [
                    {
                        name: "黄龙万科中心",
                        address: "杭州市西湖区"
                    }
                ];
            } else {
                this.searchResult = [];
            }
        }
    },
    components: {
        "van-address-edit": AddressEdit
    },
    created() {
        this.$parent.title = "新增地址";
        this.$parent.active = -1;
    }
};
</script>

<style lang="scss" scoped></style>
