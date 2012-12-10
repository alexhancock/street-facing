    var Street_Facing_View = Backbone.View.extend({

        initialize:function(){
            _.bindAll(this);
        },

        render: function(starting_loc, new_tracker) {
            if (!starting_loc){
                starting_loc = new google.maps.LatLng(51.5018, -0.1406); // Set a default - On Tower Bridge in London
            }

            this.panoramaOptions = {
                position: starting_loc,
                pov: { heading: 180, pitch: 0, zoom: 1 },
                scrollwheel: false, zoomControl: false, panControl: false, linksControl: false, addressControl: false
            };

            if (new_tracker){
                var videoInput = $('#inputVideo')[0];
                var canvasInput = $('#inputCanvas')[0];
                var htracker = new headtrackr.Tracker();
                    htracker.init(videoInput, canvasInput);
                    htracker.start();

                this.panorama = new google.maps.StreetViewPanorama(this.el, this.panoramaOptions);
                this.panorama.setVisible(true);

                // Throttle the calling of the handler for head movement events to once every 20ms
                var throttled_update = _.throttle(this.handleHeadMovement, 20);
                var pov = this.panorama.pov;

                $(document).on('headtrackingEvent', function(e){
                    throttled_update(pov, e);
                });

                this.registerSearchView(this.panorama, this);
            } else {
                this.panorama = new google.maps.StreetViewPanorama(this.el, this.panoramaOptions);
                this.panorama.setVisible(true);
            }
        },

        registerSearchView: function(panorama, mainView){
            var search_box = new Address_Search_View({
                el: '#searchInput',
                map: null,
                pano: panorama,
                mainView: mainView
            });
            search_box.render();
        },

        handleHeadMovement: function(currentPov, e){

            // Get the amount the head moved left/right and up/down relative to the camera
            var head_x = e.originalEvent.x;
            var head_y = e.originalEvent.y / 2;

            // Calculate a new heading and pitch
            var new_heading = Math.max(0, Math.min(currentPov.heading - head_x, 360));
            var new_pitch = currentPov.pitch - head_y;

            var newPov = {
                heading: new_heading,
                pitch: new_pitch,
                zoom: 1
            };

            this.panorama.setPov(newPov);
        }
    });
