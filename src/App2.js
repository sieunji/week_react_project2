import React,{Component} from "react";
import axios from 'axios'

class App2 extends Component{
    constructor(props) {
        super(props);
        this.state={
            movie:[],
            detail:{},
            inShow:false
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3355/movie_home',{
            params:{
                no:1
            }
        }).then((result)=>{
            this.setState({movie:result.data})
        })
    }
    onMovie(no){
        axios.get('http://localhost:3355/movie_home',{
            params:{
                no:no
            }
        }).then((result)=>{
            this.setState({movie:result.data})
        })
    }
    onMovieDetail(m){
        this.setState({detail:m,isShow:true});
    }
    render() {
        const  html=this.state.movie.map((m)=>
            <tr onMouseOver={this.onMovieDetail.bind(this,m)}>
                <td><img src={"http://www.kobis.or.kr/"+m.thumbUrl} width={"35"} height={"35"}/></td>
                <td>{m.movieNm}</td>
                <td>{m.director}</td>
                <td>{m.genre}</td>
            </tr>
         )
        return(
            <React.Fragment>
                <div className="row" style={{"margin":"0px auto"}}>
                    <button className={"btn btn-sm btn-primary"} onClick={this.onMovie.bind(this,1)}>박스오피스</button>
                    <button className={"btn btn-sm btn-danger"} onClick={this.onMovie.bind(this,2)}>실시간 예매율</button>
                    <button className={"btn btn-sm btn-success"} onClick={this.onMovie.bind(this,3)}>좌석 점유율</button>
                    <button className={"btn btn-sm btn-info"} onClick={this.onMovie.bind(this,4)}>온라인 이용순위</button>
                </div>
                <div className="row" style={{"margin":"0px auto"}}>
                    <div className={"col-sm-6"}>
                        <table className={"table"}>
                            <thead>
                                <tr>
                                    <th className={"text-center"}></th>
                                    <th className={"text-center"}>영화명</th>
                                    <th className={"text-center"}>감독</th>
                                    <th className={"text-center"}>장르</th>
                                </tr>
                            </thead>
                            <tbody>
                                  {html}
                            </tbody>
                        </table>
                    </div>
                    <div className={"col-sm-6"}>
                        {this.state.isShow===true?<MovieDetail movie={this.state.detail}/>:null}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
//상세보기
class  MovieDetail extends Component{
    render() {
        return(
            <table className={"table"}>
                <tbody>
                    <tr>
                        <td className={"text-center"} width={"30%"} rowSpan={"5"}>
                            <img src={"http://www.kobis.or.kr/"+this.props.movie.thumbUrl} width={"300"} height={"350"}/>
                        </td>
                        <td width={"70%"} colSpan={"2"}>
                            <h2>{this.props.movie.movieNm}</h2>
                            <sub style={{"color":"gray"}}>{this.props.movie.movieNmEn}</sub>
                        </td>
                    </tr>
                    <tr>
                        <td width={"20%"}>감독</td>
                        <td width={"50%"}>{this.props.movie.director}</td>
                    </tr>
                    <tr>
                        <td width={"20%"}>장르</td>
                        <td width={"50%"}>{this.props.movie.genre}</td>
                    </tr>
                    <tr>
                        <td width={"20%"}>등급</td>
                        <td width={"50%"}>{this.props.movie.watchGradeNm}</td>
                    </tr>
                    <tr>
                        <td width={"20%"}>개봉일</td>
                        <td width={"50%"}>{this.props.movie.openDt}</td>
                    </tr>
                    <tr>
                        <td colSpan={"3"}>
                            {this.props.movie.synop}
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }
}
export default App2;