import { toast } from "react-toastify"
import { useSendMessageMutation, useLazyGetMessagesQuery } from "../app/services/messageApi"
import { hasErrorField } from "../utils/hasErrorField"


const useSendMessage = () => {
  const [sendMessage, { isLoading }] = useSendMessageMutation()
  const [triggerGetAllMessages] = useLazyGetMessagesQuery()

  const fetchSendMessage = async (data: { chatId: string, message: string }, resetField: () => void) => {
    try {
      await sendMessage(data).unwrap()
      await triggerGetAllMessages(data.chatId).unwrap()
      resetField()
    } catch (error) {
      if (hasErrorField(error)) {
        toast.error(error.data.message)
      }
    }
  }

  return { fetchSendMessage, isLoading }
}

export default useSendMessage