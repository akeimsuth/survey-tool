<!DOCTYPE html>
<html lang="en">

<?php
    include('header.php');
?>
    <body class="g-sidenav-show bg-gray-100">
        <?php
            $currentPage = 'modules';
            include('sidebar.php');
        ?>
        <main class="main-content position-relative bg-gray-100 max-height-vh-100 h-100">
            <!-- Navbar -->
            <?php
                $currentPage = 'modules';
                include('navbar.php');
            ?>
            <div class="container-fluid py-4">
                <form role="form text-left">
                  <div class="mb-3">
                    <input type="text" class="form-control" placeholder="Name" aria-label="Name" aria-describedby="name-addon">
                  </div>
                  <div class="mb-3">
                    <textarea class="form-control" placeholder="Description" aria-label="Description" aria-describedby="description-addon" ></textarea>
                  </div>
                </form>
            </div>
            <?php
                $currentPage = 'modules';
                include('script.php');
            ?>
        </main>
    </body>
</html>