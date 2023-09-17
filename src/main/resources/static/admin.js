const url = 'http://localhost:8080/api/admin/user';
const URL = 'http://localhost:8080/api/admin';

function getUsers() {
    fetch(URL)
        .then(function (res) {
            return res.json()
        })
        .then(users => {
            let response = '';
            for (const user of users) {
                response +=
                    `<tr>
                        <td>${user.id}</td>
                        <td>${user.firstName}</td>
                        <td>${user.lastName}</td>
                        <td>${user.age}</td>
                        <td>${user.username}</td>
                        <td>${user.roles[0].name.substring(5)}</td>
                        <td>
                        <button class="btn-info" type="button" data-toggle="modal"
                        data-target="#editModal" onclick="editModal(${user.id})">Edit</button>
                        </td>
                        <td>
                        <button class="btn-danger" type="button" data-toggle="modal"
                        data-target="#deleteModal" onclick="deleteModal(${user.id})">Delete</button>
                        </td>
                    </tr>`
            }
            document.getElementById('adminId').innerHTML = response;
        })
}

getUsers();

document.addEventListener('DOMContentLoaded', function getAdminInfo() {
    fetch(url)
        .then(res => res.json())
        .then(user => {
            let info = '';
            info +=
                `<tr>
                    <td>${user.id}</td>
                    <td>${user.firstName}</td>
                    <td>${user.lastName}</td>
                    <td>${user.age}</td>
                    <td>${user.username}</td>
                    <td>${user.roles[0].name.substring(5)}</td>
                </tr>`
            document.getElementById('adminInfo').innerHTML = info;
        })
});

function addUser() {
    event.preventDefault();
    const selectRoles = document.getElementById('inputRole');
    let name = document.getElementById('inputName').value;
    let lastName = document.getElementById('inputSurname').value;
    let age = document.getElementById('inputAge').value;
    let username = document.getElementById('inputEmail').value;
    let password = document.getElementById('inputPassword').value;
    let roles = [];
    for (let i = 0; i < selectRoles.options.length; i++) {
        if (selectRoles.options[i].selected) {
            roles.push({
                id: selectRoles.options[i].value, name: 'ROLE_' + selectRoles.options[i].innerHTML,
                authority: 'ROLE_' + selectRoles.options[i].innerHTML
            })
        }
    }
    fetch(URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
            'firstName': name,
            'lastName': lastName,
            'age': age,
            'username': username,
            'password': password,
            'roles': roles
        })
    }).then((response) => {
        if (response.ok) {
            getUsers();
            window.location.reload();
        } else {
            alert('Error' + response.status)
        }

    })
}

function editModal(id) {
    fetch(URL + '/' + id, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(function (response) {
        return response.json();
    }).then(user => {
        document.getElementById('editId').value = user.id;
        document.getElementById('editName').value = user.firstName;
        document.getElementById('editSurname').value = user.lastName;
        document.getElementById('editAge').value = user.age;
        document.getElementById('editEmail').value = user.username;
        document.getElementById('editPassword').value = user.password;
        document.getElementById('editRole').value = user.roles[0].name;

        const select = document.querySelector('#editRole').getElementsByTagName('option');
        for (let i = 0; i < select.length; i++) {
            if (select[i].value === user.roles[0].name)
                select[i].selected = true;
        }
    })
}

function editUser() {
    event.preventDefault();
    const selectRole = document.querySelector('#editRole').getElementsByTagName('option')
    let id = document.getElementById('editId').value
    let firstName = document.getElementById('editName').value
    let lastName = document.getElementById('editSurname').value
    let age = document.getElementById('editAge').value
    let username = document.getElementById('editEmail').value
    let password = document.getElementById('editPassword').value
    let roleName = document.getElementById('editRole').value;
    let role = [];

    for (let i = 0; i < selectRole.length; i++) {
        if (selectRole[i].value === roleName) {
            role.push({id: (roleName === 'ROLE_ADMIN') ? 1 : 2, name: roleName, authority: roleName})
        }
    }
    fetch(URL, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
            'id': id,
            'firstName': firstName,
            'lastName': lastName,
            'age': age,
            'username': username,
            'password': password,
            'roles': role
        })
    }).then((response) => {
        if (response.ok) {
            $('#editModal').hide();
            getUsers();
            window.location.reload();
        } else {
            alert('Error' + response.status)
        }

    })
}

function deleteModal(id) {
    fetch(URL + '/' + id, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(function (response) {
        return response.json();
    }).then(user => {
        document.getElementById('inputID').value = user.id;
        document.getElementById('firstName').value = user.firstName;
        document.getElementById('lastName').value = user.lastName;
        document.getElementById('Age').value = user.age;
        document.getElementById('Email').value = user.username;
        document.getElementById('Role').value = user.roles;
    })
}

function deleteUser() {
    let id = document.getElementById('inputID').value

    fetch(URL + '/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(() => {
        $('#deleteModal').hide();
        getUsers();

    })
}