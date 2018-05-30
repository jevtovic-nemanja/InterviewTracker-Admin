import React from "react";

import { bindActionCreators } from "redux";

import { connect } from "react-redux";

import { receiveInputChange } from "Store/actions";

import { Placeholders } from "Src/constants";

const mapStateToProps = state => ({
    searchItem: state.searchItem
});

const mapDispatchToProps = dispatch => bindActionCreators({
    receiveInputChange
}, dispatch);

class Search extends React.Component {
    inputRef = React.createRef();

    focus() {
        this.inputRef.current.focus();
    }

    handleInputChange = event => {
        const inputString = event.target.value;
        const searchString = inputString.toLowerCase();

        this.props.receiveInputChange(searchString);
    }

    render() {
        return (
            <div className="input-group mt-1 mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">
                        <i className="fa fa-search"></i>
                    </span>
                </div>

                <input
                    ref={this.inputRef}
                    type="text"
                    value={this.props.searchItem}
                    onChange={this.handleInputChange}
                    placeholder={Placeholders.SEARCH}
                    className="form-control"
                />

            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(Search);