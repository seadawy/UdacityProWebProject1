// Personal API Key for OpenWeatherMap API
const link = "https://api.openweathermap.org/data/2.5/weather?zip=";
const id = ",us&appid=08d9642a49470dc72889bd481c83a4f0&units=imperial";

//Get the date
let d = new Date();
let newDate = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", CallAPI);

/* Function called by event listener */
function CallAPI() {
  const zip = document.getElementById("zip").value;
  const feel = document.getElementById("feelings").value;
  fatchAPI(link, zip, id)
    .then(function (userData) {
      postData("/add", {
        date: newDate,
        temp: userData.main.temp,
        content: feel,
      });
    })
    .then(function (newData) {
      editHome();
    });
}

/* Function to GET Web API Data*/
const fatchAPI = async (link, zip, id) => {
  // res equals to the result of fetch function
  const res = await fetch(link + zip + id);
  try {
    // userData equals to the result of fetch function
    const userData = await res.json();
    console.log(userData);
    return userData;
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to POST data */
const postData = async (url = "", data = {}) => {
  const req = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      content: data.content,
    }),
  });

  try {
    const newData = await req.json();
    return newData;
  } catch (error) {
    console.log(error);
  }
};

/* Function to GET Project Data */
const editHome = async () => {
  const request = await fetch("/all");
  try {
    const arr = await request.json();
    document.getElementById("date").innerHTML = "Time: " + arr.date;
    document.getElementById("temp").innerHTML = "Temp: " + arr.temp +" Fahrenheit";
    document.getElementById("content").innerHTML = "Feeling: " + arr.content;
  } catch (error) {
    console.log("error", error);
  }
};
