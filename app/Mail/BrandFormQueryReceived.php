<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\BrandFormSubmission;

class BrandFormQueryReceived extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public $brandFormSubmission;
    public function __construct(BrandFormSubmission $brandFormSubmission)
    {
        $this->brandFormSubmission = $brandFormSubmission;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('emails.brandformqueryreceived');
    }
}
