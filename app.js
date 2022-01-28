const products = document.querySelector(".products");
const searchBar = document.querySelector(".searchBar");
const badge = document.querySelector(".badge");
// PopUp
const popup = document.getElementById("popup");
const popupBtn = document.getElementById("popupBtn");
const span = document.getElementsByClassName("close")[0];
const productsTable = document.getElementById("products-table");
const sumPrice = document.getElementById("sumPrice");
let sum = 0;
const arr = [];

// Sepet Butonuna Tıklandığında Pop Up'ın Gösterilmesi
popupBtn.onclick = function () {
  popup.style.display = "block";
};

// Sepetin İçerisinde Bulunan X Butonu İle Pop Up'ı Kapatma
span.onclick = function () {
  popup.style.display = "none";
};

// Products.json Dosyasında Bulunan Verileri Çekme
const data = fetch("products-list.json")
  .then((response) => response.json())
  .then((responseData) => {
    for (let i = 0; i < responseData.length; i++) {
      createElement(responseData, i);
    }
    productsData = responseData;
  });

// Ürünleri İndex İçerisine Yerleştirme
function createElement(data, i) {
  products.innerHTML += `
            <div class="card col-xl-3 col-lg-4 col-md-6 col-sm-12">
                <div class="card-img">
                    <img src="${data[i].image}" class="img-fluid">
                </div>
                <div class="card-title"> 
                    ${turncate(data[i].title, 50)}
                </div>
                
                <div class="card-body">
                    <hr>
                    <div class="price">
                        <p>${data[i].price} $</p>
                    </div>
                    <div class="addToCart">
                        <button class="btn btn-success" onclick="addToCart(${
                          data[i].id
                        })">Add To Cart</button>
                    </div>
                </div>
            </div>
        `;
}

// Category Filtreleme
function categoryFilter(id) {
  products.innerHTML = "";
    for (let i = 0; i < productsData.length; i++) {
        if (id == 1 && productsData[i].category == "men's clothing") {
            createElement(productsData, i);
        } else if (id == 0){
            createElement(productsData, i)
        } else if (id == 2 && productsData[i].category == "jewelery") {
            createElement(productsData, i);
        } else if (id == 3 && productsData[i].category == "electronics") {
            createElement(productsData, i);
        } else if (id == 4 && productsData[i].category == "women's clothing") {
            createElement(productsData, i);
        }
    }
}

// Search Filtreleme
function searchFilter() {
  products.innerHTML = "";
      for (let i = 0; i < productsData.length; i++) {
        if (
            productsData[i].title
            .toUpperCase()
            .includes(searchBar.value.toUpperCase())
        ) {
          createElement(productsData, i);
        }
      }
}

// String Kısaltma
function turncate(str, len) {
  if (str.length > len) {
    str = str.substring(0, len);
    return str + "...";
  } else {
    return str;
  }
}

// Sepete Ürün Ekleme
function addToCart(id) {
    // Sepet Ürün Numarası Arttırma
    badgeNum = Number(badge.textContent);
    badgeNum++;
    badge.innerHTML = badgeNum;

    // ID'ye Göre Eklenen Sepette Ürünü Gösterme
    for (let i = 0; i < productsData.length; i++) {
        if (productsData[i].id == id) {
            productsTable.innerHTML += `
                <tr class="productsRow ui-state-default">
                    <td class="products-image">
                        <img src="${productsData[i].image}">
                    </td>
                    <td class="products-title">
                        ${productsData[i].title} 
                    </td>
                    <td class="products-price">
                        ${productsData[i].price} $
                    </td>
                    <td class="products-delete-btn">
                        <button class="btn btn-danger deleteBtn" onclick="deleteProduct(${id})">Delete</button>
                    </td>
                </tr>
            `;
            arr.push(productsData[i])
            // Toplam Ücret
            sum += Number(productsData[i].price)
        }
    }
    // Toplam Ücreti Ekrana Yansıtma
    sumPrice.innerHTML = 
        `
            ${sum.toFixed(2)} $
        `
}

// Sepetten Ürün Silme
function deleteProduct(id) {
    // Sepet Ürün Numarası Azaltma
    badgeNum = Number(badge.textContent);
    badgeNum--;
    badge.innerHTML = badgeNum;
    // Toplam Ücreti Sıfırlama
    sum = 0;

    for(let i = 0; i < arr.length; i++) {
        if(arr[i].id == id) {
            productsTable.innerHTML = ""

            const index = arr.indexOf(arr[i])
            arr.splice(index, 1)

            arr.forEach( (el) => {
                productsTable.innerHTML += `
                    <tr class="productsRow">
                        <td class="products-image">
                            <img src="${el.image}">
                        </td>
                        <td class="products-title">
                            ${el.title} 
                        </td>
                        <td class="products-price">
                            ${el.price} $
                        </td>
                        <td class="products-delete-btn">
                            <button class="btn btn-danger deleteBtn" onclick="deleteProduct(${el.id})">Delete</button>
                        </td>
                    </tr>
                `;

                // Toplam Ücreti
                sum += Number(el.price)
            })
        }
    }

    // Toplam Ücreti Ekrana Yansıtma
    sumPrice.innerHTML = 
    `
        ${sum.toFixed(2)} $
    `
}

// JQuery Sortable
$( function() {
    $( "#products-table" ).sortable();
} );
