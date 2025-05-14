<template>
    <div class="config-show">
        <!-- <label>用户账号</label>
        <div class="username">{{ usersConfig.login?.username || '暂未配置' }}</div>
        <label>Chrome路径</label>
        <div class="chromePath">{{  usersConfig?.ChromePath|| '暂未配置' }}</div>-->

        <div v-for="field in configFields" :key="field.key" class="config-item">
            <label>{{ field.label }}</label>
            <div :class="field.key === 'login.username' ? 'username' : 'chromePath'">
                {{ getConfigValue(field.key) || '暂未配置' }}
            </div>
        </div>
        <button @click="showTheConfig">查看配置</button> 
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { type UserConfig } from '../types/index'

const configFields = [
  { label: '用户账号', key: 'login.username' },
  { label: '密码', key: 'login.password' },
  { label: 'Chrome路径', key: 'ChromePath' },
  { label: '目标场次', key: 'regex' }, 
  { label: '目标时间', key: 'targetTime' } 
]

const getConfigValue = (key: string) => {
  return key.split('.').reduce((obj, part) => {
    return obj && obj[part] !== undefined ? obj[part] : null;
  }, usersConfig);
}

const usersConfig = reactive<UserConfig>({
    login: {
    username: '',
    password: ''
  },
  regex: '',
  targetTime: '',
  targetCount: '',
  userPrice: '',
  ChromePath: ''
});
const showTheConfig = () => {
  //@ts-ignore
  window.inPutAPI.readConfig().then((res) => {
    const config = res; 
    Object.assign(usersConfig, config); // 合并配置到 usersConfig 对象中
  });
};
</script>

<style scoped>
.config-show {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.username  {
  margin-bottom: 15px;
}

div {
  display: block;
  margin-bottom: 5px;
}

.username,
.chromePath{
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  background-color: #42b983;
  color: white;
  padding: 10px 15px;
  border: none;
  margin-top:20px;
  border-radius: 4px;
  cursor: pointer;
}</style>