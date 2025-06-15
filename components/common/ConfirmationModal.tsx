import React from 'react';
import Modal from './Modal';
import Button from './Button';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = '확인',
  cancelText = '취소',
}) => {
  if (!isOpen) return null;

  const handleConfirmClick = () => {
    onConfirm();
    onClose(); // Automatically close after confirm
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-4">
        <p className="text-gray-300">{message}</p>
        <div className="flex justify-end space-x-3 pt-4">
          <Button onClick={onClose} variant="secondary" size="md">
            {cancelText}
          </Button>
          <Button onClick={handleConfirmClick} variant="danger" size="md">
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;