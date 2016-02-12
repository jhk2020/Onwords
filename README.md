# Onwords
Onwords is a chrome extension that allows its users to annotate any webpage and share the annotated links with their followers.
Check out our [screencast](https://www.youtube.com/watch?v=Cqi7O-Kvw0I)!


## Team

- __Jihoon Kim__: Product Owner
- __Irving Barajas__: Scrum Master
- __Tommy Ngai, Raphael Simpelo, Justin Hong__: Development Team

## Tech Stack

### Back-End
- [Node.js](https://nodejs.org/)
- [Express](http://expressjs.com/)
- [Postgres](http://www.postgresql.org/)
- [Bookshelf.js](http://bookshelfjs.org/)

### Front-End
- [React](https://facebook.github.io/react/)
- [Annotator.js](http://annotatorjs.org/)
- [Redux](https://github.com/rackt/redux)
- [Redux-Thunk](https://github.com/gaearon/redux-thunk)

### Utilities
- [Annotator.js](http://annotatorjs.org/)
- [Gulp](http://gulpjs.com/)
- [Bower](http://bower.io/)
- [npm](https://www.npmjs.com/)

## Usage
Onwords leverages the XPath-driven annotating functionality of the open source library __Annotator.js__. Modifications were made within the library itself to repurpose it to fit the application's needs. While the original attempt used Chrome local storage to temporarily store the relevant annotations from the database, Redux was later implemented for a more straightforward state management and overall cleaner codebase.
