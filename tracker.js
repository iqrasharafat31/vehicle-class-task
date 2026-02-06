// Part 1: Core Class
class Tracker {
    #values; // private field for values
    #isLocked;

    constructor(label) {
        this.label = label || "Tracker";
        this.#values = [];
        this.#isLocked = false;
    }

    // Part 2: Instance Methods

    add(value) {
        if (this.#isLocked) return this.#values.length;
        if (typeof value === "number" && isFinite(value)) {
            this.#values.push(value);
        }
        return this.#values.length;
    }

    remove(predicateFn) {
        if (this.#isLocked) return 0;
        if (typeof predicateFn !== "function") return 0;

        const originalLength = this.#values.length;
        this.#values = this.#values.filter((v) => !predicateFn(v));
        return originalLength - this.#values.length;
    }

    lock() {
        if (!this.#isLocked) {
            this.#isLocked = true;
            return true;
        }
        return false;
    }

    // Part 3: Derived Data (Read-only)
    get count() {
        return this.#values.length;
    }

    get sum() {
        return this.#values.reduce((acc, v) => acc + v, 0);
    }

    get average() {
        return this.#values.length ? this.sum / this.#values.length : null;
    }

    get isLocked() {
        return this.#isLocked;
    }

    get values() {
        return [...this.#values]; // return a copy so it cannot be mutated externally
    }

    // Part 4: Static Method
    static merge(trackersArray) {
        if (!Array.isArray(trackersArray)) return null;

        const mergedTracker = new Tracker(
            "Merged-" +
            trackersArray
                .map((t) => (t instanceof Tracker ? t.label : ""))
                .filter(Boolean)
                .join("-")
        );

        trackersArray.forEach((tracker) => {
            if (tracker instanceof Tracker && !tracker.isLocked) {
                tracker.values.forEach((v) => mergedTracker.add(v));
            }
        });

        return mergedTracker;
    }
}

// Part 5: Standalone Function
function normalize(tracker, transformFn) {
    if (!(tracker instanceof Tracker)) return null;
    if (tracker.isLocked) return null;
    if (typeof transformFn !== "function") return null;

    const newTracker = new Tracker(tracker.label + "-normalized");
    tracker.values.forEach((v) => {
        const result = transformFn(v);
        if (typeof result === "number" && isFinite(result)) {
            newTracker.add(result);
        }
    });

    return newTracker;
}
// Create tracker
const t1 = new Tracker("T1");

// Invalid inputs
t1.add("hello"); // ignored
t1.add(Infinity); // ignored
console.log(t1.count); // 0

// Add valid values
t1.add(10);
t1.add(20);
console.log(t1.count); // 2
console.log(t1.sum); // 30
console.log(t1.average); // 15

// Remove values
const removed = t1.remove((v) => v > 15);
console.log(removed); // 1
console.log(t1.values); // [10]

// Attempt to remove with invalid argument
console.log(t1.remove("not-a-function")); // 0

// Locking
t1.lock();
t1.add(50); // ignored because locked
console.log(t1.values); // [10]

// Merging trackers
const t2 = new Tracker("T2");
t2.add(5);
const t3 = new Tracker("T3");
t3.add(15);
t3.lock(); // locked tracker should be ignored

const merged = Tracker.merge([t1, t2, t3, "invalid"]);
console.log(merged.label); // "Merged-T1-T2-T3"
console.log(merged.values); // [5, 10] (t3 ignored)

// Normalization
const normalized = normalize(t2, (v) => v * 2);
console.log(normalized.values); // [10]

// Invalid normalization attempts
console.log(normalize(t1, (v) => v * 2)); // null because t1 is locked
console.log(normalize(t2, "not-a-function")); // null
