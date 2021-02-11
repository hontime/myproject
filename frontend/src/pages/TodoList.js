import React, { Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import {TodoTimer} from '../pages';

class TodoList extends Component {
    constructor(props){
        super(props);
        this.setParentData=this.setParentData.bind(this);
        this.timerPage=this.timerPage.bind(this);
        this.state={
            todo_list:[],
            id:0,
            date:null,
        };
    }
    componentDidMount(){
        let id = this.props.id;
        let date = this.props.date;
        this.getListData(id,date);
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.id !== this.props.id){
            let id = this.props.id;
            let date = this.props.date;
            this.getListData(id,date);
        }
    }

    setParentData(){
        this.props.parentFunction(this.props.id);
    }

    timerPage(id,todo_date_id){
        let data={
            id:id,
            todo_date_id:todo_date_id,
        }
        this.props.timerFunction(data);
    }

    getListData(id,date){
        this.setState({id:id});
        fetch(`http://localhost:3001/todo/get_list?id=${id}&date=${date}`)
        .then(res=>res.json())
        .then((json)=>{
            if(json.todo ==="err"){
                alert("데이터 가져오기 실패!!");
            }
            else{
                this.setState({todo_list:json.todo_list});
            }
        })
    }

    render(){
        const todo = this.state.todo_list.map((item,index)=>{
            const myColor={
                width:"50px",
                height:"50px",
                display:"inline-block",
                backgroundColor:item.color,
            }
            return(
                <ul className="td" key={index}>
                    <li>{item.todo}</li>
                    <li><span style={myColor}/></li>
                    <li>{item.timer}</li>
                    <li><Link to={`/todo/${this.state.id}/timer`}><button onClick={()=>this.timerPage(item.id,item.todo_date_id)}>타이머</button></Link></li>
                </ul>
            )
        });
        return(
            <div className="main_detail">
                <div className="container">
                    <ul className="th">
                        <li>todo</li>
                        <li>color</li>
                        <li>timer</li>
                    </ul>
                    {todo}
                </div>
                <Link to={`/todo/create`}>
                    <button onClick={this.setParentData}>추가하기</button>
                </Link>
            </div>
        );
    }

}

export default withRouter(TodoList);