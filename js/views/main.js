    var Street_Facing_View = Backbone.View.extend({
        render: function() {
            var fenway = new google.maps.LatLng(42.345573,-71.098326);
            
            var mapOptions = { center: fenway, zoom: 14, mapTypeId: google.maps.MapTypeId.ROADMAP };
            var panoramaOptions = { position: fenway, pov: { heading: 270, pitch: 10, zoom: 1 }};

            var map = new google.maps.Map(this.el, mapOptions);
            var panorama = new google.maps.StreetViewPanorama(this.el, panoramaOptions);
            
            map.setStreetView(panorama);

            var videoInput = $('#inputVideo')[0];
            var canvasInput = $('#inputCanvas')[0];

            var htracker = new headtrackr.Tracker({
                retryDetection: false
            });

            htracker.init(videoInput, canvasInput);
            htracker.start();

            $(document).on('headtrackingEvent', function(e){
                console.log(e);

                var translatedHeading = 'todo';
                var translatedPitch = 'todo';

                $(document).off('headtrackingEvent');
                
                /* panorama.setPov({
                    heading: translatedHeading,
                    pitch: translatedPitch,
                    zoom: 0
                }); */
            });
        }
    });
