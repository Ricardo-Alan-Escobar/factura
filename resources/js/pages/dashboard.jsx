import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Dashboard({ facturas = [] }) {

    const breadcrumbs = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
    ];

    const { data, setData, post, processing, errors, reset } = useForm({
        tipo_factura: '',
        nombre_factura: '',
        fecha: '',
        estado: 'pendiente',
        empresa: '',
        descripcion: '',
        archivos: [],
    });

    const submit = (e) => {
        e.preventDefault();
        
       post('/facturas', {
    forceFormData: true,
    preserveScroll: true,
    onSuccess: () => {
        reset();
    },
});
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="max-w-4xl mx-auto space-y-10 p-6">

                <div className="bg-card p-6 rounded-xl shadow">
                    <h2 className="text-xl font-semibold mb-6">
                        Crear Factura
                    </h2>

                    <form onSubmit={submit} className="space-y-4">

                        <div>
                            <Label>Tipo de factura</Label>
                            <Input
                                value={data.tipo_factura}
                                onChange={(e) =>
                                    setData('tipo_factura', e.target.value)
                                }
                            />
                            {errors.tipo_factura && (
                                <p className="text-red-500 text-sm">
                                    {errors.tipo_factura}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label>Nombre de factura</Label>
                            <Input
                                value={data.nombre_factura}
                                onChange={(e) =>
                                    setData('nombre_factura', e.target.value)
                                }
                            />
                        </div>

                        <div>
                            <Label>Fecha</Label>
                            <Input
                                type="date"
                                value={data.fecha}
                                onChange={(e) =>
                                    setData('fecha', e.target.value)
                                }
                            />
                        </div>

                        <div>
                            <Label>Estado</Label>
                            <Input
                                value={data.estado}
                                onChange={(e) =>
                                    setData('estado', e.target.value)
                                }
                            />
                        </div>

                        <div>
                            <Label>Empresa</Label>
                            <Input
                                value={data.empresa}
                                onChange={(e) =>
                                    setData('empresa', e.target.value)
                                }
                            />
                        </div>

                        <div>
                            <Label>Descripción</Label>
                            <Input
                                value={data.descripcion}
                                onChange={(e) =>
                                    setData('descripcion', e.target.value)
                                }
                            />
                        </div>

                        <div>
                            <Label>Archivos (puedes subir varios)</Label>
                            <Input
                                type="file"
                                multiple
                                onChange={(e) =>
                                    setData('archivos', e.target.files)
                                }
                            />
                            {errors['archivos.*'] && (
                                <p className="text-red-500 text-sm">
                                    {errors['archivos.*']}
                                </p>
                            )}
                        </div>

                        <Button type="submit" disabled={processing}>
                            {processing ? 'Guardando...' : 'Guardar Factura'}
                        </Button>
                    </form>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-4">
                        Listado de Facturas
                    </h2>

                    {facturas.length === 0 && (
                        <p className="text-muted-foreground">
                            No hay facturas registradas.
                        </p>
                    )}

                    <div className="space-y-4">
                        {facturas.map((factura) => (
                            <div
                                key={factura.id}
                                className="p-4 rounded-lg border bg-muted/40"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold">
                                            {factura.nombre_factura}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {factura.empresa} — {factura.estado}
                                        </p>
                                        <p className="text-sm">
                                            {factura.fecha}
                                        </p>
                                    </div>

                                    <div className="text-sm text-muted-foreground">
                                        {factura.archivos?.length || 0} archivo(s)
                                    </div>
                                </div>

                                {factura.archivos?.length > 0 && (
                                    <div className="mt-3 space-y-1">
                                        {factura.archivos.map((archivo) => (
                                            <a
                                                key={archivo.id}
                                                href={`/storage/${archivo.archivo}`}
                                                target="_blank"
                                                className="text-sm text-blue-600 underline block"
                                            >
                                                Ver archivo
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </AppLayout>
    );
}
