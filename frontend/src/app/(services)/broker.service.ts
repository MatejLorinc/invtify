import {getExternalApiWithAuth, postExternalApiWithAuth} from "@/app/(services)/external-api.service";
import InvestmentBroker, {BrokerModel, BrokersDto, TokenDto} from "@/app/(models)/broker/investment-broker";

export async function updateBroker(accessToken: string, broker: TokenDto) {
    await postExternalApiWithAuth("api/user/broker", accessToken, broker);
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