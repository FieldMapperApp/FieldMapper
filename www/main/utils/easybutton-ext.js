L.Control.EasyButton.include({

    setActive: function () {
        L.DomUtil.addClass(this.button, 'active');
        this.active = true;
        return this;
    },

    setInactive: function () {
        L.DomUtil.removeClass(this.button, 'active');
        this.active = false;
        return this;
    },

});