import { toast } from "react-toastify"
import { useLazyGetMessagesQuery, useUpdateMessageMutation } from "../app/services/messageApi"
import { hasErrorField } from "../utils/hasErrorField"
import { useModal } from "../context/ModalContext"





const useUpdateMessage = () => {
  const {closeModal} = useModal()
  const [update, { isLoading }] = useUpdateMessageMutation()
  const [triggerGetAllMessages] = useLazyGetMessagesQuery()
  const fetchUpdateMessage = async (data: { message: string, messageId: string, chatId: string }) => {
    try {
      const res = await update(data).unwrap()
      triggerGetAllMessages(data.chatId).unwrap()
      toast.success(res.message)
      closeModal()
    } catch (error) {
      if (hasErrorField(error)) {
        toast.error(error.data.message)
      }
    }
  }

  return { fetchUpdateMessage, isLoading }

}
export default useUpdateMessage