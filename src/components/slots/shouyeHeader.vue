<template>
    <div>
        <slot name="temp">
            <div class="header">
                <img src="@/assets/images/logo.png" alt />
                <van-search placeholder="请输入搜索关键词"></van-search>
            </div>
        </slot>
    </div>
</template>

<script>
    export default {

    }
</script>

<style lang="scss" scoped>

</style>
