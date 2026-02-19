function validateForm(event) {
    if (event) event.preventDefault();

    const form = document.getElementById("addItemForm");
    const itemName = document.getElementById("itemName");
    const availableUntil = document.getElementById("availableUntil").value;
    const messageBox = document.getElementById("messageBox") || alert; 

    const selectedDate = new Date(availableUntil);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate <= today) {
        showMessage("Error: Date must be in the future.", "text-danger");
        return false;
    }

    const nameRegex = /^[a-zA-Z0-9 ]+$/;
    if (!nameRegex.test(itemName.value)) {
        itemName.classList.add("is-invalid"); 
        showMessage("Error: Special characters are not allowed.", "text-danger");
        return false;
    } else {
        itemName.classList.remove("is-invalid");
        itemName.classList.add("is-valid");
    }

    const formData = new FormData(form);

    fetch('../Includes/addItem.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        if (data.trim() === "success") {
            localStorage.setItem("newItemName", itemName.value);
            showMessage("Success! Item Added", "text-success");
            form.reset();
            
            setTimeout(() => {
                alert("Data saved to database: " + localStorage.getItem("newItemName"));
            }, 1000);
        } else {
            showMessage("Server error: " + data, "text-danger");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showMessage("Connection failed.", "text-danger");
    });

    return false;
}

function showMessage(text, className) {
    const box = document.getElementById("messageBox");
    if (box) {
        box.innerText = text;
        box.className = "mt-3 p-2 " + className; 
    } else {
        alert(text);
    }
}