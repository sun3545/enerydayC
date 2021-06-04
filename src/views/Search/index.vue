<template>
    <div class="search-container">
        <div class="search-header">
            <van-icon
                name="arrow-left"
                class="arr-left"
                @click="handleClick()"
            />
            <van-search
                class="search"
                v-model="value"
                show-action
                :placeholder="place"
                @search="onSearch"
                @input="handleInput"
                @focus="handlefocus"
            >
                <template #action v-if="showList">
                    <div @touchend="onSearch(value)">搜索</div>
                </template>
                <template #action v-else>
                    <van-icon
                        name="cart-o"
                        id="sho-car"
                        class="shop-car"
                        :badge="badge"
                        @touchend="$router.push({name:'Shopping'})"
                    /> </template
            ></van-search>
        </div>
        <div class="like-search" v-if="showList">
            <van-list v-if="likeList.length">
                <van-cell
                    v-for="item in likeList"
                    :key="item"
                    @click="onSearch(item)"
                    ><template
                        ><span
                            class="custom-title"
                            v-html="formatHTML(item)"
                        ></span></template
                ></van-cell>
            </van-list>
            <div class="history" v-else>
                <SearchHistory
                    :hisotryData="searchHistory"
                    @handelHistory="onSearch"
                />
            </div>
        </div>
        <div class="search-content" v-else>
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
                :immediate-check="false"
            >
                <GoodCard
                    v-for="item in goodsList"
                    :key="item.id"
                    v-bind="item"
                    :num="counterMap[item.id]"
                />
            </van-list>
        </div>
    </div>
</template>

<script>
import GoodCard from "@/components/GoodsCard";
import { mapMutations, mapState } from "vuex";
import SearchHistory from "./SearchHistory";
export default {
    components: {
        GoodCard,
        SearchHistory,
    },
    data() {
        return {
            showList: true,
            loading: false,
            finished: false,
            place: "酒",
            value: this.place,
            oldValue: "",
            likeList: [],
            timer: null,
            page: 1,
            size: 5,
            total: 0,
            goodsList: [],
            searchHistory: [],
        };
    },
    computed: {
        ...mapState({
            counterMap: (state) => state.counterMap,
        }),
        badge() {
            const keys = Object.values(this.counterMap);
            if(!keys.length){
                console.log(this.counterMap)
                return "fjsdkljfjlsdkjfklj"
            }
            const count = keys.reduce(
                (prev, next) => prev + next
            );
            if (count > 99) {
                return "99+";
            }
            return count;
        },
    },
    methods: {
        ...mapMutations(["setMotionSearch"]),
        async onLoad ()  {
            const resp = await this.$api.search(
                this.value,
                this.page,
                this.size
            );
            this.goodsList = [...this.goodsList, ...resp.list];
            this.total = resp.total;
            this.loading = false;
            if (this.goodsList.length >= this.total) {
                this.finished = true;
            } else {
                this.page += 1;
            }
        },
        onSearch(val) {
            if (val) {
                this.value = val;
            } else {
                this.value = this.place;
            }
            const result = this.searchHistory.find(
                (item) => item.value === this.value
            );
            if (result) {
                result.time = new Date().getTime();
                this.searchHistory.sort((a, b) => b.time - a.time);
            } else {
                this.searchHistory.unshift({
                    value: this.value,
                    time: new Date().getTime(),
                });
                if (this.searchHistory.length >= 11) {
                    this.searchHistory.pop();
                }
            }
            localStorage.setItem(
                "searchHistory",
                JSON.stringify(this.searchHistory)
            );
            this.likeList = [];

            if (this.oldValue !== this.value) {
                this.page = 1;
                this.goodsList = [];
                this.onLoad();
                this.oldValue = this.value;
            }
            this.finished = false;
            this.showList = false;
        },
        handleInput() {
            this.showList = true;
            if (this.value === "") {
                this.likeList = [];
                return;
            }
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            } else {
                this.timer = setTimeout(async () => {
                    const resp = await this.$api.likeSearch(this.value);
                    this.likeList = resp.result;
                    clearTimeout(this.timer);
                    this.timer = null;
                }, 300);
            }
        },
        handlefocus() {
            this.showList = true;
        },
        formatHTML(item) {
            const reg = new RegExp(this.value, "g");
            return item.replace(reg, this.value.fontcolor("red"));
        },
        handleClick() {
            this.setMotionSearch(true);
            this.$router.go(-1);
        },
    },
    created() {
        this.searchHistory =
            JSON.parse(localStorage.getItem("searchHistory")) || [];
    },
};
</script>

<style lang="less" scoped>
.search-container {
    width: 100%;
    height: 100vh;
    z-index: 10;
    background: #fff;
    .search-header {
        width: 345px;
        background: #fff;
        margin: 0 auto;
        display: flex;
        align-items: center;
        position: fixed;
        top: 0;
        left: 15px;
        z-index: 11;
        .arr-left {
            font-size: 22px;
        }
        .search {
            flex: 1;
        }
    }
    .like-search {
        position: relative;
        top: 54px;
        width: 100%;
        box-sizing: border-box;
        padding-left: 30px;
        z-index: 2;
        .history {
            width: 350px;
            position: absolute;
            left: 10px;
            z-index: 1;
        }
    }
    .search-content {
        position: relative;
        width: 345px;
        height: 100%;
        // top: 48px;
        padding-top: 48px;
        margin: 0 auto;
        // margin: 48px auto 0;
        z-index: 10;
        background: #fff;
        // overflow: auto;
    }
    .shop-car {
        font-size: 15px;
    }
}
</style>