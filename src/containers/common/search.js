import React from "react";

import { connect } from "react-redux";

import { Input } from "../../components/common/input";

import { receiveInputChange } from "../../store/actions/index";

const handleInputChange = event => {
    const inputString = event.target.value;
    const searchString = inputString.toLowerCase();
    return searchString;
};

const mapStateToProps = state => ({
    searchItem: state.searchItem
});

const mapDispatchToProps = dispatch => ({
    receiveInputChange: event => dispatch(receiveInputChange(handleInputChange(event)))
});

export default connect(mapStateToProps, mapDispatchToProps)(Input);