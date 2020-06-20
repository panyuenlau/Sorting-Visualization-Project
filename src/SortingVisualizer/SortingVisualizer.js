import React from 'react';
import './SortingVisualizer.css';
import {Button, Slider} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {MergeSortAnimations} from './mergeSort';
import {BubbleSortAnimations} from './bubbleSort';
import {QuickSortAnimations } from './quickSort';
import {InsertionSortAnimations} from './insertionSort';
import {HeapSortAnimations} from './heapSort';

// some parameters for the animations
const ORIGINAL_COLOR = '#00bcd4';
const COMPARING_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
            animation_speed: 50,
        };
    }
    
    componentDidMount() {
    /*
        The componentDidMount() method runs 
        after the component output has been rendered to the DOM.
    */
        this.resetArray();
    }

    resetArray() {
        // const array = [100, 20, 50, 60, 40, 30];
        const array = [];
        for(let i = 0; i < 50; i++) {
            array.push(randomIntGenerator(10, 600));
        }
        
        this.setState({array: array});
    }

    resetArrayForm() {
        this.resetArray();
    }

    updateColor() {
        const barContainer = document.getElementsByClassName('array-bar');
        for(let i = 0; i < barContainer.length; i++) {
            barContainer[i].style.backgroundColor = 'black';
        }
    }
    
    playAnimations(animations) {
        for(let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isComparing = (animations[i][0] === 'compare1' || animations[i][0] === 'compare2');

            if(isComparing) {
                const color = (animations[i][0] === 'compare1') ? COMPARING_COLOR : ORIGINAL_COLOR;
                const [_, barOneInx, barTwoInx] = animations[i];

                if(barOneInx === -1) continue;

                // console.log(barOneInx, barTwoInx);

                const barOneStyle = arrayBars[barOneInx].style;
                const barTwoStyle = arrayBars[barTwoInx].style;
                
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * this.state.animation_speed)
            } else {
                setTimeout(() => {
                    const [_, barInx, barHeight] = animations[i];
                    
                    // console.log(barInx, barHeight);

                    const barStyle = arrayBars[barInx].style;
                    barStyle.height = `${barHeight *0.1}vh`; 

                }, i * this.state.animation_speed);
            }
        }
    }


    mergeSort() {
        const animations = MergeSortAnimations(this.state.array);

        this.playAnimations(animations);
        

        // TODO: Set all bars color after finish sorting
        // Async, await? Promice?
        // this.updateColor();
    }

    bubbleSort() {
        const animations = BubbleSortAnimations(this.state.array);

        this.playAnimations(animations);
    }

    quickSort() {
        const animations = QuickSortAnimations(this.state.array);

        this.playAnimations(animations);
    }

    heapSort() {
        const animations = HeapSortAnimations(this.state.array);

        this.playAnimations(animations);
    }

    insertionSort() {
        const animations = InsertionSortAnimations(this.state.array);

        this.playAnimations(animations);
    }

    // TODO: Add a stop/resume sorting button

    // stopSorting() {
    //     stopFlag = !stopFlag;
    //     console.log(stopFlag);
    // }

    handleChang = (event, value) => {
        this.setState({animation_speed: value});
    }

    render() {
        const {array, animation_speed} = this.state;

        return (
            <div className="array-container">
                <h1>Welcome to My Sorting Visualizer!</h1>
                
                Sorting Speed 
                <Slider value={animation_speed} onChange={this.handleChang} max = {200} aria-labelledby="continuous-slider" />
                
                <div className="buttons">                   
                    <Button variant="outlined" color="secondary" onClick={()=> this.resetArrayForm()}>New Array</Button> {' '}
                    {/* <Button variant="outline-danger" onClick={()=>this.stopSorting()}>Stop</Button> {' '} */}
                    <Button variant="outlined" onClick={()=>this.mergeSort()}>Merge Sort</Button> {' '}
                    <Button variant="outlined" onClick={()=>this.quickSort()}>Quick Sort</Button> {' '}
                    <Button variant="outlined" onClick={()=>this.heapSort()}>Heap Sort</Button> {' '}
                    <Button variant="outlined" onClick={()=>this.bubbleSort()}>Bubble Sort</Button> {' '}
                    <Button variant="outlined" onClick={()=>this.insertionSort()}>Insertion Sort</Button> {' '}
                </div>

                <div className="array-bar-container">
                    {this.state.array.map((value, index) => (
                        <div className="array-bar" 
                            key={Math.random()}
                            style={{height:`${value*0.1}vh`, backgroundColor: ORIGINAL_COLOR}}>
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
