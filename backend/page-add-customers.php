
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <title>Raktár</title>
      
      <!-- Favicon -->
      <link rel="shortcut icon" href="../assets/images/favicon.ico" />
      <link rel="stylesheet" href="../assets/css/backend-plugin.min.css">
      <link rel="stylesheet" href="../assets/css/backend.css?v=1.0.0">
      <link rel="stylesheet" href="../assets/vendor/@fortawesome/fontawesome-free/css/all.min.css">
      <link rel="stylesheet" href="../assets/vendor/line-awesome/dist/line-awesome/css/line-awesome.min.css">
      <link rel="stylesheet" href="../assets/vendor/remixicon/fonts/remixicon.css">  </head>
  <body class="  ">
    <!-- loader Start -->
    <div id="loading">
          <div id="loading-center">
          </div>
    </div>
    <!-- loader END -->
    <!-- Wrapper Start -->
    <div class="wrapper">
      
    <div class="iq-sidebar  sidebar-default ">
            <?php include('templates/branding.html'); ?>
          <div class="data-scrollbar" data-scroll="1">
            <?php include('templates/navigation.html'); ?>
          </div>
          </div> 
      <?php include('templates/header_navigation.html'); ?>
    <div class="content-page">
     <div class="container-fluid add-form-list">
        <div class="row">
            <div class="col-sm-12">
                <div class="card">
                    <div class="card-header d-flex justify-content-between">
                        <div class="header-title">
                            <h4 class="card-title">Vásárló létrehozása</h4>
                        </div>
                    </div>
                    <div class="card-body">
                        <form action="page-list-users.html">
                            <div class="row"> 
                                <div class="col-md-6">                      
                                    <div class="form-group">
                                        <label>Teljes név*</label>
                                        <input type="text" class="form-control" placeholder="Irja be a teljes nevet" required id="fullname" >
                                        <div class="help-block with-errors" style="color:red;" id="fullname_error"></div>
                                    </div>
                                </div>    
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Email*</label>
                                        <input type="email" class="form-control" placeholder="Irja be az email cimet" required id="email">
                                        <div class="help-block with-errors" style="color:red;" id="email_error"></div>
                                    </div>
                                </div> 
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Telefonszám*</label>
                                        <input type="text" class="form-control" placeholder="Irja be a telefonszámot" required id="phone">
                                        <div class="help-block with-errors" style="color:red;" id="phone_error"></div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group" id="country_col">
                                    <label>Ország*</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group" id="country_col">
                                    <label>Utca és Házszám*</label>
                                    <input type="text" class="form-control" placeholder="Irja be az utcát és a házszámot" required id="street">
                                    <div class="help-block with-errors" style="color:red;" id="street_error"></div>
                                    </div>
                                </div>   
                                <div class="col-md-6">
                                    <div class="form-group" id="country_col">
                                    <label>Irányitószám*</label>
                                    <input type="text" class="form-control" placeholder="Irja be az irányitószámot" required id="zipcode">
                                    <div class="help-block with-errors" style="color:red;" id="zipcode_error"></div>
                                    </div>
                                </div> 
                                <div class="col-md-6">
                                    <div class="form-group" id="country_col">
                                    <label>Adószám</label>
                                    <input type="text" class="form-control" placeholder="Irja be az adószámot" required id="vat_number">
                                    </div>
                                </div>                                 
                            </div>                            
                            <button type="button" class="btn btn-success mr-2" onclick="validateCreateCustomersForm()">Létrehozás</button>
                            <button type="button" class="btn btn-danger" onclick="window.history.back()">Vissza</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- Page end  -->
    </div>
      </div>
    </div>
    <!-- Wrapper End-->
    <footer class="iq-footer">
            <div class="container-fluid">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-lg-6 text-right">
                            <span class="mr-1"><script>document.write(new Date().getFullYear())</script>©</span> <a href="#" class="">Raktár</a>.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.datatables.net/v/dt/dt-2.0.2/datatables.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="../environment.js"></script>
    <script src="../assets/js/authenticate.js"></script>
    <script src="../assets/js/jwt.js"></script>
    <script src="../assets/js/customer.js"></script>
    <!-- Backend Bundle JavaScript -->
    <script src="../assets/js/backend-bundle.min.js"></script>
    <!-- app JavaScript -->
    <script src="../assets/js/app.js"></script>
  </body>
</html>