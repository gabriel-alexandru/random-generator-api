# Random Generator API

#### Response Object

**Person**

```json
{
  "ID": 0, // Progressive counter from 0.
  "name": "Gabriel", // Name picked randomly from a list of 1000 names for male and 1000 names for female.
  "surname": "Alexandru", // Surname picked randomly from a list of 50 surnames.
  "gender": "m", // Specified in the request or choosen random if not defined.
  "age": 19 // Numbe generated randomly, between 1 and 100.
}
```

**Roll**

```json
{
  "ID": 0, // Progressive counter from 0.
  "timestamp": "2021-06-30T00:22:18.486Z", // UTC formatted date and time.
  "roll": 6 // Number generated randomly between 1 and the "number_of_faces" (If not specified will be 6).
}
```

**CoinFlip**

```json
{
  "ID": 0, // Progressive counter from 0.
  "timestamp": "2021-06-30T00:22:18.486Z", // UTC formatted date and time.
  "flip": "T" // String character picked randomly. Can be "H" (Head) or "T" (Tail).
}
```

---

#### Random People

- GET /people/:gender/:amount

  Will return an array of _amount_ Person objects with the specified _gender_.
  If _amount_ equals 1 than will return only an object instead of an array.

  <br />
  Example:

  GET /people/male/2
  <br />

- GET /people/:gender

  Will return a Person object with the specified _gender_

  <br />
  Example:

  GET /people/male
  <br />

- GET /people

  Will return a Person object with a random _gender_
  There is the possibility to specify the amount and the gender using **?amount=** **gender=**.
  (It's the same as calling GET /people/:gender/:amount).

  <br />
  Example:

  /people?amuount=10&gender=male

---

#### Roll dice

- GET /dice/:faces/:amount

  Will return an array with _amount_ Roll object with the specified _faces_.
  If _amount_ equals 1 than will return only an object instead of an array.

  <br />
  Example:

  GET /dice/6/2
  <br />

- GET /dice/:faces

  Will return a Roll object with the specified _faces_.

  <br />
  Example:

  GET /dice/20
  <br />

- GET /dice

  Will return a Roll object.
  There is the possibility to specify the amount of rolls and the number of faces using **?amount=** and **?faces=**.
  (It's the same as calling GET /dice/:faces/:amount).

  <br />
  Example:

  /dice?amount=10&faces=5

---

#### Flip Coin

- GET /coin/:amount

  Will return an array with _amount_ CoinFlip objects.
  If _amount_ equals 1 than will return only an object instead of an array.

  <br />
  Example:

  GET /coin/2
  <br />

- GET /coin

  Will return a CoinFlip objects.
  There is the possibility to specify the amount of times to flip a coin using, for example, **?amount=**.
  (It's the same as calling GET /coin/:amount).

  <br />
  Example:

  /coin?amount=10

---
