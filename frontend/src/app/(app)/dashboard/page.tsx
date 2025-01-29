import {getSession, Session, withPageAuthRequired} from '@auth0/nextjs-auth0';
import Investments from "@/app/(app)/components/investment/investments";
import Portfolio from "@/app/(app)/components/portfolio";
import Brokers from "@/app/(app)/components/broker/brokers";

export default withPageAuthRequired(async function Dashboard() {
    const session = await getSession() as Session;
    return <div className="mx-4 mb-4 flex flex-col gap-8">
        <Portfolio/>
        <Investments accessToken={session.accessToken as string}/>
        <Brokers accessToken={session.accessToken as string}/>
    </div>;
}, {returnTo: '/dashboard'})