# Login to Sprout using CLI

## Requirements

- [Node JS](https://nodejs.org/en/)

## Installation

```bash
npm install
```

## Environment

Copy the `.env.example` and change values

| Variable   | Description                | Type     | Required |
| :--------- | :------------------------- | :------- | :------- |
| `BASE_URL` | The base url of Sprout Hub | `string` | Yes      |

## Usage

To get all commands, just run:

```bash
./index.js
```

### Login

To login, just run

```bash
./index.js login [username] [password]
```

_Change your `[username]` and `[password]`_

### Logout

To logout, just run

```bash
./index.js logout [username] [password]
```

_Change your `[username]` and `[password]`_

## Options

All the available options

### IP Address

If you want to personalize the IP Address to be added in Biologs, by default it will generate random IP

_Example_

```bash
./index.js login 'jag@flexisource' 'mypassword' --ip 8.8.8.8
```

### Screenshot

If you want to screenshot the login or logout screen. All screenshots is in the `screenshots` directory. Default `true`

_Example_

```bash
./index.js login 'jag@flexisource' 'mypassword' --screenshot=false
```

### Browser

If you want to show the browser as you execute the command. Default `false`.

_Example_

```bash
./index.js login 'jag@flexisource' 'mypassword' --browser
```

---

###### Created and Developed by Jay Are Galinada
