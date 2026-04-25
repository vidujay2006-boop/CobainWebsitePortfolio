<?php 
/* Registration Number: 2406840 */
$page_title = "Merchandise";
$current_page = "merch";

include('inc/db_connect.php'); 
$conn = connect(); 

include('inc/header.php'); 
?>

<main>
    <h2>Official Shop</h2>
    <div class="merch-items">
    <?php
    if($conn) {
        $sql = "SELECT * FROM products";
        $result = mysqli_query($conn, $sql);

        while($row = mysqli_fetch_assoc($result)) {
            ?>
            <div class="merch-item-1">
                <img src="images/<?php echo htmlspecialchars($row['image_url']); ?>" alt="Product">
                <h3><?php echo htmlspecialchars($row['title']); ?></h3>
                <p>£<?php echo number_format($row['price'], 2); ?></p>
                <form action="basket.php" method="POST">
                    <input type="hidden" name="id" value="<?php echo $row['id']; ?>">
                    <button type="submit" class="clear-basket">Add to Basket</button>
                </form>
            </div>
            <?php
        }
    }
    ?>
    </div>
</main>

<?php 
include('inc/footer.php'); 
if($conn) { mysqli_close($conn); }
?>