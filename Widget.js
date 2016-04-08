define([
  'dojo/_base/declare', 
  'jimu/BaseWidget',
  "esri/graphicsUtils",
  'esri/geometry/geometryEngine',
  'esri/symbols/SimpleLineSymbol',
  'esri/symbols/SimpleFillSymbol',
  'esri/graphic',
  'esri/Color',
  "esri/layers/GraphicsLayer",
  "esri/geometry/Point"],
  function(
    declare, 
    BaseWidget,
    graphicsUtils, 
    geometryEngine,
    SimpleLineSymbol, 
    SimpleFillSymbol, 
    Graphic, 
    Color,
    GraphicsLayer,
    Point) {
    //To create a widget, you need to derive from BaseWidget.
    return declare([BaseWidget], {
      // Custom widget code goes here 

      baseClass: 'jimu-widget-customwidget',
      featLayer: null,
      graphicsLayer: null,

      //this property is set by the framework when widget is loaded.

      //methods to communication with app container:

      postCreate: function() {
        this.inherited(arguments);
        console.log('postCreate');
        //alert('POST!');
      },

      startup: function() {
        this.inherited(arguments);
        console.log('startup');
        //Creacion de la graphic layer que se agrega al mapa para visualizar el buffer
        this.graphicsLayer = new GraphicsLayer();
        this.map.addLayer(this.graphicsLayer);
      },

      onOpen: function(){
        console.log('onOpen');
        //alert('OPEN!');
      },

      disaster: function(){
      //Simbologia para el Buffer
        var bufferSymbol = new SimpleFillSymbol(
          SimpleFillSymbol.STYLE_SOLID, 
          new SimpleLineSymbol(SimpleLineSymbol.STYLE_LONGDASH, 
          new Color([255,128,128,1]), 1), //Linea exterior
          new Color([230,100,100,0.1]) //Interior
          );

        //Valor de radio que se obtiene de la lista del HTML
        var r = document.getElementById("radio");
        var radio = r.value;

        //Variable punto para el buffer
        var pt = document.getElementById("react");
        var ptY = pt.y;
        var ptX = pt.x;
        var p = new Point([ptY,ptX],map.spatialReference);
        
        //Creacion del buffer geometryEngine.geodesicBuffer(punto,radio,unidades)
        var bufferedGeometries = geometryEngine.geodesicBuffer(p, radio, "kilometers");
        var bufferGraphic = new Graphic(bufferedGeometries, bufferSymbol);


        
        //Buffer al grafico
        this.graphicsLayer.add(bufferGraphic);
        this.map.addLayer(this.graphicsLayer);
        },

        clean: function(){
          //Boton para limpiar los buffer del mapa
          this.graphicsLayer.clear();
        }

      // onClose: function(){
      //   console.log('onClose');
      // },

      // onMinimize: function(){
      //   console.log('onMinimize');
      // },

      // onMaximize: function(){
      //   console.log('onMaximize');
      // },

      // onSignIn: function(credential){
      //   /* jshint unused:false*/
      //   console.log('onSignIn');
      // },

      // onSignOut: function(){
      //   console.log('onSignOut');
      // }

      // onPositionChange: function(){
      //   console.log('onPositionChange');
      // },

      // resize: function(){
      //   console.log('resize');
      // }

      //methods to communication between widgets:

    });
  });