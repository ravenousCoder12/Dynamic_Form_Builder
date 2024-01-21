$(document).ready(function () {
    $(".form-element").draggable({
        helper: 'clone'
    });

    //Handle the double-click on form elements to add them to the preview
    $(".form-element").on("dblclick", function () {

        var element = $(this).data('type');
        var id = element + '-' + Date.now();
        $('.preview-info').hide();
        onDrop(id, element);

    });

    //when .form-element is dropped
    $("#preview-form").droppable({
        accept: '.form-element',
        drop: function (event, ui) {
            
            var element = ui.helper.data('type');
            var id = element + '-' + Date.now();
            $('.preview-info').hide();
            onDrop(id, element);
        }
    });


    ////////////////---editing menu logic---///////////////////
    $('#preview-form').on('click', '.drop-element', function (event) {
        //alert("heloooooooooooo");  //working
        var ID = $(this).attr('id');
       
        
        //console.log($(event.target).get(0).tagName)

        if ($(event.target).get(0).tagName == 'DIV') {
            $('#element-edit-menu').children().hide();
            $('#element-edit-menu').children("#" + ID).slideToggle();
        }
                
        //inital filling of edit menu

        //initial edit-label field value with text of el-label preview (el->element)
        $('#element-edit-menu').children("#" + ID).find("#edit-label").attr('value', $("#" + ID + " .el-label-outer").text());
        //.find() is used above instead of .children() because
        //.children() only travels a single level down the DOM tree while
        //.find() can traverse down multiple levels to select descendant elements(grandchildren, etc.) as well

        if (ID.substring(0, ID.indexOf('-')) === 'radio') {
            //add new option
            $('#element-edit-menu').children("#" + ID).on('click', '.add-op', function (event) {
                event.preventDefault();
                console.log("dwdwdwdwdww");
                //var i = $('#' + id + ' .edit-form-div').find(".options-ol").children().length;       //returns the no of list items in orderedlist -- ambiguity!!

                var i = parseInt($('#element-edit-menu').children("#" + ID).find(".options-ol").children().last().attr('id')) + 1;    //returns the id of last li in ol

                var html = '';

                html += `
                      <li id=`+ i + `>                                                                 
                           <input type="text" value="" class="option-label">
                           
                           <a href="#" class="remove-option btn btn-outline-danger border-0 btn-sm" id=`+ i + `><i class="fa-solid fa-xmark"></i></a>
                       </li>
                `;
                $('#element-edit-menu').children("#" + ID).find(".options-ol").append(html);                    //append the newly created list item in the ol

                //append the newly created item in orignal radio group

                var newOption = '';
                newOption += '<input type="radio" id=' + i + ' name="' + ID + '" value="Choice' + (i + 1) + '" class="m-1 radio-value-' + i + '"><label for=' + i + ' class="radio-label m-1">choice' + (i + 1) + ' </label> ';
                $("#" + ID + " .radio-group").append(newOption);



                //'<input type="radio" id=' + opId + ' name="contact" value="Choice1" class="m-1"><label for="rbChoice1" class="">choice1</label> ';
            });

            //remove an option
            $('#element-edit-menu').children("#" + ID).on('click', '.remove-option', function (event) {
                event.preventDefault();
                var li_id = $(this).attr('id');

                $('#element-edit-menu').children("#" + ID).find(".options-ol").children("#" + li_id).remove();
                $("#" + ID + ".radio-group").find("#" + li_id).remove();                              //remove respective radio
                $("#" + ID + ".radio-group").find("label[for=" + li_id + "]").remove();               //remove respective label using label for selector

            });


        }
        //------------------------------checkbox-integration.....completed----------------------------------------------------
        if (ID.substring(0, ID.indexOf('-')) === 'checkbox') {
            $('#element-edit-menu').children("#" + ID).on('click', '.add-op', function (event) {
                event.preventDefault();

                var i = parseInt($('#element-edit-menu').children("#" + ID).find(".options-ol").children().last().attr('id')) + 1;
                var html = '';

                html += `
                      <li id=`+ i + `>                                                                 
                           <input type="text" value="" class="option-label">
                           
                           <a href="#" class="remove-option btn btn-outline-danger border-0 btn-sm" id=`+ i + `><i class="fa-solid fa-xmark"></i></a>
                       </li>
                `;
                $('#element-edit-menu').children("#" + ID).find(".options-ol").append(html);

                var newOption = '';
                newOption += '<input type = "checkbox" name ="' + ID + '" id = "' + i + '" value="choice' + (i + 1) + '" class="m-1 checkbox-value-' + i + '">';
                newOption += '<label for="' + i + '" class="m-1 checkbox-label">choice' + (i + 1) + ' </label>';
                $("#" + ID + ".checkbox-group").append(newOption);
            });
            //remove an option
            $('#element-edit-menu').children("#" + ID).on('click', '.remove-option', function (event) {
                event.preventDefault();
                var li_id = $(this).attr('id');

                $('#element-edit-menu').children("#" + ID).find(".options-ol").children("#" + li_id).remove();
                $("#" + ID + ".checkbox-group").find("#" + li_id).remove();                              //remove respective checkbox
                $("#" + ID + ".checkbox-group").find("label[for=" + li_id + "]").remove();               //remove respective label using label for selector

            });
        }

        if (ID.substring(0, ID.indexOf('-')) === 'button') {
            //$("#" + id + " .edit-form-div").find("#edit-class").attr('value', $('#' + id + ' input').attr('class'));
            $('#element-edit-menu').children("#" + ID).find("#edit-value").attr('value', $('#' + ID + ' .btn-ip').attr('value'));
            $('#element-edit-menu').children("#" + ID).find("#edit-name").attr('value', $('#' + ID + ' .btn-ip').attr('name'));
        }

        
    });



    //form submission
    $("#element-edit-menu").on('input', '.edit-form', function (event) {

        var id = $(this).attr('id');
        var el = id.substring(0, id.indexOf('-'));           //el->element


        if (el === 'text') {

            //storing the form values in respective variables
            var label = $(this).find("#edit-label").val();
            var placeholder = $(this).find("#edit-placeholder").val();
            var val = $(this).find("#edit-value").val();
            var type = $(this).find("#edit-type").val();
            var maxlen = $(this).find("#edit-maxlen").val();

            //populating targeted element fields with respective variables
            $('#' + $(this).attr('id') + ' .el-label-outer').text(label);          //will change the label outer text
            $('#' + $(this).attr('id') + ' .el-label-inner').text(label);                  //will change the text of lable inside div with class form-html
            $('#' + $(this).attr('id') + ' .ip-text').attr('value', val);
            $('#' + $(this).attr('id') + ' .ip-text').attr('type', type);
            $('#' + $(this).attr('id') + ' .ip-text').attr('placeholder', placeholder);
            $('#' + $(this).attr('id') + ' .ip-text').attr('maxlength', maxlen);
            $(this).find("#edit-value").attr('maxlength', maxlen);                   //changing the maxlen of edit-form field -> '#edit-value'
            $(this).find("#edit-text-color").on('input', function () {
                var textColor = $(this).val();
                $('#' + id + ' .ip-text').css('color', textColor);
            });

        }
        else if (el === 'checkbox') {
            var label = $(this).find("#edit-label").val();

            $('#' + $(this).attr('id') + ' .el-label-outer').text(label);
            $('#' + $(this).attr('id') + ' .el-label-inner').text(label);

            var triggeredElementParentId = $(event.target).parent().attr('id');
            var triggeredElementClass = event.target.classList;

            var triggeredElementValue = event.target.value;


                $('#' + $(this).attr('id') + ' .checkbox-group').find("label[for=" + triggeredElementParentId + "]").text(triggeredElementValue);
                $('#' + $(this).attr('id') + ' .checkbox-group').find('.checkbox-value-' + triggeredElementParentId + '').attr('value', triggeredElementValue);
          

        }
        else if (el === 'radio') {
            var label = $(this).find("#edit-label").val();

            $('#' + $(this).attr('id') + ' .el-label-outer').text(label);
            $('#' + $(this).attr('id') + ' .el-label-inner').text(label);

            //take inputs from the textfield in ol and change radio group accordingly
            //var noOfItems = $(this).find(".options-ol").children().length();

            //console.log($(event.target).parent().attr('id'));   --> get the id of parent of item that triggered the input event

            var triggeredElementParentId = $(event.target).parent().attr('id');
            var triggeredElementClass = event.target.classList;

            var triggeredElementValue = event.target.value;
            //console.log(triggeredElementParentId + " " + triggeredElementClass + " " + triggeredElementValue);


             $('#' + $(this).attr('id') + ' .radio-group').find("label[for=" + triggeredElementParentId + "]").text(triggeredElementValue);                     //changing text of label for the respective radio input
             $('#' + $(this).attr('id') + ' .radio-group').find('.radio-value-' + triggeredElementParentId + '').attr('value', triggeredElementValue);          //selecting radio input using class and changing its value

         


        }
        else if (el === 'button') {
            $('#' + $(this).attr('id') + ' .btn-ip').attr('value', $(this).find("#edit-value").val());
            $('#' + $(this).attr('id') + ' .btn-ip').attr('name', $(this).find("#edit-name").val());
            $('#' + $(this).attr('id') + ' .btn-ip').attr('type', $(this).find("#edit-type").val());
            $('#' + $(this).attr('id') + ' .btn-ip').removeClass().addClass('btn-ip w-100 ' + $(this).find("#edit-class").val());

        }


    });


    // Handling the up arrow button
    $('#preview-form').on('click', '.arrow-button.up', function (e) {
        e.preventDefault();
        
        var currentElement = $(this).closest('.form-element');
        var previousElement = currentElement.prev('.form-element');

        if (previousElement.length > 0) {
            currentElement.insertBefore(previousElement);
        }
    });

    // Handling the down arrow button
    $('#preview-form').on('click', '.arrow-button.down', function (e) {
        e.preventDefault();
        
        var currentElement = $(this).closest('.form-element');
        var nextElement = currentElement.next('.form-element');

        if (nextElement.length > 0) {
            currentElement.insertAfter(nextElement);
        }
    });

    ////////////////------Confirmation Dialog------//////////////////////////////////////////

    //jquery for dialog

    // Initialize the Bootstrap modal
    $("#confirmation-dialog").modal({ show: false });

    // Handle the click event for the "remove" action to remove a single Field
    $("#preview-form").on('click', '.remove', function () {
        var elementId = $(this).attr('id');
        $("#confirmation-dialog").data('elementId', elementId);
        $("#confirmation-dialog").data('action', 'remove');
        $("#confirmation-dialog .confirmation-message").html("<b>Are you sure you want to remove this Field?</b>");
        $("#confirmation-dialog").modal('show');
        
    });

    // Handle the click event for the "clear" action to clear all the Fields
    //$("#clearBtn").on("click", function () {
    //    $("#confirmation-dialog").data('action', 'clear');
    //    $("#confirmation-dialog .confirmation-message").html("<b>Are you sure you want to clear all Fields?</b>");
    //    $("#confirmation-dialog").modal('show');
        
    //});

    $("#clearBtn").on("click", function () {
        
        var previewedForm = $(".form-html").clone();
        if ($.trim(previewedForm.html()) === "") {
            toastr.options.timeOut = 2000;
            toastr.error('No field to clear.');
        } else {
            $("#confirmation-dialog").data('action', 'clear');
            $("#confirmation-dialog .confirmation-message").html("<b>Are you sure you want to clear all Fields?</b>");
            $("#confirmation-dialog").modal('show');
        }
    });

    // Handle the "Yes" button click for Confirm Action Modal
    $("#confirm-yes").on("click", function () {
        var elementId = $("#confirmation-dialog").data('elementId');
        var action = $("#confirmation-dialog").data('action');

        if (action === 'remove') {
            $("div #" + elementId).remove();
        } else if (action === 'clear') {
            $("#preview-form").children('.drop-element').remove();
            $('.preview-info').show();
            $('#element-edit-menu').children('.edit-form-div').empty();
            $('.edit-info').show();
        }

        $("#confirmation-dialog").modal('hide');
    });

    // Handle modal close events for Confirm Action Modal
    $("#close-dialog").on('click', function () {
        $("#confirmation-dialog").modal('hide');
    });

    // Handle the "No" button click for Confirm Action Modal
    $("#confirm-no").on('click', function () {
        $("#confirmation-dialog").modal('hide');
    });




    ///////////////----preview the create form-----//////////////////////////////////////////

    $("#previewBtn").on("click", function () {

        var previewedForm = $(".form-html").clone();                  //returns an object containing html elements inside div with class = 'form-html'

        if ($.trim(previewedForm.html()) === "") {
            toastr.options.timeOut = 2000;
            toastr.error('Please drop some fields first.');
        } else {
            previewedForm.find('.el-label-inner').show();


            var previewedformHtml = '';
            previewedformHtml += '<form><div class="form-horizontal">';
            previewedformHtml += $("<div />").append(previewedForm).html();         //converting this object into html and appending it into the form
            previewedformHtml += '</div></form>';


            // Show the previewed form in the Bootstrap modal
            $("#form-preview-content").empty().append(previewedformHtml);

            //-----modifiying the form....adding bootstrap classes---------------
            $("#form-preview-content").find(".form-html").attr('class', 'form-group m-1');
            $("#form-preview-content").find(".el-label-inner").removeClass().addClass('control-label col-md-2')
            $("#form-preview-content").find(".ip-text").removeClass().addClass('form-control')
            $("#form-preview-content").find(".btn-ip").removeClass('btn-ip').addClass('m-1');
            //-------------------------------------------------------------------

            $("#previewModal").modal('show');


        }

    });

    //remove the validation error message when user types in the form-name input field
    $("#form-name").on('input', function () {
        $("#form-name-validation").empty();
    })

    //save form
    $("#saveFormBtn").on("click", function () {
       
        if ($("#form-name").val() === '') {
            $("#form-name-validation").text("Required");
        }
        else {
            var fdata = new Object();
            fdata.name = $("#form-name").val();
            fdata.html = $("#form-preview-content").html();


            $.ajax({
                url: "SaveForm",
                method: "POST",
                data: JSON.stringify(fdata),
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                success: function (response) {

                    toastr.options.timeOut = 2000;
                    toastr.success("Form saved successfully!");
                    $("#preview-form").empty();
                    $("#form-preview-content").empty();
                    $("#previewModal").modal('hide');


                },
                error: function (error) {

                    alert("Failed to save the form.");
                }
            });
        }

        
    });

    //cancel btn
    $("#cancelFormbtn").on('click', function () {
        
        $("#form-preview-content").empty();
        $("#form-name-validation").empty();
        $("#previewModal").modal('hide');


    });

    //empty the preview form content on clicking anywhere on screen(outside of preview form area)
    $("#previewModal").on('hidden.bs.modal', function () {
        
        // Clear the content of the #form-preview-content div
        $("#form-preview-content").empty();
        // Clear the content of the form-name-validation 'p' element
        $("#form-name-validation").empty();
    });

    //close modal
    $("#close-preview-form").on('click', function () {
        $("#form-preview-content").empty();
        $("#form-name-validation").empty();
        
        $("#previewModal").modal('hide');
    });
    //hover effect on the div class with .extra-options-onhover' (i.e remove, arrowup and arrowdown)
    $("#preview-form").on("mouseenter", ".drop-element", function () {
        $(this).find('.extra-options-onhover').show();

    });
    $("#preview-form").on("mouseleave", ".drop-element", function () {
        $(this).find('.extra-options-onhover').hide();

    });

    //$('#preview-form').find('input[type=submit]').on('click', function (event) {
    //    event.preventDefault();
    //});

});

