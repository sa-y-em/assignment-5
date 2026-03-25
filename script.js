

//login page
const user = document.getElementById("username");
const pass = document.getElementById("password");
const login = ()=>{
    if (user.value === "admin" && pass.value === "admin123") {
        window.location.href = "index.html"
    }
    else{
        alert("invalid username pass")
    }
}

//label function
const label = (arr)=>{
const lab = arr.map(single=>{
    return `<p class="bg-gray-400 text-sm text-center px-2 rounded-full">${single}</p>`
})
return lab.join(" ")
}

//load all data

const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
const getDataFromApi = (url)=>{
    fetch(url)
    .then((res)=>res.json())
    .then((data)=>{
       DisplayData(data.data)
    })
// console.log(url)
}
const DisplayData = (datas)=>{
    const cardContainer = document.getElementById("card_container");

    // "id": 1,
    //     "title": "Fix navigation menu on mobile devices",
    //         "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
    //             "status": "open",
    //                 "labels": [
    //                     "bug",
    //                     "help wanted"
    //                 ],
    //                     "priority": "high",
    //                         "author": "john_doe",
    //                             "assignee": "jane_smith",
    //                                 "createdAt": "2024-01-15T10:30:00Z",
    //                                     "updatedAt": "2024-01-15T10:30:00Z"

   cardContainer.innerHTML = "";
   datas.forEach(element => {
     const div = document.createElement("div");
       div.innerHTML = `<div class="p-3 bg-gray-300">
            <div class="flex justify-between"><img src="./B13-A5-Github-Issue-Tracker/assets/Open-Status.png" alt="">
            <p class="text-sky-600 text-center px-2 rounded-full bg-gray-800">${element.priority}</p></div>
            <h2 class="text-2xl font-bold m-1">${element.title}</h2>
            <p class="text-gray-600 m-2">${element.description}</p>

            <div class="flex gap-2">
                <div class="flex gap-2">
                     ${label(element.labels)}
                
               
                </div>
            </div><hr>
            <p>#${element.id} by ${element.author}</p>
            <p>${element.createdAt}</p>
            </div>
        `
        cardContainer.append(div);
   });


   
}


getDataFromApi(url)

