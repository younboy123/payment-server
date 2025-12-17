app.use(express.json());

let orders = {}; // 임시 주문 저장소

app.post("/order", (req, res) => {
  const { amount } = req.body;

  const orderId = Date.now().toString(); // 주문 ID
  const virtualAccount = "123-456-789012"; // 가짜 가상계좌

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
