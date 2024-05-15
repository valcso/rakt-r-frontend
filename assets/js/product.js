document.addEventListener("DOMContentLoaded", function() {
    if (window.location.pathname !== '/') {
        setUserDataFromToken();
    }

    if (window.location.pathname == '/backend/page-add-product.php') {
        getAllCategory();
    }
    if (window.location.pathname == '/backend/page-update-product.php') {
        getProductData();
        getAllCategory();
     }

    if (window.location.pathname == '/backend/page-list-product.php') {
        getAllProduct();
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


function getProductData() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const productId = urlParams.get('productId');
    var loginToken = getCookie('loginToken');

    $.ajax({
        type: "GET",
        url: `${BACKEND_URL}${CREATE_UPDATE_PRODUCT}/${productId}`,
        contentType: "application/json",
        headers: {
            "Authorization": loginToken 
        },
        success: function(response) {
            $('#name').val(response.title);
            $('#description').val(response.content);
            $('#product_id').val(response._id);
            if(!response.featureImage) {
             $('#cat_image').css('display','none');
            } else {
                $('#cat_image').attr('src',`${response.featureImage}`);
            }
            $('#sku').val(response.SKU);
            $('#qty').val(response.quantity);
            $('#price').val(response.salePrice);
            $('#weight').val(response.weight);
            $('#img_base64').val(response.featureImage);
            selectCategory(response.category._id);
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


const selectCategory = (category) => {
    const selectElement = document.getElementById('pr_cats');

    // Loop through all options to find the matching country
    for (let i = 0; i < selectElement.options.length; i++) {
        if (selectElement.options[i].value === category) {
            // Set the selected attribute to true for the matching country
            selectElement.options[i].selected = true;
            break;
        }
    }
};

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
            appendCategoryToTable(response);
        },
        error: function(xhr, status, error) {
        }
    });
}

function setUserDataFromToken () {
    let token = getCookie('loginToken');
    let decodedToken = decodeJWT(token);
    $('#user_username').html("@" + decodedToken.payload.username);
    $('#user_fullname').html(decodedToken.payload.fullname);
}

function getAllCategory() {
    var loginToken = getCookie('loginToken');

    $.ajax({
        type: "GET",
        url: `${BACKEND_URL}${GET_CATEGORIES}`,
        contentType: "application/json",
        headers: {
            "Authorization": loginToken
        },
        success: function(response) {
            appendCategoryToSelect(response);
        },
        error: function(xhr, status, error) {
            console.error(error);
        }
    });
}

function appendCategoryToSelect(categories) {
    var select = $('#pr_cats');
    select.empty(); // Clear the select before appending new options

    categories.forEach(function(category) {
        select.append(`<option value="${category._id}">${category.name}</option>`);
    });
}



function appendCategoryToTable(products) {
    var tableBody = $('#category_list_table tbody');
    tableBody.empty(); // Clear existing table data
    
    // Iterate through each user and append to the table
    products.forEach(function(product) {
        var row = '<tr>' +
            '<td>' +
            '<div class="checkbox d-inline-block">' +
            '<label for="checkbox2" class="mb-0"></label>' +
            '</div>' +
            '</td>' +
            '<td>' + (product.featureImage ? `<img src="${product.featureImage}" style="width: 60px; height: 60px;">` : '') + '</td>' +
            '<td>' + product.title + '</td>' +
            '<td>' + (product.content ?? '/') + '</td>' +
            '<td>' + (product.category ? product.category.name : '/') + '</td>' + 
            '<td>' + (product.SKU ?? '/') + '</td>' +
            '<td>' + (product.quantity ?? '/') + '</td>' +
            '<td>' + (product.weight ?? '/') + '</td>' +
            '<td>' + (product.salePrice ?? '/') + '</td>' +
            '<td>' +
            '<div class="d-flex align-items-center list-action">' +
            '<a class="badge badge-info mr-2" data-toggle="tooltip" data-placement="top" title="View" href="page-update-product.php?productId='+product._id+'&mode=view"><i class="ri-eye-line mr-0"></i></a>' +
            '<a class="badge bg-success mr-2" data-toggle="tooltip" data-placement="top" title="Edit" href="page-update-product.php?productId='+product._id+'&mode=update"><i class="ri-pencil-line mr-0"></i></a>' +
            '<a class="badge bg-warning mr-2" data-toggle="tooltip" data-placement="top" title="Delete" onclick="deleteProduct(\'' + product._id + '\')"><i class="ri-delete-bin-line mr-0"></i></a>'
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


function validateCreateProduct(method = undefined) {

    let errors = 0;

    if($('#name').val().length < 5) {
        $('#name_error').html("A termék neve minimálisan 5 karakter kell hogy legyen.");
        errors++;
    } else {
        $('#name_error').hide();
    }
    if($('#sku').val().length < 5) {
        $('#sku_error').html("A sku minimálisan 5 karakter kell hogy legyen.");
        errors++;
    }
    else {
        $('#sku_error').html("");
    }


    if ($('#qty').val().trim() === '' || isNaN($('#qty').val().trim()) || $('#qty').val().trim().length > 5) {
        $('#qty_error').html("A darabszám csak szám lehet és legfeljebb 5 karakter hosszú lehet.");
        errors++;
    } else {
        $('#qty_error').html("");
    }


    if ($('#price').val().trim() === '' || isNaN($('#price').val().trim())) {
        $('#price_error').html("Az ár mező csak számot tartalmazhat.");
        errors++;
    } else {
        $('#price_error').html("");
    }


    if ($('#weight').val().trim() === '' || isNaN($('#weight').val().trim())) {
        $('#weight_error').html("Az tömeg mező csak számot tartalmazhat.");
        errors++;
    } else {
        $('#weight_error').html("");
    }


    if(errors == 0) {
        var loginToken = getCookie('loginToken');
        var userData = {
            title: $('#name').val(),
            content: $('#description').val(),
            salePrice: $('#price').val(),
            quantity: $('#qty').val(),
            description: $('#description').val(),
            SKU: $('#sku').val(),
            category : $('#pr_cats').val(),
            featureImage : $('#img_base64').val(),
            weight : $('#weight').val(),
        };
        
        $.ajax({
            type: method == 'update' ? "PUT" : 'POST',
            url: method != 'update' ? `${BACKEND_URL}${CREATE_UPDATE_PRODUCT}` : `${BACKEND_URL}${CREATE_UPDATE_PRODUCT}/${$('#product_id').val()}`,
            contentType: "application/json",
            headers: {
                "Authorization": loginToken 
            },
            data: JSON.stringify(userData),
            success: function(response) {
                Swal.fire({
                    title: "Siker",
                    text: method == 'update' ? "A terméket sikeresen módositottad!" :"A terméket sikeresen létrehoztad!",
                    icon: "success",
                    confirmButtonText: "Vissza az előző oldalra"
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href="/backend/page-list-product.php"
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

function deleteProduct(productId) {

    Swal.fire({
        title: "Biztosan törölni szeretnéd a kiválasztott terméket?",
        text: "Amennyiben a törlésre kattintasz a  termék adatai már nem lesznek visszaállithatóak!",
        icon: "warning",
        showCancelButton: true, // Show cancel button
        confirmButtonText: "Törlés",
        cancelButtonText: "Mégsem" // Set cancel button text
    }).then((result) => {
        if (result.isConfirmed) {
            var loginToken = getCookie('loginToken');

            $.ajax({
                type: "DELETE",
                url: `${BACKEND_URL}${CREATE_UPDATE_PRODUCT}/${productId}`,
                contentType: "application/json",
                headers: {
                    "Authorization": loginToken 
                },
                success: function(response) {
                    Swal.fire({
                        title: "Siker",
                        text: "A termék törölve lett!",
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



