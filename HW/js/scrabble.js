/*
Avani Bhavsar, Umass Lowell Computer Science
avani_bhavsar@student.uml.edu
COMP 4610 GUI Programming I
Last updated: 12 / 16 / 20
JavaScript file for HW8
*/

//based this on Prof. Heines implementation. I added a number associated with each letter and will use it to get the corresponding letter
var scrabbleTiles = [];
scrabbleTiles["A"] = { "value": 1, "original-distribution": 9, "number-remaining": 9, "rand_num": 0};
scrabbleTiles["B"] = { "value": 3, "original-distribution": 2, "number-remaining": 2, "rand_num": 1 };
scrabbleTiles["C"] = { "value": 3, "original-distribution": 2, "number-remaining": 2, "rand_num": 2 };
scrabbleTiles["D"] = { "value": 2, "original-distribution": 4, "number-remaining": 4, "rand_num": 3 };
scrabbleTiles["E"] = { "value": 1, "original-distribution": 12, "number-remaining": 12, "rand_num": 4 };
scrabbleTiles["F"] = { "value": 4, "original-distribution": 2, "number-remaining": 2, "rand_num": 5 };
scrabbleTiles["G"] = { "value": 2, "original-distribution": 3, "number-remaining": 3, "rand_num": 6 };
scrabbleTiles["H"] = { "value": 4, "original-distribution": 2, "number-remaining": 2, "rand_num": 7 };
scrabbleTiles["I"] = { "value": 1, "original-distribution": 9, "number-remaining": 9, "rand_num": 8 };
scrabbleTiles["J"] = { "value": 8, "original-distribution": 1, "number-remaining": 1, "rand_num": 9 };
scrabbleTiles["K"] = { "value": 5, "original-distribution": 1, "number-remaining": 1, "rand_num": 10 };
scrabbleTiles["L"] = { "value": 1, "original-distribution": 4, "number-remaining": 4, "rand_num": 11 };
scrabbleTiles["M"] = { "value": 3, "original-distribution": 2, "number-remaining": 2, "rand_num": 12 };
scrabbleTiles["N"] = { "value": 1, "original-distribution": 6, "number-remaining": 6, "rand_num": 13 };
scrabbleTiles["O"] = { "value": 1, "original-distribution": 8, "number-remaining": 8, "rand_num": 14 };
scrabbleTiles["P"] = { "value": 3, "original-distribution": 2, "number-remaining": 2, "rand_num": 15 };
scrabbleTiles["Q"] = { "value": 10, "original-distribution": 1, "number-remaining": 1, "rand_num": 16 };
scrabbleTiles["R"] = { "value": 1, "original-distribution": 6, "number-remaining": 6, "rand_num": 17 };
scrabbleTiles["S"] = { "value": 1, "original-distribution": 4, "number-remaining": 4, "rand_num": 18 };
scrabbleTiles["T"] = { "value": 1, "original-distribution": 6, "number-remaining": 6, "rand_num": 19 };
scrabbleTiles["U"] = { "value": 1, "original-distribution": 4, "number-remaining": 4, "rand_num": 20 };
scrabbleTiles["V"] = { "value": 4, "original-distribution": 2, "number-remaining": 2, "rand_num": 21 };
scrabbleTiles["W"] = { "value": 4, "original-distribution": 2, "number-remaining": 2, "rand_num": 22 };
scrabbleTiles["X"] = { "value": 8, "original-distribution": 1, "number-remaining": 1, "rand_num": 23 };
scrabbleTiles["Y"] = { "value": 4, "original-distribution": 2, "number-remaining": 2, "rand_num": 24 };
scrabbleTiles["Z"] = { "value": 10, "original-distribution": 1, "number-remaining": 1, "rand_num": 25 };
scrabbleTiles["["] = { "value": 0, "original-distribution": 2, "number-remaining": 2, "rand_num": 26 };

var current_word_score = 0;
var total_score = 0;

$(document).ready(function () {
    loadLetters();
    loadBoard();
    $('#total_score').html('<h4>0</h4>');
    $('#word_score').html('<h4>0</h4>');
    
})

function randomTile() {
    return Math.floor(Math.random() * 27); //generate random number from 0 - 26. https://www.w3schools.com/JS/js_random.asp
}

function loadLetters() {
    var rand = randomTile(); //get random number
    console.log(rand);
    ch = String.fromCharCode(65 + rand); //use it to get the corresponding letter from scrabbleTiles
    console.log(ch);
    var newTile;
    var imgPath = '<img src="img/scrabble/Scrabble_Tile_' 

    for (var i = 1; i <= 7; i++) {
        if (rand == 26) {
            newTile = imgPath + '[.jpg" id="tile-' + i + '">'; //i tried to get the blank tile to appear but for some reason it does not. I don't know why
            //console.log(newTile);
        }
        else {
            newTile = imgPath + ch + '.jpg" id="tile-' + i + '">';
            //console.log(newTile);
            $('#letter_rack').append(newTile);
        }

        rand = randomTile();
        ch = String.fromCharCode(65 + rand);
        //console.log(ch);
    }
    $('#tile-1, #tile-2, #tile-3, #tile-4, #tile-5, #tile-6, #tile-7').draggable({ //make all tiles draggable
        cursor: 'move',
        helper: 'original',
        revert: true, //they will revert to orginal place when user lets them go
    });

}


