"use client"

import React, {useState} from "react";
import Modal from "@/app/(app)/components/modal/modal";
import {Dropdown} from "@/app/(app)/components/modal/dropdown";
import {TextInput} from "@/app/(app)/components/modal/text-input";
import {useRouter} from "next/navigation";
import InvestmentStrategy from "@/app/models/investment/investment-strategy";
import InvestmentFrequency, {FrequencyType} from "@/app/models/investment/investment-frequency";
import {createInvestment} from "@/app/services/investment.service";

export function AddInvestment({accessToken}: { accessToken: string }) {
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
                New Strategy
            </p>
        </div>

        <NewInvestmentModal accessToken={accessToken} visible={isModalVisible} open={isModalOpen} closeDialog={closeModal}/>
    </>
}

function NewInvestmentModal({accessToken, visible, open, closeDialog}: {
    accessToken: string;
    visible: boolean;
    open: boolean;
    closeDialog: () => void;
}) {
    const [formData, setFormData] = useState({
        strategy: '',
        broker: '',
        frequencyType: '',
        day: null as number | null,
        hour: null as number | null,
        purchaseWorth: '',
        priceDrop: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const router = useRouter()

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        // Existing validations
        if (formData.strategy.trim() === "") newErrors.strategy = 'Please select a strategy';
        if (formData.broker.trim() === "") newErrors.broker = 'Please select a broker';
        if (formData.purchaseWorth.trim() === "") newErrors.purchaseWorth = 'Purchase worth is required';

        // Frequency validation
        if (!formData.frequencyType) {
            newErrors.frequencyType = 'Please select a frequency type';
        } else {
            // Day validation for weekly/monthly
            if ([FrequencyType.EVERY_WEEK.id, FrequencyType.EVERY_MONTH.id].includes(formData.frequencyType)) {
                if (formData.day === null) newErrors.day = 'Please select a day';
            }
            // Time validation
            if (formData.hour === null) newErrors.hour = 'Please select a time';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        const frequency = new InvestmentFrequency(
            FrequencyType.fromName(formData.frequencyType),
            formData.day || 0, // Default to 0 if not applicable
            formData.hour || 0
        );

        // Submit logic here (replace updateBroker with actual API call)
        await createInvestment(accessToken, {
            brokerId: formData.broker,
            token: formData.token,
            // Include other necessary fields
            frequency
        });

        closeDialog();
        router.refresh();
    };

    return (
        <Modal
            visible={visible}
            open={open}
            title="Create Investment Strategy"
            closeDialog={closeDialog}
            buttons={[
                {label: 'Cancel', onClick: closeDialog, variant: 'secondary'},
                {label: 'Create', onClick: handleSubmit, variant: 'primary'}
            ]}
            errors={errors}
        >
            {/* Strategy Dropdown */}
            <Dropdown
                label="Strategy"
                placeholder="Please select strategy"
                name="strategy"
                options={InvestmentStrategy.getValues().map(strategy => ({
                    value: strategy.id,
                    label: strategy.displayName
                }))}
                value={formData.strategy}
                onChange={(e) => setFormData({...formData, strategy: e.target.value})}
            />

            {/* Broker Dropdown (fix options as needed) */}
            <Dropdown
                label="Broker"
                placeholder="Please connect broker"
                name="broker"
                options={[]} // Replace with actual broker options
                value={formData.broker}
                onChange={(e) => setFormData({...formData, broker: e.target.value})}
            />

            {/* Frequency Type Dropdown */}
            <Dropdown
                label="Frequency Type"
                placeholder="Please select frequency type"
                name="frequency-type"
                options={FrequencyType.getValues().map(frequency => ({
                    value: frequency.id,
                    label: frequency.displayName
                }))}
                value={formData.frequencyType}
                onChange={(e) => setFormData({...formData, frequencyType: e.target.value})}
            />

            {formData.frequencyType && (
                <div className="space-y-4">
                    {/* Day of Week */}
                    {formData.frequencyType === FrequencyType.EVERY_WEEK.id && (
                        <Dropdown
                            label="Day of the Week"
                            placeholder="Select day"
                            name="dayOfWeek"
                            options={[1, 2, 3, 4, 5, 6, 7].map(day => ({
                                value: day,
                                label: new InvestmentFrequency(FrequencyType.EVERY_WEEK, day, 0).numberToDay(day)
                            }))}
                            value={formData.day?.toString() || ''}
                            onChange={(e) => setFormData({...formData, day: parseInt(e.target.value)})}
                        />
                    )}

                    {/* Day of Month */}
                    {formData.frequencyType === FrequencyType.EVERY_MONTH.id && (
                        <Dropdown
                            label="Day of the Month"
                            placeholder="Select day"
                            name="dayOfMonth"
                            options={Array.from({length: 31}, (_, i) => i + 1).map(day => ({
                                value: day,
                                label: day.toString()
                            }))}
                            value={formData.day?.toString() || ''}
                            onChange={(e) => setFormData({...formData, day: parseInt(e.target.value)})}
                        />
                    )}

                    {/* Time Picker */}
                    <Dropdown
                        label="Time"
                        placeholder="Select hour"
                        name="hour"
                        options={Array.from({length: 24}, (_, i) => ({
                            value: i,
                            label: `${i}:00`
                        }))}
                        value={formData.hour?.toString() || ''}
                        onChange={(e) => setFormData({...formData, hour: parseInt(e.target.value)})}
                    />
                </div>
            )}

            <TextInput
                label={(formData.strategy === InvestmentStrategy.EXIT_DCA.id ? "Sell" : "Purchase") + ` worth`}
                name="value"
                placeholder={`Enter amount to ${formData.strategy === InvestmentStrategy.EXIT_DCA.id ? "sell" : "buy"} for each cycle`}
                value={formData.purchaseWorth}
                onChange={(e) => setFormData({...formData, purchaseWorth: e.target.value})}
            />

            {formData.strategy === InvestmentStrategy.LIMIT_DCA.id && (
                <TextInput
                    label="Price Drop Percentage"
                    name="priceDrop"
                    placeholder="Enter percentage drop (e.g., 5 for 5%)"
                    value={formData.priceDrop}
                    onChange={(e) => setFormData({...formData, priceDrop: e.target.value})}
                    type="number"
                    min="0"
                    max="100"
                />
            )}
        </Modal>
    );

}