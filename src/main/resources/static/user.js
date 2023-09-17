const Url = 'http://localhost:8080/api/user';

function getUserPage() {
    fetch(Url)
        .then(response => response.json())
        .then(user => {
            let res = '';
            res +=
                `<tr>
                   <td>${user.id}</td>
                   <td>${user.firstName}</td>
                   <td>${user.lastName}</td>
                   <td>${user.age}</td>
                   <td>${user.username}</td>
                   <td>${user.roles[0].name.substring(5)}</td>
                </tr>`
            document.getElementById('userInfo').innerHTML = res;

        })

}

getUserPage();