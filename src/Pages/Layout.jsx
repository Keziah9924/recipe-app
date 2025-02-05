import React from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/Footer'

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <main className='p-6'>
            {children}
            </main>
            <Footer />
        </>
    )
}

export default Layout