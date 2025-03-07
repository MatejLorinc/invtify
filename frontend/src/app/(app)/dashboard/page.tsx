import {getSession, Session, withPageAuthRequired} from '@auth0/nextjs-auth0';
import Investments from "@/app/(app)/components/investment/investments";
import Portfolio from "@/app/(app)/components/portfolio";
import Brokers from "@/app/(app)/components/broker/brokers";
import {getBrokers} from "@/app/services/broker.service";

export default withPageAuthRequired(async function Dashboard() {
    const session = await getSession() as Session;

    const brokers = await getBrokers(session.accessToken as string);
    
    return <div className="mx-4 mb-4 flex flex-col gap-8">
        <Portfolio/>
        <Investments accessToken={session.accessToken as string} brokers={brokers}/>
        <Brokers accessToken={session.accessToken as string} brokers={brokers}/>
    </div>;
}, {returnTo: '/dashboard'})