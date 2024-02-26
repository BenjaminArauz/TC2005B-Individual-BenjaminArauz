let purchase = [
    {
        code: "TELLEPHONE",
        quantity: 0,
        name: "",
        price: 0
    },
    {
        code: "LAPTOP",
        quantity: 0,
        name: "",
        price: 0
    },
    {
        code: "XBOX",
        quantity: 0,
        name: "",
        price: 0
    }
];

function scroll_section(section){
    section.scrollIntoView({ behavior: 'smooth' });
}

//Función para añadir un producto
const add_product = (num, quantity_element, substract_button, row) => {
    
    //Actualizar el valor dentro de la página y en purchase
    purchase[num].quantity++;
    quantity_element.innerHTML = purchase[num].quantity;
    if (purchase[num].quantity > 0){
        substract_button.style.display = "block"

        //Insertar en el documento
        if (purchase[num].quantity == 1){
            row.innerHTML = "<td>" + purchase[num].name + " (" + purchase[num].quantity + ")</td>";
        } else {
            const index = row.innerHTML.indexOf("(");
            row.innerHTML = row.innerHTML.substring(0, index + 1) + purchase[num].quantity + row.innerHTML.substring(index + 2);
        }
    }

    //Sumar al total a pagar
    let final_price_before = parseInt(final_price.innerHTML.split(".").join(""));
    final_price.innerHTML = final_price_before + purchase[num].price;
}

//Función para eliminar un producto
const delete_product = (num, quantity_element, substract_button, row) => {
    //Sumar al total a pagar
    if (purchase[num].quantity > 0){
        let final_price_before = parseInt(final_price.innerHTML.split(".").join(""));
        final_price.innerHTML = final_price_before - purchase[num].price;

        purchase[num].quantity--;
        quantity_element.innerHTML = purchase[num].quantity;

        //Remover la información del documento
        if (purchase[num].quantity == 0){
            row.innerHTML = "";
        } else {
            const index = row.innerHTML.indexOf("(");
            row.innerHTML = row.innerHTML.substring(0, index + 1) + purchase[num].quantity + row.innerHTML.substring(index + 2);
        }
    } else if (purchase[num].quantity == 0){
        //Desplegar la información de la notificación
        const product_notification = document.getElementById("product_notification");
        product_notification.style.display = "block";
        scroll_section(product_notification);
        product_notification.style.opacity = "1";
        //Desaparecer la información, uso del TimeOut
        setTimeout(() => {
            product_notification.style.opacity = "0";
        }, 3000);
    }
}

let final_price = document.getElementById("final_price");

/* Variables del teléfono */
const quantity_cellphone = document.getElementById("quantity_cellphone"); //Cantidad
const name_cellphone = document.getElementById("name_cellphone"); //Nombre
const price_cellphone = document.getElementById("price_cellphone"); //Precio
let row_cellphone = document.getElementById("row_cellphone"); //Columna

//Botones
const sum_button_cellphone = document.getElementById("sum_button_cellphone");
const substract_button_cellphone = document.getElementById("substract_button_cellphone");

//Actualización en purchase
purchase[0].name = name_cellphone.innerHTML;
purchase[0].price = parseInt(price_cellphone.innerHTML.split(".").join(""));

sum_button_cellphone.onclick = function(){
    add_product(0, quantity_cellphone, substract_button_cellphone, row_cellphone);
};

substract_button_cellphone.onclick = function(){
    delete_product(0, quantity_cellphone, substract_button_cellphone, row_cellphone);
};

/* Variables de la computadora */
const quantity_laptop = document.getElementById("quantity_laptop"); //Cantidad
const name_laptop = document.getElementById("name_laptop"); //Nombre
const price_laptop = document.getElementById("price_laptop"); //Precio
let row_laptop = document.getElementById("row_laptop"); //Columna

//Botones
const sum_button_laptop = document.getElementById("sum_button_laptop");
const substract_button_laptop = document.getElementById("substract_button_laptop");

//Actualización en purchase
purchase[1].name = name_laptop.innerHTML;
purchase[1].price = parseInt(price_laptop.innerHTML.split(".").join(""));

sum_button_laptop.onclick = function(){
    add_product(1, quantity_laptop, substract_button_laptop, row_laptop);
};

substract_button_laptop.onclick = function(){
    delete_product(1, quantity_laptop, substract_button_laptop, row_laptop);
};

/* Variables del xbox*/
const quantity_xbox = document.getElementById("quantity_xbox"); //Cantidad
const name_xbox = document.getElementById("name_xbox"); //Nombre
const price_xbox = document.getElementById("price_xbox"); //Precio
let row_xbox = document.getElementById("row_xbox"); //Columna

//Botones
const sum_button_xbox = document.getElementById("sum_button_xbox");
const substract_button_xbox = document.getElementById("substract_button_xbox");

//Actualización en purchase
purchase[2].name = name_xbox.innerHTML;
purchase[2].price = parseInt(price_xbox.innerHTML.split(".").join(""));

sum_button_xbox.onclick = function(){
    add_product(2, quantity_xbox, substract_button_xbox, row_xbox);
};

substract_button_xbox.onclick = function(){
    delete_product(2, quantity_xbox, substract_button_xbox, row_xbox);
};

/* Configuración del boton de reset */
const reset_button = document.getElementById("reset_button");

reset_button.addEventListener("click", () => {
    purchase[0].quantity = purchase[1].quantity = purchase[2].quantity = 0;
    row_cellphone.innerHTML = row_laptop.innerHTML = row_xbox.innerHTML = "";
    final_price.innerHTML = 0;
    quantity_cellphone.innerHTML = purchase[0].quantity;
    quantity_laptop.innerHTML = purchase[1].quantity;
    quantity_xbox.innerHTML = purchase[2].quantity;
});