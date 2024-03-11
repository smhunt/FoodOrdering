import { CartItem, Tables } from "../types";
import { PropsWithChildren, createContext, useContext, useState } from "react";
import {randomUUID} from 'expo-crypto';
import { useInsertOrder } from "../api/orders";
import { router } from "expo-router";
import { useInsertOrderItems } from "../api/order-items";

type Product = Tables<'products'>;

type CartType = {
    items: CartItem[];
    addItem: (product: Product, size: CartItem['size']) => void;
    updateQuantity: (itemId: string, amount: -1 | 1) => void;
    total: number;
    checkout: () => void
};

const CartContext = createContext<CartType>({
    items: [],
    addItem: () => {},
    updateQuantity: () => {},
    total: 0,
    checkout: () => {}
});

const CartProvider  = ({children}: PropsWithChildren) => {
    const [items, setItems] = useState<CartItem[]>([]);

    const{mutate:insertOrder} = useInsertOrder();
    const{mutate:insertOrderItems} = useInsertOrderItems();

    const addItem = (product:Product, size: CartItem['size']) => { 
        // todo if already in cart simply increment 
        const existingItem = items.find(item => item.product_id === product.id && item.size === size);
        if(existingItem){
            updateQuantity(existingItem.id, 1);
            return ;
        }
       const newCartItem: CartItem = {
        id: randomUUID(), //generate
        product,
        product_id: product.id,
        size,
        quantity: 1,
    };

        setItems([newCartItem, ...items]);
    };
    // update  quanity 

    const updateQuantity = (itemId: string, amount: -1 | 1) => {
        setItems(
            items.map((item) =>
                item.id !== itemId
                ? item
                : { ...item, quantity: item.quantity + amount }
            ).filter((item) => item.quantity > 0)
        );
    };

    const total = items.reduce(
        (sum, item) => sum + item.product.price * item.quantity, 
        0
    );

    const clearCart = () => {
        setItems([]);
    };   

    const checkout = () => {
            //console.warn('checkout');
            insertOrder(
                {total}, 
                {
                    onSuccess: saveOrderItems
                }
        )
    };

    const saveOrderItems = (order: Tables<'orders'>) => {

        const orderItems = items.map((cartItem) => ({
            order_id: order.id,
            product_id: cartItem.product_id,
            quantity: cartItem.quantity,
            size: cartItem.size,
        }));

        insertOrderItems(
            orderItems,  {
                onSuccess: () => {
                    clearCart();
                    router.back() // haclk hack so it goes bacl to the orders page (modal is fucked )
                    router.push(`/(user)/orders`); // hack hack so we dont lose ability to see all orders (modal is fucked)
                    router.push(`/(user)/orders/${order.id}`);
                }
            }
        );
    }


    return (
        <CartContext.Provider value={{ items, addItem, updateQuantity, total, checkout}}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;


export const useCart = () => useContext(CartContext);