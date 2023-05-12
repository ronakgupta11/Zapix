import React from 'react'

function Avatar(props) {
  return (
    <img class="w-10 h-10 rounded-full" src={props.image} alt="Rounded avatar"/>
  )
}

export default Avatar