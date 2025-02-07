"use client"

import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {FaTrash} from "react-icons/fa6";
import DeleteConfirmationModal from "@/app/(app)/components/modal/delete-modal";
import {deleteInvestment} from "@/app/services/investment.service";

export function DeleteInvestment({accessToken, investmentId}: { accessToken: string, investmentId: number }) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)

    const openModal = () => {
        setIsModalOpen(true)
        setTimeout(() => {
            setIsModalVisible(true)
        }, 1)
    }

    const closeModal = () => {
        setIsModalVisible(false)
        setTimeout(() => {
            setIsModalOpen(false)
        }, 300)
    }

    return <>
        <div className="text-sm p-3 rounded-full transition duration-300 ease-in-out hover:bg-black/10 cursor-pointer"
             onClick={openModal}>
            <FaTrash/>
        </div>

        <DeleteInvestmentModal accessToken={accessToken} investmentId={investmentId} visible={isModalVisible} open={isModalOpen} closeDialog={closeModal}/>
    </>
}

function DeleteInvestmentModal({accessToken, investmentId, visible, open, closeDialog}: {
    accessToken: string;
    investmentId: number;
    visible: boolean;
    open: boolean;
    closeDialog: () => void;
}) {
    const router = useRouter()

    const handleConfirm = async () => {
        closeDialog()
        await deleteInvestment(accessToken, investmentId);
        router.refresh()
    };

    return (
        <DeleteConfirmationModal
            visible={visible}
            open={open}
            title="Delete Investment Strategy"
            message="This will permanently delete this investment strategy and all associated information. This action cannot be undone!"
            closeDialog={closeDialog}
            onConfirm={handleConfirm}
            cancelLabel="Cancel"
            confirmLabel="Confirm"
        />
    );

}