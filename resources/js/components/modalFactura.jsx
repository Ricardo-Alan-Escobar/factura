import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect } from 'react';
import { X, Plus, ArrowUpRight, ArrowDownLeft, Save } from 'lucide-react';
import Swal from 'sweetalert2';

export default function ModalFactura({ open, onClose, factura = null }) {

    const isEditing = !!factura;

    const { data, setData, post, put, processing, errors, reset } = useForm({
        tipo_factura: 'Emitida',
        nombre_factura: '',
        fecha: '',
        estado: 'Pendiente',
        empresa: '',
        descripcion: '',
        archivos: [],
    });
    const isDarkMode = document.documentElement.classList.contains('dark');

const showToast = (icon, title) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: isDarkMode ? '#18181b' : '#ffffff',
        color: isDarkMode ? '#ffffff' : '#000000',
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });

    Toast.fire({ icon, title });
};

    useEffect(() => {
        if (factura && open) {
            setData({
                tipo_factura: factura.tipo_factura,
                nombre_factura: factura.nombre_factura,
                fecha: factura.fecha,
                estado: factura.estado,
                empresa: factura.empresa,
                descripcion: factura.descripcion || '',
                archivos: [],
            });
        }

        if (!open) {
            reset();
        }
    }, [factura, open]);

    const submit = (e) => {
    e.preventDefault();

    const options = {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: () => {
    reset();
    onClose();
    if (!isEditing) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true,
            background: isDarkMode ? '#18181b' : '#ffffff',
            color: isDarkMode ? '#ffffff' : '#000000',
            iconColor: '#10b981',
            customClass: {
                popup: 'colored-toast'
            },
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
        });

        Toast.fire({
            icon: 'success',
            title: '¡Éxito!',
            html: '<b>Factura creada correctamente</b><br><small>Los cambios se han guardado</small>',
        });
    }
},
    };

    if (isEditing) {
        put(`/facturas/${factura.id}`, data, options);
    } else {
        post('/facturas', options);
    }
};

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

            <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-6 overflow-y-auto max-h-[90vh]">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
                        {isEditing ? 'Editar Factura' : 'Nueva Factura'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
                    >
                        <X className="size-8 hover:bg-gray-200 rounded p-1 dark:hover:bg-gray-700" />
                    </button>
                </div>

                <form onSubmit={submit} className="space-y-5">

                    {/* Tipo */}
                    <div>
                        <Label>Tipo de factura</Label>
                        <div className="flex gap-3 mt-2">
                            <button
                                type="button"
                                onClick={() => setData('tipo_factura', 'Emitida')}
                                className={`flex-1 rounded-lg border px-4 py-3 text-sm transition cursor-pointer
                                ${data.tipo_factura === 'Emitida'
                                        ? 'bg-blue-600 text-white border-blue-600'
                                        : 'bg-transparent border-zinc-300 dark:border-zinc-700'}`}
                            >
                                <ArrowUpRight className="w-4 h-4 mr-1 inline" /> Emitida
                            </button>

                            <button
                                type="button"
                                onClick={() => setData('tipo_factura', 'Recibida')}
                                className={`flex-1 rounded-lg border px-4 py-3 text-sm transition cursor-pointer
                                ${data.tipo_factura === 'Recibida'
                                        ? 'bg-emerald-600 text-white border-emerald-600'
                                        : 'bg-transparent border-zinc-300 dark:border-zinc-700'}`}
                            >
                                <ArrowDownLeft className="w-4 h-4 mr-1 inline" /> Recibida
                            </button>
                        </div>
                    </div>

                    {/* Nombre */}
                    <div>
                        <Label>Nombre de la factura</Label>
                        <Input
                            placeholder="Ej: Factura servicios web"
                            className="mt-2"
                            value={data.nombre_factura}
                            onChange={(e) =>
                                setData('nombre_factura', e.target.value)
                            }
                        />
                        {errors.nombre_factura && (
                            <p className="text-red-500 text-sm">
                                {errors.nombre_factura}
                            </p>
                        )}
                    </div>

                    {/* Fecha + Estado */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Fecha</Label>
                            <Input
                                type="date"
                                className="mt-2"
                                value={data.fecha}
                                onChange={(e) =>
                                    setData('fecha', e.target.value)
                                }
                            />
                        </div>

                        <div>
                            <Label>Estado</Label>
                            <select
                                className="w-full rounded-md border bg-transparent px-3 py-2 text-sm mt-2 border-zinc-300 dark:border-zinc-700"
                                value={data.estado}
                                onChange={(e) =>
                                    setData('estado', e.target.value)
                                }
                            >
                                <option className='text-zinc-900'>Pendiente</option>
                                <option className='text-zinc-900'>Pagada</option>
                                <option className='text-zinc-900'>Vencida</option>
                            </select>
                        </div>
                    </div>

                    {/* Empresa */}
                    <div>
                        <Label>Empresa</Label>
                        <Input
                            placeholder="Ej: Mevepol S.A."
                            className="mt-2"
                            value={data.empresa}
                            onChange={(e) =>
                                setData('empresa', e.target.value)
                            }
                        />
                    </div>

                    {/* Descripción */}
                    <div>
                        <Label>Descripción</Label>
                        <textarea
                            placeholder='Descripcion de la factura'
                            className="w-full rounded-md border px-3 py-2 text-sm mt-2 border-zinc-300 dark:border-zinc-700"
                            rows="3"
                            value={data.descripcion}
                            onChange={(e) =>
                                setData('descripcion', e.target.value)
                            }
                        />
                    </div>

                    {/* Archivos */}
                    <div>
                        <Label>
                            {isEditing ? 'Agregar nuevos archivos' : 'Archivos adjuntos'}
                        </Label>
                        <Input
                            className="mt-2"
                            type="file"
                            multiple
                            onChange={(e) =>
                                setData('archivos', e.target.files)
                            }
                        />
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                        className="cursor-pointer "
                            type="button"
                            variant="secondary"
                            onClick={onClose}
                        >
                            Cancelar
                        </Button>

                        <Button
                            type="submit"
                            className="bg-blue-600 text-white cursor-pointer hover:bg-green-600"
                            disabled={processing}
                        >
                            {isEditing ? (
                                <>
                                    <Save className="w-4 h-4 mr-1" />
                                    {processing ? 'Actualizando...' : 'Actualizar'}
                                </>
                            ) : (
                                <>
                                    <Plus className="w-4 h-4 mr-1" />
                                    {processing ? 'Guardando...' : 'Guardar'}
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
