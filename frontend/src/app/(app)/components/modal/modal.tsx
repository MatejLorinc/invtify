import React from "react";

interface ButtonConfig {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'text';
}

interface ModalProps {
    visible: boolean;
    open: boolean;
    title: string;
    closeDialog: () => void;
    buttons?: ButtonConfig[];
    children?: React.ReactNode;
    errors?: Record<string, string>; // Field-specific errors { [name: string]: message }
}

export default function Modal({
                                  visible,
                                  open,
                                  title,
                                  closeDialog,
                                  buttons = [],
                                  children,
                                  errors = {}
                              }: ModalProps) {
    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={closeDialog}
        >
            <div className={`fixed inset-0 bg-black ${
                visible ? "opacity-50" : "opacity-0"
            } transition duration-300 ease-in-out`}></div>

            {/* Dialog Box */}
            <div
                className={`bg-white rounded-lg shadow-lg w-96 p-6 transform ${
                    visible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                } transition-all duration-300 ease-in-out`}
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-semibold mb-4">{title}</h2>

                <div className="space-y-4">
                    {React.Children.map(children, child => {
                        if (React.isValidElement(child)) {
                            const name = child.props.name;
                            return React.cloneElement(child, {
                                error: name ? errors[name] : undefined
                            } as Partial<unknown>);
                        }
                        return child;
                    })}
                </div>

                <div className="flex gap-3 justify-end mt-6">
                    {buttons.map((button, index) => (
                        <button
                            key={`action-btn-${index}`}
                            onClick={button.onClick}
                            className={`
                px-4 py-2 rounded-lg transition duration-300 ease-in-out 
                focus:outline-none focus:ring-2
                ${
                                button.variant === 'primary'
                                    ? 'bg-primary-400 text-white hover:bg-primary-300 focus:ring-primary-400'
                                    : button.variant === 'secondary'
                                        ? 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400'
                                        : 'text-gray-600 hover:text-gray-800 focus:ring-gray-400'
                            }
              `}
                        >
                            {button.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}