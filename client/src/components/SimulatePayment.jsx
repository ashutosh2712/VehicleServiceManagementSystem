import React, { useEffect, useState } from "react";
import { fetchRepairs, simulatePayment } from "../services/api";

const SimulatePayment = ({ vehicleId, repairsUpdated, onPaymentSuccess }) => {
  const [amountPaid, setAmountPaid] = useState("");
  const [loading, setLoading] = useState(false);
  const [repairs, setRepairs] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchRepairsForVehicle = async () => {
      try {
        const response = await fetchRepairs(vehicleId);
        setRepairs(response.data);

        const total = response.data.reduce(
          (sum, repair) => sum + parseFloat(repair.total_price),
          0
        );
        setTotalAmount(total);
      } catch (error) {
        console.error("Error fetching repairs:", error);
      }
    };

    if (vehicleId) {
      fetchRepairsForVehicle();
    }
  }, [vehicleId, repairsUpdated]);

  const handlePayment = async () => {
    if (!amountPaid || parseFloat(amountPaid) < totalAmount) {
      alert(`Please pay at least the total amount: $${totalAmount.toFixed(2)}`);
      return;
    }

    const repairIds = repairs.map((repair) => repair.id);
    const payload = {
      repair_ids: repairIds,
      amount_paid: parseFloat(amountPaid),
    };

    console.log("Payload being sent:", payload);
    setLoading(true);
    try {
      const response = await simulatePayment(payload);
      alert("Payment successful!");
      setAmountPaid("");
      if (onPaymentSuccess) {
        onPaymentSuccess();
      }
      console.log("Payment response:", response.data);
    } catch (error) {
      console.error("Error simulating payment:", error);
      alert("Payment failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Simulate Payment</h3>
      <input
        type="number"
        placeholder="Enter amount paid"
        value={amountPaid}
        onChange={(e) => setAmountPaid(e.target.value)}
        style={{ marginRight: "1rem", padding: "0.5rem" }}
      />
      <button
        style={styles.payButton}
        onClick={handlePayment}
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay"}
      </button>
    </div>
  );
};

const styles = {
  payButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default SimulatePayment;
