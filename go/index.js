(function(){
 var $$ = go.GraphObject.make; 
    myDiagram =
      $$(go.Diagram, "myDiagramDiv", 
         {initialPosition: new go.Point(0, 0), "animationManager.isEnabled": false ,
          initialContentAlignment: go.Spot.Center,
          allowDrop: true,  
          "animationManager.duration": 800, 
          "undoManager.isEnabled": true ,
           "draggingTool.dragsLink": true,
          "draggingTool.isGridSnapEnabled": true,
          "linkingTool.isUnconnectedLinkValid": true,
          "linkingTool.portGravity": 20,
          "relinkingTool.isUnconnectedLinkValid": true,
          "relinkingTool.portGravity": 20,
          "relinkingTool.fromHandleArchetype":
            $$(go.Shape, "Diamond", { segmentIndex: 0, cursor: "pointer", desiredSize: new go.Size(), fill: "tomato", stroke: "darkred" }),
          "relinkingTool.toHandleArchetype":
            $$(go.Shape, "Diamond", { segmentIndex: -1, cursor: "pointer", desiredSize: new go.Size(5, 5), fill: "darkred", stroke: "tomato" }),
          "linkReshapingTool.handleArchetype":
            $$(go.Shape, "Diamond", { desiredSize: new go.Size(7, 7), fill: "lightblue", stroke: "deepskyblue" }),
       });
    $("li").draggable({
      stack: "#myDiagramDiv",
      revert: true,
      cursor:"auto"                 
    });
    $("#myDiagramDiv").droppable({
      drop: function(event, ui) {
        console.log(ui,event)
        var elt = ui.draggable.first();
        var text = elt[0].textContent;
        var x = ui.offset.left - $(this).offset().left;
        var y = ui.offset.top - $(this).offset().top;
        var p = new go.Point(x, y);
      //   var q = myDiagram.transformViewToDoc(p);
      //   var model = myDiagram.model;
      //   model.startTransaction("drop"); 
      //   model.addNodeData({
      //     text: text,
      //     loc: go.Point.stringify(q),
      //     titie:12
      //   });
      //   model.commitTransaction("drop");
      // }
    })

    // function showLinkLabel(e) {
    //   var label = e.subject.findObject("LABEL");
    //   if (label !== null) label.visible = (e.subject.fromNode.data.figure === "Diamond");
    // }

    //这里是模板文本框
  myDiagram.nodeTemplate =
      $$(go.Node, "Spot",
        { locationSpot: go.Spot.Center },
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding("angle").makeTwoWay(),
        $$(go.Panel, "Auto",
          { name: "PANEL" },
          new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
          $$(go.Shape, "Rectangle",  
            {
              portId: "", 
              fromLinkable: true, toLinkable: true, cursor: "pointer",
              fill: "white", 
              strokeWidth: 1,
              //这里是边框颜色
              // stroke:"skyblue"
            },
            new go.Binding("figure"),
            new go.Binding("fill")),
          //这里修改文本信息
          $$(go.TextBlock,
            {
              font: "11pt Helvetica, Arial, sans-serif",
              margin: 8,
              // stroke:"red",
              maxSize: new go.Size(160, NaN),
              wrap: go.TextBlock.WrapFit,
              editable: true
            },
            new go.Binding("text").makeTwoWay())
        ),
        makePort("T", go.Spot.Top, true, true),
        makePort("L", go.Spot.Left, true, true),
        makePort("R", go.Spot.Right, true, true),
        makePort("B", go.Spot.Bottom, true, true),
        { 
          mouseEnter: function(e, node) { showSmallPorts(node, true); },
          mouseLeave: function(e, node) { showSmallPorts(node, false); }
        },
        {click:function(e,node){
             showText(e,node);
             alert("asd")
        }}
      );
    function showText(e,node){
      $("#text").val(node.data.text)
    }



//  myDiagram.addDiagramListener("ChangedSelection", function(diagramEvent) {
//       var idrag = document.getElementById("infoDraggable");
//       idrag.style.width = "";
//       idrag.style.height = "";
// });

    
        var inspector = new Inspector('myInfo', myDiagram,
          {
            properties: {
              // key would be automatically added for nodes, but we want to declare it read-only also:
              "key": { readOnly: false, show: Inspector.showIfPresent },
              // fill and stroke would be automatically added for nodes, but we want to declare it a color also:
              "fill": { show: Inspector.showIfPresent, type: 'color' },
              "stroke": { show: Inspector.showIfPresent, type: 'color' }
            }
          });
  



  var linkSelectionAdornmentTemplate =
      $$(go.Adornment, "Link",
        $$(go.Shape,
          { isPanelMain: true, fill: null, stroke: "red", strokeWidth: 0 }) 
      );
    myDiagram.linkTemplate =
      $$(go.Link,  
        { selectable: true, selectionAdornmentTemplate: linkSelectionAdornmentTemplate },
        { relinkableFrom: true, relinkableTo: true, reshapable: true },
        {
          routing: go.Link.AvoidsNodes,
          curve: go.Link.JumpOver,
          corner: 5,
          toShortLength: 4
        },
        new go.Binding("points").makeTwoWay(),
        $$(go.Shape, 
          { isPanelMain: true, strokeWidth: 1}),
        $$(go.Shape,  
          { toArrow: "Standard", stroke: null }),
        $$(go.Panel, "Auto",
          new go.Binding("visible", "isSelected").ofObject(),
          $$(go.Shape, "RoundedRectangle",  
            { fill: "#F8F8F8", stroke: null }),
          $$(go.TextBlock,
            {
              textAlign: "center",
              font: "10pt helvetica, arial, sans-serif",
              stroke: "gray",
              margin: 2,
              editable: true
            },
            new go.Binding("text").makeTwoWay())
        )
      );
    function makePort(name, spot, output, input) {
      return $$(go.Shape, "Circle",
               {
                  fill: "transparent",
                  stroke: null,  
                  desiredSize: new go.Size(7, 7),
                  alignment: spot, alignmentFocus: spot, 
                  portId: name,  
                  fromSpot: spot, toSpot: spot,  
                  fromLinkable: output, toLinkable: input,
                  cursor: "pointer"  
               });
        }

    function showSmallPorts(node, show) {
      node.ports.each(function(port) {
        if (port.portId !== "") { 
          port.fill = show ? "rgba(0,0,0,.2)" : null;
        }
      });
    }

  function save() {
    saveDiagramProperties();
    myDiagram.isModified = false;
    window.sessionStorage.setItem("value",myDiagram.model.toJson())
  }


   function saveDiagramProperties() {
    myDiagram.model.modelData.position = go.Point.stringify(myDiagram.position);
  }


   function load() {
    // myDiagram.model = go.Model.fromJson(document.getElementById("mySavedModel").value);
    //保存到本地电脑里面
    myDiagram.model =go.Model.fromJson(window.sessionStorage.getItem("value")) 
    loadDiagramProperties();  
  }
  function loadDiagramProperties(e) {
    var pos = myDiagram.model.modelData.position;
    if (pos) myDiagram.initialPosition = go.Point.parse(pos);
  }


  $("#SaveButton").on("click",function(){
    save();
  })
  $("#LoadButton").on("click",function(){
    load();
  })
})(window)

