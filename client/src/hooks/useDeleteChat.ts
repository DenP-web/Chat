import { toast } from "react-toastify"
import { useDeleteChatMutation, useLazyGetChatsQuery } from "../app/services/chatApi"
import { hasErrorField } from "../utils/hasErrorField"



const useDeleteChat = () => {

  const [deleteChat] = useDeleteChatMutation()
  const [triggerGetAllChats] = useLazyGetChatsQuery()

  const fetchDeleteChat = async (chatId: string) => {
    try {
      const res = await deleteChat(chatId).unwrap()
      await triggerGetAllChats().unwrap()
      toast.success(res.message)
    } catch (error) {
      if (hasErrorField(error)) {
        toast.error(error.data.message)
      }
    }
  }

  return {
    fetchDeleteChat
  }

}

export default useDeleteChat