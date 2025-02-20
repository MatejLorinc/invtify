import {InvestmentAssetsDto} from "@/app/models/investment/investment";
import {TokenDto} from "@/app/models/broker/investment-broker";
import {getExternalApiWithAuth} from "@/app/services/external-api.service";

export async function getInvestmentAssets(accessToken: string, tokenDto: TokenDto) {
    const response = await getExternalApiWithAuth("api/user/assets?brokerId=" + tokenDto.brokerId + "&token=" + tokenDto.token, accessToken, tokenDto);
    const data: InvestmentAssetsDto = await response.json() as InvestmentAssetsDto;
    return data.assets
}