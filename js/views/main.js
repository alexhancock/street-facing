    var Street_Facing_View = Backbone.View.extend({
        render: function() {
            _.bindAll(this);
            
            var fenway = new google.maps.LatLng(42.345573,-71.098326);
            var mapOptions = { center: fenway, zoom: 14, mapTypeId: google.maps.MapTypeId.ROADMAP };
            var panoramaOptions = { position: fenway, pov: { heading: 180, pitch: 10, zoom: 1 }};
            var map = new google.maps.Map(this.el, mapOptions);
            var panorama = new google.maps.StreetViewPanorama(this.el, panoramaOptions);
            map.setStreetView(panorama);

            var videoInput = $('#inputVideo')[0];
            var canvasInput = $('#inputCanvas')[0];

            var htracker = new headtrackr.Tracker();
            htracker.init(videoInput, canvasInput);
            htracker.start();

            this.panorama = panorama;

            // Throttle the calling of the handler for head movement events to once every 20ms
            var throttled_update = _.throttle(this.handleHeadMovement, 20);
            var pov = this.panorama.pov;

            $(document).on('headtrackingEvent', function(e){
                throttled_update(pov, e);
            });
        },

        handleHeadMovement: function(currentPov, e){

            // Get the amount the head moved left/right and up/down of the camera
            var head_x = e.originalEvent.x * 2;
            var head_y = e.originalEvent.y;

            // Calculate a new heading and pitch
            var new_heading = Math.max(0, Math.min(currentPov.heading - head_x, 360));
            var new_pitch = currentPov.pitch - head_y;

            var newPov = {
                heading: new_heading,
                pitch: new_pitch,
                zoom: 0
            };

            this.panorama.setPov(newPov);
        }
    });
