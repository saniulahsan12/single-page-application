// settings for div and elements and etc for dynamic changes.
var settings = {

    request_method : "POST",
    trigger_button : "a.list-group-item",
    target_div : "#product-list",
    href : "#category-1",
    active_class : "active",
    source_extension : ".html",
    return_type : "json",
    loader_animation : '<div class="alert alert-success" style="margin: 0 auto"><strong>Loading...</strong></div>',
    render_div : function(title, image, link, price, description, ratings) {
        return '<div class="col-lg-4 col-md-6 mb-4">'+
                  '<div class="card h-100">' +
                    '<a href="#" onclick="add_to_cart()"><img class="card-img-top" src="'+image+'" alt=""></a>' +
                    '<div class="card-body">' +
                      '<h4 class="card-title">' +
                        '<a href="'+link+'">'+title+'</a>' +
                      '</h4>' +
                      '<h5>$'+price+'</h5>' +
                      '<p class="card-text">'+description+'</p>' +
                    '</div>' +
                    '<div class="card-footer">' +
                      '<small class="text-muted">'+ratings+'</small>' +
                    '</div>' +
                  '</div>' +
                '</div>';
    },

}
// ends

// for testing dynamic data function check
function add_to_cart () {
    alert('Added to Cart');
    return;
}
// ends

// request data from the server by ajax call
function request_data(url, method) {

    var $this = jQuery( url )[0];
    var url = $this.href + settings.source_extension;
        url = url.replace("#", "");

    jQuery.ajax({
        url: url,
        type: settings.request_method,
        dataType: settings.return_type,
        beforeSend: function() {
            jQuery(settings.target_div).html(settings.loader_animation);
        },
        success: function (response) {

            jQuery(settings.target_div).html('');

            jQuery.each( response, function( iterator, single_item ) {
                jQuery(settings.target_div).append(
                    settings.render_div(single_item.title, single_item.image, single_item.link, single_item.price, single_item.description, single_item.ratings)
                );
            });

        }
    }).done(function (response) {
        console.log('data appended.');
    });

}
// ends

// update product div element on clicking the link
jQuery(settings.trigger_button).click(function() {

    jQuery(settings.trigger_button).removeClass("active");
    request_data(this);
    jQuery(this).addClass("active");

});
// ends

// ready a primary div on document onload on the basis of settings vaRiable
jQuery( document ).ready(function() {

    request_data(settings);

});
// ends
