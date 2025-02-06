import React from "react";

interface DeleteModalProps {
    visible: boolean;
    open: boolean;
    title?: string;
    message?: string;
    closeDialog: () => void;
    onConfirm: () => void;
    cancelLabel?: string;
    confirmLabel?: string;
}

export default function DeleteConfirmationModal({
                                                    visible,
                                                    open,
                                                    title = "Confirm Deletion",
                                                    message = "Are you sure you want to delete this item? This action cannot be undone.",
                                                    closeDialog,
                                                    onConfirm,
                                                    cancelLabel = "Cancel",
                                                    confirmLabel = "Delete"
                                                }: DeleteModalProps) {
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
                <div className="flex flex-col items-center text-center">
                    {/* Warning Icon */}
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                        <svg
                            className="h-6 w-6 text-red-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    </div>

                    <h2 className="text-xl font-semibold mb-2">{title}</h2>
                    <p className="text-gray-500 mb-6">{message}</p>
                </div>

                <div className="flex gap-3 justify-end">
                    <button
                        onClick={closeDialog}
                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                    >
                        {cancelLabel}
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            closeDialog();
                        }}
                        className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200"
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}