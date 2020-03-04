var api = apimock;
var Module = (function () {
    var _author;
    var open = false;

    function _map(list) {
        return mapList = list.map(function (blueprint) {
            return {bpname: blueprint.name, numberPoints: blueprint.points.length};
        })
    }

    function _numberPoints(blueprints) {
        var total = blueprints.reduce(function (total, value) {
            return total + value.numberPoints;
        }, 0);
        $("#sumBlueprint > h3").text("Total user points: " + total);
    };

    function _graficar(blueprints) {
        $("#canvasTitle").text("Current blueprint: " + blueprints.name);
        var myCanvas = document.getElementById("myCanvas");
        var ctx = myCanvas.getContext("2d");
        ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
        ctx.beginPath();
        var first = blueprints.points[0];
        ctx.moveTo(first.x, first.y);
        blueprints.points.map(function (punto) {
            ctx.lineTo(punto.x, punto.y);
        })
        ctx.stroke();
    }

    function _table(blueprints) {
        blueprints = _map(blueprints);
        _numberPoints(blueprints);
        $("#tableBlueprints > tbody").empty();
        blueprints.map(function (blueprint) {
            $("#tableBlueprints > tbody").append(
                "<tr> <td>" +
                blueprint.bpname +
                "</td>" +
                "<td>" +
                blueprint.numberPoints +
                "</td> " +
                "<td><form><button type='button' onclick='Module.getBlueprintsAuthorAndName( \"" +
                _author +
                '" , "' +
                blueprint.bpname +
                "\")' >Open</button></form></td>" +
                "</tr>"
            );
        });
    };

    function _setAuthorName(author) {
        _author = author;
    };

    function getBlueprintsAuthor(author) {
        _setAuthorName(author);
        if (author == "" || author == null) {
            alert("Ingrese un valor correcto de nombre");
        } else {
            $("#blueprintAuthor > h2").text(author + "'s blueprints: ");
            api.getBlueprintsByAuthor(author, _table);
        }
    };

    function getBlueprintsAuthorAndName(author, name) {
        _setAuthorName(author);
        api.getBlueprintsByNameAndAuthor(name, author, _graficar);
    };

    function init() {
        var canvas = document.getElementById("myCanvas"),
            context = canvas.getContext("2d");
        if (window.PointerEvent) {
            canvas.addEventListener("pointerdown", draw, false);
        } else {
            //Provide fallback for user agents that do not support Pointer Events
            canvas.addEventListener("mousedown", draw, false);
        }
    }

    // Event handler called for each pointerdown event:
    function draw(event) {
        var canvas = document.getElementById("myCanvas"),
            context = canvas.getContext("2d");
        var offset = getOffset(canvas);
        var x = event.pageX - offset.left;
        var y = event.pageY - offset.top;
        console.log(x, y)
        context.fillRect(x, y, 10, 10);
    }

    //Helper function to get correct page offset for the Pointer coords
    function getOffset(obj) {
        var offsetLeft = 0;
        var offsetTop = 0;
        do {
            if (!isNaN(obj.offsetLeft)) {
                offsetLeft += obj.offsetLeft;
            }
            if (!isNaN(obj.offsetTop)) {
                offsetTop += obj.offsetTop;
            }
        } while (obj = obj.offsetParent);
        return {left: offsetLeft, top: offsetTop};
    }

    function openCanvas() {
        open = true;
    }

    function closeCanvas() {
        open = false;
    }


    return {
        getBlueprintsAuthor: getBlueprintsAuthor,
        getBlueprintsAuthorAndName: getBlueprintsAuthorAndName,
        init: init,
        openCanvas: openCanvas,
        closeCanvas: closeCanvas
    };
})();
