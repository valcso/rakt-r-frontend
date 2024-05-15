document.addEventListener("DOMContentLoaded", function() {
    if (window.location.pathname !== '/') {
        validateToken();
        validateToken(true);
    }
    if (window.location.pathname == '/backend/page-list-users.php') {
        validateToken(true);
    }
    if (window.location.pathname == '/backend/page-update-user.php') {
        validateToken(true);
    }
});


function attemptLogin() {
    var username = $("#username").val();
    var password = $("#password").val();
    $.cookie('name', 'value', { expires: 7, path: '/' });
    document.cookie = "username=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
    if (password.length > 0 && username.length > 0) {
        var data = {
            username: username,
            password: password
        };

        $.ajax({
            type: "POST",
            url: `${BACKEND_URL}/login`,
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function(response) {
                try {
                    document.cookie = "loginToken="+response.token+"";
                    document.cookie = "loggedIn="+true+"";
                    window.location.href = 'backend/index.php';
                } catch (e) {
                    console.log(e);
                    $('#login_error').html(e);
                }
            },
            error: function(xhr, status, error) {
                try {
                    var response = JSON.parse(xhr.responseText);
                    $('#login_error').html(response.message);
                } catch (e) {
                    $('#login_error').html("Hiba történt.");
                }
            }
        });
    }
}

function validateToken(isAdmin = false) {
    var loginToken = getCookie('loginToken');

    let url = isAdmin ?  `${BACKEND_URL}${VALIDATE_TOKEN}?isAdmin=true` :  `${BACKEND_URL}${VALIDATE_TOKEN}`;
    $.ajax({
        type: "POST",
        url: url,
        contentType: "application/json",
        headers: {
            "Authorization": loginToken 
        },
        success: function(response) {
        },
        error: function(xhr, status, error) {
            if(!isAdmin) {
                document.cookie = "loggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                document.cookie = "loginToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                if (window.location.pathname !== '/') {
                window.location.href = "/";
                }
            } else {
                if (window.location.pathname !== '/backend/index.php') {
                   window.location.href = "/backend/index.php";
                }
                $('#users_li_nav').hide();
            }
        }
    });
}

function logOut() {
    document.cookie = "loggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "loginToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/";
}


function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) {
        return parts.pop().split(";").shift();
    }
}
