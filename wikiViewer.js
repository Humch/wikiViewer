function displayWikiSearchResult(result) {
    $(".content").css( "margin-top", "5vh" );
    
    $(".result-content").remove();
    
    var numContent = result.continue.sroffset;
    
    var dataContainer = document.getElementById("main");
    var urlLink = "http://en.wikipedia.org/?curid=";
    
    for (i = 0; i < numContent; i++) {
        
        var iRow = document.createElement('div');
            iRow.className = "row result-content";
        
        var iColumn = document.createElement('div');
            iColumn.className = "col rounded light-green";
        
        var iTitle = document.createElement('h4');
        
        var iLink = document.createElement('a');
            iLink.className = "font-Pacifico";
            iLink.href = urlLink + result.query.search[i].pageid;
            iLink.textContent = result.query.search[i].title;
        
        var iSnippet = document.createElement('p');
            iSnippet.textContent = result.query.search[i].snippet;
            
        iTitle.appendChild(iLink);
        iColumn.appendChild(iTitle);
        iColumn.appendChild(iSnippet);
        iRow.appendChild(iColumn);
        dataContainer.appendChild(iRow);
    }
}

function wikiSearch(search){
    var url = "https://en.wikipedia.org/w/api.php?";
    $.ajax( {
        url : url,
        dataType : 'json',
        type : 'GET',
        data : { action : "query", format : "json", list : "search", origin : "*", srsearch : search},
        success : function(result) {
            console.log(result.query.search[0].title);
            console.log(result.query.search[0].snippet);
            console.log(result);
            displayWikiSearchResult(result);
        }
    });
}

$('#wikiForm').submit(function(event){
    event.preventDefault();
    var search = $('#search').val();
    wikiSearch(search);
});