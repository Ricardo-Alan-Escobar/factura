import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import ModalFactura from '@/components/modalFactura';
import { 
    FileText, 
    Pencil, 
    Trash2, 
    Building2, 
    CalendarDays, 
    Paperclip,
    Search,
    SlidersHorizontal,
    Plus,
    Eye,
    ArrowUpRight ,
    ArrowDownLeft
} from 'lucide-react';
import Swal from 'sweetalert2';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import DetalleFactura from '@/components/DetalleFactura';


export default function Dashboard({ facturas = [] }) {

    const [openModal, setOpenModal] = useState(false);
    const [facturaEditar, setFacturaEditar] = useState(null);
    const [search, setSearch] = useState('');
        const [filtroTipo, setFiltroTipo] = useState('Todas');
        const [filtroEstado, setFiltroEstado] = useState('Todos');
        const [openDetalle, setOpenDetalle] = useState(false);
        const [facturaDetalle, setFacturaDetalle] = useState(null);

        const abrirDetalle = (factura) => {
            setFacturaDetalle(factura);
            setOpenDetalle(true);
        };

            const breadcrumbs = [
                {
                    title: 'Todas las facturas',
                    href: '/dashboard',
                },
            ];
        
            const abrirModalNueva = () => {
                setFacturaEditar(null);
                setOpenModal(true);
            };
        
            const abrirModalEditar = (factura) => {
                setFacturaEditar(factura);
                setOpenModal(true);
            };
        
            const eliminarFactura = (id, nombre) => {
            const isDark = document.documentElement.classList.contains('dark');
            
            Swal.fire({
                title: '¿Estás seguro?',
                text: `Se eliminará la factura "${nombre}"`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar',
                background: isDark ? '#18181b' : '#ffffff',
                color: isDark ? '#ffffff' : '#000000',
                confirmButtonColor: '#dc2626',
                cancelButtonColor: '#6b7280',
            }).then((result) => {
                if (result.isConfirmed) {
                    router.delete(`/facturas/${id}`, {
                        preserveScroll: true,
                        onSuccess: () => {
                            Swal.fire({
                                title: '¡Eliminada!',
                                text: 'La factura ha sido eliminada',
                                icon: 'success',
                                background: isDark ? '#18181b' : '#ffffff',
                                color: isDark ? '#ffffff' : '#000000',
                                confirmButtonColor: '#3b82f6',
                            });
                        },
                        onError: (errors) => {
                            Swal.fire({
                                title: 'Error',
                                text: 'No se pudo eliminar la factura',
                                icon: 'error',
                                background: isDark ? '#18181b' : '#ffffff',
                                color: isDark ? '#ffffff' : '#000000',
                                confirmButtonColor: '#3b82f6',
                            });
                            console.error('Error al eliminar:', errors);
                        }
                    });
                }
            });
        };

            const cerrarModal = () => {
                setOpenModal(false);
                setFacturaEditar(null);
            };
        
            const getBadgeColor = (estado) => {
                const colors = {
                    'Pendiente': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
                    'Pagada': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
                    'Vencida': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
                };
                return colors[estado] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
            };
        
            const getTipoColor = (tipo) => {
                return tipo === 'Emitida'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                    : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400';
            };
            const facturasFiltradas = facturas.filter((factura) => {
            const coincideBusqueda =
                factura.nombre_factura.toLowerCase().includes(search.toLowerCase()) ||
                factura.empresa.toLowerCase().includes(search.toLowerCase()) ||
                factura.id.toString().includes(search);
            
            const coincideTipo =
                filtroTipo === 'Todas' || factura.tipo_factura === filtroTipo;
            
            const coincideEstado =
                filtroEstado === 'Todos' || factura.estado === filtroEstado;
            
            return coincideBusqueda && coincideTipo && coincideEstado;
        });


            return (
               <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Facturas" />
            
        <div className="p-8 bg-gray-100 dark:bg-zinc-950 min-h-screen">
            
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                        Facturas
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
                        {facturasFiltradas.length} de {facturas.length} facturas
                    </p>
                </div>
            
                <Button 
                    onClick={abrirModalNueva}
                    className="bg-blue-600 hover:bg-green-700 text-white shadow-sm cursor-pointer"
                >
                    <Plus className="w-4 h-4" /> Nueva Factura
                </Button>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-4 items-center mb-8 w-full">
            
                <div className="relative w-full lg:flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre, empresa o ID..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-lg 
                                   bg-white dark:bg-zinc-900
                                   border border-gray-200 dark:border-zinc-800
                                   text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>
            
                <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                    <SelectTrigger className="w-[180px] bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800">
                        <SelectValue placeholder="Tipo de factura" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800">
                        <SelectItem value="Todas">
                            <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                Todas
                            </div>
                        </SelectItem>
                        <SelectItem value="Emitida">
                            <div className="flex items-center gap-2">
                                <ArrowUpRight className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                Emitidas
                            </div>
                        </SelectItem>
                        <SelectItem value="Recibida">
                            <div className="flex items-center gap-2">
                                <ArrowDownLeft className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                Recibidas
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>

            <Select value={filtroEstado} onValueChange={setFiltroEstado}>
                <SelectTrigger className="w-[180px] bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800">
                    <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800">
                    <SelectItem value="Todos">
                        <div className="flex items-center gap-2">
                            <SlidersHorizontal className="w-4 h-4" />
                            Todos
                        </div>
                    </SelectItem>
                    <SelectItem value="Pagada">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            Pagada
                        </div>
                    </SelectItem>
                    <SelectItem value="Pendiente">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                            Pendiente
                        </div>
                    </SelectItem>
                    <SelectItem value="Vencida">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                            Vencida
                        </div>
                    </SelectItem>
                </SelectContent>
            </Select>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            
                {facturasFiltradas.map((factura) => (
                   <div
            key={factura.id}
            className="group relative rounded-2xl p-6
                       bg-white dark:bg-zinc-900
                       border border-gray-200 dark:border-zinc-800
                       shadow-sm hover:shadow-lg
                       transition-all duration-300 dark:hover:bg-zinc-900/50"
        >

            <div className="absolute top-4 right-4 flex gap-2 
                            opacity-0 group-hover:opacity-100 
                            transition">
                            
                <button
                    onClick={() => abrirDetalle(factura)}
                    className="p-2 rounded-lg
                               bg-gray-100 dark:bg-zinc-800
                               hover:bg-green-100 dark:hover:bg-green-900/30
                               transition cursor-pointer"
                >
                    <Eye className="w-4 h-4 text-gray-600 dark:text-zinc-300" />
                </button>
                <button
                    onClick={() => abrirModalEditar(factura)}
                    className="p-2 rounded-lg
                               bg-gray-100 dark:bg-zinc-800
                               hover:bg-blue-100 dark:hover:bg-blue-900/30
                               transition cursor-pointer"
                >
                    <Pencil className="w-4 h-4 text-gray-600 dark:text-zinc-300" />
                </button>
                
                <button
                    onClick={() => eliminarFactura(factura.id, factura.nombre_factura)}
                    className="p-2 rounded-lg
                               bg-gray-100 dark:bg-zinc-800
                               hover:bg-red-100 dark:hover:bg-red-900/30
                               transition cursor-pointer"
                >
                    <Trash2 className="w-4 h-4 text-gray-600 dark:text-zinc-300
                                       hover:text-red-600 dark:hover:text-red-400" />
                </button>
            </div>
                
            <div className='flex gap-3 items-center mb-4'>
            <div className="w-12 h-12 flex items-center justify-center
                            bg-blue-100 dark:bg-blue-900/30
                            rounded-xl mb-4">
                <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                
                
            </div>
                
            <div>
            <h2 className="font-semibold text-lg text-gray-800 dark:text-white">
                {factura.nombre_factura}
            </h2>
                
            <p className="text-xs text-gray-400 mb-3">
                INV-{factura.id}
            </p>
            </div>
            </div>
                
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-zinc-400 mb-1">
                <Building2 className="w-4 h-4" />
                {factura.empresa}
            </div>
                
                
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-zinc-400 mb-1">
                <CalendarDays className="w-4 h-4" />
                {new Date(factura.fecha).toLocaleDateString('es-ES')}
            </div>
                
            {/* ARCHIVOS */}
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-zinc-400 mb-4">
                <Paperclip className="w-4 h-4" />
                {factura.archivos?.length || 0} archivo(s)
            </div>
                
            {/* DIVISIÓN */}
            <div className="border-t border-gray-200 dark:border-zinc-800 my-4" />
                
            {/* BADGES INFERIORES */}
            <div className="flex justify-between items-center">
                
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${getBadgeColor(factura.estado)}`}>
                    {factura.estado}
                </span>
                
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${getTipoColor(factura.tipo_factura)}`}>
                    {factura.tipo_factura}
                </span>
            </div>
                
        </div>

                ))}

            </div>
            
            <ModalFactura
                open={openModal}
                onClose={cerrarModal}
                factura={facturaEditar}
            />
        </div>
        <DetalleFactura
    open={openDetalle}
    onClose={() => setOpenDetalle(false)}
    factura={facturaDetalle}
/>
        </AppLayout>

            
            );
        }