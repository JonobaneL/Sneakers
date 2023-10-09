export const resultsVariants = {
  hidden: {
    y: -100,
    opacity: 0,
    transition: {
      delay: 0,
      duration: 0.4,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.4,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};
export const wrapperVariants = {
  enter: {
    backdropFilter: "blur(4px)",
    transition: {
      delay: 0.5,
      duration: 0.6,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  exit: {
    backdropFilter: "blur(0)",
    transition: {
      delay: 0,
      duration: 0.6,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};