///////////////////////////////////---Functions--////////////////////////////////////////////////
function onDrop(id, element) {

    
    var previewElement = '<div class="form-element drop-element bg-light container" id="' + id + '">';
    previewElement += '<div class="row d-flex">';
    previewElement += '<div class="col">';
    if (element != 'button') {

        previewElement += '<label for = "' + id + '" class="el-label-outer">' + element + '</label>';
    }
    previewElement += '</div>';
    previewElement += '<div class="col-4 extra-options-onhover" style="display:none;">';
    previewElement += '<a href="#" class="btn btn-outline-danger btn-sm my-1 remove" id=' + id + '><i class="fa-solid fa-xmark"></i></a>';
    previewElement += '<a href="#" class="arrow-button up btn btn-sm m-1 btn-outline-info" id="arrow_button_up"><i class="fa-solid fa-arrow-up"></i></a>';
    previewElement += '<a href="#" class="arrow-button down btn btn-sm my-1 btn-outline-info" id="arrow_button_down"><i class="fa-solid fa-arrow-down"></i></a></div></div>';

    previewElement += '<div class="form-html">';

    previewElement += getPreviewElement(id, element); //get the preview element

    previewElement += '</div>';

    previewElement += '</div>';



    $("#preview-form").append(previewElement);

    var editElement = '';
    editElement += getEditForm(id, element);

    $('#element-edit-menu').append(editElement);
   
}


