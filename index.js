const express = require("express");
const app = express();

app.use(express.json());

// 임시 DB
let orders = {};

// 1️⃣ 주문 생성
app.post("/order", (req, res) => {
  const { amount } = req.body;
  if (!amount) return res.status(400).json({ error: "amount required" });

  const orderId = Date.now().toString();
  const virtualAccount = "123-456-789012";

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

// 2️⃣ 입금 확인
app.post("/deposit", (req, res) => {
  const { orderId, amount } = req.body;
  const order = orders[orderId];
  if (!order) return res.status(404).json({ error: "order not found" });

  if (order.amount !== amount) {
    order.status = "FAILED";
    return res.json({ status: "FAILED", message: "금액 불일치" });
  }

  order.status = "PAID";
  res.json({ status: "PAID", message: "결제 완료" });
});

// 3️⃣ 주문 상태 확인
app.get("/order/:id", (req, res) => {
  const order = orders[req.params.id];
  if (!order) return res.status(404).json({ error: "order not found" });
  res.json(order);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port 3000");
});


  const order = orders[orderId];

