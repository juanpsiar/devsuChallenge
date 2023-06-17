
import { ProductsInfo } from "../models/general.interaces";
const authorId = '1';

const headers = new Headers();
headers.append('authorId', authorId);


export const getProducts = async (): Promise<ProductsInfo[]> => {

    const url = `${process.env.API_URL}bp/products`;

    const response = await fetch(url, {
        method: 'GET',
        headers: headers,
    });
    let data = null;
    data = await response.json();


    // fetch(url, {
    //     method: 'GET',
    //     headers: headers
    // }).then(response => console.log({ response }));
    return data;
};