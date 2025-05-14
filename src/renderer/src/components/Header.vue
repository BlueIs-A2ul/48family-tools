<template>
    <header>
        <div class="welcome">欢迎使用</div>
        <div class="notice">使用前请务必查看<a href="#">配置教程</a></div>
    </header>
</template>

<script setup lang="ts">

</script>

<style scoped>
    header {
        display: flex;
        flex-direction: column;
        justify-self: center;
        align-items: center;
    }
    .welcome {
        font-size: 30px;
        font-weight: bold;
        margin-bottom: 10px;
    }
</style>