let { createApp } = Vue

const options = {
    data(){
        return {
            assitanceEvents: [],        
            capacityEvent : [],
            upComingStats : {},
            pastStats : {},
        }
    },
    created(){
        fetch( 'https://mindhub-xj03.onrender.com/api/amazing' )
            .then( response => response.json() )
            .then( data => {
                let pastEvents = data.events.filter(pastD => pastD.date <= data.currentDate)
                console.log(pastEvents)
                let upComingEvents = data.events.filter(upComingD => upComingD.date >= data.currentDate)
                let aux = pastEvents.map(({assistance , capacity, name}) => ({assistance , capacity, name}));
                aux.forEach(element => {
                    element.percentage = ((element.assistance * 100) / element.capacity);
                });
                aux.sort((a,b) => b.percentage - a.percentage);       
                this.assitanceEvents = aux
                let cap = upComingEvents.map(({capacity , name}) => ({capacity , name}))
                cap.sort((a,b) => b.capacity - a.capacity)
                this.capacityEvent = cap
                let tableUpComing = upComingEvents.map(({ estimate, capacity, name, category, price }) => ({
                    estimate, capacity, name, category, price}));
                let reduceTable = tableUpComing.reduce((acc, event) => {
                    if (!acc[event.category]) {
                      acc[event.category] = {
                        revenue: 0,
                        totalCapacity: 0,
                        totalEstimate: 0,
                      };
                    }
                    acc[event.category].revenue += (event.price * event.estimate);
                    acc[event.category].totalCapacity += event.capacity;
                    acc[event.category].totalEstimate += event.estimate;
                    acc[event.category].percentage = (acc[event.category].totalEstimate * 100) / acc[event.category].totalCapacity;
                    
                    acc[event.category].percentage = acc[event.category].percentage.toFixed(2);
                    
                    return acc;
                }, {});

                this.upComingStats = reduceTable
                console.log(this.upComingStats)

                let tablePast = pastEvents.map(({ capacity, assistance, name, category, price }) => ({
                    capacity, assistance, name, category, price}));
                let reduceTablePast = tablePast.reduce((acc, event) => {
                    if (!acc[event.category]) {
                      acc[event.category] = {
                        revenue: 0,
                        totalCapacity: 0,
                        totalAssistance: 0,
                      };
                    }
                    acc[event.category].revenue += event.price * event.assistance;
                    acc[event.category].totalCapacity += event.capacity;
                    acc[event.category].totalAssistance += event.assistance;
                    acc[event.category].percentage = (acc[event.category].totalAssistance * 100) / acc[event.category].totalCapacity;
                    
                    acc[event.category].percentage = acc[event.category].percentage.toFixed(2);
                                       
                    return acc;
                }, {});

                this.pastStats = reduceTablePast
                console.log(this.pastStats)
            })
            .catch( error => console.log( error ) )
    },
       
}


const app = createApp( options )

app.mount( '#app' )