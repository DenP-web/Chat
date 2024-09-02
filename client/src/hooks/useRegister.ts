import { useRegisterMutation } from '../app/services/authApi'
import { RegistrationFormData } from '../app/types'
import { hasErrorField } from '../utils/hasErrorField'
import { toast } from 'react-toastify'

const useRegister = () => {
  const [registration, { isLoading }] = useRegisterMutation()

  const fetchRegistration = async (data: RegistrationFormData, clearForm: () => void) => {
    try {
      const res = await registration(data).unwrap()
      clearForm()
      toast.success(res.message)
    } catch (error) {
      if(hasErrorField(error)) {
        toast.error(error.data.message)
      }
    }
  }
  return {
    fetchRegistration, isLoading
  }
}

export default useRegister
