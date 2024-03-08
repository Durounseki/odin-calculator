# The-Odin-Project

## Foundations Final Project: Calculator

This is a simple calculator with graphic interface that looks like and old calculator from the 80's. The name of the calculator is a parody of one of the biggest japanese electronics company.

The calculator is programmed to do sequential calculation from left to right. For example the sequence `a` &plus; `b` &times; `c` &equals; , where `a`,`b` and `c` are numbers, evaluates to $(a+b)\times c$, rather than $a+(b\times c)$. I allowed the use of unary operations &plusmn;`a`, `a`&sup2;, &radic;`a`, &percnt;`a`, where the sequences where a sequence `a`&plus;&radic;`b`&equals;, evaluates to $a+\sqrt{b}$. The sequence &plusmn;`a` and so does the sequence &radic; &plusmn; when there is already an input `a`, but it returns and error when there is no input.

There is keyboard support, with the key map:

* &plus; : '+'
* &minus; : '-'
* &times; : '*'
* &divide; : '/'
* &sup2; : 's'
* &radic; : 'r'
* &plusmn; : '±'
* &percnt; : '%'

Things to do:

* [ ] Remove trailing point on rounded numbers, for example the sequence `10`&radic; &sup2; evaluates to $10.00000$ after truncation and renders as `10.`
* [ ] Fix evaluation of square operator. The &sup2; operator is a postfixing operator in contrast to the other unary operators. At the moment the sequence `a`&plus; `b` &sup2; &times; `c` evaluates correctly, but the result $(a+b)^2$ doesn't display before typing &times; or other operator.
* [ ] Add memory functionalities.
* [ ] Change percent operation to unary.
* [ ] Separate script into modules.
