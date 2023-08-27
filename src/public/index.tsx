import React from "react";
import wineData from "../wineData.json";
import "../index.css";



type statData = {
    
        "Alcohol": number,
        "Malic Acid": number,
        "Ash": number,
        "Alcalinity of ash": number,
        "Magnesium": number,
        "Total phenols": number,
        "Flavanoids": number | string,
        "Nonflavanoid phenols": number | string,
        "Proanthocyanins": number | string,
        "Color intensity": number | string,
        "Hue": number,
        "OD280/OD315 of diluted wines": number | string,
        "Unknown": number
      
}


const calculateMean = (numbers) => {
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    return sum / numbers.length;
  };
  
  const calculateMode = (numbers) => {
    const numMap = {};
    let maxNum = 0;
    let modes = [];
  
    numbers.forEach((num) => {
      if (!numMap[num]) numMap[num] = 1;
      else numMap[num]++;
      
      if (numMap[num] > maxNum) {
        modes = [num];
        maxNum = numMap[num];
      } else if (numMap[num] === maxNum) {
        modes.push(num);
        maxNum = numMap[num];
      }
    });
  
    return modes;
  };
  
  const calculateMedian = (numbers) => {
    numbers.sort((a, b) => a - b);
    const half = Math.floor(numbers.length / 2);
  
    if (numbers.length % 2) return numbers[half];
    return (numbers[half - 1] + numbers[half]) / 2.0;
  };
  
  const StatisticsTable = ({ data }) => {
    const keys = Object.keys(data[0]);
  
    const stats = keys.map((key) => {

      const values = data.map((obj) => parseFloat(obj[key])).filter((val) => !isNaN(val));
      
      return {
        key,
        mean: calculateMean(values),
        mode: calculateMode(values),
        median: calculateMedian(values),
      };
    });
  
    return (
      <table style={{ display:'flex', border: '1px solid black', }}>
        <thead>
          <tr>
            <tr className="trow">Measure</tr>
            <tr className="trow">Flavanoids Mean</tr>
            <tr className="trow">Flavanoids Median</tr>
            <tr className="trow">Flavanoids Mode</tr>
          </tr>
          </thead>

          <tbody style={{ display: 'flex', flexDirection: 'row' }}>
          {stats.map((stat, index) => (
            <tr id="tfir" key={index}>
              <tr id="tfirst" className="tdatarow">{stat.key}</tr>
              <tr className="tdatarow">{stat.mean.toFixed(3)}</tr>
              <tr className="tdatarow">{stat.median.toFixed(3)}</tr>
              <tr className="tdatarow">{stat.mode.join(", ")[0]}</tr>
            </tr>
          ))}
          </tbody>
      </table>
    );
  };


const Application = () => {
    return (
        <>
        <h1>Manufac</h1>
        <StatisticsTable data={wineData as statData[]} />
        
        </>

    );
}



export default Application;