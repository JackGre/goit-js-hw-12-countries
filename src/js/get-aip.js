export default class ApiService {
    constructor({ root, query, onResolved }) {
        this.root = root;
        this.query = query;
        this.onResolved = onResolved;        
        
      }
     fetch() {  
      fetch(`${this.root}${this.query}`)
      .then(this.onFetch)
      .then(response => 
      {this.onResolved(response)})
      }
      /*fetch() {
        
        fetch(`${this.root}${this.query}`)
          .then(this.onFetch)
          .then((response) => {
            
            this.onResolved(response);
          })
          
      }*/
    
      onFetch(response) {
        if (response.ok) {
          return response.json();
        } else if (response.status === 404) {
          throw "Invalid entry.";
        } 
      }
    }
