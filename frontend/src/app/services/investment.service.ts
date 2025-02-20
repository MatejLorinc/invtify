import {InvestmentModel, InvestmentsDto, InvestmentStrategyDto} from "@/app/models/investment/investment";
import {deleteExternalApiWithAuth, getExternalApiWithAuth, postExternalApiWithAuth} from "@/app/services/external-api.service";
import InvestmentStrategy from "@/app/models/investment/investment-strategy";
import InvestmentFrequency, {FrequencyType} from "@/app/models/investment/investment-frequency";
import InvestmentBroker from "@/app/models/broker/investment-broker";

export async function deleteInvestment(accessToken: string, investmentId: number) {
    await deleteExternalApiWithAuth("api/user/investments", accessToken, {investmentId: investmentId});
}

export async function createInvestment(accessToken: string, investment: InvestmentStrategyDto) {
    await postExternalApiWithAuth("api/user/investments", accessToken, investment);
}

export async function getInvestments(accessToken: string) {
    const response = await getExternalApiWithAuth("api/user/investments", accessToken);
    const data: InvestmentsDto = await response.json() as InvestmentsDto;
    return data.investments.map((investmentData) => {
            const investmentStrategy = investmentData.investmentStrategy;
            return new InvestmentModel(
                investmentData.uniqueId,
                InvestmentStrategy.fromName(investmentStrategy.strategy),
                new InvestmentFrequency(FrequencyType.fromName(investmentStrategy.frequency.type),
                    investmentStrategy.frequency.day,
                    investmentStrategy.frequency.hour),
                {
                    ...investmentStrategy.asset,
                    broker: InvestmentBroker.fromName(investmentStrategy.asset.broker)
                },
                investmentStrategy.amount,
                investmentStrategy.priceDrop,
                new Date(investmentStrategy.createdAt),
                investmentData.currentValue,
                investmentData.totallyInvested,
                investmentData.rateOfReturn,
                investmentData.profitLoss,
                investmentData.investmentDatetimeValues,
            );
        }
    );
}