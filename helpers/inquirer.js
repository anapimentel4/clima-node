
import inquirer from 'inquirer';
 
import colors from 'colors';



const menuOpts = [
    {
        type:'list',
        name: 'opcion',
        message:' que desea hacer?',
        choices:[
            {
                value: 1,
                name:  `${'1.'.green} Buscar Ciudad`,
            },
      
            {
                value: 2,
                name:  `${'2.'.green}Historial`,
            },
            
            {
                value: 0,
                name:  `${'0'.green} salir`,
            },
            
    ] //questions
    }
];



const inquirerMenu = async ()=>{
    console.clear();
    console.log('========================'.green);
    console.log('seleccione una opcion'.white);
    console.log('========================\n'.green);

const {opcion} = await inquirer.prompt(menuOpts)


return opcion; 


}
 const pausa = async ()=>{
    const question = [
        {
            type:'input',
            name: 'enter',
            message:` presione ${'ENTER'.blue} para continuar`
        }
    ];
    
    console.log('\n');
    const {opcion} = await  inquirer.prompt(question);
   
  }
  
  const leerInput =async (message)=>{

    const question =[
        {
            type:'input',
            name:'desc',
            message: message,
            validate( value) {
                if (value.length === 0 ){
                    return 'por favor ingrese un valor'
                }
                return true;
            }
        }
    ];
   const  {desc } = await inquirer.prompt(question);
   
   return desc; 
  };
  

const listarlugares=  async (lugares =[])=>{

    const choices = lugares.map( (lugar, i) =>{

        const idx = `${i +1}.`.green;
        
        return {
         value: lugar.id,
         name: `${idx} ${lugar.nombre}`
        }
    });
    choices.unshift({
        value:'0',
        name:'0.'.green + 'Cancelar'
    });

     const preguntas =[ 
     {
        type:'list',
        name: 'id', 
        message: 'Sleccione lugar:',
        choices
      }
    ]
    const  {id} = await inquirer.prompt(preguntas)
    return id;
}

const mostrarListadoCheckList =  async (Tareas =[])=>{

    const choices = Tareas.map( (tarea, i) =>{

        const idx = `${i +1}.`.green;
        
        return {
         value: tarea.id,
         name: `${idx} ${tarea.desc}`,
         checked:(tarea.completadoEn) ? true : false
        }
    });

     const pregunta =[ 
     {
        type:'checkbox',
        name: 'ids', 
        message: 'Seleccione',
        choices
      }
    ]
    const  {ids} = await inquirer.prompt(pregunta)
    return ids;
}

 const confirmar = async (message)=>{
    
    const question=[
        {
            type:'confirm',
            name: 'ok',
            message
        }
     ];
     const  {ok} = await inquirer.prompt(question);
     return ok
 }


export  {
    inquirerMenu,
    pausa,
    leerInput,
    listarlugares,
    confirmar, 
    mostrarListadoCheckList
}