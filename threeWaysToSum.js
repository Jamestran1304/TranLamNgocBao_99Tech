// Using loop statement
function sum_to_n_a(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

// Using the arithmetic series formula:
function sum_to_n_b(n) {
  return (n * (n + 1)) / 2;
}

// Using recursion:

function sum_to_n_c(n) {
  if (n === 1) {
    return 1;
  } else {
    return n + sum_to_n_c(n - 1);
  }
}
