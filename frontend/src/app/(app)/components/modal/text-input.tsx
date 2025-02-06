interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export function TextInput({label, error, ...props}: TextInputProps) {
    return (
        <div className="mb-4">
            {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
            <input
                className={`w-full px-4 py-2 border rounded-lg
          transition-all duration-300 ease-in-out
          focus:outline-none focus:ring-2
          ${error ?
                    'border-red-500 focus:ring-red-400' :
                    'hover:border-primary-300 focus:ring-primary-400 focus:border-primary-400'}
          placeholder:text-gray-400`}
                {...props}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}
