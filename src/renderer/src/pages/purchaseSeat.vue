<template>
  <div class="config-form">
    <div v-if="showError" class="error-tip">{{ errorMessage }}</div>
    <div v-if="showSuccess" class = "success-tip">保存配置成功</div>
    <h2>普座购买</h2>
    <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>目标场次(不确定可点击<a href="https://48.gnz48.com/tickets" target="_blank" rel="noopener noreferrer">此处</a>查看)</label>
          <input v-model="formData.regex" type="text" placeholder="请输入目标场次">
        </div>
        <div class="form-group">
          <label>演出组合</label>
          <select v-model="formData.selectedGroup">
            <option v-for="(value,key) in group" :value="key"> {{ value }}</option>
          </select>
        </div>
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
import { usePurchaseGeneral } from '@renderer/hooks/usePurchaseGeneral';
import { useAutomationRun } from '@renderer/hooks/useAutomationRun';

const { ticketType,showError,errorMessage,formData, handleSubmit,group,showSuccess} = usePurchaseGeneral();
const { startAutomation } = useAutomationRun(ticketType);

</script>

<style scoped>
</style>