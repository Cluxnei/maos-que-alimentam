<?php

namespace App\Http\Controllers\Api;

use App\Events\ForgotPassword;
use App\Http\Controllers\Controller;
use App\User;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserController extends Controller
{
    /**
     * @param Request $request
     * @return JsonResponse
     */
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

    /**
     * @param Request $request
     * @return JsonResponse
     */
    final public function forgotPassword(Request $request): JsonResponse
    {
        try {
            $user = User::query()->where('email', '=', $request->email)->get();
            if ($user->count() === 0) {
                return response()->json([
                    'success' => false,
                    'result' => 'Email inválido',
                ], Response::HTTP_OK);
            }
            $newPassword = Str::random(10);
            $updated = $user->first()->update([
                'password' => Hash::make($newPassword)
            ]);
            if (!$updated) {
                return $this->jsonError(null, ['Erro ao atualizar senha']);
            }
            event(new ForgotPassword($user->first(), $newPassword));
            return $this->jsonSuccess(null);
        } catch (Exception $exception) {
            return $this->jsonError(null, [$exception->getMessage()]);
        }
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    final public function checkEmail(Request $request): JsonResponse
    {
        try {
            return !User::whereEmail($request->email)->exists() ? $this->jsonSuccess(null) :
                $this->jsonError('Esse e-mail já está em uso.', null, Response::HTTP_OK);
        } catch (Exception $exception) {
            return $this->jsonError(null, [$exception->getMessage()]);
        }
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    final public function checkCNPJ(Request $request): JsonResponse
    {
        try {
            return !User::whereCnpj($request->cnpj)->exists() ? $this->jsonSuccess(null) :
                $this->jsonError('Esse CNPJ já está em uso.', null, Response::HTTP_OK);
        } catch (Exception $exception) {
            return $this->jsonError(null, [$exception->getMessage()]);
        }
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    final public function checkPhone(Request $request): JsonResponse
    {
        try {
            return !User::wherePhone($request->phone)->exists() ? $this->jsonSuccess(null) :
                $this->jsonError('Esse celular já está em uso.', null, Response::HTTP_OK);
        } catch (Exception $exception) {
            return $this->jsonError(null, [$exception->getMessage()]);
        }
    }
}
