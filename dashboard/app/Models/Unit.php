<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Unit extends Model
{
    /**
     * @return HasMany
     */
    final public function interests(): HasMany
    {
        return $this->hasMany(Interest::class, 'unit_id', 'id');
    }
}
