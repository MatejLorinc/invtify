export class PortfolioTimeframe {
    static readonly DAY = new PortfolioTimeframe("DAY", "Day");
    static readonly WEEK = new PortfolioTimeframe("WEEK", "Week");
    static readonly MONTH = new PortfolioTimeframe("MONTH", "Month");
    static readonly YEAR = new PortfolioTimeframe("YEAR", "Year");
    static readonly MAX = new PortfolioTimeframe("MAX", "Max");

    private constructor(public readonly id: string, public readonly displayName: string) {
    }

    private static _values: Record<string, PortfolioTimeframe> | null = null;

    private static get values(): Record<string, PortfolioTimeframe> {
        if (!this._values) {
            this._values = {};
            this.addValue(PortfolioTimeframe.DAY);
            this.addValue(PortfolioTimeframe.WEEK);
            this.addValue(PortfolioTimeframe.MONTH);
            this.addValue(PortfolioTimeframe.YEAR);
            this.addValue(PortfolioTimeframe.MAX);
        }
        return this._values;
    }

    static getValues(): PortfolioTimeframe[] {
        return Object.values(this.values);
    }

    static fromName(name: string): PortfolioTimeframe {
        return this.values[name];
    }

    private static addValue(type: PortfolioTimeframe) {
        if (this._values) {
            this._values[type.id] = type;
        }
    }
}
