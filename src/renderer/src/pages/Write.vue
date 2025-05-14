<template>
  <div class="config-form">
    <div v-if="showError" class="error-tip">配置填写不完整</div>
    <h2>账号配置</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label>用户名</label>
        <input v-model="formData.login.username" type="text" placeholder="请输入用户名">
      </div>
      
      <div class="form-group">
        <label>密码</label>
        <input v-model="formData.login.password" type="password" placeholder="请输入密码">
      </div>

      <div class="form-group">
        <label>竞价数量</label>
        <input v-model="formData.targetCount" type="number" min="1">
      </div>

      <button type="submit">保存配置</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const showError = ref(false)
const formData = ref({
  login: {
    username: '',
    password: ''
  },
  groupLink: {
    BEJ48: "a[href='?brand_id=2']",
    GNZ48: "a[href='?brand_id=3']", 
    CKG48: "a[href='?brand_id=5']",
    CGT48: "a[href='?brand_id=15']"
  },
  regex: "",
  targetTime: "",
  targetCount: ""
})

const handleSubmit = () => {
  if(!formData.value.login.username || !formData.value.login.password ||  !formData.value.targetCount) {
    showError.value = true
    setTimeout(() => {
      showError.value = false
    }, 3000)
    return
  }
  // 创建一个新的可序列化对象
  const configToSave = {
    login: { ...formData.value.login },
    regex: formData.value.regex,
    targetTime: formData.value.targetTime,
    targetCount: formData.value.targetCount
  }
  
  try {
    //@ts-ignore
    window.inPutAPI.saveConfig(configToSave)
  } catch (error) {
    console.error('保存配置失败:', error)
  }
}

</script>

<style scoped>
.error-tip {
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 16px;
  background: #ff4d4f;
  color: white;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; top: 0; }
  to { opacity: 1; top: 40%; }
}
</style>