// import axios and express
import axios from "axios"
import express from "express"

import dotenv from 'dotenv'
dotenv.config()

const key = process.env.CRYPTO_CURRENCY_API_KEY

// initialize express and port
const app = express()
const port = 3000

// values of each type of crypto for routes and naming on cryptoType partial
const btc = "bitcoin"
const eth = "etherium"
const dog = "dogecoin"

// declare static diectory for accessing all static files, images etc
app.use(express.static("public"))

// set default route to index.ejs
app.get("/", (req, res) => {
  res.render("index.ejs")
})

// set each crypto route and pass crypto for cryptoType partial
app.get(`/${btc}`, (req, res) => {
  res.render("btc.ejs", { cryptoType: btc })
})
app.get(`/${eth}`, (req, res) => {
  res.render("eth.ejs", { cryptoType: eth })
})
app.get(`/${dog}`, (req, res) => {
  res.render("dog.ejs", { cryptoType: dog })
})

// post a get request to the used api to get crypto price info
app.post(`/get-${btc}`, async (req, res) => {
  try {
    // store promised data requested from api
    const result = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      {
        // include api key in required format according to documentation
        headers: {
          "X-CMC_PRO_API_KEY": key,
        },
      }
    )
    // init test with all returned data in result, declare value
    let test = result.data
    let value

    // iterate through test data and search for specified crypto
    for (let i in test.data) {
      if (test.data[i].name === "Bitcoin") {
        // set value to specified cryptos price
        value = test.data[i].quote.USD.price
      }
    }
    // render specified crypto route passing formatted crypto price
    //  and repassing cryptoType so the page renders the content
    res.render("btc.ejs", { crypto: value.toFixed(2), cryptoType: btc })
  } catch (error) {
    console.log(error.message)
  }
})

// post a get request to the used api to get crypto price info
app.post(`/get-${eth}`, async (req, res) => {
  try {
    // store promised data requested from api
    const result = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      {
        // include api key in required format according to documentation
        headers: {
          "X-CMC_PRO_API_KEY": key,
        },
      }
    )
    // init test with all returned data in result, declare value
    let test = result.data
    let value
    // iterate through test data and search for specified crypto
    for (let i in test.data) {
      if (test.data[i].name === "Ethereum") {
        // set value to specified cryptos price
        value = test.data[i].quote.USD.price
      }
    }
    // render specified crypto route passing formatted crypto price
    //  and repassing cryptoType so the page renders the content
    res.render("eth.ejs", { crypto: value.toFixed(2), cryptoType: eth })
  } catch (error) {
    console.log(error.message)
  }
})
// post a get request to the used api to get crypto price info
app.post(`/get-${dog}`, async (req, res) => {
  try {
    // store promised data requested from api
    const result = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      {
        // include api key in required format according to documentation
        headers: {
          "X-CMC_PRO_API_KEY": key,
        },
      }
    )
    // init test with all returned data in result, declare value
    let test = result.data
    let value
    // iterate through test data and search for specified crypto
    for (let i in test.data) {
      if (test.data[i].name === "Dogecoin") {
        // set value to specified cryptos price
        value = test.data[i].quote.USD.price
      }
    }
    // render specified crypto route passing formatted crypto price
    //  and repassing cryptoType so the page renders the content
    res.render("dog.ejs", { crypto: value.toFixed(2), cryptoType: dog })
  } catch (error) {
    console.log(error.message)
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
