import React from 'react'

const Input = ({
    placeholder,
    onChange,
    value,
    type,
    className,
    name
}) => {
  return (
    <input type={type} value={value} name={name} onChange={onChange} className={` bg-transparent placeholder:text-white border border-gray-500 rounded-none md:rounded-md  px-4 py-1 text-white font-semibold focus:outline focus:outline-red-700  focus:border-none ${className}`} placeholder={placeholder} />
  )
}

export default Input