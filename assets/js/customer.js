document.addEventListener("DOMContentLoaded", function() {
    if (window.location.pathname !== '/') {
        setUserDataFromToken();
    }
    if (window.location.pathname == '/backend/page-list-customers.php') {
        getAllCustomer();
    }

    if (window.location.pathname == '/backend/page-add-customers.php') {
        generateCountries();
     }

    if (window.location.pathname == '/backend/page-update-customer.php') {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const mode = urlParams.get('mode');
        if(mode !== 'view') {
            generateCountries();
        }
        getCustomerData();
    }
});


const selectCountry = (country) => {
    const selectElement = document.getElementById('countries');

    // Loop through all options to find the matching country
    for (let i = 0; i < selectElement.options.length; i++) {
        if (selectElement.options[i].value === country) {
            // Set the selected attribute to true for the matching country
            selectElement.options[i].selected = true;
            break;
        }
    }
};

function generateCountries () {

    const countries = [
        "Magyarország", "Afganisztán", "Albánia", "Algéria", "Andorra", "Angola", "Antigua és Barbuda", "Argentína", "Ausztrália", "Ausztria",
        "Azerbajdzsán", "Bahama-szigetek", "Bahrein", "Banglades", "Barbados", "Beliz", "Belgium", "Benin", "Bhután", "Bolívia",
        "Bosznia-Hercegovina", "Botswana", "Brazília", "Brunei", "Bulgária", "Burkina Faso", "Burundi", "Cape Verde", "Chile", "Comore-szigetek",
        "Cook-szigetek", "Costa Rica", "Csehország", "Dánia", "Djibouti", "Dominica", "Dominikai Köztársaság", "Dél-Afrika", "Dél-Korea",
        "Dél-Szudán", "Egyenlítői-Guinea", "Egyesült Arab Emírségek", "Egyesült Királyság", "Egyesült Államok", "Egyiptom", "Elefántcsontpart",
        "Eritrea", "Észak-Korea", "Észak-Macedónia", "Észtország", "Etiópia", "Fehéroroszország", "Fidzsi-szigetek", "Finnország", "Franciaország",
        "Fülöp-szigetek", "Gabon", "Gambia", "Georgia", "Ghána", "Grenada", "Grúzia", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti",
        "Hollandia", "Honduras", "Horvátország", "India", "Indonézia", "Irak", "Irán", "Izland", "Izrael", "Jamaica", "Japán", "Jemen", "Jordánia",
        "Kambodzsa", "Kamerun", "Kanada", "Katar", "Kazahsztán", "Kelet-Timor", "Kenya", "Kína", "Kirgizisztán", "Kiribati", "Kolumbia", "Kongó",
        "Kuba", "Kuvait", "Laosz", "Lengyelország", "Lesotho", "Lettország", "Libanon", "Libéria", "Liechtenstein", "Litvánia", "Luxemburg", "Macedónia",
        "Madagaszkár", "Malawi", "Malaysia", "Maldív-szigetek", "Mali", "Malta", "Marokkó", "Marshall-szigetek", "Mauritánia", "Mauritius", "Mexikó",
        "Mikronézia", "Moldova", "Monaco", "Mongólia", "Montenegró", "Mozambik", "Namíbia", "Nauru", "Nepál", "Nicaragua", "Niger", "Nigéria",
        "Norvégia", "Olaszország", "Omán", "Oroszország", "Pakisztán", "Palau", "Palesztina", "Panama", "Pápua Új-Guinea", "Paraguay", "Peru",
        "Portugália", "Románia", "Ruanda", "Saint Kitts és Nevis", "Saint Lucia", "Saint Vincent és a Grenadine-szigetek", "Salamon-szigetek",
        "Svájc", "Svédország", "Szamoa", "Szaúd-Arábia", "Szenegál", "Szerbia", "Szingapúr", "Szíria", "Szlovákia", "Szlovénia", "Szomália",
        "Szudán", "Szváziföld", "Tadzsikisztán", "Tanzánia", "Thaiföld", "Togo", "Tonga", "Trinidad és Tobago", "Tunézia", "Türkmenisztán",
        "Tuvalu", "Törökország", "Uganda", "Ukrajna", "Uruguay", "Üzbegisztán", "Vanuatu", "Vatikánváros", "Venezuela", "Vietnam", "Zambia",
        "Zimbabwe"
    ];

    const selectCountries = generateSelectOptions(countries);
    document.getElementById('country_col').appendChild(selectCountries);

}

const generateSelectOptions = (countries) => {
    const select = document.createElement('select');
    select.setAttribute('id', 'countries');
    select.classList.add('form-control');

    countries.forEach(country => {
        const option = document.createElement('option');
        option.setAttribute('value', country);
        option.textContent = country;
        select.appendChild(option);
    });

    return select;
};

function setUserDataFromToken () {
    let token = getCookie('loginToken');
    let decodedToken = decodeJWT(token);
    $('#user_username').html("@" + decodedToken.payload.username);
    $('#user_fullname').html(decodedToken.payload.fullname);
}

function getAllCustomer () {
    var loginToken = getCookie('loginToken');

    $.ajax({
        type: "GET",
        url: `${BACKEND_URL}${GET_ALL_CUSTOMERS}`,
        contentType: "application/json",
        headers: {
            "Authorization": loginToken 
        },
        success: function(response) {
            appendCustomersToTable(response);
        },
        error: function(xhr, status, error) {
        }
    });
}


