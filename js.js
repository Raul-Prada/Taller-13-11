const products = [
{name: "rise", category: "grain", price: 4500, amount: 25, min:10
},

{name: "oil", category: "pantry", price: 12000, amount: 3, min:5
},

{name: "sugar", category: "pantry", price: 3800, amount: 0, min:8
},

{name: "coffe", category: "beverage", price: 18500, amount: 8, min:4
},

{name: "milk", category: "dairy", price: 4200, amount: 2, min: 6 
},

{name: "panela", category: "pantry", price: 3000, amount: 15, min: 10
},

{name: "chesee", category: "dairy", price: 9800, amount: 4, min: 5
},

{name: "juice", category: "beverage", price: 5200, amount: 4, min: 3
},
];

console.log(products);
console.log(products.length);
console.log(products[0].name);

const table = document.getElementById("table-body");
const summary = document.getElementById("summary");

function showinventory(){

    table.innerHTML = "";
    summary.innerHTML = "";


    let total_sold_out = 0;
    let total_low_stock = 0;
    let askunits = 0;
    let inventory_value = 0;
    let elderly_sub = -1;
    let file_eldery = null;
    let elderly_name

for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const sub = product.price * product.amount;

    const file = document.createElement("tr");

    const tdName = document.createElement("td");
    tdName.textContent = product.name;

    const tdCategory = document.createElement("td");
    const label = document.createElement("span");
    label.textContent = product.category;
    label.classList.add("label");

    if (product.category === "grain") {
    label.style.backgroundColor = "green";
    } else if (product.category === "pantry") {
    label.style.backgroundColor = "darkred";
    } else if (product.category === "beverage") {
    label.style.backgroundColor = "lightblue";
    } else if (product.category === "dairy") {
    label.style.backgroundColor = "orange";
    }
    tdCategory.appendChild(label);

    const tdPrice = document.createElement("td");
    tdPrice.textContent = product.price;
    tdPrice.textContent = "$" + product.price.toLocaleString("es-CO");
    if (product.price < 10000) {
        tdPrice.style.color = "darkgreen";
    }

    const tdAmount = document.createElement("td");
    
    const btnless = document.createElement("button")
    btnless.textContent = "-";
    btnless.classList.add("btn", "btn.decrease");

    if (product.amount === 0){
        btnless.disabled = true;
    }
    btnless.addEventListener("click", function (){
    if (products[i].amount > 0) {
        products[i].amount--;
        showinventory();
    }
});
    const number = document.createElement("span");
    number.textContent = product.amount;
    number.classList.add("number");

    const btnmore = document.createElement("button");
    btnmore.textContent = "+";
    btnmore.classList.add("btn", "btn-increase");

    btnmore.addEventListener("click", function(){
        products[i].amount++;
        showinventory();
    });

    tdAmount.appendChild(btnless);
    tdAmount.appendChild(number);
    tdAmount.appendChild(btnmore);


    const tdmin = document.createElement("td");
    tdmin.textContent = product.min;

    const tdSub = document.createElement("td");
    tdSub.textContent = "$" + sub.toLocaleString("es-CO");

    file.appendChild(tdName);
    file.appendChild(tdCategory);
    file.appendChild(tdPrice);
    file.appendChild(tdAmount);
    file.appendChild(tdmin);
    file.appendChild(tdSub);

    table.appendChild(file);

const tdstate = document .createElement("td")

//State
if (product.amount === 0) {
    file.classList.add("sold_out");
    const missing = product.min;
    tdstate.textContent = "sold Out - ask" + missing;
    tdstate.style.color = "red";
    tdstate.style.fontWeight = "bold";
    total_sold_out++;
    askunits += missing;
}
else if (product.amount < product.min) {
    file.classList.add("low_stock");
    const missing = product.min - product.amount;
    tdstate.textContent = "low - ask" + missing;
    total_low_stock++;
    askunits += missing;
}
else {
    file.classList.add("available");
    tdstate.textContent = "OK";
}
inventory_value += sub;
if (sub > elderly_sub){
    elderly_sub = sub;
    file_eldery = file;
    elderly_name = product.name;
}
}
file_eldery.classList.add("outstanding")

const pEldery = document.createElement("P")
pEldery.textcontent = "The product with more value is: " + elderly_name + " ($)" + elderly_sub.toLocaleString("es-CO") + ")";

const pSold = document.createElement("P");
pSold.textContent = "Total Sold Out: " + total_sold_out;
const pLow = document.createElement("P");
pLow.textContent = "Total Low Stock: " + total_low_stock;
const pAskUnits = document.createElement("P");
pAskUnits.textContent = "Total to Ask Units: " + askunits;
const pValue = document.createElement("P");
pValue.textContent = "Total Inventory Value: $" + inventory_value.toLocaleString("es-CO");
pValue.style.fontWeight = "bold";

summary.appendChild(pSold);
summary.appendChild(pLow);
summary.appendChild(pAskUnits);
summary.appendChild(pValue);
}
showinventory();