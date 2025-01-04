import React, { useState, useEffect } from "react";
import { fetchRepairs, addRepair, deleteRepair } from "../services/api";
import { fetchVehicles } from "../services/api"; // To get the list of vehicles

const Repairs = () => {
  const [repairs, setRepairs] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState("");
  const [newRepair, setNewRepair] = useState({
    component_id: "",
    repair_type: "",
    labor_cost: "",
  });
  const [loading, setLoading] = useState(false);

  // Load vehicles and repairs when the component mounts
  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      const response = await fetchVehicles();
      setVehicles(response.data);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  const loadRepairs = async (vehicleId) => {
    setLoading(true);
    try {
      const response = await fetchRepairs(vehicleId);
      setRepairs(response.data);
    } catch (error) {
      console.error("Error fetching repairs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRepair = async () => {
    if (
      !selectedVehicleId ||
      !newRepair.component_id ||
      !newRepair.repair_type ||
      !newRepair.labor_cost
    ) {
      alert("Please fill out all fields.");
      return;
    }
    try {
      await addRepair({
        vehicle_id: selectedVehicleId,
        ...newRepair,
      });
      setNewRepair({ component_id: "", repair_type: "", labor_cost: "" });
      loadRepairs(selectedVehicleId);
    } catch (error) {
      console.error("Error adding repair:", error);
    }
  };

  const handleDeleteRepair = async (id) => {
    try {
      await deleteRepair(id);
      loadRepairs(selectedVehicleId);
    } catch (error) {
      console.error("Error deleting repair:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Repair Management</h1>

      {/* Select Vehicle */}
      <div style={styles.form}>
        <h2>Select Vehicle</h2>
        <select
          value={selectedVehicleId}
          onChange={(e) => {
            setSelectedVehicleId(e.target.value);
            loadRepairs(e.target.value);
          }}
          style={styles.select}
        >
          <option value="">-- Select Vehicle --</option>
          {vehicles.map((vehicle) => (
            <option key={vehicle.id} value={vehicle.id}>
              {vehicle.vehicle_id} - {vehicle.owner_name}
            </option>
          ))}
        </select>
      </div>

      {/* Add New Repair */}
      {selectedVehicleId && (
        <div style={styles.form}>
          <h2>Add Repair</h2>
          <input
            type="text"
            placeholder="Component ID"
            value={newRepair.component_id}
            onChange={(e) =>
              setNewRepair({ ...newRepair, component_id: e.target.value })
            }
            style={styles.input}
          />
          <select
            value={newRepair.repair_type}
            onChange={(e) =>
              setNewRepair({ ...newRepair, repair_type: e.target.value })
            }
            style={styles.select}
          >
            <option value="">-- Repair Type --</option>
            <option value="new">New</option>
            <option value="repair">Repair</option>
          </select>
          <input
            type="number"
            placeholder="Labor Cost"
            value={newRepair.labor_cost}
            onChange={(e) =>
              setNewRepair({ ...newRepair, labor_cost: e.target.value })
            }
            style={styles.input}
          />
          <button onClick={handleAddRepair} style={styles.button}>
            Add Repair
          </button>
        </div>
      )}

      {/* List of Repairs */}
      <div style={styles.list}>
        <h2>All Repairs</h2>
        {loading ? (
          <p>Loading...</p>
        ) : repairs.length > 0 ? (
          <table style={styles.table}>
            <thead style={styles.tableHeader}>
              <tr>
                <th>Component ID</th>
                <th>Repair Type</th>
                <th>Labor Cost</th>
                <th>Total Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {repairs.map((repair) => (
                <tr key={repair.id} style={styles.tableCell}>
                  <td>{repair.component_id}</td>
                  <td>{repair.repair_type}</td>
                  <td>{repair.labor_cost}</td>
                  <td>{repair.total_price}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteRepair(repair.id)}
                      style={styles.buttonDelete}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No repairs found for the selected vehicle.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
  },
  form: {
    marginBottom: "2rem",
  },
  input: {
    marginRight: "1rem",
    padding: "0.5rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  select: {
    marginRight: "1rem",
    padding: "0.5rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    padding: "0.5rem 1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  buttonDelete: {
    padding: "0.5rem 1rem",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  list: {
    marginTop: "2rem",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "center",
  },
  tableHeader: {
    backgroundColor: "#f4f4f4",
    fontWeight: "bold",
    fontSize: "1.2rem",
  },
  tableCell: {
    border: "1px solid #ddd",
    padding: "0.5rem",
  },
};

export default Repairs;
