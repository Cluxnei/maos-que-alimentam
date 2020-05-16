<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    final public function login(Request $request): JsonResponse
    {
        try {
            $credentials = $request->only(['email', 'password']);
            if (!Auth::attempt($credentials)) {
                return response()->json([
                    'success' => false,
                    'result' => 'Login inválido',
                ], Response::HTTP_OK);
            }
            $user = Auth::user();
            $token = $user->createToken('AuthToken');
            return $this->jsonSuccess(compact('user', 'token'));
        } catch (Exception $exception) {
            return $this->jsonError(null, [$exception->getMessage()]);
        }
    }
}
