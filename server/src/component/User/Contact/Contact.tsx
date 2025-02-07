import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import toast from 'react-hot-toast';
import { FormspreeProvider, useForm, ValidationError } from '@formspree/react';

const Contact = () => {
  // Initialize state with empty strings


  const [state, handleSubmit] = useForm("xldglnzg");
  if (state.succeeded) {
    return <p>Thanks for joining!</p>;
  }



  return (
    <>
      <Navbar />
      <div className="relative mx-auto w-full bg-white">
        <div className="grid min-h-screen grid-cols-10">
          <div className="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
            <div className="mx-auto w-full mt-12 max-w-lg">
              <h1 className="relative text-2xl font-bold text-gray-700 sm:text-3xl"> Have a Shipment in Mind? <br /> Let’s Make It Happen!<span className="mt-2 block h-1 w-10 bg-gray-600 sm:w-20"></span></h1>
              <form onSubmit={handleSubmit} action="" className="mt-10 flex flex-col space-y-4">
                <div><label className="text-xs font-semibold text-gray-500">Email</label><input type="email" id="email" name="email" placeholder="john.capler@fang.com" className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" />
                  <ValidationError
                    prefix="email"
                    field="email"
                    errors={state.errors}
                  /></div>
                <div className="relative"><label className="text-xs font-semibold text-gray-500">Phone number</label><input type="text" id="card-number" name="card-number" placeholder="1234-5678-XXXX-XXXX" className="block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" />
                  <ValidationError
                    prefix="phone"
                    field="phone"
                    errors={state.errors}
                  />
                  <img src="/images/uQUFIfCYVYcLK0qVJF5Yw.png" alt="" className="absolute bottom-3 right-3 max-h-4" />
                </div>

                <div>
                  <label className="sr-only">Person name</label>
                  <input type="text" id="name" name="name" placeholder="john doe " className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" />
                  <ValidationError
                    prefix="name"
                    field="name"
                    errors={state.errors}
                  />
                </div>

                <div>
                  <label className="sr-only">Comments</label>
                  <textarea name="comment" placeholder="Comments..." className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" />
                  <ValidationError
                    prefix="Message"
                    field="message"
                    errors={state.errors}
                  />
                </div>
              </form>

              <button type="submit" className="mt-4 inline-flex w-full items-center justify-center rounded bg-gray-600 py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-teal-500 sm:text-lg">Place Order</button>
            </div>
          </div>
          <div className="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
            <h2 className="sr-only">Order summary</h2>
            <div>
              <img src="https://images.unsplash.com/photo-1581318694548-0fb6e47fe59b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-gray-800 to-gray-400 opacity-95"></div>
            </div>
            <div className="relative">
              <ul className="space-y-5">
                <li className="flex justify-between">
                  <div className="inline-flex">

                    <div className="ml-3">
                      <p className="text-base font-semibold text-white">Nano Titanium Hair Dryer</p>
                      <p className="text-sm font-medium text-white text-opacity-80">Pdf, doc Kindle</p>
                    </div>
                  </div>

                </li>
                <li className="flex justify-between">
                  <div className="inline-flex">
                    <div className="ml-3">
                      <p className="text-base font-semibold text-white">Luisia H35</p>
                      <p className="text-sm font-medium text-white text-opacity-80">Hair Dryer</p>
                    </div>
                  </div>

                </li>
              </ul>
              <div className="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>

            </div>
            <div className="relative mt-10 text-white">
              <h3 className="mb-5 text-lg font-bold">Support</h3>
              <p className="text-sm font-semibold">+01 653 235 211 <span className="font-light">(International)</span></p>
              <p className="mt-1 text-sm font-semibold">support@nanohair.com <span className="font-light">(Email)</span></p>
              <p className="mt-2 text-xs font-medium">Call us now for payment related issues</p>
            </div>
            <div className="relative mt-10 flex">
              <p className="flex flex-col"><span className="text-sm font-bold text-white">Money Back Guarantee</span><span className="text-xs font-medium text-white">within 30 days of purchase</span></p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Contact;

// Make sure to run npm install @formspree/react
// For more help visit https://formspr.ee/react-help



