apiclient = (function() {

    return {
        getBlueprintsByAuthor: function(author) {
            var getPromise=$.ajax({
                dataType: "json",
                url: "http://localhost:8080/blueprints/"+author,
            });
        return getPromise;
        },
        getBlueprintsByNameAndAuthor: function( name, author) {
            var getPromise=$.ajax({
                dataType: "json",
                url: "http://localhost:8080/blueprints/"+author+"/"+name,
            });
            return getPromise;
        },
        updateBlueprint:function (blueprint) {
            var putPromise=$.ajax({
                url:"http://localhost:8080/blueprints/"+blueprint.author+"/"+blueprint.name,
                type:'PUT',
                data:JSON.stringify(blueprint),
                contentType: "application/json",
            });
            return putPromise;
        },
        deleteBlueprint:function (author,name) {
            var deletePromise=$.ajax({
                url:"http://localhost:8080/blueprints/"+author+"/"+name,
                type:'DELETE',
            });
            return deletePromise;
        },
        createBlueprint:function (blueprint) {
            var postPromise=$.ajax({
                url:"http://localhost:8080/blueprints",
                type:'POST',
                data:JSON.stringify(blueprint),
                contentType: "application/json",
            })
            return postPromise;
        }

    };
})();