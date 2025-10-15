"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import {
  UserIcon,
  PencilSquareIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { motion } from "motion/react";

const Sidebar = () => {
  const navitems = [
    {
      title: "Edit Profile",
      src: <UserIcon className="w-6 h-6"></UserIcon>,
    },
    {
      title: "Settings",
      src: <PencilSquareIcon className="w-6 h-6"></PencilSquareIcon>,
    },
    {
      title: "Login",
      src: <Cog6ToothIcon className="w-6 h-6"></Cog6ToothIcon>,
    },
  ];

  const [open, setOpen] = useState(false);

  const sidebarvariant = {
    open: {
        width: "10rem"
    },

    close: {
        width: "2rem"
    },
  };

  const childvariants = {
    open: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3
        }
    }, 
    close: {
        transition: {
            staggerDirection: -1,
            staggerChildren: 0.05
        }
    }
  }
  const parentvariants = {
    open: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)"
    },
    close: {
      opacity: 0,
      y: 10,
      filter: "blur(10px)"
    },
  };

  const [hover, setHover] = useState(null);

  return (
    <motion.div
      initial={false}
      onHoverStart={() => setOpen(true)}
      onHoverEnd={() => setOpen(false)}
      animate={open ? "open" : "close"}
      exit="close"
      className="h-screen backdrop-blur-sm border-l border-neutral-800/10 shadow-md absolute right-0 rounded-tl-2xl rounded-bl-2xl cursor-pointer px-4 z-50"
    >
      <motion.nav 
      variants={sidebarvariant}
      transition={{
        duration: 0.5
      }}
      className="flex flex-col justify-center gap-y-10">
        <div className="py-6 flex justify-start items-center gap-x-10">
          {open ? (
            <ChevronRightIcon className="w-8 h-8 text-shadow-lg"></ChevronRightIcon>
          ) : (
            <ChevronLeftIcon className="w-8 h-8 text-shadow-lg"></ChevronLeftIcon>
          )}
          {open && <UserCircleIcon className="w-16 h-16"></UserCircleIcon>}
        </div>
        <nav>
          <motion.ul variants={childvariants} className="flex flex-col justify-center list-none">
            {navitems.map((item, idx) => (
              <motion.li
                variants={parentvariants}
                className="px-2 flex justify-start py-4 gap-3 relative"
                key={idx}
                onHoverStart={() => setHover(idx)}
                onHoverEnd={() => setHover(null)}
              >
                {item.src} {open && item.title}
                {idx === hover && (<motion.span layoutId="hover" className="absolute inset-0 bg-neutral-500 rounded-lg -z-10"></motion.span>)}
              </motion.li>
            ))}
          </motion.ul>
        </nav>
      </motion.nav>
    </motion.div>
  );
};
export default Sidebar;
