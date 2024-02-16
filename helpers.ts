export const formatTime = (timestamp: number|null) => {
    if(!timestamp) return;
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
};


export const isEmpty = (text: string) => {
    if(!text || text.trim() === '') return true;
    return false;
};


export const priorityFormatter = (priorityStatus: number) => {
    switch(priorityStatus){
        case 1: return { color: 'green', text:'Low' }
        case 2: return { color: 'orange', text:'Medium' }
        case 3: return { color: 'red', text:'High' }
    }
}