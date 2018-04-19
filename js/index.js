/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        //document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        $("#modifyHeightWidth").click(heightWidth);
        $("#modifyColor").click(color);
        $("#changeText").click(changeText);
        $("#changeClass").click(changeClass);
        $("#createButton").click(createButton);
        $("#augmentSize").click(augmentSize);
        $("#btnGame").click(divGame);
        $("#btnSimon").click(simonGame);
        $("#simon div").click(simonImage);
    }

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    /* onDeviceReady: function () {
     this.receivedEvent('deviceready');
     
     },*/

    // Update DOM on a Received Event
    /*    receivedEvent: function (id) {
     var parentElement = document.getElementById(id);
     var listeningElement = parentElement.querySelector('.listening');
     var receivedElement = parentElement.querySelector('.received');
     
     listeningElement.setAttribute('style', 'display:none;');
     receivedElement.setAttribute('style', 'display:block;');
     
     console.log('Received Event: ' + id);
     }*/
};

app.initialize();
function heightWidth() {
    var height = $("#height").val();
    var width = $("#width").val();
    $("#divModificat").css({"height": height, "width": width});
}

function color() {
    var color = $("#color").val();
    $("#divModificat").css({"background-color": color});
}

function changeText() {
    if ($("#changeText").html() == "CHANGE TEXT") {
        $("#changeText").html("NOU TEXT");
    } else {
        $("#changeText").html("CHANGE TEXT");
    }
}

function changeClass() {
    if ($("#changeClass").hasClass("btn-danger")) {
        $("#changeClass").addClass("btn-warning");
        $("#changeClass").removeClass("btn-danger");
    } else {
        $("#changeClass").addClass("btn-danger");
        $("#changeClass").removeClass("btn-warning");
    }
}
var newButton;
function createButton() {
    newButton = $("<a href='#' id='createButton' class='btn btn-info btn-lg'>REMOVE ME</a>");
    $("#create").append(newButton);
    newButton.click(deleteButton);
}

function deleteButton() {
    newButton.remove();
}

function augmentSize() {
    $("#augmentSize").animate({height: "100px"}, 2000, function () {
        $("#augmentSize").animate({height: "46px"}, 2000);
    });
}
var quantityDiv = 0;
var playing = true;
function divGame() {
    var id = setInterval(swapImages, 1000);
    function swapImages() {
        if ((quantityDiv <= 0) && (playing == false)) {
            alert("GameOver");
            clearInterval(id);
            quantityDiv = 0;
            playing = true;
        } else {
            $('<button id="toHit" style="background: red" class="btn btn-danger">HIT</button>').appendTo('.btnGame').click(function () {
                $(this).remove();
                quantityDiv--;
            });
            playing = false;
            quantityDiv++;
        }
    }
}
var record = Array();
var touched = Array();
var playingSimon = false;
function simonGame() {
    record = Array();
    $("#simon div").addClass("showColor");
    newMovement();
}
function newMovement(){
    playingSimon = false;
    $("#message").html("Showing colors:");
    touched = Array();
    var newMovement = Math.floor(Math.random() * 3);
    record.push(newMovement);
    $("#movements").html(record.length);
    showColors(0);
}
function showColors(indice){
    $("#simon div").removeClass("showColor");
    if (record[indice] >= 0){
        $("#simon div:nth-child(" + (record[indice] + 1) + ")").addClass("showColor");
        setTimeout(function () {
            hideColors(indice + 1)
        }, 1000);
    } else {
        $("#simon div").addClass("showColor");
        playingSimon = true;
        $("#message").html("Go!");
    }
}
function hideColors(indice){
    $("#simon div").removeClass("showColor");
    setTimeout(function () {
        showColors(indice)
    }, 800);
}
function simonImage() {
    if (playingSimon){
        touched.push($(this).index());
        verify = check();
        if (verify == 1){
            newMovement();
        } else if (verify == 0) {

            showError();
        }
    }
}
function check(){
    for (var i = 0; i < record.length; i++){
        if (touched.length > i){
            if (record[i] != touched[i]){
                return 0;
            }
        } else {
            return 2;
        }
    }
    if (touched.length == record.length){
        return 1;
    }
    return 2;
}
function showError(){
    $("#message").html("GameOver");
}