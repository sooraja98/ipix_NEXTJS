"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation'
import axios from 'axios'
const NavBar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const router = useRouter()
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const logout = async () => {
        try {
            await axios.get('/api/admin/logout')
            router.push('/admin')
        } catch (error) {
            console.log(error.message);
            toast.error(error.message)
        }
    }
    return (
        <>
            <nav className='bg-transparent text-white p-4'>
                <div className='flex justify-between'>
                    <div className='text-white text-3xl items-center justify-center p-4 md:flex md:items-center'>
                        <Link href="/admindashboard">LOGO</Link>
                    </div>
                    <div className='hidden md:flex gap-4 p-4'>
                        <div className='hover:border-b-2'>
                            <Link href="/admindashboard">USER</Link>
                        </div>
                        <div className='hover:border-b-2'>
                            <Link href="/catelog">CATELOG</Link>
                        </div>
                        <div className='hover:border-b-2'>
                            <button onClick={logout}>
                                <Link href="/logout">LOGOUT</Link>
                            </button>
                        </div>
                    </div>
                    <div className='md:hidden p-4'>
                        <button onClick={toggleMobileMenu} >
                            <svg width="30px" height="30px" viewBox="0 0 1024 1024" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="white">
                                <path d="M64 192h896v76.8H64V192z m0 281.6h896v76.8H64V473.6z m0 281.6h896V832H64v-76.8z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>
            <div className='flex justify-center'>
                {
                mobileMenuOpen && (
                    <div className='md:hidden w-32 text-white text-center shadow-2xl justify-end'>
                        <div className='border-b-2 hover:bg-gray-500 rounded-sm p-1'>
                        <Link href="/usermanagement">USER</Link>
                        </div>
                        <div className='border-b-2 hover:bg-gray-500 rounded-sm p-1'>
                        <Link href="/catelog">CATELOG</Link>
                        </div>
                        <div className='hover:border-b-2'>
                            <button onClick={logout}>
                            LOGOUT
                                                        </button>
                        </div>
                    </div>
                )
            }
            </div>
        </>
    );
};

export default NavBar;
