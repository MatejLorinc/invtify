export default class InvestmentStrategy {
    static readonly DCA_MARKET = new InvestmentStrategy("DCA_MARKET", "DCA - Market");
    static readonly LIMIT_DCA = new InvestmentStrategy("LIMIT_DCA", "DCA - Limit");
    static readonly EXIT_DCA = new InvestmentStrategy("EXIT_DCA", "Exit DCA");

    private constructor(
        public readonly id: string,
        public readonly displayName: string
    ) {
    }

    private static _values: Record<string, InvestmentStrategy> | null = null;

    private static get values(): Record<string, InvestmentStrategy> {
        if (!this._values) {
            this._values = {};
            this.addValue(InvestmentStrategy.DCA_MARKET);
            this.addValue(InvestmentStrategy.LIMIT_DCA);
            this.addValue(InvestmentStrategy.EXIT_DCA);
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
            this._values[strategy.id] = strategy;
        }
    }
}