function loadBoard() {
    var boardTile;
    var imgPath;
    imgPath = '<img src="img/';

    for (var i = 1; i <= 7; i++) {
        if (i == 3 || i == 7) {
            boardTile = imgPath + 'double_letter_score.png" id="board-' + i + '" width=65 height=65>'; 
            //console.log(boardTile);
            $('#board_container').append(boardTile);
        }
        else {
            boardTile = imgPath + 'blank.jpg" id="board-' + i + '" width=65 height=65>'; 
            //console.log(boardTile);
            $('#board_container').append(boardTile);
        }
    }

    var board1_val, board2_val, board3_val, board4_val, board5_val, board6_val, board7_val;
    var board1_letter, board2_letter, board3_letter, board4_letter, board5_letter, board6_letter, board7_letter;
    //okay, here is where I made each of the score board tiles droppable and once something was dropped, it could not be moved and
    //i could get the value for the current_word_score. I am sure there is a much more efficient way, but this works

    $('#board-1').droppable({
        drop: function (event, ui) {
            $(ui.draggable).draggable('disable'); //disable draggable once it is on board-1
            $(this).droppable('disable'); //prevent anything else being dropped on
            $(ui.draggable).draggable('option', 'revert', false);  //once on board-1, it stays
            board1_letter = ((ui.draggable).attr('src')).substr(-5, 1); //this is to find which letter was placed by using the img src of the tile
            console.log('board1_letter is ' + board1_letter); //this gives me the letter that was placed
            console.log('value of board1_letter is ' + scrabbleTiles[board1_letter]['value']); //this gives me the value of the particular letter
            board1_val = scrabbleTiles[board1_letter]['value'];
            current_word_score += board1_val; //update current_word_score with the value of the tile dropped on board-1
            console.log(current_word_score);
         },
        tolerance: 'fit',
    });

    $('#board-2').droppable({
        drop: function (event, ui) {
            $(ui.draggable).draggable('disable');
            $(this).droppable('disable');
            $(ui.draggable).draggable('option', 'revert', false);
            board2_letter = ((ui.draggable).attr('src')).substr(-5, 1);
            //console.log('board2_letter is ' + board2_letter);
            //console.log('value of board2_letter is ' + scrabbleTiles[board2_letter]['value']);
            board2_val = scrabbleTiles[board2_letter]['value'];
            current_word_score += board2_val;
            //console.log(current_word_score);
        },
        tolerance: 'fit',
    });

    $('#board-3').droppable({
        drop: function (event, ui) {
            $(ui.draggable).draggable('disable');
            $(this).droppable('disable');
            $(ui.draggable).draggable('option', 'revert', false);
            board3_letter = ((ui.draggable).attr('src')).substr(-5, 1);
            //console.log('board3_letter is ' + board3_letter);
            //console.log('value of board3_letter is ' + (scrabbleTiles[board3_letter]['value']) * 2);
            board3_val = (scrabbleTiles[board3_letter]['value']) * 2; //multiplied by 2 because it is a double letter score board tile
            current_word_score += board3_val;
            //console.log(current_word_score);
        },
        tolerance: 'fit',
    });

    $('#board-4').droppable({
        drop: function (event, ui) {
            $(ui.draggable).draggable('disable');
            $(this).droppable('disable');
            $(ui.draggable).draggable('option', 'revert', false);
            board4_letter = ((ui.draggable).attr('src')).substr(-5, 1);
            //console.log('board4_letter is ' + board4_letter);
            //console.log('value of board4_letter is ' + scrabbleTiles[board4_letter]['value']);
            board4_val = scrabbleTiles[board4_letter]['value'];
            current_word_score += board4_val;
            //console.log(current_word_score);
        },
        tolerance: 'fit',
    });

    $('#board-5').droppable({
        drop: function (event, ui) {
            $(ui.draggable).draggable('disable');
            $(this).droppable('disable');
            $(ui.draggable).draggable('option', 'revert', false);
            board5_letter = ((ui.draggable).attr('src')).substr(-5, 1);
            //console.log('board5_letter is ' + board5_letter);
            //console.log('value of board5_letter is ' + scrabbleTiles[board5_letter]['value']);
            board5_val = scrabbleTiles[board5_letter]['value'];
            current_word_score += board5_val;
            //console.log(current_word_score);
        },
        tolerance: 'fit',
    });

    $('#board-6').droppable({
        drop: function (event, ui) {
            $(ui.draggable).draggable('disable');
            $(this).droppable('disable');
            $(ui.draggable).draggable('option', 'revert', false);
            board6_letter = ((ui.draggable).attr('src')).substr(-5, 1);
            //console.log('board6_letter is ' + board6_letter);
            //console.log('value of board6_letter is ' + scrabbleTiles[board6_letter]['value']);
            board6_val = scrabbleTiles[board6_letter]['value'];
            current_word_score += board6_val;
            //console.log(current_word_score);
        },
        tolerance: 'fit',
    });

    $('#board-7').droppable({
        drop: function (event, ui) {
            $(ui.draggable).draggable('disable');
            $(this).droppable('disable');
            $(ui.draggable).draggable('option', 'revert', false);
            board7_letter = ((ui.draggable).attr('src')).substr(-5, 1);
            //console.log('board7_letter is ' + board7_letter);
            //console.log('value of board7_letter is ' + (scrabbleTiles[board7_letter]['value']) * 2);
            board7_val = (scrabbleTiles[board7_letter]['value']) * 2;
            current_word_score += board7_val;
            //console.log(current_word_score);
        },
        tolerance: 'fit',
    });
}

function getWordScore() {
    $('#word_score').html('<h4>' + current_word_score + '</h4>'); //update the word_score with the current_word_score
    //console.log('current word score is ' + current_word_score);

    $('#total_score').html('<h4>' + current_word_score + '</h4>');
}

function resetGame() {
    location.reload(); //reload page https://www.tutorialrepublic.com/faq/how-to-refresh-a-page-with-jquery.php
}