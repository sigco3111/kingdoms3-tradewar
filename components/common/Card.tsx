
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '', title }) => {
  return (
    <div className={`bg-gray-800 rounded-lg shadow-xl p-4 ${className}`}>
      {title && <h3 className="text-lg font-semibold text-yellow-400 mb-3">{title}</h3>}
      {children}
    </div>
  );
};

export default Card;
