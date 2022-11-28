import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

export default function ExitAnimation({ children }: any) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
