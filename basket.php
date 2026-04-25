<?php
/* Registration Number: 2406840 */
session_start();

include('inc/db_connect.php');

$conn = connect(); 

if (isset($_POST['id'])) {
    $id = $_POST['id'];
    
    $_SESSION['cart'][] = $id;
}

$page_title = "Your Basket";
include('inc/header.php');
?>

<main>
    <h2>Your Shopping Basket</h2>
    <div class="content-box">
        <?php
        if (!empty($_SESSION['cart']) && $conn) {
            foreach ($_SESSION['cart'] as $item_id) {
                // 3. Security: Escape the ID to prevent SQL Injection
                $safe_id = mysqli_real_escape_string($conn, $item_id);
                
                $sql = "SELECT * FROM products WHERE id = '$safe_id'";
                $res = mysqli_query($conn, $sql);
                
                if ($res && $item = mysqli_fetch_assoc($res)) {
                    echo "<p><strong>" . htmlspecialchars($item['title']) . "</strong> - £" . number_format($item['price'], 2) . "</p>";
                }
            }
            echo "<hr><button class='clear-basket' onclick='window.location.href=\"merchdetails.php\"'>Continue Shopping</button>";
        } else {
            echo "<p>Your basket is empty.</p>";
            echo "<a href='merchdetails.php' style='color:#f2b705;'>Go to Shop</a>";
        }
        ?>
    </div>
</main>

<?php 
include('inc/footer.php'); 
if($conn) { mysqli_close($conn); }
?>