<template>
    <div class="home-container">
        <router-view></router-view>
        <div class="home-footer">
            <Tabbar />
        </div>
    </div>
</template>

<script>
import Tabbar from "@/components/Tabbar";
export default {
    components: {
        Tabbar,
    },
    computed:{
        routerInfo(){
            const oneClass = +this.$route.query.title;
            const twoClass = +this.$route.query.cls;
            return {
                oneClass,
                twoClass
            }
        }
    },
};
</script>

<style lang="less" scoped>
.home-footer {
    & > div {
        width: 375px;
    }
}
</style>