<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Item;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    /**
     * @return JsonResponse
     */
    final public function index(): JsonResponse
    {
        return $this->jsonSuccess(Item::orderBy('name')->get());
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    final public function store(Request $request): JsonResponse
    {
        if (Item::where('name', '=', trim($request->name))->exists()) {
            return $this->jsonError('já existe um item com esse nome', []);
        }
        return $this->jsonSuccess(Item::create([
            'name' => trim($request->name),
            'created_by' => $request->user()->id,
        ]));
    }
}
