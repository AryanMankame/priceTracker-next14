"use client"

import { FormEvent, Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import { sendEmail } from '@/lib/nodemailer'
import { setUserTrackedAndSendWelcomeEmail } from '@/lib/actions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchHighestLowestAveragePrice, fetchUsersUsingProductId, storeUserTracked } from '@/lib/db'
export default function Modal({ productInfo } : any) {
  let [isOpen, setIsOpen] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    setIsSubmitting(false)
    setEmail('')
    closeModal()
  }
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const notifySuccess = (message : string) => toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });
  const notifyFailure = (warning : string) => toast.warn(warning, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark"
    });
  return (
    <div>
        <div className="mt-7">
            <button className = "w-full py-4 px-4 bg-[#282828] hover:bg-opacity-70 rounded-[30px] text-white text-lg font-semibold" onClick={openModal}>
                Track
            </button>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" onClose={closeModal} className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-60">
                <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    >
                    <Dialog.Overlay className="fixed inset-0" /> 
                    </Transition.Child>

                    <span
                    className="inline-block h-screen align-middle"
                    aria-hidden="true"
                    />
                    
                    <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                    >
                    <div className="p-6  bg-white inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform  shadow-xl rounded-2xl">
                        <div className="flex flex-col">
                        <div className="flex justify-between">
                            <div className="p-3 border border-gray-200 rounded-10">
                            <Image 
                                src="https://raw.githubusercontent.com/adrianhajdin/pricewise/94b72079a2f7928d194087df60e9fb1c04446636/public/assets/icons/logo.svg"
                                alt="logo"
                                width={28}
                                height={28}
                            />
                            </div>

                            <Image 
                            src="https://raw.githubusercontent.com/adrianhajdin/pricewise/94b72079a2f7928d194087df60e9fb1c04446636/public/assets/icons/x-close.svg"
                            alt="close"
                            width={24}
                            height={24}
                            className="cursor-pointer"
                            onClick={closeModal}
                            />
                        </div>

                        <h4 className="text-secondary text-lg leading-[24px] font-semibold mt-4">
                            Stay updated with product pricing alerts right in your inbox!
                        </h4>

                        <p className="text-sm text-gray-600 mt-2">
                            Never miss a bargain again with our timely alerts!
                        </p>
                        </div>

                        <form className="flex flex-col mt-5" onSubmit={handleSubmit}>
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Email address
                        </label>
                        <div className="px-5 py-3 mt-3 flex items-center gap-2 border border-gray-300 rounded-[27px]">
                            <Image 
                            src="https://raw.githubusercontent.com/adrianhajdin/pricewise/94b72079a2f7928d194087df60e9fb1c04446636/public/assets/icons/mail.svg"
                            alt='mail'
                            width={18}
                            height={18}
                            />

                            <input 
                            required
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                            className='flex-1 pl-1 border-none text-gray-500 text-base focus:outline-none border border-gray-300 rounded-[27px] shadow-xs'
                            />
                        </div>

                        <button type="submit"
                            className="px-5 py-3 text-white text-base font-semibold border border-secondary bg-[#282828] rounded-lg mt-8"
                            onClick={async (e) => {
                                e.preventDefault();
                                try{
                                    const msg = await setUserTrackedAndSendWelcomeEmail(email , productInfo.title, productInfo.image, productInfo.id);
                                    console.log(msg);
                                    if(msg === 'Product is already being tracked') notifyFailure(msg);
                                    else notifySuccess(msg);
                                    await storeUserTracked(email, productInfo.id);
                                }
                                catch(err){
                                    notifyFailure('Something went wrong.');
                                }
                            }}
                        >
                            {isSubmitting ? 'Submitting...' : 'Track'}
                        </button>
                        </form>
                    </div>
                    </Transition.Child>
                </div>
                </Dialog>
            </Transition>
        </div>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
        />

    </div>
  )
}
