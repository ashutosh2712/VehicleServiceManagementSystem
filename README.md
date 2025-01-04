<h1>Vehicle Service Management System</h1>

<p>A comprehensive web application for managing vehicle services, repairs, and payments. The system includes a Django backend, React frontend, and PostgreSQL database running via Docker.</p>

---

<h2>Features</h2>
<ul>
  <li><b>Component Management</b>: Register, update, and manage components for repairs or purchases.</li>
  <li><b>Vehicle Repair Tracking</b>: Track repair status and details for vehicles.</li>
  <li><b>Issue Reporting</b>: Log issues, select components, and calculate repair costs.</li>
  <li><b>Payment Simulation</b>: Simulate payments and calculate total amounts for repairs.</li>
  <li><b>Revenue Visualization</b>: Analyze daily, monthly, and yearly revenue.</li>
</ul>

---

<h2>Tech Stack</h2>
<ul>
  <li><b>Backend</b>: Django (Python)</li>
  <li><b>Frontend</b>: React (JavaScript)</li>
  <li><b>Database</b>: PostgreSQL (via Docker)</li>
  <li><b>Additional Libraries</b>:
    <ul>
      <li><b>Backend</b>: Django REST Framework, django-cors-headers</li>
      <li><b>Frontend</b>: Axios, Recharts</li>
    </ul>
  </li>
</ul>

---

<h2>Prerequisites</h2>
<p>Ensure you have the following installed:</p>
<ul>
  <li><a href="https://www.python.org/">Python 3.8+</a></li>
  <li><a href="https://nodejs.org/">Node.js 14+</a></li>
  <li><a href="https://www.docker.com/">Docker</a></li>
  <li><a href="https://git-scm.com/">Git</a></li>
</ul>

---

<h2>Installation and Setup</h2>

<h3>1. Clone the Repository</h3>
<pre>
<code>
git clone https://github.com/your-username/vehicle-service-management.git
cd vehicle-service-management
</code>
</pre>

---

<h3>2. Backend Setup</h3>
<ol>
  <li><b>Navigate to the backend directory:</b></li>
  <pre><code>cd backend</code></pre>
  <li><b>Create a Python virtual environment:</b></li>
  <pre><code>
python -m venv venv
source venv/bin/activate  # On Windows, use venv\Scripts\activate
  </code></pre>
  <li><b>Install dependencies:</b></li>
  <pre><code>pip install -r requirements.txt</code></pre>
  <li><b>Set up the PostgreSQL database via Docker:</b></li>
  <pre><code>
docker run --name vehicle_service_db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=your_password -e POSTGRES_DB=vehicle_service -p 8010:5432 -d postgres
  </code></pre>
 
  <li><b>Run database migrations:</b></li>
  <pre><code>
python manage.py makemigrations
python manage.py migrate
  </code></pre>
  <li><b>Start the Django development server:</b></li>
  <pre><code>python manage.py runserver</code></pre>
</ol>

<p>The backend will run at <a href="http://127.0.0.1:8000/">http://127.0.0.1:8000/</a>.</p>

---

<h3>3. Frontend Setup</h3>
<ol>
  <li><b>Navigate to the frontend directory:</b></li>
  <pre><code>cd ../frontend</code></pre>
  <li><b>Install dependencies:</b></li>
  <pre><code>npm install</code></pre>
  <li><b>Start the React development server:</b></li>
  <pre><code>npm start</code></pre>
</ol>

<p>The frontend will run at <a href="http://localhost:5173/">http://localhost:5173/</a>.</p>

---

<h3>4. Access the Application</h3>
<ul>
  <li><b>Frontend</b>: <a href="http://localhost:5173/">http://localhost:5173</a></li>
  <li><b>Backend API</b>: <a href="http://127.0.0.1:8000/">http://127.0.0.1:8000</a></li>
</ul>

---

<h2>API Endpoints</h2>
<p><b>1. Component Management:</b></p>
<ul>
  <li><b>List Components</b>: <code>GET /api/components/list-componenets/</code></li>
  <li><b>Add Component</b>: <code>POST /api/components/register-component/</code></li>
  <li><b>Update Component</b>: <code>PUT /api/components/update-component/?component_id=<id></code></li>
  <li><b>Delete Component</b>: <code>DELETE /api/components/delet-component/?component_id=<id></code></li>
</ul>

<p><b>2. Vehicle Management:</b></p>
<ul>
  <li><b>List Vehicles</b>: <code>GET /api/vehicles/list/</code></li>
  <li><b>Add Vehicle</b>: <code>POST /api/vehicles/add/</code></li>
  <li><b>Update Vehicle Status</b>: <code>PUT /api/vehicles/update-status/?vehicle_id=<id></code></li>
  <li><b>Delete Vehicle</b>: <code>DELETE /api/vehicles/delete/?vehicle_id=<id></code></li>
</ul>

<p><b>3. Repair Management:</b></p>
<ul>
  <li><b>List Repairs</b>: <code>GET /api/repairs/list-issues/?vehicle_id=<id></code></li>
  <li><b>Add Repair</b>: <code>POST /api/repairs/add-issue/</code></li>
  <li><b>Delete Repair</b>: <code>DELETE /api/repairs/delete-isue/?repair_id=<id></code></li>
</ul>

<p><b>4. Payment Simulation:</b></p>
<ul>
  <li><b>Simulate Payment</b>: <code>POST /api/payments/simulate-payment/</code></li>
</ul>

<p><b>5. Revenue Visualization:</b></p>
<ul>
  <li><b>Daily Revenue</b>: <code>GET /api/revenue/daily/</code></li>
  <li><b>Monthly Revenue</b>: <code>GET /api/revenue/monthly/</code></li>
  <li><b>Yearly Revenue</b>: <code>GET /api/revenue/yearly/</code></li>
</ul>

<h2>Usage</h2>

<h3>1. Component Management</h3>
<p>Add, update, or delete components for vehicle repairs. Use this feature to manage the inventory of parts and their pricing for repairs or replacements.</p>

<h3>2. Vehicle Management</h3>
<p>Register vehicles, log their details, and track their repair statuses. Monitor the status as <i>Pending</i>, <i>In Progress</i>, or <i>Completed</i> based on the repair workflow.</p>

<h3>3. Repair Management</h3>
<p>Log repair jobs for registered vehicles. Calculate the total costs for each repair based on the selected components and labor charges.</p>

<h3>4. Simulate Payments</h3>
<p>Simulate payments for one or more repairs. This feature calculates the total amount due and processes a mock payment, allowing you to track payment details for each repair.</p>

<h3>5. Revenue Analytics</h3>
<p>Visualize revenue trends through graphs. Analyze daily, monthly, and yearly revenue generated from repair and service payments.</p>


---

<h2>License</h2>
<p>This project is licensed under the MIT License. See the LICENSE file for details.</p>
