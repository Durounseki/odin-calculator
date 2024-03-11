# The-Odin-Project

## Foundations Final Project: Calculator

This is a simple [__calculator__](https://durounseki.github.io/odin-calculator/) with graphic interface that looks like and old calculator from the 80's. The name of the calculator is a parody of one of the biggest japanese electronics company.

## Features

**The calculator is programmed to do sequential calculation from left to right**. For example the sequence `a` &plus; `b` &times; `c` &equals; , where `a`,`b` and `c` are numbers, evaluates to $(a+b)\times c$, rather than $a+(b\times c)$. I allowed the use of unary operations &plusmn;`a`, `a`&sup2;, &radic;`a`, &percnt;`a`, separating them into prefixing, &plusmn; and &radic;, and postfixing, &percnt; and &sup2;. The evaluation of prefixing operators is done upon input of a binary operation or the 'equals' operator. The evaluation of a postfixing operation is done upon input of that operation.

Since the calculator doesn't use operator precedence ([__PEMDAS/BEDMAS__](https://en.wikipedia.org/wiki/Order_of_operations)), and it includes both type of operators, binary and unary, it is necessary to carefully handle possible different scenarios with unusual input sequences such as 'num1' + 'binary' + 'prefixing' + 'num2' + 'postfixing', which currently evaluates to 'num1' + 'binary' + 'postfixing(prefixing(num2))'.

**There is basic memory capabilities**:

* store or add to memory `M+`, only works when there is no calculation ongoing this prevents sequences such as `a`&plus;`b`&plus;`M+` to add `b` to the memory.
* Recall memory `MR`, displays the number stored in memory only when the current state of the
display is empty.
* Clear memory `MC`, clears the number stored in memory, but do not affect the display.

**There is keyboard support, with the key map**:

* `0` - `9` : '0' - '9'
* &equals; : '='
* &plus; : '+'
* &minus; : '-'
* &times; : '*'
* &divide; : '/'
* &sup2; : 's'
* &radic; : 'r'
* &plusmn; : '±'
* &percnt; : '%'
* &#x232B; : 'backspace'
* `AC` : 'c'
* `M+` : 'm'
* `MR` : 'M'
* `MC` : 'C'

## Things to do

* [ ] There are still cases in which numerical errors lead to imprecisions like `3`&radic; &sup2; evaluates to $3.000001$.
* [ ] Separate script into modules.
* [ ] Write testing module.
* For a full list of solved issues and changes see [__CHANGELOG__](./CHANGELOG.md).

## Acknowledgements

* LCD fonts were obtained from [__CUFON fonts__](https://www.cufonfonts.com/).
* Other fonts were obtained from [__Google fonts__](https://fonts.google.com/).

## License

* [MIT License](https://opensource.org/licenses/MIT)
* Copyright &copy; 2024 Christian Esparza aka Durounseki
