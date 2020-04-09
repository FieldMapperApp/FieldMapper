# Layer Management

## Overview

FieldMapper allows you to import your own layers. It accepts both GeoJSON layers and image overlays. 
The basic process of adding and editing layers is the same as for variables, so have a look at the [Variable Management section](variable_management.md) if you struggle with the basics.

## GeoJSON and Image Overlay

FieldMapper can handle two types of layers: GeoJSON and Image Overlay. GeoJSON is a popular and great to work with geodata format. Just upload a GeoJSON file and the layer will appear on the map. (You can disable it in the layers control of the map interface.) 
GeoJSON is based on the JSON exchange format which looks as follows:

```
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "color": "green"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          13.38778495788574,
          52.515803012883595
        ]
      }
    }
  ]
}
```

If your imported GeoJSON features have a color attribute in their properties, FieldMapper will automatically style them accordingly.

You can also upload a simple image to the app to account for more complex stylings that GeoJSON is not capable of capturing. If you want to import an image overlay, you need to provide the bounds of the area the image is meant to represent.

QGIS has an "export as image" function. If you want to export a layers as an image follow these steps (tested with QGIS 3.8):
1. Draw on top of a OSM layer or create your custom layers a different way.
2. Create a extent layer enclosing all relevant layers (in a spatial sense) and extract the layer extent (`Vector > Research Tools > Extract Layer Extent...`).
3. Go to the attribute table of the resulting layer. You can now extract a pair of coordinates representing two diagonally opposite corners of the image layer that you will be asked for in the edit menu of FieldMapper: 
`<MINX>, <MINY>` and `<MAXX>, <MAXY>`. Make sure the coordinates are in WGS84 decimal degree format.
4. Select `File > Import/Export > Export Map to Image`. Calculate the extent using your extent layer and click save.


