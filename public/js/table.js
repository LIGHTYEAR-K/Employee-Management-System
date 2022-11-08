
$('.title').css('color','orange')




$(document).ready(function () {
  // let requestUrl = "https://jsonplaceholder.typicode.com/posts";
  let requestUrl = "http://localhost:3000/data";
  $('#example').DataTable({
      ajax: {
          method: "GET",
          url: requestUrl,
          dataSrc: "",  
        },
        "columns": [
          //{ "title": "User ID", "data": "userId" },
          // { "title": "ID", "data": "id" },
          // { "title": "Title", "data": "title" },
          // { "title": "Body", "data": "body" }
          { "title": "Id", "data": "id" },
          { "title": "Name", "data": "Name" },
          { "title": "Department", "data": "Department" },
          { "title": "E-Mail", "data": "E_MailId" },
          { "title": "Phone_NO", "data": "PhoneNo" },
          { "title": "Location", "data": "Location" }
          
        ]
                
      } );
  
})


// add hovered class to selected list item
let list = document.querySelectorAll(".navigation li");

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));

// Menu Toggle
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};
