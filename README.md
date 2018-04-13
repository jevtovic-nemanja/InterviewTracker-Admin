# InterviewTracker-Admin

Second task for Belgrade Institute of Technology javaScript bootcamp certification.

A responsive administrative panel web application, which can be used by anyone, and which is responsible for creating/modifying/deleting Interview Reports.

The app consists of a Report List Page (the landing page) and a Submit Report Page.

The Report List Page uses a list layout with basic report info shown. It also enables deleting entries and viewing reports in more detail (using a modal dialog), as well as filtering reports through keyword search.

The Submit Report Page features a three-step "wizard": firstly, a candidate is selected from a list, then the same is done with a company. Each list can be filtered by name. Finally, report details are filled and the report submitted.

The project is written in React, using Redux for state management. Async actions were handled by redux-saga.

Technologies used: HTML, CSS, Bootstrap, ES6, React, Redux, Webpack, Babel.