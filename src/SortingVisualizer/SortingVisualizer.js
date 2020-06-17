import React from 'react';
import './SortingVisualizer.css';
import Button from 'react-bootstrap/Button';
import {MergeSortAnimations} from './mergeSort.js'
import {BubbleSortAnimations} from './bubbleSort.js'

// some parameters for the animations
const PRIMARY_COLOR = '#00bcd4';
const SECONDARY_COLOR = 'red';
const ANIMATION_SPEED_MS = 50;

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }

    /*
    The componentDidMount() method runs 
    after the component output has been rendered to the DOM.
    */

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for(let i = 0; i < 100; i++) {
            array.push(randomIntGenerator(10, 600));
        }
        this.setState({array: array});
    }

    updateColor() {
        const barContainer = document.getElementsByClassName('array-bar');
        for(let i = 0; i < barContainer.length; i++) {
            barContainer[i].style.backgroundColor = 'black';
        }
    }

    playAnimations(animations) {
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            
            if(isColorChange) {
                // Change color of the bars what we are currently comparing
                const [barOneInx, barTwoInx] = animations[i];
                const barOneStyle = arrayBars[barOneInx].style;
                const barTwoStyle = arrayBars[barTwoInx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;

                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color; 
                }, i * ANIMATION_SPEED_MS);
            } else {
                // every third element: [first bar index, height]
                setTimeout(() => {
                    const [barOneInx, oneHeight, barTwoInx, twoHeight] = animations[i];

                    const barOneStyle = arrayBars[barOneInx].style;
                    barOneStyle.height = `${oneHeight *0.1}vh`; 

                    const barTwoStyle = arrayBars[barTwoInx].style;
                    barTwoStyle.height = `${twoHeight *0.1}vh`; 
                    
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    mergeSort() {
        const animations = MergeSortAnimations(this.state.array);
        console.log(animations);
        this.playAnimations(animations);

        // TODO: Set all bars color after finish sorting
        // Async, await? Promice?

        // this.updateColor();
    }

    bubbleSort() {
        const animations = BubbleSortAnimations(this.state.array);
        console.log(animations);
        this.playAnimations(animations);
    }

    quickSort() {}

    heapSort() {}
    

    // TODO: Add a stop/resume sorting button

    // stopSorting() {
    //     stopFlag = !stopFlag;
    //     console.log(stopFlag);
    // }

    render() {
        const {array} = this.state;
        console.log(this.state.array);
        return (
            <div className="array-container">
                <h1>Welcome to My Sorting Visualizer!</h1>

                <div className="buttons">
                    <Button variant="outline-primary" onClick={()=> this.resetArray()}>New Array</Button> {' '}
                    {/* <Button variant="outline-danger" onClick={()=>this.stopSorting()}>Stop</Button> {' '} */}
                    <Button variant="outline-secondary" onClick={()=>this.mergeSort()}>Merge Sort</Button> {' '}
                    <Button variant="outline-secondary" onClick={()=>this.quickSort()}>Quick Sort</Button> {' '}
                    <Button variant="outline-secondary" onClick={()=>this.heapSort()}>Heap Sort</Button> {' '}
                    <Button variant="outline-secondary" onClick={()=>this.bubbleSort()}>Bubble Sort</Button> {' '}
                </div>

                <div className="array-bar-container">
                    {this.state.array.map((value, index) => (
                        <div className="array-bar" 
                            key={Math.random()}
                            style={{height:`${value*0.1}vh`, backgroundColor: "#ff9800"}}>
                        </div>
                    ))}
                </div>
            </div>
        ) 
    }
}

function randomIntGenerator(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
};
