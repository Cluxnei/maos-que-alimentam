<?php

namespace App\Http\Controllers\Api;

use App\Events\ForgotPassword;
use App\Events\UserRegistered;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\User\Register;
use App\User;
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
            return $this->jsonError([], Response::HTTP_UNAUTHORIZED);
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
        $user = User::query()->where('email', '=', $request->email);
        if (!(clone $user)->exists()) {
            return $this->jsonError([], Response::HTTP_EXPECTATION_FAILED);
        }
        $newPassword = Str::random(10);
        $user = $user->first();
        $updated = $user->update([
            'password' => Hash::make($newPassword)
        ]);
        if (!$updated) {
            return $this->jsonError([], Response::HTTP_EXPECTATION_FAILED);
        }
        event(new ForgotPassword($user, $newPassword));
        return $this->jsonSuccess([]);
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
        $token = $user->createToken('AuthToken');
        event(new UserRegistered($user));
        return $this->jsonSuccess(compact('user', 'token'), Response::HTTP_CREATED);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    final public function checkExists(Request $request): JsonResponse
    {
        $exists = User::query()->where($request->attribute, '=', $request->value)->exists();
        return $this->jsonSuccess(compact('exists'), Response::HTTP_OK);
    }
}
