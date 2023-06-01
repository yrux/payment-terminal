<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use App\Models\{Payment, MFlag, Country, Customer};
use net\authorize\api\contract\v1 as AnetAPI;
use net\authorize\api\controller as AnetController;
use Stripe;
use App\Library\Paypal;
use PDF;
use App\Mail\InvoicePaid;
use Illuminate\Support\Facades\Mail;
class HomeController extends Controller
{
    protected $merchantData;
    public function invoice($id){
        // $paymentId = Crypt::decrypt($id);
        $payment = Payment::where('tracking_id',$id)->firstOrfail();
        // dd($payment->status);
        if($payment->status==0){
            $payment->update([
                'status' => 3,
                'failed_reason' => request()->ip()
            ]);
            $payment->history()->create([
                'status' => 3,
                'message' => request()->ip()
            ]);
        }
        $this->merchantData = $payment->merchant;
        $countries = Country::where('is_active',1)->get();
        if(isset($_GET['pdf'])){
            $data['payment'] = $payment;
            $data['countries'] = $countries;
            $data['id'] = $id;
            $pdf = PDF::loadView('invoice-pdf', $data);
            return $pdf->setPaper('a4', 'landscape')->download($payment->inv_number.'.pdf');
        }
        if($payment->status!=1){
            return view('invoice')->with(compact('payment','countries', 'id'));
        }else{
            return view('invoice')->with(compact('payment','countries', 'id'));
        }
    }
    public function payment($id){
        $payment = Payment::where('tracking_id',$id)->firstOrfail();
        if($payment->status==0){
            $payment->update([
                'status' => 3,
                'failed_reason' => request()->ip()
            ]);
            $payment->history()->create([
                'status' => 3,
                'message' => request()->ip()
            ]);
        }
        $this->merchantData = $payment->merchant;
        $countries = Country::where('is_active',1)->get();
        if($payment->status!=1){
            if($payment->merchant->merchant_type==1){
                $customerDb = Customer::where('email', $payment->customer_email)->first();
                $cards = [];
                if(optional($customerDb)->authorize_id!=''){
                    if($payment->merchant->merchant_type==1){
                        $cards = $this->getCustomerProfle($customerDb->authorize_id, $payment);
                    }
                }
                return view('payment')->with(compact('payment','countries', 'cards', 'customerDb'));
            }else if($payment->merchant->merchant_type==2){
                $stripePK = $payment->merchant->json_data->key1;//MFlag::where('flag_type', 'STRIPEPK')->first()->flag_value;
                return view('payment-stripe')->with(compact('payment','countries', 'stripePK'));
            }
            else if($payment->merchant->merchant_type==3){
                $paypalCId = $payment->merchant->json_data->key1;//MFlag::where('flag_type', 'PAYPALCID')->first()->flag_value;
                $paypalCS = $payment->merchant->json_data->key2;//MFlag::where('flag_type', 'PAYPALCS')->first()->flag_value;
                $isPaypalSandbox = $payment->merchant->json_data->is_sandbox==true?1:0;//MFlag::where('flag_type', 'PAYPALSANDBOX')->first()->flag_value;
                return view('payment-paypal')->with(compact('payment','countries', 'paypalCId'));
            }
        }else{
            return redirect()->route('payment.thankyou', $payment->tracking_id);
        }
    }
    public function getCustomerProfle($authorizeCustomerId, Payment $payment){
        $result = [];
        $AUTHORIZELOGINID = $payment->merchant->json_data->key1;//MFlag::where('flag_type', 'AUTHORIZELOGINID')->first()->flag_value;
        $AUTHORIZETRANSACTIONKEY = $payment->merchant->json_data->key2;//MFlag::where('flag_type', 'AUTHORIZETRANSACTIONKEY')->first()->flag_value;
        $merchantAuthentication = new AnetAPI\MerchantAuthenticationType();
        $merchantAuthentication->setName($AUTHORIZELOGINID);
        $merchantAuthentication->setTransactionKey($AUTHORIZETRANSACTIONKEY);
        $request = new AnetAPI\GetCustomerProfileRequest();
        $request->setMerchantAuthentication($merchantAuthentication);
        $request->setCustomerProfileId($authorizeCustomerId);
        $request->setUnmaskExpirationDate(true);
        $controller = new AnetController\GetCustomerProfileController($request);
        $sandBoxConstant = '';
        if($payment->merchant->json_data->is_sandbox==true){
            $sandBoxConstant = \net\authorize\api\constants\ANetEnvironment::SANDBOX;
        }else{
            $sandBoxConstant = \net\authorize\api\constants\ANetEnvironment::PRODUCTION;
        }
        $response = $controller->executeWithApiResponse($sandBoxConstant);
        if (($response != null) && ($response->getMessages()->getResultCode() == "Ok") )
        {
            $profileSelected = $response->getProfile();
            $paymentProfilesSelected = $profileSelected->getPaymentProfiles();
            foreach($paymentProfilesSelected as $paymentProfile){
                $result[] = [
                    'address' => $paymentProfile->getbillTo()->getAddress(),
                    'cardDigits' => $paymentProfile->getPayment()->getCreditCard()->getCardNumber(),
                    'profileid' => $paymentProfile->getCustomerPaymentProfileId(),
                    'cardType' => $paymentProfile->getPayment()->getCreditCard()->getCardType(),
                    'expiry' => $paymentProfile->getPayment()->getCreditCard()->getExpirationDate()
                ];
            }
        }
        return $result;
    }
    public function payusingOld(Payment $payment,$cppid,$cpid){
        $charge = $this->chargeCustomerProfile($cpid, $cppid, $payment);
        if($charge['status']){
            return redirect()->route('payment.thankyou', $payment->tracking_id);
        }else{
            return back()->withInput()->with('redirect_errors', $charge['msg']);
        }
    }
    public function authorizeCharge(Request $frequest, Payment $payment){
        if($payment->merchant->merchant_type==1){
            $AUTHORIZELOGINID = $payment->merchant->json_data->key1;//MFlag::where('flag_type', 'AUTHORIZELOGINID')->first()->flag_value;
            $AUTHORIZETRANSACTIONKEY = $payment->merchant->json_data->key2;//MFlag::where('flag_type', 'AUTHORIZETRANSACTIONKEY')->first()->flag_value;
            // $AUTHORIZEENDPOINT = MFlag::where('flag_type', 'AUTHORIZEENDPOINT')->first()->flag_value;
            $merchantAuthentication = new AnetAPI\MerchantAuthenticationType();
            $merchantAuthentication->setName($AUTHORIZELOGINID);
            $merchantAuthentication->setTransactionKey($AUTHORIZETRANSACTIONKEY);
            $creditCard = new AnetAPI\CreditCardType();
            $creditCard->setCardNumber($frequest->card_number);
            $creditCard->setExpirationDate($frequest->yy."-".$frequest->mm);
            $creditCard->setCardCode($frequest->cvc);
            $paymentCreditCard = new AnetAPI\PaymentType();
            $paymentCreditCard->setCreditCard($creditCard);
            // Create the Bill To info for new payment type
            $billTo = new AnetAPI\CustomerAddressType();
            $billTo->setFirstName($frequest->first_name);
            $billTo->setLastName($frequest->last_name);
            // $billTo->setCompany("Souveniropolis");
            $billTo->setAddress($frequest->address);
            $billTo->setEmail($payment->customer_email);
            $billTo->setCity($frequest->city);
            $billTo->setState($frequest->state);
            $billTo->setZip($frequest->zip_code);
            $billTo->setCountry(Country::find($frequest->country_id)->country_code);
            $billTo->setPhoneNumber($frequest->phone);
            // $billTo->setfaxNumber("999-999-9999");
            // Create a new CustomerPaymentProfile object
            $paymentProfile = new AnetAPI\CustomerPaymentProfileType();
            $paymentProfile->setCustomerType('individual');
            $paymentProfile->setBillTo($billTo);
            $paymentProfile->setPayment($paymentCreditCard);
            $paymentProfiles[] = $paymentProfile;

            $customerProfile = new AnetAPI\CustomerProfileType();
            $customerProfile->setDescription("Customer #".$payment->id);
            $customerProfile->setMerchantCustomerId("M_" . $payment->id);
            $customerProfile->setEmail($payment->customer_email);
            $customerProfile->setpaymentProfiles($paymentProfiles);
            // $customerProfile->setShipToList($shippingProfiles);

            // Assemble the complete transaction request
            $request = new AnetAPI\CreateCustomerProfileRequest();
            $request->setMerchantAuthentication($merchantAuthentication);
            $request->setRefId($payment->id);
            $request->setProfile($customerProfile);

            // Create the controller and get the response
            $controller = new AnetController\CreateCustomerProfileController($request);
            $sandBoxConstant = '';
            if($payment->merchant->json_data->is_sandbox==true){
                $sandBoxConstant = \net\authorize\api\constants\ANetEnvironment::SANDBOX;
            }else{
                $sandBoxConstant = \net\authorize\api\constants\ANetEnvironment::PRODUCTION;
            }
            $response = $controller->executeWithApiResponse($sandBoxConstant);
            if (($response != null) && ($response->getMessages()->getResultCode() == "Ok")) {
                $profileId = $response->getCustomerProfileId();
                $paymentProfileIds = $response->getCustomerPaymentProfileIdList();
                $paymentProfileId = $paymentProfileIds[0];
                Customer::create([
                    'first_name' => $frequest->first_name,
                    'last_name' => $frequest->last_name,
                    'city' => $frequest->city,
                    'state' => $frequest->state,
                    'zip_code' => $frequest->zip_code,
                    'country_id' => $frequest->country_id,
                    'address' => $frequest->address,
                    'authorize_id' => $profileId,
                    'phone' => $frequest->phone,
                    'address_two' => $frequest->address_two,
                    'email' => $payment->customer_email,
                ]);
                $charge = $this->chargeCustomerProfile($profileId, $paymentProfileId, $payment);
                if($charge['status']){
                    return redirect()->route('payment.thankyou', $payment->tracking_id);
                }else{
                    return back()->withInput()->with('redirect_errors', $charge['msg']);
                }
            } else {
                $errorMessages = $response->getMessages()->getMessage();
                if($errorMessages[0]->getCode()=='E00039'){
                    //duplicate profile coming
                    $customer = Customer::where('email', $payment->customer_email)->first();
                    $authorizeProfileId = $customer->authorize_id;
                    // Assemble the complete transaction request
                    $paymentprofilerequest = new AnetAPI\CreateCustomerPaymentProfileRequest();
                    $paymentprofilerequest->setMerchantAuthentication($merchantAuthentication);
                    // Add an existing profile id to the request
                    $paymentprofilerequest->setCustomerProfileId($authorizeProfileId);
                    $paymentprofilerequest->setPaymentProfile($paymentProfiles[0]);
                    $paymentprofilerequest->setValidationMode("liveMode");
                    // Create the controller and get the response
                    $controller = new AnetController\CreateCustomerPaymentProfileController($paymentprofilerequest);
                    if($payment->merchant->json_data->is_sandbox==true){
                        $sandBoxConstant = \net\authorize\api\constants\ANetEnvironment::SANDBOX;
                    }else{
                        $sandBoxConstant = \net\authorize\api\constants\ANetEnvironment::PRODUCTION;
                    }
                    $response = $controller->executeWithApiResponse($sandBoxConstant);

                    if (($response != null) && ($response->getMessages()->getResultCode() == "Ok") ) {
                        $customerPaymentProfileId = $response->getCustomerPaymentProfileId();
                        $charge = $this->chargeCustomerProfile($authorizeProfileId, $customerPaymentProfileId, $payment);
                        if($charge['status']){
                            return redirect()->route('payment.thankyou', $payment->tracking_id);
                        }else{
                            return back()->withInput()->with('redirect_errors', $charge['msg']);
                        }
                    } else {
                        $errorMessagesPaymentProfile = $response->getMessages()->getMessage();
                        if($errorMessagesPaymentProfile[0]->getCode()=='E00039'){
                            //payment profile and customer both duplicate, charge saved card now
                            $payment->update([
                                'failed_reason' => $errorMessagesPaymentProfile[0]->getText(),
                                'status' => 2
                            ]);
                            $payment->history()->create([
                                'status' => 2,
                                'message' => $errorMessagesPaymentProfile[0]->getText()
                            ]);
                            return back()->withInput()->with('redirect_errors', $errorMessagesPaymentProfile[0]->getText());
                        }else{
                            $payment->update([
                                'failed_reason' => $errorMessagesPaymentProfile[0]->getText(),
                                'status' => 2
                            ]);
                            $payment->history()->create([
                                'status' => 2,
                                'message' => $errorMessagesPaymentProfile[0]->getText(),
                            ]);
                            return back()->withInput()->with('redirect_errors', $errorMessagesPaymentProfile[0]->getText());
                        }
                    }
                }else{
                    $payment->update([
                        'failed_reason' => $errorMessages[0]->getText(),
                        'status' => 2
                    ]);
                    $payment->history()->create([
                        'status' => 2,
                        'message' => $errorMessages[0]->getText(),
                    ]);
                    return back()->withInput()->with('redirect_errors', $errorMessages[0]->getText());
                }
            }
            // return $response;
        }else{
            return back()->with('redirect_errors', 'Payment Method is wrong');
        }
    }
    public function chargeCustomerProfile($profileid, $paymentprofileid, Payment $payment){
        $AUTHORIZELOGINID = $payment->merchant->json_data->key1;//MFlag::where('flag_type', 'AUTHORIZELOGINID')->first()->flag_value;
        $AUTHORIZETRANSACTIONKEY = $payment->merchant->json_data->key2;//MFlag::where('flag_type', 'AUTHORIZETRANSACTIONKEY')->first()->flag_value;
        // $AUTHORIZEENDPOINT = MFlag::where('flag_type', 'AUTHORIZEENDPOINT')->first()->flag_value;
        $merchantAuthentication = new AnetAPI\MerchantAuthenticationType();
        $merchantAuthentication->setName($AUTHORIZELOGINID);
        $merchantAuthentication->setTransactionKey($AUTHORIZETRANSACTIONKEY);;
        
        // Set the transaction's refId
        $refId = $payment->id;

        $profileToCharge = new AnetAPI\CustomerProfilePaymentType();
        $profileToCharge->setCustomerProfileId($profileid);
        $paymentProfile = new AnetAPI\PaymentProfileType();
        $paymentProfile->setPaymentProfileId($paymentprofileid);
        $profileToCharge->setPaymentProfile($paymentProfile);

        $transactionRequestType = new AnetAPI\TransactionRequestType();
        $transactionRequestType->setTransactionType("authCaptureTransaction"); 
        $transactionRequestType->setAmount($payment->amount);
        $transactionRequestType->setProfile($profileToCharge);

        $request = new AnetAPI\CreateTransactionRequest();
        $request->setMerchantAuthentication($merchantAuthentication);
        $request->setRefId($refId);
        $request->setTransactionRequest($transactionRequestType);
        $controller = new AnetController\CreateTransactionController($request);
        $sandBoxConstant = '';
        if($payment->merchant->json_data->is_sandbox==true){
            $sandBoxConstant = \net\authorize\api\constants\ANetEnvironment::SANDBOX;
        }else{
            $sandBoxConstant = \net\authorize\api\constants\ANetEnvironment::PRODUCTION;
        }
        $response = $controller->executeWithApiResponse($sandBoxConstant);
        if ($response != null){
            if($response->getMessages()->getResultCode() == "Ok"){
                $tresponse = $response->getTransactionResponse();
                if ($tresponse != null && $tresponse->getMessages() != null){
                    $payment->update([
                        'merchant_transaction_id' => $tresponse->getTransId(),
                        'status' => 1
                    ]);
                    $payment->history()->create([
                        'status' => 1,
                        'message' => $tresponse->getTransId(),
                    ]);
                    return ['status'=>true];
                }
                else{
                    if($tresponse->getErrors() != null){
                        $payment->update([
                            'failed_reason' => $tresponse->getErrors()[0]->getErrorText(),
                            'status' => 2
                        ]);
                        $payment->history()->create([
                            'status' => 2,
                            'message' => $tresponse->getErrors()[0]->getErrorText(),
                        ]);
                        return ['status'=>false, 'msg' => $tresponse->getErrors()[0]->getErrorText()];
                    }else{
                        $payment->update([
                            'failed_reason' => 'Transaction Failed',
                            'status' => 2
                        ]);
                        $payment->history()->create([
                            'status' => 2,
                            'message' => 'Transaction Failed',
                        ]);
                        return ['status'=>false, 'msg' => 'Transaction Failed'];
                    }
                }
            }
            else{
                $tresponse = $response->getTransactionResponse();
                if($tresponse != null && $tresponse->getErrors() != null){
                    $payment->update([
                        'failed_reason' => $tresponse->getErrors()[0]->getErrorText(),
                        'status' => 2
                    ]);
                    $payment->history()->create([
                        'status' => 2,
                        'message' => $tresponse->getErrors()[0]->getErrorText(),
                    ]);
                    return ['status'=>false, 'msg' => $tresponse->getErrors()[0]->getErrorText()];
                }
                else{
                    $payment->update([
                        'failed_reason' => $response->getMessages()->getMessage()[0]->getText(),
                        'status' => 2
                    ]);
                    $payment->history()->create([
                        'status' => 2,
                        'message' => $response->getMessages()->getMessage()[0]->getText(),
                    ]);
                    return ['status'=>false, 'msg' => $response->getMessages()->getMessage()[0]->getText()];
                }
            }
        }
        else{
            $payment->update([
                'failed_reason' => 'No Response Returned',
                'status' => 2
            ]);
            $payment->history()->create([
                'status' => 2,
                'message' => 'No Response Returned',
            ]);
            return ['status'=>false, 'msg' => 'No Response Returned'];
        }
        // return $response;
    }
    public function customerProfileStripe(Payment $payment, Request $request){
        $stripeSK = $payment->merchant->json_data->key2;//MFlag::where('flag_type', 'STRIPESK')->first()->flag_value;
        $stripe = new \Stripe\StripeClient(
            $stripeSK
        );
        $customerCheck = $stripe->customers->search([
            'query' => "email:'".$request->email."'",
            'limit' => 1
        ]);
        if(count($customerCheck->data)==0){
            //create customer
            $customer = $stripe->customers->create([
                'email' => $request->email,
                'name' => $request->first_name.' '.$request->last_name,
                'phone' => $request->phone,
                'address' => [
                    'city' => $request->city,
                    'state' => $request->state,
                    'country' => Country::find($request->country_id)->iso_code,
                    'postal_code' => $request->zip_code,
                    'line1' => $request->address,
                    'line2' => $request->address_two,
                ]
            ]);
            return $customer->id;
        }else{
            //return existing customer
            return $customerCheck->data[0]->id;
        }
    }
    public function setSource(Request $request, Payment $payment, $stripe_customer_id){
        $stripeSK = $payment->merchant->json_data->key2;//MFlag::where('flag_type', 'STRIPESK')->first()->flag_value;
        $stripe = new \Stripe\StripeClient(
            $stripeSK
        );
        $data = $stripe->sources->create([
            "type" => "card",
            "currency" => "usd",
            "owner" => [
                "email" => $payment->customer_email
            ],
            'token' => $request->token_id
        ]);
        $stripe->customers->createSource(
            $stripe_customer_id,
            ['source' => $data->id]
        );
        return $data->id;
    }
    public function paymentStripe(Request $request, Payment $payment){
        try{
            $stripeSK = $payment->merchant->json_data->key2;//MFlag::where('flag_type', 'STRIPESK')->first()->flag_value;
            $stripe = new \Stripe\StripeClient(
                $stripeSK
            );
            $stripe_customer_id = $this->customerProfileStripe($payment, $request);
            // $oldCards = $stripe->paymentMethods->all(['customer' => $stripe_customer_id, 'type' => 'card']);
            // dd($oldCards);
            $source = $this->setSource($request, $payment, $stripe_customer_id);
            $amount = ($payment->amount*100);
            $charge = $stripe->charges->create([
                'amount' => $amount,
                'currency' => 'usd',
                'source' => $source, //$request->token_id,
                'description' => $payment->description,
                'customer' => $stripe_customer_id,
                "metadata" => [
                    "payment_hash" => $payment->tracking_id,
                    "subtotal" => $payment->subtotal,
                    "tax_percent" => $payment->tax_percent,
                    "allow_tax" => ($payment->allow_tax==1?"true":"false"),
                    "total" => $payment->amount,
                ]
            ]);
            if(isset($charge->status)){
                if(strtolower($charge->status)=='succeeded'){
                    $payment->update([
                        'merchant_transaction_id' => $charge->id,
                        'status' => 1
                    ]);
                    $payment->history()->create([
                        'status' => 1,
                        'message' => $charge->id,
                    ]);
                    //Mail::to($payment->customer_email)->send(new InvoicePaid($payment));
                    return redirect()->route('payment.thankyou', $payment->tracking_id);
                }
            }
            return back()->withInput()->with('redirect_errors', 'Payment Failed');
        }catch(Stripe\Exception\CardException $ex){
            $payment->update([
                'failed_reason' =>$ex->getError()->message,
                'status' => 2
            ]);
            $payment->history()->create([
                'status' => 2,
                'message' => $ex->getError()->message,
            ]);
        } catch (\Stripe\Exception\RateLimitException $e) {
            $payment->update([
                'failed_reason' =>$e->getMessage(),
                'status' => 2
            ]);
            $payment->history()->create([
                'status' => 2,
                'message' => $e->getMessage(),
            ]);
        } catch (\Stripe\Exception\InvalidRequestException $e) {
            $payment->update([
                'failed_reason' =>$e->getMessage(),
                'status' => 2
            ]);
            $payment->history()->create([
                'status' => 2,
                'message' => $e->getMessage(),
            ]);
        } catch (\Stripe\Exception\AuthenticationException $e) {
            $payment->update([
                'failed_reason' =>$e->getMessage(),
                'status' => 2
            ]);
            $payment->history()->create([
                'status' => 2,
                'message' => $e->getMessage(),
            ]);
        } catch (\Stripe\Exception\ApiConnectionException $e) {
            $payment->update([
                'failed_reason' =>$e->getMessage(),
                'status' => 2
            ]);
            $payment->history()->create([
                'status' => 2,
                'message' => $e->getMessage(),
            ]);
        } catch (\Stripe\Exception\ApiErrorException $e) {
            $payment->update([
                'failed_reason' =>$e->getMessage(),
                'status' => 2
            ]);
            $payment->history()->create([
                'status' => 2,
                'message' => $e->getMessage(),
            ]);
        } catch (\Exception $e) {
            $payment->update([
                'failed_reason' =>$e->getMessage(),
                'status' => 2
            ]);
            $payment->history()->create([
                'status' => 2,
                'message' => $e->getMessage(),
            ]);
        }
        $payment = Payment::find($payment->id);
        return back()->withInput()->with('redirect_errors', $payment->failed_reason);
    }
    public function paymentPaypal(Request $request, Payment $payment){
        $paypalCId = $payment->merchant->json_data->key1;//MFlag::where('flag_type', 'PAYPALCID')->first()->flag_value;
        $paypalCS = $payment->merchant->json_data->key2;//MFlag::where('flag_type', 'PAYPALCS')->first()->flag_value;
        $isPaypalSandbox = $payment->merchant->json_data->is_sandbox==true?1:0;//MFlag::where('flag_type', 'PAYPALSANDBOX')->first()->flag_value;
        $paypal = new Paypal($paypalCId, $paypalCS, ($isPaypalSandbox=='1'?true:false));
        $paypalResponse = $paypal->captureOrder($request->orderID);
        if(isset($paypalResponse->status)&&strtolower($paypalResponse->status)=='completed'){
            $payment->update([
                'merchant_transaction_id' => $paypalResponse->id,
                'status' => 1
            ]);
            $payment->history()->create([
                'status' => 1,
                'message' =>  $paypalResponse->id,
            ]);
            // return response()->json(['status' => 1]);
            return redirect()->route('payment.thankyou', $payment->tracking_id);
        }else{
            try{
                $payment->update([
                    'failed_reason' => $paypalResponse->status,
                    'status' => 2
                ]);
                $payment->history()->create([
                    'status' => 2,
                    'message' =>  $paypalResponse->status,
                ]);
                // return response()->json(['status' => 0, 'message' => $paypalResponse->status]);
                return back()->withInput()->with('redirect_errors', $paypalResponse->status);
            }catch(\Exception $ex){
                $payment->update([
                    'failed_reason' => $paypalResponse->message,
                    'status' => 2
                ]);
                $payment->history()->create([
                    'status' => 2,
                    'message' =>  $paypalResponse->message,
                ]);
                return back()->withInput()->with('redirect_errors', $paypalResponse->message);
            }
        }
    }
    public function paymentThankyou($id){
        $payment = Payment::where('tracking_id',$id)->firstOrfail();
        return view('payment-thankyou')->with(compact('payment'));
    }
    public function blockedCountries(){
        return view('blockedCountries');
    }
}
