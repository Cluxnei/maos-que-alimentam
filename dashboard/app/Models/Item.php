<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Item extends Model
{
    protected $guarded = [];
    /**
     * @return HasMany
     */
    final public function interests(): HasMany
    {
        return $this->hasMany(Interest::class, 'item_id', 'id');
    }

    /**
     * @param Builder $builder
     * @return Builder
     */
    final public function scopeApproved(Builder $builder): Builder
    {
        return $builder->where('approved', '=', 1);
    }
}
