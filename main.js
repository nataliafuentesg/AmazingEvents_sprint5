let { createApp } = Vue

const options = {
    data(){
        return {
            events : [],
            categories : [],
            searchedInput : "",
            categoryChecked : [],
            filtered : [],
            
        }
    },
    created(){
        fetch( 'https://mindhub-xj03.onrender.com/api/amazing' )
            .then( response => response.json() )
            .then( data => {
                let homeEvents = data.events
                this.events = homeEvents
                this.filtered = homeEvents
                this.categories = [... new Set(homeEvents.map(event => event.category))]
                console.log(this.categories)
                console.log(this.events)

            })
            .catch( err => console.log( err ) )
    },
    methods:{
        filter(){
                this.filtered = this.events.filter( event => {
                return event.name.toLowerCase().includes( this.searchedInput.toLowerCase() ) 
                 && (this.categoryChecked.includes( event.category ) || this.categoryChecked.length == 0)
             })
            }
       
    },
    
}


const app = createApp( options )

app.mount( '#app' )




