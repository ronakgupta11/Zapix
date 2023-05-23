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
      src="logo.jpg"
      className="mr-3 rounded-lg h-6 sm:h-9"
      alt=""
    />
    <span className="self-center whitespace-nowrap text-2xl font-bold italic text-gray-700 dark:text-white">
      Zapix
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
    {isAuthenticated() && <Navbar.Toggle />}
  </div>
{ isAuthenticated() && <Navbar.Collapse className='font-bold text-gray-600 dark:text-white'>
    <Link href="/dashboard">
      dashboard
    </Link>
    <Link href="/profile">
      Profile
    </Link>
    <Link href="/Chat">
      Chat
    </Link>
    <Link href="/storageDeal">
      storage deals
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