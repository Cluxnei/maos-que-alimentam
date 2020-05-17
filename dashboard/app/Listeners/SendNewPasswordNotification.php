<?php

namespace App\Listeners;

use App\Events\ForgotPassword;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Mail;

class SendNewPasswordNotification implements ShouldQueue
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param ForgotPassword $event
     * @return void
     */
    public function handle(ForgotPassword $event)
    {
        Mail::to($event->user->email)->send(new \App\Mail\ForgotPassword(
            $event->user,
            $event->password
        ));
    }
}
