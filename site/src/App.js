

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Routes from './routes'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { langs } from './langs';
import { withRouter } from 'react-router-dom';
import DocumentMeta from 'react-document-meta';
import ReactGA from 'react-ga';
import socketIO from 'socket.io-client';

const rootReducer = combineReducers({
  form: formReducer
});

const store = createStore(rootReducer)



function generateAlias(str) {
  str = str.toLowerCase();
  str = str.replace(/ä/g, 'a');
  str = str.replace(/ö/g, 'o');
  str = str.replace(/ü/g, 'u');
  str = str.replace(/ß/g, 'b');

  str = str.replace(/[^a-zA-Z0-9]/gi, '-').toLowerCase()
  str = str.replace(/-+/g, '-');

  return str;
}

if (String.prototype.generateAlias == null) {
  String.prototype.generateAlias = function () {
    return generateAlias(this);
  }
}


Object.translate = function (o, s, lang) {
  if (!o) {
    return '';
  }

  s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  s = s.replace(/^\./, '');           // strip a leading dot
  var a = s.split('.');
  for (var i = 0, n = a.length; i < n; ++i) {
    var k = a[i];
    if (k in o) {
      o = o[k];
    } else {
      return;
    }
  }
  return o[lang] ? o[lang] : o['de'];
}


Object.get = function (o, s) {
  console.log(o, s)
  if (!o) {
    return null;
  }

  s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  s = s.replace(/^\./, '');           // strip a leading dot
  var a = s.split('.');
  for (var i = 0, n = a.length; i < n; ++i) {
    var k = a[i];
    if (k in o) {
      o = o[k];
    } else {
      return;
    }
  }
  return o;
}


if (String.prototype.translate == null) {
  String.prototype.translate = function (lang) {

   /* if (!localStorage.translate){
      localStorage.translate = JSON.stringify({
        'sr': {
 
        },
        'en': {
 
        },
        'de': {
 
        }

      });
    }
 
    let obj = JSON.parse(localStorage.translate);
    obj.en[this] = this;
    obj.sr[this] = this;
    obj.de[this] = this;

    localStorage.translate = JSON.stringify(obj);
    
    return this;*/

    if (langs[lang] && langs[lang][this])
      return langs[lang][this];
    else return this;
  }
}



class App extends Component {
  constructor(props) {
    super(props);
    this.googleMapsCallback = this.googleMapsCallback.bind(this);
    this.translate = this.translate.bind(this);
    this.setLang = this.setLang.bind(this);
    this.setLightMode = this.setLightMode.bind(this);


    let lang = 'de';
    if (typeof window !== 'undefined') {

      window.googleMapsCallback = this.googleMapsCallback;

      if (props.location.pathname.indexOf('/en') !== -1) {
        lang = 'en';
      }else  if (props.location.pathname.indexOf('/sr') !== -1) {
        lang = 'sr';
      }


    } else {
      lang = this.props.lang;
    }
    this.state = {
      _googleMapsLoaded: false,
      lang: lang,
      lightMode: 0,
      services: [],
      latestNews: [],
      ...props.appInitialData

    };

  }

  setLang(lang) {
    this.setState({
      lang: lang
    });
  }
  setLightMode(val) {
    this.setState({
      lightMode: val
    });
  }





  translate(text) {
    return text;
  }
  updateMeta = (data) => {
    console.log(data)
    this.setState({
      metaTags: data
    })
  }

  render() {
    let meta;

    if (this.state.metaTags) {
      meta = {
        title: this.state.metaTags.title,
        description: this.state.metaTags.description ? this.state.metaTags.description : null,
        meta: {
          charset: 'utf-8',
          name: {
            'og:title': this.state.metaTags.title,
            'og:image': this.state.metaTags['og:image'] ? this.state.metaTags['og:image'] : null,
            'og:description': this.state.metaTags.description ? this.state.metaTags.description : null
          }
        }
      };


    }    return (
      <Provider store={store}>
        {this.state.metaTags ? <DocumentMeta {...meta} /> : null}
        <Routes
          {...this.state}
          translate={this.translate}
          setLang={this.setLang}
          setLightMode={this.setLightMode}
          serverFetch={this.props.serverFetch}
          initialData={this.props.initialData ? this.props.initialData : {}}
          updateMeta={this.updateMeta}
          allowCookies={() => {
            localStorage.allowCookies = true;
            this.setState({
              cookies: true
            });
          }}
        />
      </Provider>

    );

  }





  componentDidMount() {
    if (localStorage.allowCookies) {
      this.setState({
        cookies: true
      });
    }
  }



  googleMapsCallback() {
    console.log("true");
    this.setState({ _googleMapsLoaded: true });
  }

}

export default withRouter(App);
