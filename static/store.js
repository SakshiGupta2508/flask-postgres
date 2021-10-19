var data = []
var preEditData = []
var columnDefs = []


// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById("myForm").addEventListener("submit", addRows);
  get_data()
});


//Column Definitions for AG GRID gridoptions
var columnDefs = [

  {
    headerName: "ID",
    field: "id",
    hide: true
  },
  {
    headerName: "City",
    field: "city",
  },
  {
    headerName: "Start Date",
    field: "start_date",
    cellEditor: 'datePicker'
  },
  {
    headerName: "End Date",
    field: "end_date",
    cellEditor: 'datePicker'
  },
  {
    headerName: "Price",
    field: "price",
  },
  {
    headerName: "Status",
    field: "status",
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: ['Once', 'Daily', 'Weekly', 'Yearly', 'Seldom', 'Monthly', 'Often', 'Never'],
    },
  },

  {
    headerName: "Color",
    field: "color",
  },
  {
    headerName: "Action",
    minWidth: 200,
    cellRenderer: actionCellRenderer,
    editable: false,
    colId: "action"
  }
];


//Cell Renderer Definition
function actionCellRenderer(params) {
  let eGui = document.createElement("div");

  let editingCells = params.api.getEditingCells();
  // checks if the rowIndex matches in at least one of the editing cells
  let isCurrentRowEditing = editingCells.some((cell) => {
    return cell.rowIndex === params.node.rowIndex;
  });

  if (isCurrentRowEditing) {
    eGui.innerHTML = `
        <button
          class="action-button update"
          data-action="update">
               Update
        </button>
        <button
          class="action-button cancel"
          data-action="cancel">
               Cancel
        </button>
        `;
  }
  else {
    eGui.innerHTML = `
        <button
          class="action-button edit"
          data-action="edit">
             Edit
          </button>
        <button
          class="action-button delete"
          data-action="delete">
             Delete
        </button>
        `;
  }

  return eGui;
}


// This is static row data used only for testing
var rowData = [{
    "id": 1,
    "city": "Neftegorsk",
    "start_date": "4/13/2013",
    "end_date": "5/18/2013",
    "price": "55.82",
    "status": "Seldom",
    "color": "#fd4e19"
  },
  {
    "id": 2,
    "city": "Lancai",
    "start_date": "5/19/2012",
    "end_date": "11/29/2014",
    "price": "22.49",
    "status": "Yearly",
    "color": "#ff5055"
  },

];

// let the grid know which columns and what data to use
var gridOptions = {
  columnDefs: columnDefs,
  rowData: data,
  defaultColDef: {
    flex: 1,
    minWidth: 110,
    editable: true,
    resizable: true,
    sortable: true,
    filter: true
  },
  sideBar: {
    toolPanels: [{
        id: 'columns',
        labelDefault: 'Columns',
        labelKey: 'columns',
        iconKey: 'columns',
        toolPanel: 'agColumnsToolPanel',
        toolPanelParams: {
          suppressRowGroups: true,
          suppressValues: true,
          suppressPivots: true,
          suppressPivotMode: true,
          suppressColumnFilter: true,
          suppressColumnSelectAll: true,
          suppressColumnExpandAll: true,
        },
      },
      'filters'
    ],

  },
  components: {
    datePicker: getDatePicker(),
  },
  editType: "fullRow",
  onRowEditingStarted: (params) => {
    preEditData = JSON.parse(JSON.stringify(params.node.data));
    console.log(preEditData);
    params.api.refreshCells({
      columns: ["action"],
      rowNodes: [params.node],
      force: true
    });
  },
  onRowEditingStopped: (params) => {
    params.api.refreshCells({
      columns: ["action"],
      rowNodes: [params.node],
      force: true
    });
  },

  suppressClickEdit: true,
  onCellClicked(params) {
    // Handle click event for action cells
    if (params.column.colId === "action" && params.event.target.dataset.action) {
      let action = params.event.target.dataset.action;

      if (action === "edit") {
        params.api.startEditingCell({
          rowIndex: params.node.rowIndex,
          // gets the first columnKey
          colKey: params.columnApi.getDisplayedCenterColumns()[0].colId
        });
      }

      if (action === "delete") {
        deleteRows(params.node.data['id'])
      }

      if (action === "update") {
        params.api.stopEditing(false);
        commitEditData(preEditData, JSON.parse(JSON.stringify(params.node.data)));
        console.log(params.node.data)
      }

      if (action === "cancel") {
        params.api.stopEditing(true);
      }
    }
  },
};


