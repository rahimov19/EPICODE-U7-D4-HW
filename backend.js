const params = new URLSearchParams(window.location.search);
const itemID = params.get("itemID");

window.onload = async () => {
  if (itemID) {
    const response = await fetch(
      `https://striveschool-api.herokuapp.com/api/product/${itemID}`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjZThmNGQ0YmUzZDAwMTU4NDVmYzYiLCJpYXQiOjE2NjgwODE5MDksImV4cCI6MTY2OTI5MTUwOX0.QNq9tHcsO7ERSNl6vnftSRLSZKCW63_UJGE_lt_6WJ8",
        },
      }
    );
    const item = await response.json();
    let addButton = document.querySelector("#addbutton");
    addButton.innerText = "Edit an Item";
    let h2 = document.querySelector("#h2");
    h2.innerText = "Edit Product";
    document.querySelector("#productname").value = item.name;
    document.querySelector("#productdescription").value = item.description;
    document.querySelector("#productbrand").value = item.brand;
    document.querySelector("#productimage").value = item.imageUrl;
    document.querySelector("#productprice").value = item.price;
  }
};
async function submitItem(event) {
  event.preventDefault();

  const newItem = {
    name: document.querySelector("#productname").value,
    description: document.querySelector("#productdescription").value,
    brand: document.querySelector("#productbrand").value,
    imageUrl: document.querySelector("#productimage").value,
    price: document.querySelector("#productprice").value,
  };

  const options = {
    method: itemID ? "PUT" : "POST",
    body: JSON.stringify(newItem),
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjZThmNGQ0YmUzZDAwMTU4NDVmYzYiLCJpYXQiOjE2NjgwODE5MDksImV4cCI6MTY2OTI5MTUwOX0.QNq9tHcsO7ERSNl6vnftSRLSZKCW63_UJGE_lt_6WJ8",
    },
  };

  try {
    const endpoint = itemID
      ? `https://striveschool-api.herokuapp.com/api/product/${itemID}`
      : "https://striveschool-api.herokuapp.com/api/product/";

    const response = await fetch(endpoint, options);
    if (response.ok) {
      alert(itemID ? "Item Edited Successfully" : "Item Created Successfully");
      window.location.assign("index.html");
    } else {
      throw new Error("Error while executing try block");
    }
  } catch (error) {
    console.error(error);
  }
}
async function deleteItem(event) {
  event.preventDefault();

  try {
    if (confirm("Do you really want to delete an Item???")) {
      const options = {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjZThmNGQ0YmUzZDAwMTU4NDVmYzYiLCJpYXQiOjE2NjgwODE5MDksImV4cCI6MTY2OTI5MTUwOX0.QNq9tHcsO7ERSNl6vnftSRLSZKCW63_UJGE_lt_6WJ8",
        },
      };
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/product/${itemID}`,
        options
      );
      if (response.ok) {
        window.location.assign("index.html");
      } else {
        alert("Error while deleting!");
      }
    }
  } catch (error) {
    alert(`Some error occured: ${error}`);
  }
}
