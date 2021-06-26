const Tarea= require('./tarea')
const colors =  require('colors')


class Tareas{

    _listado ={}

    get listadorArr(){
        const listado =[];
        Object.keys(this._listado).forEach(key=>{
            listado.push(this._listado[key])
        })
        return listado;
    }
    
    constructor(){
        this._listado = {}
    }

    borrarTarea(id =''){
        if(this._listado[id]){
            delete this._listado[id]
        }
        
    }

    cargarTareasFronArr(tareas = []){
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }
    

    crearTarea(desc=''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;

    }


    listadoCOmpleto(){
        console.log()
        this.listadorArr.forEach((tarea,index) => {
            console.log(`${colors.green(index+1)}. ${tarea.desc} :: ${tarea.completadoEn ? 'Completado'.green : 'Pendiente'.red}`);
        });

        
        
    }

    listarPendientesCompletadas(completadas = true){
        console.log()
        let contador = 0;
        this.listadorArr.forEach((tarea,index) => {
            if(completadas){
                if(tarea.completadoEn){
                    contador ++
                    console.log(`${colors.green(contador.toString())}. ${tarea.desc} :: ${colors.green(tarea.completadoEn)}`);
                }
            }else{
                if(!tarea.completadoEn){
                    contador ++
                    console.log(`${colors.green(contador.toString())}. ${tarea.desc} :: ${tarea.completadoEn ? 'Completado'.green : 'Pendiente'.red}`);
                } 
            }

        });
    }

    toogleTareasCheck( ids =[]){
        ids.forEach(id =>{
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        });
        this.listadorArr.forEach( tarea =>{
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        })

    }
}


module.exports = Tareas