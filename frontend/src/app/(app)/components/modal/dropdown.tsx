import {TextInput} from "@/app/(app)/components/modal/text-input";
import {useEffect, useRef, useState} from "react";

interface DropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    placeholder: string;
    options: { value: any; label: string }[];
    error?: string;
    maxOptions?: number;
    noOptionsText?: string;
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

export function SearchableDropdown({
                                       label,
                                       placeholder,
                                       options,
                                       value,
                                       error,
                                       onChange,
                                       maxOptions = 20,           // Default to 10 options if not provided
                                       noOptionsText = "No options found",
                                   }: DropdownProps) {
    const [searchPrompt, setSearchPrompt] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Sync the search prompt with the selected value
    useEffect(() => {
        const selectedOption = options.find((option) => option.value === value);
        if (selectedOption) {
            setSearchPrompt(selectedOption.label);
        }
    }, [value, options]);

    // Filter and limit the options based on the search prompt.
    const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(searchPrompt.toLowerCase())
    );
    const limitedOptions = filteredOptions.slice(0, maxOptions);

    // Update selection and close dropdown
    const handleOptionSelect = (option: { value: any; label: string }) => {
        setSearchPrompt(option.label);
        onChange?.(option);
        setIsOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={containerRef} className="mb-4 relative">
            <TextInput
                label={label}
                placeholder={placeholder}
                error={error}
                value={searchPrompt}
                onChange={(e) => {
                    setSearchPrompt(e.target.value);
                    setIsOpen(true);
                }}
                onFocus={() => setIsOpen(true)}
            />
            {isOpen && (
                <div className="absolute w-full bg-white shadow-lg border border-gray-200 rounded mt-1 max-h-64 overflow-y-auto z-10">
                    {limitedOptions.length > 0 ? (
                        limitedOptions.map((option, index) => (
                            <div
                                key={index}
                                className="p-2 hover:bg-gray-100 cursor-pointer"
                                onMouseDown={() => handleOptionSelect(option)}
                            >
                                {option.label}
                            </div>
                        ))
                    ) : (
                        <div className="p-2 text-center text-sm italic text-gray-500">
                            {noOptionsText}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

