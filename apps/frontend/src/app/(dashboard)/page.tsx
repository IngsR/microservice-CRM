export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* Stats Card Example */}
                <div className="rounded-lg bg-white p-6 shadow">
                    <h3 className="text-sm font-medium text-gray-500">
                        Total Customers
                    </h3>
                    <p className="mt-2 text-3xl font-bold text-gray-900">
                        1,234
                    </p>
                </div>

                <div className="rounded-lg bg-white p-6 shadow">
                    <h3 className="text-sm font-medium text-gray-500">
                        Active Deals
                    </h3>
                    <p className="mt-2 text-3xl font-bold text-gray-900">45</p>
                </div>

                <div className="rounded-lg bg-white p-6 shadow">
                    <h3 className="text-sm font-medium text-gray-500">
                        Revenue
                    </h3>
                    <p className="mt-2 text-3xl font-bold text-gray-900">
                        $12,345
                    </p>
                </div>
            </div>
        </div>
    );
}
