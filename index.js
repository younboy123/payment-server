// index.js
const express = require("express");
const app = express();

app.use(express.json());

// ==========================
// 임시 주문 저장소 (메모리)
// ==========================
const orders = {};

// ==========================
// 1️⃣ 주문 생성 (가상계좌 발급)
// POST /order
// ==========================
app.post("/order", (req, res) => {
  const { amount } = req.body;

  if (!amount) {
    return res.status(400).json({ error: "amount required" });
  }

  // 주문 ID 생성
  const orderId = Date.now().toString();

  // 테스트용 가상계좌
  const account = "123-456-789012";

  // 주문 저장
  orders[orderId] = {
    orderId,
    amount,
    account,
    status: "WAITING_PAYMENT",
  };

  // 응답 (account 반드시 포함)
  res.json({
    orderId,
    account,
    amount,
    status: "WAITING_PAYMENT",
  });
});

// ==========================
// 2️⃣ 입금 확인 (PG 콜백 흉내)
// POST /deposit
// ==========================
app.post("/deposit", (req, res) => {
  const { orderId, amount } = req.body;

  if (!orderId || amount === undefined) {
    return res
      .status(400)
      .json({ error: "orderId and amount required" });
  }

  const order = orders[orderId];
  if (!order) {
    return res.status(404).json({ error: "order not found" });
  }

  if (order.amount !== amount) {
    order.status = "FAILED";
    return res.json({
      status: "FAILED",
      message: "금액 불일치",
    });
  }

  order.status = "PAID";
  res.json({
    status: "PAID",
    message: "결제 완료",
  });
});

// ==========================
// 3️⃣ 주문 상태 조회
// GET /order/:id
// ==========================
app.get("/order/:id", (req, res) => {
  const order = orders[req.params.id];
  if (!order) {
    return res.status(404).json({ error: "order not found" });
  }

  res.json(order);
});

// ==========================
// 서버 시작
// ==========================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


