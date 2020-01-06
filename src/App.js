import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Route } from 'react-router'
import { BrowserRouter as Router, NavLink, Redirect } from 'react-router-dom'

import UrlCode from './url_code/UrlCode';
import Timestamp from './timestamp/Timestamp';
import QrCode from './qrcode/QrCode';
import JsonFormat from './json_format/JsonFormat';
import Password from "./password/Password";
import Unicode from "./unicode/Unicode";

const itemConfig = [
  {name:'URL 编解码',path:'/url-code',component:UrlCode},
  {name:'生成二维码',path:'/qr',component:QrCode},
  {name:'时间戳',path:'/timestamp',component:Timestamp},
  {name:'JOSN格式化',path:'/json-format',component:JsonFormat},
  {name:'密码生成器',path:'/password',component:Password},
  {name:'Unicode编码',path:'/unicode',component:Unicode},
]

class ToolHeader extends React.Component {

  onLiClicked(params) {
    console.log(params);
  }

  render() {

    const liItems = itemConfig.map((e,idx) =>
      <li className='header' key={idx.toString()} >
        <NavLink to={e.path} activeClassName="active">{e.name}</NavLink>
      </li>
    );
    
    return (
      <div className='tool-header'>
        <h1 className='tool-name'> {this.props.name}</h1>
        <ul className='none'>
          {
            liItems
          }
        </ul>
      </div>
    );
  }
}

class Footer extends React.Component {
  render(){
    return (
      <div className='footer'>
        <img src={logo} className="footer-logo footer-logo-1" alt="logo" />
        <span> MR工具箱 © {new Date().getFullYear()} debulgy.cn </span>
        <img src={logo} className="footer-logo footer-logo-2" alt="logo" />
      </div>
    )
  }
}

export class App extends Component {
  render() {

    const routeItems = itemConfig.map((e,idx) =>
          <Route key={idx.toString()} path={e.path} component={e.component} />
    );
    
    ///默认第一个
    const defaultItem = <Redirect exact from="/" to={itemConfig[0].path} />

    return (

      <Router>
         <div className='AppHead'>
            <ToolHeader name="MR 工具箱" />
         </div>
      
      <div className="AppCenter">
          <div className='Content'>
            {routeItems}
            {defaultItem}
          </div>
        <Footer />
      </div>
      
    </Router>

       );
  }
}

export default App;