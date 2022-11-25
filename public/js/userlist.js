let el = document.getElementById("wrapper");
let toggleButton = document.getElementById("menu-toggle");
toggleButton.onclick = function () {
el.classList.toggle("toggled");
};

//to View Models
  $("#btn").on('click',(()=>{
    $("#goal").modal('show')
    $('.modal-title').text('Add User')
    $('.reload').text('Save')
    $('#value').val('new');
    empty()
  }));
  $(".close").on("click",(()=>{
    $("#goal").modal("hide")

  }))

//To get UserName
let lsr = localStorage.getItem('roles');
let obj= JSON.parse(lsr)
// $('.admin').text(obj.Role)
let fname=(obj.FirstName).toUpperCase()
let lname=(obj.LastName).toUpperCase()
$('.admin').text(fname+" "+lname)

//Clear LocalStorage
$('#off').click(()=>{
  localStorage.clear()
})

//DataTable
var table;
let requestUrl = "/userlistdata";
 table= $('#example').DataTable({
 ajax: {
	 url: requestUrl,
	 dataSrc: "",  
	 },
	 "columns": [
	 { "title": "Id", "data": "id" },
	 { "title": "First Name", "data": "FirstName" },
	 { "title": "Last Name", "data": "LastName" },
	 { "title": "Role", "data": "Role" },
	 { "title": "Email", "data": "E_MailId" },
	 { "title": "Phone", "data": "PhoneNo" },
	 { "title": "Location", "data": "Location" },
	 { "title":  "Edit","data": "id",
	 render:((data)=>{
    if(object.menus[0].actions.edit ==="true"){
	  return '<button id="editss"class="btn btn-warning btn-sm cool" onclick="userbyid('+ data +');">Edit</button>'}
    else{
      return ""
    }
})},
	 { "title":  "Delete","data": "id",
		render:((data)=>{
      if(object.menus[0].actions.delete ==="true"){
		 return '<button class="btn btn-danger btn-sm " onclick="deletebyid(\''+ data +'\');">Delete</button>'}
    else{
         return ""
    }
    })},
	 ],  
    dom:'lrtrip'
	 })

  //Userrole Permissions
    let ls = localStorage.getItem('Menu');
    let object=JSON.parse(ls)
    if(object.menus[0].actions.add != "true"){
      $('#btn').hide()
    }
    if(object.menus[1].actions.view != "true"){
      $('#block').hide()
    }

  //Search Function
    $('#search').change(()=>{
      $.fn.dataTable.ext.search.push((searchData,rowData)=>{
        console.log(rowData[1])
        if(rowData[3]=== $('#search').val() || !$('#search').val()){
          return true
        }
        else{
          return false
        }
      })
    table.draw();  
    })


function empty(){
	$('#fl').val("");
	$('#lname').val("");
  $('#user').val("");
  $('#pass').val("");
	$('#roles').val("");
	$('#Email').val("");
	$('#phones').val("");
	$('#locate').val("");
  }

function EditWindow(){
	$("#goal").modal('show');
  $('.modal-title').text('Edit User')
  $('.reload').text('Save')
  $('#value').val('edit');
  $('#lab').hide();
  $('#pass').hide();
  }

function deletebyid(id){
    if(confirm('Are you sure you want to delete this : '+id+' id'))
      $.ajax({
        type: "delete",
        url:'/deleteData',
        data:{
         id: id
        },
        dataType:'json',
        success:(()=>{
          table.ajax.reload();
				})
      }) 
     }

//To Get Userdata by id from Server
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
    $('#user').val(result.UserName)
    $('#pass').val(result.Password)
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
    // });

//Form Submit 
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
				success:((result)=>{
          if (result.success===false) {
            $('#req').text(result.error)
        } else {
            $("#goal").modal('hide')
            console.log('Successfully Added')
            table.ajax.reload();
        }
        console.log(result)
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
        success:((result)=>{
              console.log(result)
              $("#goal").modal('hide')
              table.ajax.reload();
				    })
			    });
		    }
	    });









  
