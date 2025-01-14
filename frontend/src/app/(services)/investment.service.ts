import {InvestmentModel, InvestmentsDto} from "@/app/(models)/investment";
import {getExternalApiWithAuth, postExternalApiWithAuth} from "@/app/(services)/external-api.service";

export async function createInvestment(accessToken: string, investment: InvestmentModel) {
    await postExternalApiWithAuth("api/user/investments", accessToken, investment);
}

export async function getInvestments(accessToken: string) {
    const response = await getExternalApiWithAuth("api/user/investments", accessToken);
    const data: InvestmentsDto = await response.json();
    return data.investments;
}