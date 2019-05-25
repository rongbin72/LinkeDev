import React, { useEffect } from 'react'
import { toast, Slide, Flip, Zoom } from 'react-toastify'
import Swal from 'sweetalert2'
import Loading from './Loading'

const NotFound: React.FC = () => {
  useEffect(() => {
    toast.success('Not Found !', {
      position: toast.POSITION.BOTTOM_RIGHT,
      transition: Slide
    })
    toast.error('Not Found !', {
      position: toast.POSITION.BOTTOM_LEFT,
      transition: Flip
    })
    toast.info('Not Found !', {
      position: toast.POSITION.TOP_LEFT,
      transition: Zoom
    })
    toast('Not Found !', { position: toast.POSITION.TOP_CENTER })
    toast('Not Found !', { position: toast.POSITION.TOP_RIGHT })
    toast('Not Found !', { position: toast.POSITION.BOTTOM_CENTER })
    let timerInterval: any

    Swal.fire({
      title: "You don't belong here",
      html: 'You have <strong></strong> millieseconds to leave.',
      timer: 5000,
      onBeforeOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {
          ;(Swal.getContent().querySelector('strong')!
            .textContent as any) = Swal.getTimerLeft()
        }, 50)
      },
      onClose: () => {
        clearInterval(timerInterval)
      }
    }).then(result => {
      if (
        // Read more about handling dismissals
        result.dismiss === Swal.DismissReason.timer
      ) {
        console.log('I was closed by the timer')
      }
    })

    setTimeout(() => {
      toast("It' OK, :)", { position: toast.POSITION.TOP_CENTER })
    }, 7000)
  }, [])

  return (
    <>
      <h1 className='x-large text-primary'>
        <i className='fas fa-skull-crossbones' /> Danger Zone
      </h1>
      <p className='large'>Dangerous, Go Back</p>
      <Loading />
    </>
  )
}

export default NotFound
