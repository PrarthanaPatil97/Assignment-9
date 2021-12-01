$(document).ready(function () {

    let movieData;
    let order = "ascending";

    $.ajax({
        type: "Get",
        url: "movie.json",
        dataType: "json",
        contentType: "application/json",
        searchText: {},
        success: function (data) {
            characterDetails = data;
            movieData = data;
            createTable(characterDetails)
            amFilter();
            nzFilter();
        },
        error: function () {
            alert("data not found");
        }


    });

    function createTable(data) {
        for (i = 0; i < data.length; i++) {
            $('#main_Table').append(
                '<tr><td class="movieid">' + data[i].id +
                '</td><td class="character_name">'
                + data[i]["characterName"] +
                '</td><td>' + data[i]["date"]
                + '</td><td>' + data[i]["played by"] +
                '</td><td>' + data[i]["film title"] +
                '</td></tr>');
        }
    }


    $("th").each(function (column) {
        $(this).click(function () {
            console.log($(this).attr("class"));

            let type = $(this).attr("class");
            let tableData = $("table").find("#main_Table > tr");



            if (order === "descending") {
                $(".chevron").html("");
                $(this).find("span").html("&#x25B2;");
                tableData.sort(function (a, b) {

                    let first = $(a).children("td").eq(column).text();
                    let second = $(b).children("td").eq(column).text();
                    if (!isNaN(first)) {
                        first *= 1;
                        second *= 1;
                    }
                    if (!isNaN(Date.parse(first))) {
                        first = Date.parse(first);
                        second = Date.parse(second);
                    }

                    return first > second ? -1 : first < second ? 1 : 0;
                });
                $.each(tableData, function (index, row) {
                    $("#main_Table").append(row);
                })
                order = "normal";
                return;
            }

            if (order === "ascending") {
                $(".chevron").html("");
                $(this).find("span").html("&#x25BC;");
                tableData.sort(function (a, b) {
                    let first = $(a).children("td").eq(column).text();
                    let second = $(b).children("td").eq(column).text();
                 
                    if (!isNaN(first)) {
                        first *= 1;
                        second *= 1;
                    }

                    if (!isNaN(Date.parse(first))) {
                        first = Date.parse(first);
                        second = Date.parse(second);
                    }

                    return first > second ? 1 : first < second ? -1 : 0;
                });
                $.each(tableData, function (index, row) {
                    $("#main_Table").append(row);
                })
                order = "descending";
                return;
            }

            if (order === "normal") {
                console.log("order");
                $(".chevron").html("");
                $(this).find("span").html("");
                $('#main_Table').empty();
                createTable(movieData);
                order = "ascending";
                return;
            }

        })
    })



});