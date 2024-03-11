# List of changes

* [x] Remove trailing point on rounded numbers, for example the sequence `10`&radic; &sup2; evaluates to $10.00000$ after truncation and renders as `10.`
* [x] Fix evaluation of square operator. The &sup2; operator is a postfixing operator in contrast to the other unary operators. At the moment the sequence `a`&plus; `b` &sup2; &times; `c` evaluates correctly, but $b^2$ doesn't display before typing &times; or other operator.
* [x] &sup2;`a` displays `0a`.
* [x] Add memory functionalities.
* [x] Change percent operation to unary.
* [x] When `ERROR` is displayed and another operation key is typed, the calculation proceeds. For example, if the operation is unitary, then `NAN` is displayed. This should be fixed to abort any calculation and clear the display.
* [x] Division by zero displays 'NAN' instead of 'ERROR'.
* [x] Handle cases in which display is empty but there is a calculation ongoing.
* [x] Remove empty display.digits if it only contains '-'.
* [x] $\sqrt{C}$ or $\% C$ doesn't work.
* [x] &radic; + &plusmn; `a` + &equals; does not return error.
* [x] &plusmn; + `a` + &radic; does not return error.
* [x] Erase unary when the current is empty and delete key is pressed.
* [x] Change delete to AC if `ERROR` is displayed.
* [x] `a` + &plus; + &plusmn; + &equals; displays `-aa`.
* [x] When display shows '0' and next input is a number, only add a dot.
* [x] When a postfixing operation is evaluated and there is a binary operation ongoing, trying to input a new number removes the current number. I need to change this to reset display and memory.
* [x] Change delete behavior to remove digit from current instead of digits.