function appendCustomersToTable(customers) {
    var tableBody = $('#customers_list_table tbody');
    tableBody.empty(); // Clear existing table data
    
    // Iterate through each user and append to the table
    customers.forEach(function(customer) {
        var row = '<tr>' +
            '<td>' +
            '<div class="checkbox d-inline-block">' +
            '<label for="checkbox2" class="mb-0"></label>' +
            '</div>' +
            '</td>' +
            '<td>' + customer.fullname + '</td>' +
            '<td>' + (customer.email ?? '/') + '</td>' +
            '<td>' + customer.phone_number + '</td>' +
            '<td>' + customer.address.country + ', ' + customer.address.street + ', ' + customer.address.zipcode + '</td>' +
            '<td>' + (customer.vat_number ?? '/') + '</td>' +
            '<td>' + customer.number_of_orders + '</td>' +
            '<td>' +
            '<div class="d-flex align-items-center list-action">' +
            '<a class="badge badge-info mr-2" data-toggle="tooltip" data-placement="top" title="View" href="page-update-customer.php?customerId='+customer._id+'&mode=view"><i class="ri-eye-line mr-0"></i></a>' +
            '<a class="badge bg-success mr-2" data-toggle="tooltip" data-placement="top" title="Edit" href="page-update-customer.php?customerId='+customer._id+'&mode=update"><i class="ri-pencil-line mr-0"></i></a>' +
            '<a class="badge bg-warning mr-2" data-toggle="tooltip" data-placement="top" title="Delete" onclick="deleteCustomer(\'' + customer._id + '\')"><i class="ri-delete-bin-line mr-0"></i></a>'
            '</div>' +
            '</td>' +
            '</tr>';
        tableBody.append(row);
    });

    $('#customers_list_table').DataTable({
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


function validateCreateCustomersForm(method = undefined) {

    let errors = 0;
    alert(method);

    if($('#phone').val().length < 1) {
        $('#phone_error').html("A telefonszám mező nem maradhat üres.");
        errors++;
    } else {
        $('#phone_error').html("");
    }
    if($('#fullname').val().length < 5) {
        $('#fullname_error').html("A teljes név mező nem maradhat üres.");
        errors++;
    }
    else {
        $('#fullname_error').html("");
    }
    if($('#street').val().length < 1) {
        $('#street_error').html("Az utca és házszám mező nem maradhat üres.");
        errors++;
    }
    else {
        $('#street_error').html("");
    }
    if($('#zipcode').val().length < 1) {
        $('#zipcode_error').html("Az irányitószám mező nem maradhat üres.");
        errors++;
    }
    else {
        $('#zipcode_error').html("");
    }

    if(errors == 0) {
        var loginToken = getCookie('loginToken');
        var address = {
            country : $('#countries').val(),
            zipcode : $('#zipcode').val(),
            street : $('#street').val(),
        };
        var customerData = {
            email: $('#email').val(),
            fullname: $('#fullname').val(),
            phone_number: $('#phone').val(),
            address : address
        };

        $.ajax({
            type: method == 'update' ? "PUT" : "POST",
            url: method != 'update' ? `${BACKEND_URL}${CREATE_CUSTOMER}` : `${BACKEND_URL}${CREATE_CUSTOMER}/${$('#user_id').val()}`,
            contentType: "application/json",
            headers: {
                "Authorization": loginToken 
            },
            data: JSON.stringify(customerData),
            success: function(response) {
                Swal.fire({
                    title: "Siker",
                    text: method == 'update' ? "A vásárlót sikeresen módositottad!" : "A vásárlót sikeresen létrehoztad!",
                    icon: "success",
                    confirmButtonText: "Vissza az előző oldalra"
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href="/backend/page-list-customers.php"
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

function getCustomerData() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const userId = urlParams.get('customerId');
    const mode = urlParams.get('mode');

    var loginToken = getCookie('loginToken');

    $.ajax({
        type: "GET",
        url: `${BACKEND_URL}${CREATE_CUSTOMER}/${userId}`,
        contentType: "application/json",
        headers: {
            "Authorization": loginToken 
        },
        success: function(response) {
            if(mode !== 'view') {
                selectCountry(response.address.country);
            }
            $('#fullname').val(response.fullname);
            $('#email').val(response.email);
            $('#phone').val(response.phone_number);
            $('#street').val(response.address.street);
            $('#zipcode').val(response.address.zipcode);
            $('#vat_number').val(response.address.vat_number);
            $('#user_id').val(response._id);
            $('#countryText').val(response.address.country);
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

function deleteCustomer(customerId) {

    Swal.fire({
        title: "Biztosan törölni szeretnéd a kiválasztott vásárlót?",
        text: "Amennyiben a törlésre kattintasz a  vásárló adatai már nem lesznek visszaállithatóak, viszont a rendelései megmaradnak!",
        icon: "warning",
        showCancelButton: true, // Show cancel button
        confirmButtonText: "Törlés",
        cancelButtonText: "Mégsem" // Set cancel button text
    }).then((result) => {
        if (result.isConfirmed) {
            var loginToken = getCookie('loginToken');

            $.ajax({
                type: "DELETE",
                url: `${BACKEND_URL}${CREATE_CUSTOMER}/${customerId}`,
                contentType: "application/json",
                headers: {
                    "Authorization": loginToken 
                },
                success: function(response) {
                    Swal.fire({
                        title: "Siker",
                        text: "A vásárló törölve lett!",
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



