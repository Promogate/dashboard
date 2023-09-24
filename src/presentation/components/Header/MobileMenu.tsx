import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { CiMenuBurger } from "react-icons/ci";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="md:hidden">
        <button className="text-white" onClick={openModal}>
          <CiMenuBurger size={24} />
        </button>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 " />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="right opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full h-[90vh] max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left 
                align-middle shadow-xl transition-all">
                  <div className="mt-4 ml-auto flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-purple-100 px-4 py-2 
                      text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring-2 
                      focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      <AiOutlineClose />
                    </button>
                  </div>
                  <div className="mt-16">
                    <div className="grid items-center text-center gap-y-8 font-semibold">
                      <Link href={"/promocoes-recentes"}>
                        Promoções recentes
                      </Link>
                      <Link href={"/lojas"}>
                        Lojas
                      </Link>
                      <Link href={"/cashback"}>
                        Cashback
                      </Link>
                      <Link href={"/blog"}>
                        Blog
                      </Link>
                    </div>
                  </div>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}