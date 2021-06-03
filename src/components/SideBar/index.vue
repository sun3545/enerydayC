<template>
    <div class="side-bar-container" ref="side">
        <router-link
            :to="{
                name: 'Classify',
                query: {
                    type: item,
                },
            }"
            tag="div"
            class="scrollDom"
            v-for="(item, i) in sideList"
            :key="item"
            :class="{ active: i == index }"
            @touchend.native="scrollTo(i, $event.target)"
            @touchstart.native="move = false"
            @touchmove.native="move = true"
        >
            {{ i === 0 ? "全部" : item }}
        </router-link>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import moveTo from "@/utils/tool";
export default {
    data() {
        return {
            index: 0,
            move: false,
        };
    },
    computed: {
        ...mapState({
            sideList: (state) => state.sideList,
            showContent: (state) => state.showContent,
        }),
        myType() {
            return this.$route.query.type;
        },
    },
    methods: {
        ...mapActions(["A_getGoodsList"]),
        ...mapMutations(["resetGoodsList"]),
        scrollTo(i, e,isMounted) {
            if (this.move) {
                return;
            }
            this.index = i;
            const { side } = this.$refs;
            const sonTop = e.getBoundingClientRect().top;
            const sonHeight = e.offsetHeight;
            const parentTop = side.getBoundingClientRect().top;
            const parentHeihgt = side.offsetHeight;
            moveTo(
                side,
                "scrollTop",
                side.scrollTop,
                sonTop + sonHeight / 2 - parentTop - parentHeihgt / 2
            );
            if(isMounted){
                return
            }
            // 页面数据
            this.resetGoodsList();
            this.A_getGoodsList({
                type: this.sideList[i],
                page: 1,
                sort: "all",
            });
        },
    },

    mounted() {
        const oldIndex = this.sideList.findIndex(
            (item) => item === this.myType
        );
        this.index = oldIndex > 0 ? oldIndex : 0;
        const scrollDom  = document.getElementsByClassName("scrollDom")[this.index]
        this.scrollTo(this.index,scrollDom,true)
        this.resetGoodsList();
        if (this.showContent) {
            this.A_getGoodsList({
                type: this.myType || this.sideList[0],
                page: 1,
                sort: "all",
            });
        }
    },
};
</script>

<style lang="less" scoped>
.side-bar-container {
    position: fixed;
    left: 0;
    width: 79px;
    top: 135px;
    bottom: 50px;
    overflow: auto;
    background: #f8f8f8;
    &&::-webkit-scrollbar {
        width: 0;
        background: none;
    }
    div {
        width: 79px;
        text-align: center;
        height: 40px;
        line-height: 40px;
        position: relative;
    }
    .active {
        font-weight: bold;
        color: #ff1a90;
        &::before {
            content: "";
            position: absolute;
            width: 3px;
            height: 18px;
            background: #ff1a90;
            top: 50%;
            transform: translateY(-50%);
            left: 0;
        }
    }
}
</style>