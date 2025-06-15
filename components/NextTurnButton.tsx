import React from 'react';

interface NextTurnButtonProps {
  onNextTurn: () => void;
  disabled?: boolean;
}

const NextTurnButton: React.FC<NextTurnButtonProps> = ({ onNextTurn, disabled }) => {
  return (
    <button
      onClick={onNextTurn}
      disabled={disabled}
      className={`px-6 py-3 text-lg font-semibold rounded-lg shadow-md transition duration-150 ease-in-out
                  ${disabled 
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                    : 'bg-green-500 hover:bg-green-600 text-white transform hover:scale-105'}`}
      title={disabled && !disabled ? "자동 위임 중에는 수동으로 턴을 넘길 수 없습니다." : ""}
    >
      다음 턴 &raquo;
    </button>
  );
};

export default NextTurnButton;