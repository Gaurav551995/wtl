const API = "http://localhost:3000/items";

async function fetchItems() {
  const res = await fetch(API);
  const items = await res.json();
  
  const table = document.getElementById("itemTable");
  table.innerHTML = "";

  items.forEach(item => {
    table.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>${item.description}</td>
        <td>${item.price}</td>
        <td>
          <button class="btn btn-primary btn-sm" onclick="editItem('${item._id}')">Edit</button>
          <button class="btn btn-danger btn-sm" onclick="deleteItem('${item._id}')">Delete</button>
        </td>
      </tr>
    `;
  });
}

async function addItem() {
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, description, price })
  });

  clearForm();
  fetchItems();
}

async function editItem(id) {
  const res = await fetch(`${API}/${id}`);
  const item = await res.json();

  document.getElementById("itemId").value = item._id;
  document.getElementById("name").value = item.name;
  document.getElementById("description").value = item.description;
  document.getElementById("price").value = item.price;

  document.querySelector("button.btn-success").classList.add("d-none");
  document.getElementById("updateBtn").classList.remove("d-none");
}

async function updateItem() {
  const id = document.getElementById("itemId").value;
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;

  await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, description, price })
  });

  clearForm();
  fetchItems();
}

async function deleteItem(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  fetchItems();
}

function clearForm() {
  document.getElementById("itemId").value = "";
  document.getElementById("name").value = "";
  document.getElementById("description").value = "";
  document.getElementById("price").value = "";
  document.querySelector("button.btn-success").classList.remove("d-none");
  document.getElementById("updateBtn").classList.add("d-none");
}

// Initial load
fetchItems();
