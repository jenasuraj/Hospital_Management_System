import React from 'react';

const Footer = () => {
  return (
    <>
      <section className='text-white w-full h-24 bg-black flex flex-col md:flex-row items-center justify-between px-5 py-4'>
        <div className='mb-3 md:mb-0'>
          <h2 className='text-xl font-bold'>Medicure</h2>
          <p className='text-gray-400 text-sm'>© 2025 Medicure hospitals. All rights reserved.</p>
        </div>

        <div className='flex items-center gap-5'>
          <a href='#' className='text-gray-400 hover:text-white transition-colors'>About</a>
          <a href='#' className='text-gray-400 hover:text-white transition-colors'>Contact</a>
          <a href='#' className='text-gray-400 hover:text-white transition-colors'>Privacy</a>
          <a href='#' className='text-gray-400 hover:text-white transition-colors'>Terms</a>
        </div>
      </section>
    </>
  );
};

export default Footer;
