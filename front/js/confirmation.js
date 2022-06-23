const str = window.location;
const url = new URL(str);
let orderId = new URL(location.href).searchParams.get("orderId");
console.log(url);
document.getElementById("orderId").innerText = orderId;