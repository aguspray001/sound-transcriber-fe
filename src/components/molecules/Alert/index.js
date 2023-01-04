import React from 'react'
import Swal from 'sweetalert2'

function Alert({title, text, icon}) {
  return Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonText: 'Close'
  })
}

export default Alert