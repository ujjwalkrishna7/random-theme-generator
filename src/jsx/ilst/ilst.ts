import {
    helloVoid,
    helloError,
    helloStr,
    helloNum,
    helloArrayStr,
    helloObj,
  } from "../utils/samples";
  export { helloError, helloStr, helloNum, helloArrayStr, helloObj, helloVoid };

  export const paletteCreate = (colorValues:{name:string,r:number,g:number,b:number}[]) => {        
    // Create a new group
    var newGroup = app.activeDocument.groupItems.add();

    // Loop through the color values array and create swatches
    for (var i = 0; i < colorValues.length; i++) {
    var colorValue = colorValues[i];

    // Create a new color swatch
    var newSwatch = app.activeDocument.swatches.add();
    newSwatch.name = colorValue.name;

    // Set the color values for the new swatch
        var newRGBColor = new RGBColor();
        newRGBColor.red = colorValue.r;
        newRGBColor.green = colorValue.g;
        newRGBColor.blue = colorValue.b;
        newSwatch.color = newRGBColor ;


    // Create a new rectangle to represent the swatch
    var swatchRect = newGroup.pathItems.rectangle(0, 0, 50, 50);
    swatchRect.filled = true;
    swatchRect.fillColor = newSwatch.color;

    // Position the swatch rectangle in the group
    swatchRect.left = i * 60;
    swatchRect.top = 0;
    }

    // Position the group on the artboard
    newGroup.left = 0;
    newGroup.top = 0;
  };

  
  export const paletteFill = (colorValue:{name:string,r:number,g:number,b:number}) => {
     // Create a new color swatch
    var newSwatch = app.activeDocument.swatches.add();
    newSwatch.name = colorValue.name;  // Set the name of the new swatch

    // Set the color values for the new swatch
    var newRGBColor = new RGBColor();
    newRGBColor.red = colorValue.r;
    newRGBColor.green = colorValue.g;
    newRGBColor.blue = colorValue.b;

    newSwatch.color = newRGBColor;    


    // Apply the new swatch to selected objects or set it as the default fill/stroke color
    var selection = app.activeDocument.selection;
    if (selection.length > 0) {
    // Apply the new swatch to selected objects
    for (var i = 0; i < selection.length; i++) {
        selection[i].fillColor = newSwatch.color;
    }
    } else {
    // Set the new swatch as the default fill/stroke color
    app.activeDocument.defaultFillColor = newSwatch.color;
    app.activeDocument.defaultStrokeColor = newSwatch.color;
    }
  }
  
  
  