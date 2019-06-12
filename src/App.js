import React, { Component } from 'react';
import './App.css';

import IconexConnect from './IconexConnect';
import {
  IconConverter
} from 'icon-sdk-js'
import SDK from './SDK.js';

import date1 from "../src/assets/images/술1.jpeg"
import date2 from "../src/assets/images/술3.png"
import date3 from "../src/assets/images/술4.jpeg"
import date4 from "../src/assets/images/술5.jpg"
import date5 from "../src/assets/images/술6.jpeg"
import date6 from "../src/assets/images/술7.jpeg"

function randomImg(hex) {
  return parseInt(hex[hex.length - 1], 16) % 6;
}

const DATEURL = [
  date1,
  date2,
  date3,
  date4,
  date5,
  date6
]

const DATESTR = [
  "소주",
  "청하",
  "일본주",
  "와인",
  "보드카",
  "맥주"
]

export default class App extends Component {
  state = {
    login: false,
    dateurl: DATEURL[0],
    myAddress: '',
    datestr: DATESTR[0]
  }

  click = async (e) => {
    const myAddress = await IconexConnect.getAddress()
    this.setState({
      login: true,
      myAddress: myAddress
    })
  }

  getDatePlace = async () => {
    const { sendTxBuild2 } = SDK
    const txObj = sendTxBuild2({
      from: this.state.myAddress,
      to: window.CONTRACT_ADDRESS,
    })

    const tx = await IconexConnect.sendTransaction(txObj)

    console.log(randomImg(tx), this.state.dateurl)
    if (tx) {
      console.log(1234)
      this.setState({
        dateurl: DATEURL[randomImg(tx)],
        datestr: DATESTR[randomImg(tx)]
      })
    }
    
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1><a href="/"></a></h1>
          {
            !this.state.login ? (
              <>
                {/* <div className="wrap2" onClick={this.click}  style={{ backgroundImage: `url(${this.state.dateurl})` }}></div> */}
                <div className="wrap" onClick={this.click}>
                  <a href="#" className="button" >오늘은 어떤 술로 달릴까?</a>
                 
                </div>
              </>
            ) : (
                <>
                   <h2>{this.state.datestr}</h2>
                  <div className="wrap" onClick={this.getDatePlace}  style={{ backgroundImage: `url(${this.state.dateurl})`, width: "100%" ,height:"300px"}}>
                  <a>다른 술을 찾고 있는 당신에게 클릭의 기회를</a>
                  </div>
                </>
              )
          }
        </header>
      </div>
    );
  }

}



