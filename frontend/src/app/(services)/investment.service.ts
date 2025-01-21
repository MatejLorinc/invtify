import {InvestmentModel, InvestmentsDto} from "@/app/(models)/investment/investment";
import {getExternalApiWithAuth, postExternalApiWithAuth} from "@/app/(services)/external-api.service";
import InvestmentStrategy from "@/app/(models)/investment/investment-strategy";
import InvestmentFrequency, {FrequencyType} from "@/app/(models)/investment/investment-frequency";
import InvestmentBroker from "@/app/(models)/investment/investment-broker";

export async function createInvestment(accessToken: string, investment: InvestmentModel) {
    await postExternalApiWithAuth("api/user/investments", accessToken, investment);
}

export async function getInvestments(accessToken: string) {
    const response = await getExternalApiWithAuth("api/user/investments", accessToken);
    const data: InvestmentsDto = await response.json() as InvestmentsDto;
    return data.investments.map((investmentData) =>
        new InvestmentModel(InvestmentStrategy.fromName(investmentData.strategy),
            new InvestmentFrequency(FrequencyType.fromName(investmentData.frequency.type),
                investmentData.frequency.day,
                investmentData.frequency.hour),
            {
                ...investmentData.asset,
                broker: InvestmentBroker.fromName(investmentData.asset.broker)
            },
            investmentData.amount,
            new Date(investmentData.createdAt)
        )
    );
}