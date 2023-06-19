import React, { useState, useEffect } from 'react';
import './App.css';
import TableProducts from './components/TableProducts';
import { getProducts } from './services/requestMethods';
import { ProductsInfo } from './models/general.interaces';
import Modal from './components/Modal';
import FormProduct from './components/FormProduct';

function App() {
  const [listProducts, setListProducts] = useState<ProductsInfo[]>([]);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [contentTable, setContentTable] = useState<ProductsInfo[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const resultsByPage = 5;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    // onTyping(event.target.value);
  };

  const returnSliceArray = (arrayToDivide: ProductsInfo[]) =>
    arrayToDivide.slice((pageIndex - 1) * resultsByPage, pageIndex * resultsByPage);

  useEffect(() => {
    if (searchTerm.length > 0) {
      setPageIndex(1);
      const filteredOptions = listProducts.filter((itemProduct) =>
        itemProduct.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setContentTable(returnSliceArray(filteredOptions));
    } else {
      const sliceProducts = returnSliceArray(listProducts);
      setContentTable(sliceProducts);
    }
  }, [searchTerm]);

  useEffect(() => {
    const sliceProducts = returnSliceArray(listProducts);
    setContentTable(sliceProducts);
  }, [pageIndex, listProducts]);

  useEffect(() => {
    setIsLoading(true);
    getProducts()
      .then((response) => {
        setListProducts(response);
        setContentTable(response);
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);

  const handleListUpdate = (data: ProductsInfo, method: string) => {
    let modifiedList = listProducts;
    switch (method) {
      case 'edit':
        modifiedList = listProducts.map((itemProduct: ProductsInfo) => {
          if (itemProduct.id === data.id) {
            return data;
          } else {
            return itemProduct;
          }
        });
        break;
      case 'delete':
        modifiedList = listProducts.filter(
          (itemProduct: ProductsInfo) => itemProduct.id !== data.id,
        );
    }
    setListProducts(modifiedList);
  };

  const handleAddNewProduct = (data: ProductsInfo) => {
    setListProducts((prevData: any) => [...prevData, data]);
    setShowModal(false);
  };

  return (
    <div className="container-project">
      <div className="container-header">
        <img src={`${process.env.DEFAULT_IMAGE_URL}`} alt="logo header" />
      </div>
      <div className="container-search">
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
          tableContent={contentTable}
          resultsCounterAPI={listProducts.length}
          updatePageIndex={setPageIndex}
          indexOfPage={pageIndex}
          counterTable={searchTerm.length > 0 ? contentTable.length : listProducts.length}
          updateAllTable={handleListUpdate}
        />
      )}
      {showModal && (
        <Modal showModal={showModal} setShowModal={setShowModal}>
          <FormProduct updateListProducts={handleAddNewProduct} />
        </Modal>
      )}
    </div>
  );
}

export default App;
