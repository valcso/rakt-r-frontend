

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
             <?php  include('templates/navigation.html'); ?>
          </div>
          </div>
            <?php include('templates/header_navigation.html'); ?>
     <div class="content-page">
     <div class="container-fluid">
        <div class="row">
            <div class="col-lg-8">
                <div class="row">
                    <div class="col-12">
                        <h4>Statisztikai összefoglaló</h4>
                    </div>
                    <div class="col-lg-4 col-md-4">
                        <div class="card card-block card-stretch card-height">
                            <div class="card-body">
                                <div class="d-flex align-items-center mb-4 card-total-sale">
                                    <div>
                                        <p class="mb-2">Vásárlók száma</p>
                                        <h4 id="number_of_customers"></h4>
                                    </div>
                                </div>                                
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-4">
                        <div class="card card-block card-stretch card-height">
                            <div class="card-body">
                                <div class="d-flex align-items-center mb-4 card-total-sale">
                                    <div>
                                        <p class="mb-2">Vásárlások a múlt hónapban</p>
                                        <h4 id="last_month_orders_number"></h4>
                                        <h4 id="last_month_orders_payment"></h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-4">
                        <div class="card card-block card-stretch card-height">
                            <div class="card-body">
                                <div class="d-flex align-items-center mb-4 card-total-sale">
                                    <div>
                                        <p class="mb-2">Vásárlások ebben a hónapban</p>
                                        <h4 id="this_month_orders_number"></h4>
                                        <h4 id="this_month_orders"></h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-4">
                        <div class="card card-block card-stretch card-height">
                            <div class="card-body">
                                <div class="d-flex align-items-center mb-4 card-total-sale">
                                    <div>
                                        <p class="mb-2">Összes vásárlás</p>
                                        <h4 id="all_time_order_number"></h4>
                                        <h4 id="all_time_orders"></h4>
                                    </div>
                                </div>
                            </div>
                        </div>
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
    <script src="../environment.js"></script>
    <script src="../assets/js/authenticate.js"></script>
    <script src="../assets/js/jwt.js"></script>
    <script src="../assets/js/user.js"></script>
    <script src="../assets/js/home.js"></script>
    <!-- Backend Bundle JavaScript -->
    <script src="../assets/js/backend-bundle.min.js"></script>
    <!-- app JavaScript -->
    <script src="../assets/js/app.js"></script>
  </body>
</html>