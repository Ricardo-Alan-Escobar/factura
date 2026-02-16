import { X, FileText, Building2, Calendar, Paperclip, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DetalleFactura({ open, onClose, factura }) {
    if (!factura || !open) return null;

    const getBadgeColor = (estado) => {
        const colors = {
            'Pendiente': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
            'Pagada': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
            'Vencida': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
        };
        return colors[estado] || 'bg-gray-100 text-gray-800';
    };

    const getTipoColor = (tipo) => {
        return tipo === 'Emitida'
            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
            : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400';
    };

    // Función para obtener la URL del archivo - CORREGIDA
    const getFileUrl = (archivo) => {
        // El campo 'archivo' contiene: "facturas/archivo.pdf"
        return `/storage/${archivo.archivo}`;
    };

    // Función para abrir el archivo en nueva pestaña
    const abrirArchivo = (archivo) => {
        const url = getFileUrl(archivo);
        window.open(url, '_blank');
    };

    // Función para descargar el archivo
    const descargarArchivo = (archivo) => {
        const url = getFileUrl(archivo);
        const nombreArchivo = archivo.archivo.split('/').pop(); // Obtiene solo el nombre del archivo
        
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = nombreArchivo;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(link.href);
            })
            .catch(error => {
                console.error('Error al descargar:', error);
                alert('No se pudo descargar el archivo');
            });
    };

    // Función para obtener el nombre limpio del archivo
    const getNombreArchivo = (archivo) => {
        const nombreCompleto = archivo.archivo.split('/').pop();
        // Remueve el uniqid y timestamp, dejando solo la extensión
        return nombreCompleto.replace(/^\w+_\d+_/, '');
    };

    return (
        <>
            {/* Overlay */}
            <div 
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
                onClick={onClose}
            />

            {/* Sidebar deslizante */}
            <div className="fixed top-0 right-0 h-full w-full sm:w-[500px] bg-white dark:bg-zinc-900 shadow-2xl z-50 overflow-y-auto transform transition-transform duration-300 ease-in-out">
                
                {/* Header */}
                <div className="sticky top-0 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 p-6 flex items-center justify-between z-10">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Detalles de Factura
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
                    >
                        <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                </div>

                {/* Contenido */}
                <div className="p-6 space-y-6">

                    {/* Icono y título */}
                    <div className="flex items-center gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                        <div className="w-14 h-14 flex items-center justify-center bg-blue-100 dark:bg-blue-900/40 rounded-xl">
                            <FileText className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-xl text-gray-800 dark:text-white">
                                {factura.nombre_factura}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                INV-{factura.id}
                            </p>
                        </div>
                    </div>

                    {/* Badges */}
                    <div className="flex gap-2">
                        <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${getBadgeColor(factura.estado)}`}>
                            {factura.estado}
                        </span>
                        <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${getTipoColor(factura.tipo_factura)}`}>
                            {factura.tipo_factura}
                        </span>
                    </div>

                    {/* Información */}
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase block mb-2">
                                Empresa
                            </label>
                            <div className="flex items-center gap-2 text-gray-800 dark:text-white">
                                <Building2 className="w-4 h-4 text-gray-400" />
                                <span>{factura.empresa}</span>
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase block mb-2">
                                Fecha
                            </label>
                            <div className="flex items-center gap-2 text-gray-800 dark:text-white">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <span>
                                    {new Date(factura.fecha).toLocaleDateString('es-ES', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </span>
                            </div>
                        </div>

                        {factura.created_at && (
                            <div>
                                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase block mb-2">
                                    Creado
                                </label>
                                <p className="text-gray-800 dark:text-white">
                                    {new Date(factura.created_at).toLocaleDateString('es-ES', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Descripción */}
                    {factura.descripcion && (
                        <div>
                            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase block mb-2">
                                Descripción
                            </label>
                            <p className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-zinc-800 p-4 rounded-lg">
                                {factura.descripcion}
                            </p>
                        </div>
                    )}

                    {/* Archivos */}
                    <div>
                        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase flex items-center gap-2 mb-3">
                            <Paperclip className="w-4 h-4" />
                            Archivos Adjuntos ({factura.archivos?.length || 0})
                        </label>
                        
                        {factura.archivos && factura.archivos.length > 0 ? (
                            <div className="space-y-2">
                                {factura.archivos.map((archivo, index) => (
                                    <div 
                                        key={archivo.id || index} 
                                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700 transition group"
                                    >
                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
                                                    {getNombreArchivo(archivo)}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Archivo #{index + 1}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        {/* Botones de acción */}
                                        <div className="flex gap-1 flex-shrink-0">
                                            <Button 
                                                variant="ghost" 
                                                size="sm" 
                                                className="cursor-pointer h-8 w-8 p-0 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                                                onClick={() => abrirArchivo(archivo)}
                                                title="Abrir en nueva pestaña"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </Button>
                                            
                                            <Button 
                                                variant="ghost" 
                                                size="sm" 
                                                className="cursor-pointer h-8 w-8 p-0 hover:bg-green-100 dark:hover:bg-green-900/30"
                                                onClick={() => descargarArchivo(archivo)}
                                                title="Descargar archivo"
                                            >
                                                <Download className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500 dark:text-gray-400 italic p-4 bg-gray-50 dark:bg-zinc-800 rounded-lg text-center">
                                Sin archivos adjuntos
                            </p>
                        )}
                    </div>

                </div>
            </div>
        </>
    );
}