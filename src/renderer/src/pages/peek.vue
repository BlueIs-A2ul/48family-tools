<template>
    <div class="config-show">
        <div v-for="field in configFields" :key="field.key" class="config-item">
            <label>{{ field.label }}</label>
            <div :class="field.key === 'login.username' ? 'username' : 'chromePath'">
                {{ getConfigValue(field.key) || '暂未配置' }}
            </div>
        </div>
        <button @click="fetchConfig">查看配置</button> 
    </div>
</template>

<script setup lang="ts">
import { usePeekConfig } from '@renderer/hooks/usePeekConfig';

const {  configFields,getConfigValue,fetchConfig } = usePeekConfig();
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