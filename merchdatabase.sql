USE ce154_vj24497; 

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `item_type` varchar(50) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `published_date` date DEFAULT NULL,  
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Insert the merchandise data
INSERT INTO `products` (`title`, `description`, `price`, `item_type`, `image_url`, `published_date`) VALUES
('Nevermind 12" Vinyl', 'Original 180g pressing of the iconic 1991 album.', 24.99, 'Vinyl', 'nevermind.jpg', '1991-09-24'),
('In Utero Anniversary Edition', 'Limited edition clear vinyl with bonus tracks.', 29.99, 'Vinyl', 'in-utero.jpg', '2013-09-24'),
('Nirvana Smiley T-Shirt', 'Classic yellow smiley face logo on black cotton.', 19.90, 'Apparel', 'smiley-shirt.jpg', '2025-01-01'),
('MTV Unplugged in New York', 'Acoustic performance on 180g heavyweight vinyl.', 22.50, 'Vinyl', 'unplugged.jpg', '1994-11-01'),
('Kurt Cobain Photo Hoodie', 'Black pullover hoodie featuring 1993 tour photography.', 45.00, 'Apparel', 'kurt-hoodie.jpg', '2025-02-15');