import { Slide, toast } from 'react-toastify'

export default function(msg: string, type: string) {
  switch (type) {
    case toast.TYPE.SUCCESS:
      toast.success(msg, {
        autoClose: 1500,
        position: toast.POSITION.BOTTOM_RIGHT,
        transition: Slide
      })
      break
    case toast.TYPE.ERROR:
      toast.error(msg, { autoClose: 2000, position: toast.POSITION.TOP_CENTER })
      break
    case toast.TYPE.INFO:
      toast.info(msg, {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_RIGHT
      })
      break
    default:
      toast(msg)
  }
}
