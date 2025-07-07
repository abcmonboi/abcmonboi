import {React, memo} from 'react'

const Button = (text,textColor,bgColor) => {
  return (
    <button
    type='button'
    className={`py-2 px-4 rounded-md text-${textColor} bg-${bgColor}`}
    >

    </button>
  )
}

export default memo(Button)