//For date picker ag grid
function getDatePicker() {
  // function to act as a class
  function Datepicker() {}

  // gets called once before the renderer is used
  Datepicker.prototype.init = function (params) {
    // create the cell
    this.eInput = document.createElement('input');
    this.eInput.value = params.value;
    this.eInput.classList.add('ag-input');
    this.eInput.style.height = '100%';

    // https://jqueryui.com/datepicker/
    $(this.eInput).datepicker({
      dateFormat: 'dd/mm/yy',
    });
  };

  // gets called once when grid ready to insert the element
  Datepicker.prototype.getGui = function () {
    return this.eInput;
  };

  // focus and select can be done after the gui is attached
  Datepicker.prototype.afterGuiAttached = function () {
    this.eInput.focus();
    this.eInput.select();
  };

  // returns the new value after editing
  Datepicker.prototype.getValue = function () {
    return this.eInput.value;
  };

  // any cleanup we need to be done here
  Datepicker.prototype.destroy = function () {
    // but this example is simple, no cleanup, we could
    // even leave this method out as it's optional
  };

  // if true, then this editor will appear in a popup
  Datepicker.prototype.isPopup = function () {
    // and we could leave this method out also, false is the default
    return false;
  };

  return Datepicker;
}


//For getting data from backend [READ OPERATION]
function get_data() {
  $.ajax({
    type: 'GET',
    url: 'getdata',
    async: false,
    success: function (data) {
      document.getElementById("myGrid").innerHTML = "";
      var gridDiv = document.querySelector('#myGrid');
      gridOptions.rowData = data;
      new agGrid.Grid(gridDiv, gridOptions);
    },
    error: function (xhr, ajaxOptions) {
      alert("Could not obtain data from backend.");
      console.log("Ajax status: " + xhr.status);
      console.log(ajaxOptions)
    }
  });
}


//For committing updated data [UPDATE OPERATION]
function commitEditData(preEditData, postEditData) {
 var object_info = {
    'preEditData': preEditData,
    'postEditData': postEditData,
  }
  $.ajax({
    type: 'PUT',
    url: 'updatedata',
    contentType: "application/json",
    data: JSON.stringify(object_info),
    success: function (data) {
        alert("Data with ID: " + preEditData['id']+" updated successfully.");
    },
    error: function (xhr, ajaxOptions) {
      alert("Could not update data from backend.");
      console.log("Ajax status: " + xhr.status);
      console.log(ajaxOptions)
    }
  });
}


//For Deleting data [DELETE OPERATION]
function deleteRows(id) {
  if (confirm("Are you sure?")) {
    $.ajax({
      type: 'DELETE',
      url: 'deletedata',
      async: false,
      contentType: "application/json",
      data: JSON.stringify(id),
      success: function (data) {
        alert("Data with ID: " + id +" deleted successfully.");
      },
      error: function (xhr, ajaxOptions) {
        alert("Could not delete row from backend.");
        console.log("Ajax status: " + xhr.status);
        console.log(ajaxOptions)
      }
    });
  }
}


//For adding data [CREATE OPERATION]
function addRows() {

  var city = $('#city_input').val();
  var start_date = $('#start_input').val();
  var end_date = $('#end_input').val();
  var price = $('#price_input').val();
  var status = $('#status_input').val();
  var color = $('#color_input').val();

  var object_info = {
    'city': city,
    'start_date': start_date,
    'end_date': end_date,
    'price': price,
    'status': status,
    'color': color,
  }

  $.ajax({
    type: 'POST',
    url: 'insertdata',
    async: false,
    contentType: "application/json",
    data: JSON.stringify(object_info),
    success: function (data) {
      alert("New row added successfully.");
      $('#myModal').modal('toggle');
      get_data();
    },
    error: function (xhr, ajaxOptions) {
      alert("Could not add new row from backend.");
      console.log("Ajax status: " + xhr.status);
      console.log(ajaxOptions)
    }
  });
}


//For Filtering data using date range
function filterRows() {
  var start_date = $('#start_filter').val();
  console.log(start_date)
  var end_date = $('#end_filter').val();
  if (start_date == '' || end_date == '')
  {alert("Please enter the date range to filter data !")}
  else{
  $.ajax({
    type: 'POST',
    url: 'getfilterdata',
    async: false,
    contentType: "application/json",
    data: JSON.stringify({
      start_date: start_date,
      end_date: end_date
    }),
    success: function (data) {
    document.getElementById("myGrid").innerHTML = "";
      var gridDiv = document.querySelector('#myGrid');
      gridOptions.rowData = data;
      new agGrid.Grid(gridDiv, gridOptions);
    },
    error: function (xhr, ajaxOptions) {
      alert("Could not obtain data from backend.");
      console.log("Ajax status: " + xhr.status);
      console.log(ajaxOptions)
    }
  });
  }
}
