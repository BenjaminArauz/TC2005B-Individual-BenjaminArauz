const filesystem = require('fs');

let productos = [
    {
        cantidad: 0,
        nombre: "Apple iPhone 15 Pro 6.7-inch",
        precio: 15000,
        descripcion: "El iPhone 15 Pro es el nuevo teléfono de Apple, con una pantalla de 6.7 pulgadas y una cámara de 12 MP",
        url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692845702708"

    },
    {
        cantidad: 0,
        nombre: "Computadora Portátil AceMagic",
        precio: 7000,
        descripcion: "La computadora portátil AceMagic es una computadora con un procesador Intel Core i7, 16 GB de RAM y 1 TB de almacenamiento",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8cyVYick1IZP-wCTYOcR0Sa70I2_KcSXZCw&usqp=CAU"
    },
    {
        cantidad: 0,
        nombre: "Xbox Series S",
        precio: 8500,
        descripcion: "La Xbox Series S es la nueva consola de Microsoft, con una resolución de 1080p y almacenamiento de 512 GB",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzRDnf9c617c4TM_V1cmrmG4uJ3EsDI_I-Pw&usqp=CAU"
    }
];

module.exports = class Producto {
    constructor(cantidad, nombre, precio, descripcion, url){
        this.cantidad = cantidad;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.url = url;
    }

    save(){
        productos.push({
            cantidad: this.cantidad,
            nombre: this.nombre,
            precio: this.precio,
            descripcion: this.descripcion,
            url: this.url
        })
    }

    static crear_txt(){
        filesystem.writeFileSync('Lab13/productos.txt', '');
        for (let i = 0; i < productos.length; i++) {
            filesystem.appendFileSync('Lab13/productos.txt', productos[i].nombre  + "\n" + productos[i].precio + "\n" + productos[i].descripcion + "\n" + productos[i].url+ "\n\n");
        }
    }

    static fetchAll() {
        return productos;
    }
}