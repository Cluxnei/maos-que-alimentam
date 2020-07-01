<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Item extends Model
{
    /**
     * @return HasMany
     */
    final public function interests(): HasMany
    {
        return $this->hasMany(Interest::class, 'item_id', 'id');
    }
}
