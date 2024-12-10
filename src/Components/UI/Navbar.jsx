import React from 'react'

const Navbar = () => {
  return (
  

<nav className='w-screen h-auto  absolute top-0 bg-transparent'
>

<div className='my-5 flex w-full justify-start lg:justify-between px-10'>



<div  >
    <img src="./color-options/boxing-logos/boxing_logo.png" className=' hidden lg:block w-16 lg:w-52 ' alt="" />
</div>


<div className='flex justify-center items-center  '>
 
  <button 
    className='btn ' 
    onClick={() => {
      const drawer = document.getElementById('my-drawer-popular');
      if (drawer) {
        drawer.checked = !drawer.checked;
      }
    }}
  >
    Select Popular Designs
  </button>
</div>

</div>

</nav>

  )
}

export default Navbar
