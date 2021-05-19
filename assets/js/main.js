class Stack {
  constructor() {
    this.stack = [];
  }

  push(item) {
    return this.stack.push(item);
  }

  pop() {
    return this.stack.pop();
  }

  peek() {
    return this.stack[this.length - 1];
  }

  get length() {
    return this.stack.length;
  }

  isEmpty() {
    return this.length === 0;
  }
}

isNumber = function (phim) {
  if (
    phim === "zero" ||
    phim === "one" ||
    phim === "two" ||
    phim === "three" ||
    phim === "four" ||
    phim === "five" ||
    phim === "six" ||
    phim === "seven" ||
    phim === "eight" ||
    phim === "nine" ||
    phim === "0" ||
    phim === "1" ||
    phim === "2" ||
    phim === "3" ||
    phim === "4" ||
    phim === "5" ||
    phim === "6" ||
    phim === "7" ||
    phim === "8" ||
    phim === "9"
  ) {
    return true;
  }
  return false;
};
isOperator = function (phim) {
  if (
    phim === "cong" ||
    phim === "tru" ||
    phim === "nhan" ||
    phim === "chia" ||
    phim === "+" ||
    phim === "-" ||
    phim === "*" ||
    phim === "/" ||
    phim === "^"
  ) {
    return true;
  }
  return false;
};
prec = function (operator) {
  if (operator === "+" || operator === "-") {
    return 1;
  }
  if (operator === "*" || operator === "/") {
    return 2;
  }
  if (operator === "^") {
    return 3;
  }
  return 0;
};
testExpression = function (expression) {
  var x = 0,
    y = 0;
  for (let i = 0; i < expression.length; ++i) {
    if (expression[i] === "(") {
      x++;
      continue;
    }
    if (expression[i] === ")") {
      y++;
      continue;
    }
    if (
      isOperator(expression[i]) ||
      isNumber(expression[i]) ||
      expression[i] === "." ||
      expression[i] === " "
    ) {
      continue;
    }
    return false;
  }
  if (x !== y) {
    return false;
  }
  return true;
};
standardizedExpression = function (expression) {
  var ans = "";
  if (!testExpression(expression)) {
    alert("Expression wrong");
    return 0;
  }
  for (let i = 0; i < expression.length; i++) {
    if (expression[i] === " ") {
      continue;
    }
    if (expression[i] === "(") {
      ans = ans + expression[i] + " ";
      continue;
    }
    if (expression[i] === ")") {
      ans = ans + " " + expression[i];
      continue;
    }
    if (isOperator(expression[i])) {
      ans = ans + " " + expression[i] + " ";
    } else {
      ans = ans + expression[i];
    }
  }
  return ans;
};
convertToPostfix = function (infix) {
  postfix = "";
  var Op = new Stack();
  for (let i = 0; i < infix.length; i++) {
    if (infix[i] === " ") {
      continue;
    }
    if (isNumber(infix[i])) {
      while (isNumber(infix[i]) || infix[i] === ".") {
        postfix += infix[i];
        i++;
      }
      postfix += " ";
      continue;
    }
    if (infix[i] === "(") {
      Op.push(infix[i]);
    }
    if (isOperator(infix[i])) {
      if (Op.isEmpty()) {
        Op.push(infix[i]);
      } else {
        while (!Op.isEmpty() && prec(Op.peek()) >= prec(infix[i])) {
          postfix = postfix + Op.peek() + " ";
          Op.pop();
        }
        Op.push(infix[i]);
      }
      continue;
    }
    if (infix[i] == ")") {
      while (!Op.isEmpty() && isOperator(Op.peek())) {
        postfix = postfix + Op.peek() + " ";
        Op.pop();
      }
      Op.pop();
      continue;
    }
  }
  while (!Op.isEmpty()) {
    postfix = postfix + Op.peek() + " ";
    Op.pop();
  }
  return postfix;
};
Calculator = function (x, y, op) {
  if (op === "+") {
    return x + y;
  }
  if (op === "-") {
    return x - y;
  }
  if (op === "*") {
    return x * y;
  }
  if (op === "/") {
    return x / y;
  }
  if (op === "^") {
    return x ** y;
  }
  return 0;
};
calculatorByPostfix = function (postfix) {
  if (postfix.length == 0) {
    return 0;
  }
  var Op = new Stack();
  var number = new Stack();
  var x;
  for (let i = 0; i < postfix.length; ++i) {
    if (postfix[i] === " ") {
      continue;
    }
    if (isNumber(postfix[i])) {
      var temp = 0;
      var check = 0;
      var fl = 0;
      while (isNumber(postfix[i]) || postfix[i] === ".") {
        if (postfix[i] === ".") {
          check = -1;
          ++i;
          continue;
        }
        var x = postfix[i] - "0";
        if (check === 0) {
          temp = temp * 10 + x;
        } else {
          if (check === -1) {
            check = 0;
          }
          fl = fl * 10 + x;
          ++check;
        }
        ++i;
      }
      while (check !== 0) {
        fl = fl / 10;
        --check;
      }
      temp = temp + fl;
      number.push(temp);
      continue;
    }
    if (isOperator(postfix[i])) {
      var y = number.peek();
      number.pop();
      var x = number.peek();
      number.pop();
      number.push(Calculator(x, y, postfix[i]));
    }
  }
  return Math.round(number.peek() * 1000) / 1000;
};
insert = function (phim) {
  document.getElementsByClassName(phim)[0].onclick = function () {
    if (phim === "fun") {
      document.getElementsByClassName("screen")[0].innerHTML = "THU UYEN";
      screen = "THU UYEN";
      return true;
    }
    let screen = document.getElementsByClassName("screen")[0].innerHTML;
    if (screen === "THU UYEN" || (screen === "0" && isNumber(phim))) {
      document.getElementsByClassName("screen")[0].innerHTML = "";
      screen = "";
    }
    if (screen === "" && isOperator(phim)) {
      document.getElementsByClassName("screen")[0].innerHTML = "0";
      screen = "0";
      return false;
    }
    if (screen.length === 12) {
      return false;
    }
    document.getElementsByClassName("screen")[0].innerHTML +=
      document.getElementsByClassName(phim)[0].innerHTML;
  };
};
insert("fun");
insert("zero");
insert("one");
insert("two");
insert("three");
insert("four");
insert("five");
insert("six");
insert("seven");
insert("eight");
insert("nine");
insert("cham");
insert("cong");
insert("tru");
insert("nhan");
insert("chia");

document.getElementsByClassName("C")[0].onclick = function () {
  document.getElementsByClassName("screen")[0].innerHTML = "0";
};

document.getElementsByClassName("Del")[0].onclick = function () {
  let screen = document.getElementsByClassName("screen")[0].innerHTML;
  if (screen.length === 1) {
    document.getElementsByClassName("screen")[0].innerHTML = "0";
  } else {
    document.getElementsByClassName("screen")[0].innerHTML = screen.slice(
      0,
      screen.length - 1
    );
  }
};
document.getElementsByClassName("bang")[0].onclick = function () {
  var screen = document.getElementsByClassName("screen")[0].innerHTML;
  screen = calculatorByPostfix(
    convertToPostfix(standardizedExpression(screen))
  );
  document.getElementsByClassName("screen")[0].innerHTML = screen;
};
