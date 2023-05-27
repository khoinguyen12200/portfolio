import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPage from "./pages/LandingPage";
import './App.css';
import './Global.scss'
import scrollDetector from 'scroll-detector';

function App() {
  return (
    <div className="App">
      <LandingPage/>
    </div>
  );
}

export default App;

var scrollableElement = document.body; //document.getElementById('scrollableElement');

scrollableElement.addEventListener('wheel', checkScrollDirection);

function checkScrollDirection(event) {
    if (checkScrollDirectionIsUp(event)) {
        // console.log('UP');
    } else {
        // console.log('Down');
    }
}

function checkScrollDirectionIsUp(event) {
    if (event.wheelDelta) {
        return event.wheelDelta > 0;
    }
    return event.deltaY < 0;
}

let startY;

window.addEventListener('touchstart', (event) => {
    startY = event.touches[0].clientY;
});

window.addEventListener('touchmove', (event) => {
    const currentY = event.touches[0].clientY;
    const deltaY = currentY - startY;

    if (deltaY > 0) {
        // User is moving down
        // console.log('MOBILE Down');
    } else {
        // User is moving up
        // console.log('MOBILE Up');
    }
});
