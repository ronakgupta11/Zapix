import React from 'react'
import { Navbar,Button ,DarkThemeToggle, Flowbite} from 'flowbite-react'
import { AuthContext } from '@/context/AuthProvider'
import { useContext } from 'react'
import Link from 'next/link'
import SpinnerBtn from './SpinnerBtn'
function NavbarC(props) {
  const {login,logout,loginInProcess,currentPKP,isAuthenticated} = useContext(AuthContext)
  console.log("isAuth",isAuthenticated())
  return (
    



<div>


<Navbar
  fluid={true}
  rounded={true}
  className='border-b rounded-none dark:border-gray-600'
>
  <Navbar.Brand href="/">
    <img
      src="https://flowbite.com/docs/images/logo.svg"
      className="mr-3 h-6 sm:h-9"
      alt="Flowbite Logo"
    />
    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
      Flowbite
    </span>
  </Navbar.Brand>
  <div className="flex md:order-2">
    {!isAuthenticated() && !loginInProcess && <Button className='mr-2' onClick={login}>
      Get started
    </Button>}
    {!isAuthenticated() && loginInProcess &&<SpinnerBtn/>}
    {isAuthenticated() && <Button onClick={logout}>logout</Button> }
    <Flowbite>

    <DarkThemeToggle />
    </Flowbite>
    <Navbar.Toggle />
  </div>
{ isAuthenticated() && <Navbar.Collapse>
    <Link href="/">
      Chat
    </Link>
    <Link href="/dashboard">
      Chat
    </Link>
    <Link href="/Profile">
      Chat
    </Link>
    <Link href="/Chat">
      Chat
    </Link>
  </Navbar.Collapse>}
</Navbar>
<div>
  {props.children}
</div>

</div>
  )
}

export default NavbarC