# Random Generator API

This is a simple API that generates different random objects. **DISCLAIMER** THIS API IS NOT YET AVAILABLE ONLINE.

## Response Object

**Person**

```json
{
  "ID": 0,
  "name": "John",
  "surname": "Doe",
  "gender": "m",
  "age": 19
}
```

- **ID** is a counter used to identify the object in the array. It starts from 0.
- **name** is picked randomly from a list of names (1000 for male and 1000 for female).
- **surname** is picked randomly from a list of 50 surnames.
- **gender** is specified by the request. If it is not specified, or if is equals to both, it is picked randomly.
- **age** is a random number between 1 and 100.

**Roll**

```json
{
  "ID": 0,
  "timestamp": "2021-06-30T00:22:18.486Z",
  "roll": 6
}
```

- **ID** is a counter used to identify the object in the array. It starts from 0.
- **timestamp** is a UTC formatted string containing date and time of the operation.
- **roll** is a random number between 1 and the number of faces specified in the request. If it is not specified is assumed to be 6.

**CoinFlip**

```json
{
  "ID": 0,
  "timestamp": "2021-06-30T00:22:18.486Z",
  "flip": "T"
}
```

- **ID** is a counter used to identify the object in the array. It starts from 0.
- **timestamp** is a UTC formatted string containing date and time of the operation.
- **flip** is a string character choosen randomly between "H" and "T", head and tail.

---

## Generate People

The parameters can be passed using URL query too.

| Method  | Endpoint                | Description                                                                                                  | Parameters values                                                                                                                                                    |
| ------- | ----------------------- | ------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **GET** | /people                 | Return a Person object with a random _gender_                                                                |                                                                                                                                                                      |
| **GET** | /people/:gender         | Return a Person object with the specified _gender_                                                           | <ul><li>**gender**: "male" or "m", "female" or "f", "both". Not case sensitive.</li></ul>                                                                            |
| **GET** | /people/:gender/:amount | Return an array with _amount_ Person objects. If _amount_ equals 1 then return an object instead of an array | <ul><li> **gender**: "male" or "m", "female" or "f", "both". Not case sensitive.</li> <li>**amount**: The amount of objects wanted. Must be greater than 0</li></ul> |

---

## Roll dice

The parameters can be passed using URL query too.

| Method  | Endpoint             | Description                                                                                                 | Parameters values                                                                                                                                                 |
| ------- | -------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **GET** | /dice                | Return a Roll object                                                                                        |
| **GET** | /dice/:faces         | Return a Roll object with the specified number of _faces_                                                   | <ul><li>**faces**: The number of faces for the dice. Must be greater than 0.</li></ul>                                                                            |
| **GET** | /dice/:faces/:amount | Return an array with _amount_ Roll objects. If _amount_ equals 1 then return an object instead of an array. | <ul><li>**faces**: The number of faces for the dice. Must be greater than 0.</li> <li>**amount**: The amount of objects wanted. Must be greater than 0.</li></ul> |

---

## Flip Coin

The parameters can be passed using URL query too.

| Method  | Endpoint      | Description                                                                                                     | Parameters values                                                                    |
| ------- | ------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| **GET** | /coin         | Return a CoinFlip object                                                                                        |
| **GET** | /coin/:amount | Return an array with _amount_ CoinFlip objects. If _amount_ equals 1 then return an object instead of an array. | <ul> <li>**amount**: The amount of objects wanted. Must be greater than 0.</li></ul> |
