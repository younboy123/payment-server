const express = require("express");
const app = express();

app.use(express.json());

// ✅ 기본 확인용
app.get("/", (req, res) => {
  res.send("Welcome");
});

// ✅ 주문 생성 API
let orders = {};

app.post("/order", (req, res) => {
  const { amount } = req.body;

  const orderId = Date.now().toString();
  const virtualAccount = "123-456-789012";

  orders[orderId] = {
    amount,
    status: "WAITING_PAYMENT"
  };

  res.json({
    orderId,
    account: virtualAccount,
    amount
  });
});

// ✅ Render용 포트 설정 (중요)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

