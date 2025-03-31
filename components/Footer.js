import React from "react";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-6">
            <div className="container mx-auto flex flex-col items-center space-y-4">
                {/* Logo */}
                <Link href="/">
                    <h1 className="text-4xl font-bold tracking-wide cursor-pointer text-[#ecf0f1]">
                        BingeWatch
                    </h1>
                </Link>

                {/* Tagline */}
                <p className="text-sm italic text-[#bdc3c7]">
                    Made with ❤️ for movie lovers.
                </p>

                {/* Social Media Icons */}
                <div className="flex gap-6 mt-2">
                    <Link
                        href="#"
                        className="text-[#ecf0f1] hover:text-[#3498db] transition-transform transform hover:scale-110"
                    >
                        <FaFacebookF size={20} />
                    </Link>

                    <Link
                        href="#"
                        className="text-[#ecf0f1] hover:text-[#3498db] transition-transform transform hover:scale-110"
                    >
                        <FaTwitter size={20} />
                    </Link>

                    <Link
                        href="#"
                        className="text-[#ecf0f1] hover:text-[#3498db] transition-transform transform hover:scale-110"
                    >
                        <FaInstagram size={20} />
                    </Link>

                    <Link
                        href="#"
                        className="text-[#ecf0f1] hover:text-[#3498db] transition-transform transform hover:scale-110"
                    >
                        <FaYoutube size={20} />
                    </Link>
                </div>

                {/* Copyright */}
                <div className="text-xs text-[#95a5a6] mt-2">
                    © {new Date().getFullYear()} BingeWatch. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
