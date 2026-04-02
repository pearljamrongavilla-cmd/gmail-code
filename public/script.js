async function sendOTP() {
  const email = document.getElementById("email").value;
  const msg = document.getElementById("msg");

  const res = await fetch("/send-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email })
  });

  const data = await res.json();
  msg.innerText = data.message || data.error;
}

async function verifyOTP() {
  const email = document.getElementById("email").value;
  const otp = document.getElementById("otp").value;
  const msg = document.getElementById("msg");

  const res = await fetch("/verify-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, otp })
  });

  const data = await res.json();

  if (data.success) {
    msg.innerText = "OTP correct";
  } else {
    msg.innerText = "OTP wrong";
  }
}
