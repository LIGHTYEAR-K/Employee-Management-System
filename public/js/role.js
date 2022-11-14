let el = document.getElementById("wrapper");
let toggleButton = document.getElementById("menu-toggle");
toggleButton.onclick = function () {
el.classList.toggle("toggled");
};

$(document).ready(function () {
    let requestUrl = "http://localhost:3000/userroledata";
    let table=$('#example')
    $("#btn").on('click',(()=>{
    $("#goal").modal('show')
    }));
    $(".close").on("click",(()=>{
    $("#goal").modal("hide")
    }))
    table.DataTable({
        ajax: {
            method: "GET",
            url: requestUrl,
            dataSrc: "",  
            },
            "columns": [
            { "title": "Id", "data": "id" },
            { "title": "Role", "data": "Role" },
            { "title": "CreatedAt", "data": "createdAt" },
            { "title": "UpdatedAt", "data": "updatedAt" },
            ]        
        } );
})