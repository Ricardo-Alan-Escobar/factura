<?php

namespace App\Http\Controllers;

use App\Models\Factura;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
            'archivos.*' => 'required|file|mimes:pdf,jpg,jpeg,png|max:2048',
        ]);

        DB::transaction(function () use ($request) {

            $factura = Factura::create([
                'tipo_factura' => $request->tipo_factura,
                'nombre_factura' => $request->nombre_factura,
                'fecha' => $request->fecha,
                'estado' => $request->estado,
                'empresa' => $request->empresa,
                'descripcion' => $request->descripcion,
            ]);

            if ($request->hasFile('archivos')) {
                foreach ($request->file('archivos') as $file) {
                    $path = $file->store('facturas', 'public');

                    $factura->archivos()->create([
                        'archivo' => $path
                    ]);
                }
            }
        });

        return redirect()->route('dashboard');

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
}
