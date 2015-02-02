
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var street = $('#street').val();
    var city = $('#city').val();
    var address = street + ', ' + city;

    var streetViewUrl = "https://maps.googleapis.com/maps/api/streetview?size=640x640&location="+address;

    $body.append('<img class="bgimg" src="'+streetViewUrl+'">');

    //var nytimesUrl = "http://api.nytimes.com/svc/search/v2/articlesearch.json?fq="+city+"&api-key=fbd65ef35763ea4c3f29303cee143e3c:13:71150372";
    var nytUrl = "http://api.nytimes.com/svc/search/v2/articlesearch.json?";
    var nytApiKey = "fbd65ef35763ea4c3f29303cee143e3c:13:71150372";

    $.getJSON( nytUrl, {
        fq: city,
        api-key: nytApiKey
    }
    var articles = data.response.docs;
    

    );



    return false;
};

$('#form-container').submit(loadData);

// loadData();
