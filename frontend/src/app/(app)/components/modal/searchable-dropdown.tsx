import {useEffect, useRef, useState} from "react";
import {DropdownProps} from "./dropdown";
import {TextInput} from "./text-input";

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
        onChange?.(option.value);
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
