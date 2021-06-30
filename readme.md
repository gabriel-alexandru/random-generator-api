# Random Generator API

This is a simple API that generates different random objects. **DISCLAIMER** THIS API IS NOT YET AVAILABLE ONLINE.

#### Response Object

**Person**

```json
{
  "ID": 0,
  "name": "Gabriel",
  "surname": "Alexandru",
  "gender": "m",
  "age": 19
}
```

ID is a counter used to identify the object in the array. It starts from 0.
name is picked randomly from a list of names (1000 for male and 1000 for female).
surname is picked randomly from a list of 50 surnames.
gender is specified by the request. If it is not specified, or if is equals to both, it is picked randomly.
age is a random number between 1 and 100.

**Roll**

```json
{
  "ID": 0,
  "timestamp": "2021-06-30T00:22:18.486Z",
  "roll": 6
}
```

ID is a counter used to identify the object in the array. It starts from 0.
timestamp is a UTC formatted string containing date and time of the operation.
roll is a random number between 1 and the number of faces specified in the request. If it is not specified is assumed to be 6.

**CoinFlip**

```json
{
  "ID": 0,
  "timestamp": "2021-06-30T00:22:18.486Z",
  "flip": "T"
}
```

ID is a counter used to identify the object in the array. It starts from 0.
timestamp is a UTC formatted string containing date and time of the operation.
flip is a string character choosen randomly between "H" and "T", head and tail.

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
