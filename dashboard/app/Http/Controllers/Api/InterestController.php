<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Interest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class InterestController extends Controller
{
    /**
     * @param Request $request
     * @return JsonResponse
     */
    final public function index(Request $request): JsonResponse
    {
        $interests = $request->user()->interests()->with('item', 'unit')->latest()->get();
        return $this->jsonSuccess($interests);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    final public function store(Request $request): JsonResponse
    {
        $fields = ['user_id', 'item_id', 'unit_id', 'quantity'];
        $user_id = $request->user()->id;
        $interest = Interest::create($request->merge(compact('user_id'))->only($fields));
        if (!$interest) {
            return $this->jsonError(null, null, Response::HTTP_BAD_REQUEST);
        }
        return $this->jsonSuccess(compact('interest'), Response::HTTP_CREATED);
    }

    /**
     * @param Interest $interest
     * @param Request $request
     * @return JsonResponse
     */
    final public function update(Interest $interest, Request $request): JsonResponse
    {
        $fields = ['unit_id', 'quantity'];
        $updated = $interest->update($request->only($fields));
        if (!$updated) {
            return $this->jsonError(null, null, Response::HTTP_BAD_REQUEST);
        }
        return $this->jsonSuccess(null);
    }
}
