import axios from 'axios'
import { SendMessageParams } from '@tstypes/index'

export const sendMessage = async ({ message, webhookUrl}: SendMessageParams) => {
  try {
    const response = await axios.post(
      'https://test-api-zuwp.onrender.com/send-message',
      { message, webhookUrl }
    )
    return { success: true, data: response.data }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        return { success: false, error: 'Request timed out. Please try again.' }
      }
      const msg = error.response?.data?.message || 'Failed to send message.'
      return { success: false, error: msg }
    }
    return { success: false, error: 'An unexpected error occurred.' }
  }
}
