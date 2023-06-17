import React, { useState, useEffect } from 'react';
import './App.css';
import TableProducts from './components/TableProducts';
import { getProducts } from './services/getProducts';
import { ProductsInfo } from './models/general.interaces';
import Modal from './components/Modal';
import FormProduct from './components/FormProduct';

function App() {
  const [listProducts, setListProducts] = useState<ProductsInfo[]>([]);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredOptions, setFilteredOptions] = useState<ProductsInfo[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    // onTyping(event.target.value);
  };

  useEffect(() => {
    if (searchTerm.length > 0) {
      setFilteredOptions(
        listProducts.filter((itemProduct) =>
          itemProduct.name.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
    } else {
      setFilteredOptions(listProducts);
    }
  }, [searchTerm]);

  useEffect(() => {
    setIsLoading(true);
    getProducts()
      .then((response) => {
        setListProducts(response);
        setFilteredOptions(response);
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div>
      <div>
        <img
          src="https://cdnbancawebprodcx6.azureedge.net/green/static/items/pbw-pichincha-banca-web-public-ang/assets/logo_pichincha.svg"
          alt="logo header"
        />
      </div>
      <div>
        <input
          className="input-search"
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search"
        />
        <button onClick={() => setShowModal(true)}>Agregar</button>
      </div>
      {isLoading ? (
        <div className="loader">
          <div className="loader__spinner"></div>
          <div className="loader__text">Loading...</div>
        </div>
      ) : (
        <TableProducts
          productsTable={filteredOptions}
          pageIndex={pageIndex}
          updatePageIndex={setPageIndex}
        />
      )}
      {showModal && (
        <Modal showModal={showModal} setShowModal={setShowModal}>
          <FormProduct />
        </Modal>
      )}
    </div>
  );
}

export default App;
