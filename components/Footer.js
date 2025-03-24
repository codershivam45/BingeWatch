import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-[#8e44ad] to-[#3498db] text-white py-6">










            <div className="container mx-auto flex flex-col items-center space-y-4">
                {/* Logo */}
                <h1 className="text-4xl font-bold tracking-wide">BingeWatch</h1>

                {/* Tagline */}
                <p className="text-sm italic text-gray-200">
                    Made with ❤️ for movie lovers.
                </p>

                {/* Social Media Icons */}
                <div className="flex gap-6 mt-2">
                    <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-gray-300 transition-transform transform hover:scale-110"
                    >
                        <FaFacebookF size={20} />
                    </a>
                    <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-gray-300 transition-transform transform hover:scale-110"
                    >
                        <FaTwitter size={20} />
                    </a>
                    <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-gray-300 transition-transform transform hover:scale-110"
                    >
                        <FaInstagram size={20} />
                    </a>
                    <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-gray-300 transition-transform transform hover:scale-110"
                    >
                        <FaYoutube size={20} />
                    </a>
                </div>

                {/* Copyright */}
                <div className="text-xs text-gray-300 mt-2">
                    © {new Date().getFullYear()} BingeWatch. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
