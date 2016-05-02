$(document).ready(function() {

    // Populate the room table on initial page load
    getAllChampions();
    
    // Add Room button click
    // $('#btnAddRoom').on('click', addRoom);
    
    // Username link click
    // $('#roomList table tbody').on('click', 'td a.linkshowroom', goToRoom);
    
});

// Functions =============================================================

// Fill table with data
function getAllChampions() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/Champions', function( data ) {
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowroom" rel="' + this.name + '">' + this.name + '</a></td>';
            tableContent += '<td>' + this.description + '</td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#championsList table tbody').html(tableContent);
    });
};