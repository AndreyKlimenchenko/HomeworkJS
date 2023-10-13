function ObjStorageFunc() {
  const storage = {};

  this.addValue = function (key, value) {
    storage[key] = value;
  };

  this.getValue = function (key) {
    return storage[key];
  };

  this.deleteValue = function (key) {
    if (key in storage) {
      delete storage[key];
      return true;
    }
    return false;
  };

  this.getKeys = function () {
    return Object.keys(storage);
  };
}

let ObjStorage = new ObjStorageFunc();

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
    ? alert(name + " готовится из: " + result.recipe + " и он алкогольный!")
    : alert(name + ":" + result.recipe + " и он безалкогольный!");
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
