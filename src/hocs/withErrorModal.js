import React from "react";

import Modal from "react-responsive-modal";
import { MessageModal } from "Components/common/messageModal/messageModal";

export const withErrorModal = WrappedComponent => {
    return class extends React.Component {

        closeMessageModal = () => {
            const { open, closeMessageModal } = this.props;

            if (open) {
                closeMessageModal();
            }
        }

        render() {
            return (
                <>
                    <Modal open={this.props.open} onClose={this.closeMessageModal} little>
                        <MessageModal message={this.props.message} close={this.closeMessageModal} />
                    </Modal>
                    <WrappedComponent {...this.props} />
                </>
            );
        }
    };
};