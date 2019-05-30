tableau.extensions.initializeAsync().then(() => {
    const dashboard = tableau.extensions.dashboardContent.dashboard;
    
    //Use jQuery to select the html element #dashboardName and assign it the name of the Tableau dashboard.
    $('#dashboardName').text('Dashboard name: '+dashboard.name);
  });