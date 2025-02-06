"use client"

import React, {useState} from "react";
import {deleteBroker} from "@/app/(services)/broker.service";
import {useRouter} from "next/navigation";
import {FaTrash} from "react-icons/fa6";
import DeleteConfirmationModal from "@/app/(app)/components/modal/delete-modal";

export function DeleteBroker({accessToken, brokerId}: { accessToken: string, brokerId: string }) {
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

        <DeleteBrokerModal accessToken={accessToken} brokerId={brokerId} visible={isModalVisible} open={isModalOpen} closeDialog={closeModal}/>
    </>
}

function DeleteBrokerModal({accessToken, brokerId, visible, open, closeDialog}: {
    accessToken: string;
    brokerId: string;
    visible: boolean;
    open: boolean;
    closeDialog: () => void;
}) {
    const router = useRouter()

    const handleConfirm = async () => {
        closeDialog()
        await deleteBroker(accessToken, brokerId);
        router.refresh()
    };

    return (
        <DeleteConfirmationModal
            visible={visible}
            open={open}
            title="Delete Broker Token"
            message="This will disconnect the broker from the application and no further trades with this broker will be executed!"
            closeDialog={closeDialog}
            onConfirm={handleConfirm}
            cancelLabel="Cancel"
            confirmLabel="Confirm"
        />
    );

}