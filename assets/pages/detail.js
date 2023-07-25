let { createApp } = Vue

const options = {
    data(){
        return {
            detail : [],          
            currentDate : {},
        }
    },
    created(){
        fetch( 'https://mindhub-xj03.onrender.com/api/amazing' )
            .then( response => response.json() )
            .then( data => {
                let detailEvent = data.events
                let id = location.search;
                console.log(id) 
                let idDetail = new URLSearchParams(id);
                console.log(idDetail)   
                let sku = idDetail.get('id');   
                this.detail = detailEvent.find( event =>  event._id == sku);
                this.currentDate = data.currentDate
            })
            .catch( err => console.log( err ) )
    },
       
}


const app = createApp( options )

app.mount( '#app' )
