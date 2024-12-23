import { useState, useEffect } from "react";
import Button from "./Button";
import Heading from "./Heading";
import Section from "./Section";
import Tagline from "./Tagline";
import { roadmap } from "../constants";
import { check2, grid, loading1 } from "../assets";
import { Gradient } from "./design/Roadmap";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import emailjs from "emailjs-com";

const Roadmap = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contribution: "",
  });
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const controls = useAnimation();

 const handleFormSubmit = async (e) => {
   e.preventDefault();
   setIsSubmitting(true);

   try {
     // Mapping formData to EmailJS template variables
     await emailjs.send(
       "service_duvj6oc", // Replace with your EmailJS service ID
       "template_msal7ie", // Replace with your EmailJS template ID
       {
         from_name: formData.name, // Matches {{from_name}} in your template
         from_email: formData.email, // Matches {{from_email}} in your template
         contribution: formData.contribution, // Matches {{contribution}} in your template
       },
       "CYsCptsEz3iSaLxBA" // Replace with your EmailJS user ID
     );
     alert("Message sent successfully!");
   } catch (error) {
     alert("Failed to send message. Please try again.");
   } finally {
     setIsSubmitting(false);
     setIsFormVisible(false);
     setFormData({ name: "", email: "", contribution: "" });
   }
 };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.2,
        type: "spring",
        stiffness: 50,
      },
    }),
    hover: {
      y: -10,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
  };

  useEffect(() => {
    controls.start({
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    });
  }, [controls]);

  return (
    <Section className="overflow-hidden relative" id="roadmap">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 100% 100%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 0% 0%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container md:pb-10 relative z-10">
        <Heading tag="Let's Build Together" title="What we're working on" />

        <div className="relative grid gap-6 md:grid-cols-2 md:gap-4 md:pb-[7rem]">
          {roadmap.map((item, index) => {
            const status = item.status === "done" ? "Done" : "In progress";

            return (
              <motion.div
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                custom={index}
                variants={cardVariants}
                className={`md:flex even:md:translate-y-[7rem] p-0.25 rounded-[2.5rem] ${
                  item.colorful ? "bg-conic-gradient" : "bg-n-6"
                } group`}
                key={item.id}
                onMouseEnter={() => setActiveCard(item.id)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className="relative p-8 bg-n-8 rounded-[2.4375rem] overflow-hidden xl:p-15 shadow-lg transition-all duration-300">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                    initial={false}
                    animate={{ opacity: activeCard === item.id ? 1 : 0 }}
                  />

                  <div className="absolute top-0 left-0 max-w-full">
                    <img
                      className="w-full opacity-10"
                      src={grid}
                      width={550}
                      height={550}
                      alt="Grid"
                    />
                  </div>

                  <div className="relative z-1">
                    <motion.div
                      className="flex items-center justify-between max-w-[27rem] mb-8 md:mb-20"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                    >
                      <Tagline>{item.date}</Tagline>

                      <motion.div
                        className="flex items-center px-4 py-1 bg-n-1 rounded text-n-8"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <motion.img
                          className="mr-2.5"
                          src={item.status === "done" ? check2 : loading1}
                          width={16}
                          height={16}
                          alt={status}
                          animate={
                            item.status === "done" ? {} : { rotate: 360 }
                          }
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                        <div className="tagline">{status}</div>
                      </motion.div>
                    </motion.div>

                    <motion.div
                      className="mb-10 -my-10 -mx-15 overflow-hidden rounded-lg"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.img
                        className="w-full transition-transform duration-300"
                        src={item.imageUrl}
                        width={628}
                        height={426}
                        alt={item.title}
                        whileHover={{ scale: 1.05 }}
                      />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>

                    <motion.h4
                      className="h4 mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                    >
                      {item.title}
                    </motion.h4>
                    <motion.p
                      className="body-2 text-n-4"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                    >
                      {item.text}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            );
          })}

          <Gradient />
        </div>

        <motion.div
          className="mt-20 relative"
          id="call-for-contributors"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <Heading tag="Join the Mission" title="Call for Contributors" />

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-10">
            {[
              {
                id: 1,
                title: "Feature Development",
                description:
                  "Help us build and implement innovative features that enhance our platform. We're looking for contributors with skills in JavaScript, React, or API development to collaborate on creating tools that solve real-world problems.",
                gradient: "from-purple-600 to-blue-500",
                icon: "",
              },
              {
                id: 2,
                title: "Bug Fixes and Optimization",
                description:
                  "Your expertise in debugging and performance tuning can make a significant impact. Join us to identify, report, and resolve bugs, or optimize existing code for better performance and scalability.",
                gradient: "from-pink-600 to-purple-500",
                icon: "",
              },
              {
                id: 3,
                title: "Content Creation",
                description:
                  "Support the community by creating comprehensive documentation, tutorials, or blog posts. If you have a knack for writing and technical communication, your contributions can empower users and other developers.",
                gradient: "from-blue-600 to-cyan-500",
                icon: "",
              },
            ].map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{
                  y: -10,
                  transition: { type: "spring", stiffness: 300 },
                }}
                className="relative p-6 rounded-3xl bg-gradient-to-r from-gray-900 to-gray-800 shadow-xl border border-gray-700/50 backdrop-blur-xl overflow-hidden group"
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  <span className="text-4xl mb-4 block">{item.icon}</span>
                  <motion.h4
                    className="text-xl font-bold mb-4 text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {item.title}
                  </motion.h4>
                  <motion.p
                    className="text-sm text-gray-300 leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {item.description}
                  </motion.p>
                </div>

                <motion.div
                  className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-r ${item.gradient} rounded-full opacity-20 blur-xl`}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-12"
          >
            <p className="text-center text-lg text-gray-400">
              Ready to make an impact? Whether you're a seasoned professional or
              just starting out, there's a place for you here. Let's collaborate
              and create something extraordinary together.
            </p>
          </motion.div>

          <motion.div
            className="flex justify-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Button
              onClick={() => setIsFormVisible(true)}
              className="relative px-8 py-3 text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg overflow-hidden group transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/50"
            >
              <motion.span
                // className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100"
                initial={{ x: "100%" }}
                whileHover={{ x: 10 }}
                transition={{ duration: 0.90 }}
              />
              <span className="relative z-10">Get Involved</span>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isFormVisible && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl w-96 border border-gray-700/50"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <button
                onClick={() => setIsFormVisible(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <form onSubmit={handleFormSubmit}>
                <h2 className="text-2xl font-bold mb-6 text-white text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                  Join the Mission
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400 ${
                        focusedField === "name"
                          ? "ring-2 ring-purple-500"
                          : "border-gray-600"
                      }`}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      required
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400 ${
                        focusedField === "email"
                          ? "ring-2 ring-purple-500"
                          : "border-gray-600"
                      }`}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      required
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      How would you like to contribute?
                    </label>
                    <textarea
                      name="contribution"
                      value={formData.contribution}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400 ${
                        focusedField === "contribution"
                          ? "ring-2 ring-purple-500"
                          : "border-gray-600"
                      }`}
                      onFocus={() => setFocusedField("contribution")}
                      onBlur={() => setFocusedField(null)}
                      rows="4"
                      required
                      placeholder="Tell us about your interests and how you'd like to contribute"
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-6 space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsFormVisible(false)}
                    className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 py-2 rounded-lg text-white font-medium transition-all duration-300 ${
                      isSubmitting
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-gradient-to-r from-purple-500 to-blue-500 hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105"
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
};

export default Roadmap;
