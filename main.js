var firebaseConfig = {
    apiKey: "AIzaSyC9eIFd4p9T7TIBRmp-vJHJLd5rSBBI9tw",
    authDomain: "shopping-cart22.firebaseapp.com",
    databaseURL: "https://shopping-cart22.firebaseio.com",
    projectId: "shopping-cart22",
    storageBucket: "shopping-cart22.appspot.com",
    messagingSenderId: "16193868572",
    appId: "1:16193868572:web:770dd13077ed91539ee0d9",
    measurementId: "G-T194LR6JKB"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

function buy() {
    let productFirebase = []
    for (let index = 0; index < products.length; index++) {
        if (products[index].cart) {
            let product = {
                name: products[index].name,
                price: products[index].price,
                quantity: products[index].quantity,
                total: products[index].total
            }
            productFirebase.push(product)
        }
    }
    firebase.database().ref('cart').push({
        total: total(),
        products: productFirebase
    });
    Swal.fire({
        type: 'Success',
        tittle: 'Success',
        text: 'Complete'
    });
    clean();
}
let products = [{
        id: 1,
        img: './fore-coffe.png',
        name: 'Coffe Extras Pandan',
        cart: false,
        price: 7,
        quantity: 5,
        total: 0,
    }, {
        id: 2,
        img: './fore-coffe1.png',
        name: 'Coffe Extras Vanilla',
        cart: false,
        price: 5,
        quantity: 2,
        total: 0,
    }, {
        id: 3,
        img: './fore-coffe2.png',
        name: 'Coffe Extras Chocolate',
        cart: false,
        price: 9,
        quantity: 2,
        total: 0,
    },
    {
        id: 4,
        img: './fore-coffe3.jpg',
        name: 'Ice Coffe Chesse',
        cart: false,
        price: 10,
        quantity: 4,
        total: 0,
    }
];

//const shoopingChart = []
//index posisi tabel
var position = 0
var position2 = []

function total() {
    let total = 0
    for (let index = 0; index < products.length; index++) {
        // products[index].cart ? total += products[index].total : ''
        if (products[index].cart) {
            total += products[index].total;
        }
    }
    return total
}

function clean() {
    for (let index = 0; index < products.length; index++) {
        products[index].cart = false;
        products[index].quantity = 1;
        products[index].total = 0;

        position2 = []
        updateCart();
    }
}

function add(id) {
    for (let index = 0; index < products.length; index++) {
        if (products[index].id != id || products[index].cart == true) {
            //...
        } else {
            products[index].cart = true;

            document.getElementById('tableProducts').innerHTML += `
                <tr>
                <th scope="row">${position+1}</th>
                <td>${products[index].name}</td>
                <td><img style="width:5rem;" src="${products[index].img}"></td>
                <td><button class="btn btn-outline-primary" onclick="reduceAmount(${products[index].id})"><ion-icon name="remove-circle-outline"></ion-icon></button>
                <input style="width: 2rem; "  id="${products[index].id}" value="${products[index].quantity}" disabled>
                <button class="btn btn-outline-primary" onclick="addAmount(${products[index].id})"><ion-icon name="add-circle-outline"></ion-icon></button></td>
                <td><button class="btn btn-danger" onclick="remove(${products[index].id})"><i class="fa fa-trash"></i></button>
                <button class="btn btn-outline-success" onclick=edit(${products[index].id})"><i class="fa fa-pencil"></i></button></td>
                <td>$ ${products[index].price * products[index].quantity}</td>
                </tr>
            
            `;

            position++;
            products[index].total = products[index].price * products[index].quantity

        }
    }
    document.getElementById('total').innerHTML = `
        
    <tr>
        <th scope="row"></th>
        <td></td>
        <td></td>
        <td></td>
        <td><h4>Total : </h4></td>
        <td> $${total()}.00</td>
    </tr>

    <tr>
        <th scope="row"></th>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>
            <button class="btn btn-success"><i class="fa fa-shopping-cart"></i> Buy</button>
        </td>
    </tr>
    `;
}

function remove(id) {
    for (let index = 0; index < products.length; index++) {
        if (products[index].id == id) {
            products[index].cart = false;
            products[index].total = 0;
            products[index].quantity = 1;
            total();

            for (let index2 = 0; index2 < position2.length; index2++) {
                // products[index].id == position2[index2] ? position.splice(index2, 1) : ''
                if (products[index].id == position2[index2]) {
                    position.splice(index2, 1);
                }
            }
            updateCart();
        } else {
            updateCart();
        }
    }
}

function updateCart() {
    position = 0
    document.getElementById('tableProducts').innerHTML = ''
    for (let index = 0; index < position2.length; index++) {
        var plot = position2[index];
        for (let index3 = 0; index3 < products.length; index3++) {
            if (plot == products[index3].id) {
                document.getElementById('tableProducts').innerHTML += `
                <tr>
                <th scope="row">${position+1}</th>
                <td>${products[index3].name}</td>
                <td><img style="width:5rem;" src="${products[index3].img}"></td>
                <td><button class="btn btn-outline-primary" onclick="reduceAmount(${products[index3].id})"><ion-icon name="remove-circle-outline"></ion-icon></button>
                <input style="width: 2rem; "  id="${products[index3].id}" value="${products[index3].quantity}" disabled>
                <button class="btn btn-outline-primary" onclick="addAmount(${products[index3].id})"><ion-icon name="add-circle-outline"></ion-icon></button></td>
                <td><button class="btn btn-danger" onclick="remove(${products[index3].id})"><i class="fa fa-trash"></i></button>
                <button class="btn btn-outline-success" onclick=edit(${products[index3].id})"><i class="fa fa-pencil"></i></button></td>
                <td>$ ${products[index3].price * products[index3].quantity}</td>
                </tr>
            `
                products[index3].total = products[index3].price * products[index3].quantity;
            } else {

            }
        }
        position = position + 1;
    }
    if (total() == 0) {
        document.getElementById('total').innerHTML = '';
    } else {
        document.getElementById('total').innerHTML = `   
        <tr>
            <th scope="row"></th>
            <td></td>
            <td></td>
            <td></td>
            <td><h4>Total : </h4></td>
            <td> $${total()}.00</td>
        </tr>
        <tr>
            <th scope="row"></th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
                <button class="btn btn-success"><i class="fa fa-shopping-cart"></i> Buy</button>
            </td>
        </tr>
        `
    }
}

function reduceAmount(id) {
    for (let index = 0; index < products.length; index++) {
        // products[index].id == id ? products[index].quantity > 1 ? products[index].quantity -= 1 && updateCart() : '' : ''
        if (products[index].id == id) {
            if (products[index].quantity > 1) {
                products[index].quantity = products[index].quantity - 1
                updateCart()
            } else {

            }
        } else {

        }
    }
}

function addAmount(id) {
    for (let index = 0; index < products.length; index++) {
        // products[index].id == id ? products[index].quantity > 1 ? products[index].quantity -= 1 && updateCart() : '' : ''
        if (products[index].id == id) {
            if (products[index].quantity > 0) {
                products[index].quantity = products[index].quantity + 1
                updateCart()
            } else {

            }
        } else {

        }
    }
}
//RENDER_IMG_TOP
(() => {
    for (let index = 0; index < products.length; index++) {
        document.getElementById('row1').innerHTML += `
            <div class="card m-2 ml-5" style="width:10rem;">
                <img src="${products[index].img}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-tittle">${products[index].name}</h5>
                    <p class="card-text">$${products[index].price}.00</p>
                    <button class="btn btn-outline-primary" onclick="add('${products[index].id}')"><ion-icon name="add-circle-sharp" size="large"></ion-icon></button>
                </div>
            </div>
        `;
    }

})()