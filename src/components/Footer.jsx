import React from "react";
import Section from "./Section";
import { socials } from "../constants";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <Section crosses className="!px-0 !py-10">
      <motion.div
        className="container flex sm:justify-between justify-center items-center gap-10 max-sm:flex-col"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.p
          className="caption text-n-4 lg:block text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          © {new Date().getFullYear()}. All rights reserved.
        </motion.p>

        <motion.ul
          className="flex gap-5 flex-wrap justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {socials.map((item) => (
            <motion.a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 bg-n-7 rounded-full transition-transform hover:scale-110 hover:shadow-lg"
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.3 },
              }}
            >
              <img
                src={item.iconUrl}
                width={16}
                height={16}
                alt={item.title}
                className="transition-transform"
              />
            </motion.a>
          ))}
        </motion.ul>
      </motion.div>
    </Section>
  );
};

export default Footer;
