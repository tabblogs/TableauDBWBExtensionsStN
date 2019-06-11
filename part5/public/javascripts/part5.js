// load routine from mssql_writeback_tableau-master
let dataSourceFetchPromises = [];
let dashboardDataSources = [];

(function() {
    //load tableau extension
    tableau.extensions.initializeDialogAsync().then(()=> {
    loadSelectedMarks("Sale Map");
  });
     
  // This variable will save off the function we can call to unregister listening to marks-selected events
  let unregisterEventHandlerFunction;
  function loadSelectedMarks (worksheetName) {
    // Remove any existing event listeners
    if (unregisterEventHandlerFunction) {
      unregisterEventHandlerFunction();
    }
    
    // Get the worksheet object we want to get the selected marks for
    const worksheet = getSelectedSheet(worksheetName);

    // Set our title to an appropriate value
    $('#selected_marks_title').text(worksheet.name);

    // Call to get the selected marks for our sheet
    worksheet.getSelectedMarksAsync().then( (marks) => {
      // Get the first DataTable for our selected marks (usually there is just one)
      const worksheetData = marks.data[0];

      // Map our data into the format which the data table component expects it
      const data = worksheetData.data.map((row, index)=> {
        const rowData = row.map((cell) => {
          return cell.formattedValue;
        });

        return rowData;
      });

      const columns = worksheetData.columns.map( (column)=> {
        return { title: column.fieldName };
      });

      // Populate the data table with the rows and columns we just pulled out
      populateDataTable(data, columns);
    });

      // Add an event listener for the selection changed event on this sheet.
    unregisterEventHandlerFunction = worksheet.addEventListener(tableau.TableauEventType.MarkSelectionChanged, (selectionEvent) => {
      // When the selection changes, reload the data
      loadSelectedMarks(worksheetName);
    });
  }

  function populateDataTable (data, columns) {
    // Do some UI setup here to change the visible section and reinitialize the table
    $('#data_table_wrapper').empty();

    if (data.length > 0) {
      $('#no_data_message').css('display', 'none');
      $('#data_table_wrapper').append(`<table id='data_table' class='table table-striped table-bordered'></table>`);

      // Do some math to compute the height we want the data table to be
      var top = $('#data_table_wrapper')[0].getBoundingClientRect().top;
      var height = $(document).height() - top - 130;

      // Initialize our data table with what we just gathered
      $('#data_table').DataTable({
        data: data,
        columns: columns,
        autoWidth: true,
        deferRender: true,
        scroller: true,
        scrollY: height,
        scrollX: true,
        dom: "<'row'<'col-sm-6'i><'col-sm-6'f>><'row'<'col-sm-12'tr>>", // Do some custom styling
        rowReorder: true
      });
    } else {
      // If we didn't get any rows back, there must be no marks selected
      $('#no_data_message').css('display', 'inline');
    }
  }

  function getSelectedSheet (worksheetName) {
    // Go through all the worksheets in the dashboard and find the one we want
    return tableau.extensions.dashboardContent.dashboard.worksheets.find((sheet)=> {
      return sheet.name === worksheetName;
    });
  }


})();
function postRank(){
  var stateNames = $('#data_table').DataTable().columns(0).data().toArray()[0];
  
  stateNames.forEach(state => {
    console.log(state)
  });
}  

