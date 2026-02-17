<?php

namespace App\Http\Controllers;

use App\Models\Factura;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
 
class FacturaController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'tipo_factura' => 'required|string|max:255',
            'nombre_factura' => 'required|string|max:255',
            'fecha' => 'required|date',
            'estado' => 'required|string|max:100',
            'empresa' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'archivos.*' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
        ]);

        DB::transaction(function () use ($request) {
            $factura = Factura::create($request->only([
                'tipo_factura',
                'nombre_factura',
                'fecha',
                'estado',
                'empresa',
                'descripcion',
            ]));

            if ($request->hasFile('archivos')) {
                foreach ($request->file('archivos') as $file) {
                    $nombreUnico = uniqid() . '_' . time() . '.' . $file->getClientOriginalExtension();

                    $path = $file->storeAs('facturas', $nombreUnico, 'public');
                    $factura->archivos()->create([
                        'archivo' => $path
                    ]);
                }
            }
        });

        return back()->with('success', 'Factura creada exitosamente');
    }

    public function update(Request $request, Factura $factura)
{
    $request->validate([
        'tipo_factura' => 'required|string|max:255',
        'nombre_factura' => 'required|string|max:255',
        'fecha' => 'required|date',
        'estado' => 'required|string|max:100',
        'empresa' => 'required|string|max:255',
        'descripcion' => 'nullable|string',
        'archivos.*' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
    ]);

    DB::transaction(function () use ($request, $factura) {

        // Actualizar datos principales
        $factura->update($request->only([
            'tipo_factura',
            'nombre_factura',
            'fecha',
            'estado',
            'empresa',
            'descripcion',
        ]));
        if ($request->hasFile('archivos')) {
            foreach ($request->file('archivos') as $file) {
                $nombreUnico = uniqid() . '_' . time() . '.' . $file->getClientOriginalExtension();
                $path = $file->storeAs('facturas', $nombreUnico, 'public');
                $factura->archivos()->create([
                    'archivo' => $path
                ]);
            }
        }
    });

   return redirect()->route('dashboard')
    ->with('success', 'Factura actualizada exitosamente');

}


    public function destroy(Factura $factura)
    {
        DB::transaction(function () use ($factura) {
            foreach ($factura->archivos as $archivo) {
                Storage::disk('public')->delete($archivo->archivo);
            }

            $factura->archivos()->delete();

            $factura->delete();
        });

        return back()->with('success', 'Factura eliminada exitosamente');
    }

    public function index()
    {
        $facturas = Factura::with('archivos')
            ->latest()
            ->get();

        return inertia('dashboard', [
            'facturas' => $facturas
        ]);
    }
    public function panel()
{
    $facturas = Factura::with('archivos')
        ->latest()
        ->get();

    return inertia('panel', [
        'facturas' => $facturas
    ]);
}
}