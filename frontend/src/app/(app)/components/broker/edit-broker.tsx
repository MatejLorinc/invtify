"use client"

import React, {useState} from "react";
import Modal from "@/app/(app)/components/modal/modal";
import {TextInput} from "@/app/(app)/components/modal/text-input";
import {updateBroker} from "@/app/services/broker.service";
import {useRouter} from "next/navigation";
import {FaPen} from "react-icons/fa6";

export function EditBroker({accessToken, brokerId, brokerName}: { accessToken: string, brokerId: string, brokerName: string }) {
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
        <div className="text-sm p-3 rounded-full bg-black/5 transition duration-300 ease-in-out hover:bg-black/10 cursor-pointer"
             onClick={openModal}>
            <FaPen/>
        </div>

        <EditBrokerModal accessToken={accessToken} brokerId={brokerId} brokerName={brokerName} visible={isModalVisible} open={isModalOpen} closeDialog={closeModal}/>
    </>
}

function EditBrokerModal({accessToken, brokerId, brokerName, visible, open, closeDialog}: {
    accessToken: string;
    brokerId: string;
    brokerName: string;
    visible: boolean;
    open: boolean;
    closeDialog: () => void;
}) {
    const [formData, setFormData] = useState({
        token: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const router = useRouter()

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (formData.token.trim() === "") newErrors.token = 'Token is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;
        closeDialog()

        await updateBroker(accessToken, {
            brokerId: brokerId,
            token: formData.token
        });

        setFormData({
            token: ''
        })

        router.refresh()
    };

    return (
        <Modal
            visible={visible}
            open={open}
            title={`Edit ${brokerName} Token`}
            closeDialog={closeDialog}
            buttons={[
                {label: 'Cancel', onClick: closeDialog, variant: 'secondary'},
                {label: 'Update', onClick: handleSubmit, variant: 'primary'}
            ]}
            errors={errors}
        >
            <TextInput
                label="Token"
                name="token"
                placeholder="Enter broker token"
                value={formData.token}
                onChange={(e) => setFormData({...formData, token: e.target.value})}
            />
        </Modal>
    );

}