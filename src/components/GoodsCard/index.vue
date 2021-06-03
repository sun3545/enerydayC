<template>
    <div class="good-cart-container van-hairline--bottom" >
        <div class="card-img">
            <img :src="images[0]" ref="img" />
        </div>
        <div class="card-content">
            <div class="title overflow-hidden">{{ title }}</div>
            <div class="desc overflow-hidden">{{ desc }}</div>
            <div class="tags">
                <div v-for="i in tags" :key="i">{{ i }}</div>
            </div>
            <div class="price">￥{{ price }}</div>
            <div class="counter">
                <div @touchend="counter(id, -1)" v-if="num">
                    <img
                        src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/rec.png"
                    />
                </div>
                <div class="num" v-if="num">{{ num }}</div>
                <div @touchend="counter(id, 1)">
                    <img
                        src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/add.png"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
import Animate from '@/tools/Animate/index.js';
export default {
    name: "GoodList",
    props: ["images", "tags", "title", "price", "desc", "id", "num","nofly"],
    methods: {
        ...mapMutations(["storageChange"]),
        counter(id, num) {
            this.storageChange({ id, value: num });
            if(num==-1){
                return;
            }
            if(this.nofly){
                return;
            }
            // 物品
            const { top, left } = this.$refs.img.getBoundingClientRect();
            const {
                offsetHeihgt: imgHeight,
                offserWidth: imgWidth,
            } = this.$refs.img;
            // 购物车
            const shopCar = document.getElementsByClassName("shop-car")[0];
            const { left: carX, top: carY } = shopCar.getBoundingClientRect();
            const { offsetWidth: carWidth, offsetHeight: carHeight } = shopCar;
            // 移动的最终位置
            const endX = carX + carWidth / 2;
            const endY = carY + carHeight / 2;
            Animate({
                startX:left,
                startY:top,
                endX,
                endY,
                src:this.$refs.img.src,
                width:imgWidth,
                height:imgHeight,
            })
        },
    },
};
</script>

<style lang="less" scoped>
.good-cart-container {
    width: 100%;
    display: flex;
    height: 100px;
    transform-origin: 0% 0%;
    .card-img {
        width: 90px;
        margin-right: 20px;
        img {
            width: 90px;
            height: 90px;
        }
    }
    .card-content {
        flex: 1;
        position: relative;
        > div {
            width: 170px;
        }
    }
    .title {
        font-size: 13px;
        color: #1a1a1a;
        margin-top: 5px;
    }
    .desc {
        color: #aaa;
        font-size: 11px;
        margin-top: 5px;
    }
    .tags {
        display: flex;
        margin-top: 4px;
        > div {
            font-size: 10px;
            padding: 2px;
            color: #aaa;
            border: 1px solid #aaa;
            border-radius: 3px;
            margin-right: 5px;
        }
    }
    .price {
        color: #ff1a90;
        font-size: 14px;
        font-weight: bold;
        margin-top: 4px;
    }
    .counter {
        position: absolute;
        bottom: 12px;
        right: 15px;
        display: flex;
        justify-content: flex-end;
        // align-content: center;
        > div:not(.num) {
            width: 16px;
            height: 16px;
            img {
                width: 100%;
            }
        }
        .num {
            font-size: 14px;
            padding: 0 5px;
            height: 16px;
            line-height: 16px;
        }
    }
}
.overflow-hidden {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>