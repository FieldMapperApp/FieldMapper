# Options

## Toolbars

In this section of the options menu you can configure which toolbars you want to have in the map interface. 
Have a look at the [Map Interface section](../map_interface.md) of the documentation if you want to find out about the purpose of the different toolbars.

## Other

Let's break it down (the appearance of some options is dependent on whether you have enabled/disabled certain functionalities):
* *Allow deletion of imported features*: 
If you have your own [layers imported](layer_management.md) into your map, here you can determine whether you want those to be affected when you delete features on the map (for example with the clear button).
* *Include imported features in export*: 
Similarly, here you can decide whether you want to include imported layers when you save the map state as GeoJSON. (Imported layers will be saved as a separate file anyway.)
* *Enable comments*: 
Choose whether you want to have a prompt pop up which asks you to add additional information on the feature after you add a feature to the map.
* *Only group features of same geometry type*:
If you have enabled the "group" functionality, you can determine whether the algorithm distinguishes between points and lines when assigning features a group.
If enabled, points and lines can't be in the same group (which leads to groups like p<number> and l<number>), if disabled they can indeed be (simply <number>).
* *Automatically choose random color for groups*: 
If enabled, the color bar disappears from the map interface and the app will iterate over the colors (see below) and automatically color features belonging to the same group accordingly.

## Feature colors

Choose which colors you want to have in the game. Will affect both automatic (see above) and manual coloring of features.
