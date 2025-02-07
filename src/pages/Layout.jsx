import React from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/Footer'

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <div style={{ padding: '100px 200px 300px 200px' }}>
                {children}
            </div>
            <Footer />
        </>
    )
}


export default Layout