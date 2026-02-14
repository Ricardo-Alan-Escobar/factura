<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Factura extends Model
{
    use HasFactory;

    protected $fillable = [
        'tipo_factura',
        'nombre_factura',
        'fecha',
        'estado',
        'empresa',
        'descripcion',
    ];

    public function archivos()
    {
        return $this->hasMany(FacturaArchivo::class);
    }
}
