export interface InvestmentModel {
    strategy: InvestmentStrategy,
    provider: InvestmentProvider,
    frequency: InvestmentFrequency,
    amount: number,
    icon: string
}

export enum InvestmentStrategy {
    DCA_MARKET = "DCA - Market"
}

export enum InvestmentProvider {
    TRADING_212 = "Trading 212"
}

export interface InvestmentFrequency {
    type: FrequencyType,
    day: number,
    hour: number
}

export enum FrequencyType {
    EVERY_DAY,
    EVERY_WEEK,
    EVERY_MONTH
}

export interface InvestmentsDto {
    investments: InvestmentModel[]
}