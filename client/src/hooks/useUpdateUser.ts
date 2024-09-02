import { toast } from "react-toastify"
import { useUpdateUserMutation } from "../app/services/userApi"
import { UpdateUserFormData } from "../app/types"
import { useLazyCheckUserQuery } from "../app/services/authApi"
import { hasErrorField } from "../utils/hasErrorField"
import { useModal } from "../context/ModalContext"

const useUpdateUser = () => {
  const {closeModal} = useModal()
  const [update, { isLoading }] = useUpdateUserMutation()
  const [triggerUserCheck] = useLazyCheckUserQuery()

  const fetchUpdate = async (data: UpdateUserFormData, resetForm : () => void) => {
    console.log(data)
    try {
      const formData = new FormData()
      data.avatar && formData.append('avatar', data.avatar)
      data.fullName && formData.append('fullName', data.fullName)
      const res = await update(formData).unwrap()
      await triggerUserCheck().unwrap()
      resetForm()
      closeModal()
      toast.success(res.message)
    } catch (error) {
      if (hasErrorField(error)) {
        toast.error(error.data.message)
      }
    }
  }

  return {
    fetchUpdate,
    isLoading
  }
}

export default useUpdateUser