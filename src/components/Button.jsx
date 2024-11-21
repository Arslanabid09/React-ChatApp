import React from 'react'

const Button = ({
    label,
    onClick,
    type,
    className
}) => <button type={type}
onClick={onClick} className={`bg-white text-black font-semibold py-2 px-4 rounded-md  ${className}`}
>
{label}
</button>

export default Button