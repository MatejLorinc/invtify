export default function Strategies() {
    return (
        <section className="bg-white" id="strategies">
            <div className="py-16 px-4 mx-auto max-w-screen-xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4 text-gray-900">Strategies</h1>

                    <div className="text-gray-700 max-w-4xl mx-auto text-lg">
                        <p>
                            Whether you're new to investing, looking to optimize your portfolio, aiming to secure
                            profits, or simply seeking a clearer view of your investments, we offer you the tools and
                            flexibility to take control.
                        </p>
                        <p className="mt-4">
                            Define and automate your own strategy to reach your goals with confidence and ease.
                        </p>
                    </div>
                </div>
                <div className="flex justify-center flex-wrap gap-8">
                    <div
                        className="flex flex-col max-w-sm w-full sm:w-72 p-6 bg-white border border-gray-200 rounded-lg shadow-lg h-full sm:min-h-96 hover:shadow-xl transition-shadow duration-300">
                        <h5 className="mb-2 text-2xl font-semibold text-gray-900">DCA</h5>
                        <p className="font-normal text-gray-700 mb-4">A strategy where you invest a fixed amount at
                            regular intervals to reduce the impact of market volatility.</p>
                        <ul className="list-disc pl-5 text-gray-700 space-y-2">
                            <li>Invest a fixed amount at regular intervals.</li>
                            <li>Reduces the impact of market volatility.</li>
                            <li>Ideal for long-term investing.</li>
                        </ul>
                    </div>

                    <div
                        className="flex flex-col max-w-sm w-full sm:w-72 p-6 bg-white border border-gray-200 rounded-lg shadow-lg h-full sm:min-h-96 hover:shadow-xl transition-shadow duration-300">
                        <h5 className="mb-2 text-2xl font-semibold text-gray-900">Limit DCA</h5>
                        <p className="font-normal text-gray-700 mb-4">Invest only if the price drops by a defined
                            percentage, otherwise buy at next week's market price.</p>
                        <ul className="list-disc pl-5 text-gray-700 space-y-2">
                            <li>Set a percentage drop for buying.</li>
                            <li>Purchase only if the price drops by the defined amount.</li>
                            <li>If not, buy at next week's market price.</li>
                        </ul>
                    </div>

                    <div
                        className="flex flex-col max-w-sm w-full sm:w-72 p-6 bg-white border border-gray-200 rounded-lg shadow-lg h-full sm:min-h-96 hover:shadow-xl transition-shadow duration-300">
                        <h5 className="mb-2 text-2xl font-semibold text-gray-900">Exit DCA</h5>
                        <p className="font-normal text-gray-700 mb-4">Gradually sell assets at regular intervals to lock
                            in profits over time.</p>
                        <ul className="list-disc pl-5 text-gray-700 space-y-2">
                            <li>Gradually sell assets at regular intervals.</li>
                            <li>Lock in profits over time.</li>
                            <li>Reduces exposure to market fluctuations.</li>
                        </ul>
                    </div>
                </div>
            </div>

        </section>
    )
}