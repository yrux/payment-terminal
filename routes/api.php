<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{ StepsController, RoleController, PermissionController, UserController, BrandController, BriefFormController, MerchantController, MFlagController, PaymentController, UserSubmissionController, BrandFormSubmissionController, DashboardController, MarketingExpenseController, PaymentRefundController, UserTargetControler};
use App\Http\Controllers\Auth\ApiAuthController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group(['middleware' => ['cors', 'json.response']], function () {
    Route::post('/login', [ApiAuthController::class, 'login']);
    Route::post('/register', [ApiAuthController::class, 'register']);
    Route::post('/get-brand-from-domain', [BrandController::class, 'getBrandFromDomain']);
    Route::put('/updateprofile', [ApiAuthController::class, 'updateprofile']);
    Route::resource('brands', BrandController::class)->only([
        'show'
    ]);
    Route::post('steps/step-2', [StepsController::class, 'step2']);
    Route::post('steps/step-3', [StepsController::class, 'step3']);

    Route::resource('brand-form-submissions', BrandFormSubmissionController::class)->only([
        'store'
    ]);
});
Route::group(['middleware' => ['cors', 'json.response', 'auth:api']], function () {
	Route::post('/logout', [ApiAuthController::class, 'logout']);
	Route::put('/updateprofile', [ApiAuthController::class, 'updateprofile']);
	Route::apiResource('roles', RoleController::class);
	Route::apiResource('m-flags', MFlagController::class);
	Route::apiResource('payments', PaymentController::class);
    /*payments other routes*/
    Route::post('/payments/c/{payment}/update-status', [PaymentController::class, 'updatePaymentStatus']);
    Route::post('/payments/c/{payment}/recheck-merchant', [PaymentController::class, 'recheckMerchant']);
    /*payments other routes end*/
	Route::apiResource('permissions', PermissionController::class);
	Route::apiResource('user', UserController::class);
	Route::apiResource('payment-refunds', PaymentRefundController::class);
	Route::apiResource('merchants', MerchantController::class);
	Route::apiResource('brands', BrandController::class)->except([
        'show'
    ]);
    Route::apiResource('user-submissions', UserSubmissionController::class)->except([
        'store','update'
    ]);
    Route::resource('brand-form-submissions', BrandFormSubmissionController::class)->only([
        'index', 'show', 'update', 'destroy'
    ]);
    Route::post('/brand-form-submissions/{brandFormSubmission}/notes', [BrandFormSubmissionController::class, 'addNote']);
	Route::apiResource('brief-forms', BriefFormController::class);
    Route::post('/brief-forms/assign/{briefForm}', [BriefFormController::class, 'assign']);
    
    /*Targets work*/
    Route::post('/user-targets', [UserTargetControler::class, 'index']);
    Route::post('/set-targets', [UserTargetControler::class, 'setTarget']);
    /*Targets work end*/
    /*Dashboard*/
    Route::get('/admin/get-dashboard', [DashboardController::class, 'adminBoard']);
    /*Dashboard end*/
    Route::apiResource('marketing-expenses', MarketingExpenseController::class);
});
Route::group(['middleware' => ['auth:api']], function () {
    Route::get('/me', function (Request $request) {
        $notificationsCount = $request->user()->unreadNotifications()->count();
        $user = $request->user();
        $user->load('brands');
        $user->notification_count = $notificationsCount;
        return $user;
    });
});
Route::middleware('auth:api')->get('/notifications', function (Request $request) {
    $notifications = $request->user()->notifications()->paginate(50);
    // $request->user()->notifications()->paginate(50)->markAsRead();
    return $notifications;
});
