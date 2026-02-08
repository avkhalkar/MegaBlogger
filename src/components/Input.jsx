import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label
                className='inline-block mb-1 pl-1'
                htmlFor={id}>
                {label}
            </label>
            }
            <input
                type={type}
                className={`px-4 py-3 rounded-lg bg-white text-black outline-none focus:bg-gray-50 border border-gray-200 focus:border-blue-500 w-full transition-all duration-200 placeholder-gray-400 shadow-sm ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    )
})

export default Input