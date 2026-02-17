import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

export default function Panel() {
    const { facturas } = usePage().props;

    const hoy = new Date();

    // ===== MÉTRICAS =====
    const total = facturas.length;

    const pagadas = facturas.filter(f => f.estado === "Pagada").length;

    const pendientes = facturas.filter(f => f.estado === "Pendiente").length;

    const vencidas = facturas.filter(f => f.estado === "Vencida").length;

    const emitidas = facturas.filter(f => f.tipo_factura === "Emitida").length;
    const recibidas = facturas.filter(f => f.tipo_factura === "Recibida").length;

    const totalTipo = emitidas + recibidas;

    const recientes = [...facturas]
        .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
        .slice(0, 5);

    const empresas = facturas.reduce((acc, factura) => {
        acc[factura.empresa] = (acc[factura.empresa] || 0) + 1;
        return acc;
    }, {});

    const principalesEmpresas = Object.entries(empresas)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    return (
        <AppLayout>
            <Head title="Panel General" />

            <div className="p-6 space-y-6">

                {/* HEADER */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                        Panel General
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        Resumen de tu repositorio de facturas
                    </p>
                </div>

                {/* CARDS PRINCIPALES */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <StatCard
                        title="TOTAL FACTURAS"
                        value={total}
                        subtitle="documentos registrados"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        }
                        iconBg="bg-blue-100 dark:bg-blue-900/40"
                    />
                    <StatCard
                        title="PAGADAS"
                        value={pagadas}
                        subtitle={`${total > 0 ? Math.round((pagadas / total) * 100) : 0}% del total`}
                        color="green"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        }
                        iconBg="bg-green-100 dark:bg-green-900/40"
                    />
                    <StatCard
                        title="PENDIENTES"
                        value={pendientes}
                        subtitle={`${total > 0 ? Math.round((pendientes / total) * 100) : 0}% del total`}
                        color="yellow"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        }
                        iconBg="bg-yellow-100 dark:bg-yellow-900/40"
                    />
                    <StatCard
                        title="VENCIDAS"
                        value={vencidas}
                        subtitle={`${total > 0 ? Math.round((vencidas / total) * 100) : 0}% del total`}
                        color="red"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        }
                        iconBg="bg-red-100 dark:bg-red-900/40"
                    />
                </div>

                {/* EMITIDAS / RECIBIDAS */}
                <div className="grid md:grid-cols-2 gap-6">
                    <ProgressCard
                        title="EMITIDAS"
                        value={emitidas}
                        total={totalTipo}
                        color="blue"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                            </svg>
                        }
                        iconBg="bg-blue-100 dark:bg-blue-900/40"
                    />

                    <ProgressCard
                        title="RECIBIDAS"
                        value={recibidas}
                        total={totalTipo}
                        color="green"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 7L7 17M7 17h10M7 17V7" />
                            </svg>
                        }
                        iconBg="bg-green-100 dark:bg-green-900/40"
                    />
                </div>

                {/* TABLAS */}
                <div className="grid md:grid-cols-2 gap-6">

                    {/* FACTURAS RECIENTES */}
                    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow p-6">
                        <h2 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Facturas Recientes
                        </h2>

                        {recientes.map(f => (
                            <div
                                key={f.id}
                                className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 py-3"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                        f.tipo_factura === "Recibida"
                                            ? "bg-green-100 dark:bg-green-900/40"
                                            : "bg-blue-100 dark:bg-blue-900/40"
                                    }`}>
                                        {f.tipo_factura === "Recibida" ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 7L7 17M7 17h10M7 17V7" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                                            </svg>
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800 dark:text-gray-200">
                                            {f.nombre_factura}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {f.empresa} - {f.fecha}
                                        </p>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 text-xs rounded-full ${
                                    f.estado === "Pagada"
                                        ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                        : f.estado === "Pendiente"
                                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                                        : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                                }`}>
                                    {f.estado}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* PRINCIPALES EMPRESAS */}
                    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow p-6">
                        <h2 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            Principales Empresas
                        </h2>

                        {principalesEmpresas.map(([empresa, cantidad], index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 py-3"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-300">
                                        {empresa}
                                    </span>
                                </div>
                                <span className="font-semibold text-gray-800 dark:text-white">
                                    {cantidad} factura(s)
                                </span>
                            </div>
                        ))}
                    </div>

                </div>

            </div>
        </AppLayout>
    );
}

/* ================= COMPONENTES ================= */

function StatCard({ title, value, subtitle, icon, iconBg }) {
    return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow p-6">
            <div className="flex justify-between items-start">
                <p className="text-gray-500 dark:text-gray-400 text-xs font-semibold tracking-wide uppercase">
                    {title}
                </p>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${iconBg}`}>
                    {icon}
                </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
                {value}
            </h3>
            {subtitle && (
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                    {subtitle}
                </p>
            )}
        </div>
    );
}

function ProgressCard({ title, value, total, color, icon, iconBg }) {
    const porcentaje = total > 0 ? (value / total) * 100 : 0;

    const colors = {
        blue: "bg-blue-500",
        green: "bg-green-500",
    };

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow p-6">
            <div className="flex items-center gap-3 mb-2">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${iconBg}`}>
                    {icon}
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-xs font-semibold tracking-wide uppercase">
                    {title}
                </p>
            </div>

            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                {value} facturas
            </h3>

            <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded mt-3">
                <div
                    className={`h-2 rounded ${colors[color]}`}
                    style={{ width: `${porcentaje}%` }}
                ></div>
            </div>
        </div>
    );
}