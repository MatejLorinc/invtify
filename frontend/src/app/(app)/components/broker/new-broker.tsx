"use client"

import React, {useState} from "react";
import Modal from "@/app/(app)/components/modal/modal";
import InvestmentBroker from "@/app/(models)/broker/investment-broker";
import {Dropdown} from "@/app/(app)/components/modal/dropdown";
import {TextInput} from "@/app/(app)/components/modal/text-input";
import {updateBroker} from "@/app/(services)/broker.service";
import {useRouter} from "next/navigation";

export function AddBroker({accessToken, brokerIds}: { accessToken: string, brokerIds: string[] }) {
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
        <div
            className="bg-primary-400 items-center rounded-xl overflow-hidden shadow-lg transition duration-300 ease-in-out hover:bg-primary-300  cursor-pointer"
            onClick={openModal}>
            <p
                className="text-sm font-medium px-3 py-2 mt-auto text-white">
                New Connection
            </p>
        </div>

        <NewBrokerModal accessToken={accessToken} brokerIds={brokerIds} visible={isModalVisible} open={isModalOpen} closeDialog={closeModal}/>
    </>
}

function NewBrokerModal({accessToken, brokerIds, visible, open, closeDialog}: {
    accessToken: string;
    brokerIds: string[];
    visible: boolean;
    open: boolean;
    closeDialog: () => void;
}) {
    const [formData, setFormData] = useState({
        broker: '',
        token: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const router = useRouter()

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (formData.broker.trim() === "") newErrors.broker = 'Please select a broker';
        if (formData.token.trim() === "") newErrors.token = 'Token is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;
        closeDialog()

        await updateBroker(accessToken, {
            broker: formData.broker,
            token: formData.token
        });

        setFormData({
            broker: '',
            token: ''
        })

        router.refresh()
    };

    const selectableBrokers = InvestmentBroker.getValues().filter(broker => !brokerIds.includes(broker.id));

    return (
        <Modal
            visible={visible}
            open={open}
            title="Connect New Broker"
            closeDialog={closeDialog}
            buttons={[
                {label: 'Cancel', onClick: closeDialog, variant: 'secondary'},
                {label: 'Create', onClick: handleSubmit, variant: 'primary'}
            ]}
            errors={errors}
        >
            <Dropdown
                label="Brokerage"
                placeholder={selectableBrokers.length > 0 ? "Please select broker" : "There are no new brokers to select"}
                name="broker"
                options={selectableBrokers.map(broker => {
                    return {
                        value: broker.id,
                        label: broker.displayName
                    }
                })}
                value={formData.broker}
                onChange={(e) => setFormData({...formData, broker: e.target.value})}
            />

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