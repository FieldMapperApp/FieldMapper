# Working with the Data

FieldMapper exports GeoJSON files. 
All the attributes you added via the [Variable Management](settings/variable_management.md) interface are stored as properties of the exported features. 
You can access these attributes in the attribute table of the layer after importing the layers into GIS software (e.g. QGIS).
Now you can perform all kind of queries on the data, for example calculating the mean distance between points (example use case: distance between home and favourite place for some activity) or rendering a heat map.<sup>[[1]](#footnote1)</sup> 
With FieldMapper you can only create points and lines. Lines can be transformed into polygons really easy with the help of GIS software.
In QGIS (tested with v3.8), just use the Polygonize function which can be accessed via `Vector > Geometry Tools > Lines to Polygons`.

Every feature added to the map has a timestamp which serves as a unique ID (if you prefer a numerical ID you can easily generate it from the timestamps with Excel, Python or whichever software/language you use). All exported layers also have a timestamp in their file name.
If you combine FieldMapper with a digital questionnaire or other tools (one exported layer and questionnaire per interviewee), you can use algorithms to bring together data from different timecoded sources.
You can link questionnaire items to FieldMapper features either with color codes (establish conventions where you define that the item "Where do your live?" corresponds to blue features beforehand) or by using the comments function and providing an item reference.
If you have a fixed interview procedure and the same number of features per item in every iteration of the procedure you could also use the timetags to get item reference.

---
**<sub>Footnotes:</sub>**\
**<sub><a name="footnote1">[1]</a>:</sub>**<sub>
You can style point layers as heat maps in QGIS (tested with v3.8) by choosing "heat map" in the Symbology section of the Layer Properties menu. 
If the input layers are polygons and you want to calculate the heat from the degree of overlapping, generate random points in the polygons first (`Vector > Research Tools > Random Points inside Polygons`). 
</sub>
