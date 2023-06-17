import React, { useEffect, useState } from 'react';
import { ProductsInfo, TableColumns } from '../models/general.interaces';
import MenuButton from './MenuButton';
import Modal from './Modal';
import FormProduct from './FormProduct';

import '../styles/TableProducts.css';

interface TableInfo {
  productsTable: ProductsInfo[];
  pageIndex: number;
  updatePageIndex: (data: any) => void;
}

const TableProducts: React.FC<TableInfo> = ({ productsTable, updatePageIndex, pageIndex }) => {
  const resultsByPage = 5;
  const [tableContent, setTableContent] = useState<ProductsInfo[]>([]);
  const [columns, setColumns] = useState<TableColumns[]>([
    {
      name: 'Nombre del Producto',
      dataKey: 'name',
    },
    {
      name: 'Logo',
      dataKey: 'logo',
    },
    {
      name: 'Descripción',
      dataKey: 'description',
    },
    {
      name: 'Fecha de Liberación',
      dataKey: 'date_release',
    },
    {
      name: 'Fecha de Reestructuración',
      dataKey: 'date_revision',
    },
    {
      name: '',
      dataKey: 'menu',
    },
  ]);
  const [showModal, setShowModal] = useState(false);

  const [selectedRow, setSelectedRow] = useState<string>('');
  console.log({ selectedRow });
  useEffect(() => {
    const sliceProducts = productsTable.slice(
      (pageIndex - 1) * resultsByPage,
      pageIndex * resultsByPage,
    );

    setTableContent(sliceProducts);
  }, [pageIndex, productsTable]);

  const returnCellByType = (keyColumn: string, data: ProductsInfo) => {
    switch (keyColumn) {
      case 'logo':
        return <img style={{ width: '50px' }} src={data.logo} alt={data.id} />;
      case 'menu':
        return (
          <MenuButton
            selectOption={() => {
              setSelectedRow(data.id);
              setShowModal(true);
            }}
            options={['Editar', 'Eliminar']}
          />
        );
      default:
        return <div>{data[keyColumn]}</div>;
    }
  };

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.dataKey}>{column.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableContent.map((itemProduct) => (
          <tr className="table-row-product" key={itemProduct.id}>
            {columns.map((column) => (
              <td key={column.dataKey}>{returnCellByType(column.dataKey, itemProduct)}</td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td>{productsTable.length} Resultados</td>
          <td>
            <select onChange={(event) => updatePageIndex(event.target.value)}>
              {Array.from(
                { length: Math.ceil(productsTable.length / resultsByPage) },
                (_, index) => index + 1,
              ).map((item) => (
                <option>{item}</option>
              ))}
            </select>
          </td>
        </tr>
      </tfoot>
      {showModal && (
        <Modal showModal={showModal} setShowModal={setShowModal}>
          <FormProduct dataForm={tableContent.find((rowTable) => rowTable.id === selectedRow)} />
        </Modal>
      )}
    </table>
  );
};

export default TableProducts;
