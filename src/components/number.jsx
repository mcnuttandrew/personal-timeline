import React from 'react';
import Data from '../constants';

export default React.createClass({
  displayName : 'NumbersSection',

  renderNumbers(number, index) {
    return (
      <div
        className='number-wrapper'
        key={`number-${index}`}>
        <div className='number-value'> {number.value} </div>
        <div className='number-title'> {number.title} </div>
      </div>
    );
  },

  render() {
    return (
      <div className='numbers-section'>
        {Data.numbersData.map(this.renderNumbers)}
      </div>);
  }
});
