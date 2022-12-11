//first example

console.log(this); // global window

// second example

const obj = [
  {
    id: 1,
    todo: "Work all time",
    completed: false,
    DoAction: function () {
      console.log(this.todo, "name of todo");
    },
  },
  {
    id: 2,
    todo: "Drink coffee",
    completed: true,
    DoAction: function () {
      console.log(this.todo, "name of todo");
    },
  },
];

obj[0].DoAction();
obj[1].DoAction();

// Third example

class Todo {
  constructor(completed) {
    this.completed = completed;
  }

  DoAction() {
    console.log(
      `This todo is ${this.completed ? "completed" : "not completed"}`
    );
  }
}

const cls = new Todo(true);
cls.DoAction();

// Fourth example about error

const issueObject = {
  price: 120,
  good: "PC",
  madeIn: "The USA",
  produced: true,
  showPrice: function () {
    setTimeout(() => {
      if (this.produced) {
        // console.log(`${this.good} costs ${this.price}`);
        this.price = 300;
      }
    }, 0);
  },
};

issueObject.showPrice();
console.log(issueObject.price);

// bind call apply

const newObj = {
  todo: "New Todo",
};

const bindObj = obj[0].DoAction.bind(newObj);

bindObj(); // execute bind method

obj[1].DoAction.call({
  todo: "To watch Mr.Robot",
}); // execute call method

const obj2 = {
  color: "red",
  size: "20x20",
  showDetail: function () {
    console.log(this.color, this.size);
  },
};

// Remember We can't send context to arrow functions, therefore only for function declaration

obj2.showDetail.call({
  color: "green",
  size: "145x50",
});
