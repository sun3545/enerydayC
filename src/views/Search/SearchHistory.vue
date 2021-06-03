<template>
    <div class="search-history-container">
        <h2>历史记录：</h2>
        <div
            class="his-item"
            v-for="item in hisotryData"
            :key="item.time"
            @click="handelHistory(item.value)"
        >
            {{ item.value }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        hisotryData: {
            default: [],
        },
    },
    methods: {
        handelHistory(value) {
            this.$emit("handelHistory", value);
        },
    },
};
</script>

<style lang="less" scoped>
.his-item {
    padding: 15px;
    background: #eee;
    border-radius: 10px;
    margin: 0 0 10px 10px;
    display: inline-block;
}
</style>