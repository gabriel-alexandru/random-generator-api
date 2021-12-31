# Random Generator API

This is a simple API that generates different random objects.

The API is published here: [https://random-generator-api.vercel.app](https://random-generator-api.vercel.app);

## Response Object

**Error**

Return a 400 HTTP code with the following JSON object.

```json
{
  "status": 400,
  "error": "Error message"
}
```

- **status** is the HTTP status code for the error.
- **error** is the string with a message related to the error.

**Person**

Return a 200 HTTP code with the following JSON object.

```json
{
  "ID": 0,
  "name": "John",
  "surname": "Doe",
  "gender": "m",
  "age": 19,
  "dateOfBirth": {
    "year": 2001,
    "month": 7,
    "day": 14
  }
}
```

- **ID** is a counter used to identify the object in the array. It starts from 0.
- **name** is picked randomly from a list of names (1000 for male and 1000 for female).
- **surname** is picked randomly from a list of 50 surnames.
- **gender** is specified by the request. If it is not specified, or if is equals to both, it is picked randomly.
- **age** is a number generated based on today's date and the date of birth.
- **date** is a randomly generated date.

**Roll**

Return a 200 HTTP code with the following JSON object.

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

Return a 200 HTTP code with the following JSON object.

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

**RPS**

Return a 200 HTTP code with the following JSON object.

```json
{
  "ID": 0,
  "timestamp": "2021-06-30T00:22:18.486Z",
  "result": "Rock"
}
```

- **ID** is a counter used to identify the object in the array. It starts from 0.
- **timestamp** is a UTC formatted string containing date and time of the operation.
- **result** is a string with the three possible result: "Rock", "Paper", "Scissor".

**Color**

Return a 200 HTTP code with the following JSON object.

```json
{
  "ID": 0,
  "timestamp": "2021-06-30T00:22:18.486Z",
  "color": {
    "r": 255,
    "g": 255,
    "b": 255
  }
}
```

- **ID** is a counter used to identify the object in the array. It starts from 0.
- **timestamp** is a UTC formatted string containing date and time of the operation.
- **color** is an object containing the values for the color in the specified format.

**Place**

Return a 200 HTTP code with the following JSON object.

```json
{
  "ID": 0,
  "timestamp": "2021-06-30T00:22:18.486Z",
  "lat": "41.902782",
  "lon": "12.496366"
}
```

- **ID** is a counter used to identify the object in the array. It starts from 0.
- **timestamp** is a UTC formatted string containing date and time of the operation.
- **lat** is a string containing a random latitude.
- **lon** ia a string containing a random longitude;

**Password**

Return a 200 HTTP code with the following JSON object.

```json
{
  "ID": 0,
  "timestamp": "2021-06-30T00:22:18.486Z",
  "password": "uifbfhcgufkuzgkmeduq"
}
```

- **ID** is a counter used to identify the object in the array. It starts from 0.
- **timestamp** is a UTC formatted string containing date and time of the operation.
- **password** is a string with the generated password.

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

---

## RockPaperScissor

| Method  | Endpoint | Description         | Parameters values |
| ------- | -------- | ------------------- | ----------------- |
| **GET** | /rps     | Return a RPS object |                   |

---

## Color

The parameters can be passed using URL query too.

| Method  | Endpoint               | Description                                                                                                  | Parameters values                                                                                                                                                                                                                 |
| ------- | ---------------------- | ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **GET** | /color                 | Return a Color object in hexadecimal format.                                                                 |                                                                                                                                                                                                                                   |
| **GET** | /color/:format         | Return a Color object in the specified format                                                                | <ul> <li>**format**: The format of the color. Possible values are: "HSB" or "HSL", "CMYK", "RGB", "HEX" or "HEXADECIMAL". Not case sensitive.</li> </ul>                                                                          |
| **GET** | /color/:format/:amount | Return an array with _amount_ Color objects. If _amount_ equals 1 then return an object instead of an array. | <ul><li>**format**: The format of the color. Possible values are: "HSB" or "HSL", "CMYK", "RGB", "HEX" or "HEXADECIMAL". Not case sensitive.</li> <li>**amount**: The amount of objects wanted. Must be greater than 0.</li></ul> |

---

## Place

The parameters can be passed using URL query too.

| Method  | Endpoint       | Description                                                                                                  | Parameters values                                                                   |
| ------- | -------------- | ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| **GET** | /place         | Return a Place object.                                                                                       |                                                                                     |
| **GET** | /place/:amount | Return an array with _amount_ Place objects. If _amount_ equals 1 then return an object instead of an array. | <ul><li>**amount**: The amount of objects wanted. Must be greater than 0.</li></ul> |

---

## Password

Request Body:

```json
{
  "length": 20,
  "symbols": true,
  "numbers": true,
  "uppercase": true
}
```

- **length** is the amount of characters for the password. Can be either a number or a string (20 or '20' or "20"). Default is 8.
- **symbols** is a boolean flag to specify if symbols need to be inside password. Default is false.
- **numbers** is a boolean flag to specify if numbers need to be inside password. Default is false
- **uppercase** is a boolean flag to specify if uppercase letters need to be inside password. Default is false.

| Method  | Endpoint          | Description                                                                                                     | Parameters values                                                                   |
| ------- | ----------------- | --------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| **GET** | /password         | Return a password object.                                                                                       |                                                                                     |
| **GET** | /password/:amount | Return an array with _amount_ Password objects. If _amount_ equals 1 then return an object instead of an array. | <ul><li>**amount**: The amount of objects wanted. Must be greater than 0.</li></ul> |
