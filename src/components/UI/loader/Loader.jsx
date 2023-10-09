import React from "react";
import styles from "./Loader.module.scss";
import { useLoaderAnimation } from "../../../hooks/useLoaderAnimation";
import { motion } from "framer-motion";

const Loader = () => {
  const scopeAnimation = useLoaderAnimation();
  return (
    <ul className={styles.loader} ref={scopeAnimation}>
      <motion.li className={styles.loader__column} />
      <motion.li className={styles.loader__column} />
      <motion.li className={styles.loader__column} />
      <motion.li className={styles.loader__column} />
    </ul>
  );
};
export default Loader;
