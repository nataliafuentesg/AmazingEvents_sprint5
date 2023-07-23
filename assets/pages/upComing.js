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
                let upComingEvents = data.events.filter(upComingD => upComingD.date >= data.currentDate)
                console.log(upComingEvents)
                this.events = upComingEvents
                this.filtered = upComingEvents
                this.categories = [... new Set(upComingEvents.map(event => event.category))]
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