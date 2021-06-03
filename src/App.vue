<template>
    <div id="app">
        <transition
            :name="motionSearch"
            :mode="isMotionSearch ? 'out-in' : 'in-out'"
        >
            <router-view class="view"></router-view>
        </transition>
    </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
    data() {
        return {
            motionSearch: "right",
        };
    },
    computed: {
        ...mapState({
            isMotionSearch: (state) => state.motionSearch,
        }),
    },
    created() {
        const counterMap = JSON.parse(localStorage.getItem("goods")) || {};
        this.$store.commit("setCounterMap", counterMap);
    },
    methods: {
        ...mapMutations(["setMotionSearch"]),
    },
    watch: {
        $route(to, from) {
            if (to.name == "classify" && from.name === "search") {
                this.setMotionSearch(true);
            }
            if (this.isMotionSearch) {
                this.motionSearch = "right";
            } else {
                this.motionSearch = "left";
            }
            this.setMotionSearch(false);
        },
    },
};
</script>
<style lang="less">
.view {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    transition: transform 0.3s linear;
}
.left-enter {
    transform: translateX(100%);
}
.right-leave-to {
    transform: translateX(100%);
}
</style>
