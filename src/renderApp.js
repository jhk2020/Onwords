import App from './components/app';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configStore from './store/configStore';

export const store = configStore();

export const renderApp = function() {
  var font1 = "<link href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:300' rel='stylesheet' type='text/css'>";
  var font2 = "<link href='https://fonts.googleapis.com/css?family=Lato:300' rel='stylesheet' type='text/css'>";
  var font3 = "<link href='https://fonts.googleapis.com/css?family=Libre+Baskerville' rel='stylesheet' type='text/css'>";
  var font4 = "<link href='https://fonts.googleapis.com/css?family=Noto+Sans' rel='stylesheet' type='text/css'>";
  $('head').after(font1);
  $('head').after(font2);
  $('head').after(font3);
  $('head').after(font4);

  $('body').append("<div id='annotation-sidebar'></div>");
  $('#annotation-sidebar').append("<div id='annotation-header'></div>")
  $('#annotation-sidebar').append("<div id='annotation-scroll'></div>")

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('annotation-scroll'));
};
