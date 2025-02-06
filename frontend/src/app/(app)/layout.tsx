import Navbar from "@/app/components/navbar";

export default function Layout({
                                   children,
                               }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar items={[]}/>
            <div className="mt-20 max-w-screen-xl mx-auto">
                {children}
            </div>
        </>
    );
}