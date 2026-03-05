import React, { useId } from 'react'

function Select({
    options,
    label,
    className,
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label htmlFor={id} className='inline-block mb-1 pl-1 text-slate-800 font-medium'>{label}</label>}
            <select
                {...props}
                id={id}
                ref={ref}
                className={`px-4 py-3 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full shadow-sm focus:border-blue-500 ${className}`}
            >
                {options?.map((option) => (
                    <option key={option} value={option} className="bg-white text-black">
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select)