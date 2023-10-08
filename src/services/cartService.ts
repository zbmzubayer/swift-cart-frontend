import { cartKey } from '@/constants/storageKeys';
import { IProduct } from '@/interfaces';
import { getFromLocalStorage, setToLocalStorage } from '@/utils/local-storage';

type LocalStorageCartObj = { [key: string]: number };

export const getCartFromLocalStorage = (products: IProduct[]): IProduct[] | [] => {
  const cart = getFromLocalStorage(cartKey);
  if (products && cart) {
    const cartObj = JSON.parse(cart);
    if (typeof cartObj === 'object') {
      const cartProductIds = Object.keys(cartObj);
      if (cartProductIds.length) {
        const cartProducts = cartProductIds.map((id: string) => {
          const product = products.find((p: IProduct) => p.id === id);
          return {
            ...product!,
            quantity: cartObj[id],
          };
        });
        return cartProducts;
      }
    }
  }
  return [];
};

export const setCartToLocalStorage = (products: IProduct[]) => {
  const productCart: LocalStorageCartObj = {};
  products.map(product => {
    productCart[product.id] = product.quantity!;
  });
  setToLocalStorage(cartKey, JSON.stringify(productCart));
};
