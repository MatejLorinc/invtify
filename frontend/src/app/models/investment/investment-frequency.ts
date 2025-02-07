export default class InvestmentFrequency {
    constructor(public readonly type: FrequencyType, public readonly day: number, public readonly hour: number) {
    }

    getFrequencyDatetime(): string {
        if (this.type === FrequencyType.EVERY_MONTH) {
            return "Every " + this.day + ". at " + this.hour + ":00"
        }
        if (this.type === FrequencyType.EVERY_WEEK) {
            const day = this.numberToDay(this.day)
            return "Every " + day + " at " + this.hour + ":00"
        }
        return "Everyday at " + this.hour + ":00"
    }

    numberToDay(dayNumber: number) {
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        return days[dayNumber - 1];
    }
}

export class FrequencyType {
    static readonly EVERY_DAY = new FrequencyType("EVERY_DAY", "Every Day");
    static readonly EVERY_WEEK = new FrequencyType("EVERY_WEEK", "Every Week");
    static readonly EVERY_MONTH = new FrequencyType("EVERY_MONTH", "Every Month");

    private constructor(public readonly id: string, public readonly displayName: string) {
    }

    private static _values: Record<string, FrequencyType> | null = null;

    private static get values(): Record<string, FrequencyType> {
        if (!this._values) {
            this._values = {};
            this.addValue(FrequencyType.EVERY_DAY);
            this.addValue(FrequencyType.EVERY_WEEK);
            this.addValue(FrequencyType.EVERY_MONTH);
        }
        return this._values;
    }

    static getValues(): FrequencyType[] {
        return Object.values(this.values);
    }

    static fromName(name: string): FrequencyType {
        return this.values[name];
    }

    private static addValue(type: FrequencyType) {
        if (this._values) {
            this._values[type.id] = type;
        }
    }
}