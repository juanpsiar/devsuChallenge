import React, { useState } from 'react';
import Modal from './Modal';
import FormProduct from './FormProduct';
import { ProductsInfo, IconButtonWithMenuProps } from '../models/general.interaces';
import { deleteProduct } from '../services/requestMethods';
import '../styles/MenuButton.css';

const IconButtonWithMenu: React.FC<IconButtonWithMenuProps> = ({
  options,
  selectMenuOption,
  selectedRegister,
  functionTableUpdate,
}) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = (option: string) => {
    setMenuOpen(false);
    selectMenuOption();
    if (option === 'Eliminar') {
      setShowDeleteModal(true);
    } else {
      setShowModal(true);
    }
  };

  const updateTableMenu = (registerModified: ProductsInfo) => {
    functionTableUpdate(registerModified, 'edit');
    setShowModal(false);
  };

  const handleDelete = () => {
    deleteProduct({ id: selectedRegister.id })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.error(err))
      .finally(() => setShowDeleteModal(false));
    functionTableUpdate(selectedRegister, 'delete');
  };

  return (
    <>
      <div className="icon-button-menu-container">
        <button className="icon-button" onClick={handleMenuToggle}>
          <span className="menu-icon"></span>
          <span className="menu-icon"></span>
          <span className="menu-icon"></span>
        </button>
        {isMenuOpen && (
          <div className="menu">
            <ul>
              {options.map((option, index) => (
                <li onClick={() => handleMenuClose(option.label)} key={index}>
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {showModal && (
        <Modal showModal={showModal} setShowModal={setShowModal}>
          <FormProduct updateListProducts={updateTableMenu} dataForm={selectedRegister} />
        </Modal>
      )}
      {showDeleteModal && (
        <Modal showModal={showDeleteModal} setShowModal={setShowDeleteModal}>
          <div className="modal-delete-container">
            <span>
              {' '}
              Quieres eliminar el producto <b>{selectedRegister.name}</b>
            </span>
            <div>
              <button className="modal-delete-confirm-button" onClick={handleDelete}>
                Sí
              </button>
              <button onClick={() => setShowDeleteModal(false)}>No</button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default IconButtonWithMenu;
