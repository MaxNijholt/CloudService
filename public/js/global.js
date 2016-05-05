$(document).ready(function() {

    // Populate the room table on initial page load
    functions.getAllChampions();
    functions.getAllBuddies();
    
    // Add Buddy button click
    $('#btnAddBuddy').on('click', functions.addBuddy);
    
    // Edit Buddy button click
    $('#btnEditBuddy').on('click', functions.editBuddy);
    
    // Clear Buddy button click
    $('#btnClearBuddy').on('click', functions.clearBuddy);
    
    // Username link click
    // $('#roomList table tbody').on('click', 'td a.linkshowroom', goToRoom);
    
});

// Functions =============================================================
var functions = {};
// Fill table with data
functions.getAllChampions = function() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/Champions', function( data ) {
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a onclick="functions.fillChampion(&quot;' + this.name + '&quot;)">' + this.name + '</a></td>';
            tableContent += '<td>' + this.title + '</td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#championsList table tbody').html(tableContent);
    });
};

functions.getAllBuddies = function() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/Buddies', function( data ) {
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data.data, function(){
            tableContent += '<tr>';
            tableContent += '<td>' + this.name + '</td>';
            tableContent += '<td>' + this.champion + '</td>';
            tableContent += '<td>' + this.username + '</td>';
            tableContent += '<td>' + this.date + '</td>';
            tableContent += '<td><button class="btn btn-warning" type="submit" onclick="functions.editChampion(&quot;' + this.name + '&quot;,&quot;' + this.champion + '&quot;)">Edit</button><button class="btn btn-danger" type="submit" onclick="functions.deleteChampion(&quot;' + this.name + '&quot;)">Delete</button></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#buddyList table tbody').html(tableContent);
    });
};

functions.addBuddy = function() {
    var name = $('#inputBuddyName').val();
    var champion = $('#inputBuddyChampion').val();
    
    if(name && champion){
        var buddy = {
            name: name,
            champion: champion,
            username: "Bram"
        }
        
        $.ajax({
            type: 'POST',
            data: buddy,
            url: '/Buddies',
            dataType: 'JSON'
        }).done(function(response) {            
            //Check for succesful (blank) response
            if(response.msg === '') {                
                //Clear the form inputs
                $('#inputBuddyName').val('');
                $('#inputBuddyChampion').val('');
                
                //Update the table
                functions.getAllBuddies();
            }else{                
                //If something goes wrong, alert the error message that our service returned
                console.log('Error: ' + response.msg.errmsg);
                alert("Can't add buddy.");
            }
        });
    }
};

functions.editBuddy = function(){
    var name = $('#inputBuddyName').val();
    var champion = $('#inputBuddyChampion').val();
    
    if(name && champion){
        var buddy = {
            name: name,
            champion: champion,
            username: "Bram"
        }
        
        $.ajax({
            type: 'PUT',
            data: buddy,
            url: '/Buddies/' + name,
            dataType: 'JSON'
        }).done(function(response) {            
            //Check for succesful (blank) response
            if(response.msg === '') {                
                //Clear the form inputs
                $('#inputBuddyName').val('');
                $('#inputBuddyChampion').val('');
                
                //Update the table
                functions.getAllBuddies();
            }else{                
                //If something goes wrong, alert the error message that our service returned
                console.log('Error: ' + response.msg.errmsg);
                alert("Can't update buddy.");
            }
        });
    }
};
    
functions.clearBuddy = function(){
    $('#inputBuddyName').val('');
    $('#inputBuddyChampion').val('');
};
    
functions.fillChampion = function(Champion) {
    $('#inputBuddyChampion').val(Champion);
};

functions.editChampion = function(name, champion) {
    $('#inputBuddyName').val(name);
    $('#inputBuddyChampion').val(champion);
};

functions.deleteChampion = function(Champion) {
    $.ajax({
        type: 'DELETE',
        url: '/Buddies/' + Champion
    }).done(function(response) {            
        //Check for succesful (blank) response
        if(response.msg === '') {
            functions.getAllBuddies();
        }else{
            //If something goes wrong, alert the error message that our service returned
            alert('Error: ' + response.msg);
        }
    });
};