import { AlertCircleIcon, CalculatorIcon, ClockIcon } from "lucide-react";


const AttendanceStats = ({ history }) => {

    const totalPresent = history.filter((h) => h.status === "PRESENT" | h.status === "LATE").length;
    const totalLate = history.filter((h) => h.status === "LATE").lenth;


    const stats = [
        {
            label: "Days Present",
            value: totalPresent,
            icon: CalculatorIcon
        },
        {
            label: "Late Arrivals",
            value: totalLate,
            icon: AlertCircleIcon
        },
        {
            label: "Avg. Work Hour",
            value: "8.5 Hours",
            icon: ClockIcon

        },

    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((s) => (
                <div
                    key={s.lable}
                    className="card card-hover p-5 sm:p-6 flex items-center gap-4 relative overflow-hidden group"
                >
                    <div className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full bg-slate-500/70 group-hover:bg-indigo-500/70"></div>
                    <div className="p-3 bg-slate-100 rounded-lg froup-hover:bg-indigo-50 translation-colors duration-200">
                        <s.icon className="w-5 h-5 text-slate-600 group-hover:text-indigo-600 transition-color duration-200"></s.icon>
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">{s.label}</p>
                        <p className="text-2xl font-medium text-slate-900 tracking-tight">{s.value}</p>
                    </div>

                </div>
            ))}
        </div>
    );
};

export default AttendanceStats;