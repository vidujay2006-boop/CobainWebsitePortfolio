<?php 
/* Registration Number: 2406840 */
mysqli_report(MYSQLI_REPORT_OFF); 

$page_title = "Home";
$current_page = "home";

// Include your connection file
include('inc/db_connect.php'); 
$conn = connect(); // Start the connection

include('inc/header.php'); 
?>

<main>
    <section class="hero">
        <h2>Welcome to the Official Portfolio</h2>
        <p>Explore the life and legacy of Kurt Cobain.</p>
        
        <?php
            if($conn) {
                $sql = "SELECT * FROM products LIMIT 1";
                $result = mysqli_query($conn, $sql);
                
                if($result && $row = mysqli_fetch_assoc($result)) {
                    echo "<div class='content-box' style='border: 2px solid #f2b705; padding: 20px;'>";
                    echo "<h3>Featured: " . htmlspecialchars($row['title']) . "</h3>";
                    echo "<p>Price: £" . number_format($row['price'], 2) . "</p>";
                    echo "</div>";
                }
            }
        ?>
    </section>
</main>

<?php 
include('inc/footer.php'); 
if($conn) { mysqli_close($conn); } 
?>