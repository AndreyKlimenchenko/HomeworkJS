class ObjStorageClass {
  #storage = {};

  addValue(key, value) {
    this.#storage[key] = value;
  }

  getValue(key) {
    return this.#storage[key];
  }

  deleteValue(key) {
    if (key in this.#storage) {
      delete this.#storage[key];
      return true;
    }
    return false;
  }

  getKeys() {
    return Object.keys(this.#storage);
  }
}

let ObjStorage = new ObjStorageClass();

function addDrink() {
  const name = prompt("Введите название напитка");
  const recipe = prompt("Введите состав напитка");
  const alco = confirm("Напиток алкогольный?");
  ObjStorage.addValue(name, { recipe: recipe, alco: alco });
}

function getDrink() {
  const name = prompt("Введите название напитка");
  const result = ObjStorage.getValue(name);
  result.alco
    ? alert("Напиток " + name + " готовится из: " + result.recipe + " и он алкогольный!")
    : alert("Напиток " + name + ":" + result.recipe + " и он безалкогольный!");
}

function deleteDrink() {
  const name = prompt("Введите название напитка");
  const result = ObjStorage.deleteValue(name);
  alert(result ? "Напиток удален" : "Не найден");
}

function showDrink() {
  const list = ObjStorage.getKeys();
  alert(list.join("\n"));
}
