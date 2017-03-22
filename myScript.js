/**
 * Created by tiffanyxu on 2017-03-22.
 */

$("#upload").click(function(){   //dollar sign is selector #Upload is the ID
    var fileToLoad = document.getElementById("fileupload").files[0];
    var fileReder = new FileReader();
    fileReader.readAsArrayBuffer(fileToLoad);

    fileReader.onLoad = function(evt){
        var id = fileToLoad.name.split('.')[0];
        var content = evt.target.result;
        var formData = new FormData();
        formData.append('body', new Blob([content])); // value to send to ajax , blob for keeping it in base64


        $.ajax({
            url: "http://localhost:4321/dataset/" + id,
            type:'put',
            data: formData,
            cache:false,
            contentType:false,
            processData:false,
        }).done(function(data){
            console.log(fileToLoad.name + 'was successfully uploaded.');
        }).fail(function(data){
            console.log('ERROR - Failed to upload' + fileToLoad.name + ',');

        })
    }
    alert("button pressed");
})


$('#btnSubmit').click(function(){
    var query = $("#txtQuery").val();

    $.ajax({
        url: "http://localhost:4321/query" + id,
        type:'post',
        data: JSON.stringify(query),
        dataType: 'json',
        contentType: 'application/json'
    }).done(function(data){
        console.log("Response", data);
        generateTable(data.message.result);
    }).fail(function(data){
        console.error("ERROR - Failed to submit query");

    })


});

function generateTable(data){
    var tbl_body = document.creatElement("tbody");

    var odd_even = false;
    console.log('DATA',data);

    $each(data,function(){
        var tbl_row = tbl_body.insertRow();
        tbl_row.className = odd_even ? "odd":"even";

        $.each(this,function(x,y) {
            var cell = tbl_row.insertCell();
            cell.appendChild(document.createTextNode(y.toString()));
        })
    })

    odd_even = !odd_even;
};