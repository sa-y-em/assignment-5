

//login page
const user = document.getElementById("username");
const pass = document.getElementById("password");
const login = () => {
    if (user.value === "admin" && pass.value === "admin123") {
        window.location.href = "main.html"
    }
    else {
        alert("invalid username pass")
    }
}

//spinner loader
const showLoader = (bool) => {
    const loadStatus = document.getElementById('loader')
    const cardContainer = document.getElementById('card_container')

    if (bool === true) {
        loadStatus.classList.remove('hidden')
        cardContainer.classList.add('hidden')
    }

    else {
        loadStatus.classList.add('hidden')
        cardContainer.classList.remove('hidden')
    }
}

//search function
const searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", () => {
    const search = document.getElementById("search").value.trim().toLowerCase();
    console.log(search)
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    showLoader(true)
    fetch(url)
        .then(res => res.json())
        .then(data => {
            let allIssues = data.data;
            allIssues = allIssues.filter((find) => {
                return find.title.toLowerCase().includes(search) || find.description.toLowerCase().includes(search) || find.author.toLowerCase().includes(search) || find.assignee.toLowerCase().includes(search)

            })
            DisplayData(allIssues)
            showLoader(false)



        }
        )
})


// tab filter
const filterIssues = (btnStatus) => {

    //active showing
    const all = document.querySelectorAll(".status");
    all.forEach((btn) => {
        btn.classList.remove('active');
        document.getElementById(btnStatus).classList.add('active');
    })
    showLoader(true)

    const urls = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    fetch(urls)
        .then(res => res.json())
        .then(datas => {
            let allIssues = datas.data
            if (btnStatus != "all") {
                allIssues = allIssues.filter((res) => res.status === btnStatus

                )

            }
            DisplayData(allIssues)
            showLoader(false)




        })

}

//button color
const btncolor = (pri) => {
    if (pri === "high") {
        return " text-red-700 bg-red-100"
    }
    else if (pri === "medium") {
        return "text-yellow-700 bg-yellow-100"
    }
    else {
        return "text-gray-700 bg-gray-100"
    }

}

//top color
const topColor = (status) => {

    if (status.status === "open") {
        return "border-t-4 border-green-400"
    }
    else {
        return "border-t-4 border-purple-400"
    }
}



const showModal = (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            displayshowModal(data.data)

        })

}
const displayshowModal = (obj) => {


    const modalDetails = document.getElementById('modal_details')
    modalDetails.innerHTML = ` <h2 class="text-xl font-bold mb-2">${obj.title}</h2>

        <div class="flex gap-2 items-center mb-2">
            <span class="bg-green-500 text-white px-2 rounded-full text-sm">${obj.status}</span>
            <span class="text-gray-500">Opened by ${obj.author}</span>
            <span class="text-gray-400">${new Date(obj.createdAt).toLocaleDateString()}</span>
        </div>

        <div class="flex gap-2 mb-3">
            ${label(obj.labels)}
        </div>

        <p class="mb-3">${obj.description}</p>

        <div class="flex justify-between bg-gray-100 p-3 rounded-lg">
            <div>
                <p class="text-gray-500">Assignee:</p>
                <p class="font-semibold">${obj.assignee}</p>
            </div>

            <div>
                <p class="text-gray-500">Priority:</p>
                <span class="bg-red-500 text-white px-2 rounded-full text-sm)"  >${obj.priority}</span>
            </div>
        </div>

        
`

    // {
    //     "id": 3,
    //         "title": "Update README with installation instructions",
    //             "description": "The README file needs better installation instructions for new contributors.",
    //                 "status": "closed",
    //                     "labels": [
    //                         "documentation"
    //                     ],
    //                         "priority": "low",
    //                             "author": "mike_docs",
    //                                 "assignee": "sarah_dev",
    //                                     "createdAt": "2024-01-10T08:00:00Z",
    //                                         "updatedAt": "2024-01-12T16:45:00Z"
    // }
    document.getElementById("my_modal_5").showModal()



}

//level color
const levelColors = (single) => {
    if (single === "bug") {
        
        return `
        <div class="flex gap-2 pb-3">
        <p class="bg-gray-400 text-md text-center px-2 rounded-full text-red-700 bg-red-100"><i class="fa-solid fa-bug"></i>${single}</p>
        </div>
        `

        
    }
    else if (single === "help wanted") {
        return `
        <div class="flex gap-2 pb-3">
        <p class="bg-gray-400 text-md text-center px-2 rounded-full text-yellow-700 bg-yellow-100">${single}</p>
        </div>
        `    }
    else if (single === "enhancement") {
        return `
        <div class="flex gap-2 pb-3">
        <p class="bg-gray-400 text-md text-center px-2 rounded-full text-green-700 bg-green-100"><i class="fa-regular fa-star"></i>${single}</p>
        </div>
        `    }
        else {
        return `
        <div class="flex gap-2 pb-3">
        <p class="bg-gray-400 text-md text-center px-2 rounded-full text-gray-700 bg-gray-100">${single}</p>
        </div>
        ` 
        }

}

//label function
const label = (arr) => {
   

    
    const lab = arr.map(single => {
            const levelColor = levelColors(single)
            return levelColor

    })
    return lab.join(" ")
}

//load all data

const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
const getDataFromApi = (url) => {

    showLoader(true)

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            DisplayData(data.data)
            showLoader(false)

        })

    // console.log(url)
}
const DisplayData = (datas) => {

    const issueCount = document.getElementById("issueCount");
    issueCount.innerText = `${datas.length} Issues`;

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
        const topColorClass = topColor(element);
        const btnColor = btncolor(element.priority);
        const div = document.createElement("div");
        div.innerHTML = `<div onclick="showModal(${element.id})" class="p-3 bg-gray-300 ${topColorClass}">
            <div class="flex justify-between"><img src="./B13-A5-Github-Issue-Tracker/assets/Open-Status.png" alt="">
            <p class=" text-center px-2 rounded-full  ${btnColor}">${element.priority}</p></div>
            <h2 class="text-2xl font-bold m-1">${element.title}</h2>
            <p class="text-gray-600 m-2">${element.description}</p>

            <div class="flex gap-2">
                <div class="flex gap-2 pb-3">
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