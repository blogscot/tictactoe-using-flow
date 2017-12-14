# Using Flow Types

This project contains an implementation of a TicTacToe game based on the two-part Medium blog series, [Back to Basics: Using React + Flow][1], by `A. Sharif`.
My implementation generally follows the blog post, however, I preferred to stick to using *Maybe*s as far as possible. Also, I have developed some unit tests to verify that all the component parts of the game behaved as expected.

Also it should be noted, the game doesn't indicate to the player(s) when it is over as the point of the exercise is to learn how to use Flow types, however, it is possible to observe the changing state of the game using the `React Developer Tools`.

The core Flow Types used in the game can be found in two locations:

* _src/Declarations/flowTypes.js_ - the project's Flow types
* _src/flow-typed/_ - external defined Flow types used by the unit tests

## Running the Project

First install the project dependencies using either _npm_ or _yarn_:

```bash
yarn install (or npm install)
```

then use the _start_ script to run the application:

```bash
yarn start (or npm start)
```

The tests can be run in a similar fashion:

```bash
yarn test (or npm test)
```

## Further Reading

1. [Flow: A Static Type Checker for JavaScript](https://flow.org/en/)

[1]: https://medium.com/javascript-inside/back-to-the-basics-1bd3b12e38dc
