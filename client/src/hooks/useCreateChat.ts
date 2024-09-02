import { toast } from "react-toastify"
import { useCreateChatMutation, useLazyGetChatsQuery } from "../app/services/chatApi"
import { hasErrorField } from "../utils/hasErrorField"
import { useDispatch } from "react-redux"
import { join } from "../app/slices/chatSlice"




const useCreateChat = () => {
  const [create] = useCreateChatMutation()
  const [triggerGetAllChats] = useLazyGetChatsQuery()
  const dispatch = useDispatch()


  const fetchCreateChat = async (receiverId: string) => {
    try {
      const res = await create({ receiverId }).unwrap()
      triggerGetAllChats().unwrap()
      dispatch(join(res.chat))
      toast.success(res.message)
    } catch (error) {
      if (hasErrorField(error)) {
        toast.error(error.data.message)
      }
    }
  }

  return {
    fetchCreateChat,
  }

}

export default useCreateChat