import { useState } from "react";
import AccordionButton from "../accordion-button/AccordionButton";
import styles from "./Accordion.module.scss";
import { motion, AnimatePresence } from "framer-motion";

const Accrodion = ({ header, children, fixed = false, autoHeight = false }) => {
  const [isOpen, setIsOpen] = useState(fixed || false);
  const openAccordion = () => {
    if (!fixed) {
      setIsOpen((p) => !p);
    }
  };
  const accordionVariants = {
    hidden: {
      height: 0,
      opacity: 0,
    },
    visible: {
      height: "400px",
      opacity: 1,
      overflow: "auto",
    },
    autoHeightVisible: {
      height: "fit-content",
      opacity: 1,
      overflow: "hidden",
    },
  };
  return (
    <div className={styles.accordion}>
      <div className={styles["accordion-header"]} onClick={openAccordion}>
        <div className={styles.title}>
          <div className={styles.content}>{header}</div>
          {!fixed && (
            <AccordionButton handler={openAccordion} triger={isOpen} />
          )}
        </div>
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate={autoHeight ? "autoHeightVisible" : "visible"}
            exit="hidden"
            transition={{
              duration: 0.3,
            }}
            variants={accordionVariants}
            className={`${styles["accordion-body"]}`}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Accrodion;
