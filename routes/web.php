<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{ HomeController, UserSubmissionController ,FeedBackController};
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/feedback', [FeedBackController::class, 'feedback'])->name('feedback');
Route::post('feedbackform', [FeedBackController::class, 'feedbackSubmit'])->name('feedbacksubmit');

Route::get('/blocked-countries', [HomeController::class, 'blockedCountries'])->name('blockedCountries');
Route::get('/invoice/{id}', [HomeController::class, 'invoice'])->name('invoice')->middleware(['blockcountries']);
Route::get('/payment/{id}', [HomeController::class, 'payment'])->name('payment')->middleware(['blockcountries']);
Route::get('/payment/authorize/{payment}/{cppid}/{cpid}', [HomeController::class, 'payusingOld'])->name('payment.oldcards')->middleware(['blockcountries']);
Route::get('/payment/thankyou/{id}', [HomeController::class, 'paymentThankyou'])->name('payment.thankyou')->middleware(['blockcountries']);
Route::get('/brief-view/{userSubmission}', [UserSubmissionController::class, 'viewBrief'])->name('brief.view');
Route::get('/query-view/{brandFormSubmission}', [UserSubmissionController::class, 'viewQuery'])->name('query.view');
Route::post('/payment/authorize/charge/{payment}', [HomeController::class, 'authorizeCharge'])->name('payment.charge');
Route::post('/payment/stripe/{payment}', [HomeController::class, 'paymentStripe'])->name('paymentStripe');//->middleware(['blockcountries']);
Route::post('/payment/paypal/{payment}', [HomeController::class, 'paymentPaypal'])->name('paymentPaypal');//->middleware(['blockcountries']);
Route::get('/{any?}', function () {
    return view('welcome');
})->where('any', '.*');


