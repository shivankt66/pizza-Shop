
function paymentGateWay(amount){

    if (amount <= 0) {
        alert("aleast select from of the product");
        return; 
    }

var options = {
    "key": env.RazerPay_API_KEY, // Enter the Key ID generated from the Dashboard
    "amount": amount * 100 , // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "USD",
    "name": "Pizza Shop", //your business name
    "description": "Test Transaction",
    "image": "https://example.com/your_logo",

    "handler": function (response) {
        alert("Payment Successful! 🎉Our Costomer cure will contact you soon as your order get prepared");
        console.log("Payment ID:", response.razorpay_payment_id);
        console.log("Order ID:", response.razorpay_order_id);
        console.log("Signature:", response.razorpay_signature);
        location.reload();
    },
    "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        "name": "Shivank Tyagi", //your customer's name
        "email": "Shivankt66@gmail.com", 
        "contact": "6396039789"  //Provide the customer's phone number for better conversion rates 
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
};
var rzp1 = new Razorpay(options);

rzp1.on('payment.failed', function (response){
        alert("Payment Failed");
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
});
document.getElementById('rzp-button1').onclick = function(e){
    rzp1.open();
    e.preventDefault();
}

}