<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>{{$payment->inv_number}}</title>
    <style>
        .clearfix:after {
            content: "";
            display: table;
            clear: both;
        }

        a {
            color: #5D6975;
            text-decoration: underline;
        }

        body {
            position: relative;
            width: 21cm;
            height: 29.7cm;
            margin: 0 auto;
            color: #001028;
            background: #FFFFFF;
            font-family: Arial, sans-serif;
            font-size: 12px;
            font-family: Arial;
        }

        header {
            padding: 10px 0;
            margin-bottom: 30px;
        }

        #logo {
            text-align: center;
            margin-bottom: 10px;
        }

        #logo img {
            width: 90px;
        }

        h1 {
            border-top: 1px solid #5D6975;
            border-bottom: 1px solid #5D6975;
            color: #5D6975;
            font-size: 2.4em;
            line-height: 1.4em;
            font-weight: normal;
            text-align: center;
            margin: 0 0 20px 0;
            background: url(dimension.png);
        }

        #project {
            float: left;
        }

        #project span {
            color: #5D6975;
            text-align: right;
            width: 52px;
            margin-right: 10px;
            display: inline-block;
            font-size: 0.8em;
        }

        #company {
            float: right;
            text-align: right;
        }

        #project div,
        #company div {
            white-space: nowrap;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            border-spacing: 0;
            margin-bottom: 20px;
        }

        table tr:nth-child(2n-1) td {
            background: #F5F5F5;
        }

        table th,
        table td {
            text-align: center;
        }

        table th {
            padding: 5px 20px;
            color: #5D6975;
            border-bottom: 1px solid #C1CED9;
            white-space: nowrap;
            font-weight: normal;
        }

        table .service,
        table .desc {
            text-align: left;
        }

        table td {
            /* padding: 20px; */
            /* text-align: right; */
        }

        table td.service,
        table td.desc {
            vertical-align: top;
        }

        table td.unit,
        table td.qty,
        table td.total {
            font-size: 1.2em;
        }

        table td.grand {
            border-top: 1px solid #5D6975;
            ;
        }

        #notices .notice {
            color: black;
            font-size: 1em;
            margin-top: 10px;
            display: block;
        }

        footer {
            color: #5D6975;
            width: 100%;
            height: 30px;
            position: absolute;
            bottom: 0;
            border-top: 1px solid #C1CED9;
            padding: 8px 0;
            text-align: center;
        }
        .page-break {
            page-break-after: always;
        }
        .text-dark {
            color: #212529!important;
        }
        .text-white {
            color: #fff!important;
        }
        .bg-success {
            background-color: #198754!important;
        }
        .bg-warning {
            background-color: #ffc107!important;
        }
        .badge{
            display: inline-block;
            padding: 0.35em 0.65em;
            font-size: .75em;
            font-weight: 700;
            line-height: 1;
            color: #fff;
            text-align: center;
            white-space: nowrap;
            vertical-align: baseline;
            border-radius: 0.25rem;
        }
    </style>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
</head>

<body>
    <header class="clearfix">
        <div id="logo">
            {{$payment->brand->name}}
            <!-- <img src="{{$payment->brand->image_url}}" style="width: 150px; height: 150px;" /> -->
        </div>
        <h1>INVOICE #{{$payment->inv_number}}</h1>
        <div id="company" class="clearfix">
            <div>{{$payment->brand->name}}</div>
            <div>
                @if($payment->status==0)
                    <span class="badge bg-warning text-dark">Pending</span>
                @endif
                @if($payment->status==3)
                    <span class="badge bg-warning text-dark">Pending</span>
                @endif
                @if($payment->status==1)
                    <span class="badge bg-success text-white">Paid</span>
                @endif
            </div>
            <!-- <div>455 Foggy Heights,<br /> AZ 85004, US</div>
            <div>(602) 519-0450</div> -->
            <!-- <div><a href="mailto:company@example.com">company@example.com</a></div> -->
        </div>
        <div id="project">
            <!-- <div><span>PROJECT</span> Website development</div> -->
            <div><span>CLIENT</span> {{$payment->customer_name}}</div>
            <!-- <div><span>ADDRESS</span> 796 Silver Harbour, TX 79273, US</div> -->
            <div><span>EMAIL</span> <a href="mailto:{{$payment->customer_email}}">{{$payment->customer_email}}</a></div>
            <div><span>DATE</span> {{date('Y-m-d', strtotime($payment->created_at))}}</div>
            <!-- <div><span>DUE DATE</span> September 17, 2015</div> -->
        </div>
    </header>
    <main>
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th class="desc">Item & Description</th>
                    <th>Rate</th>
                    <th>Qty</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td class="desc">{{implode(', ',explode(',', $payment->services))}}</td>
                    <td class="unit">${{number_format($payment->subtotal, 2)}}</td>
                    <td class="qty">1</td>
                    <td class="total">${{number_format($payment->subtotal, 2)}}</td>
                </tr>
                <tr>
                    <td colspan="4">SUBTOTAL</td>
                    <td class="total">${{number_format($payment->subtotal, 2)}}</td>
                </tr>
                <tr>
                    <td colspan="4">TAX</td>
                    <td class="total">{{number_format($payment->tax_percent, 2)}}%</td>
                </tr>
                <tr>
                    <td colspan="4" class="grand total">GRAND TOTAL</td>
                    <td class="grand total">${{number_format($payment->amount, 2)}}</td>
                </tr>
            </tbody>
        </table>
        <div id="notices">
            <div>NOTICE:</div>
            <div class="notice badge bg-warning">This charge will appear on your statement as “{{$payment->merchant->name}}”</div>
        </div>
    </main>
    <footer>
        Invoice was created on a computer and is valid without the signature and seal.
    </footer>
</body>

</html>