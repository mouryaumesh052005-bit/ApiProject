let table = document.getElementById("table");
let btn = document.getElementById("ascending");
let searchbutton = document.getElementById("searched-button");
let tablebody = document.getElementById("table-body");
let gettext = document.getElementById("input");
let editSection = document.querySelector(".edit-section")
let container = document.querySelector(".container")
let editname = document.getElementById("edit-name");
let editlanguage = document.getElementById("edit-language");
let editid = document.getElementById("edit-id");
let editbio = document.getElementById("edit-bio");
let editversion = document.getElementById("edit-version");
let submitbtn = document.getElementById("submitbtn");

// const deleteButton = document.createElement('button');

async function getdata() {
    let data = await fetch("file.json");
    let ans = await data.json();
    let index2 = null;
    for (let i = 0; i < ans.length; i++) {
        tablebody.innerHTML += `<tr><td>${ans[i].name}</td><td>${ans[i].language}</td><td>${ans[i].id}</td><td>${ans[i].bio}</td><td>${ans[i].version}</td><td><button class="deleteBtn" data-index=${i}>Delete</button></td><td><button class="updatebtn" data-index=${i}>Update</button></tr>`
    }

    document.querySelectorAll(".deleteBtn").forEach(function (button) {
        button.addEventListener("click", function () {
            let index = this.getAttribute("data-index");
            ans.splice(index, 1);
            this.closest("tr").remove();
            console.log(ans[index])
            alert("Row Deleted");
        });
    });

    document.querySelectorAll(".updatebtn").forEach(function (button) {
        button.addEventListener("click", function () {
            popup();
            index2 = this.getAttribute("data-index");
            console.log(ans[index2]);
        })
    })


    submitbtn.addEventListener("click", function () {
        update(ans, index2)
    });


    btn.addEventListener("click", function () {
        sortedata(ans);
    });

    searchbutton.addEventListener("click", function () {
        searchFunction(ans);
    })

    gettext.addEventListener("input", function () {
        searchFunction(ans);
    })

}

function popup() {
    editSection.style.visibility = "visible";
    container.style.visibility = "hidden";

}

function update(ans, index2) {
    editSection.style.visibility = "hidden";
    container.style.visibility = "visible";
    console.log(ans[index2]);
    if(editname.value!==""){
        ans[index2].name = editname.value;
    }
    if (editlanguage.value !== "") {
        ans[index2].language = editlanguage.value;
    }
    if(editid.value !==""){
        ans[index2].id = editid.value;
    }
    if(editbio.value !==""){
        ans[index2].bio = editbio.value;
    }
    if(editversion.value !==""){
        ans[index2].version = editversion.value;
    }
    tablebody.innerHTML = "";
    for (let i = 0; i < ans.length; i++) {
        tablebody.innerHTML += `<tr><td>${ans[i].name}</td><td>${ans[i].language}</td><td>${ans[i].id}</td><td>${ans[i].bio}</td><td>${ans[i].version}</td><td><button class="deleteBtn" data-index=${i}>Delete</button></td><td><button class="updatebtn" data-index=${i}>Update</button></tr>`
    }

}


function sortedata(ans) {
    tablebody.innerHTML = '';
    btn.style.display = 'none';
    let sortedData = [...ans].sort((a, b) => a.name.localeCompare(b.name));
    for (let i = 0; i < sortedData.length; i++) {
        table.innerHTML += `<tr><td>${sortedData[i].name}</td><td>${sortedData[i].language}</td><td>${sortedData[i].id}</td><td>${sortedData[i].bio}</td><td>${sortedData[i].version}</td></tr>`
    }
}

function searchFunction(ans) {
    let input = document.getElementById("input").value.toLowerCase();
    // console.log(input);

    let foundItems = ans.filter(item => {
        return item.name.toLowerCase().startsWith(input);
    });
    table.innerHTML = '';
    if (foundItems.length > 0) {
        for (let i = 0; i < foundItems.length; i++) {
            table.innerHTML += `<tr><td>${foundItems[i].name}</td><td>${foundItems[i].language}</td><td>${foundItems[i].id}</td><td>${foundItems[i].bio}</td><td>${foundItems[i].version}</td></tr>`;
            // console.log(foundItems);
        }

    }
    else {
        tablebody.innerHTML = '';
        table.innerHTML = 'NO RECORDS FOUND !';
        btn.style.display = 'none';
    }

}
getdata();