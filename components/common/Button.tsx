
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  ...props
}) => {
  const baseStyle = "font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 transition ease-in-out duration-150 disabled:opacity-50 disabled:cursor-not-allowed";
  
  let variantStyle = '';
  switch (variant) {
    case 'secondary':
      variantStyle = 'bg-gray-600 hover:bg-gray-500 text-white focus:ring-gray-500';
      break;
    case 'danger':
      variantStyle = 'bg-red-600 hover:bg-red-500 text-white focus:ring-red-500';
      break;
    case 'primary':
    default:
      variantStyle = 'bg-yellow-500 hover:bg-yellow-600 text-gray-900 focus:ring-yellow-500';
      break;
  }

  let sizeStyle = '';
  switch (size) {
    case 'sm':
      sizeStyle = 'px-2.5 py-1.5 text-xs';
      break;
    case 'lg':
      sizeStyle = 'px-6 py-3 text-lg';
      break;
    case 'md':
    default:
      sizeStyle = 'px-4 py-2 text-sm';
      break;
  }

  return (
    <button
      className={`${baseStyle} ${variantStyle} ${sizeStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
