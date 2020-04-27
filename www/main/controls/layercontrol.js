export var LayerControl = L.Control.Layers.extend({
    expand: function () {
        L.DomUtil.addClass(this._container, 'leaflet-control-layers-expanded');
        this._section.style.height = null;
        var acceptableHeight = this._map.getSize().y - (this._container.offsetTop + 50);
        if (acceptableHeight < this._section.clientHeight) {
            L.DomUtil.addClass(this._section, 'leaflet-control-layers-scrollbar');
            this._section.style.height = acceptableHeight + 'px';
        } else {
            L.DomUtil.removeClass(this._section, 'leaflet-control-layers-scrollbar');
        }
        this._checkDisabledLayers();

        let ev = new Event('controlexpand'); // add event (listened for in moveButtons)
        window.dispatchEvent(ev);

        return this;
    },
    collapse: function () {
        L.DomUtil.removeClass(this._container, 'leaflet-control-layers-expanded');
        
        let ev = new Event('controlcollapse'); // add event (listened for in moveButtons)
        window.dispatchEvent(ev);

		return this;
	},
})