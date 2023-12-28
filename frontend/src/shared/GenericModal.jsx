import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Loading from "./Loading";
/**
 * A generic modal component for displaying custom content.
 *
 * @param {boolean} isOpen - Controls the visibility of the modal.
 * @param {function} onClose - Callback to close the modal.
 * @param {JSX} children - Custom JSX content to display within the modal.
 *
 * Usage:
 * 1. Import this component where you need it.
 * 2. Pass the `isOpen` state and `onClose` callback from the parent component.
 * 3. Wrap the desired content in the `children` prop to display it within the modal.
 * 4. The modal can be closed by calling the `onClose` callback when needed.
 * YOU CAN USE ModalTry component to try it
 */

const GenericModal = ({ customStyles, isOpen, onClose, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const handleModalClick = (e) => {
    e.stopPropagation();
  };
  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);
  return (
    isOpen && (
      <div
        style={{ justifyContent: customStyles }}
        className="modal"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: isVisible ? 1 : 0.5, opacity: isVisible ? 1 : 0 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="modal-content w-4/5 sm:w-auto"
          onClick={handleModalClick}
        >
          <span className="modal-close" onClick={onClose}>
            &times;
          </span>
          {children}
        </motion.div>
      </div>
    )
  );
};

export const GenericLittleLoadingModal = ({ isOpen, onClose, children }) => {
  return (
    isOpen && (
      <div className="modal little-loader">
        <div className="modal-content">
          <Loading />
        </div>
      </div>
    )
  );
};

export default GenericModal;
