import { ProductsInfo } from '../models/general.interaces';
const authorId = '1';

const headers = new Headers();
headers.append('authorId', authorId);
headers.append('Content-Type', 'application/json');

const apiConnection = async (
  method: string,
  bodyRequest?: Partial<ProductsInfo>,
  verificationFlag?: string,
): Promise<any> => {
  let url = `${process.env.API_URL}bp/products`;
  let requestOptions: RequestInit = { method: method, headers: headers };

  if (method === 'DELETE' || verificationFlag) {
    url = `${url}${verificationFlag ? `/${verificationFlag}` : ''}?id=${bodyRequest?.id}`;
  } else {
    requestOptions = {
      ...requestOptions,
      body: JSON.stringify(bodyRequest),
    };
  }
  const response = await fetch(url, requestOptions);
  let data = await response.json();

  return data;
};

export default apiConnection;
