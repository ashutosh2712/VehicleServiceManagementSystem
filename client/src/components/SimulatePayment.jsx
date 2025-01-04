import React, { useEffect, useState } from "react";
import { fetchRepairs, simulatePayment } from "../services/api";

const SimulatePayment = ({ vehicleId, onPaymentSuccess }) => {
  const [amountPaid, setAmountPaid] = useState("");
  const [loading, setLoading] = useState(false);
  const [repairs, setRepairs] = useState([]); // Store repairs for the vehicle
  const [totalAmount, setTotalAmount] = useState(0); // Total amount due for all repairs

  // Fetch repairs for the selected vehicle (repairId = vehicleId)
  useEffect(() => {
    const fetchRepairsForVehicle = async () => {
      try {
        const response = await fetchRepairs(vehicleId); // Assuming repairId is the vehicle ID
        setRepairs(response.data);

        // Calculate the total cost for all repairs
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
  }, [vehicleId]);

  const handlePayment = async () => {
    if (!amountPaid || parseFloat(amountPaid) < totalAmount) {
      alert(`Please pay at least the total amount: $${totalAmount.toFixed(2)}`);
      return;
    }

    const repairIds = repairs.map((repair) => repair.id); // Collect all repair IDs for the vehicle
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
