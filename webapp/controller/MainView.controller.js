sap.ui.define(["sap/ui/core/mvc/Controller"], function(Controller) {
	"use strict";
	return Controller.extend("CRUDOperations.controller.MainView", {
		/**
		 *------------------------------------------------------------------------*
		 *     OnInit                                                             *
		 * -----------------------------------------------------------------------*
		 */
		onInit: function() {
			// Get the List 
			var oList = this.byId("List");
			this._oList = oList;
		},
		/**
		 *------------------------------------------------------------------------*
		 *     OnRefresh                                                          *
		 * -----------------------------------------------------------------------*
		 */
		OnRefresh: function(oEvent) {
			// Refresh List Items
			this._oList.getBinding("items").refresh();
		},
		/**
		 *------------------------------------------------------------------------*
		 *     OnAdd                                                              *
		 *   OnAdd Click we will display a PopUp with the new OrgUnit ID and the  *
		 *   User will populate the OrgUnit Description field and submit his      *
		 *   changes.                                                             *
		 * -----------------------------------------------------------------------*
		 */
		OnAdd: function(oEvent) {
			// Get the number of OrgUnits in the EntitySet OrgUnits
			var count = this.getView().byId("List").getItems().length;
			// Calculate the new OrgUnit ID 
			var NewOrgUnitID = count + 1;
			// call Dialog popup
			var dialog = new sap.m.Dialog({
				title: "Add Organization Unit",
				type: "Message",
				content: [new sap.ui.layout.HorizontalLayout({
					content: [
						new sap.ui.layout.VerticalLayout({
							width: "140px",
							content: [
								new sap.m.Label({
									text: "OrgUnit ID"
								}),
								new sap.m.Label({
									text: "OrgUnit Description:"
								})
							]
						}),
						new sap.ui.layout.VerticalLayout({
							width: "140px",
							content: [
								new sap.m.Input("OrgUnitID", {
									value: NewOrgUnitID,
									editable: false
								}),
								new sap.m.Input("OrgUnitDescription")
							]
						})
					]
				})],
				beginButton: new sap.m.Button({
					text: "Save",
					press: function() {
						// Read the Values from the PopUp
						var sOrgUnitID = sap.ui.getCore().byId("OrgUnitID").getValue();
						var sOrgUnitDescription = sap.ui.getCore().byId("OrgUnitDescription").getValue();
						// Create a new Object with the new data 
						var oObject = {};
						oObject = {
							"OrgUnitID": sOrgUnitID,
							"OrgUnitDescription": sOrgUnitDescription
						};
						// Service URL
						var sServiceUrl = "/MaterialDB/Mat/";
						// Create the Model for the service
						var oModel = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, true);
						// Add the new Object into the EntitySet
						oModel.create("/OrgUnits", oObject);
						// Refresh the Model
						oModel.setRefreshAfterChange(false);
						// Close the popup
						dialog.close();
					}
				}),
				endButton: new sap.m.Button({
					text: "Cancel",
					press: function() {
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});
			dialog.open();
		},
		/**
		 *------------------------------------------------------------------------*
		 *     OnEdit                                                             *
		 * -----------------------------------------------------------------------*
		 */
		OnEdit: function(oEvent) {

			//Get the selected item in the list 
			var oOrgUnit = this._item;
			// Get the OrgUnit ID value
			var oOrgUnitID = oOrgUnit.OrgUnitID;
			// Get the OrgUnit Description value
			var oOrgUnitDescription = oOrgUnit.OrgUnitDescription;
			// call Dialog popup
			var dialog = new sap.m.Dialog({
				title: "Add Organization Unit",
				type: "Message",
				content: [new sap.ui.layout.HorizontalLayout({
					content: [
						new sap.ui.layout.VerticalLayout({
							width: "140px",
							content: [
								new sap.m.Label({
									text: "OrgUnit ID"
								}),
								new sap.m.Label({
									text: "OrgUnit Description:"
								})
							]
						}),
						new sap.ui.layout.VerticalLayout({
							content: [
								new sap.m.Input("OrgUnitID", {
									value: oOrgUnitID,
									editable: false
								}),
								new sap.m.Input("OrgUnitDescription", {
									value: oOrgUnitDescription
								})
							]
						})
					]
				})],
				beginButton: new sap.m.Button({
					text: "Save",
					press: function() {
						// Get new values
						var sOrgUnitID = sap.ui.getCore().byId("OrgUnitID").getValue();
						var sOrgUnitDescription = sap.ui.getCore().byId("OrgUnitDescription").getValue();
						// Create Object
						var oObject = {};
						oObject = {
							"OrgUnitID": sOrgUnitID,
							"OrgUnitDescription": sOrgUnitDescription
						};
						// Create the path		
						var sPath = "/OrgUnits('" + sOrgUnitID + "')";
						// service URL
						var sServiceUrl = "/MaterialDB/Mat/";
						// Create Model
						var oModel = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, true);
						// Update the Model
						oModel.update(sPath, oObject);
						//Refresh the Model
						oModel.setRefreshAfterChange(false);
						// Close dialog box		
						dialog.close();
					}
				}),
				endButton: new sap.m.Button({
					text: "Cancel",
					press: function() {
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});
			dialog.open();
		},
		/**
		 *------------------------------------------------------------------------*
		 *     OnDelete                                                         *
		 * -----------------------------------------------------------------------*
		 */
		OnDelete: function(oEvent) {
			
           // Get the selected Item
			var oOrgUnit = this._item;
		  // Get the OrgUnit ID	
			var oOrgUnitID = oOrgUnit.OrgUnitID;
         // Populate the Path
			var sPath = "/OrgUnits('" + oOrgUnitID + "')";
         // Service URL
			var sServiceUrl = "/MaterialDB/Mat/";
		 // Create the Model	
			var oModel = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, true);
		 // Delete the Object	
			oModel.remove(sPath);
		 // Refresh	
			oModel.setRefreshAfterChange(false);
		},
		/**
		 *------------------------------------------------------------------------*
		 *     OnSelectionChange                                                  *
		 * -----------------------------------------------------------------------*
		 */
		OnSelectionChange: function(oEvent) {

			// Store the selected item in the Object this 	
			this._item = oEvent.getSource().getBindingContext().getObject();

		}
	});
});
