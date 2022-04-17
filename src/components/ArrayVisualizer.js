import React from "react";
import "./ArrayVisualizer.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Button,
    Input,
    Row,
    Col,
    Card,
    Navbar,
    NavbarBrand,
    Form,
    FormGroup,
    Label,
} from 'reactstrap';
import ReactDOM from 'react-dom';
import InputRange from 'react-input-range';
import "react-input-range/lib/css/index.css";
class visualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [2, 3, 5, 6, 7, 8, 89],
            value: 10,
            speed: 120,
            algo: 1,
            map1: new Map(),
        };
    }

    componentDidMount() {
        this.createArray(this.state.value);
    }

    randomInt = () => {
        return Math.floor(Math.random() * 100) + 1;
    }
    createArray = (n) => {
        var array = [];
        const map1 = new Map();
        for (let i = 0; i < n * 5; i++) {
            let a = this.randomInt();
            array.push(a);
            // document.getElementById(`${i}`).style.backgroundColor = "black";
        }
        this.setState({
            array: array,
            value: n,
            map1 : map1,
        })
    }
    getRandomColor = () => {
        var letters = 'BADEB'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * letters.length)]  ;
        }
        return color;
      }

    setArraySize = (value) => {
        this.createArray(value);
    }

    handleSortAlgo = (id) => {
        this.setState({
            algo: id,
        })
    }

    handleSortingSpeed = (e) => {
        this.setState({
            speed : 200 - e.target.value,
        })
    }
    handleSubmit = () => {
        if(this.state.speed > 200){
            alert("enter valid value of speed");
        }
        else if(this.state.speed < 50){
            alert("Enter speed less than 150");
            return;
        }
        
        if(this.state.algo === 1){
            this.selectionSort();
            return;
        }
        else if(this.state.algo === 2){
            this.bubbleSort();
            return;
        }
        else if(this.state.algo === 3){
            this.insertionSort();
            return;
        }
        else {
            return;
        }
    }

    selectionSort = () => {
        var array = this.state.array;
        var i = 0;
        var tth = this;
        var sort = setInterval(function () {
            let min_index = i;
            document.getElementById(`${i}`).style.backgroundColor = "green";
            for (let j = i + 1; j < array.length; j++) {

                if (array[j] < array[min_index]) {
                    min_index = j;
                }

            }
            // swap values
            var a = array[i], b = array[min_index];
            a = a ^ b;
            b = a ^ b;
            a = a ^ b;
            array[i] = a;
            array[min_index] = b;

            tth.setState({
                array: array,
            });

            i++;
            if (i === array.length) {
                clearInterval(sort);
            }
        }, this.state.speed);
        sort();
    }

    bubbleSort = () => {
        var array = this.state.array;
        var i = 0;
        var tth = this;
        var speed = this.state.speed;
        var sort = setInterval(function () {
            var swapped = false;
            document.getElementById(`${array.length - i - 1}`).style.backgroundColor = "green";
            for (let j = 0; j < array.length - i - 1; j++) {
                if (array[j] > array[j + 1]) {
                    // swap values
                    var a = array[j], b = array[j + 1];
                    a = a ^ b;
                    b = a ^ b;
                    a = a ^ b;
                    array[j] = a;
                    array[j + 1] = b;
                    // swap(&arr[j], &arr[j+1]);
                    swapped = true;
                }
            }

            tth.setState({
                array: array,
            });

            i++;
            if (swapped === false) {
                clearInterval(sort);
            }
        }, this.state.speed);
        sort();
    }

    insertionSort = () => {
        var array = this.state.array;
        var i = 1;
        var tth = this;
        var sort = setInterval(function () {
            let key = array[i];
            let j = i - 1;
            // document.getElementById(`${i}`).style.backgroundColor = "green";
            /* Move elements of arr[0..i-1], that are
            greater than key, to one position ahead
            of their current position */
            while (j >= 0 && array[j] > key) {
                array[j + 1] = array[j];
                j = j - 1;
            }
            array[j + 1] = key;

            tth.setState({
                array: array,
            });

            i++;
            if (i === array.length) {
                clearInterval(sort);
            }
        }, this.state.speed)
        sort();
    }


    render() {
        return (
            <>
                <div>
                    <Navbar
                        color="light"
                        expand="md"
                        light
                    >
                        <NavbarBrand href="/">
                            Sorting Visualizer
                        </NavbarBrand>
                        
                        
                    </Navbar>
                </div>
                <div >
                    <Row>
                        <Col>
                            <div className="sidebar" style={{textAlign:"left"}}>
                                <div><h4>Select Algorithm</h4></div>
                                    <Form>
                                        <FormGroup>
                                            <Input checked type="radio" name="algo" onChange={() => this.handleSortAlgo(1)}/>Selection Sort<br/>
                                            <Input type="radio" name="algo" onChange={() => this.handleSortAlgo(2)}/>Bubble Sort<br/>
                                            <Input type="radio" name="algo" onChange={() => this.handleSortAlgo(3)}/>insertion Sort<br/>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label><h4>Select Speed</h4></Label>
                                            <Input type="number" onChange={this.handleSortingSpeed} placeholder="range: 20 to 100" max={100} min={20} defaultValue={30}></Input>
                                        </FormGroup>
                                    </Form>
                                <div>
                                    <Button style={{width:"80%"}} color="success" onClick={this.handleSubmit}>Sort</Button>
                                </div>
                                <div>
                                    <Button style={{width:"80%"}} color="primary" onClick={() => this.createArray(this.state.value)}>Create New Array</Button>
                                </div>
                                
                            </div>
                        </Col>
                        <Col>

                                <div className="bar-box">

                                    {this.state.array.map((num, i) => (
                                        <div className="bar" id={`${i}`} key={i} style={{ height: `${num * 4}px`, width: `${(480/this.state.array.length)-2}px`}}></div>
                                    ))}

                                    <div style={{ width: "100%", marginTop:"20px" }}>
                                        <InputRange
                                            maxValue={20}
                                            minValue={1}
                                            value={this.state.value}
                                            onChange={value => this.setArraySize(value)} />
                                    </div>
                                </div>
                            

                        </Col>
                    </Row>

                </div>

            </>

        );
    }
}

export default visualizer;