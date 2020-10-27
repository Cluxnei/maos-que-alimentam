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
     * @param array $result
     * @param int|null $statusCode
     * @return JsonResponse
     */
    final public function jsonError(array $result, ?int $statusCode = null): JsonResponse
    {
        $code = $statusCode === null ? Response::HTTP_INTERNAL_SERVER_ERROR : $statusCode;
        return response()->json($result, $code);
    }

    /**
     * @param $result
     * @param null|int $responseCode
     * @return JsonResponse
     */
    final public function jsonSuccess(array $result, ?int $responseCode = null): JsonResponse
    {
        $code = $responseCode === null ? Response::HTTP_OK : $responseCode;
        return response()->json($result, $code);
    }
}
