<template>
    <div class="shopping-container">
        <div class="top-nav">
            <van-nav-bar
                title="购物车"
                right-text="删除"
                @click-right="handleDel"
            />
        </div>
        <div class="card-list">
            <van-checkbox-group v-model="result" ref="checkboxGroup">
                <div class="card-box" v-for="item in list" :key="item.id">
                    <van-checkbox class="check" :name="item.id"></van-checkbox>
                    <GoodsCard
                        v-bind="item"
                        :num="counterMap[item.id]"
                        :nofly="true"
                    />
                </div>
            </van-checkbox-group>
        </div>
        <div class="shopping-footer">
            <van-submit-bar
                :price="allMoney"
                :button-text="`去结算(${totalNum?totalNum:'0.00'})`"
                @submit="onSubmit"
            >
                <van-checkbox v-model="checked" @click="checkAll()"
                    >全选</van-checkbox
                >
            </van-submit-bar>
        </div>
    </div>
</template>

<script>
import GoodsCard from "@/components/GoodsCard";
import { Toast, Dialog } from "vant";
import { mapMutations, mapState } from "vuex";
export default {
    data() {
        return {
            result: [],
            list: [],
            checked: false,
        };
    },
    components: {
        GoodsCard,
    },
    computed: {
        ...mapState({
            counterMap: (state) => state.counterMap,
        }),
        allMoney() {
            const resArr = this.list.filter((item) =>
                this.result.includes(item.id)
            );
            return resArr.reduce((prev, next) => {
                const num = this.counterMap[next.id] || 0;
                console.log(num * next.price, 100, prev);
                return Math.round(num * next.price * 100) + prev;
            }, 0);
        },
        totalNum() {
            if (!this.list.length) {
                return;
            }
            const resArr = this.list.filter((item) =>
                this.result.includes(item.id)
            );
            const res = resArr.reduce(
                (prev, next) => prev + (this.counterMap[next.id] || 0),
                0
            );
            return res;
        },
    },
    methods: {
        ...mapMutations(["storageChange"]),
        async getAllData() {
            const result = Object.keys(this.counterMap);
            const res = await this.$api.getGoodsByIds(result.join());
            this.list = res.list;
        },
        async handleDel() {
            if (this.result.length === 0) {
                Toast("没有选中商品");
                return;
            }
            try {
                await Dialog.confirm({
                    // title: "是否删除",
                    message: "确定要删除已选中商品",
                });
                this.result.forEach((id) => {
                    this.storageChange({ id, value: -Infinity });
                    this.list = this.list.filter(
                        (item) => !this.result.includes(item.id)
                    );
                });
                this.result = [];
            } catch (error) {
                console.log(error);
                Toast("谢谢惠顾");
            }
        },
        onSubmit() {
            confirm("赊账");
        },
        checkAll() {
            if (this.checked) {
                this.$refs.checkboxGroup.toggleAll(true);
            } else {
                this.$refs.checkboxGroup.toggleAll(false);
            }
        },
    },
    created() {
        this.getAllData();
    },

    watch: {
        result() {
            if (this.result.length === this.list.length) {
                this.checked = true;
            } else {
                this.checked = false;
            }
        },
    },
};
</script>

<style lang="less" scoped>
.shopping-container {
    background: #fff;
    min-height: 100vh;
    .top-nav {
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 10;
    }
    .card-list {
        width: 100%;
        position: absolute;
        top: 46px;
        z-index: 0;
        box-sizing: border-box;
        padding: 10px 10px 100px 10px;
        background: #fff;
        .card-box {
            display: flex;
            justify-content: center;
        }
        .check {
            margin-right: 10px;
            flex-shrink: 0;
        }
    }
    .van-submit-bar {
        position: fixed;
        bottom: 50px;
    }
}
</style>