import {getExternalApiWithAuth} from "@/app/services/external-api.service";
import {PortfolioTimeframe} from "@/app/models/portfolio/portfolio-timeframe";
import {PortfolioModel} from "@/app/models/portfolio/portfolio";

export async function getPortfolio(accessToken: string, timeframe: PortfolioTimeframe) {
    const response = await getExternalApiWithAuth("api/user/portfolio?timeframe=" + timeframe.id, accessToken);
    const data: PortfolioModel = await response.json() as PortfolioModel;
    return data;
}