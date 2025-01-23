import { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    textOnly?: boolean;
    className?: string;
}

export default function Button({ children, textOnly, className, ...props }: ButtonProps): JSX.Element {
    let cssClasses = textOnly 
        ? 'text-emerald-600 hover:text-emerald-800 transition-colors duration-200 underline hover:no-underline' 
        : 'bg-emerald-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-emerald-700 active:bg-emerald-800 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed';
    
    cssClasses += ' ' + (className || '');
    
    return (
        <button className={cssClasses} {...props}>
            {children}
        </button>
    );
}