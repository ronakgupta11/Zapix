import React from 'react'
import { Navbar,Button ,DarkThemeToggle, Flowbite} from 'flowbite-react'
function NavbarC(props) {
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
    <Button className='mr-2'>
      Get started
    </Button>
    <Flowbite>

    <DarkThemeToggle />
    </Flowbite>
    <Navbar.Toggle />
  </div>
  <Navbar.Collapse>
    <Navbar.Link
      href="/"
      active={true}
    >
      Home
    </Navbar.Link>
    <Navbar.Link href="/Explore">
      Explore
    </Navbar.Link>
    <Navbar.Link href="/Chat">
      Chat
    </Navbar.Link>
    <Navbar.Link href="/Profile">
      Profile
    </Navbar.Link>
    {/* <Navbar.Link href="/navbars">
      Contact
    </Navbar.Link> */}
  </Navbar.Collapse>
</Navbar>
<div>
  {props.children}
</div>

</div>
  )
}

export default NavbarC