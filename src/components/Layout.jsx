import React from 'react'
import Navbar from './navbar'
const Layout = (props) => {
    return(
        <>
        <Navbar />
        <main className='p-6'>
            {props.children}
        </main>
        </>
    )
}

export default Layout