const express = require("express");
const app = express();

app.use(express.json());

// ==========================
// 주문 저장소 (임시 DB)
// ==========================
let orders = {};

// ==========================
// 1. 주문 생성 (가상계좌 발급)
// ==========================
app.post("/order", (req, res) => {
  const { amount } = req.body;

  if (!amount) {
    return res.status(400).json({ error: "amount required" });
  }

  const orderId = Date.now().toString();
  const virtualAccount = "123-456-789012"; // 가짜 계좌

  orders[orderId] = {
    amount,
    status: "WAITING_PAYMENT"
  };

  res.json({
    orderId,
    account: virtualAccount,
    amount,
    status: "WAITING_PAYMENT"
  });
});

// ==========================
// 2. 입금 확인 (PG 콜백 흉내)
// ==========================
app.post("/deposit", (req, res) => {
  const { orderId, amount } = req.body;

  const order = orders[orderId];
