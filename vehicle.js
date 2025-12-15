let selectedIndex = null;

const renderCars = () => {
    const wrapper = $("#carWrapper");
    wrapper.html("");

    cars.forEach((car, index) => {
    const card = $(`
      <div class="carCard">
        <img src="${car.img}" onerror="this.src='images/default_image.jpg'">
        <div class="carInfo">
            <h2>${car.carName}</h2>
            <p>ID: ${index}</p>
        </div>
      </div> 
    `);

    card.on("click", function () {
        $(".carCard").removeClass("selected");
        $(this).addClass("selected");
        selectedIndex = index;
        $("#message").text(`Selected car ID ${index}`);
    });

    wrapper.append(card);
    });
};

const readCar = () => {
    if (selectedIndex === null) {
        $("#message").text("Please select a car first.");
        return;
    }
    renderCars();

    const car = cars[selectedIndex];
    const info = $(".carCard").eq(selectedIndex).find(".carInfo");

    info.append(`
        <div class="details">
            <p>Brand: ${car.brand}</p>
            <p>Year: ${car.year}</p>
            <p>Engine: ${car.engine}</p>
            <p>Doors: ${car.doors}</p>
        </div>
    `);
};

const updateCar = () => {
    if (selectedIndex === null) {
        $("#message").text("Please select a car first");
        return;
    }

    renderCars();

    const car = cars[selectedIndex];
    const info = $(".carCard").eq(selectedIndex).find(".carInfo");

    const updateForm = $(`
    <div class="updateForm">
        <p>
        <input type="text" id="updateName" value="${car.carName}" size="20" />
        by
        <input type="text" id="updateBrand" value="${car.brand}" size="10" />
        </p>

        <p>
        Year:
        <input type="number" id="updateYear" value="${car.year}" size="6" />
        </p>

        <p>
        Engine:
        <input type="text" id="updateEngine" value="${car.engine}" size="20" />
        </p>

        <p>
        Doors:
        <input type="number" id="updateDoors" value="${car.doors}" size="4" />
        </p>

      <button id="saveUpdate">Save</button>
    </div>
    `);

    info.html(updateForm);

    $("#saveUpdate").on("click", () => {
        cars[selectedIndex] = {
        carName: $("#updateName").val(),
        brand: $("#updateBrand").val(),
        year: $("#updateYear").val(),
        engine: $("#updateEngine").val(),
        doors: $("#updateDoors").val(),
        img: car.img,
    };

    $("#message").text("Car updated successfully.");
    renderCars();

  });
};

const deleteCar = () => {
    if (selectedIndex === null) {
        $("#message").text("Please select a car first.");
        return;
    }
    const deleteIndex = selectedIndex;

    cars.splice(selectedIndex, 1);
    selectedIndex = null;

    alert(`Car ID ${deleteIndex} has been deleted.`);
    renderCars();
};

const createCar = () => {
    const newCar = {
        carName: $("#createName").val(),
        brand: $("#createBrand").val(),
        year: $("#createYear").val(),
        engine: $("#createEngine").val(),
        doors: $("#createDoors").val(),
        img: "images/not_found.jpg",
    };

    cars.push(newCar);
    alert(`Car ID ${cars.length - 1} has been created.`);
    renderCars();
};

$(document).ready(() => {
    renderCars();

    $("#createButton").on("click", createCar);
    $("#readButton").on("click", readCar);
    $("#updateButton").on("click", updateCar);
    $("#deleteButton").on("click", deleteCar);
});