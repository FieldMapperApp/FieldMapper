# Variable Management

## Choosing the right type
As your aim is to collect data that suits your research question, you probably want to work with a custom set of variables tailored to your case. 
These variables will actually determine the attributes of objects that you add to the map. Once you have clicked on *Variable Management* in the settings tab, you are prompted to add a variable. 
Now just enter the name of the new variable and click on enter. The variable shows up in the list below.
Next to its name you can see two buttons: if you press the left button, you can *edit* the variable and how it appears as a button in the map interface. 
The right button will delete the variable. Note that, if you do not edit the variable, it will be operationalised as a boolean variable (see below).

If you click on the edit button, a page opens up where you can change the type, value and icon of the variable (button). 
First decide which kind of data you want to encode. Instead of variables we could also speak of attributes since Type *Boolean* generates a single button that can be activated and deactivated. 
Active state means "true", inactive state means "false". 
This kind of button makes the most sense when the attribute only has two possible states (dichotomous variable) and state 1 equals the negation of state 2, for instance "wears hat/doesn't wear hat" (if you are only interested whether someone wears a hat and not which kind of hat). If you name the variable "Hat" or "Wears hat" and choose Boolean as the variable type, "Hat" can be either "true" or "false".
If "true"/"false" does not make sense but you still want to operationalise the attribute as a dichotomous variable, you can choose *Custom binary*. 
You can now enter two comma-separated values. The first value will correspond to an inactive button. 
As with most things, you can operationalise an attribute in more than one way. Instead of the following configuration ...

* Variable name: Hat
* Type: Boolean
* (Values: "true", "false")

... you could also encode the same information with this configuration:

* Variable name: Hat
* Type: Custom binary
* Values: "doesn't wear one", "wears one"

In most cases, working with boolean variables (where reasonable) will make things easier.

Aside from these, you can also encode non-binary information. 
Imagine you are actually interested in the type of hat a person wears. As there are more than two types of hats, both other types do not work.
We need to choose type *Non-dichotomous* and enter all possible attribute states we are interest in. 
In our case those could be "Sombrero", "Beanie" and "Kippah". Unlike the binary types, this will generate not a single button with two states (active and inactive) but a bar of length n = number of states/values.

## Using custom icons

Once you have clicked the *Use SVG/PNG icon" option, you can upload your own icons. 
If you disable this option, the first two letters of the variable name (Boolean/Binary) or values (Non-dichotomous) will show up as the button icon (which will suffice for most purposes if you do not have a couple of variables that share the same initial letters or care much about a visual representation of the attributes.)

You can find free SVG icons in icon libraries such as [FontAwesome](https://fontawesome.com/) or [Ionicons](https://ionicons.com/). Download them to your device and upload them using the dedicated function in the edit menu of the variable.
