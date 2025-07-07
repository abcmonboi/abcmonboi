import React,{memo} from 'react'
import { ColorRing } from 'react-loader-spinner'

const Loading = () => {
  return (

                                          <ColorRing
  visible={true}
  height="100"
  width="100"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
  colors={['#2eb135', '#2eb135', '#2eb135', '#2eb135', '#2eb135']}
/>

  )
}

export default memo(Loading)