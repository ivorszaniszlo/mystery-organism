// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand;
}

const pAequorFactory = (number, arr) => {
  return {
     specimenNum: number,
     dna: arr,
     mutate() {
       let dna = this.dna;
       let mutated = [];
      // mutated DNA array
     let i = Math.floor(Math.random() * this.dna.length);

      // target base's letter
      let oldBase = this.dna[i];

      // Swapping out (mutating) base on DNA
      let altBases = ['A', 'T', 'C', 'G'];
      altBases.splice(altBases.indexOf(oldBase), 1); // find and remove target base
      let mutatedBase = altBases[Math.floor(Math.random() * 3)]; // take one of 3 altBases
      console.log(`Changed ${oldBase} to ${mutatedBase} on number ${i}`);
      for(let j = 0; j< dna.length; j++){
        if(i != j){
          mutated.push(oldBase);
        } else mutated.push(mutatedBase);
      }
    
      return mutated;
    
      },
      compareDNA(pAequor = this.dna, mutated = this.mutate()) {
        let obj1 = Object.assign({}, pAequor); 
        console.log('obj1:', JSON.stringify(obj1));
        let obj2 = Object.assign({}, mutated); 
        console.log('obj2:', JSON.stringify(obj2));
        var count = [0,0];
        for( var key in obj1) {
            count[1]++; // total count
            if( obj2.hasOwnProperty(key) && obj2[key] === obj1[key]) {
                count[0]++; // match count
            }
        }
        var percentage = count[0]/count[1]*100+"%";
        return percentage;
      },
      willLikelySurvive() {
        const cAndG = this.dna.filter(letter => letter === 'C' || letter === 'G');

        if (cAndG.length/this.dna.length > 0.6) {
          return true;
        } else {
          return false;
        }
    }
  } 

};

//const pAequor = pAequorFactory(76, mockUpStrand());
//console.log(pAequor.dna);
//console.log(pAequor.mutate());
//console.log(pAequor.compareDNA());
//console.log(pAequor.willLikelySurvive());

 // 30 instances
let factory = () => {
  let sample = [];
  let i = 0;
  while (sample.length < 30) {
    let temp = pAequorFactory(i, mockUpStrand());
    if (temp.willLikelySurvive() == true) {
      sample.push(temp);
      i += 1
    } 
  }
  return sample;
}

console.log(factory());