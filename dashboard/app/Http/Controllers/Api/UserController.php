<?php

namespace App\Http\Controllers\Api;

use App\Events\ForgotPassword;
use App\Events\UserRegistered;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\User\Register;
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
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    final public function forgotPassword(Request $request): JsonResponse
    {
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
    }

    /**
     * @param Register $request
     * @return JsonResponse
     */
    final public function register(Register $request): JsonResponse
    {
        $password = Hash::make($request->password);
        $data = $request->merge(compact('password'))
            ->only(['name', 'email', 'cnpj', 'phone', 'zipcode', 'street', 'city', 'password']);
        $user = User::create($data);
        $user->setAttribute('token', $user->createToken('AuthToken'));
        event(new UserRegistered($user));
        return $this->jsonSuccess(compact('user'), Response::HTTP_CREATED);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    final public function checkEmail(Request $request): JsonResponse
    {
        return !User::whereEmail($request->email)->exists() ? $this->jsonSuccess(null) :
            $this->jsonError('Esse e-mail já está em uso.', null, Response::HTTP_OK);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    final public function checkCNPJ(Request $request): JsonResponse
    {
        return !User::whereCnpj($request->cnpj)->exists() ? $this->jsonSuccess(null) :
            $this->jsonError('Esse CNPJ já está em uso.', null, Response::HTTP_OK);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    final public function checkPhone(Request $request): JsonResponse
    {
        return !User::wherePhone($request->phone)->exists() ? $this->jsonSuccess(null) :
            $this->jsonError('Esse celular já está em uso.', null, Response::HTTP_OK);
    }
}
