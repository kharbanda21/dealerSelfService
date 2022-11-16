sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageBox"
],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, MessageBox) {
    "use strict";

    return Controller.extend("yamaha.oof.uiselfregister.controller.home", {
      onInit: function () {
        // gigya.socialize.addEventHandlers({
        //   onLogin: function () {
        //     gigya.fidm.saml.continueSSO();
        //   }
        // });

        // gigya.accounts.showScreenSet({
        //   screenSet: 'Default-RegistrationLogin',
        //   containerID: "container",
        //   sessionExpiration: '20000'
        // });
      },

      onPressSignIn: function () {
        var sUrl = "https://rsoi.launchpad.cfapps.eu10.hana.ondemand.com/site?siteId=50227c0a-e59c-4777-aebf-d135276119f6#Shell-home";
        sap.ui.require(["sap/m/library"], ({ URLHelper }) => URLHelper.redirect(sUrl, false));
      },

      startWorkflowInstance: function () {
        // create busy dialog
        // var orderBusyDialog = new sap.m.BusyDialog();
        // orderBusyDialog.open();
        // var model = this.getView().getModel();
        var definitionId = "user_registration";
        // var initialContext = model.getProperty("/initialContext");
        var oContext = {
          "FirstName": this.getView().byId("idFirstName").getValue(),
          "emailID": this.getView().byId("idEmail").getValue(),
          "LastName": this.getView().byId("idLastName").getValue()
        };

        var workflowStartPayload = {
          definitionId: definitionId,
          context: oContext,
        };

        // var wfsecret = {
        //   grant_type: "client_credentials",
        //   client_id: "sb-clone-808f01ea-fb72-4c85-91b2-9f3d6b17513d!b126691|workflow!b10150",
        //   client_secret: "b03cd053-afea-4426-bebc-dda7aeb13fcc$Uk5D23HNEU5mVqMuTrdaks4nPcmw649pzNrH4QZpfFM=",
        //   response_type: "token"
        // };

        // // Start workflow 
        // $.ajax({
        //   url: "https://rsoi.authentication.eu10.hana.ondemand.com/oauth/token",
        //   method: "GET",
        //   headers: {
        //     "content-type": "application/x-www-form-urlencoded;charset=utf-8"
        //   },
        //   data: JSON.stringify(wfsecret),
        //   success: function (result, xhr, data) {
        //     var token = data.getResponseHeader("X-CSRF-Token");
        //     if (token === null) return;

        //     // Start workflow 
        //     $.ajax({
        //       url: "https://api.workflow-sap.cfapps.eu10.hana.ondemand.com/workflow-service/rest/v1/workflow-instances",
        //       type: "POST",
        //       data: JSON.stringify(workflowStartPayload),
        //       headers: {
        //         "X-CSRF-Token": token,
        //         "Content-Type": "application/json"
        //       },
        //       async: false,
        //       success: function (data) {
        //         // orderBusyDialog.close();
        //         MessageBox.information("The workflow is started");
        //       },
        //       error: function (data) {
        //         // orderBusyDialog.close();
        //         MessageBox.error("Workflow not started");
        //       }
        //     });
        //   },
        //   error: function (result, xhr, data) {
        //     debugger;

        //   }
        // });

        // Start workflow 
        $.ajax({
          url: "/yamahaoofuiselfregister/bpmworkflowruntime/v1/xsrf-token",
          method: "GET",
          headers: {
            "X-CSRF-Token": "Fetch"
          },
          success: function (result, xhr, data) {
            var token = data.getResponseHeader("X-CSRF-Token");
            if (token === null) return;

            // Start workflow 
            $.ajax({
              url: "/yamahaoofuiselfregister/bpmworkflowruntime/v1/workflow-instances",
              type: "POST",
              data: JSON.stringify(workflowStartPayload),
              headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
              },
              async: false,
              success: function (data) {
                // orderBusyDialog.close();
                MessageBox.information("The workflow is started");
              },
              error: function (data) {
                // orderBusyDialog.close();
                MessageBox.error("Workflow not started");
              }
            });
          },
          error: function (result, xhr, data) {
            debugger;
            // orderBusyDialog.close();
            MessageBox.error("Token not fetched");
          }
        });

        // $.ajax({
        //   url: this._getWorkflowRuntimeBaseURL() + "/workflow-instances",
        //   method: "POST",
        //   async: false,
        //   contentType: "application/json",
        //   headers: {
        //     "X-CSRF-Token": this._fetchToken(),
        //   },
        //   data: JSON.stringify(data),
        //   success: function (result, xhr, data) {
        //     debugger;
        //     model.setProperty(
        //       "/apiResponse",
        //       JSON.stringify(result, null, 4)
        //     );
        //   },
        //   error: function (request, status, error) {
        //     debugger;
        //     var response = JSON.parse(request.responseText);
        //     model.setProperty(
        //       "/apiResponse",
        //       JSON.stringify(response, null, 4)
        //     );
        //   },
        // });
      },

      _fetchToken: function () {
        var fetchedToken;

        jQuery.ajax({
          url: this._getWorkflowRuntimeBaseURL() + "/xsrf-token",
          method: "GET",
          async: false,
          headers: {
            "X-CSRF-Token": "Fetch",
          },
          success(result, xhr, data) {
            fetchedToken = data.getResponseHeader("X-CSRF-Token");
          },
        });
        return fetchedToken;
      },

      _getWorkflowRuntimeBaseURL: function () {
        var appId = this.getOwnerComponent().getManifestEntry("/sap.app/id");
        var appPath = appId.replaceAll(".", "/");
        var appModulePath = jQuery.sap.getModulePath(appPath);

        return appModulePath + "/bpmworkflowruntime/v1";
      }
    });
  });
