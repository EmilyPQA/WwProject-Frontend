"use strict";


// (function() {
const baseURL = "http://localhost:8080";

const getAllOutput = document.querySelector("#getAllOutput");
const getByIdOutput = document.querySelector("#getByIdOutput");

const wainwrightId = document.querySelector("#wainwrightId");

const updateWainwrightRanking = document.querySelector("#updateWainwrightRanking")
const updateWainwrightName = document.querySelector("#updateWainwrightName")
const updateWainwrightElevation = document.querySelector("#updateWainwrightElevation")
const updateWainwrightRegion = document.querySelector("#updateWainwrightRegion")

const getAllWainwrights = () => {
    axios.get(`${baseURL}/getAllWainwrights`)
        .then(res => {
            const wainwrights = res.data;

            getAllOutput.innerHTML = ""; // blanks an element

            wainwrights.forEach(wainwright => renderWainwright(wainwright, getAllOutput));
        }).catch(err => console.log(err));

}

const renderWainwright = (wainwright, outputDiv) => {
    const newWainwright = document.createElement('div');

    const wainwrightId = document.createElement("p")
    wainwrightId.innerText = `ID: ${wainwright.id}`;
    newWainwright.appendChild(wainwrightId);

    const wainwrightRanking = document.createElement("h3");
    wainwrightRanking.innerText = `Ranking: ${wainwright.ranking}`;
    newWainwright.appendChild(wainwrightRanking);

    const wainwrightName = document.createElement("p");
    wainwrightName.innerText = `Name: ${wainwright.name}`;
    newWainwright.appendChild(wainwrightName);

    const wainwrightElevation = document.createElement("p");
    wainwrightElevation.innerText = `Elevation: ${wainwright.elevation}`;
    newWainwright.appendChild(wainwrightElevation);

    const wainwrightRegion = document.createElement("p");
    wainwrightRegion.innerText = `Region: ${wainwright.region}`;
    newWainwright.appendChild(wainwrightRegion);

    const deleteButton = document.createElement('button');
    deleteButton.innerText = "DELETE";

    deleteButton.addEventListener('click', () => deleteWainwright(wainwright.id));

    newWainwright.appendChild(deleteButton);

    const selectButton = document.createElement('button');
    selectButton.innerText = "SELECT";

    selectButton.addEventListener('click', () => updateWainwright(wainwright.id));

    newWainwright.appendChild(selectButton);

    outputDiv.appendChild(newWainwright);
}

const deleteWainwright = id => {
    axios.delete(`${baseURL}/deleteWainwright/${id}`)
        .then(res => {
            console.log(res);
            getAllWainwrights();
        }).catch(err => console.log(err));

}

const getWainwrightById = () => {
    axios.get(`${baseURL}/getWainwright/${wainwrightId.value}`)
        .then(res => {
            const wainwright = res.data;
            getByIdOutput.innerHTML = "";
            renderWainwright(wainwright, getByIdOutput);
        }).catch(err => console.log(err));
}

const getWainwrightByName = () => {
    axios.get(`${baseURL}/getByName/${wainwrightName.value}`)
        .then(res => {
            const wainwright = res.data;
            getByNameOutput.innerHTML = "";
            renderWainwright(wainwright, getByNameOutput);
        }).catch(err => console.log(err));
}

const updateWainwright = id => {

    axios.get(`${baseURL}/getWainwright/${id}`)
        .then(res => {
            const wainwright = res.data;
            console.log(res.data);

            updateWainwrightId.value = wainwright.id;
            updateWainwrightRanking.value = wainwright.ranking;
            updateWainwrightName.value = wainwright.name;
            updateWainwrightElevation.value = wainwright.elevation;
            updateWainwrightRegion.value = wainwright.region;

            console.log(wainwright.name);

        })

    const updateForm = document.querySelector("section#updateWainwright > form");

    updateForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const form = e.target

        const data = {
            id: updateForm.id.value,
            ranking: updateForm.ranking.value,
            name: updateForm.name.value,
            elevation: updateForm.elevation.value,
            region: updateForm.region.value
        }

        axios.put(`${baseURL}/replaceWainwright/${id}`, data)
            .then(res => {
                console.log(res);
                getAllWainwrights();
                form.reset();
                form.name.focus();
                alert("Details successfully updated");
            }).catch(err => console.log(err));
    })
}

document.querySelector("section#getByIdSection > button").addEventListener('click', getWainwrightById);

document.querySelector("section#postSection > form").addEventListener('submit', (e) => {
    e.preventDefault();

    console.log("THIS: ", this);
    console.log("ELEVATION: ", this.elevation);

    const form = e.target;

    const data = {
        ranking: form.ranking.value,
        name: form.name.value,
        elevation: form.elevation.value,
        region: form.region.value
    }

    console.log("DATA: ", data);

    axios.post(`${baseURL}/createWainwright`, data)
        .then((res) => {
            console.log(res);
            getAllWainwrights();

            form.reset(); //resets form
            form.name.focus(); // selects the name input
        }).catch(err => console.log(err));
});

getAllWainwrights()