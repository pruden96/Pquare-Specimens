// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

function pAequorFactory(speciNum, dnaArray) {
  return {
    specimenNum: speciNum,
    dna: dnaArray,
    mutate () {
      dnaBaseIndex = [Math.floor(Math.random() * 15)];
      newBase = returnRandBase();;
      while (this.dna[dnaBaseIndex] === newBase) {
        newBase = returnRandBase();
      }
      this.dna[dnaBaseIndex] = newBase;
      return this.dna;
    },
    compareDNA (specimen) {
      let coincidences = 0;
      this.dna.forEach((base, index) => {
        if (base === specimen.dna[index]) {
          coincidences++;
        }
      });
      let matching = coincidences / 15 * 100;
      console.log(`Specimen #${this.specimenNum} and specimen #${specimen.specimenNum} have ${matching.toFixed(2)}% DNA in common.`);
    },
    willLikelySurvive () {
      let cBases = 0;
      this.dna.forEach((base) => {
        if (base === 'C' || base === 'G') {
          cBases++;
        }
      });
      return cBases / 15 >= 0.6;
    }
  }
}

ex1 = pAequorFactory(1, mockUpStrand());
ex2 = pAequorFactory(2, mockUpStrand());

console.log(ex1.dna);
console.log(ex2.dna);

ex1.compareDNA(ex2);

let specimensArray = [];

while (specimensArray.length < 30) {
  let specimen = pAequorFactory(specimensArray.length + 1, mockUpStrand());
  if (specimen.willLikelySurvive()) {
    specimensArray.push(specimen);
  }
}

console.log(specimensArray[5].willLikelySurvive());




