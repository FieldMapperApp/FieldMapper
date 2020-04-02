# Use cases

FieldMapper comes in handy when you want to describe phenomena (objects and processes) as well as conceptions thereof and it matters *where* these things happen or are perceived to have happened. Two general use cases come to mind:
 
1. **Observation of spatially bounded systems**    
I developed the prototype of the app in preparation for my Bachelor's dissertation research project where I conducted fieldwork in a neighbourhood park. Among other things, I used the app to count visitors and the frequency of certain demographic variables. Because all data is spatially coded, you can easily detect spatial patterns and clusters of phenomena. You can add custom buttons to the map UI, which gives you the opportunity to work with your own variables. Another feature that appears to be especially useful in the study of social networks is the "group" functionality which enables you to mark interaction between actors.
Yet, usage of the app is not limited to social research as one can easily imagine to survey abiotic components of systems in addition to human actors or even exclusively.<sup>[1](#footnote1)</sup> 

2. **Mapping social routines and perception of places in social research**    
Apart from observing visitors, I also employed the app in the context of interviews. Visitors were asked to mark areas they consider to be unsafe or a preferred spot under certain circumstances. In this context, the ability to draw polylines freehand (which can be transformed into polygons using GIS software) proves especially useful. Color codes, timestamps and free text comments are on hand for metadata tagging. 

Whether you are a sociologist who wants to observe people in public spaces systematically, an architecture or urban planning student who wants to learn about the ways people navigate through the built environment to optimise infrastructural connection or the aesthetics of certain places, or even an ecologist counting tree species&mdash;FieldMapper might be the tool you are looking for.


---
<a name="footnote1">1</a>: Note that the app has difficulty mapping processes, for example movement of actors in space. If you repeat surveying the same place, you can of course record changes in the number of actors, for instance. Every object placed on the map has a timestamp that acts as its unique ID. Accordingly, you will have trouble recognising some object at a particular place in dataset 2 as the same object that was located 5 m left in dataset 1. If you're dealing with a multitude of moving actors, it is unlikely that you are able to map (discrete) movement anyway. If your survey only covers a limited number of (hardly mobile) actors you might be able to keep track of change in a system if you re-import a layer corresponding to a prior state, move markers manually and delete/add markers if necessary.