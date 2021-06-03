<template>
    <div class="classify-container">
            <router-link class="search-btn" tag="div" :to="{ name: 'Search' }">
                <van-icon name="search" />
                <div>火龙果特价</div>
            </router-link>
        <OneTab />
        <template v-if="showContent">
            <SideBar />
            <GoodsList />
        </template>
        <van-loading size="2rem" vertical v-else />
    </div>
</template>

<script>
import OneTab from "@/components/OneTab";
import SideBar from "@/components/SideBar";
import GoodsList from "@/components/GoodsList";
import { mapState } from "vuex";

export default {
    components: {
        OneTab,
        SideBar,
        GoodsList,
    },
    computed: {
        ...mapState({
            showContent: (state) => state.showContent,
            sideList: (state) => state.sideList,
        }),
    },
};
</script>

<style lang="less" scoped>
.classify-container {
    width: 375px;
    .search-btn {
        width: 355px;
        height: 33px;
        line-height: 33px;
        background: #eee;
        margin: 11px auto 0;
        border-radius: 10px;
        font-size: 14px;
        text-align: center;
        color: #a1a1a1;
        > * {
            display: inline-block;
            vertical-align: middle;
        }
    }
}
</style>