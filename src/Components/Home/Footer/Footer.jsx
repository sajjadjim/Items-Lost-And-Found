import React from 'react';
import { ImFacebook2 } from "react-icons/im";
import { IoLogoYoutube } from "react-icons/io5";
import { AiFillInstagram } from "react-icons/ai";
import { FaTwitterSquare } from "react-icons/fa";
import { Link } from 'react-router';
import { SiTemporal } from "react-icons/si";

const Footer = () => {
  return (
    <div>
      <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
        <nav>
          <h6 className="footer-title">Services</h6>
          {/* <a className="link link-hover">Products</a> */}
          <a className="link link-hover">Posting</a>
          <a className="link link-hover">Finding</a>
          <a className="link link-hover">Product Recover</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <Link to='/aboutUs' className="link link-hover">About us</Link>
          <Link to='/contact'>Contact</Link>
          <Link to='/FaQ'>FaQ</Link>
          <Link to='/termOfUse' className="link link-hover">Terms of use</Link>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <Link to='/termOfUse' className="link link-hover">Terms of use</Link>
          <Link to='/privacyPolicy' className="link link-hover">Privacy policy</Link>
          {/* <a className="link link-hover">Cookie policy</a> */}
        </nav>
      </footer>
      <footer className="footer bg-base-200 text-base-content border-base-300 border-t px-10 py-2">
        <aside className="grid-flow-col items-center">
      
          <p>
           <SiTemporal className='text-green-500 md:h-8 md:w-8' /> Lost and Found Website Ltd.
            <br />
            Providing reliable  since 2025
          </p>
        </aside>
        <nav className="md:place-self-center md:justify-self-end">
          <div className="grid items-center grid-flow-col gap-4">
            <a className='cursor-pointer' href="https://www.facebook.com/" target='_blank' rel="noopener noreferrer">
              <ImFacebook2 className='h-8 w-auto text-blue-600' />
            </a>
            <a className='cursor-pointer' href="https://www.youtube.com/" target='_blank' rel="noopener noreferrer">
              <IoLogoYoutube className='h-10 w-auto text-red-500' />
            </a>
            <a className='cursor-pointer' href="https://www.instagram.com/" target='_blank' rel="noopener noreferrer">
              <AiFillInstagram className='h-10 w-auto text-[#E1306C]' />
            </a>
            <a className='cursor-pointer' href="https://www.x.com/" target='_blank' rel="noopener noreferrer">
              <FaTwitterSquare className='h-10 w-auto text-blue-500' />
            </a>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;