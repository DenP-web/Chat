import { toast } from "react-toastify"
import { useLoginMutation } from "../app/services/authApi"
import { LoginFormData } from "../app/types"
import { hasErrorField } from "../utils/hasErrorField"




const useLogin = () => {
  const [login, { isLoading }] = useLoginMutation()


  const fetchLogin = async (data: LoginFormData) => {
    try {
      const res = await login(data).unwrap()
      toast.success(res.message)
    } catch (error) {
      if (hasErrorField(error)) {
        toast.error(error.data.message)
      }
    }
  }

  return {
    fetchLogin,
    isLoading
  }

}

export default useLogin