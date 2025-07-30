import { toast } from "react-hot-toast";
import { resetCart } from "../../slices/cartSlice";
import { setPaymentLoading } from "../../slices/courseSlice";
import { apiConnector } from "../apiConnector";
import { studentEndpoints } from "../apis";

const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints;

// ✅ Load Razorpay checkout.js
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

// ✅ Buy Course Function
export async function BuyCourse(token, courses, user_details, navigate, dispatch) {
  const toastId = toast.loading("Loading...");
  try {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      toast.error("Razorpay SDK failed to load. Check your Internet Connection.");
      return;
    }

    // ✅ Call Backend to create Razorpay order
    const orderResponse = await apiConnector(
      "POST",
      COURSE_PAYMENT_API,
      { courses },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!orderResponse?.data?.success) {
      throw new Error(orderResponse.data.message);
    }

    // console.log("PAYMENT RESPONSE FROM BACKEND............", orderResponse.data);

    // ✅ Get Razorpay Key from .env
    const razorpayKey = process.env.REACT_APP_RAZORPAY_KEY;
    if (!razorpayKey) {
      toast.error("Razorpay key not set in environment.");
      return;
    }

   
    const options = {
      key: razorpayKey,
      currency: orderResponse.data.data.currency,
      amount: `${orderResponse.data.data.amount}`,
      order_id: orderResponse.data.data.id,
      name: "StudyNotion",
      description: "Thank you for purchasing the course.",
      image: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Razorpay_logo.png", // ✅ Use a public image URL
      prefill: {
        name: `${user_details?.firstName || ""} ${user_details?.lastName || ""}`,
        email: user_details?.email || "test@example.com",
      },
      handler: function (response) {
        sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token);
        verifyPayment({ ...response, courses }, token, navigate, dispatch);
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", function (response) {
      console.error("Payment Failed:", response.error);
      toast.error(response.error.description || "Oops! Payment Failed.");
    });

  } catch (error) {
    console.error("PAYMENT API ERROR............", error);
    toast.error("Could not initiate payment.");
  }
  toast.dismiss(toastId);
}


async function verifyPayment(bodyData, token, navigate, dispatch) {
  const toastId = toast.loading("Verifying Payment...");
  dispatch(setPaymentLoading(true));
  try {
    const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
      Authorization: `Bearer ${token}`,
    });

    // console.log("VERIFY PAYMENT RESPONSE FROM BACKEND............", response);

    if (!response?.data?.success) {
      throw new Error(response.data.message);
    }

    toast.success("Payment successful. You are enrolled in the course.");
    navigate("/dashboard/enrolled-courses");
    dispatch(resetCart());

  } catch (error) {
    console.error("PAYMENT VERIFY ERROR............", error);
    toast.error("Could not verify payment.");
  }
  toast.dismiss(toastId);
  dispatch(setPaymentLoading(false));
}

async function sendPaymentSuccessEmail(response, amount, token) {
  try {
    await apiConnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
  } catch (error) {
    console.error("PAYMENT SUCCESS EMAIL ERROR............", error);
  }
}
