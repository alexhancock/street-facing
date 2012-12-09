

var Street_Facing_View = Backbone.View.extend({
    render: function() {
        this.$el.css({
            'height': '500px',
            'width': '700px',
            'margin': '50px auto'
        });

        var fenway = new google.maps.LatLng(42.345573,-71.098326);
        var mapOptions = {
          center: fenway,
          zoom: 14,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(this.el, mapOptions);
        this.map = map;
        var panoramaOptions = {
          position: fenway,
          pov: {
            heading: 270,
            pitch: 10,
            zoom: 1
          }
        };

        var self = this;
        var panorama = new google.maps.StreetViewPanorama(this.el, panoramaOptions);
        this.map.setStreetView(panorama);

        setInterval(function(){
            panoramaOptions.pov.heading = Math.random()*360;

            panorama.setPov({
                heading: panoramaOptions.pov.heading,
                pitch: panoramaOptions.pov.heading,
                zoom: 0
            });
        }, 500);
    },
    re_render: function(opts) {
        var panorama = new google.maps.StreetViewPanorama(this.el, opts);
        this.map.setStreetView(panorama);
    }
});
