import InvestmentFrequency from "@/app/models/investment/investment-frequency";
import InvestmentStrategy from "@/app/models/investment/investment-strategy";
import InvestmentBroker from "@/app/models/broker/investment-broker";

export class InvestmentModel {
    constructor(
        public uniqueId: number,
        public strategy: InvestmentStrategy,
        public frequency: InvestmentFrequency,
        public asset: InvestmentAsset,
        public amount: number,
        public createdAt: Date
    ) {
    }

    getFrequencyDatetime(): string {
        return this.frequency.getFrequencyDatetime()
    }

    getCurrencyAmount(): string {
        const formattedAmount = new Intl.NumberFormat('sk-SK', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(this.amount);

        return formattedAmount + " €";
    }
}

export interface InvestmentAsset {
    asset: string,
    currency: string,
    broker: InvestmentBroker
    icon: string
}

export interface InvestmentsDto {
    investments: [
        {
            uniqueId: number,
            strategy: string,
            frequency: {
                type: string,
                day: number,
                hour: number
            },
            amount: number,
            asset: {
                asset: string,
                currency: string,
                broker: string
                icon: string
            },
            createdAt: string
        }
    ]
}