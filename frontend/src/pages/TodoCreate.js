import React, { Component} from 'react';
import {withRouter} from 'react-router-dom';

class TodoCreate extends Component {
    constructor(props){
        super(props);
        this.createCancle = this.createCancle.bind(this);
        this.createData = this.createData.bind(this);
        this.state={
            id:0,
            color:[],
        };
    }

    componentDidMount(){
        this.setState({id:this.props.id});
        fetch("http://localhost:3001/todo/color")
        .then(res=>res.json())
        .then(json=>{
            if(json.color === 'err'){
                console.log("Json.data : ERR");
            }
            else{
                this.setState({color:json.color});
            }
        })
    }

    // 컬러 리스트를 스크롤 형식으로 만든다 그런다음에 선택된 컬러를 HEX 데이터를 가져오는 기능 만들어야함.
    render(){
        let get_color = this.state.color.map((item,index)=>{
            return(
            <li key={index} name={item.color} id={"color"} style={{overflow:"auto"}}>{item.color_name}</li>
            );
        });
        return(
            <div className="main_detail">
                <div className="container">
                    <ul>
                        <li><label>ToDo</label></li>
                        <li><input id="todo" name="todo" type="text"/></li>
                        <li><label>Color</label></li>
                        {get_color}
                        {/* <li><input id="color" name="color" type="text"/></li> */}
                        <button onClick={this.createData}>저장</button>
                        <button onClick={this.createCancle}>취소</button>
                    </ul>
                </div>
            </div>
        );
    }
    createData(){
        let todo = document.getElementById('todo').value;
        let color = document.getElementById('color').value;
        let id = this.state.id;
        let data={
            id:id,
            color:color,
            todo:todo,
        }
        fetch("http://localhost:3001/todo/create",{method:"POST",
            headers:{'content-type':'application/json',},
            body:JSON.stringify(data)})
            .then(res=>res.json())
            .then(json=>{
                if(json.data === 'err'){
                    alert("실패했습니다.");
                }
                else{
                    alert("생성 되었습니다.");
                    this.props.history.goBack();
                }
            });
    }

    createCancle(){
        console.log("Go BACK");
        this.props.history.goBack();
    }
}

export default withRouter(TodoCreate);