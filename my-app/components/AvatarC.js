import React from 'react'
import { Avatar } from 'flowbite-react'

function AvatarC(props) {
  return (
    <Avatar
  img={props.image}
  rounded={true}
></Avatar>
  )
}

export default AvatarC