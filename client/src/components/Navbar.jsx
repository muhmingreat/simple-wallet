import {HiMenuAlt4} from 'react-icons/hi'
import {AiOutlineClose} from 'react-icons/ai'
import Logo from '../../images/logo.png'
import { useState } from 'react'

const NavbarItem  = ({ title, classProps}) =>{
    return (
        <li className={`mx-4 cursor-pointer 
        ${classProps}`}>
            {title}
        </li>
    )
}

const Navbar = () => {
   const [toggleMenu, setToggleMenu] = useState(false) 
  return (
    <nav
      className="w-full flex
    md:justify-center justify-between
    items-center p-4"
    >
      <div
        className="md:flex-[0.5]
        flex-initial justify-center items-center p-4"
      >
        <img src={Logo} alt="logo" className="w-32 cursor-pointer" />
      </div>
      <ul
        className="text-[white] md:flex hidden list-none 
      flex-row justify-between items-center flex-initial"
      >
        {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
          <NavbarItem key={item + index} title={item} />
        ))}
        <li
          className="bg-[#2952e3] 
      py-2 px-7 mx-4 rounded-full cousor-pointer hover:bg-[#2546bd]"
        >
          Login
        </li>
      </ul>
      <div className="flex relative">
        {toggleMenu ? (
          <AiOutlineClose
            size={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <HiMenuAlt4
            size={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(true)}
          />
        )}
      </div>
      {toggleMenu && (
        <ul className='z-10 fixed top-0 -right-2 p-3
        w-[78vw] h-screen shadow-2xl md:hidden list-none
        flex flex-col justify-start items-end rounded-md blue-glassmorphism
        text-white animate-slide-in'>
          <li className="text-xl w-full my-2">
            <AiOutlineClose onClick={() => setToggleMenu(false)} />
            {["Market", "Exchange", "Tutorials", "Wallets"].map(
              (item, index) => (
                <NavbarItem key={item + index} title={item} classProps='my-2 text-lg' />
              )
            )}
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar