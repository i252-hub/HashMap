class HashMap{
    constructor(loadFactor = 0.75){
        this.loadFactor = loadFactor;
        this.size = 0;
        this.buckets = new Array(8);

    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = (hashCode * primeNumber + key.charCodeAt(i)) % this.buckets.length;
        }
        return hashCode;
      }

      set(key, value) {
        if (this.size / this.buckets.length > this.loadFactor) {
          this.resize();
        }

        const index = this.hash(key);
        if (!this.buckets[index]) {
          this.buckets[index] = [];
        }
    
        const bucket = this.buckets[index];
        const existingEntryIndex = bucket.findIndex(entry => entry[0] === key);

        if (existingEntryIndex !== -1) {
            bucket[existingEntryIndex][1] = value;
          } else {
            bucket.push([key, value]);
            this.size++;
          }
        }

        get(key) {
            const index = this.hash(key);
            const bucket = this.buckets[index];
            
            if (bucket) {
              const entry = bucket.find(entry => entry[0] === key);
              return entry ? entry[1] : null;
            }
            
            return null;
          }

          has(key) {
            const index = this.hash(key);
            const bucket = this.buckets[index];
            
            if (bucket) {
              return bucket.some(entry => entry[0] === key);
            }
            
            return false;
          }

          remove(key) {
            const index = this.hash(key);
            const bucket = this.buckets[index];
            
            if (bucket) {
              const entryIndex = bucket.findIndex(entry => entry[0] === key);
              if (entryIndex !== -1) {
                bucket.splice(entryIndex, 1);
                this.size--;
                return true;
              }
            }

            return false;
        }
      
        length() {
          return this.size;
        }

        clear() {
            this.buckets = new Array(8);
            this.size = 0;
          }

          keys() {
            const keysArray = [];
            for (const bucket of this.buckets) {
              if (bucket) {
                for (const entry of bucket) {
                  keysArray.push(entry[0]);
                }
              }
            }
            return keysArray;
          }

          values() {
            const valuesArray = [];
            for (const bucket of this.buckets) {
              if (bucket) {
                for (const entry of bucket) {
                  valuesArray.push(entry[1]);
                }
              }
            }
            return valuesArray;
          }
        
          entries() {
            const entriesArray = [];
            for (const bucket of this.buckets) {
              if (bucket) {
                for (const entry of bucket) {
                  entriesArray.push(entry);
                }
              }
            }
            return entriesArray;
          }

          resize() {
            const oldBuckets = this.buckets;
            this.buckets = new Array(oldBuckets.length * 2);
            this.size = 0; 
        
            for (const bucket of oldBuckets) {
              if (bucket) {
                for (const entry of bucket) {
                  this.set(entry[0], entry[1]); 
                }
              }
            }
          }
        }

  const test = new HashMap(0.75);
  test.set('apple', 'red');
  test.set('banana', 'yellow');
  test.set('carrot', 'orange');
  test.set('dog', 'brown');
  test.set('elephant', 'gray');
  test.set('frog', 'green');
  test.set('grape', 'purple');
  test.set('hat', 'black');
  test.set('ice cream', 'white');
  test.set('jacket', 'blue');
  test.set('kite', 'pink');
  test.set('lion', 'golden');
  
  test.set('apple', 'green');
  test.set('banana', 'ripe');
  
  test.set('moon', 'silver');
  
  console.log(test.get('apple')); 
  console.log(test.has('banana')); 
  console.log(test.length()); 
  console.log(test.keys()); 
  console.log(test.values()); 
  console.log(test.entries()); 
  test.remove('carrot'); 
  console.log(test.length()); 
  test.clear(); 
  console.log(test.length()); 
  


