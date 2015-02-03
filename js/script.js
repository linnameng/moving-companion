
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

    $(greeting).text("So you want to live at "+street+", "+city+"?");

    //var nytimesUrl = "http://api.nytimes.com/svc/search/v2/articlesearch.json?fq="+city+"&api-key=fbd65ef35763ea4c3f29303cee143e3c:13:71150372";
    var nytUrl = "http://api.nytimes.com/svc/search/v2/articlesearch.json?";
    var nytApiKey = "fbd65ef35763ea4c3f29303cee143e3c:13:71150372";

    $.getJSON(nytUrl, {
        q: city,
        sort: 'newest',
        "api-key": nytApiKey
    }).done(function(data) {
        $nytHeaderElem.text('New York Times articles about '+city);
        articles = data.response.docs;
        for(var i = 0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">'+
                '<a href="'+article.web_url+'" target="new">'+
                article.headline.main+'</a>'+
                '<p>'+article.snippet+'</p></li>');
        };
    }).error(function(e) {
        $nytHeaderElem.text("Failed to fetch articles from New York Times");
    });

    var wikiUrl = "http://en.wikipedia.org/w/api.php?";    

    $.ajax( {
        url: wikiUrl,
        data: {
            action: "opensearch",
            search: city,
            format: "json",
        },
        dataType: 'jsonp',
        success: function(data) {
            console.log(data);
            var wikiArticleTitle = data[1];
            var wikiArticleLink = data[3];

            for(var i=0; i<wikiArticleTitle.length; i++) {
                $wikiElem.append('<li><a href="'+wikiArticleLink[i]+'" target="new">'+
                    wikiArticleTitle[i]+'</a>');
            }
        }
    });

    return false;
};

$('#form-container').submit(loadData);

// loadData();
