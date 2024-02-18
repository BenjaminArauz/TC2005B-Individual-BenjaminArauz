/*
Entrada: un número pedido con un prompt. 
Salida: Una tabla con los números del 1 al número dado con sus cuadrados y cubos. 
Utiliza document.write para producir la salida
*/

function createTable(){
    const number = prompt("Dime un número");
    document.write("<section>");
    document.write("<h4>1. Tabla con números</h4>");
    document.write("<table border='1'>");
    document.write("<thead>");
    document.write("<tr>");
    document.write("<th>Número</th>");
    document.write("<th>Numeros al cuadrado</th>");
    document.write("<th>Numeros al cubo</th>");
    document.write("</tr>");
    document.write("</thead>");
    document.write("<tbody>")
    
    for (let i = 1; i <= number; i++){
        document.write("<tr>");
        document.write("<td>" + i + "</td>");
        document.write("<td>" + (i * i) + "</td>");
        document.write("<td>" + (i * i * i) + "</td>");
        document.write("</tr>");
    }

    document.write("</tbody>")
    document.write("</table>");
    document.write("</section>");
}

/* 
Entrada: Usando un prompt se pide el resultado de la suma de 2 números generados de manera aleatoria. 
Salida: La página debe indicar si el resultado fue correcto o incorrecto, y el tiempo que tardó el usuario en escribir la respuesta.
*/

function calculateNumber(){
    const num1 = Math.floor(Math.random() * 20);
    const num2 = Math.floor(Math.random() * 20);
    let asserted = false;
    let inputSum;
    const startTime = new Date();

    inputSum = prompt("¿Cuánto es " + num1 + "+ " + num2 + "?");

    if (inputSum != (num1 + num2)){
        while (asserted === false){
            inputSum = prompt("Error! \n¿Cuánto es " + num1 + "+ " + num2 + "?");
            inputSum == (num1 + num2) ? asserted = true : asserted = false;
        }
    }

    const endTime = new Date();
    document.write("<section>");
    document.write("<h4>2. Adivinar el número</h4>");
    document.write("<ul>");
    document.write("<li>El resultado es " + (num1 + num2) + "</li>");
    document.write("<li>El tiempo de respuesta fue " + (endTime.getTime() - startTime.getTime()) * 0.001 + " segundos</li>");
    document.write("</ul>");
    document.write("</section>");

    delete endTime;
    delete startTime;
}

/* 
Función: contador. 
Parámetros: Un arreglo de números. 
egresa: La cantidad de números negativos en el arreglo, la cantidad de 0's, y la cantidad de valores mayores a 0 en el arreglo.
*/

function counter(numbers){
    let positive = 0;
    let negative = 0;
    let zero = 0;

    for (let i = 0; i < numbers.length; i++){
        if (numbers[i] > 0){
            positive++;
        } else if (numbers[i] < 0){
            negative++;
        } else {
            zero++;
        }
    }

    document.write("<section>");
    document.write("<h4>3. Contar números</h4>");
    document.write("<p>En la lista: " + numbers + " existe: </p>");
    document.write("<ul>");
    document.write("<li>" + positive + " números positivos</li>");
    document.write("<li>" + negative + " números negativos</li>");
    document.write("<li>" + zero + " ceros</li>");
    document.write("</ul>");
    document.write("</section>");
}

/* 
Función: promedios. 
Parámetros: Un arreglo de arreglos de números. 
Regresa: Un arreglo con los promedios de cada uno de los renglones de la matriz.
*/

function average(matrix){
    let averages = [];
    let sume;
    for (let i = 0; i < matrix.length; i++){
        sume = 0;
        for (let j = 0; j < matrix[i].length; j++){
            sume += matrix[i][j];
        }
        averages.push(sume/matrix[i].length);
    }
    
    document.write("<section>");
    document.write("<h4>4. Promedio de una matriz</h4>");
    document.write("<p>Los promedios de las filas de las matrices son: </p>");
    for (let i = 0; i < matrix.length; i++){
        document.write("<p>" + matrix[i] + ": " + "<strong>" + averages[i] + "</strong></p>");
    }
    document.write("</section>");
}

/*
Función: inverso. 
Parámetros: Un número. 
Regresa: El número con sus dígitos en orden inverso.
*/

function reverseFunction(number){
    let reversedNumber = parseInt(number.toString().split('').reverse().join(''));    
    document.write("<section>");
    document.write("<h4>5. Inverso de un número</h4>");
    document.write("<p>El reverso del número " + number + " es <strong>" + reversedNumber + "</strong></p>");
    document.write("</section>");
}

