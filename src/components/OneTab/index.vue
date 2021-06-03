<template>
    <ul class="one-tab-container" ref="oneTab">
        <router-link
            tag="li"
            :to="{
                name: 'Classify',
                params: {
                    id: index,
                },
            }"
            class="tab-item"
            v-for="(item, i) in menuList"
            :key="item.title"
            :class="{ active: index === i }"
            @touchend.native="scrollTo(i, $event.target)"
            @touchstart.native="move = false"
            @touchmove.native="move = true"
        >
            <div class="img-wrapper">
                <img :src="item.imgURL" />
            </div>
            <div class="tab-title">{{ item.title }}</div>
        </router-link>
    </ul>
</template>

<script>
import { mapActions } from "vuex";
import moveTo from "@/utils/tool";
export default {
    data() {
        return {
            index: 0,
            move: false,
            menuList: [
                {
                    title: "时令水果",
                    imgURL:
                        "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/时令水果.jpg",
                },
                {
                    title: "酒水冲调",
                    imgURL:
                        "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/酒水冲调.jpg",
                },
                {
                    title: "安心乳品",
                    imgURL:
                        "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/安心乳品.jpg",
                },
                {
                    title: "休闲零食",
                    imgURL:
                        "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/休闲零食.jpg",
                },
                {
                    title: "肉蛋食材",
                    imgURL:
                        "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/肉蛋食材.jpg",
                },
                {
                    title: "新鲜蔬菜",
                    imgURL:
                        "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/新鲜食材.jpg",
                },
                {
                    title: "熟食餐饮",
                    imgURL:
                        "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/熟食餐饮.jpg",
                },
                {
                    title: "海鲜水产",
                    imgURL:
                        "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/海鲜水产.jpg",
                },
                {
                    title: "粮油调味",
                    imgURL:
                        "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/粮油调味.jpg",
                },
                {
                    title: "某手美食",
                    imgURL:
                        "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/某手美食.jpg",
                },
                {
                    title: "纸杯清洁",
                    imgURL:
                        "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/纸品清洁.jpg",
                },
                {
                    title: "个人护理",
                    imgURL:
                        "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/个人护理.jpg",
                },
                {
                    title: "美妆护肤",
                    imgURL:
                        "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/美妆护肤.jpg",
                },
                {
                    title: "家居收纳",
                    imgURL:
                        "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家居收纳.jpg",
                },
                {
                    title: "家用电器",
                    imgURL:
                        "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家用电器.jpg",
                },
                {
                    title: "3C数码",
                    imgURL:
                        "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/3C数码.jpg",
                },
                {
                    title: "母婴用品",
                    imgURL:
                        "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/母婴用品.jpg",
                },
                {
                    title: "鲜花绿植",
                    imgURL:
                        "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/鲜花绿植.jpg",
                },
                {
                    title: "宠物用品",
                    imgURL:
                        "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/宠物用品.jpg",
                },
                {
                    title: "图书玩具",
                    imgURL:
                        "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/图书文具.jpg",
                },
                {
                    title: "手表配饰",
                    imgURL:
                        "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/手表配饰.jpg",
                },
            ],
        };
    },
    computed:{
        paramsId(){
            return this.$route.params.id;
        }
    },
    methods: {
        ...mapActions(["A_setSideList"]),
        scrollTo(index, e, isMounted) {
            if (this.move) {
                return;
            }
            this.index = index;
            const { oneTab } = this.$refs;
            const itmeWidth = e.offsetWidth;
            const itemLeft = e.getBoundingClientRect().left;
            const warpperWidth = oneTab.offsetWidth;

            moveTo(
                oneTab,
                "scrollLeft",
                oneTab.scrollLeft,
                itmeWidth / 2 + itemLeft - warpperWidth / 2
            );
            // console.log(this.menuList[index].title);
            if(isMounted){
                return;
            }
            this.A_setSideList(this.menuList[index].title);
        },
    },
    mounted() {
        const oldIndex = this.menuList.findIndex(
            (item) => item === this.menuList[this.paramsId]
        );
        this.index = oldIndex > 0 ? oldIndex : 0;
        const tabItem  = document.getElementsByClassName("tab-item")[this.index]
        this.scrollTo(this.index,tabItem,true)
        this.index = +this.$route.params.id || 0;
        this.A_setSideList(this.menuList[this.index].title);
    },
};
</script>

<style lang="less" scoped>
.one-tab-container {
    width: 375px;
    height: 104px;
    display: flex;
    overflow: auto;
    .tab-item {
        width: 50px;
        height: 70px;
        padding: 10px 5px;
        .img-wrapper {
            width: 50px;
            height: 50px;
            display: flex;
            justify-content: center;
            align-content: center;
            border-width: 2px;
            border-color: #fff;
            border-style: solid;
            border-radius: 23px;
            img {
                width: 45px;
                height: 45px;
                border-radius: 50%;
                align-self: center;
            }
        }
        .tab-title {
            text-align: center;
            font-size: 12px;
            margin-top: 5px;
        }
    }
    .active {
        .img-wrapper {
            border-color: #d13193;
        }
        .tab-title {
            color: #fff;
            background: #d13193;
            font-weight: bold;
            border-radius: 30px;
        }
    }
}
.one-tab-container::-webkit-scrollbar {
    width: 0;
    background: none;
}
</style>