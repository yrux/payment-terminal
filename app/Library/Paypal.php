<?php
namespace App\Library;
use Illuminate\Support\Facades\Http;

class Paypal
{
    protected $sandboxUrl = 'https://api-m.sandbox.paypal.com';
    protected $liveUrl = 'https://api-m.paypal.com';
    protected $clientId = '';
    protected $clientSecret = '';
    protected $accessToken = '';
    protected $apiUrl = '';
    function __construct($clientId, $clientSecret, $isSandbox){
        $this->clientId = $clientId;
        $this->clientSecret = $clientSecret;
        if($isSandbox===true){
            $this->apiUrl = $this->sandboxUrl;
        }else{
            $this->apiUrl = $this->liveUrl;
        }
        self::generateToken();
    }
    public function generateToken(){
        $data = self::sendRequest(self::getUrl('/v1/oauth2/token'), [
            'grant_type' => 'client_credentials',
            'ignoreCache' => 'true',
            'return_authn_schemes' => 'true',
            'return_client_metadata' => 'true',
            'return_unconsented_scopes' => 'true'
        ], array(
            'Authorization: Basic '.base64_encode($this->clientId.':'.$this->clientSecret),
            'Content-Type: application/x-www-form-urlencoded'
        ),'POST');
        if(isset($data->access_token)){
            $this->accessToken = $data->access_token;
        }
    }
    public function captureOrder($orderId){
        $data = self::sendRequest(self::getUrl('/v2/checkout/orders/'.$orderId.'/capture'), [], 
        [...self::getTokenHeader(),'Content-Type: application/json'],'POST');
        return $data;
    }
    public function getTokenHeader(){
        return array(
            'Authorization: Bearer '.$this->accessToken,
        );
    }
    public function sendRequest($endpoint, $body = [], $headers = [], $method = 'POST'){
        $curl = curl_init();
        $postData = '';
        if($method=='POSTJ'){
            $postData = json_encode($body);
        }else{
            $postData = http_build_query($body);
        }
        curl_setopt_array($curl, array(
            CURLOPT_URL => $endpoint,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => ($method=='POSTJ'?'POST': $method),
            CURLOPT_POSTFIELDS => $postData,//http_build_query($body),
            CURLOPT_HTTPHEADER => $headers,
        ));
        $response = curl_exec($curl);
        curl_close($curl);
        return json_decode($response);
    }
    public function getUrl($uri){
        return $this->apiUrl.$uri;
    }
}

?>