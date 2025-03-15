import {InvestmentDatetimeValueDto} from "@/app/models/investment/investment";

export interface PortfolioModel {
    currentValue: number;
    totalReturn: number;
    totalReturnPercentage: number;
    timeframeReturn: number;
    timeframeReturnPercentage: number;
    investmentDatetimeValues: InvestmentDatetimeValueDto[];
}