//returns the preview element on drop
function getPreviewElement(id, element) {
    var e = '';
    if (element === 'text') {
        e += `<label for = ` + id + ` class="el-label-inner" style="display: none;">` + element + `</label>`;
        e += `<input type = "text" id =` + id + ` class="ip-text w-100">`;
    }
    else if (element === 'checkbox') {
        var opId = 0;
        e += `<label for = ` + id + ` class="el-label-inner" style="display: none;">` + element + `</label>`;
        e += `<div id = ` + id + ` class ="checkbox-group">`;
        e += '<input type = "checkbox" name ="' + id + '" id = "' + opId + '" value="choice1" class="m-1 checkbox-value-' + opId + '">';
        e += '<label for="' + opId + '" class="m-1 checkbox-label">choice 1</label>';
        e += '</div>';
    }
    else if (element === 'radio') {
        var opId = 0;
        e += `<label for = ` + id + ` class="el-label-inner" style="display: none;">` + element + `</label>`;
        e += `<div id = ` + id + ` class ="radio-group">`;
        e += '<input type="radio" id=' + opId + ' name="' + id + '"  value="Choice1" class="m-1 radio-value-' + opId + '"><label for=' + opId + ' class="radio-label">choice1</label> ';
        e += '<input type="radio" id=' + ++opId + ' name="' + id + '" value="Choice2" class="m-1 radio-value-' + opId + '"><label for=' + opId + ' class="m-1 radio-label" >choice2</label>';
        e += '<input type="radio" id=' + ++opId + ' name="' + id + '" value="Choice3" class="m-1 radio-value-' + opId + '"><label for=' + opId + ' class="m-1 radio-label">choice3</label>';
        e += '</div>';
    }
    else if (element === 'button') {
        e += '<input type="button" id=' + id + ' value ="button1" class="btn btn-primary btn-ip w-100" name="' + id + ' ">'
    }
    return e;
}


