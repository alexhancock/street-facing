    var mainView = new Street_Facing_View({
        el: '#main-street-view'
    });
    $(document).on('ready', function(e){
        mainView.render();
    });
