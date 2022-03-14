

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import socketIO from 'socket.io-client';

import Routes from './routes'

import './App.css';
import { langs } from './langs';

class App extends Component {
  constructor(props) {
    super(props);
    this.googleMapsCallback = this.googleMapsCallback.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
    this.handleSidebar = this.handleSidebar.bind(this);

    this.setModalOpen = this.setModalOpen.bind(this);
    this.setModalInfo = this.setModalInfo.bind(this);
    this.touchEnd = this.touchEnd.bind(this);
    this.touchMove = this.touchMove.bind(this);
    this.openDeletePrompt = this.openDeletePrompt.bind(this);
    this.setUserData = this.setUserData.bind(this);
    this.generateAlias = this.generateAlias.bind(this);
    this.handleLoader = this.handleLoader.bind(this);
    this.translate = this.translate.bind(this);
    this.openSubMenu = this.openSubMenu.bind(this);
    this.setLang = this.setLang.bind(this);
    this.handlePrompt = this.handlePrompt.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);

    window.googleMapsCallback = this.googleMapsCallback;

    this.state = {
      _googleMapsLoaded: false,
      uData: null,
      _menuOpen: null,
      socketIOClient: null,
      geolocation: null,
      _modalOpen: null,
      _startSwipePos: null,
      _startSwipePosY: null,
      _swipePos: null,
      _menuPos: 0,
      sidebar: true,
      deletePrompt: null,
      handleDeletePrompt: null,
      loader: null,
      subMenu: null,
      lang: 'de',
      langs: ['sr', 'en'],
      prompt: null
    };

  }

  handlePrompt(data){
    this.setState({
      prompt: data
    })
  }

  changeLanguage(lang){
    this.setState({
      lang: lang
    })
  }



  setLang(lang) {
    this.setState({
      lang: lang
    });
  }

  openSubMenu(name) {
    this.setState({
      subMenu: name
    });
  }

  generateAlias(str) {
    str = str.toLowerCase();
    str = str.replace(/\s\s+/g, ' ');
    str = str.replace(/ /g, '-');
    str = str.replace(/\./g, '-');
    str = str.replace(/\,/g, '-');
    str = str.replace(/š/g, 's');
    str = str.replace(/č/g, 'c');
    str = str.replace(/ć/g, 'c');
    str = str.replace(/đ/g, 'dj');
    str = str.replace(/ž/g, 'z');
    return str;
  }

  touchEnd() {
    var x = this.state._swipePos;
    if (this.state._menuOpen && this.state._startSwipePos && x - this.state._startSwipePos >= 30) {
      this.setState({
        _menuPos: 0
      });
    }

    if (this.state._menuOpen && this.state._startSwipePos && this.state._startSwipePos - x >= 30) {
      this.setState({
        _menuPos: 0,
        _menuOpen: null
      });
    }

    this.setState({
      _startSwipePos: null,
      _swipePos: null
    });

  }

  touchMove(event) {
    var x = event.touches[0].clientX;
    var y = event.touches[0].clientY;

    if (!this.state._startSwipePos) {
      this.setState({
        _startSwipePos: x,
        _startSwipePosY: y
      });
    }

    if (this.state._startSwipePos && Math.abs(x - this.state._startSwipePos) < Math.abs(y - this.state._startSwipePosY))
      return;

    if (this.state._startSwipePos < 50 && this.state._startSwipePos && x > this.state._startSwipePos + 20 && -300 + x - this.state._startSwipePos <= 0) {
      this.setState({
        _menuOpen: true,
        _menuPos: -300 + x - this.state._startSwipePos

      });
    }


    if (this.state._menuOpen && this.state._startSwipePos && -300 + x - this.state._startSwipePos <= 0) {

      this.setState({
        _menuPos: -300 + x - this.state._startSwipePos
      });
    }


    this.setState({
      _swipePos: x
    });

  }


  setUserData(data) {
    console.log(data);

    if (!data) {
      localStorage.removeItem('uData');
      this.setState({
        uData: null
      });
      return;
    }

    localStorage.setItem('uData', JSON.stringify(data));
    this.setState({
      uData: data
    });
  }


  openDeletePrompt(data, handleDeletePrompt) {
    console.log('handleDeletePrompt');
    this.setState({
      deletePrompt: data,
      handleDeletePrompt: handleDeletePrompt
    });
  }

  setModalOpen(data) {

    this.setState({
      _modalOpen: data,
    });
  }

  setModalInfo(data) {
    this.setState({
      _modalInfo: data
    });
  }



  handleMenuOpen(val) {
    var pos = 300;
    if (val) {
      pos = 0;
    }
    console.log(pos);
    this.setState({
      menuOpen: val,
      _menuPos: pos
    });
  }

  translate(text) {
    return text;
  }

  render() {

    return (
      <Routes
        {...this.state}
        handleMenu={this.handleMenu}
        handleSidebar={this.handleSidebar}
        setUserData={this.setUserData}
        openDeletePrompt={this.openDeletePrompt}

        setModalOpen={this.setModalOpen}
        setModalInfo={this.setModalInfo}
        touchEnd={this.touchEnd}
        touchMove={this.touchMove}
        generateAlias={this.generateAlias}
        handleLoader={this.handleLoader}
        translate={this.translate}
        openSubMenu={this.openSubMenu}
        setLang={this.setLang}
        handlePrompt={this.handlePrompt}
        changeLanguage={this.changeLanguage}

      />

    );

  }

  handleLoader(state) {
    this.setState({
      loader: state
    });
  }


  handleMenu(state) {


    this.setState({
      _menuOpen: state
    });

  }

  handleSidebar(state) {
    if (this.state.subMenu) {
      this.setState({
        subMenu: null
      });

    } else {
      this.setState({
        sidebar: state
      });
    }
  }

  componentDidMount() {

  }



  googleMapsCallback() {
    console.log("true");
    this.setState({ _googleMapsLoaded: true });
  }

}

export default App;
