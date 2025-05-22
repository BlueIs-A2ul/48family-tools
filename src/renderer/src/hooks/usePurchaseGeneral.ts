import { ref, Ref } from 'vue'
import { configInSeat } from '../types/index'

export const usePurchaseGeneral = () => {
  const ticketType: Ref<string> = ref('GENERAL');

	const showError:Ref<boolean> = ref(false);
	const showSuccess:Ref<boolean> = ref(false);

	const errorMessage:Ref<string> = ref('');
	const formData: Ref<configInSeat> = ref({
		regex: '',
		targetTime: '',
		selectedGroup: '',
	});
	const group = [
		'BEJ48',
		'CGT48',
		'CKG48',
		'GNZ48',
	]
	const handleSubmit = async () => {
		const configToSave = {
			regex: formData.value.regex,
			targetTime: formData.value.targetTime,
			selectedGroup: formData.value.selectedGroup,
		}
		try {
			//@ts-ignore
			await window.inPutAPI.saveConfig(configToSave);
			showSuccess.value = true;
			setTimeout(() => showSuccess.value = false, 3000); // 3秒后自动隐藏
		} catch (error) {
			showError.value = true;
			console.error('保存配置失败:', error);
		}
	}

  return {
		ticketType,
		showError,
		showSuccess,
		group,
		errorMessage,
		formData,
		handleSubmit,
  }
}
