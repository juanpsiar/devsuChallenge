import React, { useEffect } from 'react';
import { ModalProps } from '../models/general.interaces';
import '../styles/Modal.css';

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