/*
Crea una solución para un problema de tu elección (puede ser algo relacionado con tus intereses, alguna problemática que hayas identificado en algún ámbito, un problema de programación que hayas resuelto en otro lenguaje, un problema de la ACM, entre otros). El problema debe estar descrito en un documento HTML, y la solución implementada en JavaScript, utilizando al menos la creación de un objeto, el objeto además de su constructor deben tener al menos 2 métodos. Muestra los resultados en el documento HTML.
*/

const FIND_DESCRIPTION = 'findTransactionByDescription';
const FIND_INDEX_AMOUNT = 'findTransactionByIndexAmount';

function totalBalance(transactions){
    const sum = transactions.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.amount;
    }, 0);
    return sum;
}

function largestTransaction(transactions){
    const largest = transactions.reduce((transaction, currentValue) => {
        if (currentValue.amount >= transaction.amount){
            transaction.id = currentValue.id;
            transaction.description = currentValue.description;
            transaction.amount = currentValue.amount;
        }
        return transaction;
    }, {
        id: transactions[0].id,
        description: transactions[0].description,
        amount: transactions[0].amount
    });
    return largest;
}

function findTransaction(transactions, code, descriptionSearchAmount){
    let finder = null;
    switch(code){
        case FIND_DESCRIPTION:
            const findDescription = transactions.find((transaction) => {
                return transaction.description === descriptionSearchAmount;
            });
            finder = findDescription;
            break;
        case FIND_INDEX_AMOUNT:
            const index = transactions.findIndex((transaction) => {
                return transaction.amount === descriptionSearchAmount;
            });
            finder = index;
            break;
        default:
            break;
    }
    return finder;
}

function printTransaction(transaction, code){
    return "ID: " + transaction.id + ", Descripción: " + transaction.description + ", Monto: " + transaction.amount;
}

function problem(){
    const transactions = [
        {
            id: 1,
            description: 'Transacción de pago de renta',
            amount: 23
        },
        {
            id: 2,
            description: 'Transacción de pago de videojuego',
            amount: 33
        },
        {
            id: 3,
            description: 'Transacción de colegiatura',
            amount: -23
        },
        {
            id: 4,
            description: 'Transacción de computadora',
            amount: 43
        },
        {
            id: 5,
            description: 'Transacción de comida',
            amount: -43
        }
    ];
    document.write("<section>");
    document.write("<h4>6. Solución para un problema</h4>");
    document.write("<p>Tienes una lista de transacciones financieras y deseas realizar varias operaciones de procesamiento de datos</p>");
    document.write("<ul>");
    document.write("<li>Calcular el saldo total</li>");
    document.write("<li>Encontrar la transacción mas grande</li>");
    document.write("<li>Encontrar una transacción por descripción</li>");
    document.write("<li>Encontrar el índice de una transacción por monto:</li>");
    document.write("</ul>");
    document.write("<ul>");
    document.write("<li><strong>Saldo total: </strong>" + totalBalance(transactions) + "$</li>");
    document.write("<li><strong>Transacción mas grande: </strong>" + printTransaction(largestTransaction(transactions)) + "</li>");
    document.write("<li><strong>Encontrar una transacción por descripción: </strong>" + printTransaction(findTransaction(transactions, FIND_DESCRIPTION, 'Transacción de colegiatura')) + "</li>");
    document.write("<li><strong>Encontrar el índice de una transacción por monto: </strong>" + findTransaction(transactions, FIND_INDEX_AMOUNT, 43) + "</li>");
    document.write("</ul>");
    document.write("</section>");
}

//Primer ejercicio
createTable();

//Segundo ejercicio
calculateNumber();

//Tercer ejercicio
let numbers = [];
const lengthNumbers = Math.floor((Math.random() * 15) + 1)
for (let i = 0; i < lengthNumbers; i++){
    numbers.push(Math.floor(Math.random() * 21) - 10);
}
counter(numbers);

//Cuarto ejercicio
const buildMatrix = (lengthRows, lengthColumns) => {
    let matrix = [];
    for (let i = 0; i < lengthRows; i++){
        matrix.push([]);
        for (let j = 0; j < lengthColumns; j++){
            matrix[i].push((Math.floor(Math.random() * 21) - 10));
        }
    }
    return matrix;
};
const lengthRows = Math.floor((Math.random() * 10) + 1); 
const lengthColumns = Math.floor((Math.random() * 10) + 1); 
let matrix = buildMatrix(lengthRows, lengthColumns);
average(matrix);

//Quinto ejercicio
let number = Math.floor(Math.random() * 1000);
reverseFunction(number);

//Sexto ejercicio
problem();