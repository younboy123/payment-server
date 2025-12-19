// index.js
const express = require("express");
const app = express();

// JSON body 파싱
app.use(express.json());

// 임시 메모리 DB
const orders = {};

// 🔹 서버 상태 확인용 (중요)
app.get("/", (req, res) => {
  res.send("Server is running");
});

// 1️⃣ 주문 생성
// POST /order
// body: { "amount": 10000 }
app.post("/order", (req, res) => {
  const amount = req.body.amount;

  if (amount === undefined) {
    return res.status(400).json({ error: "amount required" });
  }

  const orderId = Date.now().toString();

  orders[orderId] = {
    amount: Number(amount),
    status: "WAITING_PAYMENT",
  };

  res.json({
    orderId,
    amount: Number(amount),
    status: "WAITING_PAYMENT",
  });
});

// 2️⃣ 입금 처리
// POST /deposit
// body: { "orderId": "xxxx", "amount": 10000 }
app.post("/deposit", (req, res) => {
  const { orderId, amount } = req.body;

  if (!orderId || amount === undefined) {
    return res.status(400).json({
      error: "orderId and amount required",
    });
  }

  const order = orders[orderId];

  if (!order) {
    return res.status(404).json({ error: "order not found" });
  }

  if (order.amount !== Number(amount)) {
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

// 3️⃣ 주문 상태 조회
// GET /order/:id
app.get("/order/:id", (req, res) => {
  const order = orders[req.params.id];

  if (!order) {
    return res.status(404).json({ error: "order not found" });
  }

  res.json(order);
});

// 서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});



