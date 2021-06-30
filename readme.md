# Random Generator API

This is a simple API that generates different random objects. **DISCLAIMER** THIS API IS NOT YET AVAILABLE ONLINE.

#### Response Object

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

**ID** is a counter used to identify the object in the array. It starts from 0.
**name** is picked randomly from a list of names (1000 for male and 1000 for female).
**surname** is picked randomly from a list of 50 surnames.
**gender** is specified by the request. If it is not specified, or if is equals to both, it is picked randomly.
**age** is a random number between 1 and 100.

**Roll**

```json
{
  "ID": 0,
  "timestamp": "2021-06-30T00:22:18.486Z",
  "roll": 6
}
```

**ID** is a counter used to identify the object in the array. It starts from 0.
**timestamp** is a UTC formatted string containing date and time of the operation.
**roll** is a random number between 1 and the number of faces specified in the request. If it is not specified is assumed to be 6.

**CoinFlip**

```json
{
  "ID": 0,
  "timestamp": "2021-06-30T00:22:18.486Z",
  "flip": "T"
}
```

**ID** is a counter used to identify the object in the array. It starts from 0.
**timestamp** is a UTC formatted string containing date and time of the operation.
**flip** is a string character choosen randomly between "H" and "T", head and tail.

---

#### Endpoints

| Method  | Endpoint                | Description                                                                                                  |
| ------- | ----------------------- | ------------------------------------------------------------------------------------------------------------ |
| **GET** | /people                 | Return a Person object with a random _gender_                                                                |
| **GET** | /people/:gender         | Return a Person object with the specified _gender_                                                           |
| **GET** | /people/:gender/:amount | Return an array with _amount_ Person objects. If _amount_ equals 1 then return an object instead of an array |

---

#### Roll dice

| Method  | Endpoint             | Description                                                                                                 |
| ------- | -------------------- | ----------------------------------------------------------------------------------------------------------- |
| **GET** | /dice                | Return a Roll object                                                                                        |
| **GET** | /dice/:faces         | Return a Roll object with the specified number of _faces_                                                   |
| **GET** | /dice/:faces/:amount | Return an array with _amount_ Roll objects. If _amount_ equals 1 then return an object instead of an array. |

---

#### Flip Coin

| Method  | Endpoint      | Description                                                                                                    |
| ------- | ------------- | -------------------------------------------------------------------------------------------------------------- |
| **GET** | /coin         | Return a CoinFlip object                                                                                       |
| **GET** | /coin/:amount | Return an array with _amount_ CoinFlip objects. If _amount_ equals 1 the return an object instead of an array. |
