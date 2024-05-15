
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
      <link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/css/select2.min.css" rel="stylesheet" />

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
                            <h4 class="card-title">Módositás</h4>
                            <h6 class="card-title" style="color:blue;">A megrendeléseknek kizárólagosan csak az állapotát és a fizetés státuszát lehet módositani. Amennyiben más mezőket is módositani szeretne, akkor kérjük változtassa meg a státuszt "Lemondva" és hozzon létre új megendelést!</h6>
                        </div>
                    </div>
                    <div class="card-body">
                        <form action="page-list-users.html">
                            <div class="row"> 
                            <div class="col-md-12">
                            <div class="form-group">
                                        <label>Megrendelés állapota</label>
                                        <select class="form-control status" id='status'>
                                            <option value="Megrendelve">Megrendelve</option>
                                            <option value="Csomagolva">Csomagolva</option>
                                            <option value="Elküldve">Elküldve</option>
                                            <option value="Teljesitett">Teljesitett</option>
                                            <option value="Lemondva">Lemondva</option>
                                        </select>
                                        <div class="help-block with-errors" style="color:red;" id="status_error"></div>
                                </div>  
                                <div class="form-group">
                                        <label>Fizetés állapota</label>
                                        <select class="form-control status" id='payment'>
                                            <option value="1">Kifizetve</option>
                                            <option value="0">Nincs kifizetve</option>
                                        </select>
                                        <div class="help-block with-errors" style="color:red;" id="payment_error"></div>
                                </div>                  
                            </div>
                            
                            <input type='hidden' id="purchase_id">
                            <?php if(isset($_GET['mode']) && $_GET['mode'] == 'update') : ?>                      
                            <button type="button" class="btn btn-primary mr-2" onclick="validateCreatePurchase('update')">Módositás</button>
                            <?php endif; ?>
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
    <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.min.js"></script>
    <script src="https://cdn.datatables.net/v/dt/dt-2.0.2/datatables.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="../environment.js"></script>
    <script src="../assets/js/authenticate.js"></script>
    <script src="../assets/js/jwt.js"></script>
    <script src="../assets/js/purchase.js"></script>
    <!-- Backend Bundle JavaScript -->
    <script src="../assets/js/backend-bundle.min.js"></script>  
    <!-- app JavaScript -->
    <script src="../assets/js/app.js"></script>
  </body>
</html>