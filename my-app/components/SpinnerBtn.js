import React from 'react'
import { Button,Spinner } from 'flowbite-react'

function SpinnerBtn() {
  return (
    <Button>
    <Spinner aria-label="Spinner button example" />
    <span className="pl-3">
      Loading...
    </span>
  </Button>
  )
}

export default SpinnerBtn