let obj = {
  _id: "5d318e1a8541744830bef139",
  name: "app test 1",
  description: "somthing longer",
  brand: "nokia",
  imageUrl:
    "https://drop.ndtv.com/TECH/product_database/images/2152017124957PM_635_nokia_3310.jpeg?downsize=*:420&output-quality=80",
  price: 100,
  userId: "admin",
  createdAt: "2019-07-19T09:32:10.535Z",
  updatedAt: "2019-07-19T09:32:10.535Z",
  __v: 0,
};

async function getItems() {
  const response = await fetch(
    "https://striveschool-api.herokuapp.com/api/product/",
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjZThmNGQ0YmUzZDAwMTU4NDVmYzYiLCJpYXQiOjE2NjgwODE5MDksImV4cCI6MTY2OTI5MTUwOX0.QNq9tHcsO7ERSNl6vnftSRLSZKCW63_UJGE_lt_6WJ8",
      },
    }
  );
  const items = await response.json();
  return items;
}
window.onload = async () => {
  const items = await getItems();
  createCards(items);
  console.log(items);
};
let cardsDiv = document.querySelector("#row");
const createCards = function (items) {
  items.forEach((item) => {
    let createCard = document.createElement("div");
    createCard.innerHTML = `<img src="${item.imageUrl}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${item.brand}  ${item.name}</h5>
    <p class="card-text">${item.description}</p>
    <a href="details.html?itemID=${item._id}" class="btn btn-primary">Buy for ${item.price}$</a>
    <a href="backend.html?itemID=${item._id}" class="btn btn-secondary">Edit Item</a>
    </div>
`;
    createCard.classList.add("card");
    createCard.style.width = "18rem";
    cardsDiv.appendChild(createCard);
  });
};
