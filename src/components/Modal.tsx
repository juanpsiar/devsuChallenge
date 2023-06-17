import React, { useState, ReactNode, useEffect } from 'react';
import '../styles/Modal.css';

interface ModalProps {
  children: ReactNode;
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

const Modal = ({ children, showModal, setShowModal }: ModalProps) => {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('modal')) {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showModal, setShowModal]);

  if (!showModal) return null;

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-button-container">
              <button className="close" onClick={closeModal}>
                &times;
              </button>
            </div>
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
