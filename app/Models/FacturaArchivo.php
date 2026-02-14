<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class FacturaArchivo extends Model
{
    use HasFactory;

    protected $fillable = [
        'factura_id',
        'archivo',
    ];

    public function factura()
    {
        return $this->belongsTo(Factura::class);
    }
}
