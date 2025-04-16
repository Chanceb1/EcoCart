import { useEffect, useState } from 'react';


// Example usage
// import Toast from './components/toast';

// function App() {
//   return (
//     <div>
//       <Toast 
//         message="Successfully saved!"
//         type="success"
//         duration={5000}
//         position="top-right"
//         onClose={() => console.log('Toast closed')}
//       />
//     </div>
//   );
// }

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  onClose?: () => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 3000,
  onClose,
  position = 'top-right'
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const getToastStyles = () => {
    const baseStyles = {
      padding: '12px 24px',
      borderRadius: '4px',
      marginBottom: '10px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
      position: 'fixed',
      zIndex: 1000,
      ...getPositionStyles(),
    };

    const typeStyles = {
      success: { backgroundColor: '#4caf50', color: 'white' },
      error: { backgroundColor: '#f44336', color: 'white' },
      warning: { backgroundColor: '#ff9800', color: 'white' },
      info: { backgroundColor: '#2196f3', color: 'white' },
    };

    return { ...baseStyles, ...typeStyles[type] };
  };

  const getPositionStyles = () => {
    switch (position) {
      case 'top-right':
        return { top: '20px', right: '20px' };
      case 'top-left':
        return { top: '20px', left: '20px' };
      case 'bottom-right':
        return { bottom: '20px', right: '20px' };
      case 'bottom-left':
        return { bottom: '20px', left: '20px' };
      default:
        return { top: '20px', right: '20px' };
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div style={getToastStyles() as React.CSSProperties}>
      {message}
    </div>
  );
};

export default Toast;