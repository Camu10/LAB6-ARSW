apimock = (function () {

    var mockdata = [];

    mockdata["JhonConnor"] = [
        {
            author: "JhonConnor",
            name: "house",
            points: [
                {
                    x: 10,
                    y: 20
                },
                {
                    x: 15,
                    y: 25
                },
                {
                    x: 45,
                    y: 25
                }
            ]
        },
        {
            author: "JhonConnor",
            name: "bike",
            points: [
                {
                    x: 30,
                    y: 35
                },
                {
                    x: 40,
                    y: 45
                }
            ]
        },
        {
            author: "JhonConnor",
            name: "cat",
            points: [
                {
                    x: 10,
                    y: 25
                },
                {
                    x: 20,
                    y: 35
                },
                {
                    x:50,
                    y:35
                },
                {
                    x:99,
                    y:100
                }
            ]
        }
    ];

    mockdata['LexLuthor'] = [
        {
            author: 'LexLuthor',
            name: 'kryptonite',
            points: [
                {
                    x: 60,
                    y: 65
                },
                {
                    x: 70,
                    y: 75
                }
            ]
        }
    ];

    return {
        getBlueprintsByAuthor: function(author, callback) {
            callback(mockdata[author]);
        },

        getBlueprintsByNameAndAuthor: function(name, author, callback) {

            blueprint = mockdata[author].find(function(blueprint) {
                return blueprint.name == name
            });
            return callback( blueprint)
        }
    }

})();