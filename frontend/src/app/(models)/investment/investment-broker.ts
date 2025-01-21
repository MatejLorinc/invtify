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