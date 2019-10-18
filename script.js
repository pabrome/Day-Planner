
var hours = [9,10,11,12,13,14,15,16,17]
var currentHour
var savedItemsVar = new Array(8)
var savedItemsStorage

for (x = 0; x < hours.length; x++){
    $("<div>").attr({
        class: "row ",
        id: "row" + x,
    }).appendTo("#timeSlots")

    if (hours[x] > 12){
        time = (hours[x]-12) + " PM"
    }
    else{
        time = hours[x] + " AM"
    }

    $("<div>").addClass("col-2 col-md-1 border-top text-nowrap text-center mx-6 ").css("fontSize",14).text(time).appendTo("#row" + x)

    $("<input>").attr({
        class: "col-8 col-md-9",
        type: "text",
        id: "input" + x,
        height: "500px"
    }).appendTo("#row" + x)

    $("<button>").attr({
        class: "col-1",
        val: "Save",
        id: "button" + x,
    }).appendTo("#row" + x)
}

//Colour coding each hour function
function colourCode(){
    currentHour = moment().format("H")
    for (x = 0; x <= currentHour - 9; x++){
        if (x == currentHour){
            $("#input" + x).addClass("bg-danger")
        }
        $("#input" + x).addClass("bg-secondary")
    }
}
//Initialize colour coding
colourCode()

//Loading locally stored items to day planner
if (localStorage.getItem(savedItemsStorage) !== null){
    savedItemsVar = JSON.parse(localStorage.getItem(savedItemsStorage))
    for (x = 0; x <= 8; x++){
        if (savedItemsVar[x] !== null){
            $("#input" + x).val(savedItemsVar[x])
        }
    }
}

//Updating date in header
$("<p>").text("A smart and simple day planner for " + moment().format("MMMM DD, YYYY")).appendTo(".lead")

//Timer to update colours
setInterval(function(){
    colourCode()
},1000)

//Button click - save item to Local Storage
$("button").click(function(){
    currentItem = Number(this.id.substr(6))
    savedItemsVar = JSON.parse(localStorage.getItem(savedItemsStorage))
    savedItemsVar[currentItem] = $("#input" + currentItem).val()
    localStorage.setItem(savedItemsStorage,JSON.stringify(savedItemsVar))
})
