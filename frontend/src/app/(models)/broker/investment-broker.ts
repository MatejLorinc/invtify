export default class InvestmentBroker {
    static readonly TRADING_212 = new InvestmentBroker("TRADING_212", "trading212.png", "Trading 212");
    static readonly XTB = new InvestmentBroker("XTB", "xtb.png", "XTB");
    static readonly BINANCE = new InvestmentBroker("BINANCE", "binance.png", "Binance");

    private constructor(
        public readonly id: string,
        public readonly icon: string,
        public readonly displayName: string
    ) {
    }

    private static _values: Record<string, InvestmentBroker> | null = null;

    private static get values(): Record<string, InvestmentBroker> {
        if (!this._values) {
            this._values = {}
            this.addValue(InvestmentBroker.TRADING_212);
            this.addValue(InvestmentBroker.XTB);
            this.addValue(InvestmentBroker.BINANCE);
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
            this._values[broker.id] = broker;
        }
    }
}

export class BrokerModel {
    constructor(
        public tokenModel: TokenModel,
        public totalBalance: number,
        public investedBalance: number,
        public availableBalance: number,
        public reservesLifetimeDays: number
    ) {
    }

    getReservesLifetime(): string {
        const months = this.reservesLifetimeDays / 30
        const weeks = this.reservesLifetimeDays / 7 % 30
        const days = this.reservesLifetimeDays % 7

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
        if (this.reservesLifetimeDays <= 0) {
            durationText = "No balance available"
        }

        return durationText
    }
}

export interface TokenModel {
    broker: InvestmentBroker,
    token: string,
}

export interface TokenDto {
    brokerId: string,
    token: string
}

export interface BrokersDto {
    brokers: [
        {
            tokenModel: {
                broker: string,
                token: string
            },
            totalBalance: number,
            investedBalance: number,
            availableBalance: number,
            reservesLifetimeDays: number,
        }
    ]
}