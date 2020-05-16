<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /**
     * @param $result
     * @param $errors
     * @return JsonResponse
     */
    protected function jsonError($result, $errors): JsonResponse
    {
        return response()->json([
            'success' => false,
            'result' => $result,
            'errors' => $errors
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    /**
     * @param $result
     * @param int $responseCode
     * @return JsonResponse
     */
    protected function jsonSuccess($result, $responseCode = 200): JsonResponse
    {
        return response()->json([
            'success' => true,
            'result' => $result,
        ], $responseCode);
    }
}
