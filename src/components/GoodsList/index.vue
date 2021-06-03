<template>
    <div class="goods-list-container">
        <div class="list-header van-hairline--top-bottom">
            <div
                :class="{ active: type == 'all' }"
                @click="(type = 'all'), onRefresh()"
            >
                综合
            </div>
            <div
                :class="{ active: type == 'sale' }"
                @click="(type = 'sale'), onRefresh()"
            >
                销量
            </div>
            <div
                class="price"
                @click="changeType()"
                :class="{
                    'price-up': type == 'price-up',
                    'price-down': type == 'price-down',
                }"
            >
                价格
            </div>
        </div>
        <div class="list-content">
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                    :immediate-check="false"
                >
                    <GoodCart
                        v-for="item in goodsList"
                        :key="item.id"
                        v-bind="item"
                        :num="counterMap[item.id]"
                    />
                </van-list>
            </van-pull-refresh>
        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import GoodCart from "../GoodsCard";
export default {
    data() {
        return {
            type: "all",
            isLoading: false,
            loading: false,
            finished: false,
            page: 1,
        };
    },
    components: {
        GoodCart,
    },
    computed: {
        ...mapState({
            goodsList: (state) => state.goodsList,
            counterMap: (state) => state.counterMap,
            showContent: (state) => state.showContent,
        }),
    },
    methods: {
        ...mapMutations(["resetGoodsList"]),
        ...mapActions(["A_getGoodsList"]),
        changeType() {
            if (this.type === "price-up") {
                this.type = "price-down";
            } else {
                this.type = "price-up";
            }
            this.onRefresh();
        },
        onRefresh() {
            this.isLoading = true;
            this.finished = false;
            this.loading = false;
            this.resetGoodsList();
            this.A_getGoodsList({ page: 1, sort: this.type });
            this.isLoading = false;
            this.page = 1;
            // this.onLoad()
        },
        async onLoad() {
            this.page += 1;
            this.loading = true;
            const result = await this.A_getGoodsList({
                page: this.page,
                sort: this.type,
            });
            if (result) {
                this.loading = false;
            } else {
                this.finished = true;
            }
        },
    },
    created() {
        setTimeout(() => {
            if (!this.goodsList.length) {
                this.finished = true;
            }
        }, 500);
    },
};
</script>

<style lang="less" scoped>
.goods-list-container {
    width: 296px;
    position: relative;
    top: 0px;
    left: 79px;
    bottom: 50px;
    .list-header {
        width: 296px;
        position: relative;
        top: 0;
        box-sizing: border-box;
        padding: 0 8px;
        display: flex;
        justify-content: flex-end;

        > div {
            width: 50px;
            height: 25px;
            line-height: 25px;
            text-align: center;
            color: #cecece;
            position: relative;
        }
        .active,
        .price-up,
        .price-down {
            color: #ff1a90;
            font-weight: bold;
        }
        .price::after {
            content: "";
            border: 4px solid transparent;
            border-top-color: #aaa;
            position: absolute;
            bottom: 4px;
            right: 0;
        }
        .price::before {
            content: "";
            border: 4px solid transparent;
            border-bottom-color: #aaa;
            position: absolute;
            top: 4px;
            right: 0;
        }
        .price-up::before {
            border-bottom-color: #ff1a90;
        }
        .price-down::after {
            border-top-color: #ff1a90;
        }
    }
    .list-content {
        width: 296px;
        position: fixed;
        top: 170px;
        left: 79px;
        bottom: 50px;
        overflow: auto;
        .van-pull-refresh {
            overflow: unset !important;
        }
    }
}
</style>