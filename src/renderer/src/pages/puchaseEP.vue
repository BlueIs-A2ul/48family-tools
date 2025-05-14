<template>
    <div class="config-form">
      <div v-if="showError" class="error-tip">{{ errorMessage }}</div>
      <h2>BBBEP购买</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
            <label>目标时间</label>
            <input v-model="formData.targetTime" type="datetime-local">
        </div>
          <button class="ensureBtn">确认配置</button>
      </form>
      <button @click="startAutomation">脚本运行</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref,Ref} from 'vue'
  import  { configInSeat } from '../types/index'
  
  const ticketType:Ref<string> = ref('EP');
  
  const showError:Ref<boolean> = ref(false);
  const errorMessage:Ref<string> = ref('');
  const formData: Ref<configInSeat> = ref({
    regex: 'SNH48 GROUP 第39张EP《Bye Bad Bye》精装版',
    targetTime: '',
  });
  //@ts-ignore
  window.inPutAPI.onAutomationError((err) => {
    errorMessage.value = `运行失败：${err}`;
    showError.value = true;
    setTimeout(() => showError.value = false, 3000); // 3秒后自动隐藏
  });
  const handleSubmit = () => {
    const configToSave = {
      regex: formData.value.regex,
      targetTime: formData.value.targetTime,
      selectedGroup: formData.value.selectedGroup,
    }
    try {
      //@ts-ignore
      window.inPutAPI.saveConfig(configToSave);
    } catch (error) {
      console.error('保存配置失败:', error);
    }
  }
  
  const startAutomation = async () => {
    try {
      //@ts-ignore
      await window.inPutAPI.runAutomation(ticketType.value);
    }
    catch (error) {
      throw error;
    }
  };
  
  </script>
  
  <style scoped>
  </style>
  