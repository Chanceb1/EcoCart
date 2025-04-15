import { JSX, ReactNode, createContext, useState } from 'react';

type Progress = '' | 'cart' | 'checkout';

type UserProgressContextType = {
    progress: Progress;
    showCart: () => void;
    hideCart: () => void;
    showCheckout: () => void;
    hideCheckout: () => void;
};

type UserProgressContextProviderProps = {
    children: ReactNode;
};

const UserProgressContext = createContext<UserProgressContextType>({
    progress: '', // 'cart', 'checkouot'
    showCart: () => {},
    hideCart: () => {},
    showCheckout: () => {},
    hideCheckout: () => {}
});

export function UserProgressContextProvider({
    children
}: UserProgressContextProviderProps): JSX.Element {
    const [userProgress, setUserProgress] = useState<Progress>('');

    function showCart(): void {
        setUserProgress('cart');
    }

    function hideCart(): void {
        setUserProgress('');
    }

    function showCheckout(): void {
        setUserProgress('checkout');
    }

    function hideCheckout(): void {
        setUserProgress('');
    }

    const userProgressCtx: UserProgressContextType = {
        progress: userProgress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout
    };

    return (
        <UserProgressContext.Provider value={userProgressCtx}>
            {children}
        </UserProgressContext.Provider>
    );
}

export default UserProgressContext;
