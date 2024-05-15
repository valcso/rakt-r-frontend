
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
                            <h4 class="card-title">Új rendelés létrehozása</h4>
                        </div>
                    </div>
                    <div class="card-body">
                        <form action="page-list-users.html">
                            <div class="row"> 
                            <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Vásárló</label>
                                        <select class="form-control customer_select" id='pr_cats'>
                                            <option>1</option>
                                            <option>2</option>
                                        </select>
                                        <div class="help-block with-errors" style="color:red;" id="category_error"></div>
                                    </div>
                                    <div class="form-group">
                                        <label>Termékek</label>
                                        <select class="form-control js-example-basic-multiple" multiple='multiple' id='product_select'>
                                            <option>1</option>
                                            <option>2</option>
                                        </select>
                                        <div class="help-block with-errors" style="color:red;" id="product_select_error"></div>
                                    </div>
                                    <p id="pr_qty_p" style="display:none;">Mennyiség</p>
                                    <div class="form-group" id="product_qty">
                                        
                                    </div>
                                </div> 
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>Város</label>
                                        <input type='text' class="form-control" id="city">
                                        <div class="help-block with-errors" style="color:red;" id="city_error"></div>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>Utca és házszám</label>
                                        <input type='text' class="form-control" id="street">
                                        <div class="help-block with-errors" style="color:red;" id="street_error"></div>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>Irányitószám</label>
                                        <input type='text' class="form-control" id="zipcode">
                                        <div class="help-block with-errors" style="color:red;" id="zipcode_error"></div>
                                    </div>
                                </div>
                                <div class="col-md-6">
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
                                </div>
                                <div class="col-md-6">
                                <div class="form-group">
                                        <label>Fizetés állapota</label>
                                        <select class="form-control status" id='payment'>
                                            <option value="1">Kifizetve</option>
                                            <option value="0">Nincs kifizetve</option>
                                        </select>
                                        <div class="help-block with-errors" style="color:red;" id="payment_error"></div>
                                </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Megjegyzés</label>
                                        <textarea class="form-control"  id="description"></textarea>
                                        <div class="help-block with-errors" style="color:red;"></div>
                                    </div>
                                </div> 
                                <div class="col-md-12">
                                    <div class="form-group">
                                    <p><b>Termékek : </b></p>
                                        <div id="product_with_qty">

                                        </div>
                                        <p  style="font-weight:bold;">A megrendelt termékek teljes értéke : <p style="color:red;" id="total_price"></p> </p>
                                    </div>
                                </div>                            
                            </div>
                            <input type='hidden' id="img_base64">     
                            <br><br>                    
                            <button type="button" class="btn btn-success mr-2" onclick="validateCreatePurchase()">Létrehozás</button>
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