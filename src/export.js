var data_labels = [["accumulated_acceleration_load", "accumulated_acceleration_load_per_min", "changes_of_orientation", "jump_count", "max_jump_height", "max_speed", "total_distance", "brake_phase", "brake_power", "brake_net_impulse", "jump_height", "mRSI", "lr_brake_force", "peak_relative_propulsive_power", "propulsive_net_impulse", "time_to_takeoff", "total_energy_consumption", "trimp", "status_score"]];

// async function exportPlayer(){
//     var singlePlayerKinexonData = await getKinexonWrap();
//     var singlePlayerFBDataawait = await getPlayerFB();
//     var singlePlayerHawkinsData = await getPlayerHawk();




const csvmaker = function (data) { 
  
    // Empty array for storing the values 
    var csvRows = []; 
    var content = [];
    //console.log(data);
  
    // Headers is basically a keys of an object 
    // which is id, name, and profession 
    const headers = data_labels;
  
    // As for making csv format, headers must 
    // be separated by comma and pushing it 
    // into array 
    csvRows.push(headers.join(',')); 
    //console.log(csvRows);
  
    // Pushing Object values into array 
    // with comma separation 
   const values =  Object.values(data).join(',');  
   csvRows.push(values) 
  
    // Returning the array joining with new line  
    return csvRows.join('\n') 
} 

const download = function (data) { 
  
    // Creating a Blob for having a csv file format  
    // and passing the data with type 
    const blob = new Blob([data], { type: 'text/csv' }); 
  
    // Creating an object for downloading url 
    const url = window.URL.createObjectURL(blob) 
  
    // Creating an anchor(a) tag of HTML 
    const a = document.createElement('a') 
  
    // Passing the blob downloading url  
    a.setAttribute('href', url) 
  
    // Setting the anchor tag attribute for downloading 
    // and passing the download file name 
    a.setAttribute('download', 'download.csv'); 
  
    // Performing a download with click 
    a.click() 
}


export const getData = async function (data) { 
    const csvdata = csvmaker(data); 
    download(csvdata); 
} 
const btn = document.getElementById('export'); 
//btn.addEventListener('click', getData);