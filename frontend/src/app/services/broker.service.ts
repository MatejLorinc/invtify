import {deleteExternalApiWithAuth, getExternalApiWithAuth, postExternalApiWithAuth} from "@/app/services/external-api.service";
import InvestmentBroker, {BrokerModel, BrokersDto, TokenDto} from "@/app/models/broker/investment-broker";

export async function deleteBroker(accessToken: string, brokerId: string) {
    await deleteExternalApiWithAuth("api/user/broker", accessToken, {
        brokerId: brokerId,
        token: ""
    });
}

export async function updateBroker(accessToken: string, broker: TokenDto) {
    await postExternalApiWithAuth("api/user/broker", accessToken, broker);
}

export async function getBrokers(accessToken: string) {
    console.log("getBrokers")
    const response = await getExternalApiWithAuth("api/user/broker", accessToken);
    const data: BrokersDto = await response.json() as BrokersDto;
    return data.brokers.map((brokerData) =>
        new BrokerModel({
                broker: InvestmentBroker.fromName(brokerData.tokenModel.broker),
                token: brokerData.tokenModel.token
            },
            brokerData.funds,
            brokerData.reservesLifetimeDays)
    );
}