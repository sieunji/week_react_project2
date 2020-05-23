import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

class App extends Component{
  //생성자 constructor => state 설정, 이벤트 등록 시 사용
  constructor(props) {
    super(props);
    //state  설정
    this.state={
      movie:[] //배열로 받기
    }
  }
  //화면 출력 전에 서버에서 데이터를 읽어서 state에 저장
  componentDidMount() {
      axios.get('http://localhost:3355/movie').then((result)=>{
      this.setState({movie:result.data})
      })
  }
  //화면에 출력
  render() {
    const  html=this.state.movie.map((m)=>
        <div className="col-md-4">
          <div className="thumbnail">
            <a href="/w3images/lights.jpg">
              <img src={m.poster} alt="Lights" style={{"width":"100%"}}/>
                <div className="caption">
                  <p>{m.title}</p>
                </div>
            </a>
          </div>
        </div>
    )
    return (
        <div className={"row"}>
          <h1 className={"text-center"}>현재 상영영화</h1>
          {html}
        </div>
    )
  }
}

export default App;
