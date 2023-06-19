import { ReactNode } from 'react';

export interface ProductsInfo {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
  [key: string]: string;
}

export interface TableProductsData {
  products: ProductsInfo[];
}

export interface TableColumns {
  name: string;
  dataKey: string;
}

interface OptionsMenu {
  label: string;
}

export interface IconButtonWithMenuProps {
  options: OptionsMenu[];
  selectMenuOption: () => void;
  selectedRegister: ProductsInfo;
  functionTableUpdate: (data: any, method: string) => void;
}

export interface TableInfo {
  tableContent: ProductsInfo[];
  resultsCounterAPI: number;
  indexOfPage: number;
  updatePageIndex: (data: any) => void;
  counterTable: number;
  updateAllTable: (data: any, method: string) => void;
}

export interface FormData {
  dataForm?: ProductsInfo | undefined;
  updateListProducts: (newRegister: ProductsInfo) => void;
}

export interface ModalProps {
  children: ReactNode;
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}
