"use client";

interface TextInputProps {
    id: string;
    name: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    type?: "text" | "email";
    autoComplete?: string;
    placeholder?: string;
    required?: boolean;
    helpText?: string;
}

export function TextInput({
    id,
    name,
    label,
    value,
    onChange,
    type = "text",
    autoComplete,
    placeholder,
    required = false,
    helpText,
}: TextInputProps) {
    return (
        <div>
            <label
                htmlFor={id}
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
            >
                {label} {required && "*"}
            </label>
            <input
                id={id}
                name={name}
                type={type}
                autoComplete={autoComplete}
                required={required}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg sm:rounded-xl bg-gray-50/50 focus:bg-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                aria-describedby={helpText ? `${id}-help` : undefined}
            />
            {helpText && (
                <div id={`${id}-help`} className="sr-only">
                    {helpText}
                </div>
            )}
        </div>
    );
}
