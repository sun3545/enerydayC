<template>
  <van-tabbar fixed route>
    <van-tabbar-item icon="home-o" :to="{ name: 'Home' }">首页</van-tabbar-item>
    <van-tabbar-item
      icon="apps-o"
      :to="{
        name: 'Classify',
        params: {
          id: 0,
        },
      }"
      >分类</van-tabbar-item
    >
    <van-tabbar-item
      class="shop-car"
      icon="cart-o"
      :badge="badge"
      :to="{ name: 'Shopping' }"
      >购物车</van-tabbar-item
    >
    <van-tabbar-item icon="user-circle-o" to="/my">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({ counterMap: (state) => state.counterMap }),
    badge () {
      const count = Object.values(this.counterMap).reduce(
        (prev, next) => prev + next,
        0
      );
      if (count > 99) {
        return "99+";
      }
      return count;
    },
  },
};
</script>

<style>
</style>