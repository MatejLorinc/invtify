interface DropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    placeholder: string;
    options: { value: string; label: string }[];
    error?: string;
}

export function Dropdown({label, placeholder, options, error, ...props}: DropdownProps) {
    return (
        <div className="mb-4">
            {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
            <select
                className={`w-full px-4 py-2 border rounded-lg bg-white
          transition-all duration-300 ease-in-out
          focus:outline-none focus:ring-2
          ${error ?
                    'border-red-500 focus:ring-red-400' :
                    'hover:border-primary-300 focus:ring-primary-400 focus:border-primary-400'}
          cursor-pointer`}
                {...props}
            >
                <option key="" value="" disabled>{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}