"use client"

import Image from "next/image";
import {useEffect, useState} from "react";
import {useUser} from "@auth0/nextjs-auth0/client";

interface Item {
    name: string,
    href: string
}

export default function Navbar({items}: { items: Item[] }) {
    const [expanded, setExpanded] = useState(false);
    const [isTop, setIsTop] = useState(true);
    const {user, isLoading} = useUser();

    const changeNavBg = () => {
        window.scrollY == 0 ? setIsTop(true) : setIsTop(false);
    }

    useEffect(() => {
        window.addEventListener('scroll', changeNavBg);
        return () => {
            window.removeEventListener('scroll', changeNavBg);
        }
    }, [])

    return (
        <nav className={`fixed w-full z-40 top-0 start-0`}>
            <div className={`fixed w-full z-40 backdrop-blur transition duration-500 ${isTop && !expanded ? "bg-white/30" : "bg-white/90"}`}>
                <div className="max-w-screen-xl border-b border-gray-200 flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="#" className="flex items-center space-x-3">
                        <Image src="/assets/icon.png" alt="icon" width={32} height={32}/>
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">Invtify</span>
                    </a>

                    <div className="items-center justify-between hidden w-full md:flex md:w-auto">
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                            {items.map(({name, href}, id) => <li key={id}>
                                <a href={`${href}`} className="py-2 px-3 leading-6 text-gray-900 transition hover:text-primary-400 duration-300 md:p-0">{name}</a>
                            </li>)}
                        </ul>
                    </div>

                    <div className={`hidden md:flex gap-x-2 ${isLoading ? "opacity-0" : ""}`}>
                        <a
                            href={user ? "/api/auth/logout" : "/api/auth/login"}
                            className="text-sm font-medium px-3 py-2 mt-auto text-gray-900 transition hover:text-primary-400 duration-300">
                            {user ? "Log Out" : "Log In"}
                        </a>
                        <a
                            href={user ? "/dashboard" : "/api/auth/login"}
                            className="rounded-md bg-primary-400 text-sm font-medium px-3 py-2 mt-auto text-white shadow-sm transition ease-in-out hover:bg-primary-300 duration-300">
                            {user ? "Dashboard" : "Sign Up"}
                        </a>
                    </div>

                    <button type="button"
                            className="inline-flex items-center p-2 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                            onClick={() => setExpanded(!expanded)}
                    >
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path className={`${expanded ? "opacity-0" : "opacity-100"} transition duration-300`} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M1 1h15M1 7h15M1 13h15"/>
                            <path className={`${expanded ? "opacity-100" : "opacity-0"} transition duration-300`} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M3 1 l 12 12 M15 1 l -12 12"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div
                className={`flex md:hidden justify-between w-full backdrop-blur bg-white/90 transition duration-500 transform ${expanded ? "translate-y-16" : "-translate-y-full"}`}>
                <div className="flex flex-col w-full space-y-8 justify-between mx-8 font-medium">
                    <ul className="flex flex-col w-full space-y-8 items-center mt-8 pb-8 border-b">
                        {items.map(({name, href}, id) => <li key={id}>
                            <a href={`${href}`} className="leading-6 text-gray-900 transition hover:text-primary-400 duration-300">{name}</a>
                        </li>)}
                    </ul>
                    <div className={`flex flex-col w-full space-y-2 items-center pb-8`}>
                        <a
                            href={user ? "/api/auth/logout" : "/api/auth/login"}
                            className="rounded-md w-full py-2 border border-gray-300 text-center text-gray-900 transition ease-in-out hover:bg-gray-200 duration-300">
                            {user ? "Log Out" : "Log In"}
                        </a>
                        <a
                            href={user ? "/dashboard" : "/api/auth/login"}
                            className="rounded-md bg-primary-400 w-full py-2 text-center text-white shadow-sm transition ease-in-out hover:bg-primary-300 duration-300">
                            {user ? "Dashboard" : "Sign Up"}
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}