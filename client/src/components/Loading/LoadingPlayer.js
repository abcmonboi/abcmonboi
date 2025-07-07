import React,{memo} from 'react'
import {RotatingLines} from 'react-loader-spinner'

const LoadingPlayer = () => {
  return (
    <RotatingLines
  strokeColor="grey"
  strokeWidth="5"
  animationDuration="0.75"
  width="30"
  visible={true}
/>
  )
}

export default memo(LoadingPlayer)