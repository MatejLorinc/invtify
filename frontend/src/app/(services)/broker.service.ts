import {InvestmentModel} from "@/app/(models)/investment/investment";
import {getExternalApiWithAuth, postExternalApiWithAuth} from "@/app/(services)/external-api.service";
import InvestmentBroker, {BrokerModel, BrokersDto} from "@/app/(models)/broker/investment-broker";

export async function updateBroker(accessToken: string, investment: InvestmentModel) {
    await postExternalApiWithAuth("api/user/broker", accessToken, investment);
}

export async function getBrokers(accessToken: string) {
    const response = await getExternalApiWithAuth("api/user/broker", accessToken);
    const data: BrokersDto = await response.json() as BrokersDto;
    return data.brokers.map((brokerData) =>
        new BrokerModel({
                broker: InvestmentBroker.fromName(brokerData.tokenModel.broker),
                token: brokerData.tokenModel.token
            },
            brokerData.totalBalance,
            brokerData.investedBalance,
            brokerData.availableBalance,
            brokerData.reservesLifetimeDays)
    );
}