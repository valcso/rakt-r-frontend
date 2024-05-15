document.addEventListener("DOMContentLoaded", function() {
    if (window.location.pathname !== '/') {
        setUserDataFromToken();
    }

    if (window.location.pathname == '/backend/index.php') {
        getCustomerNumber();
        lastMonthPurchases();
        getCurrentMonthPurchases();
        getAllTimePurchases();
    }


});


function getCustomerNumber() {

    var loginToken = getCookie('loginToken');

    $.ajax({
        type: "GET",
        url: `${BACKEND_URL}${GET_CUSTOMER_NUMBER}/`,
        contentType: "application/json",
        headers: {
            "Authorization": loginToken 
        },
        success: function(response) {
            $('#number_of_customers').html(response.numberOfCustomers);
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


function lastMonthPurchases() {

    var loginToken = getCookie('loginToken');

    $.ajax({
        type: "GET",
        url: `${BACKEND_URL}${GET_LAST_MONTH_PURCHASE}/`,
        contentType: "application/json",
        headers: {
            "Authorization": loginToken 
        },
        success: function(response) {
            $('#last_month_orders_number').html("Összesen:" + " " + response.numberOfOrdersLastMonth);
            $('#last_month_orders_payment').html(response.priceFormatted);
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


function getCurrentMonthPurchases() {

    var loginToken = getCookie('loginToken');

    $.ajax({
        type: "GET",
        url: `${BACKEND_URL}${GET_CURRENT_MONTH_PURCHASES}/`,
        contentType: "application/json",
        headers: {
            "Authorization": loginToken 
        },
        success: function(response) {
            $('#this_month_orders_number').html("Összesen: " + response.numberOfOrdersThisMonth);
             $('#this_month_orders').html(response.priceFormatted);
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


function getAllTimePurchases() {

    var loginToken = getCookie('loginToken');

    $.ajax({
        type: "GET",
        url: `${BACKEND_URL}${GET_ALL_TIME_PURCHASES}/`,
        contentType: "application/json",
        headers: {
            "Authorization": loginToken 
        },
        success: function(response) {
            $('#all_time_order_number').html("Összesen: " + response.numberOfOrdersAllTime);
             $('#all_time_orders').html(response.priceFormatted);
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





