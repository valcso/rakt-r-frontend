document.addEventListener("DOMContentLoaded", function() {
    if (window.location.pathname !== '/') {
        setUserDataFromToken();
    }

    if (window.location.pathname == '/backend/page-add-purchase.php') {
        getAllCustomer();
        getAllProduct();
        $(document).ready(function() {

            $('#pr_cats').select2();

            $('.js-example-basic-multiple').select2({
                templateResult: function(data) {
                    if (!data.element) {
                        return data.text;
                    }
                    var price = $(data.element).data('price');
                    var $wrapper = $('<span></span>');
                    $wrapper.text(data.text + ' - Ára: ' + price);
                    return $wrapper;
                }
            });

            function calculateTotalPrice() {
                var totalPrice = 0;
                $('.js-example-basic-multiple option:selected').each(function() {
                    var productId = $(this).val(); 
                    var quantity = $('input[name="qty[]"][data-option="' + productId + '"]').val(); 
                    var price = parseFloat($(this).data('price')); 
            
                    totalPrice += parseFloat(quantity) * price;
                });
            
              var formattedPrice = totalPrice.toLocaleString('en-US', { style: 'currency', currency: 'HUF' });
               $('#total_price').text(formattedPrice);
            }

          $(document).on('input', 'input[name="qty[]"]', function() {
             calculateTotalPrice();
          });


// Store product quantities
var productQuantities = {};


$(document).on('input', 'input[name="qty[]"]', function() {
    var productId = $(this).data('option'); 
    var quantity = $(this).val(); 

    productQuantities[productId] = quantity;


    var productName = $('option[value="' + productId + '"]').text();
    $('#product_with_qty p[data-product="' + productId + '"]').text(productName + ' - Quantity: ' + quantity);
});

$('.js-example-basic-multiple').on('change', function() {
    var selectedOptions = $(this).val();
    $('#product_with_qty').empty(); 
    $('#product_qty').empty(); 

    if (selectedOptions) {
        selectedOptions.forEach(function(option) {
            var quantity = productQuantities[option] || 1; 
            var input = $('<input type="number" style="width:60px; margin-right:10px;" name="qty[]" value="' + quantity + '" min="1" data-option="' + option + '">');
            $('#product_qty').append(input);

            var productName = $('option[value="' + option + '"]').text(); 
            $('#product_with_qty').append('<p data-product="' + option + '">' + productName + ' - Quantity: ' + quantity + '</p>');

            calculateTotalPrice();
        });
    } else {
        $('#product_with_qty').append('<p>No product selected</p>');
    }
});



});
    }
    if (window.location.pathname == '/backend/page-update-purchase.php') {
        getOrder();
     }

    if (window.location.pathname == '/backend/page-list-purchase.php') {
        getAllPurchase();
    }

    if (window.location.pathname == '/backend/page-add-product.php' || window.location.pathname == '/backend/page-update-product.php') {
       // Get references to the file input and image elements
const imageInput = document.getElementById('imageInput');
const imagePreview = document.getElementById('imagePreview');

// Add event listener to the file input
imageInput.addEventListener('change', function(event) {
    // Get the selected file
    const file = event.target.files[0];
    
    // Check if a file is selected
    if (file) {
        // Create a FileReader object
        const reader = new FileReader();

                // Validate the file type
         if (!file.type.startsWith('image/')) {
            // If the selected file is not an image, show an error message
            alert('Please select an image file.');
            return;
        }

        // Set the image source when the file is loaded
        reader.onload = function(event) {
            imagePreview.src = event.target.result;
            imagePreview.style.display = 'block'; // Show the image
            imagePreview.width = 200; // Set width to 200 pixels
            imagePreview.height = 200; // Set height to 200 pixels

            const base64data = event.target.result;

            // Display the Base64 data URI (for demonstration)
            $("#img_base64").val(base64data);
        };

        // Read the selected file as a data URL
        reader.readAsDataURL(file);
    } else {
        // If no file is selected, hide the image
        imagePreview.src = '#';
        imagePreview.style.display = 'none';
    }
});
    }

});


function getAllProduct () {
    var loginToken = getCookie('loginToken');

    $.ajax({
        type: "GET",
        url: `${BACKEND_URL}${GET_PRODUCTS}`,
        contentType: "application/json",
        headers: {
            "Authorization": loginToken 
        },
        success: function(response) {
            appendProductsToSelect(response);
        },
        error: function(xhr, status, error) {
        }
    });
}


function getAllCustomer() {
    var loginToken = getCookie('loginToken');

    $.ajax({
        type: "GET",
        url: `${BACKEND_URL}${GET_ALL_CUSTOMERS}`,
        contentType: "application/json",
        headers: {
            "Authorization": loginToken
        },
        success: function(response) {
            appendCustomerToSelect(response);
        },
        error: function(xhr, status, error) {
            console.error(error);
        }
    });
}

function appendCustomerToSelect(categories) {
    var select = $('#pr_cats');
    select.empty(); // Clear the select before appending new options

    categories.forEach(function(category) {
        select.append(`<option value="${category._id}">${category.fullname}</option>`);
    });
}

function getAllPurchase () {
    var loginToken = getCookie('loginToken');

    $.ajax({
        type: "GET",
        url: `${BACKEND_URL}${GET_ORDERS}`,
        contentType: "application/json",
        headers: {
            "Authorization": loginToken 
        },
        success: function(response) {
            appendPurchaseToTable(response);
        },
        error: function(xhr, status, error) {
        }
    });
}

