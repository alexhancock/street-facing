

    var Address_Search_View = Backbone.View.extend({

        initialize: function(config){
            _.bindAll(this);

            this.panorama = config.panorama;
            this.mainView = config.mainView;
        },

        render: function(){
            $('#searchForm').on('submit', function(e){
                e.preventDefault();
            });

            var input = this.el;
            var searchBox = new google.maps.places.SearchBox(input);
            var sv = new google.maps.StreetViewService();

            self = this;
            google.maps.event.addListener(searchBox, 'places_changed', function() {
                var place = searchBox.getPlaces()[0];
                var newPan = sv.getPanoramaByLocation(place.geometry.location, 100, self.panoramaCallback);
            });
        },

        panoramaCallback: function(data, status){
            if (status == google.maps.StreetViewStatus.OK) {
                entryPanoId = data.location.pano;
                this.mainView.render(data.location.latLng);
            } else {
                alert("Sorry, I can't find street view data. Try somewhere nearby?");
            }
        }
    });
