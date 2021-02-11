import React, { Component} from 'react';
import {withRouter} from 'react-router-dom';
import './style.css';

class TodoTimer extends Component {
    constructor(props){
        super(props);
        this.started = this.started.bind(this);
        this.increment = this.increment.bind(this);
        this.reset = this.reset.bind(this);
        this.save = this.save.bind(this);
        this.time = 0;
        this.id=0;
        this.running = 0;
        this.state={
            todo:[],
        };
    }
    componentDidMount(){
        let post = this.props.data;
        this.id = post.id;
        fetch("http://localhost:3001/todo/get",{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
            },
            body : JSON.stringify(post)
        })
        .then(res=>res.json())
        .then((json)=>{
            if(json.data === 'err'){
                alert("데이터 가져오기 실패!!");
            }
            else{
                if(json.data[0].timer !== "00:00:00"){
                    let getdata = json.data[0].timer.split(":");
                    this.time += ((getdata[0]*120)+(getdata[1]*60)+(getdata[2]%60)*10);
                }
                this.setState({todo:json.data});
            }
        })
    }
    render() {
        // return(<div><h1>Hello Timer</h1></div>);
        const data = this.state.todo.map((dat,index)=>{
            const mycolor = {
                width:"50px",
                height:"50px",
                display:"inline-block",
                backgroundColor:dat.color,
            }
            return(
                <ul className="td" key={index}>
                    <li>{dat.todo}</li>
                    <li><span style={mycolor}></span></li>
                    <li id={"time"}>{dat.timer}</li>
                    <li><button id={"start"} onClick={this.started}>시작하기</button></li>
                    <li><button onClick={this.reset}>리셋</button></li>
                    <li><button onClick={()=>this.save(dat.id)}>끝내기</button></li>
                </ul>
            );
        })
        return(
            <div className="main_detail">
                <div className="container">
                    <ul className="th">
                        <li>todo</li>
                        <li>color</li>
                        <li>timer</li>
                    </ul>
                    {data}
                </div>
            </div>
        );
    }

    increment(){
        if(this.running === 1){
            setTimeout(()=>{
                this.time++;
                var min = Math.floor(this.time/10/60);
                var sec = Math.floor(this.time/10%60);
                var hour = Math.floor(this.time/10/60/60);

                if(min<10){
                    min = "0"+min;
                }
                if(sec<10){
                    sec = "0"+sec;
                }
                if(hour<10){
                    hour = "0"+hour;
                }

                document.getElementById("time").innerHTML = hour +":"+min+":"+sec;
                this.increment();
            },100)
        }
    }

    started(){
        if(this.running === 0){
            this.running = 1;
            this.increment();
            document.getElementById('start').innerHTML = "일시정지";
        }
        else{
            this.running = 0 ;
            document.getElementById('start').innerHTML = "계속";
        }
    }

    reset(){
        this.running = 0;
        document.getElementById('start').innerHTML = "시작";
        document.getElementById("time").innerHTML = "00:00:00";
    }

    save(){
        if(this.running === 0){
            const time = document.getElementById('time').innerHTML;
            const post= {
                id:this.id,
                timer:time
            }
            fetch("http://localhost:3001/todo/update",{
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                },
                body : JSON.stringify(post)
            }).then((res)=>res.json());
            this.props.history.goBack();
        }
        else{
            alert("일시 정지를 눌르셔야 끝낼수 있습니다.");
        }
    }
}

export default withRouter(TodoTimer);