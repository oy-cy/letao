<template>
    <div class="addressedit_container">
        <van-address-edit
            :area-list="areaList"
            :address-info="addressInfo"
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
import { AddressEdit, Toast } from "vant";
import { updateAddress, deleteAddress } from "@/api/index.js";
import areaList from "@/assets/js/area.js";
export default {
    data() {
        props: ["item"];
        return {
            areaList,
            searchResult: [],
            addressInfo: JSON.parse(this.$route.params.addressInfo)
        };
    },
    methods: {
        async onSave(addressInfo) {
            console.log("保存");
            addressInfo.country = addressInfo.county;
            if (addressInfo.isDefault == true) {
                addressInfo.isDefault = 1;
            } else {
                addressInfo.isDefault = 0;
            }
            var id = this.addressInfo.id;
            // 调用地址
            var { status, message } = await updateAddress(id, addressInfo);
            if (status == 0) {
                Toast(message);
                this.$router.push("/address");
            } else {
                Toast(message);
            }
        },
        async onDelete() {
            var id = this.addressInfo.id;
            // 调用地址
            var { status, message } = await deleteAddress(id);
            if (status == 0) {
                Toast(message);
                this.$router.push("/address");
            } else {
                Toast(message);
            }
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
    }
};
</script>

<style lang="scss" scoped></style>