function appendProductsToSelect(categories) {
    var select = $('#product_select');
    select.empty(); // Clear the select before appending new options

    categories.forEach(function(category) {
        select.append(`<option value="${category._id}" data-price=${category.salePrice}>${category.title}</option>`);
    });
}


function setUserDataFromToken () {
    let token = getCookie('loginToken');
    let decodedToken = decodeJWT(token);
    $('#user_username').html("@" + decodedToken.payload.username);
    $('#user_fullname').html(decodedToken.payload.fullname);
}

function appendPurchaseToTable(orders) {
    var tableBody = $('#category_list_table tbody');
    tableBody.empty(); // Clear existing table data
    
    orders.forEach(function(order) {
        // Determine content based on payment status
        var paymentStatus = order.isPayed ? 'Kifizetve' : 'Nincs kifizetve';
        // Determine background color based on payment status
        var bgColor = order.isPayed ? 'green' : 'red';
    
        var productList = order.order.map(item => {
            const product = item.product_id; // Get the product_id
            if (product) { // Check if product_id exists
                return `${product.title} (${item.quantity})`; // Access nested property safely
            } else {
                return ''; // Return an empty string if product_id does not exist
            }
        }).join(', ');
    
        var row = '<tr>' +
        '<td>' +
        '<div class="checkbox d-inline-block">' +
        '<label for="checkbox2" class="mb-0"></label>' +
        '</div>' +
        '</td>' +
        '<td>' + order.orderNumber + '</td>' +
        '<td>' + order.status + '</td>' +
        '<td style="color: ' + bgColor + ';">' + paymentStatus + '</td>' +
        '<td>' + (order.customer_id.fullname || '/') + '</td>' + 
        '<td>' + productList + '</td>' +
        '<td>' + (order.deliveryAddress[0].street || '/') + ', ' + (order.deliveryAddress[0].zipcode || '/') + ' ' + (order.deliveryAddress[0].city || '/') + '</td>' +
        '<td>' + (order.comment || '/') + '</td>' +
        '<td>' + (order.totalPrice || '/') + '</td>' +
        '<td>' +
        '<div class="d-flex align-items-center list-action">' +
        '<button class="badge badge-danger mr-2" style="border:none;" onclick="generateInvoice(\'' + order._id + '\')" data-toggle="tooltip" data-placement="top" title="View">Számla létrehozása</button>' +
        '<a class="badge bg-success mr-2" data-toggle="tooltip" data-placement="top" title="Edit" href="page-update-purchase.php?purchaseId=' + order._id + '&mode=update"><i class="ri-pencil-line mr-0"></i></a>' +
        '</div>' +
        '</td>' +
        '</tr>';
    tableBody.append(row);
    
    
    });


    $('#category_list_table').DataTable({
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

function generateInvoice(order_id) {
    var loginToken = getCookie('loginToken');
    $.ajax({
        type: 'GET',
        url: `${BACKEND_URL}${GET_INVOICE}/${order_id}`,
        contentType: "application/json",
        headers: {
            "Authorization": loginToken 
        },
        responseType: 'arraybuffer', 
        success: function(response) {
 
            var binaryData = atob(response.message);
            var arrayBuffer = new ArrayBuffer(binaryData.length);
            var uint8Array = new Uint8Array(arrayBuffer);
            for (var i = 0; i < binaryData.length; i++) {
                uint8Array[i] = binaryData.charCodeAt(i);
            }
            var blob = new Blob([uint8Array], { type: 'application/pdf' });
            var url = window.URL.createObjectURL(blob);

            var a = document.createElement('a');
            a.href = url;
            a.download = 'invoice.pdf';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            Swal.fire({
                title: "Siker",
                text: "A számla automatikusan letöltésre kerül.",
                icon: "success",
                confirmButtonText: "OK"
            }).then((result) => {
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


function validateCreatePurchase(method = undefined) {

    let errors = 0;

    if(errors == 0) {
        var loginToken = getCookie('loginToken');
        var data = {
             status : $('#status').val(),
             isPayed : $('#payment').val()
        }

            
        $.ajax({
            type: method == 'update' ? "PUT" : 'POST',
            url: method != 'update' ? `${BACKEND_URL}${CREATE_UPDATE_ORDER}` : `${BACKEND_URL}${CREATE_UPDATE_ORDER}/${$('#purchase_id').val()}`,
            contentType: "application/json",
            headers: {
                "Authorization": loginToken 
            },
            data: JSON.stringify(data),
            success: function(response) {
                Swal.fire({
                    title: "Siker",
                    text: method == 'update' ? "A megrendelést sikeresen módositottad!" :"A megrendelést sikeresen létrehoztad!",
                    icon: "success",
                    confirmButtonText: "Vissza az előző oldalra"
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href="/backend/page-list-purchase.php"
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

function getOrder() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const userId = urlParams.get('purchaseId');
    var loginToken = getCookie('loginToken');

    $.ajax({
        type: "GET",
        url: `${BACKEND_URL}${CREATE_UPDATE_ORDER}/${userId}`,
        contentType: "application/json",
        headers: {
            "Authorization": loginToken 
        },
        success: function(response) {
            // Assuming response.status contains the status information
            var status = response.status;
            var payment = response.isPayed ? 1 : 0;

            // Set the selected option in the select element with id "status"
            $('#status option[value="' + status + '"]').prop('selected', true);
            $('#payment option[value="' + payment + '"]').prop('selected', true);
            $('#purchase_id').val(response._id);
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




