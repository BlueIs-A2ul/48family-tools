<template>
  <div class="config-form">   
    <h2>竞价购买</h2> 
    <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>目标场次(不确定可点击<a href="https://48.gnz48.com/pai" target="_blank" rel="noopener noreferrer">此处</a>查看)</label>
          <input v-model="formData.regex" type="text" placeholder="请输入目标场次">
        </div>
        <div class="form-group">
          <label>目标时间</label>
          <input v-model="formData.targetTime" type="datetime-local">
        </div>
        <div class="form-group">
          <label>我的出价</label>
          <input v-model="formData.myPrice" type="number" placeholder="请输入我的出价"></input>
        </div>
      <button @click="runTheFoo">脚本运行</button>
    </form>
  </div>
</template>
  
<script setup lang="ts">
import { ref,Ref } from 'vue'
import  { type configInSeat } from '../types/index'
const formData: Ref<configInSeat> = ref({
  regex: '',
  targetTime: '',
  myPrice: 0,
});

const ticketType:Ref<string> = ref('AUCTION');

const handleSubmit = () => {
  const configToSave = {
    regex: formData.value.regex,
    targetTime: formData.value.targetTime,
    myPrice: formData.value.myPrice
  };
  try {
    //@ts-ignore
    window.inPutAPI.saveConfig(configToSave);
  } catch (error) {
    console.error('保存配置失败:', error);
  }
}
const runTheFoo = () => {
  //@ts-ignore
  window.inPutAPI.runAutomation(ticketType.value);
};
</script>

<style scoped>
</style>
  