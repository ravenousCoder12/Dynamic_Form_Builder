/* BEGIN EXTERNAL SOURCE */

/* END EXTERNAL SOURCE */
/* BEGIN EXTERNAL SOURCE */

    $(document).ready(function () {

        $('#profileTable').DataTable();


        // Define a variable to store the form data
        var formData = {};

        $('.view').on('click', function (event) {
            event.preventDefault();

            var ID = $(this).attr('id');

            $.ajax({
                type: "GET",
                url: "GetHtml?id=" + ID,
                success: function (response) {
                    // Set the form data
                    formData.TemplateName = response.TemplateName;
                    formData.SavedTemplateCode = response.SavedTemplateCode;

                    // Open the bootstrap modal
                    $('#user_template_preview_modal').modal('show');
                },
                error: function (error) {
                    alert("Could not fetch html");
                }
            });
        });

        // Handle the modal shown event
        $('#user_template_preview_modal').on('shown.bs.modal', function () {

            // Populate the form name as HTML
            $('#previewModalLabel').text(formData.TemplateName);

            // Populate the form content as HTML 
            $('#template_preview_content').html(formData.SavedTemplateCode);
        });

        $('.copy').on('click', function (event) {
            event.preventDefault();

            var ID = $(this).attr('id');
            console.log(ID);
            var copyObject = this;

            $.ajax({

                type: "GET",
                url: "GetHtml?id=" + ID,
                success: function (response) {
                    var html = response.SavedTemplateCode;
                    //copy to clipboard code

                    var tempTextarea = $('<textarea>');
                    $('body').append(tempTextarea);
                    tempTextarea.val(html).select();
                    document.execCommand('copy');
                    tempTextarea.remove();

                    $(copyObject).text("Copied!");
                    $(copyObject).removeClass('btn-outline-success').addClass('btn-success');

                    setTimeout(function () {
                        $(copyObject).text("Copy Html");
                        $(copyObject).removeClass('btn-success').addClass('btn-outline-success');
                    }, 4000);

                },
                error: function (error) {
                    alert("Could not fetch html");
                }
            });

        });
        $('.delete').on('click', function (event) {
            event.preventDefault();
            //ajax code to delete the form
        });



        $("#close-Userprofile-template").on('click', function () {
            $("#template_preview_content").empty();
            $("#user_template_preview_modal").modal('hide');
        });


        $("#user_template_preview_modal").on('hidden.bs.modal', function () {
            // Clear the content of the #form-preview-content div
            $("#template_preview_content").empty();
        });




        $('.delete').on('click', function (event) {
            event.preventDefault();
            var ID = $(this).attr('id');
            $("#confirmation-dialog-template").data('templateId', ID);
            $("#confirmation-dialog-template").modal('show');
        });

        // Handle the "Yes" button click for Confirm Action Modal
        $("#confirm-yes-template").on("click", function (event) {
            event.preventDefault();
            var tempId = $("#confirmation-dialog-template").data('templateId');
            
            // Call the controller action to delete the template
            $.ajax({
                url: "DeleteTemplate?id=" + tempId,
                type: 'post',
                success: function (data) {
                    if (data === "success") {

                        // Finding the closest <tr> element and removing it
                       
                        $("#template-row-" + tempId).remove();
                    }
                    $("#confirmation-dialog-template").modal('hide');
                    toastr.options.timeOut = 2000;
                    toastr.success("Template Deleted Successfully");
                },
                error: function (error) {
                    toastr.options.timeOut = 2000;
                    toastr.error("could not delete");
                }
            });
        });

        // Handle modal close events for Confirm Action Modal
        $("#close-dialog-template").on('click', function () {
            $("#confirmation-dialog-template").modal('hide');
        });

        // Handle the "No" button click for Confirm Action Modal
        $("#confirm-no-template").on('click', function () {
            $("#confirmation-dialog-template").modal('hide');
        });

    });




/* END EXTERNAL SOURCE */
