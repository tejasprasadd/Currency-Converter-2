const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const url = `https://currency-conversion-and-exchange-rates.p.rapidapi.com/latest?from=${fromCurr.value}&to=${toCurr.value}%2CGBP`;
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "7412ec5867msha0db3116b44d069p175507jsn4185be918252",
    "x-rapidapi-host": "currency-conversion-and-exchange-rates.p.rapidapi.com",
  },
};
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const msg = document.querySelector(".msg");

document.addEventListener("load", () => {
  updateExchangeRate();
});
for (let select of dropdowns) {
  for (const currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.value = currCode;
    newOption.innerText = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = true;
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = true;
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let flagSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = flagSrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});
btn.addEventListener("keydown", async (evt) => {
  evt.preventDefault();
  if (evt.key === "Enter") {
    updateExchangeRate();
  }
});

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 0) {
    alert("Please enter a valid amount");
    amtVal = 1;
    amount.value = "1";
  }
  const response = await fetch(url, options);
  const result = await response.json();
  const rate = result.rates[toCurr.value];
  let finalAmt = rate * amtVal;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
};
