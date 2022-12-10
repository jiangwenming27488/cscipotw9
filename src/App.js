import React from 'react';
import Dice from './components/dice'
import Scoreboard from './components/score_board'


function App() {
  const [dice, setDice] = React.useState(make_dice());
  const [hover, setHover] = React.useState(false);
  const [chances, setChances] = React.useState(3);
  const [score, setScore] = React.useState({
        ones: {
          value: 0,
          clicked:false,
        },
        twos:  {
          value: 0,
          clicked:false,
        },
        threes:  {
          value: 0,
          clicked:false,
        },
        fours:  {
          value: 0,
          clicked:false,
        },
        fives:  {
          value: 0,
          clicked:false,
        },
        six:  {
          value: 0,
          clicked:false,
        },
        sum1:  {
          value: 0,
          clicked:false,
          show: true
        },
        bonus: {
          value: 0,
          clicked:false,
        },
        pair:  {
          value: 0,
          clicked:false,
        },
        two_pair: {
          value: 0,
          clicked:false,
        },
        three_of_a_kind:  {
          value: 0,
          clicked:false,
        },
        four_of_a_kind:  {
          value: 0,
          clicked:false,
        },
        full_house:  {
          value: 0,
          clicked:false,
        },
        small_straight:  {
          value: 0,
          clicked:false,
        },
        straight: {
          value: 0,
          clicked:false,
        },
        chance:  {
          value: 0,
          clicked:false,
        },
        yatzy: {
          value: 0,
          clicked:false,
        },
        totalSum: {
          value: 0,
          show: false,
          flag: true,
        }
      })

    const [hoverScore, setHoverScore] = React.useState({
          ones: 0,
          twos: 0,
          threes: 0,
          fours: 0,
          fives: 0,
          six: 0,
          sum1: 0,
          bonus:0,
          pair: 0,
          two_pair:0,
          three_of_a_kind: 0,
          four_of_a_kind: 0,
          full_house: 0,
          small_straight: 0,
          straight:0,
          chance: 0,
          yatzy:0,
    })

  function make_dice() {
    const diceArr = []
    for(let i = 0; i < 5; i++){
        const newDie = {
            id: i+1,
            hold: false,
            number: 0,
            a:{
              ab:false
            }
        }
        diceArr.push(newDie)
      }
      return(diceArr)
    }
    function countDiceValue() {
      const scoreArray= dice.map(die => die.number)

      const counts = {}
      scoreArray.forEach((value) => {
        counts[value] = (counts[value] || 0) + 1;
      });
      return counts
    }
    React.useEffect(() => {
      if (score.ones.clicked && score.twos.clicked && score.threes.clicked && score.fours.clicked && score.fives.clicked && score.six.clicked && score.sum1.show){
        const sumOfDie = score.ones.value + score.twos.value + score.threes.value + score.fours.value + score.fives.value + score.six.value
        setScore(prevScore1 => ({...prevScore1,sum1:{...prevScore1.sum1, value:sumOfDie, clicked:true, show:false}}))
        if (sumOfDie >= 63){
          setScore(prevScore1 => ({...prevScore1,bonus:{...prevScore1.bonus, value:50, clicked:true}}))
        }
      }
      if (score.ones.clicked && score.twos.clicked && score.threes.clicked && score.fours.clicked && score.fives.clicked && score.six.clicked && score.sum1.clicked && score.pair.clicked && score.two_pair.clicked && score.three_of_a_kind.clicked && score.four_of_a_kind.clicked && score.small_straight.clicked && score.straight.clicked && score.full_house.clicked && score.chance.clicked && score.yatzy.clicked && score.totalSum.flag){
        const totalScore = score.sum1.value + score.bonus.value + score.pair.value + score.two_pair.value + score.three_of_a_kind.value + score.four_of_a_kind.value + score.small_straight.value + score.straight.value + score.full_house.value + score.chance.value + score.yatzy.value
        setScore(prevScore1 => ({...prevScore1,totalSum:{...prevScore1.totalSum, show:true, value:totalScore, flag:false}}))
      }



  }, [score])

  function hold_dice(id) {
    if(this.dice_check()){
        setDice(prevDice => {
                return prevDice.map((die) => {
                    return die.id === id ? {...die, hold: !die.hold} : die
                })
            })
          }
          generate(id)
  }

  function dice_check() {
    const valueCheck=dice.map(die=>die.number)
    return valueCheck[0]
  }



  function generate(id) {
    if(dice_check()){
        setDice(prevDice => {
                return prevDice.map((die) => {
                    return die.id === id ? {...die, a:{...die.a, ab:!die.ab}} : die


                })
            })
          }
  }


  function throwAll() {
    const min = Math.ceil(1);
    const max = Math.floor(6);
      if(chances > 0){
        setDice(prevDice => {
                return prevDice.map((die) => {
                     return !die.hold ? {...die, number: Math.floor(Math.random() * (max - min + 1) + min)} : die
                })
            })
        setChances(prevThrow => prevThrow -1)
      }else {
        alert("You don't have more chances")
      }
  }


  function scoreboardHover(event) {
    if(hover === false){
      setHover(!hover)
    }

    const {id} = event.target
    const count = countDiceValue()

    if (id === "1" && !score.ones.clicked){
      count[1] ? setHoverScore(prevScore => ({...prevScore, ones: count[1]*1})) : setHoverScore(prevScore => ({...prevScore, ones: 0}))
    }else if (id === "2" && !score.twos.clicked) {
      count[2] ? setHoverScore(prevScore => ({...prevScore, twos: count[2]*2})) : setHoverScore(prevScore => ({...prevScore, twos: 0}))
    }else if (id === "3" && !score.threes.clicked) {
      count[3] ? setHoverScore(prevScore => ({...prevScore, threes: count[3]*3})) : setHoverScore(prevScore => ({...prevScore, threes: 0}))
    }else if (id === "4" && !score.fours.clicked) {
      count[4] ? setHoverScore(prevScore => ({...prevScore, fours: count[4]*4})) : setHoverScore(prevScore => ({...prevScore, fours: 0}))
    }else if (id === "5" && !score.fives.clicked) {
      count[5] ? setHoverScore(prevScore => ({...prevScore, fives: count[5]*5})) : setHoverScore(prevScore => ({...prevScore, fives: 0}))
    }else if (id === "6" && !score.six.clicked) {
      count[6] ? setHoverScore(prevScore => ({...prevScore, six: count[6]*6})) : setHoverScore(prevScore => ({...prevScore, six: 0}))
    }else if (id==="9" && !score.pair.clicked) {
      let pair_value = 0
      Object.keys(count).forEach(key => {
        let value = count[key]
        //the largest die pair value will be returned the last one to be returned from the itteration
        if (value===2 || value===3 ||value===4 || value===5){
          pair_value = key
          setHoverScore(prevScore => ({...prevScore, pair: pair_value*2 }))
        }
      })
      //const die_pair_value=countPair()

    }
    else if (id==="10" && !score.two_pair.clicked) {
      let two_pair_value1 = 0
      let two_pair_value2 = 0
      Object.keys(count).forEach(key => {
        let value = count[key]
        //the largest die pair value will be returned the last one to be returned from the itteration
        if (value===2 || value ===3){
          if(!two_pair_value1){
            two_pair_value1=key
          }else if (!two_pair_value2) {
            two_pair_value2=key

          }
          //setHoverScore(prevScore => ({...prevScore, two_pair: two_pair*2 }))
        }
      })
    if(two_pair_value1 && two_pair_value2){
      let two_pair_value = two_pair_value1*2+two_pair_value2*2
      setHoverScore(prevScore => ({...prevScore, two_pair:  two_pair_value}))

    }else {
      setHoverScore(prevScore => ({...prevScore, two_pair:  0}))
    }
    }
    else if (id==="11" && !score.three_of_a_kind.clicked) {
      Object.keys(count).forEach(key => {
        let value = count[key]
        if (value===3 || value ===4 || value === 5){
          let newHoverValue = key*3
          setHoverScore(prevScore => ({...prevScore, three_of_a_kind: newHoverValue }))
        }
      })
    }
    else if (id==="12" && !score.four_of_a_kind.clicked) {
      Object.keys(count).forEach(key => {
        let value = count[key]
        if (value ===4 || value === 5){
          setHoverScore(prevScore => ({...prevScore, four_of_a_kind: key*4 }))
        }
      })
    }
    else if (id === "13" && !score.small_straight.clicked) {
        if (count[1] && count[2] && count[3] && count[4] && count[5]) {
          setHoverScore(prevScore => ({...prevScore, small_straight:15}))
      } else { setHoverScore(prevScore => ({...prevScore,small_straight:0}))}
    }else if (id === "14" && !score.straight.clicked) {
       if (count[2] && count[3] && count[4] && count[5] && count[6] ) {
          setHoverScore(prevScore => ({...prevScore,straight:20}))
      }else { setHoverScore(prevScore => ({...prevScore,straight:0}))}
   }
   else if (id==="15" && !score.full_house.clicked) {
     let pair =0
     let three_kind = 0
     Object.keys(count).forEach(key => {
       let value = count[key]

       //the largest die pair value will be returned the last one to be returned from the itteration
         if(value===2){
           pair=key
         }else if (value===3) {
           three_kind=key
         }
         if(pair && three_kind){
           setHoverScore(prevScore => ({...prevScore, full_house:  (pair*2+three_kind*3)}))

         }else {
           setHoverScore(prevScore => ({...prevScore, full_house:  0}))
         }
     })
   }
   else if (id === '16' && !score.chance.clicked) {
     let chanceSum = 0
     Object.keys(count).forEach(key => {
       let value = count[key]
       chanceSum = chanceSum + (key*value)
     })
     setHoverScore(prevScore => ({...prevScore, chance: chanceSum}))
   }
   else if (id==='17') {
     Object.keys(count).forEach(key => {
       let value = count[key]
         if(value===5){
           setHoverScore(prevScore => ({...prevScore,yatzy:50}))
         } else {
           setHoverScore(prevScore => ({...prevScore, yatzy: 0}))
         }
   })
 }
}





function score_board_hover_leave(event) {
     //event.stopPropagation()
     event.preventDefault()
     if (hover === true){
         setHover(!hover)
     }
     const {id} = event.target
     //const count = countDiceValue()
     if (id === "1"){
      setHoverScore(prevValue => ({...prevValue, ones:score.ones.value}))
     }else if (id === "2") {
       setHoverScore(prevValue => ({...prevValue, twos:score.twos.value}))
     }else if (id === "3") {
       setHoverScore(prevValue => ({...prevValue, threes:score.threes.value}))
     }else if (id === "4") {
       setHoverScore(prevValue => ({...prevValue, fours:score.fours.value}))
     }else if (id === "5") {
       setHoverScore(prevValue => ({...prevValue, fives:score.fives.value}))
     }else if (id === "6") {
       setHoverScore(prevValue => ({...prevValue, six:score.six.value}))
     }else if (id === "9") {
       setHoverScore(prevValue => ({...prevValue, pair:score.pair.value}))
     }
     else if (id === "10") {
       setHoverScore(prevValue => ({...prevValue, two_pair:score.two_pair.value}))
     }else if (id === "11") {
       setHoverScore(prevValue => ({...prevValue, three_of_a_kind:score.three_of_a_kind.value}))
     } else if (id==="12") {
       setHoverScore(prevValue => ({...prevValue, four_of_a_kind:score.four_of_a_kind.value}))
     }else if (id==="13") {
       setHoverScore(prevValue => ({...prevValue, small_straight:score.small_straight.value}))
     }else if (id==="14") {
       setHoverScore(prevValue => ({...prevValue, straight:score.straight.value}))
     } else if (id==="15") {
       setHoverScore(prevValue => ({...prevValue, full_house:score.full_house.value}))
     }else if (id==="16") {
       setHoverScore(prevValue => ({...prevValue, chance:score.chance.value}))
     }else if (id==="17") {
       setHoverScore(prevValue => ({...prevValue, yatzy:score.yatzy.value}))
     }
   }

    function save_score(event) {
    if(dice_check()) {
      let count = countDiceValue()
      const {id} = event.target

      if (id === "1" && !score.ones.clicked){
        if(!count[1]){
          //setScore(prevScore => ({...prevScore, ones:0}))

          setScore(prevScore1 => ({...prevScore1,ones:{...prevScore1.ones, value:0, clicked:true}}))

        } else{
       //setScore(prevScore => ({...prevScore,ones:count[1]*1}))
       setScore(prevScore1 => ({...prevScore1,ones:{...prevScore1.ones, value:count[1]*1, clicked:true}}))

     }
   }else if (id === "2" && !score.twos.clicked) {
        if(!count[2]){
          //setScore(prevScore => ({...prevScore, twos:0}))
          setScore(prevScore1 => ({...prevScore1,twos:{...prevScore1.twos, value:0, clicked:true}}))
        } else{
        //setScore(prevScore => ({...prevScore,twos:count[2]*2}))
        setScore(prevScore1 => ({...prevScore1,twos:{...prevScore1.twos, value:count[2]*2, clicked:true}}))
      }
    }else if (id === "3" && !score.threes.clicked) {
        if(!count[3]){
          //setScore(prevScore => ({...prevScore, threes:0}))
          setScore(prevScore1 => ({...prevScore1,threes:{...prevScore1.threes, value:0, clicked:true}}))
        } else{
        //setScore(prevScore => ({...prevScore,threes:count[3]*3}))
        setScore(prevScore1 => ({...prevScore1,threes:{...prevScore1.threes, value:count[3]*3, clicked:true}}))
      }
    }else if (id === "4" && !score.fours.clicked) {
        if(!count[4]){
          //setScore(prevScore => ({...prevScore, fours:0}))
          setScore(prevScore1 => ({...prevScore1,fours:{...prevScore1.fours, value:0, clicked:true}}))
        } else{
        //setScore(prevScore => ({...prevScore,fours:count[4]*4}))
        setScore(prevScore1 => ({...prevScore1,fours:{...prevScore1.fours, value:count[4]*4, clicked:true}}))

      }
    }else if (id === "5" && !score.fives.clicked) {
        if(!count[5]){
          //setScore(prevScore => ({...prevScore, fives:0}))
          setScore(prevScore1 => ({...prevScore1,fives:{...prevScore1.fives, value:0, clicked:true}}))
        } else{
        //setScore(prevScore => ({...prevScore,fives:count[5]*5}))
        setScore(prevScore1 => ({...prevScore1,fives:{...prevScore1.fives, value:count[5]*5, clicked:true}}))
      }
    }else if (id === "6" && !score.six.clicked) {
        if(!count[6]){
          //setScore(prevScore => ({...prevScore, six:0}))
          setScore(prevScore1 => ({...prevScore1,six:{...prevScore1.six, value:0, clicked:true}}))
        } else{
        //setScore(prevScore => ({...prevScore,six:count[6]*6}))
        setScore(prevScore1 => ({...prevScore1,six:{...prevScore1.six, value:count[6]*6, clicked:true}}))
      }
    }
    else if (id==="9" && !score.pair.clicked) {
      let pair_value = 0
      Object.keys(count).forEach(key => {
        let value = count[key]
        if (value===2 || value===3 ||value===4 || value===5){
          pair_value = key
          setScore(prevScore1 => ({...prevScore1,pair:{...prevScore1.pair, value:pair_value*2, clicked:true}}))

        }else {
          setScore(prevScore1 => ({...prevScore1,pair:{...prevScore1.pair, value:0, clicked:true}}))
        }
      })

    }
    else if (id==="10" && !score.two_pair.clicked) {
      let two_pair_value1 = 0
      let two_pair_value2 = 0
      Object.keys(count).forEach(key => {
        let value = count[key]
        if (value===2 || value ===3){
          if(!two_pair_value1){
            two_pair_value1=key
          }else if (!two_pair_value2) {
            two_pair_value2=key

          }
        }
      })
    if(!two_pair_value1 || !two_pair_value2){
      setScore(prevScore1 => ({...prevScore1,two_pair:{...prevScore1.two_pair, value:0, clicked:true}}))
    }else {
      let two_pair_value = two_pair_value1*2+two_pair_value2*2
      setScore(prevScore1 => ({...prevScore1,two_pair:{...prevScore1.two_pair, value:two_pair_value, clicked:true}}))
    }
    }
    else if (id==="11" && !score.three_of_a_kind.clicked) {
      Object.keys(count).forEach(key => {
        let value = count[key]
        if (value===3 || value ===4 || value === 5){
          let newScore=key*3
          setScore(prevScore1 => ({...prevScore1,three_of_a_kind:{...prevScore1.three_of_a_kind, value:newScore, clicked:true}}))
        }else {
          setScore(prevScore1 => ({...prevScore1,three_of_a_kind:{...prevScore1.three_of_a_kind, clicked:true}}))
        }
      })
    }
    else if (id==="12" && !score.four_of_a_kind.clicked) {
      Object.keys(count).forEach(key => {
        let value = count[key]
        if (value ===4 || value ===5){
          let newScore=key*4

          setScore(prevScore1 => ({...prevScore1,four_of_a_kind:{...prevScore1.four_of_a_kind, value:newScore, clicked:true}}))
        }else{

          setScore(prevScore1 => ({...prevScore1,four_of_a_kind:{...prevScore1.four_of_a_kind,clicked:true}}))
        }
      })
    }else if (id === "13" && !score.small_straight.clicked) {
        if (count[1] && count[2] && count[3] && count[4] && count[5]) {
          setScore(prevScore1 => ({...prevScore1,small_straight:{...prevScore1.small_straight, value:15, clicked:true}}))
      } else { 
      setScore(prevScore1 => ({...prevScore1,small_straight:{...prevScore1.small_straight, value:0, clicked:true}}))
    }
  }else if (id === "14" && !score.straight.clicked) {
        if (count[2] && count[3] && count[4] && count[5] && count[6] ) {
          setScore(prevScore1 => ({...prevScore1,straight:{...prevScore1.straight, value:20, clicked:true}}))
      }else { 
      setScore(prevScore1 => ({...prevScore1,straight:{...prevScore1.straight, value:0, clicked:true}}))
    }
  }
    else if (id==="15" && !score.full_house.clicked ) {
      let pair =0
      let three_kind = 0
      Object.keys(count).forEach(key => {
        let value = count[key]
          if(value===2){
            pair=key
          }else if (value===3) {
            three_kind=key
          }
          if(pair && three_kind){
            setScore(prevScore1 => ({...prevScore1,full_house:{...prevScore1.full_house, value:(pair*2+three_kind*3), clicked:true}}))
          }else {
            setScore(prevScore1 => ({...prevScore1,full_house:{...prevScore1.full_house, value:0, clicked:true}}))
          }
      })

    }else if (id === '16' && !score.chance.clicked) {
      let chanceSum = 0
      Object.keys(count).forEach(key => {
        let value = count[key]
        chanceSum = chanceSum + (key*value)
      })
      setScore(prevScore1 => ({...prevScore1,chance:{...prevScore1.chance, value: chanceSum, clicked:true}}))

    }
    else if (id === '17' && !score.yatzy.clicked) {
      Object.keys(count).forEach(key => {
        let value = count[key]
          if(value===5){
            setScore(prevScore1 => ({...prevScore1,yatzy:{...prevScore1.yatzy, value:50, clicked:true}}))
          } else {
            setScore(prevScore1 => ({...prevScore1,yatzy:{...prevScore1.yatzy, value: 0, clicked:true}}))
          }
    })
  }

  setChances(3)
  setDice(prevDice => {
          return prevDice.map((die) => {
               return {...die, number:0, hold:false}
          })
      })

}
}

  return (
    <div className="App">
        <main>
          <div className="dice">
            {dice.map(this_die =>
              <Dice
              key={this_die.id}
              number={this_die.number}
              hold={this_die.hold}
              throwDice={() => hold_dice(this_die.id)} /> )}
            <button onClick={throwAll} className="button_run"> run </button>
            <p className="button--text"> chances: {chances} </p>
         
          </div>
          <hr>
          </hr>
      </main>
      <Scoreboard
        scoreboardHoverLeave={score_board_hover_leave}
        scoreboardHover={scoreboardHover}
        hoverScore={hoverScore}
        dice={dice}
        hover={hover}
        saveScore={save_score}
        score1={score}
      />
    </div>
  );
} export default App;
