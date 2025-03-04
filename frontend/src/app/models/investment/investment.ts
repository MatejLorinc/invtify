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
        public priceDrop: number,
        public createdAt: Date,
        public currentValue: number,
        public totallyInvested: number,
        public rateOfReturn: number,
        public profitLoss: number,
        public investmentDatetimeValues: [InvestmentDatetimeValueDto]
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

export interface InvestmentAssetsDto {
    assets: InvestmentAsset[]
}

export interface InvestmentAsset {
    id: string,
    asset: string,
    currency: string,
    broker: InvestmentBroker
    icon: string
}

export interface InvestmentsDto {
    investments: [
        {
            uniqueId: number,
            investmentStrategy: InvestmentStrategyDto,
            currentValue: number,
            totallyInvested: number,
            rateOfReturn: number,
            profitLoss: number,
            investmentDatetimeValues: [InvestmentDatetimeValueDto]
        }
    ]
}

export interface InvestmentStrategyDto {
    strategy: string
    frequency: {
        type: string
        day: number
        hour: number
    },
    amount: number
    priceDrop: number
    asset: {
        id: string
        asset: string
        currency: string
        broker: string
        icon: string
    },
    createdAt: string
}

export interface CreateInvestmentStrategyDto {
    strategy: string
    frequency: {
        type: string
        day: number
        hour: number
    },
    amount: number
    priceDrop: number
    assetId: string,
    createdAt: string
}

export interface InvestmentDatetimeValueDto {
    value: number,
    datetime: string
}