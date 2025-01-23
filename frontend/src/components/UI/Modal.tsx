import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
    children: React.ReactNode;
    open: boolean;
    onClose: () => void;
    className?: string;
}

export default function Modal({
    children,
    open,
    onClose,
    className = ''
}: ModalProps) {
    const dialog = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const modal = dialog.current;

        if (open && modal) {
            modal.showModal();
        }

        return () => {
            if (modal) {
                modal.close();
            }
        };
    }, [open]);

    const portalElement = document.getElementById('modal');
    if (!portalElement) return null;

    return createPortal(
        <dialog
            ref={dialog}
            className={`modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${className}`}
            onClose={onClose}
        >
            {children}
        </dialog>,
        portalElement
    );
}
