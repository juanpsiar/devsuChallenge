import { ProductsInfo } from '../models/general.interaces';
import apiConnection from './apiConnection';

export const getProducts = async (): Promise<ProductsInfo[]> => apiConnection('GET');

export const createProduct = async (bodyProduct: ProductsInfo): Promise<any> =>
  apiConnection('POST', bodyProduct);

export const updateProduct = async (bodyProduct: ProductsInfo): Promise<any> =>
  apiConnection('PUT', bodyProduct);

export const deleteProduct = async (bodyProduct: Partial<ProductsInfo>): Promise<any> =>
  apiConnection('DELETE', bodyProduct);

export const verificationID = async (bodyProduct: Partial<ProductsInfo>): Promise<any> =>
  apiConnection('GET', bodyProduct, 'verification');
