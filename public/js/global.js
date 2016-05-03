$(document).ready(function() {

    // Populate the room table on initial page load
    functions.getAllChampions();
    functions.getAllBuddies();
    
    // Add Buddy button click
    $('#btnAddChampion').on('click', functions.addBuddy);
    
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
            tableContent += '<td>' + this.name + '</td>';
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
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td>' + this.name + '</td>';
            tableContent += '<td>' + this.champion + '</td>';
            tableContent += '<td>' + this.username + '</td>';
            tableContent += '<td>' + this.date + '</td>';
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
        console.log("good");
        console.log(name + " " + champion);
    }
}