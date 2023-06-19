import React, { useEffect, useState } from 'react';
import { ProductsInfo, TableInfo } from '../models/general.interaces';
import MenuButton from './MenuButton';

import moment from 'moment';
import '../styles/TableProducts.css';

const TableProducts: React.FC<TableInfo> = ({
  tableContent,
  updatePageIndex,
  resultsCounterAPI,
  counterTable,
  indexOfPage,
  updateAllTable,
}) => {
  const resultsByPage = 5;
  const columns = [
    {
      name: 'Logo',
      dataKey: 'logo',
    },
    {
      name: 'Nombre del Producto',
      dataKey: 'name',
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
  ];

  const emptyValuesForm: ProductsInfo = {
    id: '',
    name: '',
    description: '',
    logo: '',
    date_release: '',
    date_revision: '',
  };
  const [selectedRow, setSelectedRow] = useState<ProductsInfo>(emptyValuesForm);

  const returnCellByType = (keyColumn: string, data: ProductsInfo) => {
    switch (keyColumn) {
      case 'logo':
        return (
          <img
            style={{ width: '50px' }}
            src={data.logo}
            alt={data.id}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = `${process.env.DEFAULT_IMAGE_URL}`;
            }}
          />
        );
      case 'menu':
        return (
          <MenuButton
            selectMenuOption={() => {
              setSelectedRow(data);
            }}
            selectedRegister={selectedRow}
            functionTableUpdate={updateAllTable}
            options={[{ label: 'Editar' }, { label: 'Eliminar' }]}
          />
        );
      case 'date_release':
      case 'date_revision':
        return <div>{moment(data[keyColumn]).format('DD/MM/YYYY')}</div>;
      default:
        return <div>{data[keyColumn]}</div>;
    }
  };

  return (
    <>
      <table className="table-container">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                className={column.dataKey === 'logo' ? 'table-header-img' : 'table-header'}
                key={column.dataKey}>
                {column.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableContent.map((itemProduct) => (
            <tr className="table-row-product" key={itemProduct.id}>
              {columns.map((column) => (
                <td
                  className={column.dataKey === 'logo' ? 'table-column-img' : 'table-column'}
                  key={`${itemProduct.id}-${column.dataKey}`}>
                  {returnCellByType(column.dataKey, itemProduct)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="table-footer">
        <div className="table-results-counter">{resultsCounterAPI} Resultados</div>

        <select onChange={(event) => updatePageIndex(event.target.value)} value={indexOfPage}>
          {Array.from(
            { length: Math.ceil(counterTable / resultsByPage) },
            (_, index) => index + 1,
          ).map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>
    </>
  );
};

export default TableProducts;
