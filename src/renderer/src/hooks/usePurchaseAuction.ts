import { ref,Ref } from 'vue'
import  { type configInSeat } from '../types/index'

export const usePurchaseAuction = () => {
    const formData: Ref<configInSeat> = ref({
        regex: '',
        targetTime: '',
        myPrice: 0,
      });
      
      const ticketType:Ref<string> = ref('AUCTION')
      const showError:Ref<boolean> = ref(false)
      const showSuccess:Ref<boolean> = ref(false)
      
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

      return {
        
      }
}