 
let el = document.getElementById("wrapper");
let toggleButton = document.getElementById("menu-toggle");
toggleButton.onclick = function () {
el.classList.toggle("toggled");
};

//Display UserName
let lsr = localStorage.getItem('roles');
let obj= JSON.parse(lsr)
// $('.admin').text(obj.Role)
let fname=(obj.FirstName).toUpperCase()
let lname=(obj.LastName).toUpperCase()
$('.admin').text(fname+" "+lname)


var table;
$(document).ready(function () {
    //Model to View
    $("#btn").on('click',(()=>{
    $("#goal").modal('show')
    }));
    $(".close").on("click",(()=>{
    $('#msg').hide()
    $("#goal").modal("hide")
    }))
    let requestUrl = "/userroledata";
    table= $('#example').DataTable({
        ajax: {
            method: "GET",
            url: requestUrl,
            dataSrc: "",  
            },
            "columns": [
            { "title": "Id", "data": "id" },
            { "title": "Role", "data": "Role" },
            { "title": "", "data": "id", 
            render:((data)=>{
                if (data != 1) {
                    if(object.menus[1].actions.edit ==="true"){
                        return '<button class="btn btn-warning btn-sm " onclick="userbyid(\''+ data +'\');edit(\''+ data +'\');">Edit</button>'}
                    else{
                          return "Not Allowed"
                    }
                } else {
                    return '';
                }
            })},
            ]
        });

        //Form Submit 
        $("#form").submit(function( event ) {
            event.preventDefault();
                $.ajax({
                    url: '/userrole',
                    method:'POST',
                    data: $('#form').serializeArray(),
                    dataType: 'json',
                    processData: true,
                    success:((result)=>{
                        if(result.success===false){
                          alert(result.error);
                          table.ajax.reload();
                        }
                        else{
                        console.log(result)
                        $("#goal").modal("hide")
                        table.ajax.reload();
                        }
                    }) 
                })
            })
        //Userrole Permissions
            let ls = localStorage.getItem('Menu');
            let object=JSON.parse(ls)
            object.menus[1].actions.add
            if(object.menus[1].actions.add != "true"){
                $('.btn').hide()
            }
            if(object.menus[1].actions.edit != "true"){
                table.column(2).visible(false);
            }
            if(object.menus[0].actions.view != "true"){
                $('.text-secondary').hide()
            }
        })
    //checkBox 
    $('#add').val($(this).is(':checked'));
    $('#edit').val($(this).is(':checked'));
    $('#delete').val($(this).is(':checked'));
    $('#view').val($(this).is(':checked'));
    $('#checkall').val($(this).is(':checked'));

    $('#edit').change(function() {
        $('#edit').val($(this).is(':checked'));
    });
     $('#delete').change(function() {
        $('#delete').val($(this).is(':checked'));
    });
     $('#view').change(function() {
        $('#view').val($(this).is(':checked'));
    });
     $('#add').change(function() {
        $('#add').val($(this).is(':checked'));
    });
 
    $('#add1').val($(this).is(':checked'));
    $('#edit1').val($(this).is(':checked'));
    $('#delete1').val($(this).is(':checked'));
    $('#view1').val($(this).is(':checked'));

    $('#edit1').change(function() {
        $('#edit1').val($(this).is(':checked'));
    });
     $('#delete1').change(function() {
        $('#delete1').val($(this).is(':checked'));
    });
     $('#view1').change(function() {
        $('#view1').val($(this).is(':checked'));
    });
     $('#add1').change(function() {
        $('#add1').val($(this).is(':checked'));
    });

    function userbyid(id){
        $.ajax({
            url: '/values',
            data: { id: id },
            method: "post",
            dataType: "json",
            success: function (result) {
            console.log(result.data.Menu)
            if(result.data.Menu.menus[0].actions.add==="true")
                $('#add').prop("checked",true)
                $('#add').val($('#add').is(':checked'));
            if(result.data.Menu.menus[0].actions.view==="true")
                $('#view').prop("checked",true)
                $('#view').val($('#view').is(':checked'));
            if(result.data.Menu.menus[0].actions.edit==="true")
                $('#edit').prop("checked",true)
                $('#edit').val($('#edit').is(':checked'));
            if(result.data.Menu.menus[0].actions.delete==="true")
                $('#delete').prop("checked",true)
                $('#delete').val($('#delete').is(':checked'));
            if(result.data.Menu.menus[1].actions.add==="true")
                $('#add1').prop("checked",true)
                $('#add1').val($('#add1').is(':checked'));
            if(result.data.Menu.menus[1].actions.view==="true")
                $('#view1').prop("checked",true)
                $('#view1').val($('#view1').is(':checked'));
            if(result.data.Menu.menus[1].actions.edit==="true")
                $('#edit1').prop("checked",true)
                $('#edit1').val($('#edit1').is(':checked'));
            if(result.data.Menu.menus[1].actions.delete==="true")
                $('#delete1').prop("checked",true)
                $('#delete1').val($('#delete1').is(':checked'));
            },
            error:((err)=>{
                 console.log(err)
            })
        })
    }
    //To Empty CheckBox
         function empty(){
            $('#view').prop("checked",false)
            $('#add').prop("checked",false)
            $('#edit').prop("checked",false)
            $('#delete').prop("checked",false)
            $('#view1').prop("checked",false)
            $('#add1').prop("checked",false)
            $('#edit1').prop("checked",false)
            $('#delete1').prop("checked",false)     
            }
            
            $('.cancel').click(()=>{
                empty()
            })
    //Edit Functions
    function edit(id){
        $("#secret").modal('show')
        $(".close").on("click",(()=>{
        $("#secret").modal("hide")
        }))
        $( "#submits" ).click(function( ) {
            let view= $('#view').val();
            let add= $('#add').val();
            let edit= $('#edit').val();
            let deletes= $('#delete').val();
            let view1= $('#view1').val();
            let add1= $('#add1').val();
            let edit1= $('#edit1').val();
            let delete1= $('#delete1').val();
            let data = {
                    "menus": [{
                        "name": "User List",
                        "actions": {
                            "view": view,
                            "add": add,
                            "edit": edit,
                            "delete": deletes
                        }
                    },
                    {
                        "name": "User Role",
                        "actions": {
                            "view": view1,
                            "add": add1,
                            "edit": edit1,
                            "delete": delete1
                        }
                    }]
                } 
            let dataA=JSON.stringify(data)
            let menu = data;
            $.ajax({
                url: '/menu',
                method:'POST',
                data: {id:id,
                    menu:menu},
                dataType: 'json',
                success:((result)=>{
                    $("#secret").modal("hide")
                    table.ajax.reload()
                    window.location='userrole'
                }) 
            })
        })
    }
    
//clear LocalStorage
$('#off').click(()=>{
    localStorage.clear()
})


    
