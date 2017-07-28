function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}
$(function() {
    $("form").on("submit", function(e) {
       e.preventDefault();
       // prepare the request
       var movie = `${encodeURIComponent($("#search").val()).replace(/%20/g,"+")}official+movie+trailer`
       var ost = `${encodeURIComponent($("#search").val()).replace(/%20/g,"+")}+ost`
       var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "film",
            q: movie,
            maxResults: 3,
            order: "viewCount",
            publishedAfter: "2015-01-01T00:00:00Z"
       });
       // execute the request
       request.execute(function(response) {
         console.log(response);
          var results = response.result;
          $("#results").html("");
          $.each(results.items, function(index, item) {
            $.get("tpl/item.html", function(data) {
                $("#results").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
            });
          });
          resetVideoHeight();
       });
       var requestOst = gapi.client.youtube.search.list({
            part: "snippet",
            type: "music",
            q: ost,
            maxResults: 3,
            order: "viewCount",
            publishedAfter: "2015-01-01T00:00:00Z"
       });
       // execute the request
       requestOst.execute(function(response) {
         console.log(response);
          var results = response.result;
          $("#resultsOst").html("");
          $.each(results.items, function(index, item) {
            $.get("tpl/item.html", function(data) {
                $("#resultsOst").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
            });
          });
          resetVideoHeight();
       });
    });
    $(window).on("resize", resetVideoHeight);
});
function resetVideoHeight() {
    $(".video").css("height", $("#results").width() * 9/16);
}
function init() {
    gapi.client.setApiKey("AIzaSyA8Bm9e10T9lDnqR_SGpynMZfB6aG6rFYg");
    gapi.client.load("youtube", "v3", function() {
        // yt api is ready
    });
}