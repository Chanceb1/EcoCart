import { ReactNode, createContext, useReducer } from 'react';

type CartItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
};

type CartContextType = {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
};

type CartContextProviderProps = {
    children: ReactNode;
};

export const CartContext = createContext<CartContextType>({
    items: [],
    addItem: item => {},
    removeItem: id => {},
    clearCart: () => {}
});

function cartReducer(state: any, action: any) {
    if (action.type === 'ADD_ITEM') {
        const existingCartItemIndex = state.items.findIndex(
            (item: any) => item.id === action.item.id
        );

        const updatedItems = [...state.items];

        if (existingCartItemIndex > -1) {
            const existingCartItem = state.items[existingCartItemIndex];
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems.push({ ...action.item, quantity: 1 });
        }

        return {
            ...state,
            items: updatedItems
        };
    }

    if (action.type === 'REMOVE_ITEM') {
        const existingCartItemIndex = state.items.findIndex(
            (item: any) => item.id === action.id
        );

        const existingCartItem = state.items[existingCartItemIndex];

        const updatedItems = [...state.items];

        if (existingCartItem.quantity === 1) {
            updatedItems.splice(existingCartItemIndex, 1);
        } else {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity - 1
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return {
            ...state,
            items: updatedItems
        };
    }

    if (action.type === 'CLEAR_CART') {
        return { ...state, items: [] };
    }

    return state;
}

export function CartContextProvider({ children }: CartContextProviderProps) {
    const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

    function addItem(item: CartItem) {
        dispatchCartAction({ type: 'ADD_ITEM', item });
    }

    function removeItem(id: string) {
        dispatchCartAction({ type: 'REMOVE_ITEM', id });
    }

    function clearCart() {
        dispatchCartAction({ type: 'CLEAR_CART' });
    }

    const cartContext = {
        items: cart.items,
        addItem,
        removeItem,
        clearCart
    };

    console.log(cartContext); // temporary

    return (
        <CartContext.Provider value={cartContext}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContext;
