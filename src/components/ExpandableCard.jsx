import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../utils/cn";

export const ExpandableCard = ({
    title,
    src,
    description,
    children,
    className,
    classNameExpanded,
    ...props
}) => {
    const [active, setActive] = useState(false);
    const cardRef = useRef(null);
    const id = useId();

    useEffect(() => {
        const onKeyDown = (event) => {
            if (event.key === "Escape") {
                setActive(false);
            }
        };

        const handleClickOutside = (event) => {
            if (cardRef.current && !cardRef.current.contains(event.target)) {
                setActive(false);
            }
        };

        window.addEventListener("keydown", onKeyDown);
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);

        return () => {
            window.removeEventListener("keydown", onKeyDown);
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, []);

    return (
        <>
            <AnimatePresence>
                {active && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-white/50 dark:bg-black/50 backdrop-blur-md h-full w-full z-10"
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {active && (
                    <div
                        className={cn(
                            "fixed inset-0 grid place-items-center z-[100] sm:mt-16 before:pointer-events-none"
                        )}
                    >
                        <motion.div
                            layoutId={`card-${title}-${id}`}
                            ref={cardRef}
                            className={cn(
                                "w-full max-w-[850px] h-full flex flex-col overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] sm:rounded-t-3xl bg-white shadow-2xl dark:shadow-none dark:bg-slate-900 relative border dark:border-white/10",
                                classNameExpanded
                            )}
                            {...props}
                        >
                            <motion.div layoutId={`image-${title}-${id}`}>
                                <div className="relative before:absolute before:inset-x-0 before:bottom-[-1px] before:h-[70px] before:z-50 before:bg-gradient-to-t dark:before:from-slate-900 before:from-white">
                                    <img
                                        src={src}
                                        alt={title}
                                        className="w-full h-80 object-cover object-center"
                                    />
                                </div>
                            </motion.div>
                            <div className="relative h-full before:fixed before:inset-x-0 before:bottom-0 before:h-[70px] before:z-50 before:bg-gradient-to-t dark:before:from-slate-900 before:from-white">
                                <div className="flex justify-between items-start p-8 h-auto">
                                    <div>
                                        <motion.p
                                            layoutId={`description-${description}-${id}`}
                                            className="text-slate-500 dark:text-slate-400 text-lg"
                                        >
                                            {description}
                                        </motion.p>
                                        <motion.h3
                                            layoutId={`title-${title}-${id}`}
                                            className="font-semibold text-black dark:text-white text-4xl sm:text-4xl mt-0.5"
                                        >
                                            {title}
                                        </motion.h3>
                                    </div>
                                    <motion.button
                                        aria-label="Close card"
                                        layoutId={`button-${title}-${id}`}
                                        className="h-10 w-10 shrink-0 flex items-center justify-center rounded-full bg-white/10 dark:bg-slate-800 text-neutral-700 hover:bg-neutral-100 dark:hover:bg-slate-700 dark:text-white/70 text-black/70 border border-white/10 transition-colors duration-300 focus:outline-none"
                                        onClick={() => setActive(false)}
                                    >
                                        <motion.div
                                            animate={{ rotate: active ? 45 : 0 }}
                                            transition={{ duration: 0.4 }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M5 12h14" />
                                                <path d="M12 5v14" />
                                            </svg>
                                        </motion.div>
                                    </motion.button>
                                </div>
                                <div className="relative px-6 sm:px-8">
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="text-slate-500 dark:text-slate-400 text-base pb-10 flex flex-col items-start gap-4 overflow-auto "
                                    >
                                        {children}
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <motion.div
                role="dialog"
                aria-labelledby={`card-title-${id}`}
                aria-modal="true"
                layoutId={`card-${title}-${id}`}
                onClick={() => setActive(true)}
                className={cn(
                    "p-3 flex flex-col justify-between items-center bg-white shadow-sm dark:shadow-none dark:bg-slate-900/50 rounded-2xl cursor-pointer border border-gray-200/70 dark:border-white/5 hover:dark:border-white/10 transition-colors",
                    className
                )}
            >
                <div className="flex gap-4 flex-col">
                    <motion.div layoutId={`image-${title}-${id}`}>
                        <img
                            src={src}
                            alt={title}
                            className="w-64 h-56 rounded-lg object-cover object-center"
                        />
                    </motion.div>
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                            <motion.p
                                layoutId={`description-${description}-${id}`}
                                className="text-slate-500 dark:text-slate-400 md:text-left text-sm font-medium"
                            >
                                {description}
                            </motion.p>
                            <motion.h3
                                layoutId={`title-${title}-${id}`}
                                className="text-black dark:text-white md:text-left font-semibold"
                            >
                                {title}
                            </motion.h3>
                        </div>
                        <motion.button
                            aria-label="Open card"
                            layoutId={`button-${title}-${id}`}
                            className={cn(
                                "h-8 w-8 shrink-0 flex items-center justify-center rounded-full bg-white/10 dark:bg-slate-800 text-neutral-700 hover:bg-neutral-100 dark:hover:bg-slate-700 dark:text-white/70 text-black/70 border border-white/10 transition-colors duration-300  focus:outline-none"
                            )}
                        >
                            <motion.div
                                animate={{ rotate: active ? 45 : 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M5 12h14" />
                                    <path d="M12 5v14" />
                                </svg>
                            </motion.div>
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </>
    );
};
