const cars = [
    [
        {
          "type": "SUV",
          "brand": "Volkswagen",
          "model": "Tiguan",
          "doors": 5,
          "gasType": "Diesel",
          "color": "White",
          "isNew": true,
          "horsepower": 120
        },
        {
          "type": "Sedan",
          "brand": "Toyota",
          "model": "Camry",
          "doors": 4,
          "gasType": "Petrol",
          "color": "Silver",
          "isNew": false,
          "horsepower": 180
        },
        {
          "type": "Hatchback",
          "brand": "Ford",
          "model": "Fiesta",
          "doors": 5,
          "gasType": "Petrol",
          "color": "Blue",
          "isNew": true,
          "horsepower": 100
        },
        {
          "type": "Convertible",
          "brand": "BMW",
          "model": "4 Series",
          "doors": 2,
          "gasType": "Petrol",
          "color": "Black",
          "isNew": true,
          "horsepower": 250
        },
        {
          "type": "Truck",
          "brand": "Chevrolet",
          "model": "Silverado",
          "doors": 4,
          "gasType": "Gasoline",
          "color": "Red",
          "isNew": false,
          "horsepower": 300
        },
        {
          "type": "Coupe",
          "brand": "Mercedes-Benz",
          "model": "C-Class",
          "doors": 2,
          "gasType": "Diesel",
          "color": "Gray",
          "isNew": false,
          "horsepower": 200
        },
        {
          "type": "SUV",
          "brand": "Honda",
          "model": "CR-V",
          "doors": 5,
          "gasType": "Hybrid",
          "color": "Green",
          "isNew": true,
          "horsepower": 160
        },
        {
          "type": "Sedan",
          "brand": "Nissan",
          "model": "Altima",
          "doors": 4,
          "gasType": "Gasoline",
          "color": "White",
          "isNew": true,
          "horsepower": 150
        },
        {
          "type": "Hatchback",
          "brand": "Hyundai",
          "model": "Veloster",
          "doors": 3,
          "gasType": "Petrol",
          "color": "Yellow",
          "isNew": false,
          "horsepower": 130
        },
        {
          "type": "Convertible",
          "brand": "Mazda",
          "model": "MX-5",
          "doors": 2,
          "gasType": "Gasoline",
          "color": "Red",
          "isNew": false,
          "horsepower": 180
        },
        {
          "type": "Truck",
          "brand": "Ram",
          "model": "1500",
          "doors": 4,
          "gasType": "Diesel",
          "color": "Blue",
          "isNew": true,
          "horsepower": 250
        },
        {
          "type": "Coupe",
          "brand": "Audi",
          "model": "A5",
          "doors": 2,
          "gasType": "Petrol",
          "color": "Silver",
          "isNew": true,
          "horsepower": 220
        },
        {
          "type": "SUV",
          "brand": "Kia",
          "model": "Sportage",
          "doors": 5,
          "gasType": "Hybrid",
          "color": "Black",
          "isNew": false,
          "horsepower": 170
        },
        {
          "type": "Sedan",
          "brand": "Subaru",
          "model": "Impreza",
          "doors": 4,
          "gasType": "Gasoline",
          "color": "Orange",
          "isNew": true,
          "horsepower": 140
        },
        {
          "type": "Hatchback",
          "brand": "Fiat",
          "model": "500",
          "doors": 3,
          "gasType": "Electric",
          "color": "Purple",
          "isNew": true,
          "horsepower": 80
        }
      ]
  ];

  // Populate select options
  const typeSelect = document.getElementById("type");
  const brandSelect = document.getElementById("brand");
  const gasTypeSelect = document.getElementById("gasType");
  const colorSelect = document.getElementById("color");

  const types = new Set();
  const brands = new Set();
  const gasTypes = new Set();
  const colors = new Set();

  cars.forEach(car => {
    types.add(car.type);
    brands.add(car.brand);
    gasTypes.add(car.gasType);
    colors.add(car.color);
  });

  types.forEach(type => {
    const option = document.createElement("option");
    option.textContent = type;
    typeSelect.appendChild(option);
  });

  brands.forEach(brand => {
    const option = document.createElement("option");
    option.textContent = brand;
    brandSelect.appendChild(option);
  });

  gasTypes.forEach(gasType => {
    const option = document.createElement("option");
    option.textContent = gasType;
    gasTypeSelect.appendChild(option);
  });

  colors.forEach(color => {
    const option = document.createElement("option");
    option.textContent = color;
    colorSelect.appendChild(option);
  });

  // Filter cars function
  function filterCars() {
    const filteredCars = cars.filter(car => {
      const type = document.getElementById("type").value;
      const brand = document.getElementById("brand").value;
      const model = document.getElementById("model").value.toLowerCase();
      const doors = parseInt(document.getElementById("doors").value);
      const gasType = document.getElementById("gasType").value;
      const color = document.getElementById("color").value;
      const isNew = document.getElementById("isNew").checked;
      const isOld = document.getElementById("isOld").checked;
      const minHorsepower = parseInt(document.getElementById("horsepower").value);

      return (type === "" || car.type === type) &&
             (brand === "" || car.brand === brand) &&
             (model === "" || car.model.toLowerCase().includes(model)) &&
             (isNaN(doors) || car.doors === doors) &&
             (gasType === "" || car.gasType === gasType) &&
             (color === "" || car.color === color) &&
             (isNew === false || car.isNew === true) &&
             (isOld === false || car.isNew === false) &&
             car.horsepower >= minHorsepower;
    });

    displayCars(filteredCars);
  }

  // Display filtered cars
  function displayCars(cars) {
    const tableBody = document.getElementById("carTableBody");
    tableBody.innerHTML = "";

    cars.forEach(car => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${car.type}</td>
        <td>${car.brand}</td>
        <td>${car.model}</td>
        <td>${car.doors}</td>
        <td>${car.gasType}</td>
        <td>${car.color}</td>
        <td>${car.isNew ? 'Yes' : 'No'}</td>
        <td>${car.horsepower}</td>
      `;
      tableBody.appendChild(row);
    });
  }

  // Update horsepower value display
  document.getElementById("horsepower").addEventListener("input", function() {
    document.getElementById("horsepowerValue").textContent = this.value;
  });

  // Initially display all cars
  displayCars(cars);

