var $input = $("#infa-input-box");
var idMap = {};

$.htmlId = function (prefix) {
		if (prefix == undefined) prefix = "infa";
		var curVal = prefix in idMap ? idMap[prefix] : 0;
		idMap[prefix] = ++curVal;
		return prefix + curVal;
	};

var addButton = function (value) {
                var $main = $('#screen-dialog-footer-button-list');
                var $input = $("#infa-input-box");
                var $buttonId = $.htmlId("infa-button");
                var $listId = $.htmlId("list-id");
                var titleText = value;
                var $insertElement = $('<li title="Double click to edit" label=' + value + '> <div class="list-element" title=' + titleText + ' id=' + $listId + '>' + value + '</div> <button id=' + $buttonId + '>x </button> </li>');
                $insertElement.appendTo($main[0]);
                $input.remove();
                $input.appendTo($main[0]);

                $('#' + $buttonId)[0].onclick = function (e) {
                    event.currentTarget.parentNode.remove();
                };
                var oriVal;
                $('#' + $listId)[0].ondblclick = function (e) {
                    oriVal = $(this).text();
                    $(this).text("");
                    $("<input id= 'inputText' type='text' style='height: 100%'>").appendTo(this).focus();
                    $('#inputText').focus().val("").val(oriVal);
                };


                $('#' + $listId)[0].onfocusout = function (event){
                    var $this = $(this);
                    $this.text(event.target.value || oriVal);
                    $input.focus();
                };

                $('#' + $listId)[0].onkeypress= function (event) {
                    if (event.which === 13) {
                        var $this = $(this);
                        $this.text(event.target.value || oriVal); 
                        $input.focus();
                    }
                };
            };

($input[0]).addEventListener('keyup', function (e) {
                    if (e.keyCode === 13) {
                        var value = e.target.value.trim();
                        var characterPressed = String.fromCharCode(e.keyCode).trim();
                        if (characterPressed.length > 0) {
                            value = value.slice(0, value.length - 1);
                        }
                        if (value !== '' ) {
                          addButton(value);
                            
                            e.target.value = '';
                        }
                        $input[0].focus();
                    }
                });
               
$("#screen-dialog-footer-button-list").sortable({
                    update: function (event, ui) {
                     				console.log("updated");
                        }
                });