//returns the edit form for the preview element
function getEditForm(id, element) {
    var edit = '';
    if (element === 'text') {
        edit += `
            <div id="`+ id + `" class="edit-form-div"  style="display: none;">
               
                <form id="`+ id + `" class="edit-form">
                    <div class="form-horizontal">
                        <div class="form-group">
                            <label for="edit-label" class="control-label col-md-2 text-secondary">Label</label>
                            <div class="col-md-10">
                                <input type="text" id="edit-label" name="edit-label" class="form-control form-control-sm", autocomplete = "off">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="edit-placeholder" class="control-label col-md-2 text-secondary">Placeholder</label>
                            <div class="col-md-10">
                                <input type="text" id="edit-placeholder" name="edit-placeholder" class="form-control form-control-sm", autocomplete = "off">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="edit-value" class="control-label col-md-2 text-secondary">Value</label>
                            <div class="col-md-10">
                                <input type="text" id="edit-value" name="edit-value" class="form-control form-control-sm", autocomplete = "off">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="edit-type" class="control-label col-md-2 text-secondary">Type</label>
                            <div class="col-md-10">
                                <select id="edit-type" name="edit-type" class="form-select-sm w-100">
                                    <option value="text">Text</option>
                                    <option value="password">Password</option>
                                    <option value="email">Email</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="edit-text-color" class="control-label col-md-2 text-secondary w-100">Text Color</label>
                            <div class="col-md-10">
                                <input type="color" id="edit-text-color" name="edit-text-color" class="w-50", autocomplete = "off" >
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="edit-maxlen" class="control-label col-md-2 text-secondary">MaxLength</label>
                            <div class="col-md-10">
                                <input type="number" id="edit-maxlen" name="edit-maxlen" class="form-control form-control-sm", autocomplete = "off">
                            </div>
                        </div>

                    </div>
                </form>
            </div>

            `;

    }
    else if (element === 'checkbox') {
        var editOpId = 0;
        edit += `
            <div id="`+ id + `" class="edit-form-div"  style="display: none;" >
             
                <form id="`+ id + `" class="edit-form">
                    <div class="form-horizontal">
                        <div class="form-group">
                            <label for="edit-label" class="control-label col-md-2 text-secondary">Label</label>
                            <div class="col-md-10">
                                <input type="text" id="edit-label" name="edit-label" class="form-control form-control-sm", autocomplete = "off">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="text-secondary">Options</label>
                            <div class="col-md-10 w-100">
                                <div class="checkbox-options-div">
                                    <ol class="options-ol text-secondary">
                                        <li id=`+ editOpId + `>
                                            <input type="text" value="Option 1" class="option-label", autocomplete = "off">
                                           
                                        </li>
                                        
                                    </ol>
                                </div>
                                <div class="add-option">
                                    <a class="add-op" style = "cursor:pointer;" >Add Option +</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            `;
    } else if (element === 'radio') {
        var editOpId = 0;
        edit += `
            <div id="`+ id + `" class="edit-form-div"  style="display: none;">
            
                <form id="`+ id + `" class="edit-form">
                    <div class="form-horizontal">
                        <div class="form-group">
                            <label for="edit-label" class="control-label col-md-2 text-secondary">Label</label>
                            <div class="col-md-10">
                                <input type="text" id="edit-label" name="edit-label" class="form-control form-control-sm", autocomplete = "off">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="text-secondary">Options</label>
                            <div class="col-md-10 w-100">
                                <div class="radio-options-div">
                                    <ol class="options-ol text-secondary">
                                        <li id=`+ editOpId + `>
                                            <input type="text" value="Option 1" class="option-label", autocomplete = "off">
                                            
                                            
                                        </li>
                                        <li id=`+ ++editOpId + `>
                                            <input type="text" value="Option 2" class="option-label", autocomplete = "off">
                                           
                                            
                                        </li>
                                        <li id=`+ ++editOpId + `>
                                            
                                            <input type="text" value="Option 3" class="option-label", autocomplete = "off">
                                            
                                            <a href="#" class="remove-option btn btn-outline-danger border-0 btn-sm" id=`+ editOpId + `><i class="fa-solid fa-xmark"></i></a>
                                        </li>
                                    </ol>
                                </div>
                                <div class="add-option">
                                    <a class="add-op" style = "cursor:pointer;">Add Option +</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            `;
    } else if (element === 'button') {
        edit += `
            <div id="`+ id + `" class="edit-form-div"  style="display: none;">
           
                <form id="`+ id + `" class="edit-form">
                    <div class="form-horizontal">
                        <div class="form-group">
                            <label for="edit-value" class="control-label col-md-2 text-secondary">Value</label>
                            <div class="col-md-10">
                                <input type="text" id="edit-value" name="edit-value" class="form-control form-control-sm", autocomplete = "off">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="edit-type" class="control-label col-md-2 text-secondary">Type</label>
                            <div class="col-md-10">
                                <select id="edit-type" name="edit-type" class="form-select-sm w-100">
                                    <option value="button">Button</option>
                                    <option value="submit">Submit</option>
                                    
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="edit-name" class="control-label col-md-2 text-secondary">Name</label>
                            <div class="col-md-10">
                                <input type="text" id="edit-name" name="edit-name" class="form-control form-control-sm", autocomplete = "off">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="edit-class" class="control-label col-md-2 text-secondary">Class</label>
                            <div class="col-md-10">
                                <select id="edit-class" name="edit-class" class="form-select-sm w-100">
                                    <option value="btn btn-primary" class = "">Button - Primary</option>
                                    <option value="btn btn-danger">Button - Danger</option>
                                    <option value="btn btn-success">Button - Success</option>
                                    <option value="btn btn-secondary">Button - Secondary</option>
                                    <option value="btn btn-info">Button - Info</option>
                                    <option value="btn btn-warning">Button - Warning</option>
                                    <option value="btn btn-link">Button - Link</option>
                                    <option value="btn btn-dark">Button - Dark</option>
                                    <option value="btn btn-light">Button - Light</option>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            `;
    }

    return edit;
}