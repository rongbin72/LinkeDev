import { ToastType, toast, Toast } from 'react-toastify'

export default function(msg: string, type: string) {
  toast.success(msg)
}
