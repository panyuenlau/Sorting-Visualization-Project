import React from 'react';
import {Button} from '@material-ui/core';
import {MergeSortAnimations} from './sorting-algorithms/mergeSort';
import {BubbleSortAnimations} from './sorting-algorithms/bubbleSort';
import {QuickSortAnimations } from './sorting-algorithms/quickSort';
import {InsertionSortAnimations} from './sorting-algorithms/insertionSort';
import {HeapSortAnimations} from './sorting-algorithms/heapSort';
import {SliderBar} from './components/sliderBar';
import NewArrayButton from './components/newArrayButton';
import './css/SortingVisualizer.css';


// Some params
const ORIGINAL_COLOR = '#00bcd4';
const COMPARING_COLOR = 'red';
const MAX_ANIMATION_MS = 100;

// Parameter used for the slider
const marks = [
    {
        value: 0,
        label: '0%',
    },
    {
        value: 100,
        label: '100%',
    },
]

function randomIntGenerator(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
            array_size: 100,
            animation_speed: 50,
        };

        this.changeArraySize = this.changeArraySize.bind(this);
        this.resetArray = this.resetArray.bind(this);
    }
    
    componentDidMount() {
        /*
            The componentDidMount() method runs 
            after the component output has been rendered to the DOM.
        */
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for(let i = 0; i < this.state.array_size; i++) {
            array.push(randomIntGenerator(10, 600));
        }
        this.setState({array: array});
    }

    changeArraySize = (event, value) => {
        this.setState({
            array_size: value
        })
    }

    // resetArrayForm() {
    //     this.resetArray();
    // }

    /* TODO: update color after the sorting is finished
    updateColor() {
        const barContainer = document.getElementsByClassName('array-bar');
        for(let i = 0; i < barContainer.length; i++) {
            barContainer[i].style.backgroundColor = 'black';
        }
    }
    */
    
    playAnimations(animations) {
        for(let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isComparing = (animations[i][0] === 'compare1' || animations[i][0] === 'compare2');

            if(isComparing) {
                const color = (animations[i][0] === 'compare1') ? COMPARING_COLOR : ORIGINAL_COLOR;
                const [, barOneInx, barTwoInx] = animations[i];

                if(barOneInx === -1) continue;

                const barOneStyle = arrayBars[barOneInx].style;
                const barTwoStyle = arrayBars[barTwoInx].style;
                
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * (MAX_ANIMATION_MS + 1 - this.state.animation_speed))
            } else {
                setTimeout(() => {
                    const [, barInx, barHeight] = animations[i];
                    
                    const barStyle = arrayBars[barInx].style;
                    barStyle.height = `${barHeight *0.1}vh`; 

                }, i * (MAX_ANIMATION_MS + 1 - this.state.animation_speed));
            }
        }
    }


    mergeSort() {
        const animations = MergeSortAnimations(this.state.array);

        this.playAnimations(animations);
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
    /*
    stopSorting() {
        stopFlag = !stopFlag;
        console.log(stopFlag);
    }
    */

   handleSliderChange = (event, value) => {
        this.setState({animation_speed: value});
    }

    render() {
        const {animation_speed} = this.state;

        return (
            <div className="array-container">

                <div className="top-container">
                    <h1>Welcome to My Sorting Visualizer!</h1>
                                    
                    <div className="buttons">
                        <NewArrayButton value = {this.state.array_size} className="newAarryButton" setArraySize={this.changeArraySize} resetArray={this.resetArray} />
                        
                        {/* <Button variant="outlined" color="secondary" onClick={()=> this.resetArrayForm()}>New Array</Button> {' '} */}
                        {/* <Button variant="outline-danger" onClick={()=>this.stopSorting()}>Stop</Button> {' '} */}
                        <Button variant="outlined" onClick={()=>this.mergeSort()}>Merge Sort</Button> {' '}
                        <Button variant="outlined" onClick={()=>this.quickSort()}>Quick Sort</Button> {' '}
                        <Button variant="outlined" onClick={()=>this.heapSort()}>Heap Sort</Button> {' '}
                        <Button variant="outlined" onClick={()=>this.bubbleSort()}>Bubble Sort</Button> {' '}
                        <Button variant="outlined" onClick={()=>this.insertionSort()}>Insertion Sort</Button> {' '}
                    </div>

                    <div className="slider">
                        <div> Sorting Speed </div>
                        <SliderBar marks={marks} valueLabelDisplay="auto" value={animation_speed} onChange={this.handleSliderChange} max = {MAX_ANIMATION_MS} aria-labelledby="continuous-slider"/>
                    </div>
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

