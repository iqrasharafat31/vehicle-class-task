class Vehicle {
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
        this.speed = 0;
    }

    getDetails() {
        return `Make: ${this.make}, Model: ${this.model}, Year: ${this.year}, Speed: ${this.speed} km/h`;
    }

    accelerate(amount) {
        this.speed += amount;
    }

    brake(amount) {
        this.speed -= amount;
        if (this.speed < 0) {
            this.speed = 0;
        }
    }

    static compareAge(vehicle1, vehicle2) {
        if (vehicle1.year < vehicle2.year) {
            console.log(`${vehicle1.make} ${vehicle1.model} is older.`);
        } else if (vehicle1.year > vehicle2.year) {
            console.log(`${vehicle2.make} ${vehicle2.model} is older.`);
        } else {
            console.log("Both vehicles are the same age.");
        }
    }
}

class Car extends Vehicle {
    constructor(make, model, year, numDoors) {
        super(make, model, year);
        this.numDoors = numDoors;
    }

    getDetails() {
        return `Make: ${this.make}, Model: ${this.model}, Year: ${this.year}, Doors: ${this.numDoors}, Speed: ${this.speed} km/h`;
    }

    honk() {
        console.log("Beep Beep!");
    }
}

class Motorcycle extends Vehicle {
    constructor(make, model, year, hasSidecar) {
        super(make, model, year);
        this.hasSidecar = hasSidecar;
    }

    getDetails() {
        const sidecarText = this.hasSidecar ? "Yes" : "No";
        return `Make: ${this.make}, Model: ${this.model}, Year: ${this.year}, Sidecar: ${sidecarText}, Speed: ${this.speed} km/h`;
    }

    wheelie() {
        if (this.speed > 20) {
            console.log("Doing a wheelie!");
        } else {
            console.log("Speed up first!");
        }
    }
}

// Create vehicles
const car1 = new Car("Toyota", "Corolla", 2018, 4);
const car2 = new Car("Honda", "Civic", 2020, 4);
const bike1 = new Motorcycle("Yamaha", "R15", 2019, false);

// Test accelerate & brake
car1.accelerate(50);
car1.brake(20);

bike1.accelerate(15);
bike1.wheelie();
bike1.accelerate(10);
bike1.wheelie();

// Test getDetails
console.log(car1.getDetails());
console.log(car2.getDetails());
console.log(bike1.getDetails());

// Test honk
car2.honk();

// Compare age
Vehicle.compareAge(car1, car2);
Vehicle.compareAge(car1, bike1);
