
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void; 
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
        onClick={onClose} 
    >
      <div 
        className="bg-gray-800 p-6 rounded-lg shadow-2xl max-w-md w-full text-gray-200 relative"
        onClick={(e) => e.stopPropagation()} 
      >
        {title && <h2 className="text-2xl font-semibold mb-4 text-yellow-400">{title}</h2>}
        {onClose && (
            <button 
                onClick={onClose} 
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 transition-colors"
                aria-label="모달 닫기"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;