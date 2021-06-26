require('colors')

const { guardarDB,leerDB } = require('./helpers/guardarArchivo');
const {inquirerMenu,pausa,leerInput, listadosTareasBorrar,confirmar,mostrarListadoCheckList} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

console.clear();

const main = async()=>{
    let opt=''
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if(tareasDB){
      tareas.cargarTareasFronArr(tareasDB)
    }

    do{
      opt = await inquirerMenu()
      switch (opt) {
        case '1':
          const desc = await leerInput('Descripcion :');
          tareas.crearTarea(desc)
        break;
        case '2':         
          tareas.listadoCOmpleto()
        break;
        case '3':         
          tareas.listarPendientesCompletadas(true)
        break;
        case '4':         
          tareas.listarPendientesCompletadas(false)
        break;
        case '5':         
          const ids = await mostrarListadoCheckList(tareas.listadorArr);
          tareas.toogleTareasCheck(ids)
        break;
        case '6':  
            const id =await listadosTareasBorrar(tareas.listadorArr);
            if(id !=='0') {
              const confirm = await confirmar('¿Esta seguro?') 
              if(confirm)  {
                tareas.borrarTarea( id)
              }
            }
        break;
      }

      guardarDB(tareasDB) 

      await pausa() 

    }while(opt !=='0') 
}


main();