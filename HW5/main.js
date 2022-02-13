let noteArray = [];
let selectedType = "";

// define a constructor to create note objects
let MovieObject = function (pData, pType, pYear) {
    this.data = pData;
    this.type = pType;
    this.year = pYear;
}



document.addEventListener("DOMContentLoaded", function (event) {

    document.getElementById("buttonAdd").addEventListener("click", function () {

        noteArray.push(new MovieObject(document.getElementById("movie").value, selectedType, document.getElementById("year").value));
        console.log(noteArray);
        document.getElementById("movie").value = "";
    });

    $(document).bind("change", "#select-type", function (event, ui) {
        selectedType = document.getElementById("select-type").value;
    });

    // page before show code *************************************************************************
    $(document).on("pagebeforeshow", "#list", function (event) {   
        createList();
    });
    

});



function createList() {
    
    // clear prior data


    var myul = document.getElementById("myList");
    myul.innerHTML = '';

    noteArray.forEach(function (element,) {   // use handy array forEach method
        var li = document.createElement('li');
        li.innerHTML = element.data + ":  " + element.type + " (" + element.year + ")";
        myul.appendChild(li);
    });
};