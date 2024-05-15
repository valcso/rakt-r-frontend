document.addEventListener("DOMContentLoaded", function() {
    if (window.location.pathname !== '/') {
        setUserDataFromToken();
    }
    if (window.location.pathname == '/backend/page-list-category.php') {
        getAllCategory();
     }
     if (window.location.pathname == '/backend/page-update-category.php') {
        getCategoryData();
     }
    if (window.location.pathname == '/backend/page-add-category.php' || window.location.pathname == '/backend/page-update-category.php') {

    const imageInput = document.getElementById('imageInput');
    const imagePreview = document.getElementById('imagePreview');


imageInput.addEventListener('change', function(event) {

    const file = event.target.files[0];
    
    if (file) {

        const reader = new FileReader();

         if (!file.type.startsWith('image/')) {
            alert('Kérjük válasszon képet');
            return;
        }

        reader.onload = function(event) {
            imagePreview.src = event.target.result;
            imagePreview.style.display = 'block'; 
            imagePreview.width = 200; 
            imagePreview.height = 200; 

            const base64data = event.target.result;
            $("#img_base64").val(base64data);
        };

        reader.readAsDataURL(file);
    } else {
        imagePreview.src = '#';
        imagePreview.style.display = 'none';
    }
});
    }

});


function setUserDataFromToken () {
    let token = getCookie('loginToken');
    let decodedToken = decodeJWT(token);
    $('#user_username').html("@" + decodedToken.payload.username);
    $('#user_fullname').html(decodedToken.payload.fullname);
}

function getAllCategory () {
    var loginToken = getCookie('loginToken');

    $.ajax({
        type: "GET",
        url: `${BACKEND_URL}${GET_CATEGORIES}`,
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


function appendCategoryToTable(categories) {
    var tableBody = $('#category_list_table tbody');
    tableBody.empty(); // Clear existing table data
    
    // Iterate through each user and append to the table
    categories.forEach(function(category) {
        var row = '<tr>' +
            '<td>' +
            '<div class="checkbox d-inline-block">' +
            '<label for="checkbox2" class="mb-0"></label>' +
            '</div>' +
            '</td>' +
            '<td>' + (category.imageBase64 ? `<img src="${category.imageBase64}" style="width: 60px; height: 60px;">` : '') + '</td>' +
            '<td>' + category.name + '</td>' +
            '<td>' + (category.description ?? '/') + '</td>' +
            '<td>' +
            '<div class="d-flex align-items-center list-action">' +
            '<a class="badge badge-info mr-2" data-toggle="tooltip" data-placement="top" title="View" href="page-update-category.php?categoryId='+category._id+'&mode=view"><i class="ri-eye-line mr-0"></i></a>' +
            '<a class="badge bg-success mr-2" data-toggle="tooltip" data-placement="top" title="Edit" href="page-update-category.php?categoryId='+category._id+'&mode=update"><i class="ri-pencil-line mr-0"></i></a>' +
            '<a class="badge bg-warning mr-2" data-toggle="tooltip" data-placement="top" title="Delete" onclick="deleteCategory(\'' + category._id + '\')"><i class="ri-delete-bin-line mr-0"></i></a>'
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


function validateCreateCategory(method = undefined) {

    let errors = 0;

    if($('#name').val().length < 1) {
        $('#fullname_error').html("A név nem lehet üres.");
        errors++;
    } else {
        $('#fullname_error').hide();
    }

    if(errors == 0) {
        var loginToken = getCookie('loginToken');
        var userData = {
            name: $('#name').val(),
            description: $('#description').val(),
            imageBase64 : $('#img_base64').val()
        };

        $.ajax({
            type: method == 'update' ? "PUT" : 'POST',
            url: method != 'update' ? `${BACKEND_URL}${CREATE_CATEGORY}` : `${BACKEND_URL}${CREATE_CATEGORY}/${$('#category_id').val()}`,
            contentType: "application/json",
            headers: {
                "Authorization": loginToken 
            },
            data: JSON.stringify(userData),
            success: function(response) {
                Swal.fire({
                    title: "Siker",
                    text: method == 'update' ? "A kategóriát sikeresen módositottad!" :"A kategóriát sikeresen létrehoztad!",
                    icon: "success",
                    confirmButtonText: "Vissza az előző oldalra"
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href="/backend/page-list-category.php"
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

function getCategoryData() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const categoryId = urlParams.get('categoryId');
    var loginToken = getCookie('loginToken');

    $.ajax({
        type: "GET",
        url: `${BACKEND_URL}${CREATE_CATEGORY}/${categoryId}`,
        contentType: "application/json",
        headers: {
            "Authorization": loginToken 
        },
        success: function(response) {
            $('#name').val(response.name);
            $('#description').val(response.description);
            $('#category_id').val(response._id);
            $('#cat_image').attr('src',`${response.imageBase64}`);
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

function deleteCategory(categoryId) {

    Swal.fire({
        title: "Biztosan törölni szeretnéd a kiválasztott kategóriát?",
        text: "Amennyiben a törlésre kattintasz a  kategória adatai már nem lesznek visszaállithatóak!",
        icon: "warning",
        showCancelButton: true, // Show cancel button
        confirmButtonText: "Törlés",
        cancelButtonText: "Mégsem" // Set cancel button text
    }).then((result) => {
        if (result.isConfirmed) {
            var loginToken = getCookie('loginToken');

            $.ajax({
                type: "DELETE",
                url: `${BACKEND_URL}${CREATE_CATEGORY}/${categoryId}`,
                contentType: "application/json",
                headers: {
                    "Authorization": loginToken 
                },
                success: function(response) {
                    Swal.fire({
                        title: "Siker",
                        text: "A kategória törölve lett!",
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



