"use client"

import React, {useEffect, useState} from "react";
import Modal from "@/app/(app)/components/modal/modal";
import {Dropdown} from "@/app/(app)/components/modal/dropdown";
import {TextInput} from "@/app/(app)/components/modal/text-input";
import {useRouter} from "next/navigation";
import InvestmentStrategy from "@/app/models/investment/investment-strategy";
import InvestmentFrequency, {FrequencyType} from "@/app/models/investment/investment-frequency";
import {createInvestment} from "@/app/services/investment.service";
import InvestmentBroker, {TokenDto} from "@/app/models/broker/investment-broker";
import {getInvestmentAssets} from "@/app/services/asset.service";
import {SearchableDropdown} from "../modal/searchable-dropdown";

export function AddInvestment({accessToken, brokers}: { accessToken: string, brokers: TokenDto[] }) {
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

        <NewInvestmentModal accessToken={accessToken} visible={isModalVisible} brokers={brokers} open={isModalOpen} closeDialog={closeModal}/>
    </>
}

function NewInvestmentModal({accessToken, visible, brokers, open, closeDialog}: {
    accessToken: string;
    visible: boolean;
    brokers: TokenDto[];
    open: boolean;
    closeDialog: () => void;
}) {
    const [formData, setFormData] = useState({
        strategy: '',
        broker: '',
        asset: '',
        currency: '',
        frequencyType: '',
        day: null as number | null,
        hour: null as number | null,
        purchaseWorth: '',
        priceDrop: ''
    });
    const [brokerAssets, setBrokerAssets] = useState<{ value: string; label: string }[]>([]);
    const [loadingAssets, setLoadingAssets] = useState(false);

    const currencyOptions = [
        {value: 'USD', label: '$ (USD)'},
        {value: 'EUR', label: '€ (EUR)'},
        {value: 'GBP', label: '£ (GBP)'}
    ];

    useEffect(() => {
        if (formData.broker && formData.currency) {
            const fetchAssets = async () => {
                try {
                    setLoadingAssets(true);
                    const selectedBroker = brokers.find(broker => broker.brokerId === formData.broker);
                    if (!selectedBroker) return;
                    const response = await fetchBrokerAssets(accessToken, selectedBroker);

                    const filteredAssets = response.filter(asset => asset.currency === formData.currency);
                    setBrokerAssets(filteredAssets.map(asset => ({
                        value: asset.id,
                        label: `${asset.asset} (${asset.currency})`
                    })));
                } catch (error) {
                    console.error('Failed to fetch assets:', error);
                    setBrokerAssets([]);
                } finally {
                    setLoadingAssets(false);
                }
            };
            fetchAssets();
        }
    }, [formData.broker, formData.currency, accessToken, brokers]);

    const [errors, setErrors] = useState<Record<string, string>>({});

    const router = useRouter();

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (formData.strategy.trim() === "")
            newErrors.strategy = 'Please select a strategy';
        if (formData.broker.trim() === "")
            newErrors.broker = 'Please select a broker';

        if (formData.broker && formData.currency.trim() === "")
            newErrors.currency = 'Please select a currency';

        if (formData.broker && formData.currency && formData.asset.trim() === "")
            newErrors.asset = 'Please select an asset';

        if (formData.purchaseWorth.trim() === "") {
            newErrors.purchaseWorth = 'Purchase worth is required';
        } else if (isNaN(Number(formData.purchaseWorth))) {
            newErrors.purchaseWorth = 'Purchase worth must be a number';
        }

        if (!formData.frequencyType) {
            newErrors.frequencyType = 'Please select a frequency type';
        } else {
            if ([FrequencyType.EVERY_WEEK.id, FrequencyType.EVERY_MONTH.id].includes(formData.frequencyType)) {
                if (formData.day === null || isNaN(formData.day))
                    newErrors.day = 'Please select a day';
            }
            if (formData.hour === null || isNaN(formData.hour))
                newErrors.hour = 'Please select a time';
        }

        if (formData.strategy === InvestmentStrategy.DCA_LIMIT.id) {
            if (formData.priceDrop.trim() === "") {
                newErrors.priceDrop = 'Price drop percentage is required';
            } else if (isNaN(Number(formData.priceDrop))) {
                newErrors.priceDrop = 'Price drop must be a number';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;
        closeDialog();

        await createInvestment(accessToken, {
            strategy: formData.strategy,
            frequency: {
                type: formData.frequencyType,
                day: formData.day || 1,
                hour: formData.hour || 0
            },
            amount: parseInt(formData.purchaseWorth),
            priceDrop: formData.strategy === InvestmentStrategy.DCA_LIMIT.id ? parseInt(formData.priceDrop) : 0,
            assetId: formData.asset,
            createdAt: Date.now().toString(),
        });

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
                error={errors.strategy}
            />

            <Dropdown
                label="Broker"
                placeholder={brokers.length > 0 ? "Please select broker" : "Please connect broker"}
                name="broker"
                options={brokers.map(broker => ({
                    value: broker.brokerId,
                    label: InvestmentBroker.fromName(broker.brokerId).displayName
                }))}
                value={formData.broker}
                onChange={(e) => {
                    // Reset currency and asset when broker changes
                    setFormData({...formData, broker: e.target.value, currency: '', asset: ''});
                }}
                error={errors.broker}
            />

            {formData.broker && (
                <Dropdown
                    label="Currency"
                    placeholder="Select currency"
                    name="currency"
                    options={currencyOptions}
                    value={formData.currency}
                    onChange={(e) => {
                        // Reset asset when currency changes
                        setFormData({...formData, currency: e.target.value, asset: ''});
                    }}
                    error={errors.currency}
                />
            )}

            {formData.broker && formData.currency && (
                <SearchableDropdown
                    label="Asset"
                    placeholder={loadingAssets ? "Loading assets..." : "Select asset"}
                    name="asset"
                    options={brokerAssets}
                    value={formData.asset}
                    onChange={(option: any) => setFormData({...formData, asset: option})}
                    noOptionsText="No assets found"
                    disabled={loadingAssets || !brokerAssets.length}
                    error={errors.asset}
                />
            )}

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
                error={errors.frequencyType}
            />

            {formData.frequencyType && (
                <div className="space-y-4">
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
                            error={errors.day}
                        />
                    )}

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
                            error={errors.day}
                        />
                    )}

                    <Dropdown
                        label="Time"
                        placeholder="Select hour"
                        name="hour"
                        options={Array.from({length: 24}, (_, i) => ({
                            value: i,
                            label: `${i}:00`
                        }))}
                        value={formData.hour !== null ? formData.hour.toString() : ''}
                        onChange={(e) => setFormData({...formData, hour: parseInt(e.target.value)})}
                        error={errors.hour}
                    />
                </div>
            )}

            <TextInput
                label={(formData.strategy === InvestmentStrategy.EXIT_DCA.id ? "Sell" : "Purchase") + ` worth`}
                name="value"
                placeholder={`Enter amount to ${formData.strategy === InvestmentStrategy.EXIT_DCA.id ? "sell" : "buy"} for each cycle`}
                value={formData.purchaseWorth}
                onChange={(e) => setFormData({...formData, purchaseWorth: e.target.value})}
                type="number"
                error={errors.purchaseWorth}
            />

            {formData.strategy === InvestmentStrategy.DCA_LIMIT.id && (
                <TextInput
                    label="Price Drop Percentage"
                    name="priceDrop"
                    placeholder="Enter percentage drop (e.g., 5 for 5%)"
                    value={formData.priceDrop}
                    onChange={(e) => setFormData({...formData, priceDrop: e.target.value})}
                    type="number"
                    min="0"
                    max="100"
                    error={errors.priceDrop}
                />
            )}
        </Modal>
    );
}

async function fetchBrokerAssets(accessToken: string, tokenDto: TokenDto) {
    return getInvestmentAssets(accessToken, tokenDto);
}
