const apiUrl = 'http://localhost:3000/orders';

async function fetchOrders() {
    const response = await fetch(apiUrl);
    const orders = await response.json();
    renderOrders(orders);
}

function renderOrders(orders) {
    const orderList = document.getElementById('orderList');
    orderList.innerHTML = '';
    orders.forEach(order => {
        const li = document.createElement('li');
        li.innerText = `${order.recipient} - ${order.gift}`;
        li.appendChild(createDeleteButton(order.id));
        orderList.appendChild(li);
    });
}

function createDeleteButton(id) {
    const button = document.createElement('button');
    button.innerText = 'Delete';
    button.onclick = () => deleteOrder(id);
    return button;
}

async function deleteOrder(id) {
    await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    fetchOrders();
}

function showOrderForm() {
    document.getElementById('orderForm').style.display = 'block';
    document.getElementById('recipient').value = '';
    document.getElementById('gift').value = '';
}

async function saveOrder() {
    const recipient = document.getElementById('recipient').value;
    const gift = document.getElementById('gift').value;
    
    await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipient, gift })
    });

    fetchOrders();
    cancelOrder();
}

function cancelOrder() {
    document.getElementById('orderForm').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', fetchOrders);
