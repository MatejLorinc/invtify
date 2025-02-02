export default class InvestmentBroker {
    static readonly TRADING_212 = new InvestmentBroker("TRADING_212", "Trading 212");

    private constructor(
        public readonly name: string,
        public readonly displayName: string
    ) {
    }

    private static _values: Record<string, InvestmentBroker> | null = null;

    private static get values(): Record<string, InvestmentBroker> {
        if (!this._values) {
            this._values = {}
            this.addValue(InvestmentBroker.TRADING_212);
        }
        return this._values;
    }

    static getValues(): InvestmentBroker[] {
        return Object.values(InvestmentBroker.values);
    }

    static fromName(name: string): InvestmentBroker {
        return InvestmentBroker.values[name];
    }

    private static addValue(broker: InvestmentBroker) {
        if (this._values) {
            this._values[broker.name] = broker;
        }
    }
}

export class BrokerModel {
    constructor(
        public tokenModel: TokenModel,
        public totalBalance: number,
        public investedBalance: number,
        public availableBalance: number,
        public remainingDurationDays: number
    ) {
    }

    getRemainingDuration(): string {
        const months = this.remainingDurationDays / 30
        const weeks = this.remainingDurationDays / 7 % 30
        const days = this.remainingDurationDays % 7

        let durationText = ""
        if (months > 0) {
            durationText += months + " month" + (months > 1 ? "s " : " ")
        }
        if (weeks > 0) {
            durationText += weeks + " week" + (weeks > 1 ? "s " : " ")
        }
        if (days > 0) {
            durationText += days + " day" + (days > 1 ? "s" : "")
        }

        return durationText
    }
}

export interface TokenModel {
    broker: InvestmentBroker,
    token: string,
}

export interface BrokersDto {
    investments: [
        {
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