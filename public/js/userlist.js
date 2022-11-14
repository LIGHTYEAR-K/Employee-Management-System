let el = document.getElementById("wrapper");
let toggleButton = document.getElementById("menu-toggle");
toggleButton.onclick = function () {
el.classList.toggle("toggled");
};

var table;
let requestUrl = "http://localhost:3000/userlistdata";
 table= $('#example').DataTable({
 ajax: {
	 url: requestUrl,
	 dataSrc: "",  
	 },
	 "columns": [
	 { "title": "Id", "data": "id" },
	 { "title": "FirstName", "data": "FirstName" },
	 { "title": "LastName", "data": "LastName" },
	 { "title": "Role", "data": "Role" },
	 { "title": "E-Mail", "data": "E_MailId" },
	 { "title": "Phone_NO", "data": "PhoneNo" },
	 { "title": "Location", "data": "Location" },
	 { "title":  "Edit","data": "id",
	 render:((data)=>{
	  return '<button class="btn btn-warning btn-sm cool" onclick="userbyid(\''+ data +'\');">Edit</button>'})},
	 { "title":  "Delete","data": "id",
		render:((data)=>{
		 return '<button class="btn btn-danger btn-sm " onclick="deletebyid(\''+ data +'\');">Delete</button>'})},
	 ]   
	 })


$(document).ready(()=>{
  $("#btn").on('click',(()=>{
    $("#goal").modal('show')
  }));
  $(".close").on("click",(()=>{
    $("#goal").modal("hide")
	empty()

  }))
  $('.reload').click(()=>{
    $("#goal").modal("hide")
    table.ajax.reload();
  })
})


  function empty(){
	$('#fl').val("");
	$('#lname').val("");
	$('#roles').val("");
	$('#Email').val("");
	$('#phones').val("");
	$('#locate').val("");
  }
  function EditWindow(){
	$("#goal").modal('show');
    $('.modal-title').text('Edit Data')
    $('.reload').text('Save')
    $('#value').val('edit');
   // $("#forms").attr('action', '/updates');
    }



  function deletebyid(id){
    if(confirm('Are you want to delete'))
      $.ajax({
        type: "delete",
        url:'/deleteData',
        data:{
         id: id
        },
        dataType:'json',
      })  
	  table.ajax.reload();
     }
 function userbyid(id){
    $.ajax({
           url: '/edits',
           data: { id: id },
           method: "post",
           dataType: "json",
           success: function (result) {
           EditWindow()
           console.log(result)
           $('#ids').val(result.id);
           $('#fl').val(result.FirstName);
           $('#lname').val(result.LastName);
           $('#roles').val(result.Role);
           $('#Email').val(result.E_MailId);
           $('#phones').val(result.PhoneNo);
           $('#locate').val(result.Location);  
        },
        error:((err)=>{
             console.log(err)
        })
      })
     }

    // $( "#forms" ).submit(function( event ) {
    //   event.preventDefault();
    //   let value= ($('#value').val())
    //   let id= ($('#ids').val())
    //   let url='/userlist'
    //   let method='POST'
    //   if (value!="new"){
    //     url='/updates/:id';
    //     method='PUT'
    //   }
    //   $.ajax({
    //     url: url,
    //     data: $('#forms').serializeArray(),
    //     dataType: 'json',
    //     method: method,
    //     processData: true,
    //   });
    // table.ajax.reload();
    // });

	$( "#forms" ).submit(function( event ) {
		event.preventDefault();
		let value= ($('#value').val())
		let id= ($('#ids').val())
		if (value==="new"){
			$.ajax({
				url: '/userlist',
				method:'POST',
				data: $('#forms').serializeArray(),
				dataType: 'json',
				processData: true,
				success:((results)=>{
					console.log(results)
				})  
			  });
		}
		else if (value==="edit"){
			$.ajax({
				url: '/updates/:id',
				method:'PUT',
				data: $('#forms').serializeArray(),
				dataType: 'json',
				processData: true,
			  });
		}
		table.ajax.reload();
	  });




  
