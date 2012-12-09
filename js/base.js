    var mainView = new Street_Facing_View({
        el: '#main_street_view'
    });
    $(document).on('ready', function(e){
        mainView.render();
    });
