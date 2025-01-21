export default class InvestmentStrategy {
    static readonly DCA_MARKET = new InvestmentStrategy("DCA_MARKET", "DCA - Market");

    private constructor(
        public readonly name: string,
        public readonly displayName: string
    ) {
    }

    private static _values: Record<string, InvestmentStrategy> | null = null;

    private static get values(): Record<string, InvestmentStrategy> {
        if (!this._values) {
            this._values = {};
            this.addValue(InvestmentStrategy.DCA_MARKET);
        }
        return this._values;
    }

    static getValues(): InvestmentStrategy[] {
        return Object.values(this.values);
    }

    static fromName(name: string): InvestmentStrategy {
        return this.values[name];
    }

    private static addValue(strategy: InvestmentStrategy) {
        if (this._values) {
            this._values[strategy.name] = strategy;
        }
    }
}