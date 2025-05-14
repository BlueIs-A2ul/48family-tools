<template>
  <div class="nav">
    <RouterLink replace to="/Home" active-class="active">首页</RouterLink>
    <RouterLink replace to="/purchaseSeat" active-class="active">普座购买</RouterLink>
    <RouterLink replace to="/purchaseSpec" active-class="active">竞价购买</RouterLink>
    <RouterLink replace to="/purchaseEP" active-class="active">EP购买</RouterLink>
    <RouterLink replace to="/write" active-class="active">账号配置</RouterLink>
    <RouterLink replace to="/peek" active-class="active">查看当前配置</RouterLink>
  </div>
  <div class="main-content">
    <router-view />
  </div>
</template>

<script setup lang="ts" name="Navgator">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.nav {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  height: 50px;
}
.nav a {
  padding: 10px;
  margin: 0 10px;
  text-decoration: none;
  color: #333;
}
.nav .active {
  color: #ffffff;
  border-radius: 15px;
  background-color: #42b983;
  transition: all 0.3s;
}
</style>
