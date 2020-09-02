<template>
    <div class="addressedit_container">
        <van-address-edit
            :area-list="areaList"
            show-postal
            show-delete
            show-set-default
            show-search-result
            :search-result="searchResult"
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
            @delete="onDelete"
            @change-detail="onChangeDetail"
        />
    </div>
</template>

<script>
import { AddressEdit,Toast } from "vant";
import areaList from "@/assets/js/area.js";
export default {
    data() {
        props:['item']
        return {
            areaList,
            searchResult: [],
            // item:this.$route.parmas.item
        };
    },
    methods: {
        onSave() {
            Toast("save");

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
    components:{
        "van-address-edit":AddressEdit
    }
};
</script>

<style lang="scss" scoped></style>
