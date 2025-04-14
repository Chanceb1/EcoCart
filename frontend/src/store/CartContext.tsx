import { ReactNode, createContext, useReducer } from 'react';

export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

type CartContextType = {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: number) => void;
    clearCart: () => void;
    updateQuantity: (id: number, delta: number) => void;
};

type CartContextProviderProps = {
    children: ReactNode;
};

export const CartContext = createContext<CartContextType>({
    items: [],
    addItem: item => {},
    removeItem: id => {},
    clearCart: () => {},
    updateQuantity: (id, delta) => {}
});

interface AddItemAction {
    type: 'ADD_ITEM';
    item: CartItem;
}

interface RemoveItemAction {
    type: 'REMOVE_ITEM';
    id: number;
}

interface ClearCartAction {
    type: 'CLEAR_CART';
}

interface UpdateQuantityAction {
    type: 'UPDATE_QUANTITY';
    id: number;
    delta: number;
}

type CartAction =
    | AddItemAction
    | RemoveItemAction
    | ClearCartAction
    | UpdateQuantityAction;

function cartReducer(state: { items: CartItem[] }, action: CartAction) {
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

    if (action.type === 'UPDATE_QUANTITY') {
        return {
            ...state,
            items: state.items
                .map(item =>
                    item.id === action.id
                        ? {
                              ...item,
                              quantity: Math.max(
                                  1,
                                  item.quantity + action.delta
                              )
                          }
                        : item
                )
                .filter(item => item.quantity > 0)
        };
    }

    return state;
}

export function CartContextProvider({ children }: CartContextProviderProps) {
    const [cart, dispatchCartAction] = useReducer<{ items: CartItem[] }, any>(
        cartReducer,
        {
            items: []
        }
    );

    function addItem(item: CartItem) {
        dispatchCartAction({ type: 'ADD_ITEM', item });
    }

    function removeItem(id: number) {
        dispatchCartAction({ type: 'REMOVE_ITEM', id });
    }

    function updateQuantity(id: number, delta: number) {
        dispatchCartAction({ type: 'UPDATE_QUANTITY', id, delta });
    }

    function clearCart() {
        dispatchCartAction({ type: 'CLEAR_CART' });
    }

    const cartContext = {
        items: cart.items,
        addItem,
        removeItem,
        clearCart,
        updateQuantity
    };

    console.log(cartContext); // temporary

    return (
        <CartContext.Provider value={cartContext}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContext;
