const express=require("express")
//express는 간단한 서버를 제작할 때 사용
const request=require("request")
//request는 다른 사이트 서버를 연결해서 데이터 읽는 역할을 한다.
const app=express();
//서버 생성
const port=3355;
//서버 포트번호는 0~65535 중에 하나를 선택해야 한다. (0~1023은 이미 사용중)
//포트 충돌 방지 코드
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
//서버 대기중: .listen()
app.listen(port,()=>{
    console.log("Server Start...","http://localhost:3355")
})
//경로명 가져오기: .get
app.get("/",(request,response)=>{
    response.send("Hello Node Server!!")
})
// mongodb 연결
const Client=require("mongodb").MongoClient
/*
    몽고디비 =>NoSQL
    find() => select * from movie 의미
    find({mno:1}) => select * from movie where mno=1 의미
 */
// Client/movie라고 하면 아래 코드를 실행한다.
app.get("/movie",(request,response)=>{
    //url : mongodb 주소
    var url="mongodb://211.238.142.181:27017"
    Client.connect(url,(err,client)=>{
            var db = client.db("mydb");
            db.collection("movie").find({cateno:1}).toArray(function (err,docs) {
                response.json(docs)
                client.close();
            })
    })
})

app.get("/movie_home",(req,res)=>{
     var no=req.query.no; // /movie_home?no=1 라고 사용자가 쳤을 때 no
     var site="";
     if(no==1){
        site="searchMainDailyBoxOffice.do"//일일 박스오피스
     }
     else if(no==2){
         site="searchMainRealTicket.do"//실시간 예매율
     }
     else if(no==3){
         site="searchMainDailySeatTicket.do"//좌석점유율순위
     }
     else if(no==4){
         site="searchMainOnlineDailyBoxOffice.do"//온라인상영관 일일
     }
     var url="http://www.kobis.or.kr/kobis/business/main/"+site;

     request({url:url},function (err,request,json) {
        console.log(json);
        res.json(JSON.parse(json));
     })
})


