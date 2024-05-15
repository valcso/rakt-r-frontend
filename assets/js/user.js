document.addEventListener("DOMContentLoaded", function() {
    if (window.location.pathname !== '/') {
        setUserDataFromToken();
    }
    if (window.location.pathname == '/backend/page-list-users.php') {
        getAllUsers();
    }
    if (window.location.pathname == '/backend/page-update-user.php') {
        getUserData();
    }
});

function setUserDataFromToken () {
    let token = getCookie('loginToken');
    let decodedToken = decodeJWT(token);
    $('#user_username').html("@" + decodedToken.payload.username);
    $('#user_fullname').html(decodedToken.payload.fullname);
}

function getAllUsers () {
    var loginToken = getCookie('loginToken');

    $.ajax({
        type: "GET",
        url: `${BACKEND_URL}${GET_ALL_USERS}`,
        contentType: "application/json",
        headers: {
            "Authorization": loginToken 
        },
        success: function(response) {
            appendUsersToTable(response);
        },
        error: function(xhr, status, error) {
        }
    });
}


function appendUsersToTable(users) {
    var tableBody = $('#users_list_table tbody');
    tableBody.empty(); 
    
    users.forEach(function(user) {
        var row = '<tr>' +
            '<td>' +
            '<div class="checkbox d-inline-block">' +
            '<label for="checkbox2" class="mb-0"></label>' +
            '</div>' +
            '</td>' +
            '<td>' + user.fullname + '</td>' +
            '<td>' + user.username + '</td>' +
            '<td>' + user.createdAt + '</td>' +
            '<td>' +
            '<div class="d-flex align-items-center list-action">' +
            '<a class="badge badge-info mr-2" data-toggle="tooltip" data-placement="top" title="View" href="page-update-user.php?userId='+user._id+'&mode=view"><i class="ri-eye-line mr-0"></i></a>' +
            '<a class="badge bg-success mr-2" data-toggle="tooltip" data-placement="top" title="Edit" href="page-update-user.php?userId='+user._id+'&mode=update"><i class="ri-pencil-line mr-0"></i></a>' +
            '<a class="badge bg-warning mr-2" data-toggle="tooltip" data-placement="top" title="Delete" onclick="deleteUser(\'' + user._id + '\')"><i class="ri-delete-bin-line mr-0"></i></a>'
            '</div>' +
            '</td>' +
            '</tr>';
        tableBody.append(row);
    });

    $('#users_list_table').DataTable({
        "language": {
            "paginate": {
                "next": "Következő",
                "previous": "Előző"
            },
            "lengthMenu": "Mutass _MENU_ találatot",
            "search": "Keresés",
            "info": ""
        }
    });
}


function validateCreateUserForm(method = undefined) {

    let errors = 0;

    if($('#username').val().length < 5) {
        $('#username_error').html("A felhasználónév minimálisan 5 karakter kell hogy legyen.");
        errors++;
    } else {
        $('#username_error').hide();
    }
    if($('#fullname').val().length < 5) {
        $('#fullname_error').html("A teljes név minimálisan 5 karakter kell hogy legyen.");
        errors++;
    }
    else {
        $('#fullname_error').html("");
    }
// Check if password is required and meets length requirements
    if ($('#password').val().length > 0 && $('#password').val().length < 8 && method !== 'update') {
       $('#password_error').html("A jelszónak legalább 8 karakter hosszúnak kell lennie.");
       errors++;
    } else {
       $('#password_error').html(""); // Clear password error message if no issues
    }


    if(errors == 0) {
        var loginToken = getCookie('loginToken');
        var userData = {
            username: $('#username').val(),
            fullname: $('#fullname').val(),
        };

        if(method !== 'update') {
            userData.password = $('#password').val();
        } else if (method == 'update' && $('#password').val().length > 0) {
            userData.password = $('#password').val();
        }

        $.ajax({
            type: method == 'update' ? "PUT" : 'POST',
            url: method != 'update' ? `${BACKEND_URL}${CREATE_USER}` : `${BACKEND_URL}${CREATE_USER}/${$('#user_id').val()}`,
            contentType: "application/json",
            headers: {
                "Authorization": loginToken 
            },
            data: JSON.stringify(userData),
            success: function(response) {
                Swal.fire({
                    title: "Siker",
                    text: method == 'update' ? "A felhasználót sikeresen módositottad!" :"A felhasználót sikeresen létrehoztad!",
                    icon: "success",
                    confirmButtonText: "Vissza az előző oldalra"
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href="/backend/page-list-users.php"
                    }
                });
            },
            error: function(xhr, status, error) {
                try {
                    var response = JSON.parse(xhr.responseText);
                } catch (e) {
                    var response = 'Hiba történt kérjük próbáld újra';
                }

                Swal.fire({
                    title: "Hiba történt",
                    text: response.message,
                    icon: "error",
                });
            }
        });
    }

}

function getUserData() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const userId = urlParams.get('userId');
    var loginToken = getCookie('loginToken');

    $.ajax({
        type: "GET",
        url: `${BACKEND_URL}${CREATE_USER}/${userId}`,
        contentType: "application/json",
        headers: {
            "Authorization": loginToken 
        },
        success: function(response) {
            $('#username').val(response.username);
            $('#fullname').val(response.fullname);
            $('#user_id').val(response._id);
        },
        error: function(xhr, status, error) {
            try {
                var response = JSON.parse(xhr.responseText);
            } catch (e) {
                var response = 'Hiba történt kérjük próbáld újra';
            }

            Swal.fire({
                title: "Hiba történt",
                text: response.message,
                icon: "error",
            });
        }
    });

}

function deleteUser(userId) {

    Swal.fire({
        title: "Biztosan törölni szeretnéd a kiválasztott felhasználót?",
        text: "Amennyiben a törlésre kattintasz a  felhasználó adatai már nem lesznek visszaállithatóak!",
        icon: "warning",
        showCancelButton: true, // Show cancel button
        confirmButtonText: "Törlés",
        cancelButtonText: "Mégsem" // Set cancel button text
    }).then((result) => {
        if (result.isConfirmed) {
            var loginToken = getCookie('loginToken');

            $.ajax({
                type: "DELETE",
                url: `${BACKEND_URL}${CREATE_USER}/${userId}`,
                contentType: "application/json",
                headers: {
                    "Authorization": loginToken 
                },
                success: function(response) {
                    Swal.fire({
                        title: "Siker",
                        text: "A felhasználó törölve lett!",
                        icon: "success",
                        confirmButtonText: "Tovább"
                    }).then((result) => {
                        window.location.reload();
                    });
                },
                error: function(xhr, status, error) {
                    try {
                        var response = JSON.parse(xhr.responseText);
                    } catch (e) {
                        var response = 'Hiba történt kérjük próbáld újra';
                    }
        
                    Swal.fire({
                        title: "Hiba történt",
                        text: response.message,
                        icon: "error",
                    });
                }
            });
        }
    });
    
}



