export const useAutomationRun = (ticketType:{value:string}) => {
	const startAutomation = async () => {
    try {
			await window.inPutAPI.runAutomation(ticketType.value)
      return null
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
      return errorMessage
    }
  }
  return { startAutomation }
}
