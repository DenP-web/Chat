import { toast } from "react-toastify"
import { useDispatch } from "react-redux"

import { useLogoutMutation } from "../app/services/authApi"
import { hasErrorField } from "../utils/hasErrorField"
import { leave } from "../app/slices/chatSlice"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "../constants"



const useLogout = () => {
  const [logout, { isLoading, }] = useLogoutMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const fetchLogout = async () => {
    try {
      const res = await logout().unwrap()
      dispatch(leave())
      toast.success(res.message)
    } catch (error) {
      if (hasErrorField(error)) {
        toast.error(error.data.message)
        navigate(ROUTES.AUTH_URL)
      }
    }

  }

  return { fetchLogout, isLoading }
}

export default useLogout