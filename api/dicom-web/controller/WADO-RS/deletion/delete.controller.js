const { Controller } = require("@root/api/controller.class");
const { DeleteService } = require("@api/dicom-web/controller/WADO-RS/deletion/service/delete");
const { ApiErrorArrayHandler } = require("@error/api-errors.handler");

class BaseDeleteController extends Controller {
    constructor(req, res) {
        super(req, res);
    }

    async mainProcess() {
        let deleteService = new DeleteService(this.request, this.response, this.request.dicomLevel);

        try {
            await deleteService.delete();

            return this.response.status(200).json({
                Details: this.getDeleteSuccessfulMessage(),
                HttpStatus: 200,
                Message: "Delete Successful",
                Method: "DELETE"
            });
        } catch(e) {
            let apiErrorArrayHandler = new ApiErrorArrayHandler(this.response, this.request.logger, e);
            return apiErrorArrayHandler.doErrorResponse();
        }
    }

    getDeleteSuccessfulMessage() {
        return  `Delete ${this.request.dicomLevel} permanently, ${JSON.stringify(this.request.params)}`;
    }

}

module.exports.BaseDeleteController = BaseDeleteController;