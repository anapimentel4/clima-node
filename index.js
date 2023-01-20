import * as dotenv from 'dotenv';
dotenv.config()

import { inquirerMenu, leerInput, listarlugares, pausa } from "./helpers/inquirer.js";
import colors from 'colors';
import { Busqueda } from "./models/busqueda.js";


const main = async ()=>{

const busquedas = new Busqueda();
let opt; 


 do {
    opt =await inquirerMenu();

    // ya estamos mostrando el menu con inquirerMenu ahora la persona tiene que seleciionar para eso el swtich
    // el swith va a recibir la opt (el menu ) para mostrarlo
    switch (opt) {
        case 1:
            
            //mostrar Mensaje
            const terminoBusqueda =  await leerInput('cuidad: ');

            //Buscar los lugares
            const lugares = await busquedas.ciudad(terminoBusqueda);

            //seleccionar lugar
            const idSeleccionado = await listarlugares(lugares);
            if (idSeleccionado === '0') continue;

            const lugarSel = lugares.find( l => l.id === idSeleccionado);
    
         
             busquedas.agregarHistorial( lugarSel.nombre );


            //clima 
            const clima= await busquedas.climaLugar(lugarSel.lat, lugarSel.lng );
 
    
            
            console.clear();
            console.log('\nInformacion de la ciudad\n'.green);
            console.log('Cuidad', lugarSel.nombre.green);
            console.log('Lat', lugarSel.lat);
            console.log('Lng:', lugarSel.lng);
            console.log('Temperatura', clima.temp );
            console.log('Minima', clima.min);
            console.log('Maxia', clima.max);
            console.log('estado del Clima:', clima.desc.green);
            
            
        break;
        
        case 2: 
                busquedas.historia.forEach( (lugar, i)  => {
                    const idx = `${i + 1}`.green;
                    console.log(`${idx} ${lugar}`);
                    
                });

         break;
  
        
    }


    if (opt !==0 )await pausa();
    
 } while (opt !== 0);
    
}

main();