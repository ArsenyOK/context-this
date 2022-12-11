# Context 'this' in JavaScript
In this topic I'll try to explain about `this` with simple tongue
So What I know beginners are familiar with this topic but they can't or don't understand word `this` deeply. I reckon It's a significant topic for any level.

Let's start

### `this` is a pointer who points to JavaScript Object
Below I'll show you examples.

### 1. `console.log(this); // Interesting Why we will get it?`

After executed that expression we have Global object `window`. Why? It looks strange but it's fine

That expression shows us global window. We don't have function or object in prev example and Context 'this' will take in object Window 
Because It is the outermost JavaScript context.

### 2. Use `this` in objects and functions
```no-highlight
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
```
With using `this` you can return value and use it.

*View*

![secondThis](https://user-images.githubusercontent.com/43606985/206923838-2356e301-f152-4e3a-a876-2e811269ee7d.PNG)

I think It looks obvious What we got

### 3. Context in Classes
You can use it in Javascript Objects

```no-highlight
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
```

*View*

![thirdThis](https://user-images.githubusercontent.com/43606985/206924033-5d731f7f-4be3-4fe7-8386-ee152ec06e01.PNG)

### 3. An issue with `this`

Sometimes we are not in the context we expected. This can happen when calling a function inside the context of another object. The most common example when using setTimeout or setInterval:

```no-highlight
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
```
What we got:
*`120`*
Why?
*setTimeout is Web API that is `window`. When we call this method, we return to the window context. This means that the instructions tried to change window.price, but nothing happened because of the if statement. It's called context loss. And in next examples I will show you How to fix it*

**Remember: Context only makes sense inside functions.**

### 4. Methods: bind, call, apply


* **`bind()`** is method who pass context to function and after that you need to call function

*Example*
```no-highlight
  const newObj = {
  todo: "New Todo",
};

const bindObj = obj[0].DoAction.bind(newObj);

bindObj(); // execute bind method
```

*View*

![bindThis](https://user-images.githubusercontent.com/43606985/206924712-7d461ff4-6bd7-4f8f-bab7-58f3dbe9f5a2.PNG)


* **`call()`** makes the same like `bind()` method but we don't need to call function
```no-highlight
const obj2 = {
  color: "red",
  size: "20x20",
  showDetail: function () {
    console.log(this.color, this.size);
  },
};

obj2.showDetail.call({
  color: "green",
  size: "145x50",
});
```

*View*

![callThis](https://user-images.githubusercontent.com/43606985/206924720-3aca5c91-be66-4a1e-9ba0-38a215769933.PNG)


* **`apply()`** is also the same like `call()`
The fundamental difference between the two is that the call() function takes a list of arguments, while the apply() function takes a single array of arguments.
```no-highlight
const numbers = [5, 6, 2, 3, 7];

let max = Math.max.apply(null, numbers);
console.log(max, 'max');
```
*View*

![applyThis](https://user-images.githubusercontent.com/43606985/206924998-547d85ac-7428-473e-8699-a013eb6216a1.PNG)


**Remember We can't send context to arrow functions, therefore only for function declaration**
