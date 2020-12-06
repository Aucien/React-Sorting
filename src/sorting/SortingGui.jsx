import React, {Component} from "react"
import * as SortingAlgorithms from "./SortingAlgorithms.js";
import "./SortingGui.css"

const animationSpeed = 1;

const numberOfBars = 100;

const mainColor = 'lightblue';

const swapColor = 'red';

export default class SortingGUI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
    }
  }
  componentDidMount(){
    this.resetArray();
  }

  resetArray(){
    const array = [];
    for (let i = 0; i < numberOfBars; i++){
      array.push(generateRandomIntFromInterval(5,500));
    }
    this.setState({array});
  }

  InsertionSort() {
    const animations = SortingAlgorithms.InsertionSort(this.state.array);
    visualizeSort(animations);
  }

  MergeSort(){
    const animations = SortingAlgorithms.MergeSort(this.state.array);
    visualizeSort(animations);
  }

  render() {
    const {array} = this.state;
    return (
      <div className="arrayContainer">
        {array.map((value, idx) => (
          <div className="arrayBar" key ={idx} style={{backgroundColor: mainColor,height: `${value}px`}}/>
        ))}
        <button onClick={() => (this.resetArray())}>Generate New Array</button>
        <button onClick={() => (this.InsertionSort())}>Insertion Sort</button>
        <button onClick={() => (this.MergeSort())}>Merge Sort</button>
      </div>
    )
  }
}

function visualizeSort(animations){
  animations.forEach(([compare, swap], index) => {
    const arrayBars = document.getElementsByClassName('arrayBar');
    if (!swap){
        const [i, j] = compare;
        setTimeout(() => {
          arrayBars[i].style.backgroundColor = swapColor; 
          arrayBars[j].style.backgroundColor = swapColor; 
        }, index * animationSpeed)
        setTimeout(() => {
          arrayBars[i].style.backgroundColor = mainColor; 
          arrayBars[j].style.backgroundColor = mainColor; 
        }, index * animationSpeed + 1)
    }
    else {
      setTimeout(() => {
        const [i, newHeight] = compare;
        arrayBars[i].style.height = `${newHeight}px`;
      }, index * animationSpeed + 1)
    }
  })
}

function generateRandomIntFromInterval(min, max){
  return Math.floor(Math.random() * (max-min + 1) + min);
}