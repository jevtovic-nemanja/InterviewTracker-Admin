import React from "react";

class DeleteReport extends React.Component {
    render() {
        const { deleteReport, message, close } = this.props;

        return (
            <div className="row mt-4 pt-1">

                {
                    message
                        ? <div className="col-12">
                            <p className="mb-4">{message}</p>
                            <div className="float-right">
                                <button
                                    type="button"
                                    onClick={close}
                                    className="btn btn-close"
                                >Close</button>
                            </div>
                        </div>

                        : <div className="col-12">
                            <p className="mb-4">Are you sure you wish to delete this report?</p>
                            <div className="float-right">
                                <button
                                    type="button"
                                    onClick={deleteReport}
                                    className="btn btn-delete mr-2"
                                >Yes</button>
                                <button
                                    type="button"
                                    onClick={close}
                                    className="btn btn-close"
                                >No</button>
                            </div>
                        </div>
                }
            </div>
        );
    }
}

export default DeleteReport;