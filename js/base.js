
    var mainView = new Street_Facing_View({
        el: '#main_street_view'
    });

    $(window).on('load', function(e){
        mainView.render(false, true);
    });
