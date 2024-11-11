document.addEventListener("DOMContentLoaded", () => {
    const userForm = document.getElementById("userForm");
    const userList = document.getElementById("userList");
    const cancelEditButton = document.getElementById("cancelEdit");

    let users = [];
    let isEditing = false;
    let currentUserIndex = null;

    // Helper function to render user list
    const renderUsers = () => {
        userList.innerHTML = "";
        users.forEach((user, index) => {
            const userItem = document.createElement("li");
            userItem.className = "user-item";

            userItem.innerHTML = `
                <p>${user.name} - ${user.email} - ${user.dob}</p>
                <div>
                    <button onclick="editUser(${index})">Edit</button>
                    <button class="delete" onclick="deleteUser(${index})">Delete</button>
                </div>
            `;

            userList.appendChild(userItem);
        });
    };

    // Add or update user
    userForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = userForm.name.value;
        const email = userForm.email.value;
        const dob = userForm.dob.value;

        if (isEditing) {
            users[currentUserIndex] = { name, email, dob };
            isEditing = false;
            currentUserIndex = null;
        } else {
            users.push({ name, email, dob });
        }

        userForm.reset();
        renderUsers();
    });

    // Edit user
    window.editUser = (index) => {
        const user = users[index];
        userForm.name.value = user.name;
        userForm.email.value = user.email;
        userForm.dob.value = user.dob;

        isEditing = true;
        currentUserIndex = index;
    };

    // Delete user
    window.deleteUser = (index) => {
        users.splice(index, 1);
        renderUsers();
    };

    // Cancel edit mode
    cancelEditButton.addEventListener("click", () => {
        isEditing = false;
        currentUserIndex = null;
    });
});
