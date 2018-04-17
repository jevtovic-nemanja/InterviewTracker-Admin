import React from "react";

export const asyncComponent = importComponent => {
    return class extends React.Component {
        state = {
            component: null
        }

        componentDidMount() {
            importComponent()
                .then(importedComponent => {
                    this.setState({ component: importedComponent.default });
                });
        }

        render() {
            const Component = this.state.component;

            return Component
                ? <Component {...this.props} />
                : null;
        }
    };
};