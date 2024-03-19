-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-03-2024 a las 06:33:59
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `labs`
--

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`IDProducto`, `nombre`, `precio`, `descripcion`, `url`, `cantidad`, `created_at`) VALUES
(1, 'Apple iPhone 15 Pro 6.7-inch', 10000, 'El iPhone 15 Pro es el nuevo teléfono de Apple, con una pantalla de 6.7 pulgadas y una cámara de 12 MP', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692845702708', 0, '2024-03-09 21:37:37'),
(2, 'Computadora Portátil AceMagic', 10000, 'La computadora portátil AceMagic es una computadora con un procesador Intel Core i7, 16 GB de RAM y 1 TB de almacenamiento', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8cyVYick1IZP-wCTYOcR0Sa70I2_KcSXZCw&usqp=CAU', 0, '2024-03-09 21:38:44'),
(3, 'Xbox Series S', 8500, 'La Xbox Series S es la nueva consola de Microsoft, con una resolución de 1080p y almacenamiento de 512 GB', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzRDnf9c617c4TM_V1cmrmG4uJ3EsDI_I-Pw&usqp=CAU', 0, '2024-03-09 21:39:14'),
(5, 'Xbox series X', 15000, 'La mejor consola del universo, cuenta con un apartado grafico RTX\r\n', 'https://m.media-amazon.com/images/I/61-WpA1bsuL.__AC_SX300_SY300_QL70_ML2_.jpg', 0, '2024-03-09 21:41:16'),
(7, 'Luces navideñas', 200, 'Las mejores luces para alumbrar tu casa y tus preparativos navideños', 'https://waldos.com.mx/cdn/shop/products/100076901-_2_1800x1800.jpg?v=1662650910', 0, '2024-03-10 15:37:04'),
(8, 'Helados pinguino', 40, 'Los mejores helados', 'https://pbs.twimg.com/media/DOndi1vWAAAxx4Q?format=jpg&name=small', 0, '2024-03-10 15:40:42'),
(9, 'Bonice', 10, 'Buen bonice para refrescarte el día', 'https://www.bonice.com.mx/admin/assets/images/sliders/slider01.jpg', 0, '2024-03-10 15:44:47'),
(10, 'Tacos de pastor', 14, 'Tacos de carne asada y al pastor', 'https://es.wikipedia.org/wiki/Archivo:001_Tacos_de_carnitas,_carne_asada_y_al_pastor.jpg', 0, '2024-03-10 15:46:57'),
(11, 'Lentes', 1000, 'Lentes', 'https://cdn.shopify.com/s/files/1/0490/4743/7476/files/lentes-de-moda-2024_600x600.jpg?v=1701111758', 0, '2024-03-10 15:49:31'),
(12, 'Sudadera', 500, 'Sudadera para el frio :D', 'https://m.media-amazon.com/images/I/718E9UHigGL._AC_SX569_.jpg', 0, '2024-03-10 15:54:04'),
(13, 'Jean', 400, 'Los pantalones buenos', 'https://amigosafety.com/images/productos/1680213793_PANTALON%20FRENTE.png', 0, '2024-03-10 15:55:28'),
(14, 'Reloj casio', 3000, 'Reloj casio con calculadora incluida', 'https://www.casio.com/content/dam/casio/product-info/locales/mx/es-ar/timepiece/product/watch/C/CA/CA5/ca-500weg-1a/assets/CA-500WEG-1A.png.transform/main-visual-pc/image.png', 0, '2024-03-10 15:59:32'),
(15, 'Godzilla', 10000, 'Godzilla que mata a todos. GOD', 'https://hips.hearstapps.com/hmg-prod/images/godzilla-vs-kong-fotogramas-copia-2-1616793657.jpg?resize=980:*', 0, '2024-03-10 16:04:32'),
(16, 'Casco del Jefe maestro', 15000, 'Casco del Jefe maestro del universo de halo', 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRHhT-b6I5djSY7gfYLojcTusK8MMXsmXZEN88iU7k7N8m13iwscYT9u7HuxOW4-ziIe2rkAC9FNPvmJYCwo4ZepWKkiWhnlRgN3v7yF-DUINibdFDj2xViB49Tlmxm2saWEgEWa4OqZOc&usqp=CAc', 0, '2024-03-10 16:18:59');

--
-- Volcado de datos para la tabla `resenia`
--

INSERT INTO `resenia` (`IDResenia`, `nombre`, `texto`, `created_at`) VALUES
(1, 'Benja', 'El mejor producto que he comprado relación calidad-precio', '2024-03-09 21:14:10'),
(2, 'Lalo', 'Uno de los peores productos que he comprado', '2024-03-09 21:16:26'),
(3, 'Axel', 'Excelente producto, lo volvería a comprar sin ninguna duda', '2024-03-10 18:01:12');

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`username`, `password`, `created_at`) VALUES
('axel', '1234', '2024-03-09 21:15:02'),
('benja', '01234567', '2024-03-09 20:43:25'),
('Lalo', '123@lalo', '2024-03-10 23:32:27');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
